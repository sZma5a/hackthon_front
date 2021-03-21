<template>
  <div>
    <h1>ログイン</h1>
    <v-btn :href="url" block color="#1Db954" class="login" style="text-transform: none">
      <v-icon
        left
      >
        mdi-spotify
      </v-icon>
      Spotifyでログイン
    </v-btn>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
export default Vue.extend({
  head() {
    return {
      title: 'Sign In'
    }
  },
  data() {
    return {
      url: ''
    }
  },
  async mounted() {
    const res = await (this as any).$axios.$get('/auth/url');
    this.url = res.url;
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
.login {
  top: 150px;
  color: #ffffff;
  font-weight: bold;
  font-size: 14px;

  .v-icon {
    font-size: 25px;
    margin-right: 30px;
  }
}
</style>
