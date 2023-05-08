import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/common.less';
import 'nprogress/nprogress.css';

import { config } from 'md-editor-v3';

import MarkExtension from 'markdown-it-mark';

import { lineNumbers } from '@codemirror/view';
// import { basicSetup } from 'codemirror';

import ZH_TW from '@vavt/md-editor-extension/dist/locale/zh-TW';
import '@vavt/md-editor-extension/dist/previewTheme/arknights.css';

config({
  markdownItConfig(md) {
    md.use(MarkExtension);
  },
  codeMirrorExtensions(theme, extensions) {
    const _exs = [...extensions, lineNumbers()];

    // _exs[1] = basicSetup;
    return _exs;
  },
  editorConfig: {
    languageUserDefined: {
      ZH_TW
    }
  },
  editorExtensions: {
    highlight: {
      css: {
        atom: {
          light:
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css',
          dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css'
        }
      }
    }
  }
});

createApp(App).use(store).use(router).mount('#app');
