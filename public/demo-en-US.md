## 😁 Basic Usage

It has been developing iteratively，so update the latest version please. Publish logs: [releases](https://github.com/imzbf/md-editor-v3/releases)

Now, we can develop vue3 project by `jsx` friendly. Editor is compatible for some enthusiasts(like me).

### 🤓 CDN

Use production version in html directly:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Global Load</title>
    <link
      href="https://unpkg.com/md-editor-v3@${EDITOR_VERSION}/lib/style.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="md-editor-v3">
      <md-editor-v3 v-model="text" />
    </div>
    <script src="https://unpkg.com/vue@3.2.47/dist/vue.global.prod.js"></script>
    <script src="https://unpkg.com/md-editor-v3@${EDITOR_VERSION}/lib/umd/index.js"></script>
    <script>
      const App = {
        data() {
          return {
            text: 'Hello Editor!!'
          };
        }
      };
      Vue.createApp(App).use(MdEditorV3.MdEditor).mount('#md-editor-v3');
    </script>
  </body>
</html>
```

### 🤖 Npm Install

```shell [install:yarn]
yarn add md-editor-v3
```

```shell [install:npm]
npm install md-editor-v3
```

When using server-side rendering, make sure to set `editorId` to a constant value.

#### 🥱 Setup Template

```vue
<template>
  <MdEditor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
</script>
```

#### 🤗 Jsx Template

```jsx
import { defineComponent, ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  name: 'MdEditor',
  setup() {
    const text = ref('');
    const onChange = (v) => (text.value = v);

    return () => <MdEditor modelValue={text.value} onChange={onChange} />;
  }
});
```

#### 📖 Preview Only

```vue
<template>
  <MdPreview :editorId="id" :modelValue="text" />
  <MdCatalog :editorId="id" :scrollElement="scrollElement" />
</template>

<script setup>
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const id = 'preview-only';
const text = ref('# Hello Editor');
const scrollElement = document.documentElement;
</script>
```

When using server-side rendering, `scrollElement` should be of string type, eg: `body`, `#id`, `.class`.

## 🎛 Used in Web Component

Complete example reference [the sample project](https://github.com/imzbf/md-editor-v3/tree/main/example/webComponent) provided in the source code.

Here are the precautions:

1. The image zoom-in view feature is ineffective; implementation needs to be done manually!!!
2. Do not use CDN to reference dependency libraries by default; refer to [[Import All Library]](https://imzbf.github.io/md-editor-v3/en-US/demo#%F0%9F%99%8D%F0%9F%8F%BB%E2%80%8D%E2%99%82%EF%B8%8F%20Import%20All%20Library)!!!
3. Only font-class type icons can be used; the default symbol type is ineffective!!!

## 🥂 Api Usage

Usages of some APIs.

### 🥶 Customize Shortcut Key

Source code for built-in shortcut key configuration: [commands.ts](https://github.com/imzbf/md-editor-v3/blob/develop/MdEditor/layouts/Content/codemirror/commands.ts). They have been added as extensions to `codemirror`.

The basic principle of replacing or deleting shortcut keys is to find the corresponding extension, and handle it.

In fact, The Second input parameter `extensions` of `codeMirrorExtensions` is an array, The first item in the array is the shortcut key extension. The third input parameter is the default shortcut key configuration.

#### 💅 Modify Shortcut Key

Change `Ctrl-b` to `Ctrl-m`

```js
import { config } from 'md-editor-v3';
import { keymap } from '@codemirror/view';

config({
  // [keymap, minimalSetup, markdown, EditorView.lineWrapping, EditorView.updateListener, EditorView.domEventHandlers, oneDark??oneLight]
  codeMirrorExtensions(theme, extensions, mdEditorCommands) {
    const newExtensions = [...extensions];
    // 1. Remove the default shortcut key extension first
    newExtensions.shift();

    // 2. Reference the source code for shortcut key configuration
    // Find the location of the configuration item for CtrlB in mdEditorCommands
    const CtrlB = mdEditorCommands[0];

    // 3. Document for configuring shortcut keys of codemirror
    // https://codemirror.net/docs/ref/#commands
    const CtrlM = {
      // We need the run method in CtrlB here
      ...CtrlB,
      key: 'Ctrl-m',
      mac: 'Cmd-m'
    };

    // 4. Add the modified shortcut key to the array
    const newMdEditorCommands = [
      CtrlM,
      ...mdEditorCommands.filter((i) => i.key !== 'Ctrl-b')
    ];

    newExtensions.push(keymap.of(newMdEditorCommands));

    return newExtensions;
  }
});
```

#### ✂️ Delete Shortcut Key

Disable all shortcut keys

```js
import { config } from 'md-editor-v3';

config({
  // [keymap, minimalSetup, markdown, EditorView.lineWrapping, EditorView.updateListener, EditorView.domEventHandlers, oneDark??oneLight]
  codeMirrorExtensions(theme, extensions) {
    const newExtensions = [...extensions];
    // 1. Remove default shortcut key extensions
    newExtensions.shift();

    // 2. Return extension list
    return newExtensions;
  }
});
```

#### 💉 Add Shortcut Key

If you want to insert content into the edit box, you need to use the `insert` method bound on the instance of editor, reference: [Insert content into the edit box](/md-editor-v3/ed-US/docs#%F0%9F%92%89%20insert).

If you are not using `config` in the component where the editor is located, you are unable to obtain instance of editor at this time. You may need to use `EventBus`.

Add shortcut key `Ctrl+m`, to insert a marking module into the editing box(`==mark==`)

`index.ts`

```js
import { config } from 'md-editor-v3';
import { keymap, KeyBinding } from '@codemirror/view';
// If you used EventBus
import bus from '@/utils/event-bus';

config({
  // [keymap, minimalSetup, markdown, EditorView.lineWrapping, EditorView.updateListener, EditorView.domEventHandlers, oneDark??oneLight]
  codeMirrorExtensions(theme, extensions, mdEditorCommands) {
    const newExtensions = [...extensions];
    // 1. Remove the default shortcut key extension first
    newExtensions.shift();

    // 2. Create a new shortcut key configuration, reference: https://codemirror.net/docs/ref/#commands
    const CtrlM: KeyBinding = {
      key: 'Ctrl-m',
      mac: 'Cmd-m',
      run: () => {
        bus.emit('insertMarkBlock');
        return true;
      }
    };

    // 4. Add a new shortcut key to the array
    const newMdEditorCommands = [...mdEditorCommands, CtrlM];

    newExtensions.push(keymap.of(newMdEditorCommands));

    return newExtensions;
  }
});
```

Next, listening 'insertMarkBlock' in the component where the editor is located

`index.vue`

```vue
<template>
  <MdEditor ref="mdEditorRef" v-model="text" />
</template>

<script setup lang="ts">
import { MdEditor } from 'md-editor-v3';
import type { ExposeParam } from 'md-editor-v3';
import { ref, onMounted } from 'vue';
// If you used EventBus
import bus from '@/utils/event-bus';

const text = ref<string>('## md-editor-v3\n\n');

const mdEditorRef = ref<ExposeParam>();

onMounted(() => {
  bus.on('insertMarkBlock', () => {
    mdEditorRef.value?.insert((selectedText) => {
      return {
        targetValue: `==${selectedText}==`,
        select: true,
        deviationStart: 2,
        deviationEnd: -2
      };
    });
  });
});
</script>
```

Attach: Simple version of `EventBus`

```ts
/* eslint-disable @typescript-eslint/ban-types */
class EventBus {
  private events: Map<string, Function[]>;

  constructor() {
    this.events = new Map();
  }

  on(eventName: string, fn: Function) {
    if (!eventName) {
      console.error('Get a wrong eventName');
      return false;
    }

    if (!(fn instanceof Function)) {
      console.error('Get a wrong callback');
      return false;
    }

    const fns = this.events.get(eventName) || [];
    fns.push(fn);
    this.events.set(eventName, fns);
  }

  emit(eventName: string, ...args: any[]) {
    this.events.get(eventName)?.forEach((fn) => {
      fn(args);
    });
  }
}

export default new EventBus();
```

### 🍦 Change Theme

Themes are divided into editor theme(`theme`), article preview theme(`previewTheme`) and code theme(`codeTheme`).

#### 🍧 Editor Theme

Support `light` and `dark` default.

```vue
<template>
  <MdEditor v-model="state.text" :theme="state.theme" />
</template>

<script setup>
import { reactive } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const state = reactive({
  text: '',
  theme: 'dark'
});
</script>
```

#### 🍡 Preview Theme

There are 6 kinds of themes: `default`, `github`, `vuepress`, `mk-cute`, `smart-blue` and `cyanosis`. It is useful When you want to show your article directly. Modify `previewTheme`.

- Usage

  ```vue
  <template>
    <MdEditor v-model="state.text" :previewTheme="state.theme" />
  </template>

  <script setup>
  import { reactive } from 'vue';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const state = reactive({
    text: '',
    theme: 'cyanosis'
  });
  </script>
  ```

- Custom

  1. Write `css` under the `xxx-theme` claa. `xxx` is the name of your theme, for more examples, refer to [markdown-theme](https://github.com/imzbf/markdown-theme).

  _xxx.css_

  ```css
  .xxx-theme code {
    color: red;
  }
  ```

  2. Import

  ```js
  import 'xxx.css';
  ```

  3. Set `previewTheme`

  ```vue
  <template>
    <MdEditor previewTheme="xxx" />
  </template>
  ```

#### 🎄 Code Theme

There are 8 kinds of themes: `atom`, `a11y`, `github`, `gradient`, `kimbie`, `paraiso`,`qtcreator` and `stackoverflow`, they are all from [highlight.js](https://highlightjs.org/).

- Usage

  ```vue
  <template>
    <MdEditor v-model="state.text" :codeTheme="state.theme" />
  </template>

  <script setup>
  import { reactive } from 'vue';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const state = reactive({
    text: '',
    theme: 'atom'
  });
  </script>
  ```

- Custom

  1. Find or Write your favorite theme, then config them:

  ```js
  import { config } from 'md-editor-v3';

  config({
    editorExtensions: {
      highlight: {
        css: {
          xxxxx: {
            light: 'https://unpkg.com/highlight.js@11.2.0/styles/xxxxx-light.css',
            dark: 'https://unpkg.com/highlight.js@11.2.0/styles/xxxxx-dark.css'
          },
          yyyyy: {
            light: 'https://unpkg.com/highlight.js@11.2.0/styles/xxxxx-light.css',
            dark: 'https://unpkg.com/highlight.js@11.2.0/styles/xxxxx-dark.css'
          }
        }
      }
    }
  });
  ```

  If some keys in object `css` are same as Editor's, Editor's whill be replaced.

  2. Set `codeTheme`

  ```vue
  <template>
    <MdEditor codeTheme="xxxxx" />
  </template>
  ```

### 🛠 Config Extensions

Extensions highlight, prettier, cropper, screenfull are import from `cdn`. When your project is running offline, replace urls of these extensions. Some Extensions support be injected in development environment.

Example for `screenfull`:

#### ⚰️ Inject Directly

```vue
<template>
  <MdEditor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import screenfull from 'screenfull';
import { MdEditor, config } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

config({
  editorExtensions: {
    screenfull: {
      instance: screenfull
    }
  }
});

const text = ref('');
</script>
```

#### 📡 Intranet Link

Get files from [unpkg.com](https://unpkg.com).

```vue
<template>
  <MdEditor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor, config } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

config({
  editorExtensions: {
    screenfull: {
      js: 'https://localhost:8090/screenfull@5.2.0/index.js'
    }
  }
});

const text = ref('');
</script>
```

### 📷 Upload Pictures

By default, you can select multiple pictures. You can paste and upload screenshots and copy web page pictures.

> Tips: When pasting pictures, if they are GIF graphs, it does not work! Please upload it by file system.

```vue
<template>
  <MdEditor v-model="text" @onUploadImg="onUploadImg" />
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('# Hello Editor');

const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append('file', file);

        axios
          .post('/api/img/upload', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );

  callback(res.map((item) => item.data.url));
};
</script>
```

### 🏳️‍🌈 Extension Language

```vue
<template>
  <MdEditor v-model="state.text" :language="state.language" />
</template>

<script setup>
import { reactive } from 'vue';
import { MdEditor, config } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

config({
  editorConfig: {
    languageUserDefined: {
      'my-lang': {
        toolbarTips: {
          bold: 'bold',
          underline: 'underline',
          italic: 'italic',
          strikeThrough: 'strikeThrough',
          title: 'title',
          sub: 'subscript',
          sup: 'superscript',
          quote: 'quote',
          unorderedList: 'unordered list',
          orderedList: 'ordered list',
          task: 'task list',
          codeRow: 'inline code',
          code: 'block-level code',
          link: 'link',
          image: 'image',
          table: 'table',
          mermaid: 'mermaid',
          katex: 'formula',
          revoke: 'revoke',
          next: 'undo revoke',
          save: 'save',
          prettier: 'prettier',
          pageFullscreen: 'fullscreen in page',
          fullscreen: 'fullscreen',
          preview: 'preview',
          htmlPreview: 'html preview',
          catalog: 'catalog',
          github: 'source code'
        },
        titleItem: {
          h1: 'Lv1 Heading',
          h2: 'Lv2 Heading',
          h3: 'Lv3 Heading',
          h4: 'Lv4 Heading',
          h5: 'Lv5 Heading',
          h6: 'Lv6 Heading'
        },
        imgTitleItem: {
          link: 'Add Img Link',
          upload: 'Upload Img',
          clip2upload: 'Clip Upload'
        },
        linkModalTips: {
          linkTitle: 'Add Link',
          imageTitle: 'Add Image',
          descLabel: 'Desc:',
          descLabelPlaceHolder: 'Enter a description...',
          urlLabel: 'Link:',
          urlLabelPlaceHolder: 'Enter a link...',
          buttonOK: 'OK'
        },
        clipModalTips: {
          title: 'Crop Image',
          buttonUpload: 'Upload'
        },
        copyCode: {
          text: 'Copy',
          successTips: 'Copied!',
          failTips: 'Copy failed!'
        },
        mermaid: {
          flow: 'flow',
          sequence: 'sequence',
          gantt: 'gantt',
          class: 'class',
          state: 'state',
          pie: 'pie',
          relationship: 'relationship',
          journey: 'journey'
        },
        katex: {
          inline: 'inline',
          block: 'block'
        },
        footer: {
          markdownTotal: 'Word Count',
          scrollAuto: 'Scroll Auto'
        }
      }
    }
  }
});

const state = reactive({
  text: '',
  language: 'my-lang'
});
</script>
```

You can install the existing language also: [md-editor-extension](https://github.com/imzbf/md-editor-extension). Refer to extension library for the usage and the way to contribute~

### 📄 Get Catalogue

- Get

  ```vue
  <template>
    <MdEditor v-model="text" @onGetCatalog="onGetCatalog" />
  </template>

  <script setup>
  import { reactive } from 'vue';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const state = reactive({
    text: '',
    catalogList: []
  });

  const onGetCatalog = (list) => {
    state.catalogList = list;
  };
  </script>
  ```

- Display

  Use `MdCatalog`

  ```vue
  <template>
    <MdPreview :modelValue="state.text" :editorId="state.id" :theme="state.theme" />
    <MdCatalog :editorId="state.id" :scrollElement="scrollElement" :theme="state.theme" />
  </template>

  <script setup>
  import { reactive } from 'vue';
  import { MdPreview, MdCatalog } from 'md-editor-v3';
  import 'md-editor-v3/lib/preview.css';

  const state = reactive({
    theme: 'dark',
    text: '',
    id: 'my-editor'
  });

  const scrollElement = document.documentElement;
  </script>
  ```

### 🪚 Define Toolbar

> after v1.6.0, You can sort the toolbar as you like, split tools by `'-'`, the left and right toolbars are divided by `'='`！

```vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars" />
</template>

<script setup>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const toolbars = ['italic', 'underline', '-', 'bold', '=', 'github'];
</script>
```

### 💪 Customize Toolbar

There are examples of `mark` and `emoji`.

To get complete code, refer to [docs](https://github.com/imzbf/md-editor-v3/blob/docs/src/pages/Preview/index.vue).

![mark and Emoji extension](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

> Get more emojis, go to [https://getemoji.com/](https://getemoji.com/).

### 🧙‍♂️ Change Styles

```less
.css-vars(@isDark) {
  --md-color: if(@isDark, #999, #222);
  --md-hover-color: if(@isDark, #bbb, #000);
  --md-bk-color: if(@isDark, #000, #fff);
  --md-bk-color-outstand: if(@isDark, #333, #f2f2f2);
  --md-bk-hover-color: if(@isDark, #1b1a1a, #f5f7fa);
  --md-border-color: if(@isDark, #2d2d2d, #e6e6e6);
  --md-border-hover-color: if(@isDark, #636262, #b9b9b9);
  --md-border-active-color: if(@isDark, #777, #999);
  --md-modal-mask: #00000073;
  --md-scrollbar-bg-color: if(@isDark, #0f0f0f, #e2e2e2);
  --md-scrollbar-thumb-color: if(@isDark, #2d2d2d, #0000004d);
  --md-scrollbar-thumb-hover-color: if(@isDark, #3a3a3a, #00000059);
  --md-scrollbar-thumb-active-color: if(@isDark, #3a3a3a, #00000061);
}

.md-editor {
  .css-vars(false);
}

.md-editor-dark {
  .css-vars(true);
}
```

Change background color in dark mode:

```css
.md-editor-dark {
  --md-bk-color: #333 !important;
}
```

### 🙍🏻‍♂️ Import All Library

1. Install Dependencies

```shell
yarn add screenfull katex cropperjs mermaid highlight.js prettier
```

2. Configure

!!! warning

We recommend configuring it at the project entry point, such as in `main.js` for projects created with Vite. Avoid calling `config` within components!

!!!

main.js

```js
import { config } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import screenfull from 'screenfull';

import katex from 'katex';
import 'katex/dist/katex.min.css';

import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

import mermaid from 'mermaid';

import highlight from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// <3.0
import prettier from 'prettier';
import parserMarkdown from 'prettier/parser-markdown';
// >=3.0
import * as prettier from 'prettier';
import parserMarkdown from 'prettier/plugins/markdown';

// ${iconfontSvgUrl}
import './assets/iconfont.js';

config({
  editorExtensions: {
    prettier: {
      prettierInstance: prettier,
      parserMarkdownInstance: parserMarkdown
    },
    highlight: {
      instance: highlight
    },
    screenfull: {
      instance: screenfull
    },
    katex: {
      instance: katex
    },
    cropper: {
      instance: Cropper
    },
    mermaid: {
      instance: mermaid
    }
  }
});
```

```vue
<template>
  <MdEditor v-model="text" noIconfont />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('');
</script>
```

> Tips: While import highlight styles by yourself, editor will not be able to change code styles.

### 🔒 Compile-time Prevention of XSS

The built-in XSS extension has already handled dangerous code during compilation, and on top of the default whitelist, it includes additional tags and attributes:

```json::close
{
  "img": ["class"],
  // Task List
  "input": ["class", "disabled", "type", "checked"],
  // Embedded video codes such as YouTube, WeTV, and Bilibili
  "iframe": [
    "class",
    "width",
    "height",
    "src",
    "title",
    "border",
    "frameborder",
    "framespacing",
    "allow",
    "allowfullscreen"
  ]
}
```

#### 🔓 Remove XSS extension

```js
config({
  markdownItPlugins(plugins) {
    return plugins.filter((p) => p.type !== 'xss');
  }
});
```

#### 🔏 Modify XSS configuration

Add a configuration that allows for events where image loading fails

```js
import { config } from 'md-editor-v3';
// import { getDefaultWhiteList } from 'xss';

config({
  markdownItPlugins(plugins) {
    return plugins.map((p) => {
      if (p.type === 'xss') {
        return {
          ...p,
          options: {
            // Option 1: Extend All by Yourself
            // xss() {
            //   return {
            //     whiteList: Object.assign({}, getDefaultWhiteList(), {
            //       // If you need to use task list, please keep this configuration
            //       img: ['class'],
            //       input: ['class', 'disabled', 'type', 'checked'],
            //       // If you need to use embedded video code, please keep this configuration
            //       iframe: [
            //         'class',
            //         'width',
            //         'height',
            //         'src',
            //         'title',
            //         'border',
            //         'frameborder',
            //         'framespacing',
            //         'allow',
            //         'allowfullscreen'
            //       ],
            //       img: ['onerror']
            //     })
            //   };
            // }
            // Option 2: Add on Top of the Default Whitelist. ^4.15.6
            extendedWhiteList: {
              img: ['onerror']
            }
          }
        };
      }

      return p;
    });
  }
});
```

More configuration references: [js-xss](https://github.com/leizongmin/js-xss/tree/master)

### 🔒 Prevent XSS after compilation

Using `sanitize` to sanitize `html`. eg: `sanitize-html`

```shell
yarn add sanitize-html
```

```vue
<template>
  <MdEditor :sanitize="sanitize" />
</template>

<script setup>
import sanitizeHtml from 'sanitize-html';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const sanitize = (html) => {
  return sanitizeHtml(html);
};
</script>
```

### 🗂 Folding Document Content

```js
import { config } from 'md-editor-v3';
import { foldGutter } from '@codemirror/language';
import { lineNumbers } from '@codemirror/view';

config({
  codeMirrorExtensions(_theme, extensions) {
    return [...extensions, lineNumbers(), foldGutter()];
  }
});
```

### 🏄🏻‍♂️ Open Links In New Window

1. Install additional extensions

```shell
yarn add markdown-it-link-attributes
```

2. Add extensions to the compiler

```js
import { config } from 'md-editor-v3';
import LinkAttr from 'markdown-it-link-attributes';
// import Anchor from 'markdown-it-anchor';

config({
  markdownItPlugins(plugins) {
    return [
      ...plugins,
      {
        type: 'linkAttr',
        plugin: LinkAttr,
        options: {
          matcher(href: string) {
            // If markdown-it-anchor is used.
            // Anchor links at the heading should be ignored.
            return !href.startsWith('#');
          },
          attrs: {
            target: '_blank'
          }
        }
      },
      // {
      //   type: 'anchor',
      //   plugin: Anchor,
      //   options: {
      //     permalink: Anchor.permalink.headerLink(),
      //     slugify(s: string) {
      //       return s;
      //     }
      //   }
      // }
    ];
  }
});
```

### ☑️ Toggleable status task list

```js
import { config } from 'md-editor-v3';
config({
  markdownItPlugins(plugins, { editorId }) {
    return plugins.map((item) => {
      if (item.type === 'taskList') {
        return {
          ...item,
          options: {
            ...item.options,
            enabled: true
            // If you just want to enable this feature for a certain editor
            // enabled: editorId === 'myId'
          }
        };
      }
      return item;
    });
  }
});
```

```vue
<MdEditor editorId="myId" v-model="text" />
```

## 🧻 Edit This Page

[demo-en-US](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/demo-en-US.md)
