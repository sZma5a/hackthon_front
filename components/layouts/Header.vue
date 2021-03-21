<template>
  <div>
    <v-app-bar
      fixed
      app
      dense
      elevation="0"
      class="white header"
    >
      <img
        src="/img/logo.svg"
        class="logo"
        alt="logo"
      />
      <v-spacer />
      <v-btn icon class="icon" to="/" aria-label="home" v-if="none">
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn icon class="icon" to="/search" aria-label="search" v-if="none">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon to="/box/create" class="icon" v-if="is_auth" aria-label="create">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-avatar v-if="is_auth" size="30">
        <v-menu
          :close-on-content-click="true"
          :nudge-width="200"
          content-class="elevation-3"
          offset-y
          elevation="1"
        >
          <template v-slot:activator="{ on, attrs }">
            <img
              :src="user.images[0].url"
              v-bind="attrs"
              v-on="on"
            >

          </template>

          <v-card class="menu">
            <v-list class="user_information">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="user_title">{{user.display_name}}</v-list-item-title>
                  <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list flat v-if="$store.state.user.authenticated">
              <span v-for="m in menu" v-bind:key="m.link">
                <v-divider v-if="m.title === 'divider'" />
                <v-list-item :to="m.link" class="menu_col" :aria-label="m.title" v-else>
                  <v-list-item-action>
                    <v-icon class="icon">{{m.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>{{m.title}}</v-list-item-title>
                </v-list-item>
              </span>
            </v-list>
          </v-card>
        </v-menu>
      </v-avatar>
      <v-btn icon to="/auth/signin" class="icon" v-else>
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Cookies from 'universal-cookie';
import {CONST} from '@/src/const.ts';
import * as type from '@/src/interfaces.ts';

const cookies = new Cookies();
export default Vue.extend({
  name: 'Header',
  data() {
    return {
      picHost: process.env.PIC_HOST,
      menu: [] as type.MENU[],
      none: false
    };
  },
  mounted() {
    this.menu = (CONST.LAYOUT.MENU as type.MENU[]).map((menu) => {
      if (menu.link && menu.link.includes('undefined')) {
        menu.link = menu.link.replace('undefined', this.user.user_name);
      }
      return menu;
    });
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    is_auth() {
      return this.$store.state.user.authenticated;
    }
  },
  watch: {
    user: {
      handler: function (to) {
        if (to) {
          this.menu = [];
          for (const menu of CONST.LAYOUT.MENU as type.MENU[]) {
            if (menu.link && menu.link.includes('undefined') && to.user_name != undefined) {
              menu.link = menu.link.replace('undefined', to.user_name);
            }
            this.menu.push(menu);
          }
        }
      },
      deep: true
    },
    is_auth(to) {
      return to;
    },
  }
})
</script>
<style lang="scss" scoped>
.header {
  border-bottom: 1px solid #{$gray} !important;
  z-index: 200;
  height: #{$header_height};
  .icon {
    width: 30px !important;
    height: 30px !important;
    margin-right: 8px;
    color: #{$main_gray};
  }
  .logo {
    width: 130px;
  }
}
.menu {
  .user_information {
    .v-list-item {
      .v-list-item__content {
        .user_title {
          font-size: 14px;
          font-weight: 600;
        }
        .v-list-item__subtitle {
          font-size: 12px;
          font-weight: 400;
          margin-top: 3px;
        }
      }
    }
  }
  .v-list {
    padding: 0 !important;
    .v-list-item {
      min-height: none;
      padding: 0 8px !important;
      .v-list-item__action {
        margin-right: 12px !important;
      }
      .v-list-item__title {
        font-size: #{$fotn_size_parts};
      }
    }
    .menu_col {
      height: 43px;
      .v-list-item__action {
        .icon {
          color: #{$main_gray};
        }
      }
    }
  }
}
</style>
