## 😁 基本使用示例

目前一直在迭代开发，所以尽量安装最新版本。发布日志请前往：[releases](https://github.com/imzbf/md-editor-v3/releases)

目前 vue3 已经能很友好的使用 jsx 来开发了，对于一些爱好者（比如作者本身），需要考虑兼容一下。

### 🤓 CDN 链接

通过直接链接生产版本来使用，下面是一个小例子：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>全局引用</title>
    <link
      href="https://unpkg.com/md-editor-v3@${EDITOR_VERSION}/lib/style.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="md-editor-v3">
      <md-editor-v3 v-model="text" />
    </div>
    <script src="https://unpkg.com/vue@3.2.47/dist/vue.global.prod.js"></script>
    <script src="https://unpkg.com/md-editor-v3@${EDITOR_VERSION}/lib/umd/index.js"></script>
    <script>
      const App = {
        data() {
          return {
            text: 'Hello Editor!!'
          };
        }
      };
      Vue.createApp(App).use(MdEditorV3.MdEditor).mount('#md-editor-v3');
    </script>
  </body>
</html>
```

### 🤖 NPM 安装

```shell [install:yarn]
yarn add md-editor-v3
```

```shell [install:npm]
npm install md-editor-v3
```

当使用服务端渲染时，请务必设置`editorId`为固定值。

#### 🥱 Setup 模板

```vue
<template>
  <MdEditor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
</script>
```

#### 🤗 Jsx 模板

```js
import { defineComponent, ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  name: 'MdEditor',
  setup() {
    const text = ref('');
    return () => (
      <MdEditor modelValue={text.value} onChange={(v: string) => (text.value = v)} />
    );
  }
});
```

#### 📖 仅预览

```vue
<template>
  <MdPreview :editorId="id" :modelValue="text" />
  <MdCatalog :editorId="id" :scrollElement="scrollElement" />
</template>

<script setup>
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';

const id = 'preview-only';
const text = ref('# Hello Editor');
const scrollElement = document.documentElement;
</script>
```

当使用服务端渲染时，`scrollElement`应该是字符类型，例：`body`、`#id`、`.class`。

## 🥂 扩展功能

这里包含了一些编辑器`api`的使用示范

### 🥶 自定义快捷键

内置的快捷键配置的源码：[commands.ts](https://github.com/imzbf/md-editor-v3/blob/develop/MdEditor/layouts/Content/codemirror/commands.ts)，它们作为扩展项被添加到了`codemirror`。

想要替换、删除快捷键的基本原理是找到对应的扩展，然后遍历这个快捷键配置的数组，找到并处理它。

事实上，`config`中`codeMirrorExtensions`的第二入参`extensions`是一个数组，它的第一项就是快捷键扩展，第三入参就是默认的快捷键配置。

#### 💅 修改快捷键

将`Ctrl-b`修改为`Ctrl-m`

```js
import { config } from 'md-editor-v3';
import { keymap } from '@codemirror/view';

config({
  // [keymap, minimalSetup, markdown, EditorView.lineWrapping, EditorView.updateListener, EditorView.domEventHandlers, oneDark??oneLight]
  codeMirrorExtensions(theme, extensions, mdEditorCommands) {
    const newExtensions = [...extensions];
    // 1. 先把默认的快捷键扩展移除
    newExtensions.shift();

    // 2. 参考快捷键配置的源码，找到CtrlB的配置项在mdEditorCommands中的位置
    const CtrlB = mdEditorCommands[0];

    // 3. 配置codemirror快捷键的文档
    // https://codemirror.net/docs/ref/#commands
    const CtrlM = {
      // 这里我们需要CtrlB默认触发执行的run方法，如果是新增快捷键等，就需要自行处理触发逻辑
      ...CtrlB,
      key: 'Ctrl-m',
      mac: 'Cmd-m'
    };

    // 4. 把修改后的快捷键放到待构建扩展的数组中
    const newMdEditorCommands = [
      CtrlM,
      ...mdEditorCommands.filter((i) => i.key !== 'Ctrl-b')
    ];

    newExtensions.push(keymap.of(newMdEditorCommands));

    return newExtensions;
  }
});
```

#### ✂️ 删除快捷键

禁用所有快捷键

```js
import { config } from 'md-editor-v3';

config({
  // [keymap, minimalSetup, markdown, EditorView.lineWrapping, EditorView.updateListener, EditorView.domEventHandlers, oneDark??oneLight]
  codeMirrorExtensions(theme, extensions) {
    const newExtensions = [...extensions];
    // 1. 把默认的快捷键扩展移除
    newExtensions.shift();

    // 2. 返回扩展列表即可
    return newExtensions;
  }
});
```

#### 💉 新增快捷键

如果涉及到向编辑框插入内容，这是需要借助组件实例上绑定的`insert`方法，参考[手动向文本框插入内容](/md-editor-v3/zh-CN/docs#%F0%9F%92%89%20insert)。

如果不是在编辑器所在的组件中使用`config`，这是无法拿到编辑器组件实例，这时，你可能需要借助`event-bus`。

示例实现`Ctrl+m`向编辑框插入标记模块(`==mark==`)

`index.ts`

```js
import { config } from 'md-editor-v3';
import { keymap, KeyBinding } from '@codemirror/view';
// 假设你使用了EventBus
import bus from '@/utils/event-bus';

config({
  // [keymap, minimalSetup, markdown, EditorView.lineWrapping, EditorView.updateListener, EditorView.domEventHandlers, oneDark??oneLight]
  codeMirrorExtensions(theme, extensions, mdEditorCommands) {
    const newExtensions = [...extensions];
    // 1. 先把默认的快捷键扩展移除
    newExtensions.shift();

    // 2. 创建一个新的快捷键配置，参考https://codemirror.net/docs/ref/#commands
    const CtrlM: KeyBinding = {
      key: 'Ctrl-m',
      mac: 'Cmd-m',
      run: () => {
        bus.emit('insertMarkBlock');
        return true;
      }
    };

    // 4. 把新的快捷键添加到数组中
    const newMdEditorCommands = [...mdEditorCommands, CtrlM];

    newExtensions.push(keymap.of(newMdEditorCommands));

    return newExtensions;
  }
});
```

接下来在编辑器所在组件监听`insertMarkBlock`这个事件

`index.vue`

```vue
<template>
  <MdEditor ref="mdEditorRef" v-model="text" />
</template>

<script setup lang="ts">
import { MdEditor } from 'md-editor-v3';
import type { ExposeParam } from 'md-editor-v3';
import { ref, onMounted } from 'vue';
// 假设你使用了EventBus
import bus from '@/utils/event-bus';

const text = ref<string>('## md-editor-v3\n\n');

const mdEditorRef = ref<ExposeParam>();

onMounted(() => {
  bus.on('insertMarkBlock', () => {
    mdEditorRef.value?.insert((selectedText) => {
      return {
        targetValue: `==${selectedText}==`,
        select: true,
        deviationStart: 2,
        deviationEnd: -2
      };
    });
  });
});
</script>
```

附：`EventBus`最简单实现

```ts
/* eslint-disable @typescript-eslint/ban-types */
class EventBus {
  private events: Map<string, Function[]>;

  constructor() {
    this.events = new Map();
  }

  on(eventName: string, fn: Function) {
    if (!eventName) {
      console.error('无效的事件名称');
      return false;
    }

    if (!(fn instanceof Function)) {
      console.error('无效的回调方法');
      return false;
    }

    const fns = this.events.get(eventName) || [];
    fns.push(fn);
    this.events.set(eventName, fns);
  }

  emit(eventName: string, ...args: any[]) {
    this.events.get(eventName)?.forEach((fn) => {
      fn(args);
    });
  }
}

export default new EventBus();
```

### 🍦 主题切换

主题分为了编辑器主题（`theme`，称为全局主题）、预览内容主题（`previewTheme`）和块级代码主题（`codeTheme`），他们都支持响应式更新，而非只能预设。

#### 🍧 编辑器主题

支持默认和暗夜模式两种

```vue
<template>
  <MdEditor v-model="state.text" :theme="state.theme" />
</template>

<script setup>
import { reactive } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const state = reactive({
  text: '',
  theme: 'dark'
});
</script>
```

#### 🍡 预览主题

内置了`default`、`github`、`vuepress`、`mk-cute`、`smart-blue`、`cyanosis`6 种主题，在一些直接预览文档内容时使用。并且支持在线切换（修改`previewTheme`即可）和自行扩展。

- 使用

  ```vue
  <template>
    <MdEditor v-model="state.text" :previewTheme="state.theme" />
  </template>

  <script setup>
  import { reactive } from 'vue';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const state = reactive({
    text: '',
    theme: 'cyanosis'
  });
  </script>
  ```

- 自定义

  1. 先以`xxx-theme`为类名，定义你的主题`css`，xxx 是主题名称，具体的内容参考[markdown-theme](https://github.com/imzbf/markdown-theme)

  _xxx.css_

  ```css
  .xxx-theme code {
    color: red;
  }
  ```

  2. 全局引入

  ```js
  import 'xxx.css';
  ```

  3. 设置`previewTheme`为 xxx

  ```vue
  <template>
    <MdEditor previewTheme="xxx" />
  </template>
  ```

#### 🎄 代码主题

内置了`atom`、`a11y`、`github`、`gradient`、`kimbie`、`paraiso`、`qtcreator`、`stackoverflow`代码主题，均来至[highlight.js](https://highlightjs.org/)

- 使用

  ```vue
  <template>
    <MdEditor v-model="state.text" :codeTheme="state.theme" />
  </template>

  <script setup>
  import { reactive } from 'vue';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const state = reactive({
    text: '',
    theme: 'atom'
  });
  </script>
  ```

- 自定义

  1. 找到你喜欢的代码主题，最好支持暗夜模式

  ```js
  import { config } from 'md-editor-v3';

  config({
    editorExtensions: {
      highlight: {
        css: {
          xxxxx: {
            light: 'https://unpkg.com/highlight.js@11.2.0/styles/xxxxx-light.css',
            dark: 'https://unpkg.com/highlight.js@11.2.0/styles/xxxxx-dark.css'
          },
          yyyyy: {
            light: 'https://unpkg.com/highlight.js@11.2.0/styles/xxxxx-light.css',
            dark: 'https://unpkg.com/highlight.js@11.2.0/styles/xxxxx-dark.css'
          }
        }
      }
    }
  });
  ```

  你可以通过将`css`的`key`设置为内置名称来覆盖内置的链接。

  2. 设置`codeTheme`

  ```vue
  <template>
    <MdEditor codeTheme="xxxxx" />
  </template>
  ```

### 🛠 扩展库替换

highlight、prettier、cropper、screenfull 均使用外链引入，在无外网的时候，部分可将项目中已安装的依赖传入，也可以使用下载好的引用。

`screenfull` 的例子：

#### ⚰️ 内置实例

```vue
<template>
  <MdEditor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
// 引用screenfull
import screenfull from 'screenfull';
import { MdEditor, config } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

config({
  editorExtensions: {
    screenfull: {
      instance: screenfull
    }
  }
});

const text = ref('');
</script>
```

#### 📡 内网链接

对应的 js 文件可以去[unpkg.com](https://unpkg.com)，直接找到对应的文件下载即可。

```vue
<template>
  <MdEditor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor, config } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

config({
  editorExtensions: {
    screenfull: {
      js: 'https://localhost:8090/screenfull@5.2.0/index.js'
    }
  }
});

const text = ref('');
</script>
```

### 📷 图片上传

默认可以选择多张图片，支持截图粘贴板上传图片，支持复制网页图片粘贴上传。

> 注意：粘贴板上传时，如果是网页上的 gif 图，无法正确上传为 gif 格式！请保存本地后再手动上传。

```vue
<template>
  <MdEditor v-model="text" @onUploadImg="onUploadImg" />
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('# Hello Editor');

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
</script>
```

### 🏳️‍🌈 语言扩展与替换

```vue
<template>
  <MdEditor v-model="state.text" :language="state.language" />
</template>

<script setup>
import { reactive } from 'vue';
import { MdEditor, config } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

config({
  editorConfig: {
    languageUserDefined: {
      'my-lang': {
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
          task: '任务列表',
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
          linkTitle: '添加链接',
          imageTitle: '添加图片',
          descLabel: '链接描述：',
          descLabelPlaceHolder: '请输入描述...',
          urlLabel: '链接地址：',
          urlLabelPlaceHolder: '请输入链接...',
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
      }
    }
  }
});

const state = reactive({
  text: '',
  // 定义语言名称
  language: 'my-lang'
});
</script>
```

你也可以使用现成的扩展语言：[md-editor-extension](https://github.com/imzbf/md-editor-extension)。使用及贡献方式见扩展库文档~

### 📄 目录获取与展示

- 获取

  ```vue
  <template>
    <MdEditor v-model="text" @onGetCatalog="onGetCatalog" />
  </template>

  <script setup>
  import { reactive } from 'vue';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const state = reactive({
    text: '',
    catalogList: []
  });

  const onGetCatalog = (list) => {
    state.catalogList = list;
  };
  </script>
  ```

- 展示

  使用内置`MdCatalog`组件

  ```vue
  <template>
    <MdPreview :modelValue="state.text" :editorId="state.id" :theme="state.theme" />
    <MdCatalog :editorId="state.id" :scrollElement="scrollElement" :theme="state.theme" />
  </template>

  <script setup>
  import { reactive } from 'vue';
  import { MdPreview, MdCatalog } from 'md-editor-v3';
  import 'md-editor-v3/lib/preview.css';

  const state = reactive({
    theme: 'dark',
    text: '标题',
    id: 'my-editor'
  });

  const scrollElement = document.documentElement;
  </script>
  ```

### 🪚 调整工具栏

从`v1.6.0`开始，支持调整工具栏内容顺序和分割符了。

```vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars" />
</template>

<script setup>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const toolbars = ['italic', 'underline', '-', 'bold', '=', 'github'];
</script>
```

### 💪 自定义工具栏

这里包含了`mark`标记扩展普通工具栏和`emoji`扩展下拉工具栏的类型

可运行源码参考本文档[docs](https://github.com/imzbf/md-editor-v3/blob/docs/src/pages/Preview/index.vue)。

![标记及Emoji预览](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

> 更多 emoji，[https://getemoji.com/](https://getemoji.com/)。

### 🧙‍♂️ 调整编辑器样式

2.x 使用 css 变量定义了大部分内容：

```less
.css-vars(@isDark) {
  --md-color: if(@isDark, #999, #222);
  --md-hover-color: if(@isDark, #bbb, #000);
  --md-bk-color: if(@isDark, #000, #fff);
  --md-bk-color-outstand: if(@isDark, #111, #f6f6f6);
  --md-bk-hover-color: if(@isDark, #1b1a1a, #f5f7fa);
  --md-border-color: if(@isDark, #2d2d2d, #e6e6e6);
  --md-border-hover-color: if(@isDark, #636262, #b9b9b9);
  --md-border-active-color: if(@isDark, #777, #999);
  --md-modal-mask: #00000073;
  --md-scrollbar-bg-color: if(@isDark, #0f0f0f, #e2e2e2);
  --md-scrollbar-thumb-color: if(@isDark, #2d2d2d, #0000004d);
  --md-scrollbar-thumb-hover-color: if(@isDark, #3a3a3a, #00000059);
  --md-scrollbar-thumb-active-color: if(@isDark, #3a3a3a, #00000061);
}

.md-editor {
  .css-vars(false);
}

.md-editor-dark {
  .css-vars(true);
}
```

只需要调整对应的 css 变量，比如调整暗夜模式下的背景：

```css
.md-editor-dark {
  --md-bk-color: #333 !important;
}
```

### 🙍🏻‍♂️ 自行引入扩展库

这里给出一个完全不使用外部链接，全部自行引入的示例：

```vue
<template>
  <MdEditor v-model="text" noIconfont />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor, config } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import screenfull from 'screenfull';

import katex from 'katex';
import 'katex/dist/katex.min.css';

import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

import mermaid from 'mermaid';

import highlight from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// <3.0
import prettier from 'prettier';
import parserMarkdown from 'prettier/parser-markdown';
// >=3.0
import * as prettier from 'prettier';
import parserMarkdown from 'prettier/plugins/markdown';

// https://at.alicdn.com/t/c/font_2605852_u82y61ve02.js
import './assets/iconfont.js';

config({
  editorExtensions: {
    prettier: {
      prettierInstance: prettier,
      parserMarkdownInstance: parserMarkdown
    },
    highlight: {
      instance: highlight
    },
    screenfull: {
      instance: screenfull
    },
    katex: {
      instance: katex
    },
    cropper: {
      instance: Cropper
    },
    mermaid: {
      instance: mermaid
    }
  }
});

const text = ref('');
</script>
```

> 注意：highlight 的样式自行引入后，将不支持切换代码样式。

### 🔒 编译时防范 XSS

内置的`markdown-it-xss`已经在编译中处理了危险代码，目前默认支持展示`input`和`iframe`标签的部分属性：

```json
{
  // 支持任务列表
  "input": ["class", "disabled", "type", "checked"],
  // 主要支持youtobe、腾讯视频、哔哩哔哩等内嵌视频代码
  "iframe": [
    "class",
    "width",
    "height",
    "src",
    "title",
    "border",
    "frameborder",
    "framespacing",
    "allow",
    "allowfullscreen"
  ]
}
```

#### 🔓 移除 xss 扩展

```js
config({
  markdownItPlugins(plugins) {
    return plugins.filter((p) => p.type !== 'xss');
  }
});
```

#### 🔏 修改 xss 配置

我们添加一个允许图片加载失败的事件

```js
config({
  markdownItPlugins(plugins) {
    return plugins.map((p) => {
      if (p.type === 'xss') {
        return {
          ...p,
          options: {
            xss(xss) {
              return {
                whiteList: Object.assign({}, xss.getDefaultWhiteList(), {
                  // 如果你需要使用任务列表，请保留这项配置
                  input: ['class', 'disabled', 'type', 'checked'],
                  // 如果你需要使用嵌入视频代码，请保留这项配置
                  iframe: [
                    'class',
                    'width',
                    'height',
                    'src',
                    'title',
                    'border',
                    'frameborder',
                    'framespacing',
                    'allow',
                    'allowfullscreen'
                  ],
                  img: ['onerror']
                })
              };
            }
          }
        };
      }

      return p;
    });
  }
});
```

更新详细配置参考 [js-xss](https://github.com/leizongmin/js-xss/blob/master/README.zh.md)

### 🔒 编译后防范 XSS

通过`sanitize`属性，自行处理不安全的 html 内容。例如：使用`sanitize-html`处理

```shell
yarn add sanitize-html
```

```vue
<template>
  <MdEditor :sanitize="sanitize" />
</template>

<script setup>
import sanitizeHtml from 'sanitize-html';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const sanitize = (html) => {
  return sanitizeHtml(html);
};
</script>
```

更详细的实现可以参考本文档的源码！

## 🧻 编辑此页面

[demo-zh-CN](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/demo-zh-CN.md)
