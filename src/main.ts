import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/common.less';
import 'nprogress/nprogress.css';

import { config } from 'md-editor-v3';
// 如果项目里面既有编辑器，又有仅预览模块
// 不要同时引用preview.css和style.css，style.css就包含了preview.css
// 同时引用会出现重复样式，并且打包工具不会剔除这部分
import 'md-editor-v3/lib/style.css';

import MarkExtension from 'markdown-it-mark';
import Anchor from 'markdown-it-anchor';
import LinkAttr from 'markdown-it-link-attributes';

import { lineNumbers } from '@codemirror/view';
// import { basicSetup } from 'codemirror';

import ZH_TW from '@vavt/cm-extension/dist/locale/zh-TW';
import '@vavt/cm-extension/dist/previewTheme/arknights.css';

config({
  markdownItPlugins(plugins) {
    return [
      ...plugins,
      {
        type: 'mark',
        plugin: MarkExtension,
        options: {}
      },
      {
        type: 'linkAttr',
        plugin: LinkAttr,
        options: {}
      },
      {
        type: 'anchor',
        plugin: Anchor,
        options: {
          permalink: true,
          permalinkSymbol: '#',
          permalinkBefore: true,
          permalinkSpace: false,
          slugify(s: string) {
            return s;
          }
        }
      }
    ];
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
