<template>
  <v-app dark>
    <Header />
    <v-main>
      <v-container class="set_min">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/layouts/Header';
export default {
  components: {
    Header
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
