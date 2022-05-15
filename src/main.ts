import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'nprogress/nprogress.css';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import MarkExtension from './utils/marked-mark';

MdEditor.config({
  markedExtensions: [MarkExtension],
  editorExtensions: {
    highlight: {
      css: {
        atom: {
          light:
            'https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/atom-one-dark.css',
          dark: 'https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/atom-one-dark.css'
        }
      }
    }
  }
});

createApp(App).use(store).use(router).use(MdEditor).mount('#app');
