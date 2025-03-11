import { createApp } from 'vue';
import App from './App';

import { MdEditor, config, editorExtensionsAttrs, XSSPlugin } from '~~/index';
// import TargetBlankExtension from './image/TargetBlankExtension.js';
// import 'katex/dist/katex.min.css';

// import { Extension } from '@codemirror/state';
import { lineNumbers } from '@codemirror/view';
// import { autocompletion, CompletionContext } from '@codemirror/autocomplete';
// import DDD from './.local/DDD.vue';
// import screenfull from 'screenfull';
// import katex from 'katex';
// import Cropper from 'cropperjs';
// import 'cropperjs/dist/cropper.css';
// import mermaid from 'mermaid';
// import highlight from 'highlight.js';
// import 'highlight.js/styles/tokyo-night-dark.css';

// import prettier from 'prettier';
// import parserMarkdown from 'prettier/plugins/markdown';

// import ancher from 'markdown-it-anchor';

// import { cdnBase } from '~/config';

// const myCompletions = (context: CompletionContext) => {
//   const word = context.matchBefore(/@|\w*/);
//   if (word!.from == word!.to && !context.explicit) return null;

//   return {
//     from: word!.from,
//     options: [
//       { label: '@imzbf', type: 'text' },
//       { label: '@github', type: 'text' },
//       { label: 'match', type: 'keyword' },
//       { label: 'hello', type: 'variable', info: '(World)' },
//       { label: 'helo', type: 'variable', info: '(MD)' },
//       { label: 'magic', type: 'text', apply: '⠁⭒*.✩.*⭒⠁', detail: 'macro' }
//     ]
//   };
// };

config({
  codeMirrorExtensions(theme, extensions) {
    // console.log(theme, extensions, keyBindings);

    // return extensions;
    return [...extensions, lineNumbers()];
  },
  // iconfontType: 'class',
  // markdownItConfig: (mdit) => {
  // mdit.use(ancher, {
  //   permalink: true
  // });
  markdownItPlugins(plugins, { editorId }) {
    return [
      ...plugins,
      {
        type: 'xss',
        plugin: XSSPlugin,
        options: {}
      }
    ].map((item) => {
      switch (item.type) {
        case 'taskList': {
          return {
            ...item,
            options: {
              ...item.options,
              enabled: editorId === 'md-prev'
            }
          };
        }
        case 'code': {
          return {
            ...item,
            options: {
              ...item.options,
              extraTools: '<span class="extra-code-tools">额外的功能</span>'
            }
          };
        }

        default: {
          return item;
        }
      }
    });
  },

  // mdit.use(TargetBlankExtension);
  // },
  mermaidConfig: (base) => {
    return base;
  },
  editorConfig: {
    zIndex: 2000
  },
  editorExtensions: {
    // prettier: {
    //   prettierInstance: prettier,
    //   parserMarkdownInstance: parserMarkdown
    // },
    // highlight: {
    //   instance: highlight,
    //   css: {
    //     'tokyo-night': {
    //       light: `${cdnBase}/highlight.js/11.5.1/styles/tokyo-night-light.min.css`,
    //       dark: `${cdnBase}/highlight.js/11.5.1/styles/tokyo-night-dark.min.css`
    //     }
    //   }
    // },
    // screenfull: {
    //   instance: screenfull
    // },
    // katex: {
    //   instance: katex
    // },
    // cropper: {
    //   instance: Cropper
    // },
    mermaid: {
      //   instance: mermaid
      enableZoom: true
    }
  }
  // editorExtensionsAttrs
});

import '~/styles/style.less';

createApp(App).use(MdEditor).mount('#app');
