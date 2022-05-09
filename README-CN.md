# md-editor-v3

![](https://img.shields.io/github/package-json/v/imzbf/md-editor-v3) ![](https://img.shields.io/npm/dm/md-editor-v3) ![](https://img.shields.io/bundlephobia/min/md-editor-v3) ![](https://img.shields.io/github/license/imzbf/md-editor-v3) ![](https://img.shields.io/badge/ssr-%3E1.6.0-brightgreen)

[English](https://github.com/imzbf/md-editor-v3) \| 中文

vue3 环境的 Markdown 编辑器，使用 `jsx` 和 `typescript` 语法开发，支持在 tsx 项目使用。

- 文档与在线预览：[传送门](https://imzbf.github.io/md-editor-v3)

- 在线尝试示例：[传送门](https://codesandbox.io/s/epic-bird-2znqo)

- 同系列`react`版本：[md-editor-rt](https://github.com/imzbf/md-editor-rt)

## 功能一览

- 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等；
- 内置的白色主题和暗黑主题，支持绑定切换；
- 支持快捷键插入内容； 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）；
- 多语言，支持自行扩展语言；
- 粘贴上传图片，图片裁剪上传；
- 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）；
- 预览主题，支持`defalut`、`vuepress`、`github` 样式（不完全相同）；
- `mermaid`绘图（>=1.8.0）；
- `katex`数学公式（>=1.9.0）。

## 预览图

| 默认模式 | 暗黑模式 | 仅预览 |
| --- | --- | --- |
| ![默认模式](https://imzbf.github.io/md-editor-v3/imgs/preview-light.png) | ![暗黑模式](https://imzbf.github.io/md-editor-v3/imgs/preview-dark.png) | ![](https://imzbf.github.io/md-editor-v3/imgs/preview-previewOnly.png) |

## Apis

### Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | String | '' | md 编辑内容，vue 模板支持双向绑定（v-model="value"） |
| theme | 'light' \| 'dark' | 'light' | 主题切换 |
| class | String | '' | 编辑器类名 |
| historyLength | Number | 10 | 最大记录操作数（太大会占用内存） |
| pageFullScreen | Boolean | false | 页面内全屏 |
| preview | Boolean | true | 是否预览 |
| htmlPreview | Boolean | false | 是否 html 预览 |
| previewOnly | Boolean | false | 仅预览模式，不显示 bar 和编辑框，_不支持响应式，仅能初始设置一次_ |
| language | String | 'zh-CN' | 内置中英文('zh-CN','en-US')，可自行扩展其他语言，同时可覆盖内置的中英文 |
| toolbars | Array | [toolbars] | 选择性展示工具栏，可选内容<sup>见下方`toolbars`</sup> |
| toolbarsExclude | Array | [] | 选择性不展示工具栏，内容同`toolbars` |
| noPrettier | Boolean | false | 是否启用 prettier 优化 md 内容 |
| editorId | String | md-editor-v3 | 编辑器唯一标识，非必须项，当相同页面存在两个编辑器时，请务必区别该属性 |
| tabWidth | Number | 2 | 编辑器 TAB 键位等于空格数 |
| showCodeRowNumber | Boolean | false | 代码块是否显示行号 |
| previewTheme | `'default'\|'github'\|'vuepress'\|'mk-cute'\|'smart-blue'\|'cyanosis'` | 'default' | 预览内容主题，自定义主题规则见下方 |
| style | CSSProperties | {} | 编辑器内联样式 |
| tableShape | [Number, Number] | [6, 4] | 标题栏添加表格时，预设待选表格大小，第一个代表最大列数，第二个代表最大行数。 |
| noMermaid | Boolean | false | 如果你不希望使用图表展示内容，可以设置关闭 |
| placeholder | String | '' |  |
| noKatex | Boolean | false | 不使用 katex 展示数学公式 |
| defToolbars | Array<DropdownToolbar \| NormalToolbar> | null | 自定义工具栏，具体使用请参考[文档](https://imzbf.github.io/md-editor-v3/docs/index#%F0%9F%92%AA%20defToolbars)和[emoji 示例](https://imzbf.github.io/md-editor-v3/demo/index#💪%20Customize%20Toolbar) |
| codeCssName | `'atom'\|'a11y'\|'github'\|'gradient'\|'kimbie'\|'paraiso'\|'qtcreator'\|'stackoverflow'` | 'atom' | 代码块[highlight](https://www.jsdelivr.com/package/npm/highlight.js?path=styles)样式名称，扩展更多见下方 |

简单的标记和表情扩展预览

![mark and Emoji extension](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

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

> 从 v1.6.0 开始，你可以随意排序工具栏，通过`'-'`分割两个工具，通过`'='`实现左右放置！

> 从 v1.10.0 开始，你可以自定义工具栏，将`defToolbars`中自定义工具项的下标穿插在`toolbars`实现展示（这并不规范），更多请参考[文档]()。

自定义语言，需要替换的下面的全部内容（某些字段若不主动提供，会造成页面不美观）：

[StaticTextDefaultValue]

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
  // 工具栏hover title提示
  toolbarTips?: ToolbarTips;
  // 标题下拉框内容
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
  // 添加链接或图片时弹窗提示
  linkModalTips?: {
    title?: string;
    descLable?: string;
    descLablePlaceHolder?: string;
    urlLable?: string;
    UrlLablePlaceHolder?: string;
    buttonOK?: string;
  };
  // 裁剪图片弹窗提示，v1.2.0
  clipModalTips?: {
    title?: string;
    buttonUpload?: string;
  };
  // 预览代码中复制代码提示，v1.1.4
  copyCode?: {
    text?: string;
    tips?: string;
  };
  // v1.8.0
  mermaid?: {
    // 流程图
    flow?: string;
    // 时序图
    sequence?: string;
    // 甘特图
    gantt?: string;
    // 类图
    class?: string;
    // 状态图
    state?: string;
    // 饼图
    pie?: string;
    // 关系图
    relationship?: string;
    // 旅程图
    journey?: string;
  };
  katex?: {
    // 行内公式
    inline: string;
    // 块级公式
    block: string;
  };
}
```

### 绑定事件

| 名称 | 入参 | 使用 | 说明 |
| --- | --- | --- | --- |
| onChange | v:string | @onChange="xxx" | 内容变化事件（当前与`textare`的`oninput`事件绑定，每输入一个单字即会触发） |
| onSave | v:string | @onSave="xxx" | 保存事件，快捷键与保存按钮均会触发 |
| onUploadImg | files:Array<File>, callback:Function | @onUploadImg="xxx" | 上传图片事件，弹窗会等待上传结果，务必将上传后的 urls 作为 callback 入参回传 |
| onHtmlChanged | h:string | @onHtmlChanged="xxx" | html 变化回调事件，用于获取预览 html 代码 |
| onGetCatalog | list: HeadList[] | @onGetCatalog="xxx" | 动态获取`markdown`目录 |
| markedHeadingId | (text: string, level: number) => string | :marked-heading-id="xxx" | 标题`ID`计算方式 |
| sanitize | (html: string) => string | :sanitize="xxx" | 在每次生成 html 后，通过该方法移除危险内容，比如 xss 相关。 |

> 如果你重新定义了标题，请务必通过`markedHeadingId`告诉编辑器你生成标题 ID 的算法。以便生成的内部目录能够正确导航。

## 编辑器配置

使用`MdEditor.config(option: ConfigOption)`方法，可以对内部的`renderer`定制。

- markedRenderer: `(renderer: Renderer) => Renderer`，设置链接在新窗口打开 🌰：

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

- markedExtensions: `Array<marked.TokenizerExtension & marked.RendererExtension>`，扩展标记语法 🌰：

```js
import MdEditor from 'md-editor-v3';

MdEditor.config({
  markedExtensions: []
});
```

- markedOptions: `marked.MarkedOptions`，设置输入空白行不渲染出来 🌰：

```js
import MdEditor from 'md-editor-v3';

MdEditor.config({
  markedOptions: { breaks: false }
});
```

- editorExtensions: 类型如下，用于配置编辑器内部的扩展

```typescript
import MdEditor from 'md-editor-v3';

export interface ConfigOption {
  markedRenderer?: (renderer: Renderer) => Renderer;
  markedExtensions?: Array<marked.TokenizerExtension & marked.RendererExtension>;
  markedOptions?: marked.MarkedOptions;
  editorExtensions?: {
    highlight?: {
      instance?: any;
      js?: string;
      css?: CodeCss;
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
  };
  editorConfig?: {
    languageUserDefined?: { [key: string]: StaticTextDefaultValue };
    mermaidTemplate?: MermaidTemplate;
  };
}
```

## 快捷键

主要以`CTRL`搭配对应功能英文单词首字母，冲突项添加`SHIFT`，再冲突替换为`ALT`。

| 键位 | 功能 | 说明 | 版本标记 |
| --- | --- | --- | --- |
| TAB | 空格 | 通过`tabWidth`属性预设 TAB 键位新增空格长度，默认 2，支持多行 | v1.4.0 |
| SHIFT + TAB | 取消空格 | 同上，一次取消两个空格，支持多行 | v1.4.0 |
| CTRL + C | 复制 | 选中时复制选中内容，未选中时复制当前行内容 | v1.4.0 |
| CTRL + X | 剪切 | 选中时剪切选中内容，未选中时剪切当前行 | v1.4.0 |
| CTRL + D | 删除 | 选中时删除选中内容，未选中时删除当前行 | v1.4.0 |
| CTRL + S | 保存 | 触发编辑器的`onSave`回调 | v1.0.0 |
| CTRL + B | 加粗 | `**加粗**` | v1.0.0 |
| CTRL + U | 下划线 | `<u>下划线</u>` | v1.0.0 |
| CTRL + I | 斜体 | `*斜体*` | v1.0.0 |
| CTRL + 1-6 | 1-6 级标题 | `# 标题` | v1.0.0 |
| CTRL + ↑ | 上角标 | `<sup>上角标</sup>` | v1.0.0 |
| CTRL + ↓ | 下角标 | `<sub>下角标</sub>` | v1.0.0 |
| CTRL + Q | 引用 | `> 引用` | v1.0.0 |
| CTRL + O | 有序列表 | `1. 有序列表` | v1.0.0 |
| CTRL + L | 链接 | `[链接](https://imbf.cc)` | v1.0.0 |
| CTRL + Z | 撤回 | 触发编辑器内内容撤回，与系统无关 | v1.0.0 |
| CTRL + SHIFT + S | 删除线 | `~删除线~` | v1.0.0 |
| CTRL + SHIFT + U | 无序列表 | `- 无序列表` | v1.0.0 |
| CTRL + SHIFT + C | 块级代码 | 多行代码块 | v1.0.0 |
| CTRL + SHIFT + I | 图片链接 | `![图片](https://imbf.cc)` | v1.0.0 |
| CTRL + SHIFT + Z | 前进一步 | 触发编辑器内内容前进，与系统无关 | v1.0.0 |
| CTRL + SHIFT + F | 美化内容 |  | v1.0.0 |
| CTRL + ALT + C | 行内代码 | 行内代码块 | v1.0.0 |
| CTRL + SHIFT + ALT + T | 表格 | `\|表格\|` | v1.4.0 |

## 使用内部组件

1.x 版本扩展组件作为编辑器组件的属性值来使用，例如：`Editor.DropdownToolbar`。使用参考：[文档页面](https://imzbf.github.io/md-editor-v3)

### 普通扩展工具栏

`Editor.NormalToolbar`

- `title`: `string`，非必须，作为工具栏上的 hover 提示；
- `trigger`: `string | JSX.Element`，必须，通常是个图标，用来展示在工具栏上；
- `onClick`: `(e: MouseEvent) => void`，必须，点击事件。

### 下拉扩展工具栏

`Editor.DropdownToolbar`

- `title`: `string`，非必须，作为工具栏上的 hover 提示；
- `visible`: `boolean`，必须，下拉状态；
- `trigger`: `string | JSX.Element`，必须，通常是个图标，用来展示在工具栏上；
- `onChange`: `(visible: boolean) => void`，必须，状态变化事件；
- `overlay`: `string | JSX.Element`，必须，下拉框中的内容。

### 目录导航

`Editor.Catalog`

- `editorId`: `string`，必须，对应编辑器的`editorId`，在内部注册目录变化监听事件；
- `class`: `string`，非必须，目录组件最外层类名；
- `markedHeadingId`: `MarkedHeadingId`，非必须，特殊化编辑器标题的算法，与编辑器相同；
- `scrollElement`: `string | HTMLElement`，非必须，为字符时应是一个元素选择器。仅预览模式中，整页滚动时，设置为`document.documentElement`
- `theme`: 'light' | 'dark'，非必须，当需要切换主题时提供，同编辑器的`theme`。

## 部分示例

### Jsx 语法项目

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

### Vue 模板项目

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
      text: '默认值'
    };
  }
});
</script>

```

### 上传图片

默认可以选择多张图片，支持粘贴板上传图片。

> 注意：粘贴板上传时，如果是网页上的 gif 图，无法正确上传为 gif 格式！

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
