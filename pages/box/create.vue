<template>
  <div>
    <Loading v-show="loading" />
    <div class="add_btn_area">
      <h1>Box作成</h1>
      <div class="col-12 mt-4 ">
        <input id="file_up" type="file" multiple="multiple" class="d-none" @change="onFileChange" />
        <label for="file_up">
          <div v-if="first" class="v-btn v-btn--block v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary" v-bind:class="{'btn-top-margin': items.length === 0}">
            <v-icon dark color="white" dense left>mdi-camera-plus</v-icon>写真を追加する
          </div>
          <div
            v-if="!first"
            class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--rounded theme--light v-size--default primary"
            style="text-transform: none"
          >
            <v-icon left color="#ffffff">
              mdi-camera-plus
            </v-icon>
            Add
          </div>
        </label>
      </div>
      <v-text-field v-model="title" counter="16" v-if="!first" class="mt-5" />
    </div>
    <div class="drag" v-if="!first">
      <div v-for="(pic, index) in items" v-bind:key='pic.id'>
        <content-card
          v-if="!((pic.type === 'position' || pic.type === 'time') && pic.title === null)"
          :data="pic"
          v-bind:class="{'content_card': index !== items.length-1}"
        />
      </div>
    </div>
    <v-btn class="col-4" v-if="!first" @click="send()" color="primary" block :disabled="!title || title.length > 16">送信</v-btn>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import exifr from 'exifr';
import * as type from '@/src/interfaces.ts';
import imageCompression from "browser-image-compression";
import { CONST } from '@/src/const.ts';
import Loading from '@/components/utils/Loading.vue'
import ContentCard from '@/components/utils/ContentCard.vue'
import * as convert from '@/src/modules/DataConvert.ts';

export default Vue.extend({
  components: {
    ContentCard, Loading
  },
  head() {
    return {
      title: 'Create'
    }
  },
  data() {
    return {
      progress: {},
      history: [],
      start_date: '',
      box_id: '',
      loading: false,
      type: [
        'image/tiff',
        'image/jpeg',
      ],
      items: [] as type.CreatePhoto[],
      first: true,
      title: '',
    }
  },
  created() {
    if (!this.$store.state.user.authenticated) {
      this.$router.push('/auth/signin');
    }
  },
  async mounted() {
    let res = await (this as any).$axios.$get("/spotify/me/history");
    this.items = res.items.filter((item: any) => {
      item.taken_at = convert.getDateString(new Date(item.played_at));
      item.position_str = '';
      item.type = 'music';
      return item;
    });
  },
  methods: {
    async compressImage(file: any) {
      try {
        // 圧縮画像の生成
        const img = await imageCompression(file, CONST.IMAGESET.OPTION);
        return await imageCompression.getDataUrlFromFile(img);
      } catch (error) {
        console.error("img compress error", error);
        throw error;
      }
    },
    async onFileChange(e: any) {
      this.first = false;
      this.loading = true;
      let items = [];
      for (const file of e.target.files) {
        if (!this.type.includes(file.type)) {
          this.loading = false;
          this.$nuxt.$emit('setInformation', {
            type: 'error',
            text: 'JPEGかTIFF以外の写真が選択されています。',
          });
          return
        }
        const exif = await exifr.parse(file);
        let img_obj = {} as type.CreatePhoto;
        if (exif) {
          img_obj.camera = exif.Model;
          img_obj.camera_maker = exif.Make;
          if (exif.DateTimeOriginal) {
            img_obj.taken_at = convert.getDateString(exif.DateTimeOriginal);
            img_obj.raw_taken_at = img_obj.taken_at;
            const img_time = convert.createTimeData(img_obj.taken_at);
            img_obj.taken_time = img_time.time_str;
            img_obj.taken_time_icon = img_time.time_icon;
          }
          if (exif.latitude && exif.longitude) {
            img_obj.lat = exif.latitude;
            img_obj.lon = exif.longitude;
            img_obj.raw_lat = exif.latitude;
            img_obj.raw_lon = exif.longitude;
            try {
              const res = await (this as any).$axios.$get('/util/position', {
                params: {
                  latitude: exif.latitude,
                  longitude: exif.longitude,
                }
              });
              img_obj.position_str = `${res["ResultSet"]["Address"][0]}, ${res["ResultSet"]["Address"][1]}`
            } catch(e) {
              console.log(e);
            }
          }
        }
        img_obj.img = await this.compressImage(file);
        img_obj.type = 'picture';
        items.push(img_obj);
      }
      this.items = this.items.concat(items);
      this.items = this.items.sort(function(a: any, b: any) {
        if (new Date(a.taken_at) < new Date(b.taken_at)) {
            return 1;
        } else {
            return -1;
        }
      });
      const pictureDate: any = this.items.filter((i) => i.type === 'picture');
      if (pictureDate.length <= 0) {
        this.first = true;
        this.items = [];
      }
      this.items = this.items.filter((i: any) => {
        const taken_at = new Date(i.taken_at);
        if (i.type === 'picture') {
          return i
        } else if (new Date(pictureDate[0].taken_at) > taken_at && taken_at > new Date(pictureDate.slice(-1)[0].taken_at)) {
          return i
        }
      });
      this.items = convert.adjustTimeLineData(this.items) as any;
      this.loading = false;
    },
    async send() {
      this.loading = true;
      if (this.title && this.title.length < 16) {
        const res = await (this as any).$axios.$post( "/box/send",{
          title: this.title,
          content: this.items
        });
        this.loading = false;
        this.$router.push(`/box/${res.box_id}`);
      }
      this.loading = false;
    }
  }
})
</script>
<style lang="scss" scoped>
::v-deep h1 {
  text-align: center;
  padding: 20px 0px;
  font-size: 21px !important;
  border-bottom: solid 1px #{$main_light_blue};
}
.add_btn_area {
  height: 300px;
}
.drag {
  margin-bottom: 80px;

  .photo {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    margin-top: 85px;
    width: 210px;
  }
  .v-btn {
    margin-bottom: 45px;
  }
  .btn-top-margin {
    top: 300px;
  }

  .photo_card {
    width: 345px;
    margin: auto;

    .title {
      width: 180px;
      font-weight: bold;
    }
    .right-top {
      position: absolute;
      top: 0;
      right: 0;
    }
    .bottom {
      position: absolute;
      right: 16px;
      bottom: 16px;
    }
  }
  .v-avatar {
    border-radius: 2px;
  }
  .list {
    position: relative;
    height: 80px;
    background-color: #ffffff;
    padding: 0;
    .icatch {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto;
    }
  }
}

.v-dialog {
  margin: none !important;
  .edit {
    height: 625px;
    text-align: center;
    padding: 15px;
    .search_box {
      width: 100%;
    }
    .v-btn {
      width: 100%;
      max-width: 325px;
    }
    .map {
      margin-top: 15px;
      height: 190px;
      width: 100%;
    }
    .place {
      color: #{$more_light_blue};
      margin-top: 20px;
    }
    .date {
      color: #{$more_light_blue};
      margin-top: 0px;
    }
    .time_select {
      margin-top: 0px;
    }
    .submit {
      margin-top: 30px;
    }
  }
}
</style>
<style lang="scss">
.time_select.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset {
  color: #{$more_light_blue} !important;
}
.search_box.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset {
  color: #{$main_blue} !important;
}
.content_card {
  position: relative;
}
.content_card::after {
  content: '';
  position: absolute;
  left: 40px;
  bottom: -20px;
  width: 2px;
  height: 20px;
  background-color: #3da2f9;
}
.v-overlay__scrim {
  background-color: #{$main_blue} !important;
}
</style>
