import { MutationTree, ActionTree } from 'vuex';
import * as type from '@/src/interfaces';

export type RootState = ReturnType<typeof state>

export const state = () => ({
  authenticated: false,
  user: {},
  access_token:'',
})


export const mutations: MutationTree<RootState> = {
  changeToken(state, newToken: string) {
    state.access_token = newToken;
  },
  changeLoginState(state, newState: boolean) {
    state.authenticated = newState;
  },
  changeUser(state, newData: type.User) {
    state.user = newData;
  },
}

export const actions: ActionTree<RootState, RootState> = {
  setAccessTokenState({commit}, access_token) {
    commit('changeToken', access_token);
  },
  setLoginState({commit}, bool) {
    commit('changeLoginState', bool);
  },
  setUserData({commit}, user) {
    commit('changeUser', user);
  },
}
