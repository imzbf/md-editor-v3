> Use it online: [Go](https://codesandbox.io/s/epic-bird-2znqo).

## 🤯 Props

### 📃 modelValue

- **type**: `string`
- **default**: `''`
- **description**: Markdown content.

  ```html
  <md-editor-v3 v-model="xxx" />
  ```

### 🛍 theme

- **type**: `'light' | 'dark'`
- **default**: `'light'`
- **description**: Editor's theme.

  ```html
  <md-editor-v3 theme="dark" />
  ```

### 🎀 class

- **type**: `string`
- **default**: `''`
- **description**: Editor `class`.

### 🤏🏼 historyLength

- **type**: `number`
- **default**: `10`
- **description**: The max length of history(if it is too big, editor will use more `RAM`).

### 💻 pageFullScreen

- **type**: `boolean`
- **default**: `false`
- **description**: Screenfull in web page.

### 📱 preview

- **type**: `boolean`
- **default**: `true`
- **description**: Preview content in editor.

### 📀 htmlPreview

- **type**: `boolean`
- **default**: `false`
- **description**: Preview html in editor.

### 📺 previewOnly

- **type**: `boolean`
- **default**: `false`
- **description**: Only render article content, no toolbar, no edit area.

### 🔤 language

- **type**: `string`
- **default**: `'zh-CN'`
- **description**: Build-in language('zh-CN', 'en-US').

### 🧱 toolbars

- **type**: `Array`
- **default**: `[all]`
- **description**: Show contents of toolbar, all keys.

  You can sort the toolbar as you like, split tools by `'-'`, the left and right toolbars are divided by `'='`！

  After v1.10.0, you can customize the toolbar. To display them, put index of `defToolbars` into `toolbars`(this is not standard)

  _[all]_

  ```js
  [
    'bold',
    'underline',
    'italic',
    '-',
    'strikeThrough',
    'sub',
    'sup',
    'quote',
    'unorderedList',
    'orderedList',
    '-',
    'codeRow',
    'code',
    'link',
    'image',
    'table',
    'mermaid',
    'katex',
    '-',
    'revoke',
    'next',
    'save',
    '=',
    'pageFullscreen',
    'fullscreen',
    'preview',
    'htmlPreview',
    'catalog',
    'github'
  ];
  ```

### 🧱 toolbarsExclude

- **type**: `Array`
- **default**: `[]`
- **description**: Don't show contents of toolbar.

### 🪒 noPrettier

- **type**: `boolean`
- **default**: `false`
- **description**: Use prettier to beautify content or not.

### 🎲 editorId

- **type**: `string`
- **default**: `'md-editor-v3'`
- **description**: Editor id, also the html id, it is used when there are two or more editor and server render.

### 🤏 tabWidth

- **type**: `number`
- **default**: `2`
- **description**: One tab eq some space.

### 🔢 showCodeRowNumber

- **type**: `boolean`
- **default**: `false`
- **description**: Show row number for code block or not.

### 🔦 previewTheme

- **type**: `'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'`
- **default**: `'default'`
- **description**: Preview themes.

  Custom:

  1. Write css

  ```css
  .xxx-theme {
    color: red;
  }
  ```

  2. Set `previewTheme`

  ```html
  <md-ditor-v3 preview-theme="xxx" />
  ```

  For more, refer to [markdown-theme](https://github.com/imzbf/markdown-theme).

### 🎅🏻 style

- **type**: `string | CSSProperties`
- **default**: `''`
- **description**: Editor's inline style.

### 📅 tableShape

- **type**: `[number, number]`
- **default**: `[6, 4]`
- **description**: Preset the size of the table, [columns, rows].

  ```html
  <md-editor-v3 :tableShape="[8, 4]" />
  ```

  ![Preview](https://imzbf.github.io/md-editor-v3/imgs/20211216165424.png)

### ☝️ noMermaid

- **type**: `boolean`
- **default**: `false`
- **description**: Do not want to use `mermaid`, set it to `true`.

  ```html
  <md-ditor-v3 no-mermaid />
  ```

### 🪧 placeholder

- **type**: `string`
- **default**: `''`
- **description**: em-\_-！

### ☝️ noKatex

- **type**: `boolean`
- **default**: `false`
- **description**: Do not want to use `katex`, set it to `true`.

  ```html
  <md-ditor-v3 no-katex />
  ```

### 🦉 codeTheme

- **type**: `'atom'|'a11y'|'github'|'gradient'|'kimbie'|'paraiso'|'qtcreator'|'stackoverflow'`
- **default**: `'atom'`
- **description**: Highlight code css name. Get Them from `highlight.js`.

  Custom:

  1. Config `editorExtensions`

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    editorExtensions: {
      highlight: {
        css: {
          atom: {
            light:
              'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-light.min.css',
            dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css'
          },
          xxx: {
            light:
              'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/xxx-light.css',
            dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/xxx-dark.css'
          }
        }
      }
    }
  });
  ```

  2. Set `codeTheme`

  ```html
  <md-ditor-v3 code-theme="xxx" />
  ```

### 🎱 markedHeadingId

- **type**: `(text: string, level: number, index: number) => string`
- **default**: `(text) => text`
- **description**: Title `ID` generator.

  ```vue
  <template>
    <md-editor :marked-heading-id="generateId" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const generateId = (_text, _level, index) => `heading-${index}`;
  </script>
  ```

### 🐣 sanitize

- **type**: `(html: string) => string`
- **default**: `(html) => html`
- **description**: Sanitize the html, prevent XSS. When you can be sure that your content is OK, ignore this.

  `sanitize-html` example:

  ```vue
  <template>
    <md-editor :sanitize="sanitize" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import sanitizeHtml from 'sanitize-html';

  const sanitize = (html) => sanitizeHtml(html);
  </script>
  ```

### 🦶 footers

- **类型**：`Array<'markdownTotal' \| '=' \| 'scrollSwitch' \| number>`
- **默认值**：`['markdownTotal', '=', 'scrollSwitch']`
- **说明**：Show contents of footer, they are divided by `'='`. Set it to [] to hidden footer.

### 👨‍👦 scrollAuto

- **类型**：`boolean`
- **默认值**：`true`
- **说明**：Scroll default setting.

## 🎍 slots

### 💪 defToolbars

Custom toolbar in `DropdownToolbar`, `NormalToolbar` or `ModalToolbar`.

- Setup Template

  ```vue
  <template>
    <md-editor :toolbars="toolbars">
      <template #defToolbars>
        <normal-toolbar title="mark" @onClick="handler">
          <template #trigger>
            <svg class="md-icon" aria-hidden="true">
              <use xlink:href="#icon-mark"></use>
            </svg>
          </template>
        </normal-toolbar>
      </template>
    </md-editor>
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  const NormalToolbar = MdEditor.NormalToolbar;

  const toolbars = ['bold', '-', 0, '=', 'github'];

  const handler = () => {
    console.log('NormalToolbar clicked!');
  };
  </script>
  ```

- Jsx Template

  ```jsx
  import { defineComponent } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  export default defineComponent({
    setup() {
      return () => (
        <MdEditor
          toolbars={['bold', '-', 0, '=', 'github']}
          defToolbars={
            <>
              <MdEditor.NormalToolbar
                trigger={
                  <svg class={`md-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-strike-through" />
                  </svg>
                }
              ></MdEditor.NormalToolbar>
            </>
          }
        />
      );
    }
  });
  ```

![NormalToolbar](https://imzbf.github.io/md-editor-v3/imgs/normal-toolbar.gif)

![DropdownToolbar](https://imzbf.github.io/md-editor-v3/imgs/dropdown-toolbar.gif)

For more info, Get **Internal Components** heading. Get source code of **mark**, **emoji** and **modal preview** at [docs](https://github.com/imzbf/md-editor-v3/tree/docs/src/components) branch.

### 🦿 defFooters

- Setup Template

  ```vue
  <template>
    <md-editor :footers="footers">
      <template #defFooters>
        <span>￥_￥</span>
        <span>^_^</span>
      </template>
    </md-editor>
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const footers = ['markdownTotal', 0, '=', 1, 'scrollSwitch'];
  </script>
  ```

- Jsx Template

  ```jsx
  import { defineComponent } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  export default defineComponent({
    setup() {
      return () => (
        <MdEditor
          footers={['markdownTotal', 0, '=', 1, 'scrollSwitch']}
          defFooters={
            <>
              <span>￥_￥</span>
              <span>^_^</span>
            </>
          }
        />
      );
    }
  });
  ```

![](https://imzbf.github.io/md-editor-v3/imgs/footer.png)

## 🪢 Event

### 📞 onChange

- **type**: `(v: string) => void`
- **description**: Content changed event(bind to `oninput` of `textarea`).

### 💾 onSave

- **type**: `(v: string) => void`
- **description**: Save Content event, `ctrl+s` and click button will trigger.

### 📸 onUploadImg

- **type**: `(files: Array<File>, callback: (urls: Array<string>) => void) => void`
- **description**: Upload picture event, when picture is uploading the modal will not close, please provide right urls to the callback function.

  ```js
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
  ```

  ```html
  <md-ditor-v3 @onUploadImg="onUploadImg" />
  ```

### ☎️ onHtmlChanged

- **type**: `(h: string) => void`
- **description**: Compile markdown successful event, ou can use it to get the html code.

### 🗒 onGetCatalog

- **type**: `(list: HeadList[]) => void`
- **description**: Get catalogue of article.

### 💀 onError

- **type**: `(err: { name: string; message: string;}) => void`
- **description**: Run-Time error event, only be called when `Cropper`, `fullScreen`, `prettier` is not loaded.

  ```js
  const onError = (err) => {
    alert(err.message);
  };
  ```

  ```html
  <md-ditor-v3 @onError="onError" />
  ```

## 💴 Config Editor

Custom `marked renderer` in `MdEditor.config(option: ConfigOption)`.

- markedRenderer: `(renderer: Renderer) => Renderer`

  Open target page in a new browser window:

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedRenderer(renderer) {
      renderer.link = (href, title, text) => {
        return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
      };

      return renderer;
    }
  });
  ```

  > docs: https://marked.js.org/using_pro#renderer

- markedExtensions: `Array<marked.TokenizerExtension & marked.RendererExtension>`

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedExtensions: [your extension]
  });
  ```

  > marked docs: https://marked.js.org/using_pro#extensions

  [Docs page source code](https://github.com/imzbf/md-editor-v3/blob/docs/src/main.ts)

- markedOptions: `marked.MarkedOptions`

  Do not render `<br>` on a single line break:

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedOptions: { breaks: false }
  });
  ```

  > marked docs: https://marked.js.org/using_advanced#options

- editorConfig: Add more languages, reset `mermaid` template or delay rendering time

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    editorConfig: {
      languageUserDefined: {
        'en-US': {
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
            title: 'Add ',
            descLable: 'Desc:',
            descLablePlaceHolder: 'Enter a description...',
            urlLable: 'Link:',
            UrlLablePlaceHolder: 'Enter a link...',
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
        },
        // mermaid template
        mermaidTemplate: {
          flow: `flow tempalte`,
          sequence: `sequence template`,
          gantt: `gantt template`,
          class: `class template`,
          state: `state template`,
          pie: `pie template`,
          relationship: `relationship template`,
          journey: `journey template`
        },
        // delay rendering time(ms)
        renderDelay: 0
      }
    }
  });
  ```

- editorExtensions: Config some dependency libraries, like highlight..

  ```typescript
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    editorExtensions: { iconfont: 'https://xxx.cc' }
  });
  ```

  <details>
    <summary>[EditorExtensions]</summary>

  ```ts
  import MdEditor from 'md-editor-v3';

  interface EditorExtensions {
    highlight?: {
      instance?: any;
      js?: string;
      css?: {
        [key: string]: {
          light: string;
          dark: string;
        };
      };
    };
    prettier?: {
      standaloneJs?: string;
      parserMarkdownJs?: string;
    };
    cropper?: {
      instance?: any;
      js?: string;
      css?: string;
    };
    iconfont?: string;
    screenfull?: {
      instance?: any;
      js?: string;
    };
    mermaid?: {
      instance?: any;
      js?: string;
    };
    katex?: {
      instance?: any;
      js?: string;
      css?: string;
    };
  }
  ```

  </details>

## 🪡 Shortcut key

| key | function | description |
| --- | --- | --- |
| TAB | insert space | Insert space, the length eq `tabWidth`, default: 2, support multiline |
| SHIFT + TAB | delete space, setting is the same as Tab |  |
| CTRL + C | copy | When selected, copy the selected content. When not selected, copy the content of the current line |
| CTRL + X | shear | When selected, cut the selected content. When not selected, cut the current line |
| CTRL + D | delete | When selected, delete the selected content. When not selected, delete the current line |
| CTRL + S | save | Trigger `onSave` event |
| CTRL + B | bold text | `**bold**` |
| CTRL + U | underline | `<u>underline</u>` |
| CTRL + I | italic | `*italic*` |
| CTRL + 1-6 | h1-h6 | `# title` |
| CTRL + ↑ | superscript | `<sup>superscript</sup>` |
| CTRL + ↓ | subscript | `<sub>subscript</sub>` |
| CTRL + Q | quote | `> quote` |
| CTRL + O | ordered list | `1. ordered list` |
| CTRL + L | link | `[link](https://github.com/imzbf/md-editor-v3)` |
| CTRL + Z | withdraw | Withdraw history in editor, not the function of system |
| CTRL + SHIFT + S | line-through | `~line-through~` |
| CTRL + SHIFT + U | unordered list | `- unordered list` |
| CTRL + SHIFT + C | code block |  |
| CTRL + SHIFT + I | picture | `![picture](https://imzbf.cc)` |
| CTRL + SHIFT + Z | forward | Forward history in editor, not the function of system |
| CTRL + SHIFT + F | Beautify |  |
| CTRL + ALT + C | code row |  |
| CTRL + SHIFT + ALT + T | table | `\|table\|` |

## 🪤 Internal Components

They are used as attributes of the editor component, eg: `Editor.DropdownToolbar`

### 🐣 NormalToolbar

`Editor.NormalToolbar`

- **props**

  - `title`: `string`, not necessary, title of toolbar.

- **events**

  - `onClick`: `(e: MouseEvent) => void`, necessary.

- **slots**

  - `trigger`: `string | JSX.Element`, necessary, it is usually an icon, which is displayed on the toolbar.

usage:

```vue
<template>
  <md-editor-v3 v-model="text">
    <template #defToolbars>
      <normal-toolbar title="mark" @onClick="callback">
        <template #trigger>
          <svg class="md-icon" aria-hidden="true">
            <use xlink:href="#icon-mark"></use>
          </svg>
        </template>
      </normal-toolbar>
    </template>
  </md-editor-v3>
</template>
```

[MarkExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/MarkExtension/index.vue)

### 🐼 DropdownToolbar

`Editor.DropdownToolbar`

- **props**

  - `title`: `string`, not necessary, title of toolbar.
  - `visible`: `boolean`, necessary.

- **events**

  - `onChange`: `(visible: boolean) => void`, necessary.

- **slots**

  - `trigger`: `string | JSX.Element`, necessary, it is usually an icon, which is displayed on the toolbar.
  - `overlay`: `string | JSX.Element`, necessary, content of dropdown box.

usage:

```vue
<template>
  <md-editor-v3 v-model="text">
    <template #defToolbars>
      <dropdown-toolbar
        title="emoji"
        :visible="data.emojiVisible"
        :onChange="emojiVisibleChanged"
      >
        <template #overlay>
          <div class="emoji-container">
            <ol class="emojis">
              <li
                v-for="(emoji, index) of emojis"
                :key="`emoji-${index}`"
                @click="emojiHandler(emoji)"
                v-text="emoji"
              ></li>
            </ol>
          </div>
        </template>
        <template #trigger>
          <svg class="md-icon" aria-hidden="true">
            <use xlink:href="#icon-emoji"></use>
          </svg>
        </template>
      </dropdown-toolbar>
    </template>
  </md-editor-v3>
</template>
```

[EmojiExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/EmojiExtension/index.vue)

### 🦉 ModalToolbar

- **props**

  - `title`: `string`, not necessary, title of toolbar.
  - `modalTitle`: `string`, not necessary, title of the Modal.
  - `visible`: `boolean`, necessary, visibility of Modal.
  - `width`: `string`, not necessary, width of Modal, default `auto`.
  - `height`: `string`, same as `width`.
  - `showAdjust`: `boolean`, not necessary, visibility of fullscreen button.
  - `isFullscreen`: `boolean`, necessary when `showAdjust = true`, status of fullscreen.

- **events**

  - `onClick`: `() => void`, necessary.
  - `onClose`: `() => void`, necessary, close event.
  - `onAdjust`: `(val: boolean) => void`, fullscreen button click event.

- **slots**

  - `trigger`: `string | JSX.Element`, necessary, it is usually an icon, which is displayed on the toolbar.
  - `overlay`: `string | JSX.Element`, necessary, content of Modal.

```vue
<template>
  <md-editor-v3 v-model="data.text">
    <template #defToolbars>
      <modal-toolbar
        :visible="data.modalVisible"
        :is-fullscreen="data.modalFullscreen"
        show-adjust
        title="Preview"
        modal-title="Page Preview"
        width="870px"
        height="600px"
        @onClick="data.modalVisible = true"
        @onClose="data.modalVisible = false"
        @onAdjust="data.modalFullscreen = !data.modalFullscreen"
      >
        <span>content</span>
        <template #trigger>
          <svg class="md-icon" aria-hidden="true">
            <use xlink:href="#icon-read"></use>
          </svg>
        </template>
      </modal-toolbar>
    </template>
  </md-editor-v3>
</template>

<script setup>
import { reactive } from 'vue';

const data = reactive({
  text: '',
  modalVisible: false,
  modalFullscreen: false
});
</script>
```

[ReadExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/ReadExtension/index.vue)

### 🐻 MdCatalog

`Editor.MdCatalog`

- **props**

  - `editorId`: `string`, necessary, editor's `editorId`, used to register listening events.
  - `class`: `string`, not necessary.
  - `markedHeadingId`: `MarkedHeadingId`, not necessary, same as editor.
  - `scrollElement`: `string | HTMLElement`, not necessary, it is an element selector when its type is string. When `previewOnly` eq `true`, it is usually set to `document.documentElement`.
  - `theme`: 'light' | 'dark', not necessary, provide it when you want to change theme online, it is the same as Editor `theme`.

usage:

```vue
<template>
  <md-editor-v3
    v-model="state.text"
    :editorId="state.id"
    :theme="state.theme"
    preview-only
  />
  <md-atalog :editorId="state.id" :scrollElement="scrollElement" :theme="state.theme" />
</template>

<script setup>
import { reactive } from 'vue';

const state = reactive({
  theme: 'dark',
  text: 'heading',
  id: 'my-editor'
});

const scrollElement = document.documentElement;
</script>
```

## ✍️ Edit this page

[doc-en-US](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/doc-en-US.md)
