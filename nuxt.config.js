import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    API_SERVER: process.env.API_SERVER,
    PIC_HOST: process.env.PIC_HOST,
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s || Scenery',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: 'ハッカソン Vol1' },
      { name: 'msapplication-TileColor', content: '#da532c'},
      { name: 'theme-color', content: '#ffffff'},
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Scenery' },
      { hid: 'og:title', property: 'og:title', content: 'Scenery' },
      { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL },
      { hid: 'og:image', property: 'og:image', content: `${process.env.BASE_URL}/img/scenery_eye_catch.png` },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180' ,href: '/apple-touch-icon.png'},
      { rel: 'icon', type: 'image/png', sizes: '32x32' ,href: '/favicon-32x32.png'},
      { rel: 'icon', type: 'image/png', sizes: '16x16' ,href: '/favicon-16x16.png'},
      { rel: 'manifest' ,href: '/site.webmanifest'},
      { rel: 'mask-icon' ,href: '/safari-pinned-tab.svg', color: '#5bbad5'},
    ],
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/axios',
    '@/plugins/head',
    '@/plugins/ogp',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#3fa9f5',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
