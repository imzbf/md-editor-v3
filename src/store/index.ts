import { STORAGED_STORE_KEY } from '@/config';
import { createStore } from 'vuex';

export type Theme = 'light' | 'dark';
export type PreviewTheme = 'default' | 'github' | 'vuepress';

export interface StateType {
  theme: Theme;
  previewTheme: PreviewTheme;
}

const stagedStore = localStorage.getItem(STORAGED_STORE_KEY);

// export const key: InjectionKey<Store<StateType>> = Symbol();

const state: StateType = stagedStore
  ? JSON.parse(stagedStore)
  : {
      theme: 'light',
      previewTheme: 'default'
    };

export default createStore({
  state,
  mutations: {
    changeTheme(state: StateType, value: Theme) {
      state.theme = value;
    }
  }
});
