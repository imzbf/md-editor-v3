import { defineStore } from 'pinia';
import { STORAGED_STORE_KEY } from '@/config';
import { type PreviewThemes } from 'md-editor-v3';

export type Theme = 'light' | 'dark';
export type Lang = 'zh-CN' | 'en-US';

export interface StateType {
  theme: Theme;
  previewTheme: PreviewThemes;
  codeTheme: string;
  lang: Lang;
  // version: number;
}

// 用于从 localStorage 获取存储的状态
const getStoredState = (): StateType | null => {
  const stagedStore = localStorage.getItem(STORAGED_STORE_KEY);

  return stagedStore ? JSON.parse(stagedStore) : null;
};

// 初始默认状态
const defaultState: StateType = {
  theme: 'light',
  previewTheme: 'default',
  codeTheme: 'atom',
  lang: 'en-US',
  // version: 5,
};

// Pinia Store 定义
export const useStore = defineStore({
  id: 'appStore',
  state: (): StateType => defaultState,
  actions: {
    changeTheme(value: Theme) {
      this.theme = value;
      this.saveState();
    },
    changePreviewTheme(value: PreviewThemes) {
      this.previewTheme = value;
      this.saveState();
    },
    changeCodeTheme(value: string) {
      this.codeTheme = value;
      this.saveState();
    },
    changeLang(lang?: Lang) {
      this.lang = lang ? lang : this.lang === 'zh-CN' ? 'en-US' : 'zh-CN';
    },
    // 保存状态到 localStorage (仅在客户端运行)
    saveState() {
      if (typeof localStorage !== 'undefined') {
        const { lang, ...stateToSave } = this.$state; // 排除 lang
        localStorage.setItem(STORAGED_STORE_KEY, JSON.stringify(stateToSave));
      }
    },
    loadState() {
      const storedData = getStoredState();

      if (storedData) {
        // 排除 lang，使用当前 lang
        const { lang, ...stateToLoad } = storedData; // 排除 lang
        Object.assign(this, stateToLoad);
      }
    },
  },
});
