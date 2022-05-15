> 在线尝试示例：[传送门](https://codesandbox.io/s/epic-bird-2znqo)

## 🤯 Props 说明

这是组件最重要的一部分内容，`md-editor-v3`的属性参数如下：

### 📃 modelValue

- **类型**：`string`
- **默认值**：`''`
- **说明**：编辑的内容。

### 🛍 theme

- **类型**：`'light' | 'dark'`
- **默认值**：`'light'`
- **说明**：编辑器主题。

  ```js
  <Editor theme="dark" />
  ```

### 🎀 class

- **类型**：`string`
- **默认值**：`''`
- **说明**：编辑器`class`。

### 🤏🏼 historyLength

- **类型**：`number`
- **默认值**：`10`
- **说明**：最大记录操作数（太大会占用内存）。

### 💻 pageFullScreen

- **类型**：`boolean`
- **默认值**：`false`
- **说明**：页面内全屏。

### 📱 preview

- **类型**：`boolean`
- **默认值**：`true`
- **说明**：是否显示预览。

### 📀 htmlPreview

- **类型**：`boolean`
- **默认值**：`false`
- **说明**：是否显示 html 预览。

### 📺 previewOnly

- **类型**：`boolean`
- **默认值**：`false`
- **说明**：仅预览模式，不显示 bar 和编辑框，不支持响应式，仅能初始设置一次。

### 🔤 language

- **类型**：`string`
- **默认值**：`'zh-CN'`
- **说明**：内置中英文(`'zh-CN'`,`'en-US'`)，可自行扩展其他语言，同时可覆盖内置的中英文。

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

### 🪒 noPrettier

- **类型**：`boolean`
- **默认值**：`false`
- **说明**：是否启用 prettier 优化 md 内容。

### 🎲 editorId

- **类型**：`string`
- **默认值**：`'md-editor-v3'`
- **说明**：编辑器唯一标识，非必须项，用于后续支持 ssr 时，防止产生服务端与客户端渲染内容不一致错误提示。

### 🤏 tabWidth

- **类型**：`number`
- **默认值**：`2`
- **说明**：编辑器一个 TAB 键等于空格数。

### 🔢 showCodeRowNumber

- **类型**：`boolean`
- **默认值**：`false`
- **说明**：代码块是否显示行号。

### 🔦 previewTheme

- **类型**：`'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'`
- **默认值**：`'default'`
- **说明**：预览内容主题，支持自定义。

  主题自定义方式：

### 🎅🏻 style

- **类型**：`string | CSSProperties`
- **默认值**：`''`
- **说明**：编辑器内联样式，默认不能直接设置字符串。

### 📅 tableShape

- **类型**：`[number, number]`
- **默认值**：`[6, 4]`
- **说明**：标题栏添加表格时，预设待选表格大小，第一个代表最大列数，第二个代表最大行数。

  ```js
  <Editor tableShape={[8, 4]}>
  ```

  ![表格预设大小预览](https://imzbf.github.io/md-editor-v3/imgs/20211216165424.png)

### ☝️ noMermaid

- **类型**：`boolean`
- **默认值**：`false`
- **版本**：`>= 1.8.0`
- **说明**：如果你不希望使用图表展示内容，可以设置关闭。

```js
<Editor noMermaid />
```

### 🪧 placeholder

- **类型**：`string`
- **默认值**：`''`
- **说明**：啊这-\_-！

### ☝️ noKatex

- **类型**：`boolean`
- **默认值**：`false`
- **说明**：如果你不希望使用数学公式展示内容，可以设置关闭。

```js
<Editor noKatex />
```

### 🦉 codeCssName

- **类型**：`'atom'|'a11y'|'github'|'gradient'|'kimbie'|'paraiso'|'qtcreator'|'stackoverflow'`
- **默认值**：`'atom'`
- **说明**：代码块高亮样式名称。

  你可以添加自己的样式，把该属性设置为你想要的即可，方式如下：

### 🎱 markedHeadingId

- **类型**：`(text: string, level: number) => string`
- **默认值**：`(text) => text`
- **说明**：构造标题`ID`的生成方式，在使用`MdEditor.config`定义了`renderer.heading`后，避免目录导航等失效。

### 🐣 sanitize

- **类型**：`(html: string) => string`
- **默认值**：`(html) => html`
- **说明**：在每次生成 html 后，通过该方法移除危险内容，比如 xss 相关，当你很确定你的内容不会出现类似情况时，不必设置它。

  使用`sanitize-html`演示

  ```js
  import sanitizeHtml from 'sanitize-html';

  //
  <Editor sanitize={(html) => sanitizeHtml(html)} />;
  ```

  就是这么简单。

  > 为什么不内置到编辑器：由于类似编辑器大多属于自行处理文本，自身即可确认内容是否安全，并不需要该功能。

## 🎍 插槽

### 🪶 defToolbars

自定义工具栏插槽，通过使用内置的`NormalToolbar`普通点击触发事件组件，`DropdownToolbar`下拉点击触发事件组件和`ModalToolbar`弹窗触发事件组件进行扩展。将`defToolbars`插槽中的组件下标穿插在`toolbars`实现展示（这并不规范）。

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

![普通扩展工具栏](https://imzbf.github.io/md-editor-v3/imgs/normal-toolbar.gif) ![下拉扩展工具栏](https://imzbf.github.io/md-editor-v3/imgs/dropdown-toolbar.gif)

扩展组件属性参考**内置组件**，使用示例参见示例页面。

## 🪢 绑定事件

目前支持的内容如下：

### 📞 onChange

- **类型**：`(v: string) => void`
- **说明**：内容变化事件（当前与`textare`的`oninput`事件绑定，每输入一个单字即会触发）。

### 💾 onSave

- **类型**：`(v: string) => void`
- **说明**：保存事件，快捷键与保存按钮均会触发。

### 📸 onUploadImg

- **类型**：`(files: Array<File>, callback: function) => void`
- **说明**：上传图片事件，弹窗会等待上传结果，务必将上传后的 urls 作为 callback 入参回传。

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

### ☎️ onHtmlChanged

- **类型**：`(h: string) => void`
- **说明**：html 变化回调事件，用于获取预览 html 代码。

### 🗒 onGetCatalog

- **类型**：`(list: HeadList[]) => void`
- **说明**：动态获取`markdown`目录。

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

## 🪤 内置组件

1.x 版本扩展组件作为编辑器组件的属性值来使用，例如：`Editor.DropdownToolbar`。使用参考：[文档页面](https://imzbf.github.io/md-editor-v3)

### 🐣 NormalToolbar

- **props**

  - `title`: `string`，非必须，作为工具栏上的 hover 提示。

- **events**

  - `onClick`: `(e: MouseEvent) => void`，必须，点击事件。

- **slots**

  - `trigger`: `string | JSX.Element`，必须，通常是个图标，用来展示在工具栏上。

```vue
<template>
  <md-editor-v3 v-model="text">
    <template #defToolbars>
      <normal-toolbar title="mark" @click="callback">
        <template #trigger>
          <svg class="md-icon" aria-hidden="true">
            <use xlink:href="#icon-mark"></use>
          </svg>
        </template>
      </normal-toolbar>
    </template>
  </md-editor-v3>
</template>
```

### 🐼 DropdownToolbar

- **props**

  - `title`: `string`，非必须，作为工具栏上的 hover 提示。
  - `visible`: `boolean`，必须，下拉状态。

- **events**

  - `onChange`: `(visible: boolean) => void`，必须，状态变化事件。

- **slots**

  - `trigger`: `string | JSX.Element`，必须，通常是个图标，用来展示在工具栏上。
  - `overlay`: `string | JSX.Element`，必须，下拉框中的内容。

```vue
<template>
  <md-editor-v3 v-model="text">
    <template #defToolbars>
      <dropdown-toolbar
        title="emoji"
        :visible="data.emojiVisible"
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
          <svg class="md-icon" aria-hidden="true">
            <use xlink:href="#icon-emoji"></use>
          </svg>
        </template>
      </dropdown-toolbar>
    </template>
  </md-editor-v3>
</template>
```

### ModalToolbar

- **props**

  - `title`: `string`，非必须，作为工具栏上的 hover 提示。
  - `modalTitle`: `string`，非必须，弹窗的标题。
  - `visible`: `boolean`，必须，弹窗显示状态。
  - `width`: `string`，非必须，弹窗宽度，默认`auto`。
  - `height`：`string`，同`width`。
  - `showAdjust`: `boolean`，非必须，是否显示弹窗全屏按钮。
  - `isFullscreen`: `boolean`，显示全屏按钮时必须，弹窗全屏状态。

- **events**

  - `onClick`: `() => void`，必须，工具栏点击事件。
  - `onClose`：`() => void`，必须，弹窗点击关闭事件。
  - `onAdjust`：`(val: boolean) => void`，弹窗全屏按钮点击事件。

- **slots**

  - `trigger`: `string | JSX.Element`，必须，通常是个图标，用来展示在工具栏上。
  - `overlay`: `string | JSX.Element`，必须，下拉框中的内容。

```vue
<template>
  <md-editor-v3 v-model="data.text">
    <template #defToolbars>
      <modal-toolbar
        :visible="data.modalVisible"
        show-adjust
        :is-fullscreen="data.modalFullscreen"
        title="帮助"
        modal-title="编辑预览"
        width="870px"
        height="600px"
        @onClick="data.modalVisible = true"
        @onClose="data.modalVisible = false"
        @onAdjust="data.modalFullscreen = !data.modalFullscreen"
      >
        <span>内容</span>
        <template #trigger>
          <svg class="md-icon" aria-hidden="true">
            <use xlink:href="#icon-read"></use>
          </svg>
        </template>
      </modal-toolbar>
    </template>
  </md-editor-v3>
</template>

<script setup>
import { reactive } from 'vue';

const data = reactive({
  text: '',
  modalVisible: false,
  modalFullscreen: false
});
</script>
```

### 🐻 MdCatalog

- **props**

  - `editorId`: `string`，必须，对应编辑器的`editorId`，在内部注册目录变化监听事件。
  - `class`: `string`，非必须，目录组件最外层类名。
  - `markedHeadingId`: `MarkedHeadingId`，非必须，特殊化编辑器标题的算法，与编辑器相同。
  - `scrollElement`: `string | HTMLElement`，非必须，为字符时应是一个元素选择器。仅预览模式中，整页滚动时，设置为`document.documentElement`。
  - `theme`: `'light' | 'dark'`，非必须，当需要切换主题时提供，同编辑器的`theme`。

> `scrollElement`说明：仅预览下，该元素必须已定位的并且支持滚动。

```vue
<template>
  <md-editor-v3
    v-model="state.text"
    :editorId="state.id"
    :theme="state.theme"
    preview-only
  />
  <md-atalog :editorId="state.id" :scrollElement="scrollElement" :theme="state.theme" />
</template>

<script setup>
import { reactive } from 'vue';

const state = reactive({
  theme: 'dark',
  text: '标题',
  id: 'my-editor'
});

const scrollElement = document.documentElement;
</script>
```

## ✍️ 编辑此页面

[doc-zh-CN](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/doc-zh-CN.md)
