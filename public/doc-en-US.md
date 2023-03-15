> Use it online: [Go](https://codesandbox.io/s/epic-bird-2znqo).

## 🤯 Props

### 📃 modelValue

- **type**: `string`
- **default**: `''`

  Markdown content.

  ```vue
  <MdEditor v-model="xxx" />
  ```

---

### 🛍 theme

- **type**: `'light' | 'dark'`
- **default**: `'light'`

  Editor's theme.

  ```vue
  <MdEditor theme="dark" />
  ```

---

### 🎀 class

- **type**: `string`
- **default**: `''`

  ...

---

### 🤏🏼 historyLength

- **type**: `number`
- **default**: `10`

  The max length of history(if it is too big, editor will use more `RAM`).

---

### 💻 pageFullscreen

- **type**: `boolean`
- **default**: `false`

  Screenfull in web page.

---

### 📱 preview

- **type**: `boolean`
- **default**: `true`

  Preview content in editor.

---

### 📀 htmlPreview

- **type**: `boolean`
- **default**: `false`

  Preview html in editor.

---

### 📺 previewOnly

- **type**: `boolean`
- **default**: `false`

  Only render article content, no toolbar, no edit area.

---

### 🔤 language

- **type**: `string`
- **default**: `'zh-CN'`

  Build-in language('zh-CN', 'en-US').

  You can install the existing language also: [md-editor-extension](https://github.com/imzbf/md-editor-extension). Refer to extension library for the usage and the way to contribute~

---

### 🧱 toolbars

- **type**: `Array`
- **default**: `[all]`

  Show contents of toolbar, all keys.

  You can sort the toolbar as you like, split tools by `'-'`, the left and right toolbars are divided by `'='`！

  After v1.10.0, you can customize the toolbar. To display them, put index of `defToolbars` into `toolbars`(this is not standard)

  _[all]_

  ```js
  [
    'bold',
    'underline',
    'italic',
    '-',
    'title',
    'strikeThrough',
    'sub',
    'sup',
    'quote',
    'unorderedList',
    'orderedList',
    'task',
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

---

### 🧱 toolbarsExclude

- **type**: `Array`
- **default**: `[]`

  Don't show contents of toolbar.

---

### 🪒 noPrettier

- **type**: `boolean`
- **default**: `false`

  Use prettier to beautify content or not.

---

### 🎲 editorId

- **type**: `string`
- **default**: `'md-editor-v3'`

  Editor's id, also the html id, it is used when there are two or more editor and server render.

---

### 🤏 tabWidth

- **type**: `number`
- **default**: `2`

  One tab eq some space.

---

### 🔢 showCodeRowNumber

- **type**: `boolean`
- **default**: `false`

  Show row number for code block or not.

---

### 🔦 previewTheme

- **type**: `'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'`
- **default**: `'default'`

  Preview themes.

  Custom:

  1. Write css

  ```css
  .xxx-theme {
    color: red;
  }
  ```

  2. Set `previewTheme`

  ```vue
  <MdEditor previewTheme="xxx" />
  ```

  For more, refer to [markdown-theme](https://github.com/imzbf/markdown-theme).

---

### 🎅🏻 style

- **type**: `string | CSSProperties`
- **default**: `''`

  Editor's inline style.

---

### 📅 tableShape

- **type**: `[number, number]`
- **default**: `[6, 4]`

  Preset the size of the table, [columns, rows].

  ```vue
  <MdEditor :tableShape="[8, 4]" />
  ```

  ![Preview](https://imzbf.github.io/md-editor-v3/imgs/20211216165424.png)

---

### ☝️ noMermaid

- **type**: `boolean`
- **default**: `false`

  Do not want to use `mermaid`, set it to `true`.

  ```vue
  <MdEditor noMermaid />
  ```

---

### 🪧 placeholder

- **type**: `string`
- **default**: `''`

  em-\_-！

---

### ❌ noKatex

- **type**: `boolean`
- **default**: `false`

  Do not want to use `katex`, set it to `true`.

  ```vue
  <MdEditor noKatex />
  ```

---

### 🦉 codeTheme

- **type**: `'atom'|'a11y'|'github'|'gradient'|'kimbie'|'paraiso'|'qtcreator'|'stackoverflow'`
- **default**: `'atom'`

  Highlight code css name. Get Them from `highlight.js`.

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

  ```vue
  <MdEditor codeTheme="xxx" />
  ```

---

### 🎱 markedHeadingId

- **type**: `(text: string, level: number, index: number) => string`
- **default**: `(text) => text`

  Heading `ID` generator.

  ```vue
  <template>
    <MdEditor :markedHeadingId="generateId" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const generateId = (_text, _level, index) => `heading-${index}`;

  MdEditor.config({
    markedRenderer(renderer) {
      // 'headingId' is generated by markedHeadingId that you provided.
      renderer.heading = (text, level, _r, _s, _index, headingId) => {
        // This is usually used to deal with the priority problem caused by
        // configuring 'renderer.heading' and setting 'markedHeadingId' to each editor.
        return `<h${level} id="${headingId}">${text}</h${level}>`;
      };
      return renderer;
    }
  });
  </script>
  ```

---

### 🐣 sanitize

- **type**: `(html: string) => string`
- **default**: `(html) => html`

  Sanitize the html, prevent XSS. When you can be sure that your content is OK, ignore this.

  `sanitize-html` example:

  ```vue
  <template>
    <MdEditor :sanitize="sanitize" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import sanitizeHtml from 'sanitize-html';

  const sanitize = (html) => sanitizeHtml(html);
  </script>
  ```

---

### 🦶 footers

- **type**: `Array<'markdownTotal' \| '=' \| 'scrollSwitch' \| number>`
- **default**: `['markdownTotal', '=', 'scrollSwitch']`

  Show contents of footer, they are divided by `'='`. Set it to [] to hidden footer.

---

### ⛵️ scrollAuto

- **type**: `boolean`
- **default**: `true`

  Scroll default setting.

---

### 🤞🏼 noIconfont

- **type**: `boolean`
- **default**: `true`

  Not append iconfont script, [download](https://at.alicdn.com/t/c/font_2605852_u82y61ve02.js) and import it by yourself.

  ```vue
  <template>
    <MdEditor noIconfont />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  import '/assets/iconfont.js';
  </script>
  ```

---

### 💅 formatCopiedText

- **type**: `(text: string) => string`
- **default**: `(text) => text`

  Format copied code

  ```vue
  <template>
    <MdEditor :formatCopiedText="formatCopiedText" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const formatCopiedText = (text) => {
    return `${text}  - from md-editor-v3`;
  };
  </script>
  ```

---

### 🥹 noUploadImg

- **type**: `boolean`
- **default**: `false`

  Not show the entrance to upload pictures

  ```vue
  <MdEditor noUploadImg />
  ```

---

### 🛁 codeStyleReverse

- **type**: `boolean`
- **default**: `true`

  Code style will be reversed to dark while code block of the theme has a dark background.

---

### 🧼 codeStyleReverseList

- **type**: `Array`
- **default**: `['default', 'mk-cute']`

  Themes to be reversed.

---

### 🔬 autoFocus

- **type**: `boolean`
- **default**: `false`

  Same as `autofocus` in native textarea.

---

### 🔩 disabled

- **type**: `boolean`
- **default**: `false`

  Same as `disabled` in native textarea.

---

### 🔒 readOnly

- **type**: `boolean`
- **default**: `false`

  Same as `readonly` in native textarea.

---

### 📏 maxLength

- **type**: `number`
- **default**: ``

  Same as `maxlength` in native textarea.

---

### 📥 autoDetectCode

- **type**: `boolean`
- **default**: `false`

  Auto detect the type of pasted code, only support that copied from `vscode`.

---

## 🎍 slots

### 💪 defToolbars

Custom toolbar in `DropdownToolbar`, `NormalToolbar` or `ModalToolbar`.

- Setup Template

  ```vue
  <template>
    <MdEditor :toolbars="toolbars">
      <template #defToolbars>
        <NormalToolbar title="mark" @onClick="handler">
          <template #trigger>
            <svg class="md-editor-icon" aria-hidden="true">
              <use xlink:href="#icon-mark"></use>
            </svg>
          </template>
        </NormalToolbar>
      </template>
    </MdEditor>
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

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
                  <svg class="md-editor-icon" aria-hidden="true">
                    <use xlinkHref="#icon-strike-through" />
                  </svg>
                }
              />
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

---

### 🦿 defFooters

- Setup Template

  ```vue
  <template>
    <MdEditor :footers="footers">
      <template #defFooters>
        <span>￥_￥</span>
        <span>^_^</span>
      </template>
    </MdEditor>
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

---

## 🪢 Event

### 📞 onChange

- **type**: `(v: string) => void`

  Content changed event(bind to `oninput` of `textarea`).

---

### 💾 onSave

- **type**: `(v: string, h: Promise<string>) => void`

  Save Content event, `ctrl+s` and click button will trigger.

  ```vue
  <template>
    <MdEditor @onSave="onSave" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const onSave = (v, h) => {
    console.log(v);

    h.then((html) => {
      console.log(html);
    });
  };
  </script>
  ```

---

### 📸 onUploadImg

- **type**: `(files: Array<File>, callback: (urls: Array<string>) => void) => void`

  Upload picture event, when picture is uploading the modal will not close, please provide right urls to the callback function.

  ```vue
  <template>
    <MdEditor @onUploadImg="onUploadImg" />
  </template>

  <script setup>
  import axios from 'axios';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

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

---

### 🚁 onHtmlChanged

- **type**: `(h: string) => void`

  Compile markdown successful event, ou can use it to get the html code.

---

### 🗒 onGetCatalog

- **type**: `(list: HeadList[]) => void`

  Get catalogue of article.

---

### 💀 onError

- **type**: `(err: { name: string; message: string;}) => void`

  Run-Time error event, only be called when `Cropper`, `fullscreen`, `prettier` is not loaded.

  ```vue
  <template>
    <MdEditor @onError="onError" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const onError = (err) => {
    alert(err.message);
  };
  </script>
  ```

---

### 🐾 onBlur

- **type**: `(event: FocusEvent) => void`

  Blur the textarea element.

  ```vue
  <template>
    <MdEditor @onBlur="onBlur" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const onBlur = (e) => {
    console.log('onBlur', e);
  };
  </script>
  ```

---

### 🔖 onFocus

- **type**: `(event: FocusEvent) => void`

  Focus the textarea element.

---

## 🤱🏼 Expose

After 2.5.0, Editor exposes several methods on the instance, used to get or change the internal status of the editor.

```vue
<template>
  <MdEditor ref="editorRef" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MdEditor from 'md-editor-v3';
import type { ExposeParam } from 'md-editor-v3';

import 'md-editor-v3/lib/style.css';

const editorRef = ref<ExposeParam>();

onMounted(() => {
  editorRef.value?.on('catalog', console.log);
});
</script>
```

### 👂🏼 on

Get the internal state of the editor, including pageFullscreen, fullscreen, preview, htmlPreview, catalog, etc.

- pageFullscreen

  ```js
  editorRef.value?.on('pageFullscreen', (status) => console.log(status));
  ```

- fullscreen

  ```js
  editorRef.value?.on('fullscreen', (status) => console.log(status));
  ```

- preview

  ```js
  editorRef.value?.on('preview', (status) => console.log(status));
  ```

- htmlPreview

  ```js
  editorRef.value?.on('htmlPreview', (status) => console.log(status));
  ```

- catalog

  ```js
  editorRef.value?.on('catalog', (status) => console.log(status));
  ```

---

### 💻 togglePageFullscreen

Toggle status of fullscreen within the page.

```js
editorRef.value?.togglePageFullscreen(true);
```

> Switched to the opposite status, without input parameter.

---

### 🖥 toggleFullscreen

Toggle status of fullscreen widthin browser.

```js
editorRef.value?.toggleFullscreen(true);
```

> Switched to the opposite status, without input parameter.

---

### 📖 togglePreview

Toggle status of preview.

```js
editorRef.value?.togglePreview(true);
```

> Switched to the opposite status, without input parameter.

---

### 📼 toggleHtmlPreview

Toggle status of htmlPreview.

```js
editorRef.value?.toggleHtmlPreview(true);
```

> Switched to the opposite status, without input parameter.

---

### 🧬 toggleCatalog

Toggle status of catalog.

```js
editorRef.value?.toggleCatalog(true);
```

> Switched to the opposite status, without input parameter.

---

### 💾 triggerSave

```js
editorRef.value?.triggerSave();
```

---

### 💉 insert

Manually insert content into textarea.

```js
/**
 * @params selectedText
 */
editorRef.value?.insert((selectedText) => {
  /**
   * @return targetValue    Content to be inserted
   * @return select         Automatically select content
   * @return deviationStart Start position of the selected content
   * @return deviationEnd   End position of the selected content
   */
  return {
    targetValue: `${selectedText}`,
    select: true,
    deviationStart: 0,
    deviationEnd: 0
  };
});
```

---

### 🎯 focus

focus the textarea.

```js
editorRef.value?.focus();
```

---

## 💴 Config Editor

Custom `marked renderer` in `MdEditor.config(option: ConfigOption)`.

- markedRenderer: `(renderer: RewriteRenderer) => RewriteRenderer`

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

  Set heading ID to `heading-${index}`:

  ```vue
  <template>
    <MdEditor :markedHeadingId="markedHeadingId" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const markedHeadingId = (_text, _level, index) => `heading-${index}`;

  MdEditor.config({
    markedRenderer(renderer) {
      // 'headingId' is generated by markedHeadingId that you provided.
      renderer.heading = (text, level, _raw, _s, _index, headingId) => {
        // This is usually used to deal with the priority problem caused by
        // configuring 'renderer.heading' and setting 'markedHeadingId' to each editor.
        return `<h${level} id="${headingId}">${text}</h${level}>`;
      };

      return renderer;
    }
  });
  </script>
  ```

  > Reference: https://marked.js.org/using_pro#renderer, RewriteRenderer extends Renderer and rewrites heading, now provides `index` as the fifth parameter and `headingId` as the sixth parameter.
  >
  > ```ts
  > export type RewriteHeading = (
  >   text: string,
  >   level: 1 | 2 | 3 | 4 | 5 | 6,
  >   raw: string,
  >   slugger: Slugger,
  >   index: number,
  >   headingId: string
  > ) => string;
  > ```

- markedExtensions: `Array<marked.TokenizerExtension & marked.RendererExtension>`

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedExtensions: [your extension]
  });
  ```

  > Reference: https://marked.js.org/using_pro#extensions

  [Docs page source code](https://github.com/imzbf/md-editor-v3/blob/docs/src/main.ts)

- markedOptions: `marked.MarkedOptions`

  Do not render `<br>` on a single line break:

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedOptions: { breaks: false }
  });
  ```

  > Reference: https://marked.js.org/using_advanced#options

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
    <summary>EditorExtensions</summary>

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
      // >= 2.2.0
      prettierInstance?: any;
      parserMarkdownInstance?: any;

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

## 🪡 Shortcut keys

!!! warning Pay attention

Shortcut keys are only available when the textarea is focused!

!!!

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

- **props**

  - `title`: `string`, not necessary, title of toolbar.

- **events**

  - `onClick`: `(e: MouseEvent) => void`, necessary.

- **slots**

  - `trigger`: `string | JSX.Element`, necessary, it is usually an icon, which is displayed on the toolbar.

usage:

```vue
<template>
  <MdEditor v-model="text">
    <template #defToolbars>
      <NormalToolbar title="mark" @onClick="callback">
        <template #trigger>
          <svg class="md-editor-icon" aria-hidden="true">
            <use xlink:href="#icon-mark"></use>
          </svg>
        </template>
      </NormalToolbar>
    </template>
  </MdEditor>
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const NormalToolbar = MdEditor.NormalToolbar;

const text = ref('');
</script>
```

[MarkExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/MarkExtension/index.vue)

---

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
  <MdEditor v-model="state.text">
    <template #defToolbars>
      <DropdownToolbar
        title="emoji"
        :visible="state.emojiVisible"
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
          <svg class="md-editor-icon" aria-hidden="true">
            <use xlink:href="#icon-emoji"></use>
          </svg>
        </template>
      </DropdownToolbar>
    </template>
  </MdEditor>
</template>

<script setup>
import { reactive } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const DropdownToolbar = MdEditor.DropdownToolbar;

const emojis = ['😀', '😃'];

const state = reactive({
  text: '',
  emojiVisible: false
});

const emojiVisibleChanged = () => {
  state.emojiVisible = !state.emojiVisible;
};

const emojiHandler = () => {};
</script>
```

[EmojiExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/EmojiExtension/index.vue)

---

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
  <MdEditor v-model="data.text">
    <template #defToolbars>
      <ModalToolbar
        :visible="data.modalVisible"
        :isFullscreen="data.modalFullscreen"
        showAdjust
        title="Preview"
        modalTitle="Page Preview"
        width="870px"
        height="600px"
        @onClick="data.modalVisible = true"
        @onClose="data.modalVisible = false"
        @onAdjust="data.modalFullscreen = !data.modalFullscreen"
      >
        <span>content</span>
        <template #trigger>
          <svg class="md-editor-icon" aria-hidden="true">
            <use xlink:href="#icon-read"></use>
          </svg>
        </template>
      </ModalToolbar>
    </template>
  </MdEditor>
</template>

<script setup>
import { reactive } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const ModalToolbar = MdEditor.ModalToolbar;

const data = reactive({
  text: '',
  modalVisible: false,
  modalFullscreen: false
});
</script>
```

[ReadExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/ReadExtension/index.vue)

---

### 🐻 MdCatalog

- **props**

  - `editorId`: `string`, necessary, editor's `editorId`, used to register listening events.
  - `class`: `string`, not necessary.
  - `markedHeadingId`: `MarkedHeadingId`, not necessary, same as editor.
  - `scrollElement`: `string | HTMLElement`, not necessary, it is an element selector when its type is string. When `previewOnly` eq `true`, it is usually set to `document.documentElement`.
  - `theme`: 'light' | 'dark', not necessary, provide it when you want to change theme online, it is the same as Editor `theme`.
  - `offsetTop`: `number`, not necessary, highlight current item of catalogs when title is `offsetTop` pixels from the top, defalut 20.
  - `scrollElementOffsetTop`: `number`, not necessary, offsetTop of the scroll container，defalut 0.

- **events**

  - `onClick`: `(e: MouseEvent, t: TocItem) => void`, not necessary.

usage:

```vue
<template>
  <MdEditor v-model="state.text" :editorId="state.id" :theme="state.theme" previewOnly />
  <MdCatalog :editorId="state.id" :scrollElement="scrollElement" :theme="state.theme" />
</template>

<script setup>
import { reactive } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const MdCatalog = MdEditor.MdCatalog;

const state = reactive({
  theme: 'dark',
  text: 'heading',
  id: 'my-editor'
});

const scrollElement = document.documentElement;
</script>
```

---

## ✍️ Edit This Page

[doc-en-US](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/doc-en-US.md)
