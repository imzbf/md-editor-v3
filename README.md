# md-editor-v3

![](https://img.shields.io/github/package-json/v/imzbf/md-editor-v3) ![](https://img.shields.io/npm/dm/md-editor-v3) ![](https://img.shields.io/bundlephobia/min/md-editor-v3) ![](https://img.shields.io/github/license/imzbf/md-editor-v3) ![](https://img.shields.io/badge/ssr-%3E1.6.0-brightgreen)

English \| [中文](https://github.com/imzbf/md-editor-v3/blob/dev/README-CN.md)

Markdown editor for vue3, developed in `jsx` and `typescript`.

- Documentation and example：[Go](https://imzbf.github.io/md-editor-v3)

- Use it online：[Go](https://codesandbox.io/s/epic-bird-2znqo)

- The same series editor for react：[md-editor-rt](https://github.com/imzbf/md-editor-rt)

## Features

- Toolbar, screenfull or screenfull in web pages and so on.
- Themes, Built-in default and dark themes.
- Shortcut key for editor.
- Beautify your content by `prettier`(only for markdown content, not the code and other text).
- Multi-language, build-in Chinese and English(default: Chinese).
- Upload picture, paste or clip the picture and upload it.
- Render article directly(no editor, no event listener, only preview content).
- Preview themes, `defalut`, `vuepress`, `github`, `cyanosis`, `mk-cute`, `smart-blue` styles(not identical). It can be customized also(Get the demo page).
- `mermaid`(>=1.8.0), `katex` mathematical formula(>=1.9.0).
- Customize the toolbar as you like.

## Preview

| Default theme | Dark theme | Preview only |
| --- | --- | --- |
| ![](https://imzbf.github.io/md-editor-v3/imgs/preview-light.png) | ![](https://imzbf.github.io/md-editor-v3/imgs/preview-dark.png) | ![](https://imzbf.github.io/md-editor-v3/imgs/preview-previewOnly.png) |

mark and emoji extensions

![mark and emoji extension](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

## Apis

### Props

| name | type | default | description |
| --- | --- | --- | --- |
| modelValue | string | '' | Markdown content, use `v-model` in vue template |
| theme | 'light' \| 'dark' | 'light' | Editor theme |
| class | string | '' |  |
| historyLength | number | 10 | The max length of history(if it is too big, editor will use more `RAM`) |
| pageFullScreen | boolean | false | Screenfull in web page |
| preview | boolean | true | Preview content in editor |
| htmlPreview | boolean | false | Preview html in editor |
| previewOnly | boolean | false | Only render article content, no toolbar, no edit area |
| language | string | 'zh-CN' | Build-in language('zh-CN','en-US') |
| toolbars | Array | [toolbars] | Show some item of toolbars, all keys<sup>see `toolbars` below</sup> |
| toolbarsExclude | Array | [] | Don't show some item of toolbars, all keys`toolbars` |
| noPrettier | boolean | false | Use prettier to beautify content or not |
| editorId | string | md-editor-v3 | Editor id, it is used when there are more than two editors in the same page. |
| tabWidth | number | 2 | One tab eq some spaces |
| showCodeRowNumber | boolean | false | Show row number for code block or not |
| previewTheme | 'default' \| 'github' \| 'vuepress' \| 'mk-cute' \| 'smart-blue' \| 'cyanosis' | 'default' | Preview theme, can be customized |
| style | string \| CSSProperties | {} | Editor inline style |
| tableShape | [number, number] | [6, 4] | Preset the size of the table, [columns, rows] |
| noMermaid | boolean | false | Use mermaid or not |
| placeholder | string | '' |  |
| noKatex | boolean | false | Use katex or not |
| codeCssName | 'atom' \| 'a11y' \| 'github' \| 'gradient' \| 'kimbie' \| 'paraiso' \| 'qtcreator' \| 'stackoverflow' | 'atom' | [Highlight](https://www.jsdelivr.com/package/npm/highlight.js?path=styles) code style, can be customized also |
| markedHeadingId | (text: string, level: number) => string | (text) => text | H1-H6 `ID` generator |
| sanitize | (html: string) => string | (html) => html | Sanitize the html, prevent XSS |

<details>
 <summary>[toolbars]</summary>

```js
[
  'bold',
  'underline',
  'italic',
  '-',
  'strikeThrough',
  'title',
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

</details>

> After v1.6.0, You can sort the toolbar as you like, split tools by `'-'`, the left and right toolbars are divided by `'='`！

> After v1.10.0, you can customize the toolbar. To display them, put index of `defToolbars` into `toolbars`(this is not standard), for more usage, please refer to[docs]().

<details>
 <summary>[StaticTextDefaultValue]</summary>

Expand language, you need to replace all the content here：

```ts
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
  // Toolbar hover tips(html title)
  toolbarTips?: ToolbarTips;
  // h1-h6 dropdown menu item
  titleItem?: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
  };
  // v1.6.0
  imgTitleItem?: {
    link: string;
    upload: string;
    clip2upload: string;
  };
  // The modal tips of add link or upload picture
  linkModalTips?: {
    title?: string;
    descLable?: string;
    descLablePlaceHolder?: string;
    urlLable?: string;
    UrlLablePlaceHolder?: string;
    buttonOK?: string;
  };
  // The modal tips of clip the picture, v1.2.0
  clipModalTips?: {
    title?: string;
    buttonUpload?: string;
  };
  // Copy code tips, v1.1.4
  copyCode?: {
    text?: string;
    tips?: string;
  };
  // 1.8.0
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

</details>

### Slots

| name | type | default | description |
| --- | --- | --- | --- |
| defToolbars | Array<DropdownToolbar \| NormalToolbar \| ModalToolbar> | null | Customize Toolbar, for more usage, please refer to [docs](https://imzbf.github.io/md-editor-v3/docs/index#%F0%9F%92%AA%20defToolbars) and [emoji](https://imzbf.github.io/md-editor-v3/demo/index#💪%20Customize%20Toolbar) |

`NormalToolbar` component example：

```js
<template>
  <md-editor>
    <template #defToolbars>
      <normal-toolbar title="mark" @click="handler">
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

const handler = () => { console.log('NormalToolbar clicked!') }
</script>
```

### Events

| name | param | description |
| --- | --- | --- |
| onChange | v:string | Content changed event(bind to `oninput` of `textarea`) |
| onSave | v:string | Save content event, `ctrl+s`and click button will be triggered also |
| onUploadImg | files:Array<File>, callback:Function | Upload picture event, when picture is uploading the modal will not close, please provide right urls to the callback function |
| onHtmlChanged | h:string | Compile markdown successful event, you can use it to get the html code |
| onGetCatalog | list: HeadList[] | Get catalogue of article |

## Config

Use `MdEditor.config(option: ConfigOption)` to reconfigure `renderer`.

- markedRenderer: `(renderer: Renderer) => Renderer`, 🌰(Open target page in a new browser window)：

  ```js
  MdEditor.config({
    markedRenderer(renderer) {
      renderer.link = (href, title, text) => {
        return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
      };

      return renderer;
    }
  });
  ```

  > Reference: https://marked.js.org/using_pro#renderer

- markedExtensions: `Array<marked.TokenizerExtension & marked.RendererExtension>`

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedExtensions: [your extension]
  });
  ```

  > Reference: https://marked.js.org/using_pro#extensions

- markedOptions: `marked.MarkedOptions`, 🌰(do not render `<br>` on a single line break)：

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedOptions: { breaks: false }
  });
  ```

  > Reference: https://marked.js.org/using_advanced#options

- editorConfig: Add more languages，reset `mermaid` template:

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedOptions: {
      languageUserDefined: { 'lang': StaticTextDefaultValue };
      mermaidTemplate: {
        flow: `flow tempalte`;
        ...more
      };
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

## Shortcut key

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

## Components

They are used as attributes of the editor component, eg: `Editor.DropdownToolbar`. For more examples, refer to [document](https://imzbf.github.io/md-editor-v3).

### NormalToolbar

`Editor.NormalToolbar`

- **props**

  - `title`: `string`, not necessary, title of toolbar.

- **events**

  - `onClick`: `(e: MouseEvent) => void`, necessary.

- **slots**
  - `trigger`: `string | JSX.Element`, necessary, it is usually an icon, which is displayed on the toolbar.

### DropdownToolbar

`Editor.DropdownToolbar`

- **props**

  - `title`: `string`, not necessary, title of toolbar.
  - `visible`: `boolean`, necessary.

- **events**

  - `onChange`: `(visible: boolean) => void`, necessary.

- **slots**
  - `trigger`: `string | JSX.Element`, necessary, it is usually an icon, which is displayed on the toolbar.
  - `overlay`: `string | JSX.Element`, necessary, content of dropdown box.

### ModalToolbar

`Editor.ModalToolbar`

- **props**

  - `title`: `string`, not necessary, title of toolbar.
  - `modalTitle`: `string`, not necessary, title of the Modal.
  - `visible`: `boolean`, necessary, visibility of Modal.
  - `width`: `string`, not necessary, width of Modal, default `auto`.
  - `height`：`string`, same as `width`.
  - `showAdjust`: `boolean`, not necessary, visibility of fullscreen button.
  - `isFullscreen`: `boolean`, necessary when `showAdjust = true`, status of fullscreen.

- **events**

  - `onClick`: `() => void`, necessary.
  - `onClose`：`() => void`, necessary, close event.
  - `onAdjust`：`(val: boolean) => void`, fullscreen button click event.

- **slots**
  - `trigger`: `string | JSX.Element`, necessary, it is usually an icon, which is displayed on the toolbar.
  - `overlay`: `string | JSX.Element`, necessary, content of Modal.

### Catalogue

`Editor.Catalog`

- **props**
  - `editorId`: `string`, necessary, same as editor's `editorId`, used to register listening events.
  - `class`: `string`, not necessary.
  - `markedHeadingId`: `MarkedHeadingId`, not necessary, same as editor.
  - `scrollElement`: `string | HTMLElement`, not necessary, it is an element selector when its type is string. When `previewOnly` eq `true`, it is usually set to `document.documentElement`.
  - `theme`: `'light' | 'dark'`, not necessary, provide it when you want to change theme online, it is the same as Editor `theme`.

## Examples

### Jsx module

```js
import { defineComponent, reactive } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  setup() {
    const md = reactive({
      text: '# Hello Editor'
    });
    return () => (
      <MdEditor modelValue={md.text} onChange={(value) => (md.text = value)} />
    );
  }
});
```

### Vue template

```js
<template>
  <md-editor v-model="text" pageFullScreen></md-editor>
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('# Hello Editor')
</script>
```

### Upload picture

> Tips：When you paste and upload GIF, it will upload a static picture. So you should upload it by file system!

```js
async onUploadImg(files: Array<File>, callback: (urls: string[]) => void) {
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

  callback(res.map((item: any) => item.data.url));
}
```
