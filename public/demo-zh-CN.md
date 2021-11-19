## 基本使用示例

目前一直在迭代开发，所以尽量安装最新版本。发布日志请前往：[releases](https://github.com/imzbf/md-editor-v3/releases)

```shell
yarn add md-editor-v3
```

目前 vue3 已经能很友好的使用 jsx 来开发了，对于一些爱好者（比如作者本身），需要考虑兼容一下。

两种方式开发上区别在于**vue 模板**能很好的支持`vue`特性，比如指令，内置的双向绑定等；而**jsx 语法**更偏向于`react`的理念，开发环境来讲 jsx 如果在支持 ts 的环境下，会更友好一些。

### 传统开发模式

通过直接链接生产版本来使用，下面是一个小 demo：

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

### 模块化的 vue 模板

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

### 模块化的 jsx

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

## 扩展功能

这里包含了一些编辑器`api`的使用示范

### 主题切换

在`v1.4.3`版本后，主题分为了编辑器主题（`theme`，称为全局主题）和预览内容主题（`previewTheme`），他们都支持响应式更新，而非只能预设。

#### 编辑器主题

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

#### 预览主题

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

### 扩展库替换

highlight、prettier、cropper、screenfull 均使用外链引入，在无外网的时候，部分可将项目中已安装的依赖传入，也可以使用下载好的引用。

演示替换`screenfull`

#### 已安装依赖

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

#### 内网链接

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

### 图片上传

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

### 语言扩展与替换

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
          }
        }
      }
    }
  }
});
</script>
```

### 目录获取与展示

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

创建组件`Catalog`，源码地址：[Catalog 源码](https://github.com/imzbf/md-editor-v3/tree/dev-docs/src/components/Catalog)

```js
<template>
  <div>
    <md-editor v-model="text" @onGetCatalog="onGetCatalog"/>
    <catalog :heads="catalogList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import Catalog from '@/Catalog';

export default defineComponent({
  components: {
    MdEditor,
    Catalog
  },
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
```

### 调整工具栏

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
```

更详细的实现可以参考本文档的源码！

## 结束
