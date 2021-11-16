> The latest version：[${EDITOR_VERSION}](https://github.com/imzbf/md-editor-v3/releases/tag/v${EDITOR_VERSION})，Use it online：[Go](https://codesandbox.io/s/epic-bird-2znqo)

## Apis

| name | type | default | description |
| --- | --- | --- | --- |
| modelValue | String | '' | Markdown content，use `v-model` in vue template |
| theme | 'light' \| 'dark' | 'light' | Change editor theme |
| editorClass | String | '' |  |
| hljs | Object | null | `Highlight` instance, editor will not insert script of it, but you need to import `highlight` code style by yourself |
| highlightJs | String | [highlight.js@11.2.0](https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/highlight.min.js) | HighlightJs url |
| highlightCss | String | [atom-one-dark@11.2.0](https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/atom-one-dark.css) | `Highlight` code style |
| historyLength | Number | 10 | The max length of history(if it is too big, editor will use more `RAM`) |
| pageFullScreen | Boolean | false | Screenfull in web page |
| preview | Boolean | true | Preview content in editor |
| htmlPreview | Boolean | false | Preview html in editor |
| previewOnly<sup>v1.3.0</sup> | Boolean | false | Only render article content, no toolbar, no edit area |
| language | String | 'zh-CN' | Build-in language('zh-CN','en-US') |
| languageUserDefined<sup>v1.5.0 changed</sup> | Object | {key: StaticTextDefaultValue} | Expand language，update `language` api to your key |
| toolbars<sup>v1.6.0</sup> | Array | [all] | Show some item of toolbars，all keys<sup>see `toolbars` below<sup> |
| toolbarsExclude<sup>v1.1.4</sup> | Array | [] | Don't show some item of toolbars，all keys<sup>see `toolbars` below<sup> |
| prettier | Boolean | true | Use prettier to beautify content or not |
| prettierCDN | String | [standalone@2.4.0](https://cdn.jsdelivr.net/npm/prettier@2.4.0/standalone.js) |  |
| prettierMDCDN | String | [parser-markdown@2.4.0](https://cdn.jsdelivr.net/npm/prettier@2.4.0/parser-markdown.js) |  |
| cropperCss<sup>v1.2.0</sup> | String | [cropper.min.css@1.5.12](https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.css) | Cropper css url |
| cropperJs<sup>v1.2.0</sup> | String | [cropper.min.js@1.5.12](https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.js) | Cropper js url |
| iconfontJs<sup>v1.3.2</sup> | String | [iconfont](https://at.alicdn.com/t/font_2605852_khjf435c7th.js) | Icon url |
| editorId<sup>[v1.6.4 updated](https://github.com/imzbf/md-editor-v3/releases/tag/v1.6.4)</sup> | String | random | Editor id, also the html id, it is used when there are two or more editor and server render in the future |
| tabWidth<sup>v1.4.0<sup> | Number | 2 | One tab eq some space |
| showCodeRowNumber<sup>v1.4.3</sup> | Boolean | false | Show row number for code block or not |
| screenfull<sup>v1.4.3</sup> | Object | null | Screenfull instance, editor will not insert script of it |
| screenfullJs<sup><v1.4.3</sup> | String | [screenfull@5.1.0](https://cdn.jsdelivr.net/npm/screenfull@5.1.0/dist/screenfull.js) | Screenfull js url |
| previewTheme<sup>v1.4.3</sup> | 'default' \| 'github' \| 'vuepress' | 'default' | Preview themes |

> If responsive is `x`, you can set it's default value once.

> !!! Plug-in units are import from `cdn.jsdelivr.net`, if your project does not run on line, please use your local url to replace. eg: highlightJs = "//127.0.0.1/highlight.min.js"

[toolbars]

> after v1.6.0, You can sort the toolbar as you like, split tools by `'-'`, the left and right toolbars are divided by `'='`！

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
  'github'
];
```

Expand language, search `StaticTextDefaultValue` in source code, you can get the tips. English example: (you need to replace all the content here)

```js
{
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
    revoke: 'revoke',
    next: 'undo revoke',
    save: 'save',
    prettier: 'prettier',
    pageFullscreen: 'fullscreen in page',
    fullscreen: 'fullscreen',
    preview: 'preview',
    htmlPreview: 'html preview',
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
  // v1.6.0
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
    tips: 'Copied!'
  }
}
```

## Event

| name | params | description |
| --- | --- | --- |
| onChange | v:String | Content changed event(bind to `oninput` of `textarea`) |
| onSave | v:String | Save Content event，`ctrl+s`and click button will trigger |
| onUploadImg | files:FileList, callback:Function | Upload picture event，when picture is uploading the modal will not close，please provide right urls to the callback function |
| onHtmlChanged | h:String | Compile markdown successful event，you can use it to get the html code |
| onGetCatalog<sup>v1.4.0</sup> | list: HeadList[] | Get catalogue of article |
| markedHeading<sup>v1.6.0</sup> | text: string,level: 1-6,raw: string, slugger: Slugger | `marked` head renderer methods |

## Shortcut key

| key | function | description | support |
| --- | --- | --- | --- |
| TAB | insert space | Insert space, the length eq `tabWidth`, default: 2, support multiline | v1.4.0 |
| SHIFT + TAB | delete space, setting is the same as Tab |  | v1.4.0 |
| CTRL + C | copy | When selected, copy the selected content. When not selected, copy the content of the current line | v1.4.0 |
| CTRL + X | shear | When selected, cut the selected content. When not selected, cut the current line | v1.4.0 |
| CTRL + D | delete | When selected, delete the selected content. When not selected, delete the current line | v1.4.0 |
| CTRL + S | save | Trigger `onSave` event | v1.0.0 |
| CTRL + B | bold text | `**bold**` | v1.0.0 |
| CTRL + U | underline | `<u>underline</u>` | v1.0.0 |
| CTRL + I | italic | `*italic*` | v1.0.0 |
| CTRL + 1-6 | h1-h6 | `# title` | v1.0.0 |
| CTRL + ↑ | superscript | `<sup>superscript</sup>` | v1.0.0 |
| CTRL + ↓ | subscript | `<sub>subscript</sub>` | v1.0.0 |
| CTRL + Q | quote | `> quote` | v1.0.0 |
| CTRL + O | ordered list | `1. ordered list` | v1.0.0 |
| CTRL + L | link | `[link](https://github.com/imzbf/md-editor-v3)` | v1.0.0 |
| CTRL + Z | withdraw | Withdraw history in editor, not the function of system | v1.0.0 |
| CTRL + SHIFT + S | line-through | `~line-through~` | v1.0.0 |
| CTRL + SHIFT + U | unordered list | `- unordered list` | v1.0.0 |
| CTRL + SHIFT + C | code block |  | v1.0.0 |
| CTRL + SHIFT + I | picture | `![picture](https://imbf.cc)` | v1.0.0 |
| CTRL + SHIFT + Z | forward | Forward history in editor, not the function of system | v1.0.0 |
| CTRL + SHIFT + F | Beautify |  | v1.0.0 |
| CTRL + ALT + C | code row |  | v1.0.0 |
| CTRL + SHIFT + ALT + T | table | `\|table\|` | v1.4.0 |

## End of docs
