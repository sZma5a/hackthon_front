<template>
  <div>
    <p>Spotifyでログインしています。</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export default Vue.extend({
  data () {
    return {
      failedMessage: null
    }
  },
  methods: mapMutations([
    'setToken',
    'setUser'
  ]),
  async mounted () {
    try {
      let res = await (this as any).$axios.$get('/auth/callback', {params: this.$route.query});
      this.$store.dispatch('user/setAccessTokenState', res.access_token);
      cookies.set('refresh_token', res.refresh_token);
      res = await (this as any).$axios.$get('/user/me');
      this.$store.dispatch('user/setUserData', res);
      this.$store.dispatch('user/setLoginState', true);
      this.$router.push(`/box/create`)
    } catch(e) {
      this.$router.push('/auth/signin');
    }
  }
})
</script>
