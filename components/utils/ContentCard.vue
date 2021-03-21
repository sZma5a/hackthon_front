<template>
  <no-ssr>
    <div>
      <v-card
        dark
        tile
        class="primary text-center mb-5"
        width="200"
        v-if="data.type==='position'"
      >
        <div class="position_text row">
          <v-icon class="col-2 pa-0 icon">mdi-map-marker</v-icon>
          <span class="col-10 omission pa-0">{{data.title}}</span>
        </div>
      </v-card>
      <v-card
        tile
        class="text-center time_card mb-5"
        v-if="data.type==='time'"
      >
        <div class="d-flex align-center justify-center">
            <img :src="data.icon" :alt="data.title" />
            <span class="text-center col-10 pt-0 pb-0">{{data.title}}</span>
        </div>
      </v-card>
      <v-card v-if="data.type==='picture'" class="pic_card mb-5">
        <nuxt-link v-if="!edit" :to="`/pic/${data.id}`">
          <v-img :src="data.img" />
        </nuxt-link>
        <img v-else :src="data.img" />
        <div v-if="edit" class="pa-2">
          <div class="d-flex align-center">
            <v-btn @click="picDelete()" icon>
              <v-icon color="danger">mdi-delete</v-icon>
            </v-btn>
            <v-spacer />
            <v-btn icon @click="openMenu=!openMenu">
              <v-icon color="primary">mdi-arrow-down-drop-circle-outline</v-icon>
            </v-btn>
          </div>
          <div v-if="openMenu" class="row">
            <v-menu
              ref="menu"
              v-model="dateMenu"
              :close-on-content-click="false"
              :return-value.sync="data.day"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="data.day"
                  label="Date"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  class="col-6"
                />
              </template>
              <v-date-picker v-model="data.day" no-title scrollable>
                <v-spacer />
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <v-menu
              ref="menu"
              v-model="timeMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="data.time"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="data.time"
                  label="Time"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  class="col-6"
                />
              </template>
              <v-time-picker
                v-if="timeMenu"
                v-model="data.time"
                full-width
                @click:minute="$refs.menu.save(time)"
              />
            </v-menu>
            <v-select
              :items="items"
              label="Time"
              v-model="data.time_str"
              class="col-12"
            />
            <v-text-field
              v-model="data.position_str"
              label="Position"
              class="col-12"
            />
          </div>
        </div>
      </v-card>
      <v-card v-if="data.type==='music'" class="music_card mb-5">
        <div class="d-flex flex-no-wrap justify-center align-center">
          <v-avatar
            tile
            size="55"
          >
            <v-img :src="data.track.album.images[0].url" />
          </v-avatar>
          <div class="info_area">
            <v-card-title>
              {{data.track.name}}
            </v-card-title>
            <v-card-subtitle>{{data.track.album.name}}</v-card-subtitle>
          </div>
          <v-btn
            class="ma-2"
            fab
            small
            color="#191414"
            depressed
            target="_blank"
            :href="data.track.external_urls.spotify"
          >
            <v-icon color="#1Db954">mdi-play</v-icon>
          </v-btn>
        </div>
        <!-- {{data}} -->
        <!-- {{data.track.external_urls.spotify}} -->
      </v-card>
    </div>
  </no-ssr>
</template>
<script lang="ts">

import Vue from 'vue'
export default Vue.extend({
  name: 'ContentCard',
  data() {
    return {
      items: ['Morning', 'Noon', 'Evening', 'Night'],
      openMenu: false,
      dateMenu: false,
      timeMenu: false,
      date: '',
    }
  },
  props: {
    data: Object,
    edit: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    picDelete() {
      this.$emit('delete');
    },
  }
})
</script>
<style lang="scss" scoped>
.omission {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.position_text {
  padding: 7px 15px;
  font-size: 13px;
  // body-2 pl-3 pr-3 pt-2 pb-2
  .icon {
    font-size: 20px;
  }
  span {
    text-align: center;
    font-weight: 550;
  }
}

.time_card {
  padding: 7px 15px;
  width: 250px;
  // border: 1px solid #DEEBFF;
  div {
    img {
      width: 30px;
      margin-right: 10px;
    }
  }
}

.pic_card {
  height: 100%;
  img {
    width: 100%;
  }

  .time {
    position: absolute;
    right: 0;
    padding: 4px 8px;
    border-radius: none !important;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }
}

.img {
  width: 250px;
}

.music_card {
  width: 300px;
  height: 80px;
  border: #1Db954 1px solid;
  .info_area {
    width: 163px;
    .v-card__title {
      font-size: 14px;
      font-weight: bold;
      max-width: 163px;
      height: 64px;
      color: #191414;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .v-card__subtitle {
      font-size: 11px;
      height: 38px;
      max-width: 163px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
