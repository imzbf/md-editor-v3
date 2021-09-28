> The latest version：[${EDITOR_VERSION}](https://github.com/imzbf/md-editor-v3/releases/tag/v${EDITOR_VERSION})，Use it online：[Go](https://stackblitz.com/edit/vue-aleajl)

## 1. Props List

| name | type | default | responsive | description |
| --- | --- | --- | --- | --- |
| modelValue | String | '' | √ | Markdown content，use `v-model` in vue template |
| theme | 'light' \| 'dark' | 'light' | √ | Change editor theme |
| editorClass | String | '' | √ |  |
| hljs | Object | null | x | `Highlight` instance, editor will not insert script of it, but you need to import `highlight` code style by yourself |
| highlightJs | String | [highlight.js@11.2.0](https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/highlight.min.js) | x | HighlightJs url |
| highlightCss | String | [atom-one-dark@11.2.0](https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/atom-one-dark.css) | x | `Highlight` code style |
| historyLength | Number | 10 | x | The max length of history(if it is too big, editor will use more `RAM`) |
| pageFullScreen | Boolean | false | x | Screenfull in web page |
| preview | Boolean | true | x | Preview content in editor |
| htmlPreview | Boolean | false | x | Preview html in editor |
| previewOnly<sup>v1.3.0</sup> | Boolean | false | x | Only render article content, no toolbar, no edit area |
| language | String | 'zh-CN' | √ | Build-in language('zh-CN','en-US') |
| languageUserDefined | Array | [{key: StaticTextDefaultValue}] | √ | Expand language，update `language` api to your key |
| toolbars | Array | [all] | √ | Show some item of toolbars，all keys<sup>[toolbars]<sup> |
| toolbarsExclude<sup>v1.1.4</sup> | Array | [] | √ | Don't show some item of toolbars，all keys`toolbars` |
| prettier | Boolean | true | x | Use prettier to beautify content or not |
| prettierCDN | String | [standalone@2.4.0](https://cdn.jsdelivr.net/npm/prettier@2.4.0/standalone.js) | x |  |
| prettierMDCDN | String | [parser-markdown@2.4.0](https://cdn.jsdelivr.net/npm/prettier@2.4.0/parser-markdown.js) | x |  |
| cropperCss<sup>v1.2.0</sup> | String | [cropper.min.css@1.5.12](https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.css) | x | Cropper css url |
| cropperJs<sup>v1.2.0</sup> | String | [cropper.min.js@1.5.12](https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.js) | x | Cropper js url |
| iconfontJs<sup>v1.3.2</sup> | String | [iconfont](https://at.alicdn.com/t/font_2605852_khjf435c7th.js) | x | Icon url |
| editorId<sup>v1.4.0</sup> | String | random | x | Editor id, also the html id, it is used when there are two or more editor and server render in the future |
| tabWidth<sup>v1.4.0<sup> | Number | 2 | x | One tab eq some space |
| showCodeRowNumber<sup>[v1.4.3](https://github.com/imzbf/md-editor-v3/releases/tag/v1.4.3)</sup> | Boolean | false | x | Show row number for code block or not |
| screenfull<sup>[v1.4.3](https://github.com/imzbf/md-editor-v3/releases/tag/v1.4.3)</sup> | Object | null | x | Screenfull instance, editor will not insert script of it |
| screenfullJs<sup>[v1.4.3](https://github.com/imzbf/md-editor-v3/releases/tag/v1.4.3)</sup> | String | [screenfull@5.1.0](https://cdn.jsdelivr.net/npm/screenfull@5.1.0/dist/screenfull.js) | x | Screenfull js url |
| previewTheme<sup>[v1.4.3](https://github.com/imzbf/md-editor-v3/releases/tag/v1.4.3)</sup> | 'default' \| 'github' \| 'vuepress' | 'default' | √ | Preview themes |

> If responsive is `x`, you can set it's default value once.

> !!! Plug-in units are import from `cdn.jsdelivr.net`, if your project does not run on line, please use your local url to replace. eg: highlightJs = "//127.0.0.1/highlight.min.js"

[toolbars]

```js
[
  'bold',
  'underline',
  'italic',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'revoke',
  'next',
  'save',
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
  linkModalTips: {
    title: 'Add ',
    descLable: 'Desc:',
    descLablePlaceHolder: 'Enter a description...',
    urlLable: 'Link:',
    UrlLablePlaceHolder: 'Enter a link...',
    buttonOK: 'OK',
    buttonUpload: 'Upload',
    buttonUploadClip: 'Crop2upload'
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

## 2. Event

| name | params | description |
| --- | --- | --- |
| onChange | v:String | Content changed event(bind to `oninput` of `textarea`) |
| onSave | v:String | Save Content event，`ctrl+s`and click button will trigger |
| onUploadImg | files:FileList, callback:Function | Upload picture event，when picture is uploading the modal will not close，please provide right urls to the callback function |
| onHtmlChanged | h:String | Compile markdown successful event，you can use it to get the html code |
| onGetCatalog<sup>v1.4.0</sup> | list: HeadList[] | Get catalogue of article |

## 3. Shortcut key

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

## 4. 编辑器实现说明

本节介绍编辑器中部分功能的实现。

### 4.1 编辑区

- 由于不是富文本编辑器，所以采用了`textarea`标签作为编辑区。

- 为解决代码插入文本，在我的博客留言板中封装了两个比较实用的方法`insert`和`setPosition`，一个用于向光标位置插入特定内容，另一个用于重新定位光标位置，[源码位置](https://github.com/imzbf/md-editor-v3/blob/master/MdEditor/utils/index.ts)。

- 编辑器与工具栏的交互，由于没有 vuex，所以内置了`EventBus`，在不同地方通过这种方式来进行交互。（目前，同一页面嵌入两个编辑器`EventBus`被共享，目前已修复该问题）。
- 编辑器与快捷键，通过监听每一个按键对应的`ctrl`、`shift`等属性是否为`true`实现，并且均阻止了默认事件触发。在 windows 中以`CTRL`键为主要触发单元，在 MacOS 中以`META`键为主。

### 4.2 组件：**Divider**

分隔符，应用于工具栏中分隔功能模块，美化作用，实现为以宽为`1px`的元素做衬托。

### 4.3 组件：**Dropdown**

源码：[传送门](https://github.com/imzbf/md-editor-v3/tree/master/MdEditor/components/Dropdown)

- 下拉模块，主要用于下拉菜单使用。该组件将主插槽内容作为触发器，`overlay`插槽内容作为拉下展示内容，通过 vue 内置的`cloneVNode`方法克隆组件，以绑定扩展属性及事件，达到了不添加多余的节点的目的；

- 内容插入通过 vue 内置的`Teleport`组件，将内容插入到编辑器内部（预设的地方），不会污染全局结构；

- 在卸载对应组件时，`onUnmounted`方法会主动卸载绑定事件。

### 4.4 组件：Modal

源码：[传送门](https://github.com/imzbf/md-editor-v3/tree/master/MdEditor/components/Modal)

- 作为弹窗模块使用，实现与**Dropdown**大为相似，默认了显示动画及居中位置；
- 这里加入了一个新特性，在显示弹窗时，可以通过点击弹窗标题移动弹框。

封装的移动元素[代码](https://github.com/imzbf/md-editor-v3/blob/master/MdEditor/utils/dom.ts)，优化了正确解绑事件，该方法针对了触发器实现，单一窗口并不通用。

### 4.5 主题模式

内置了暗黑和默认模式，两种模式由内部`theme`属性控制，由于`antd`中以`less`修改变量值达到切换主题的方式依赖项较多，并未采用，实现则是最基础的两种主题两个类名的方式。

### 4.6 图片裁剪上传

该功能主要依赖`cropperjs`库，目前不提供该库自定义设置。

### 4.7 预览主题

内置了`previewTheme`调整预览内容主题，内置了`github`、`vuepress`和默认三种。值得注意的是他们都只设置了基础`markdown`支持的语法内容样式，特殊样式（例如：轮播等）暂未提供。同时`github`主题切换暗黑模式时，会同时替换代码块链接样式。若同页面有嵌入了多个编辑器，会受到影响。

## End of docs
