## 😁 基本使用示例

目前一直在迭代开发，所以尽量安装最新版本。发布日志请前往：[releases](https://github.com/imzbf/md-editor-v3/releases)

### 🤖 安装

```shell
yarn add md-editor-v3
```

目前 vue3 已经能很友好的使用 jsx 来开发了，对于一些爱好者（比如作者本身），需要考虑兼容一下。

两种方式开发上区别在于**vue 模板**能很好的支持`vue`特性，比如指令，内置的双向绑定等；而**jsx 语法**更偏向于`react`的理念，开发环境来讲 jsx 如果在支持 ts 的环境下，会更友好一些。

### 🤓 传统开发模式

通过直接链接生产版本来使用，下面是一个小例子：

```js
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>传统开发模式中使用</title>
    <link href="https://cdn.jsdelivr.net/npm/md-editor-v3@${EDITOR_VERSION}/lib/style.css" rel="stylesheet" />
  </head>
  <body>
    <div id="md-editor-v3">
      <md-editor-v3 v-model="text" />
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@3.1.5/dist/vue.global.prod.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/md-editor-v3@${EDITOR_VERSION}/lib/md-editor-v3.umd.js"></script>
    <script>
      const App = {
        data() {
          return {
            text: 'Hello Editor!!'
          };
        }
      };
      Vue.createApp(App).use(MdEditorV3).mount('#md-editor-v3');
    </script>
  </body>
</html>
```

### 🥱 模块化的 vue 模板

```js
<template>
  <md-editor v-model="text" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: { MdEditor },
  data() {
    return {
      text: ''
    };
  }
});
</script>
```

### 🤗 模块化的 jsx

```js
import { defineComponent, ref } from 'vue';
import MdEditor from 'md-editor-v3';
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

## 🥂 扩展功能

这里包含了一些编辑器`api`的使用示范

### 🍦 主题切换

在`v1.4.3`版本后，主题分为了编辑器主题（`theme`，称为全局主题）和预览内容主题（`previewTheme`），他们都支持响应式更新，而非只能预设。

#### 🍧 编辑器主题

支持默认和暗夜模式两种

```js
<template>
  <md-editor v-model="text" :theme="theme"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: { MdEditor },
  data() {
    return {
      text: '',
      theme: 'dark'
    };
  }
});
</script>
```

#### 🍡 预览主题

内置了`default`、`github`、`vuepress`三种主题，在一些直接预览文档内容时使用。并且支持在线切换（修改`previewTheme`即可）。

样式规则：

- `default`、`vuepress`主题下，切换编辑器全局主题`theme`时，代码样式不会跟随变更；
- `github`主题下，切换编辑器全局主题`theme`时，代码样式会动态的从`github-light`变为`github-dark`。

```js
<template>
  <md-editor v-model="text" :preview-theme="theme"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: { MdEditor },
  data() {
    return {
      text: '',
      theme: 'github'
    };
  }
});
</script>
```

### 🛠 扩展库替换

highlight、prettier、cropper、screenfull 均使用外链引入，在无外网的时候，部分可将项目中已安装的依赖传入，也可以使用下载好的引用。

演示替换`screenfull`

#### ⚰️ 已安装依赖

```js
<template>
  <md-editor v-model="text" :screenfull="screenfull"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// 引用screenfull
import screenfull from 'screenfull';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: { MdEditor },
  data() {
    return {
      text: '',
      screenfull
    };
  }
});
</script>
```

#### 📡 内网链接

对应的 js 文件可以去[https://www.jsdelivr.com/](https://www.jsdelivr.com/)，直接找到对应的文件下载即可。

```js
<template>
  <md-editor v-model="text" :screenfullJs="screenfull"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: { MdEditor },
  data() {
    return {
      text: '',
      screenfullJs: 'http://127.0.0.1:90/libs/screenfull.js'
    };
  }
});
</script>
```

### 📷 图片上传

默认可以选择多张图片，支持截图粘贴板上传图片，支持复制网页图片粘贴上传。

> v1.2.0：图片裁剪上传只支持选择一张图片~，但回调入仍是一个文件数组

> 注意：粘贴板上传时，如果是网页上的 gif 图，无法正确上传为 gif 格式！请保存本地后再手动上传。

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

### 🏳️‍🌈 语言扩展与替换

```js
<template>
  <md-editor
    v-model="text"
    :language="language"
    :languageUserDefined="languageUserDefined"
  />
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: { MdEditor },
  data() {
    return {
      text: '',
      // 定义语言名称
      language: 'my-lang',
      // 定义语言具体内容
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
            codeRow: '行内代码',
            code: '块级代码',
            link: '链接',
            image: '图片',
            table: '表格',
            mermaid: 'mermaid图',
            katex: '公式',
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
            text: '复制代码';
            tips: '已复制';
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
          }
        }
      }
    }
  }
});
</script>
```

### 🛬 自定义目录结构

编辑器提供了`markedHeading`，用来自定义标题的结构，在`v1.7.2`版本之后，标题中如果包含了`markdown`内容（比如：链接等），将会优先展示这些内容。

> `markedHeading`的入参请参考[marked.js](https://marked.js.org/using_pro#renderer)中的`heading`。

需求：在标题中存在外链时，点击打开新窗口。

实现：

```js
<template>
  <md-editor v-model="text" @markedHeading="markedHeading" />
</template>

<script>
import { defineComponent } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: { MdEditor },
  data() {
    return {
      text: ''
    };
  },
  methods: {
    markedHeading(text, level, raw) {
      // 你不能直接调用默认的markedHeadingId，但是它很简单
      // 如果你的id与raw不相同，请一定记得将你的生成方法通过markedHeadingId告诉编辑器
      // 否则编辑器默认的目录定位功能无法正确使用
      const id = raw;

      if (/<a.*>.*<\/a>/.test(text)) {
        return `<h${level} id="${id}">${text.replace(
          /(?<=\<a.*)>(?=.*<\/a>)/,
          ' target="_blank">'
        )}</h${level}>`;
      } else if (text !== raw) {
        return `<h${level} id="${id}">${text}</h${level}>`;
      } else {
        return `<h${level} id="${id}"><a href="#${id}">${raw}</a></h${level}>`;
      }
    }
  }
});
</script>
```

### 📄 目录获取与展示

先通过`onGetCatalog`方法获取到渲染成功后的标题列表：

```js
<template>
  <md-editor v-model="text" @onGetCatalog="onGetCatalog"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: { MdEditor },
  data() {
    return {
      text: '',
      catalogList: []
    };
  },
  methods: {
    onGetCatalog(list) {
      this.catalogList = list
    }
  }
});
</script>
```

若项目中使用的 ui 库有锚点类似的组件，请继续看下去（案例使用 ant-design-vue 组件库）：

#### 🚥 生成目录导航

我们需要创建`Catalog`组件和`CatalogLink`组件来展示我们的目录（本案例中，约定了子目录最大高度为`300px`）

**Catalog.vue**

```js
<template>
  <Anchor :affix="false" :showInkInFixed="false">
    <CatalogLink v-for="item of catalogs" :key="item.text" :tocItem="item" />
  </Anchor>
</template>

<script setup lang="ts">
import { Anchor } from 'ant-design-vue';
import { computed, PropType, defineProps } from 'vue';
import CatalogLink from './CatalogLink.vue';
import './style.less';

export interface TocItem {
  text: string;
  level: number;
  children?: Array<TocItem>;
}

const props = defineProps({
  heads: {
    type: Array as PropType<Array<any>>
  }
});

const catalogs = computed(() => {
  const tocItems: TocItem[] = [];

  props.heads?.forEach(({ text, level }) => {
    const item = { level, text };

    if (tocItems.length === 0) {
      // 第一个 item 直接 push
      tocItems.push(item);
    } else {
      let lastItem = tocItems[tocItems.length - 1]; // 最后一个 item

      if (item.level > lastItem.level) {
        // item 是 lastItem 的 children
        for (let i = lastItem.level + 1; i <= 6; i++) {
          const { children } = lastItem;
          if (!children) {
            // 如果 children 不存在
            lastItem.children = [item];
            break;
          }

          lastItem = children[children.length - 1]; // 重置 lastItem 为 children 的最后一个 item

          if (item.level <= lastItem.level) {
            // item level 小于或等于 lastItem level 都视为与 children 同级
            children.push(item);
            break;
          }
        }
      } else {
        // 置于最顶级
        tocItems.push(item);
      }
    }
  });
  return tocItems;
});
</script>
```

**CatalogLink.vue**

```js
<template>
  <Link :href="`#${tocItem.text}`" :title="tocItem.text">
    <div v-if="tocItem.children" class="catalog-container">
      <CatalogLink
        v-for="item of tocItem.children"
        :key="`${item.level}-${item.text}`"
        :tocItem="item"
      />
    </div>
  </Link>
</template>

<script setup lang="ts">
import { Anchor } from 'ant-design-vue';
import { defineProps, PropType } from 'vue';

const { Link } = Anchor;
import { TocItem } from './';

const { tocItem } = defineProps({
  tocItem: {
    type: Object as PropType<TocItem>,
    default: () => ({})
  }
});
</script>
```

**style.css**

```css
.catalog-container {
  max-height: 300px;
  overflow: auto;
}
```

- `vue`模板源码：[Catalog 源码](https://github.com/imzbf/md-editor-v3/tree/dev-docs/src/components/Catalog/index.vue)，你完全可以在此文档项目调试该组件！
- `tsx`版本源码地址：[Catalog 源码](https://github.com/imzbf/md-editor-v3/tree/dev-docs/src/components/Catalog)

### 🪚 调整工具栏

从`v1.6.0`开始，支持调整工具栏内容顺序和分割符了。

```js
<template>
  <md-editor v-model="text" :toolbars="toolbars" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: {
    MdEditor
  },
  data() {
    return {
      toolbars: ['italic', 'underline', '-', 'bold', '=', 'github'],
    };
  }
});
</script>
```

### 💪 自定义工具栏

这里包含了`mark`标记扩展普通工具栏和`emoji`扩展下拉工具栏的类型

```vue
<template>
  <div class="project-preview">
    <div class="container">
      <Editor
        editorId="md-prev"
        v-model="data.text"
        :toolbars="[
          'bold',
          'underline',
          'italic',
          'strikeThrough',
          '-',
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
          0,
          1,
          '-',
          'revoke',
          'next',
          'save',
          '=',
          'prettier',
          'pageFullscreen',
          'fullscreen',
          'preview',
          'htmlPreview',
          'catalog',
          'github'
        ]"
        :extensions="[MarkExtension]"
      >
        <template #defToolbars>
          <Editor.NormalToolbar title="标记" @click="markHandler">
            <template #trigger>
              <svg class="md-icon" aria-hidden="true">
                <use xlink:href="#icon-mark"></use>
              </svg>
            </template>
          </Editor.NormalToolbar>
          <Editor.DropdownToolbar
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
          </Editor.DropdownToolbar>
        </template>
      </Editor>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Editor from 'md-editor-v3';
import './index.less';

import { emojis } from './data';
// 参考下方的marked扩展内容
import MarkExtension from '../../utils/marked-mark';

const data = reactive({
  text: mdText,
  emojiVisible: false
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

  setTimeout(() => {
    textarea.setSelectionRange(endPoint, markStr.length + endPoint);
    textarea.focus();
  }, 0);
};

const emojiHandler = (emoji: string) => {
  // 获取输入框
  const textarea = document.querySelector('#md-prev-textarea') as HTMLTextAreaElement;
  // 获取选中的内容
  const selection = window.getSelection()?.toString();
  // 获取鼠标位置
  const endPoint = textarea.selectionStart;

  // 根据鼠标位置分割旧文本
  // 前半部分
  const prefixStr = textarea.value.substring(0, endPoint);
  // 后半部分
  const suffixStr = textarea.value.substring(endPoint + (selection?.length || 0));

  data.text = `${prefixStr}${emoji}${suffixStr}`;

  setTimeout(() => {
    textarea.setSelectionRange(endPoint, endPoint + 1);
    textarea.focus();
  }, 0);
};

const emojiVisibleChanged = (visible) => {
  data.emojiVisible = visible;
};
</script>
```

**data.ts**

```js
export const emojis = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '😂',
  '🤣',
  '🥲',
  '🤔',
  '😊',
  '😇',
  '🙂',
  '🙃',
  '😉',
  '😌',
  '😍',
  '🥰',
  '😘',
  '😗',
  '😙',
  '😚',
  '😋',
  '😛',
  '😝',
  '😜',
  '🤪',
  '🤨',
  '🧐',
  '🤓',
  '😎',
  '🥸',
  '🤩',
  '🥳',
  '😏',
  '😒',
  '😞',
  '😔',
  '😟',
  '😕',
  '🙁',
  '☹️',
  '😣',
  '😖',
  '😫',
  '😩',
  '🥺',
  '😢',
  '😭',
  '😤',
  '😠',
  '😡',
  '🤬',
  '🤯',
  '😳'
];
```

> 更多 emoji，[https://getemoji.com/](https://getemoji.com/)。

可运行源码参考本文档[template.vue](https://github.com/imzbf/md-editor-v3/blob/dev-docs/src/pages/Preview/template.vue)，同目录有相应的`jsx`语法内容。

![标记及Emoji预览](/md-editor-v3/imgs/mark_emoji.gif)

### 🪡 自定义 marked 扩展

简单的扩展`mark`标记，将`@标记@`转换为`<mark>标记</mark>`

```js
export default {
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
```

## 🔒 xss 防范

在`1.8.0`之后，通过`sanitize`事件，自行处理不安全的 html 内容。例如：使用`sanitize-html`处理

```js
// 安装
yarn add sanitize-html

<template>
  <MdEditor :sanitize="sanitize" />;
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
// 使用
import sanitizeHtml from 'sanitize-html';


export default defineComponent({
  components: {
    MdEditor
  },
  methods: {
    sanitize(html) { return sanitizeHtml(html) }
  }
});
</script>
```

更详细的实现可以参考本文档的源码！

## 🧻 编辑此页面

[demo-zh-CN](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/demo-zh-CN.md)
