<template>
  <div>
    <h1>{{data.Title}}</h1>
    <div class="content_area">
      <div v-for="(pic, index) in data.Content" v-bind:key='pic.id'>
        <content-card
          v-if="!((pic.type === 'position' || pic.type === 'time') && pic.title === null)"
          :data="pic"
          v-bind:class="{'content_card': index !== data.Content.length-1}"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import ContentCard from '@/components/utils/ContentCard.vue';
export default Vue.extend({
  components: {
    ContentCard,
  },
  async asyncData(context: any) {
    const { params, app } = context;
    let data: any;
    try {
      const res = await app.$axios.$get(`/box/${params.id}`);
      return {data: res};
    } catch(e) {
      console.log(e);
    }
  },
  data() {
    return {
      data: {},
      ogp: '',
    }
  },
  head() {
    return {
      title: this.$data.data.Title,
      meta: this.$head(
        this.$data.data.Title,
        this.$route.path,
        // this.$data.ogp,
      ),
    }
  },
  async created() {
    if (this.data == {}) {
      const res = await (this as any).$axios.$get(`/box/${this.$route.params.id}`);
      this.data = res;
    }
    // this.ogp = await this.$ogp(
    //   (this.data as any).Title,
    //   (this.data as any).User.display_name,
    //   ((this.data as any).Content as Array<any>).filter((d: any) => d.type === 'photo')[0].img
    // );
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
.content_area {
  position: relative;
  top: 50px;
}
</style>
