import { Dispatch } from 'vuex';
import { Context } from '@nuxt/types';


interface Argument {
  dispatch: Dispatch
}

export const actions = {
  async nuxtServerInit({dispatch}: Argument, context: Context) {
    const {app} = context;
    let res;
    try {
      const refresh_token = app.$cookies.get('refresh_token');
      app.$cookies.remove('refresh_token');
      if (refresh_token) {
        try {
          res = await app.$axios.$post('/auth/refresh', {
            grant_type: 'refresh_token',
            // client_id: app.$config.SCENERY_CLIENT_ID,
            // client_secret: app.$config.SCENERY_CLIENT_SECRET,
            // scope: '*',
            refresh_token: refresh_token,
          });
          app.$cookies.set('refresh_token', res.refresh_token);
          dispatch('user/setLoginState', true);
          dispatch('user/setAccessTokenState', res.access_token);
          const userRes = await app.$axios.$get('/user/me');
          dispatch('user/setUserData', userRes);
        } catch(e) {
          dispatch('user/setLoginState', false);
          dispatch('user/setAccessTokenState', '');
          dispatch('user/setUserData', {});
        };
      }
    } catch(e) {
      console.log(e)
    }
  },
}
