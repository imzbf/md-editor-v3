> 当前最新版本：[${EDITOR_VERSION}](https://github.com/imzbf/md-editor-v3/releases/tag/v${EDITOR_VERSION})，在线尝试示例：[传送门](https://codesandbox.io/s/epic-bird-2znqo)

## 🤯 Props 说明

这是组件最重要的一部分内容，`md-editor-v3`的属性参数如下：

### 📃 modelValue

- **类型**：`String`
- **默认值**：`''`
- **说明**：编辑的内容。

### 🛍 theme

- **类型**：`'light' | 'dark'`
- **默认值**：`'light'`
- **说明**：编辑器主题。

```js
<Editor theme="dark" />
```

### 🎀 editorClass

- **类型**：`String`
- **默认值**：`''`
- **说明**：编辑器`class`。

### 🧸 hljs

- **类型**：`Object`
- **默认值**：`null`
- **说明**：highlight 实例，编辑器不会插入对应的 script，但需要手动导入的高亮代码样式。

### 🧸 highlightJs

- **类型**：`String`
- **默认值**：[highlight.js@11.2.0](https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/highlight.min.js)
- **说明**：highlightJs 链接。

### 🧸 highlightCss

- **类型**：`String`
- **默认值**：[atom-one-dark@11.2.0](https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/atom-one-dark.css)
- **说明**：预览高亮代码样式。

### 🤏🏼 historyLength

- **类型**：`Number`
- **默认值**：`10`
- **说明**：最大记录操作数（太大会占用内存）。

### 💻 pageFullScreen

- **类型**：`Boolean`
- **默认值**：`false`
- **说明**：页面内全屏。

### 📱 preview

- **类型**：`Boolean`
- **默认值**：`true`
- **说明**：是否显示预览。

### 📀 htmlPreview

- **类型**：`Boolean`
- **默认值**：`false`
- **说明**：是否显示 html 预览。

### 📺 previewOnly

- **类型**：`Boolean`
- **默认值**：`false`
- **说明**：仅预览模式，不显示 bar 和编辑框，不支持响应式，仅能初始设置一次。

### 🔤 language

- **类型**：`String`
- **默认值**：`'zh-CN'`
- **说明**：内置中英文(`'zh-CN'`,`'en-US'`)，可自行扩展其他语言，同时可覆盖内置的中英文。

### 🔤 languageUserDefined

- **类型**：`Object`
- **默认值**：`{key: StaticTextDefaultValue}`
- **说明**：通过这里扩展语言，修改 language 值为扩展 key 即可，类型申明可手动导入，支持覆盖默认的两个配置 🤨。

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
  // 裁剪图片弹窗提示
  clipModalTips?: {
    title?: string;
    buttonUpload?: string;
  };
  // 预览代码中复制代码提示
  copyCode?: {
    text?: string;
    tips?: string;
  };
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
  // 1.9.0
  katex?: {
    // 行内公式
    inline: string;
    // 块级公式
    block: string;
  };
}
```

### 🧱 toolbars

- **类型**：`Array`
- **默认值**：`[all]`
- **说明**：选择性展示工具栏，可选内容见下方。

你可以随意排序工具栏，通过`'-'`分割两个工具，通过`'='`实现左右放置！

从 v1.10.0 开始，你可以自定义工具栏，将`defToolbars`中自定义工具项的下标穿插在`toolbars`实现展示（这并不规范），更多请参考[文档](https://imzbf.github.io/md-editor-v3/docs/index#💪%20defToolbars)。

```js
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
  'github';

// 对应功能名称
'加粗',
  '下划线',
  '斜体',
  '删除线',
  '下标',
  '上标',
  '引用',
  '无序列表',
  '有序列表',
  '行内代码',
  '块级代码',
  '链接',
  '图片',
  '表格',
  '图表',
  '公式',
  '后退一步',
  '前进一步',
  '保存',
  '页面内全屏',
  '屏幕全屏',
  '内容预览',
  'html代码预览',
  '目录',
  '源码地址';
```

### 🧱 toolbarsExclude

- **类型**：`Array`
- **默认值**：`[]`
- **说明**：选择性不展示工具栏，内容同上。

### 🪒 prettier

- **类型**：`Boolean`
- **默认值**：`true`
- **说明**：是否启用 prettier 优化 md 内容。

### 🪒 prettierCDN

- **类型**：`String`
- **默认值**：[standalone@2.4.0](https://cdn.jsdelivr.net/npm/prettier@2.4.0/standalone.js)
- **说明**：

### 🪒 prettierMDCDN

- **类型**：`String`
- **默认值**：[parser-markdown@2.4.0](https://cdn.jsdelivr.net/npm/prettier@2.4.0/parser-markdown.js)
- **说明**：

### ✂️ Cropper

- **类型**：`Object`
- **默认值**：`undefined`
- **说明**：图片裁剪实例。

### ✂️ cropperCss

- **类型**：`String`
- **默认值**：[cropper.min.css@1.5.12](https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.css)
- **说明**：裁剪扩展库 css。

### ✂️ cropperJs

- **类型**：`String`
- **默认值**：[cropper.min.js@1.5.12](https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.js)
- **说明**：裁剪扩展库 js。

### 👻 iconfontJs

- **类型**：`String`
- **默认值**：[iconfont](//at.alicdn.com/t/font_2605852_ihjkm7wo1y.js)
- **说明**：矢量图标链接，无外网时，下载 js 到内网，提供链接。

### 🎲 editorId

- **类型**：`String`
- **默认值**：`'md-editor-v3'`
- **说明**：编辑器唯一标识，非必须项，用于后续支持 ssr 时，防止产生服务端与客户端渲染内容不一致错误提示。

### 🤏 tabWidth

- **类型**：`Number`
- **默认值**：`2`
- **说明**：编辑器一个 TAB 键等于空格数。

### 🔢 showCodeRowNumber

- **类型**：`Boolean`
- **默认值**：`false`
- **说明**：代码块是否显示行号。

### 🖥 screenfull

- **类型**：`Object`
- **默认值**：`null`
- **说明**：全屏插件实例，编辑器不再插入对应的 script。

### 🖥 screenfullJs

- **类型**：`String`
- **默认值**：[5.1.0](https://cdn.jsdelivr.net/npm/screenfull@5.1.0/dist/screenfull.js)
- **说明**：screenfull js 链接。

### 🔦 previewTheme

- **类型**：`'default' | 'github' | 'vuepress'`
- **默认值**：`'default'`
- **说明**：预览内容主题。

### 🎅🏻 style

- **类型**：`CSSProperties`
- **默认值**：`''`
- **版本**：`>= 1.2.0`
- **说明**：编辑器内联样式，默认不能直接设置字符串。

### 📅 tableShape

- **类型**：`[Number, Number]`
- **默认值**：`[6, 4]`
- **版本**：`>= 1.8.0`
- **说明**：标题栏添加表格时，预设待选表格大小，第一个代表最大列数，第二个代表最大行数。

```js
<Editor tableShape={[8, 4]}>
```

![表格预设大小预览](/md-editor-v3/imgs/20211216165424.png)

### 📉 mermaid

- **类型**：`mermaid`
- **默认值**：`undefined`
- **版本**：`>= 1.8.0`
- **说明**：图表库`mermaid`实例，当项目中有使用或者希望在服务端渲染返回内容中携带正确的图表时，提供该实例，客户端将不再不会使用 cdn 资源。

```js
import mermaid from 'mermaid'

//
<Editor mermaid={mermaid}>
```

### 📉 mermaidJs

- **类型**：`String`
- **默认值**：[mermaid@8.13.5](https://cdn.jsdelivr.net/npm/mermaid@8.13.5/dist/mermaid.min.js)
- **版本**：`>= 1.8.0`
- **说明**：mermaidJs 链接。

```js
<Editor mermaidJs="/lib/mermaid.min.js" />
```

### ☝️ noMermaid

- **类型**：`Boolean`
- **默认值**：`false`
- **版本**：`>= 1.8.0`
- **说明**：如果你不希望使用图表展示内容，可以设置关闭。

```js
<Editor noMermaid />
```

### 🪧 placeholder

- **类型**：`String`
- **默认值**：`''`
- **版本**：`>= 1.8.0`
- **说明**：啊这-\_-！

### 📐 katex

- **类型**：`katex`
- **默认值**：`undefined`
- **版本**：`>= 1.9.0`
- **说明**：数学公式`katex`实例，当项目中有使用或者希望在服务端渲染返回内容中携带正确的公式时，提供该实例，客户端将不再不会使用 cdn 资源。

```js
import katex from 'katex'

//
<Editor katex={katex}>
```

### 📐 katexJs

- **类型**：`String`
- **默认值**：[katex.min.js@0.15.1](https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.js)
- **版本**：`>= 1.9.0`
- **说明**：katexJs 链接。

```js
<Editor katexJs="/lib/katex.min.js" />
```

### 📐 katexCss

- **类型**：`String`
- **默认值**：[katex.min.css@0.15.1](https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css)
- **版本**：`>= 1.9.0`
- **说明**：katexCss 链接。

```js
<Editor katexCss="/lib/katex.min.css" />
```

### ☝️ noKatex

- **类型**：`Boolean`
- **默认值**：`false`
- **版本**：`>= 1.9.0`
- **说明**：如果你不希望使用数学公式展示内容，可以设置关闭。

```js
<Editor noKatex />
```

### 💪 defToolbars

- **类型**：`Array<VNode>`
- **默认值**：`[]`
- **版本**：`>= 1.10.0`
- **说明**：自定义工具栏插槽，通过使用内置的`NormalToolbar`普通点击触发事件组件，和`DropdownToolbar`下拉点击触发事件组件进行扩展。将`defToolbars`插槽中的组件下标穿插在`toolbars`实现展示（这并不规范）

**Editor.NormalToolbar** Props 说明

- **title**: `String`，hover 提示。
- **trigger**：`VNode`，触发点击，同时展示在工具栏中，通常是一个图标。
- **onClick**： `(e: MouseEvent) => void`，trigger 点击事件。

**Editor.DropdownToolbar** Props 说明

- **title**: `String`，hover 提示。
- **visible**：`Boolean`，下拉框状态。
- **onChange**： `(visible: boolean) => void`，trigger 点击事件。
- **trigger**：`VNode`，触发点击，同时展示在工具栏中，通常是一个图标。
- **overlay**：`VNode`，下拉框中的内容。

<br>
<hr>

- 普通扩展

这里展示将选中的内容使用`@`包裹，完整可用的示例请参考[mark 标记示例](https://imzbf.github.io/md-editor-v3/demo/index#%F0%9F%92%AA%20Customize%20Toolbar)。

```vue
<template>
  <Editor
    editorId="md-prev"
    v-model="data.text"
    :toolbars="['bold', 'underline', 'italic', 0]"
  >
    <template #defToolbars>
      <Editor.NormalToolbar title="标记" @click="markHandler">
        <template #trigger>
          <!--这里的内容将被展示在工具栏中-->
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
  text: '# 普通扩展演示'
});

const markHandler = () => {
  // 获取输入框
  const textarea = document.querySelector('#md-prev-textarea') as HTMLTextAreaElement;
  // 获取选中的内容
  const selection = window.getSelection()?.toString();
  // 获取鼠标位置
  const endPoint = textarea.selectionStart;

  // 生成标记文本
  const markStr = `@${selection}@`;

  // 根据鼠标位置分割旧文本
  // 前半部分
  const prefixStr = textarea.value.substring(0, endPoint);
  // 后半部分
  const suffixStr = textarea.value.substring(endPoint + (selection?.length || 0));

  data.text = `${prefixStr}${markStr}${suffixStr}`;

  // setTimeout
  // 作用一是textarea文本更新后执行，加上nextTick更加靠谱
  // 作用二是防止setSelectionRange失效
  setTimeout(() => {
    textarea.setSelectionRange(endPoint, markStr.length + endPoint);
    textarea.focus();
  }, 0);
};
</script>
```

![普通扩展工具栏](/md-editor-v3/imgs/normal-toolbar.gif)

<br>

- 下拉扩展

这里展示下拉框选择的扩展，完整可用的示例请参考[emoji 示例](https://imzbf.github.io/md-editor-v3/demo/index#%F0%9F%92%AA%20Customize%20Toolbar)。

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
            <li @click="markHandler(1)">菜单一</li>
            <li @click="markHandler(2)">菜单二</li>
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
  text: '# 下拉扩展演示',
  emojiVisible: false
});

const markHandler = (num: number) => {
  // 参考普通扩展
  alert(num);
};

const emojiVisibleChanged = (visible) => {
  data.emojiVisible = visible;
};
</script>
```

![下拉扩展工具栏](/md-editor-v3/imgs/dropdown-toolbar.gif)

### 🪡 extensions

- **类型**：`Array<Object>`
- **默认值**：`[]`
- **说明**：编辑器依赖的[marked](https://marked.js.org/using_pro#extensions)扩展。

一个简单的`mark`示例，更加复杂的功能请参考[marked](https://marked.js.org/using_pro#extensions)扩展文档。

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

该扩展的作用是将`@hello@`转换成`<mark>hello</mark>`。

<br>
<hr>

## 🪢 绑定事件

目前支持的内容如下：

### 📞 onChange

- **类型**：`(v: string) => void`
- **说明**：内容变化事件（当前与`textare`的`oninput`事件绑定，每输入一个单字即会触发）。

### 💾 onSave

- **类型**：`(v: string) => void`
- **说明**：保存事件，快捷键与保存按钮均会触发。

### 📸 onUploadImg

- **类型**：`(files: FileList, callback: function) => void`
- **说明**：上传图片事件，弹窗会等待上传结果，务必将上传后的 urls 作为 callback 入参回传。

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

- **类型**：`(h: string) => void`
- **说明**：html 变化回调事件，用于获取预览 html 代码。

### 🗒 onGetCatalog

- **类型**：`(list: HeadList[]) => void`
- **说明**：动态获取`markdown`目录。

### 🪄 markedHeading

- **类型**：`(text: string,level: 1-6,raw: string, slugger: Slugger) => string`
- **说明**：`marked`转换 md 文本标题的方法。

> 如果你重写了`markedHeading`方法，请务必通过`markedHeadingId`告诉编辑器你生成标题 ID 的算法。以便生成的内部目录能够正确导航。

！！非常注意！！Vue 模板语法中，请通过:绑定方法，它不是一个单纯的事件。

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

- **类型**：`(text: string, level: number) => string`
- **说明**：标题`ID`计算方式。

### 🔒 sanitize

- **类型**：`(html: string) => string`
- **说明**：在每次生成 html 后，通过该方法移除危险内容，比如 xss 相关，当你很确定你的内容不会出现类似情况时，不必设置它。

> 使用`sanitize-html`演示

```js
import sanitizeHtml from 'sanitize-html';

//
<Editor sanitize={(html) => sanitizeHtml(html)} />;
```

就是这么简单。

> 为什么不内置到编辑器：由于类似编辑器大多属于自行处理文本，自身即可确认内容是否安全，并不需要该功能。

## 🪡 快捷键

主要以`CTRL`搭配对应功能英文单词首字母，冲突项添加`SHIFT`，再冲突替换为`ALT`。

| 键位 | 功能 | 说明 |
| --- | --- | --- |
| TAB | 空格 | 通过`tabWidth`属性预设 TAB 键位新增空格长度，默认 2，支持多行 |
| SHIFT + TAB | 取消空格 | 同上，一次取消两个空格，支持多行 |
| CTRL + C | 复制 | 选中时复制选中内容，未选中时复制当前行内容 |
| CTRL + X | 剪切 | 选中时剪切选中内容，未选中时剪切当前行 |
| CTRL + D | 删除 | 选中时删除选中内容，未选中时删除当前行 |
| CTRL + S | 保存 | 触发编辑器的`onSave`回调 |
| CTRL + B | 加粗 | `**加粗**` |
| CTRL + U | 下划线 | `<u>下划线</u>` |
| CTRL + I | 斜体 | `*斜体*` |
| CTRL + 1-6 | 1-6 级标题 | `# 标题` |
| CTRL + ↑ | 上角标 | `<sup>上角标</sup>` |
| CTRL + ↓ | 下角标 | `<sub>下角标</sub>` |
| CTRL + Q | 引用 | `> 引用` |
| CTRL + O | 有序列表 | `1. 有序列表` |
| CTRL + L | 链接 | `[链接](https://imbf.cc)` |
| CTRL + Z | 撤回 | 触发编辑器内内容撤回，与系统无关 |
| CTRL + SHIFT + S | 删除线 | `~删除线~` |
| CTRL + SHIFT + U | 无序列表 | `- 无序列表` |
| CTRL + SHIFT + C | 块级代码 | 多行代码块 |
| CTRL + SHIFT + I | 图片链接 | `![图片](https://imbf.cc)` |
| CTRL + SHIFT + Z | 前进一步 | 触发编辑器内内容前进，与系统无关 |
| CTRL + SHIFT + F | 美化内容 |  |
| CTRL + ALT + C | 行内代码 | 行内代码块 |
| CTRL + SHIFT + ALT + T | 表格 | `\|表格\|` |

## ✍️ 编辑此页面

[doc-zh-CN](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/doc-zh-CN.md)
