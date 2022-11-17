import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/common.less';
import 'nprogress/nprogress.css';

import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import MarkExtension from './utils/marked-mark';

import ZH_TW from '@vavt/md-editor-extension/dist/locale/zh-TW';
import '@vavt/md-editor-extension/dist/previewTheme/arknights.css';

MdEditor.config({
  markedExtensions: [MarkExtension],
  markedRenderer(renderer) {
    renderer.link = (href, title, text) => {
      return `<a href="${href}" title="${title || ''}" target="_blank">${text}</a>`;
    };

    return renderer;
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

createApp(App).use(store).use(router).use(MdEditor).mount('#app');
