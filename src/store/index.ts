import { STORAGED_STORE_KEY } from '@/config';
import { createStore } from 'vuex';
import { PreviewThemes } from 'md-editor-v3';

export type Theme = 'light' | 'dark';

export interface StateType {
  theme: Theme;
  previewTheme: PreviewThemes;
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
    },
    changePreviewTheme(state: StateType, value: PreviewThemes) {
      state.previewTheme = value;
    }
  }
});
