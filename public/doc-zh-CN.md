> 在线尝试示例：[传送门](https://codesandbox.io/s/epic-bird-2znqo)

## 🤯 Props 说明

这是组件最重要的一部分内容，`md-editor-v3`的属性参数如下：

### 📃 modelValue

- **类型**：`string`
- **默认值**：`''`

  编辑的内容。

  ```html
  <md-editor-v3 v-model="xxx" />
  ```

### 🛍 theme

- **类型**：`'light' | 'dark'`
- **默认值**：`'light'`

  编辑器主题。

  ```html
  <md-ditor-v3 theme="dark" />
  ```

### 🎀 class

- **类型**：`string`
- **默认值**：`''`

  编辑器`class`。

### 🤏🏼 historyLength

- **类型**：`number`
- **默认值**：`10`

  最大记录操作数（太大会占用内存）。

### 💻 pageFullScreen

- **类型**：`boolean`
- **默认值**：`false`

  页面内全屏。

### 📱 preview

- **类型**：`boolean`
- **默认值**：`true`

  是否显示预览。

### 📀 htmlPreview

- **类型**：`boolean`
- **默认值**：`false`

  是否显示 html 预览。

### 📺 previewOnly

- **类型**：`boolean`
- **默认值**：`false`

  仅预览模式，不显示 bar 和编辑框，不支持响应式，仅能初始设置一次。

### 🔤 language

- **类型**：`string`
- **默认值**：`'zh-CN'`

  内置中英文(`'zh-CN'`,`'en-US'`)，可自行扩展其他语言，同时可覆盖内置的中英文。

### 🧱 toolbars

- **类型**：`Array`
- **默认值**：`[all]`

  选择性展示工具栏，可选内容见下方。

  你可以随意排序工具栏，通过`'-'`分割两个工具，通过`'='`实现左右放置！

  从 v1.10.0 开始，你可以自定义工具栏，将`defToolbars`中自定义工具项的下标穿插在`toolbars`实现展示（这并不规范）

  _[all]_

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

- **类型**：`Array`
- **默认值**：`[]`

  选择性不展示工具栏，内容同上。

### 🪒 noPrettier

- **类型**：`boolean`
- **默认值**：`false`

  是否启用 prettier 优化 md 内容。

### 🎲 editorId

- **类型**：`string`
- **默认值**：`'md-editor-v3'`

  编辑器唯一标识，非必须项，服务端渲染时，防止产生服务端与客户端渲染内容不一致错误提示，以及单页面多编辑器时做区别。

### 🤏 tabWidth

- **类型**：`number`
- **默认值**：`2`

  编辑器一个 TAB 键等于空格数。

### 🔢 showCodeRowNumber

- **类型**：`boolean`
- **默认值**：`false`

  代码块是否显示行号。

### 🔦 previewTheme

- **类型**：`'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'`
- **默认值**：`'default'`

  预览内容主题，支持自定义。

  主题自定义方式：

  1. 编辑 css

  ```css
  .xxx-theme {
    color: red;
  }
  ```

  2. 设置`previewTheme`

  ```html
  <md-ditor-v3 preview-theme="xxx" />
  ```

  参考[markdown-theme](https://github.com/imzbf/markdown-theme)项目。

### 🎅🏻 style

- **类型**：`string | CSSProperties`
- **默认值**：`''`

  编辑器内联样式。

### 📅 tableShape

- **类型**：`[number, number]`
- **默认值**：`[6, 4]`

  标题栏添加表格时，预设待选表格大小，第一个代表最大列数，第二个代表最大行数。

  ```html
  <md-ditor-v3 :table-shape="[8, 4]" />
  ```

  ![表格预设大小预览](https://imzbf.github.io/md-editor-v3/imgs/20211216165424.png)

### ☝️ noMermaid

- **类型**：`boolean`
- **默认值**：`false`

  如果你不希望使用图表展示内容，可以设置关闭。

  ```html
  <md-ditor-v3 no-mermaid />
  ```

### 🪧 placeholder

- **类型**：`string`
- **默认值**：`''`

  啊这-\_-！

### ❌ noKatex

- **类型**：`boolean`
- **默认值**：`false`

  如果你不希望使用数学公式展示内容，可以设置关闭。

  ```html
  <md-ditor-v3 no-katex />
  ```

### 🦉 codeTheme

- **类型**：`'atom'|'a11y'|'github'|'gradient'|'kimbie'|'paraiso'|'qtcreator'|'stackoverflow'`
- **默认值**：`'atom'`

  代码块高亮样式名称。

  你可以添加自己的样式，把该属性设置为你想要的即可，方式如下：

  1. 配置样式链接

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    editorExtensions: {
      highlight: {
        css: {
          atom: {
            light:
              'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-light.min.css',
            dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css'
          },
          xxx: {
            light:
              'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/xxx-light.css',
            dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/xxx-dark.css'
          }
        }
      }
    }
  });
  ```

  2. 设置`codeTheme`

  ```html
  <md-ditor-v3 code-theme="xxx" />
  ```

### 🎱 markedHeadingId

- **类型**：`(text: string, level: number, index: number) => string`
- **默认值**：`(text) => text`

  构造标题`ID`的生成方式，在使用`MdEditor.config`定义了`renderer.heading`后，避免目录导航等失效。

  ```vue
  <template>
    <md-editor :marked-heading-id="generateId" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const generateId = (_text, _level, index) => `heading-${index}`;
  </script>
  ```

### 🐣 sanitize

- **类型**：`(html: string) => string`
- **默认值**：`(html) => html`

  在每次生成 html 后，通过该方法移除危险内容，比如 xss 相关，当你很确定你的内容不会出现类似情况时，不必设置它。

  使用`sanitize-html`演示

  ```vue
  <template>
    <md-editor :sanitize="sanitize" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import sanitizeHtml from 'sanitize-html';

  const sanitize = (html) => sanitizeHtml(html);
  </script>
  ```

  > 为什么不内置到编辑器：由于类似编辑器大多属于自行处理文本，自身即可确认内容是否安全，并不需要该功能。

### 🦶 footers

- **类型**：`Array<'markdownTotal' \| '=' \| 'scrollSwitch' \| number>`
- **默认值**：`['markdownTotal', '=', 'scrollSwitch']`

  页脚显示内容，`'='`左右分割，设置为`[]`不显示页脚。

### ⛵️ scrollAuto

- **类型**：`boolean`
- **默认值**：`true`

  默认左右同步滚动状态。

### 🤞🏼 noIconfont

- **类型**：`boolean`
- **默认值**：`true`

  不插入 iconfont 链接，你可以[下载](https://at.alicdn.com/t/font_2605852_pqekijay2ij.js)到本地自行引入。

  ```vue
  <template>
    <md-editor no-iconfont />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  import '/assets/iconfont.js';
  </script>
  ```

## 🎍 插槽

### 🪶 defToolbars

自定义工具栏插槽，通过使用内置的`NormalToolbar`普通点击触发事件组件，`DropdownToolbar`下拉点击触发事件组件和`ModalToolbar`弹窗触发事件组件进行扩展。将`defToolbars`插槽中的组件下标穿插在`toolbars`实现展示（这并不规范）。

- Setup 模板

  ```vue
  <template>
    <md-editor :toolbars="toolbars">
      <template #defToolbars>
        <normal-toolbar title="mark" @onClick="handler">
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

  const toolbars = ['bold', '-', 0, '=', 'github'];

  const handler = () => {
    console.log('NormalToolbar clicked!');
  };
  </script>
  ```

- Jsx 模板

  ```jsx
  import { defineComponent } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  export default defineComponent({
    setup() {
      return () => (
        <MdEditor
          toolbars={['bold', '-', 0, '=', 'github']}
          defToolbars={
            <>
              <MdEditor.NormalToolbar
                trigger={
                  <svg class={`md-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-strike-through" />
                  </svg>
                }
              ></MdEditor.NormalToolbar>
            </>
          }
        />
      );
    }
  });
  ```

![普通扩展工具栏](https://imzbf.github.io/md-editor-v3/imgs/normal-toolbar.gif)

![下拉扩展工具栏](https://imzbf.github.io/md-editor-v3/imgs/dropdown-toolbar.gif)

扩展组件属性参考**内置组件**，使用示例参见[文档分支](https://github.com/imzbf/md-editor-v3/tree/docs/src/components)，提供**标记**、**表情**和**弹窗预览**扩展组件。

### 🦿 defFooters

自定义扩展页脚

- Setup 模板

  ```vue
  <template>
    <md-editor :footers="footers">
      <template #defFooters>
        <span>￥_￥</span>
        <span>^_^</span>
      </template>
    </md-editor>
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  // 将插槽中的组件下标放到对应的位置即可显示
  const footers = ['markdownTotal', 0, '=', 1, 'scrollSwitch'];
  </script>
  ```

- Jsx 模板

  ```jsx
  import { defineComponent } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  export default defineComponent({
    setup() {
      return () => (
        <MdEditor
          footers={['markdownTotal', 0, '=', 1, 'scrollSwitch']}
          defFooters={
            <>
              <span>￥_￥</span>
              <span>^_^</span>
            </>
          }
        />
      );
    }
  });
  ```

![](https://imzbf.github.io/md-editor-v3/imgs/footer.png)

## 🪢 绑定事件

目前支持的内容如下：

### 📞 onChange

- **类型**：`(v: string) => void`

  内容变化事件（当前与`textarea`的`oninput`事件绑定，每输入一个单字即会触发）。

### 💾 onSave

- **类型**：`(v: string) => void`

  保存事件，快捷键与保存按钮均会触发。

### 📸 onUploadImg

- **类型**：`(files: Array<File>, callback: (urls: Array<string>) => void) => void`

  上传图片事件，弹窗会等待上传结果，务必将上传后的 urls 作为 callback 入参回传。

  ```js
  const onUploadImg = async (files, callback) => {
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

    callback(res.map((item) => item.data.url));
  };
  ```

  ```html
  <md-ditor-v3 @onUploadImg="onUploadImg" />
  ```

### 🚁 onHtmlChanged

- **类型**：`(h: string) => void`

  html 变化回调事件，用于获取预览 html 代码。

### 🗒 onGetCatalog

- **类型**：`(list: HeadList[]) => void`

  动态获取`markdown`目录。

### 💀 onError

- **类型**：`(err: { name: string; message: string;}) => void`

  捕获执行错误事件，目前支持`Cropper`、`fullScreen`、`prettier`实例未加载完成操作错误。

  ```js
  const onError = (err) => {
    alert(err.message);
  };
  ```

  ```html
  <md-ditor-v3 @onError="onError" />
  ```

## 💴 配置编辑器

使用`MdEditor.config(option: ConfigOption)`方法，可以对内部的`renderer`定制。

- markedRenderer: `(renderer: Renderer) => Renderer`，设置链接在新窗口打开 🌰：

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedRenderer(renderer) {
      renderer.link = (href, title, text) => {
        return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
      };

      return renderer;
    }
  });
  ```

  > 参考：https://marked.js.org/using_pro#renderer

- markedExtensions: `Array<marked.TokenizerExtension & marked.RendererExtension>`

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedExtensions: [your extension]
  });
  ```

  > 参考：https://marked.js.org/using_pro#extensions

  [文档示例源码](https://github.com/imzbf/md-editor-v3/blob/docs/src/main.ts)

- markedOptions: `marked.MarkedOptions`，设置输入空白行不渲染出来 🌰：

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    markedOptions: { breaks: false }
  });
  ```

  > 参考：https://marked.js.org/using_advanced#options

- editorConfig: 编辑器常规配置，语言、`mermaid`默认模板、渲染延迟：

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
    editorConfig: {
      // 语言
      languageUserDefined: {
        'zh-CN': {
          toolbarTips: {
            bold: '加粗',
            underline: '下划线',
            italic: '斜体',
            strikeThrough: '删除线',
            title: '标题',
            sub: '下标',
            sup: '上标',
            quote: '引用',
            unorderedList: '无序列表',
            orderedList: '有序列表',
            codeRow: '行内代码',
            code: '块级代码',
            link: '链接',
            image: '图片',
            table: '表格',
            mermaid: 'mermaid图',
            katex: 'katex公式',
            revoke: '后退',
            next: '前进',
            save: '保存',
            prettier: '美化',
            pageFullscreen: '浏览器全屏',
            fullscreen: '屏幕全屏',
            preview: '预览',
            htmlPreview: 'html代码预览',
            catalog: '目录',
            github: '源码地址'
          },
          titleItem: {
            h1: '一级标题',
            h2: '二级标题',
            h3: '三级标题',
            h4: '四级标题',
            h5: '五级标题',
            h6: '六级标题'
          },
          imgTitleItem: {
            link: '添加链接',
            upload: '上传图片',
            clip2upload: '裁剪上传'
          },
          linkModalTips: {
            title: '添加',
            descLable: '链接描述：',
            descLablePlaceHolder: '请输入描述...',
            urlLable: '链接地址：',
            UrlLablePlaceHolder: '请输入链接...',
            buttonOK: '确定'
          },
          clipModalTips: {
            title: '裁剪图片上传',
            buttonUpload: '上传'
          },
          copyCode: {
            text: '复制代码',
            successTips: '已复制！',
            failTips: '复制失败！'
          },
          mermaid: {
            flow: '流程图',
            sequence: '时序图',
            gantt: '甘特图',
            class: '类图',
            state: '状态图',
            pie: '饼图',
            relationship: '关系图',
            journey: '旅程图'
          },
          katex: {
            inline: '行内公式',
            block: '块级公式'
          },
          footer: {
            markdownTotal: '字数',
            scrollAuto: '同步滚动'
          }
        },
        // mermaid模板
        mermaidTemplate: {
          // 流程图
          flow: `flow tempalte`,
          // 时序图
          sequence: `sequence template`,
          // 甘特图
          gantt: `gantt template`,
          // 类图
          class: `class template`,
          // 状态图
          state: `state template`,
          // 饼图
          pie: `pie template`,
          // 关系图
          relationship: `relationship template`,
          // 旅程图
          journey: `journey template`
        },
        // 输入渲染延迟（ms）
        renderDelay: 0
      }
    }
  });
  ```

- editorExtensions: 类型如下，用于配置编辑器内部的扩展

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
      // >= 2.2.0
      prettierInstance?: any;
      parserMarkdownInstance?: any;

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
| CTRL + L | 链接 | `[链接](https://imzbf.cc)` |
| CTRL + Z | 撤回 | 触发编辑器内内容撤回，与系统无关 |
| CTRL + SHIFT + S | 删除线 | `~删除线~` |
| CTRL + SHIFT + U | 无序列表 | `- 无序列表` |
| CTRL + SHIFT + C | 块级代码 | 多行代码块 |
| CTRL + SHIFT + I | 图片链接 | `![图片](https://imzbf.cc)` |
| CTRL + SHIFT + Z | 前进一步 | 触发编辑器内内容前进，与系统无关 |
| CTRL + SHIFT + F | 美化内容 |  |
| CTRL + ALT + C | 行内代码 | 行内代码块 |
| CTRL + SHIFT + ALT + T | 表格 | `\|表格\|` |

## 🪤 内置组件

扩展组件作为编辑器组件的属性值来使用，例如：`MdEditor.DropdownToolbar`。

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
      <normal-toolbar title="mark" @onClick="callback">
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

[获取使用源码](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/MarkExtension/index.vue)

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

[获取使用源码](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/EmojiExtension/index.vue)

### 🦉 ModalToolbar

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
        :is-fullscreen="data.modalFullscreen"
        show-adjust
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

[获取使用源码](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/ReadExtension/index.vue)

### 🐻 MdCatalog

`Editor.MdCatalog`

- **props**

  - `editorId`: `string`，必须，对应编辑器的`editorId`，在内部注册目录变化监听事件。
  - `class`: `string`，非必须，目录组件最外层类名。
  - `markedHeadingId`: `MarkedHeadingId`，非必须，特殊化编辑器标题的算法，与编辑器相同。
  - `scrollElement`: `string | HTMLElement`，非必须，为字符时应是一个元素选择器。仅预览模式中，整页滚动时，设置为`document.documentElement`。
  - `theme`: `'light' | 'dark'`，非必须，当需要切换主题时提供，同编辑器的`theme`。

- **events**

  - `onClick`: `(e: MouseEvent, t: TocItem) => void`，非必须，导航点击事件。

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
