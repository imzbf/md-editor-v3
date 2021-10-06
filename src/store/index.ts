import { STORAGED_STORE_KEY } from '@/config';
import { createStore } from 'vuex';
import { PreviewThemes } from 'md-editor-v3';

export type Theme = 'light' | 'dark';

export type Lang = 'zh-CN' | 'en-US';

export interface StateType {
  // 主题
  theme: Theme;
  // 预览主题
  previewTheme: PreviewThemes;
  // 语言
  lang: Lang;
}

const stagedStore = localStorage.getItem(STORAGED_STORE_KEY);

// export const key: InjectionKey<Store<StateType>> = Symbol();

const defaultState: StateType = stagedStore
  ? JSON.parse(stagedStore)
  : {
      theme: 'light',
      previewTheme: 'default',
      lang: 'en-US'
    };

if (!defaultState.lang) {
  defaultState.lang = 'en-US';
}

export default createStore({
  state: defaultState,
  mutations: {
    changeTheme(state: StateType, value: Theme) {
      state.theme = value;
      localStorage.setItem(STORAGED_STORE_KEY, JSON.stringify(state));
    },
    changePreviewTheme(state: StateType, value: PreviewThemes) {
      state.previewTheme = value;
      localStorage.setItem(STORAGED_STORE_KEY, JSON.stringify(state));
    },
    changeLang(state: StateType) {
      state.lang = state.lang === 'zh-CN' ? 'en-US' : 'zh-CN';
      localStorage.setItem(STORAGED_STORE_KEY, JSON.stringify(state));
    }
  }
});
