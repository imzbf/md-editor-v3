> The latest version: [${EDITOR_VERSION}](https://github.com/imzbf/md-editor-v3/releases/tag/v${EDITOR_VERSION}), Use it online: [Go](https://codesandbox.io/s/epic-bird-2znqo).

## 🤯 Props

### 📃 modelValue

- **type**: `String`
- **default**: `''`
- **description**: Markdown content.

```js
<Editor v-model="xxx" />
```

### 🛍 theme

- **type**: `'light' | 'dark'`
- **default**: `'light'`
- **description**: Editor's theme.

```js
<Editor theme="dark" />
```

### 🎀 editorClass

- **type**: `String`
- **default**: `''`
- **description**: Editor's `class`.

### 🧸 hljs

- **type**: `Object`
- **default**: `null`
- **description**: `Highlight` instance, editor will not insert script of it, but you need to import `highlight` code style by yourself.

### 🧸 highlightJs

- **type**: `String`
- **default**: [highlight.js@11.2.0](https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/highlight.min.js)
- **description**: HighlightJs url.

### 🧸 highlightCss

- **type**: `String`
- **default**: [atom-one-dark@11.2.0](https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/atom-one-dark.css)
- **description**: `Highlight` code style url.

### 🤏🏼 historyLength

- **type**: `Number`
- **default**: `10`
- **description**: The max length of history(if it is too big, editor will use more `RAM`).

### 💻 pageFullScreen

- **type**: `Boolean`
- **default**: `false`
- **description**: Screenfull in web page.

### 📱 preview

- **type**: `Boolean`
- **default**: `true`
- **description**: Preview content in editor.

### 📀 htmlPreview

- **type**: `Boolean`
- **default**: `false`
- **description**: Preview html in editor.

### 📺 previewOnly

- **type**: `Boolean`
- **default**: `false`
- **description**: Only render article content, no toolbar, no edit area.

### 🔤 language

- **type**: `String`
- **default**: `'zh-CN'`
- **description**: Build-in language('zh-CN','en-US').

### 🔤 languageUserDefined

- **type**: `Object`
- **default**: `{key: StaticTextDefaultValue}`
- **description**: Expand language,update `language` api to your key 🤨

```
export interface ToolbarTips {
  bold?: string;
  underline?: string;
  italic?: string;
  strikeThrough?: string;
  title?: string;
  sub?: string;
  sup?: string;
  quote?: string;
  unorderedList?: string;
  orderedList?: string;
  codeRow?: string;
  code?: string;
  link?: string;
  image?: string;
  table?: string;
  mermaid?: string;
  katex?: string;
  revoke?: string;
  next?: string;
  save?: string;
  prettier?: string;
  pageFullscreen?: string;
  fullscreen?: string;
  catalog?: string;
  preview?: string;
  htmlPreview?: string;
  github?: string;
  '-'?: string;
  '='?: string;
}

export interface StaticTextDefaultValue {
  toolbarTips?: ToolbarTips;
  titleItem?: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
  };
  imgTitleItem?: {
    link: string;
    upload: string;
    clip2upload: string;
  };
  linkModalTips?: {
    title?: string;
    descLable?: string;
    descLablePlaceHolder?: string;
    urlLable?: string;
    UrlLablePlaceHolder?: string;
    buttonOK?: string;
  };
  clipModalTips?: {
    title?: string;
    buttonUpload?: string;
  };
  copyCode?: {
    text?: string;
    tips?: string;
  };
  mermaid?: {
    flow?: string;
    sequence?: string;
    gantt?: string;
    class?: string;
    state?: string;
    pie?: string;
    relationship?: string;
    journey?: string;
  };
  // 1.9.0
  katex?: {
    // formula inline
    inline: string;
    // formula block
    block: string;
  };
}
```

### 🧱 toolbars

- **type**: `Array`
- **default**: `[all]`
- **description**: Show some item of toolbars, all keys.

You can sort the toolbar as you like, split tools by `'-'`, the left and right toolbars are divided by `'='`！

After v1.10.0, you can customize the toolbar. To display them, put index of `defToolbars` into `toolbars`(this is not standard), for more usage, please refer to[docs](https://imzbf.github.io/md-editor-v3/docs/index#%F0%9F%92%AA%20defToolbars).

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
- **description**: Don't show some item of toolbars, all keys.

### 🪒 prettier

- **type**: `Boolean`
- **default**: `true`
- **description**: Use prettier to beautify content or not.

### 🪒 prettierCDN

- **type**: `String`
- **default**: [standalone@2.4.0](https://cdn.jsdelivr.net/npm/prettier@2.4.0/standalone.js)
- **description**:

### 🪒 prettierMDCDN

- **type**: `String`
- **default**: [parser-markdown@2.4.0](https://cdn.jsdelivr.net/npm/prettier@2.4.0/parser-markdown.js)
- **description**:

### ✂️ Cropper

- **type**: `Object`
- **default**: `undefined`
- **description**: Instance of Cropper.

### ✂️ cropperCss

- **type**: `String`
- **default**: [cropper.min.css@1.5.12](https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.css)
- **description**: Cropper css url.

### ✂️ cropperJs

- **type**: `String`
- **default**: [cropper.min.js@1.5.12](https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.js)
- **description**: Cropper js url.

### 👻 iconfontJs

- **type**: `String`
- **default**: [iconfont](//at.alicdn.com/t/font_2605852_ihjkm7wo1y.js)
- **description**: Icon url.

### 🎲 editorId

- **type**: `String`
- **default**: `'md-editor-v3'`
- **description**: Editor id, also the html id, it is used when there are two or more editor and server render.

### 🤏 tabWidth

- **type**: `Number`
- **default**: `2`
- **description**: One tab eq some space.

### 🔢 showCodeRowNumber

- **type**: `Boolean`
- **default**: `false`
- **description**: Show row number for code block or not.

### 🖥 screenfull

- **type**: `Object`
- **default**: `null`
- **description**: Screenfull instance, editor will not insert script of it.

### 🖥 screenfullJs

- **type**: `String`
- **default**: [5.1.0](https://cdn.jsdelivr.net/npm/screenfull@5.1.0/dist/screenfull.js)
- **description**: Screenfull js url.

### 🔦 previewTheme

- **type**: `'default' | 'github' | 'vuepress'`
- **default**: `'default'`
- **description**: Preview themes.

### 🎅🏻 style

- **type**: `CSSProperties`
- **default**: `''`
- **version**: `>= 1.7.0`
- **description**: Editor's inline style.

### 📅 tableShape

- **type**: `[Number, Number]`
- **default**: `[6, 4]`
- **version**: `>= 1.8.0`
- **description**: Preset the size of the table, [columns, rows].

```js
<Editor tableShape={[8, 4]}>
```

![Preview](/md-editor-v3/imgs/20211216165424.png)

### 📉 mermaid

- **type**: `mermaid`
- **default**: `undefined`
- **version**: `>= 1.8.0`
- **description**: Instance of `mermaid`, if you provide it, editor in browser will not download `mermaid`.

```js
import mermaid from 'mermaid'

//
<Editor mermaid={mermaid}>
```

### 📉 mermaidJs

- **type**: `String`
- **default**: [mermaid@8.13.5](https://cdn.jsdelivr.net/npm/mermaid@8.13.5/dist/mermaid.min.js)
- **version**: `>= 1.8.0`
- **description**: MermaidJs url.

```js
<Editor mermaidJs="/lib/mermaid.min.js" />
```

### ☝️ noMermaid

- **type**: `Boolean`
- **default**: `false`
- **version**: `>= 1.8.0`
- **description**: Do not want to use `mermaid`, set it to `true`.

```js
<Editor noMermaid />
```

### 🪧 placeholder

- **type**: `String`
- **default**: `''`
- **version**: `>= 1.8.0`
- **description**: em-\_-！

> !!! Plug-in units are import from `unpkg.com`, if your project does not run on line, please use your local url to replace. eg: highlightJs = "//127.0.0.1/highlight.min.js".

### 📐 katex

- **type**: `katex`
- **default**: `undefined`
- **version**: `>= 1.9.0`
- **description**: Instance of `katex`, if you provide it, editor in browser will not download `katex`.

```js
import katex from 'katex'

//
<Editor katex={katex}>
```

### 📐 katexJs

- **type**: `String`
- **default**: [katex.min.js@0.15.1](https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.js)
- **version**: `>= 1.9.0`
- **description**: katexJs url.

```js
<Editor katexJs="/lib/katex.min.js" />
```

### 📐 katexCss

- **type**: `String`
- **default**: [katex.min.css@0.15.1](https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css)
- **version**: `>= 1.9.0`
- **description**: katexCss url.

```js
<Editor katexCss="/lib/katex.min.css" />
```

### ☝️ noKatex

- **type**: `Boolean`
- **default**: `false`
- **version**: `>= 1.9.0`
- **description**: Do not want to use `katex`, set it to `true`.

```js
<Editor noKatex />
```

### 💪 defToolbars

- **type**: `Array<VNode>`
- **default**: `[]`
- **version**: `>= 1.10.0`
- **description**: Customize Toolbar, and there are two types to choose from. `NormalToolbar` and `DropdownToolbar`. To display them, put index of `defToolbars` into `toolbars`(this is not standard).

**Editor.NormalToolbar** Props

- **title**: `String`, hover tips.
- **trigger**: `VNode`, trigger dom, it will be displayed in the toolbar area also, it is usually an icon.
- **onClick**: `(e: MouseEvent) => void`, trigger click event.

**Editor.DropdownToolbar** Props

- **title**: `String`, hover tips.
- **visible**: `Boolean`, visible of dropdown.
- **onChange**: `(visible: boolean) => void`, visible changed event.
- **trigger**: `VNode`, trigger dom, it will be displayed in the toolbar area also, it is usually an icon.
- **overlay**: `VNode`, content of dropdown.

<br>
<hr>

- NormalToolbar

For a complete example, please refer to [mark example](https://imzbf.github.io/md-editor-v3/demo/index#%F0%9F%92%AA%20Customize%20Toolbar).

```vue
<template>
  <Editor
    editorId="md-prev"
    v-model="data.text"
    :toolbars="['bold', 'underline', 'italic', 0]"
  >
    <template #defToolbars>
      <Editor.NormalToolbar title="mark" @click="markHandler">
        <template #trigger>
          <svg class="md-icon" aria-hidden="true">
            <use xlink:href="#icon-mark"></use>
          </svg>
        </template>
      </Editor.NormalToolbar>
    </template>
  </Editor>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Editor from 'md-editor-v3';

const data = reactive({
  text: '# NormalToolbar'
});

const markHandler = () => {
  const textarea = document.querySelector('#md-prev-textarea') as HTMLTextAreaElement;
  const selection = window.getSelection()?.toString();
  const endPoint = textarea.selectionStart;
  const markStr = `@${selection}@`;

  const prefixStr = textarea.value.substring(0, endPoint);
  const suffixStr = textarea.value.substring(endPoint + (selection?.length || 0));

  data.text = `${prefixStr}${markStr}${suffixStr}`;

  // use setTimeout to prevent setSelectionRange error.
  setTimeout(() => {
    textarea.setSelectionRange(endPoint, markStr.length + endPoint);
    textarea.focus();
  }, 0);
};
</script>
```

![NormalToolbar](/md-editor-v3/imgs/normal-toolbar.gif)

<br>

- DropdownToolbar

For a complete example, please refer to [emoji example](https://imzbf.github.io/md-editor-v3/demo/index#%F0%9F%92%AA%20Customize%20Toolbar).

```vue
<template>
  <Editor
    editorId="md-prev"
    v-model="data.text"
    :toolbars="['bold', 'underline', 'italic', 0]"
  >
    <template #defToolbars>
      <Editor.DropdownToolbar
        title="emoji"
        :visible="data.emojiVisible"
        :onChange="emojiVisibleChanged"
      >
        <template #overlay>
          <ul>
            <li @click="markHandler(1)">menu 1</li>
            <li @click="markHandler(2)">menu 2</li>
          </ul>
        </template>
        <template #trigger>
          <svg class="md-icon" aria-hidden="true">
            <use xlink:href="#icon-emoji"></use>
          </svg>
        </template>
      </Editor.DropdownToolbar>
    </template>
  </Editor>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Editor from 'md-editor-v3';

const data = reactive({
  text: '# DropdownToolbar',
  emojiVisible: false
});

const markHandler = (num: number) => {
  alert(num);
};

const emojiVisibleChanged = (visible) => {
  data.emojiVisible = visible;
};
</script>
```

![DropdownToolbar](/md-editor-v3/imgs/dropdown-toolbar.gif)

### 🪡 extensions

- **type**: `Array<Object>`
- **default**: `[]`
- **description**: [marked](https://marked.js.org/using_pro#extensions) extensions.

`mark` example, for a complete example, please refer to [marked extensions](https://marked.js.org/using_pro#extensions).

```vue
<template>
  <Editor :extensions="[MarkExtension]" />
</template>

<script setup lang="ts">
const MarkExtension = {
  name: 'MarkExtension',
  level: 'inline',
  start: (text: string) => text.match(/@[^@]/)?.index,
  tokenizer(text: string) {
    const reg = /^@([^@]*)@/;
    const match = reg.exec(text);

    if (match) {
      const token = {
        type: 'MarkExtension',
        raw: match[0],
        text: match[1].trim(),
        tokens: []
      };

      return token;
    }
  },
  renderer(token: any) {
    return `<mark>${token.text}</mark>`;
  }
};
</script>
```

This is an example of converting `@hello@` to `<mark>hello</mark>`.

<br>
<hr>

## 🪢 Event

### 📞 onChange

- **type**: `(v: string) => void`
- **description**: Content changed event(bind to `oninput` of `textarea`).

### 💾 onSave

- **type**: `(v: string) => void`
- **description**: Save Content event,`ctrl+s`and click button will trigger.

### 📸 onUploadImg

- **type**: `(files: FileList, callback: function) => void`
- **description**: Upload picture event,when picture is uploading the modal will not close,please provide right urls to the callback function.

```js
async onUploadImg(files: FileList, callback: (urls: string[]) => void) {
  const res = await Promise.all(
    Array.from(files).map((file) => {
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

  callback(res.map((item: any) => item.data.url));
}
```

### ☎️ onHtmlChanged

- **type**: `(h: string) => void`
- **description**: Compile markdown successful event,you can use it to get the html code.

### 🗒 onGetCatalog

- **type**: `(list: HeadList[]) => void`
- **description**: Get catalogue of article.

### 🪄 markedHeading

- **type**: `(text: string,level: 1-6,raw: string, slugger: Slugger) => string`
- **description**: `marked` head renderer method.

> If `markedHeading` is overridden, be sure to tell the editor the algorithm for generating the title ID by `marketheadingid`.

```vue
<template>
  <md-editor class="body" v-model="mdText" :marked-heading="markedHeading" preview-only />
</template>

<script setup>
const markedHeading = (text, level, raw) => {
  return `<h${level} id="${raw}">${text}</h${level}>`;
};
</script>
```

### 🎈 markedHeadingId

- **type**: `(text: string, level: number) => string`
- **description**: Title `ID` generator.

```vue
<template>
  <md-editor :marked-heading-id="hId" />
</template>

<script setup>
const hId = (text) => text;
</script>
```

### 🔒 sanitize

- **type**: `(html: string) => string`
- **description**: Sanitize the html, prevent XSS. When you can be sure that your content is OK, ignore this.

> Use `sanitize-html`

```vue
<template>
  <md-editor :sanitize="sanitize" />
</template>

<script setup>
import sanitizeHtml from 'sanitize-html';

const sanitize = (html) => sanitizeHtml(html);
</script>
```

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
| CTRL + SHIFT + I | picture | `![picture](https://imbf.cc)` |
| CTRL + SHIFT + Z | forward | Forward history in editor, not the function of system |
| CTRL + SHIFT + F | Beautify |  |
| CTRL + ALT + C | code row |  |
| CTRL + SHIFT + ALT + T | table | `\|table\|` |

## ✍️ Edit this page

[doc-en-US](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/doc-en-US.md)
