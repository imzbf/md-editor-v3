> The latest version：[${EDITOR_VERSION}](https://github.com/imzbf/md-editor-v3/releases/tag/v${EDITOR_VERSION})，Use it online：[Go](https://codesandbox.io/s/epic-bird-2znqo)

## Apis

### modelValue

- **type**: `String`
- **default**: `''`
- **description**: Markdown content.

### theme

- **type**: `'light' | 'dark'`
- **default**: `'light'`
- **description**: Editor's theme.

### editorClass

- **type**: `String`
- **default**: `''`
- **description**: Editor's `class`.

### hljs

- **type**: `Object`
- **default**: `null`
- **description**: `Highlight` instance, editor will not insert script of it, but you need to import `highlight` code style by yourself.

### highlightJs

- **type**: `String`
- **default**: [highlight.js@11.2.0](https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/highlight.min.js)
- **description**: HighlightJs url.

### highlightCss

- **type**: `String`
- **default**: [atom-one-dark@11.2.0](https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/atom-one-dark.css)
- **description**: `Highlight` code style url.

### historyLength

- **type**: `Number`
- **default**: `10`
- **description**: The max length of history(if it is too big, editor will use more `RAM`).

### pageFullScreen

- **type**: `Boolean`
- **default**: `false`
- **description**: Screenfull in web page.

### preview

- **type**: `Boolean`
- **default**: `true`
- **description**: Preview content in editor.

### htmlPreview

- **type**: `Boolean`
- **default**: `false`
- **description**: Preview html in editor.

### previewOnly

- **type**: `Boolean`
- **default**: `false`
- **description**: Only render article content, no toolbar, no edit area.

### language

- **type**: `String`
- **default**: `'zh-CN'`
- **description**: Build-in language('zh-CN','en-US').

### languageUserDefined

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
}
```

### toolbars

- **type**: `Array`
- **default**: `[all]`
- **description**: Show some item of toolbars, all keys.

You can sort the toolbar as you like, split tools by `'-'`, the left and right toolbars are divided by `'='`！

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

### toolbarsExclude

- **type**: `Array`
- **default**: `[]`
- **description**: Don't show some item of toolbars, all keys.

### prettier

- **type**: `Boolean`
- **default**: `true`
- **description**: Use prettier to beautify content or not.

### prettierCDN

- **type**: `String`
- **default**: [standalone@2.4.0](https://cdn.jsdelivr.net/npm/prettier@2.4.0/standalone.js)
- **description**:

### prettierMDCDN

- **type**: `String`
- **default**: [parser-markdown@2.4.0](https://cdn.jsdelivr.net/npm/prettier@2.4.0/parser-markdown.js)
- **description**:

### cropperCss

- **type**: `String`
- **default**: [cropper.min.css@1.5.12](https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.css)
- **description**: Cropper css url.

### cropperJs

- **type**: `String`
- **default**: [cropper.min.js@1.5.12](https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.js)
- **description**: Cropper js url.

### iconfontJs

- **type**: `String`
- **default**: [iconfont](https://at.alicdn.com/t/font_2605852_khjf435c7th.js)
- **description**: Icon url.

### editorId

- **type**: `String`
- **default**: `'md-editor-v3'`
- **description**: Editor id, also the html id, it is used when there are two or more editor and server render.

### tabWidth

- **type**: `Number`
- **default**: `2`
- **description**: One tab eq some space.

### showCodeRowNumber

- **type**: `Boolean`
- **default**: `false`
- **description**: Show row number for code block or not.

### screenfull

- **type**: `Object`
- **default**: `null`
- **description**: Screenfull instance, editor will not insert script of it.

### screenfullJs

- **type**: `String`
- **default**: [5.1.0](https://cdn.jsdelivr.net/npm/screenfull@5.1.0/dist/screenfull.js)
- **description**: Screenfull js url.

### previewTheme

- **type**: `'default' | 'github' | 'vuepress'`
- **default**: `'default'`
- **description**: Preview themes.

### style

- **type**: `CSSProperties`
- **default**: `'default'`
- **版本**: `>= 1.2.0`
- **description**: Editor's inline style.

> !!! Plug-in units are import from `cdn.jsdelivr.net`, if your project does not run on line, please use your local url to replace. eg: highlightJs = "//127.0.0.1/highlight.min.js".

## Event

### onChange

- **type**: `(v: string) => void`
- **description**: Content changed event(bind to `oninput` of `textarea`).

### onSave

- **type**: `(v: string) => void`
- **description**: Save Content event,`ctrl+s`and click button will trigger.

### onUploadImg

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

### onHtmlChanged

- **type**: `(h: string) => void`
- **description**: Compile markdown successful event,you can use it to get the html code.

### onGetCatalog

- **type**: `(list: HeadList[]) => void`
- **description**: Get catalogue of article.

### markedHeading

- **type**: `(text: string,level: 1-6,raw: string, slugger: Slugger) => string`
- **description**: `marked` head renderer method.

> If `markedHeading` is overridden, be sure to tell the editor the algorithm for generating the title ID by `marketheadingid`.

### markedHeadingId

- **type**: `(text: string, level: number) => string`
- **description**: Title `ID` generator.

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

## End of docs
