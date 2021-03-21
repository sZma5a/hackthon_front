<template>
  <v-footer
    class="footer white"
  >
    <div>
      <img class="logo" src="/img/logo.svg" alt="logo" />
      <p class="sub">移動を共有するコミュニティ</p>
    </div>
    <v-spacer />
    <a href="https://twitter.com/scenery_cam" rel="noopener noreferrer" target="_blank" aria-label="my twitter account link" class="text-decoration-none">
      <v-icon size="23" class="twitter" color="#00acee">mdi-twitter</v-icon>
    </a>
    <div v-for="m in menu" v-bind:key="m.title" class="links">
      <p class="link_title mb-0">{{m.title}}</p>
      <ul style="list-style-type: none" class="pa-0">
        <li v-for="c in m.child" v-bind:key="c.link">
          <nuxt-link :to="c.link" class="text-decoration-none" v-if="c.link.charAt(0) === '/'">
            {{c.title}}
          </nuxt-link>
          <a :href="c.link" target="_blank" rel="noopener noreferrer" v-else class="text-decoration-none" :aria-label="c.title">
            {{c.title}}
          </a>
        </li>
      </ul>
    </div>
    <p class="text-center col-12 mb-0">
      {{ new Date().getFullYear() }} — <strong>Geekers</strong>
    </p>

  </v-footer>
</template>
<script>
import Vue from 'vue';
import { CONST } from '@/src/const.ts';

export default Vue.extend({
  data() {
    return {
      menu: CONST.FOOTER.MENU,
    }
  },
})
</script>
<style lang="scss" scoped>
.footer {
  margin-top: 60px;
  .logo {
    width: 146px !important;
  }
  .sub {
    width: 100%;
    font-size: 12px;
    font-weight: bold;
    color: #{$subtitle_gray};
    margin-bottom: 20px;
  }
  .link_title {
    width: 100%;
    font-size: 14px;
    color: #{$main_black};
    font-weight: bold;
    padding-bottom: 3px;
    border-bottom: 1px solid #{$main_light_blue} !important;
  }
  .links {
    width: 100%;
    margin-bottom: 10px;
    li {
      margin: 7.5px 0;
      font-size: 13px;
      a {
        color: #{$main_black};
      }
    }
  }
  .twitter {
    position: relative;
    top: -15px;
  }
}
</style>
