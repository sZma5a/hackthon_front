import { CONST } from '@/src/const';
import { Dispatch } from 'vuex';
import { Context } from '@nuxt/types';
import * as type from '@/src/interfaces';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

interface Argument {
  $axios: NuxtAxiosInstance,
  app: Context['app'],
  store: Context['store']
  redirect: type.NuxtContext['redirect'],
  dispatch: Dispatch,
}

export default ({$axios, app, store, redirect}: Argument, dispatch: Dispatch) => {
  $axios.defaults.baseURL = app.$config.API_SERVER;
  $axios.defaults.withCredentials = true;
  $axios.onRequest((config: any) => {
    config.headers.common = CONST.API.HEADER;
    if (store.state.user.access_token) {
      config.headers.common['Authorization'] = `Bearer ${store.state.user.access_token}`;
    }
    return config;
  })

  $axios.onError((error: any) => {
    if (!error.response) {
      return
    }
    const code = error.response.status;
    // if (code === 401) {
    //   // dispatch('user/setLoginState', false);
    //   // dispatch('user/setAccessTokenState', '');
    //   // dispatch('user/setUserData', {});
    //   // redirect('/auth/signin');
    // }
    if (code === 403) {
      dispatch('user/setLoginState', false);
      dispatch('user/setAccessTokenState', '');
      dispatch('user/setUserData', {});
      redirect('/auth/signin');
    }
    // if (code === 500) {
    //   redirect('/error/500');
    // }
  })

}
