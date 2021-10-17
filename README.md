# md-editor-v3

![](https://img.shields.io/github/package-json/v/imzbf/md-editor-v3) ![](https://img.shields.io/npm/dm/md-editor-v3) ![](https://img.shields.io/bundlephobia/min/md-editor-v3) ![](https://img.shields.io/github/license/imzbf/md-editor-v3)

English \| [中文](https://github.com/imzbf/md-editor-v3/blob/master/README-CN.md)

Markdown editor for vue3, developed by `jsx` and `typescript`.

- Documentation and demo：[Go](https://imzbf.github.io/md-editor-v3)

- Use it online：[Go](https://stackblitz.com/edit/vue-aleajl)

- The same series editor for react：[md-editor-rt](https://github.com/imzbf/md-editor-rt)

## Features

- Toolbar, screenfull or screenfull in web pages and so on.
- Themes, Built-in default and dark themes.
- Shortcut key for editor.
- Beautify your content by `prettier`(only for markdown content, not the code and other text).
- Multi-language, build-in Chinese and English(default: Chinese).
- Upload picture, paste or clip the picture and upload it.
- Render article directly(no editor，no event listener, only preview content).
- Preview themes, support `defalut`、`vuepress`、`github` styles(not identical).

> More features are developing, if you have some ideas or find issues, please tell it to me~

## Preview

| Default theme | Dark theme | Preview only |
| --- | --- | --- |
| ![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/316ecb6e9b3b431aa1a6b0d20d9dabac~tplv-k3u1fbpfcp-watermark.image) | ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/611acc4227084ba19875b4b578a01e07~tplv-k3u1fbpfcp-watermark.image) | ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1664c4a5404641c4a1080d64bc6c5831~tplv-k3u1fbpfcp-watermark.image) |

## Apis

### Props

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
| languageUserDefined<sup>v1.5.0 changed</sup> | Object | {key: StaticTextDefaultValue} | √ | Expand language，update `language` api to your key |
| toolbars | Array | [toolbars] | √ | Show some item of toolbars，all keys<sup>see `toolbars` below<sup> |
| toolbarsExclude<sup>v1.1.4</sup> | Array | [] | √ | Don't show some item of toolbars，all keys`toolbars` |
| prettier | Boolean | true | x | Use prettier to beautify content or not |
| prettierCDN | String | [standalone@2.4.0](https://cdn.jsdelivr.net/npm/prettier@2.4.0/standalone.js) | x |  |
| prettierMDCDN | String | [parser-markdown@2.4.0](https://cdn.jsdelivr.net/npm/prettier@2.4.0/parser-markdown.js) | x |  |
| cropperCss<sup>v1.2.0</sup> | String | [cropper.min.css@1.5.12](https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.css) | x | Cropper css url |
| cropperJs<sup>v1.2.0</sup> | String | [cropper.min.js@1.5.12](https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.js) | x | Cropper js url |
| iconfontJs<sup>v1.3.2</sup> | String | [iconfont](https://at.alicdn.com/t/font_2605852_khjf435c7th.js) | x | Icon url |
| editorId<sup>v1.4.0</sup> | String | random | x | Editor id, also the html id, it is used when there are two or more editor and server render in the future |
| tabWidth<sup>v1.4.0<sup> | Number | 2 | x | One tab eq some space |
| showCodeRowNumber<sup>v1.4.3</sup> | Boolean | false | x | Show row number for code block or not |
| screenfull<sup>v1.4.3</sup> | Object | null | x | Screenfull instance, editor will not insert script of it |
| screenfullJs<sup><v1.4.3</sup> | String | [screenfull@5.1.0](https://cdn.jsdelivr.net/npm/screenfull@5.1.0/dist/screenfull.js) | x | Screenfull js url |
| previewTheme<sup>v1.4.3</sup> | 'default' \| 'github' \| 'vuepress' | 'default' | √ | Preview themes |

> If responsive is `x`, you can set it's default value once.

[toolbars]

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

> after v1.6.0, You can sort the toolbar as you like, split tools by `'-'`, the left and right toolbars are divided by `'='`！

Expand language，you need to replace all the content here：

[StaticTextDefaultValue]

```ts
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
  // The modal tips of add link or upload picture
  linkModalTips?: {
    title?: string;
    descLable?: string;
    descLablePlaceHolder?: string;
    urlLable?: string;
    UrlLablePlaceHolder?: string;
    buttonOK?: string;
    buttonUpload?: string;
  };
  // The modal tips of clip the picture，v1.2.0
  clipModalTips?: {
    title?: string;
    buttonUpload?: string;
  };
  // Copy code tips，v1.1.4
  copyCode?: {
    text?: string;
    tips?: string;
  };
}
```

### Event

| name | params | description |
| --- | --- | --- |
| onChange | v:String | Content changed event(bind to `oninput` of `textarea`) |
| onSave | v:String | Save Content event，`ctrl+s`and click button will trigger |
| onUploadImg | files:FileList, callback:Function | Upload picture event，when picture is uploading the modal will not close，please provide right urls to the callback function |
| onHtmlChanged | h:String | Compile markdown successful event，you can use it to get the html code |
| onGetCatalog<sup>v1.4.0</sup> | list: HeadList[] | Get catalogue of article |
| markedHeading<sup>[v1.6.0](https://github.com/imzbf/md-editor-v3/releases/tag/v1.6.0)</sup> | text: string,level: 1-6,raw: string, slugger: Slugger | `marked` head renderer methods |

### Shortcut key

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

## Simple demo

### Jsx module

```js
import { defineComponent, reactive } from 'vue';
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export default defineComponent({
  setup() {
    const md = reactive({
      text: 'default markdown content'
    });
    return () => (
      <Editor hljs={hljs} modelValue={md.text} onChange={(value) => (md.text = value)} />
    );
  }
});
```

### Vue template

```js
<template>
  <editor v-model="text" pageFullScreen></editor>
</template>

<script>
import { defineComponent } from 'vue';
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  name: 'VueTemplateDemo',
  components: { Editor },
  data() {
    return {
      text: '# md-editor-v3'
    };
  }
});
</script>

```

### Upload picture

> Tips：When you paste and upload GIF，it will upload a static picture. So you should upload it by file system!

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

## Support

> Refund can be made through the contact information above(Please do not operate maliciously).

| Alipay | WeChat |
| --- | --- |
| ![Alipay](https://art-1252753142.cos.ap-chengdu.myqcloud.com/2021/10061034374527224217786475887.jpeg) | ![WeChat](https://art-1252753142.cos.ap-chengdu.myqcloud.com/2021/10061034518598350079764474265.jpeg) |
