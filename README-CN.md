# 🎄 md-editor-v3

![](https://img.shields.io/github/package-json/v/imzbf/md-editor-v3) ![](https://img.shields.io/npm/dm/md-editor-v3) ![](https://img.shields.io/github/license/imzbf/md-editor-v3) ![](https://img.shields.io/badge/ssr-%3E1.6.0-brightgreen) ![](https://img.shields.io/badge/webcomponent-%3E4.19.0-brightgreen)

[English](https://github.com/imzbf/md-editor-v3) \| 中文

vue3 环境的 Markdown 编辑器，使用 `jsx` 和 `typescript` 语法开发。

- 文档与在线预览：[传送门](https://imzbf.github.io/md-editor-v3)

- 同系列`react`版本：[md-editor-rt](https://github.com/imzbf/md-editor-rt)

## ⭐️ 功能一览

- 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等；
- 内置的白色主题和暗黑主题，支持绑定切换；
- 支持快捷键插入内容； 支持使用 `prettier` 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）；
- 多语言，支持自行扩展语言；
- 粘贴上传图片，图片裁剪上传；
- 仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）；
- 预览主题，内置`default`、`vuepress`、`github` 、`cyanosis`、`mk-cute`、`smart-blue` 6 种预览主题（不完全相同），支持自定义主题（参考文档 demo 页示例）；
- `mermaid`绘图（>=1.8.0），`katex`数学公式（>=1.9.0）；
- 自定义工具栏顺序或显示，自定义扩展工具栏（支持点击类型、下拉菜单类型及弹窗类型）等。
- 按需引用(>=4.0.0)。

## 🗺 预览图

| 默认模式 | 暗黑模式 | 仅预览 |
| --- | --- | --- |
| ![](https://imzbf.github.io/md-editor-v3/imgs/preview-light.png) | ![](https://imzbf.github.io/md-editor-v3/imgs/preview-dark.png) | ![](https://imzbf.github.io/md-editor-v3/imgs/preview-previewOnly.png) |

输入提示和自定义简单的标记、表情扩展预览

![](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

## 📦 安装

```shell
npm i md-editor-v3
```

使用已存在的语言、主题扩展，例如：日语

```shell
npm i @vavt/cm-extension
```

使用更多的扩展工具栏组件，例如：导出内容为 PDF

```shell
npm i @vavt/v3-extension
```

更多使用及贡献方式参考：[md-editor-extension](https://github.com/imzbf/md-editor-extension)

## 💡 用法

从`v4.0.0`开始，内部组件支持按需引用。

### ✍🏻 编辑器模式

```vue
<template>
  <MdEditor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('# Hello Editor');
</script>
```

### 📖 仅预览模式

```vue
<template>
  <MdPreview :editorId="id" :modelValue="text" />
  <MdCatalog :editorId="id" :scrollElement="scrollElement" />
</template>

<script setup>
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const id = 'preview-only';
const text = ref('# Hello Editor');
const scrollElement = document.documentElement;
</script>
```

当使用服务端渲染时，`scrollElement`应该是字符类型，例：`html`、`body`、`#id`、`.class`。

---

更多用法请前往 [文档](https://imzbf.github.io/md-editor-v3)。
