import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style.less';

import 'nprogress/nprogress.css';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import MarkExtension from './utils/marked-mark';

MdEditor.config({
  markedExtensions: [MarkExtension],
  markedRenderer(renderer) {
    renderer.heading = (text, level) => {
      return `<h${level} id="${text}">${text}</h${level}>`;
    };

    renderer.link = (href, title, text) => {
      return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
    };

    return renderer;
  },
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
