## 1. Basic usage

It has been developing iteratively，so update the latest version please. Publish logs: [releases](https://github.com/imzbf/md-editor-v3/releases)

```shell
yarn add md-editor-v3
```

Now, we can develop vue3 project by `jsx` friendly. Editor is compatible for some enthusiasts(like me).

### 1.1 Traditional development

Use production version in html directly，here is a demo：

```js
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>Traditional development</title>
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

### 1.2 Vue template

```js
<template>
  <md-editor v-model="text" />
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
      text: ''
    };
  }
});
</script>
```

### 1.3 Jsx module

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

## 2. Api usage

Usages of some APIs.

### 2.1 Change Theme

After `v1.4.3`, 主题分为了编辑器主题（`theme`，称为全局主题）和预览内容主题（`previewTheme`），他们都支持响应式更新，而非只能预设。

#### 2.1.1 Editor Theme

Default support `light` and `dark`.

```js
<template>
  <md-editor v-model="text" :theme="theme"/>
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
      text: '',
      theme: 'dark'
    };
  }
});
</script>
```

#### 2.1.2 Preview Theme

There are three themes `default`, `github` and `vuepress`. It is useful When you want to show your article directly. Modify `previewTheme`

Rules:

- When `previewTheme` is `default` or `vuepress`, change `theme` api, the style of code will not change;
- When `github`, the style of code will vary in `github-light` and `github-dark`.

```js
<template>
  <md-editor v-model="text" :preview-theme="theme"/>
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
      text: '',
      theme: 'github'
    };
  }
});
</script>
```

### 2.2 Extension

Extensions highlight, prettier, cropper, screenfull are import from `cdn`. When your project is running offline, replace urls of these extensions. Some Extensions support be injected in development environment.

Demo for `screenfull`

#### 2.2.1 Inject directly

```js
<template>
  <md-editor v-model="text" :screenfull="screenfull"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import screenfull
import screenfull from 'screenfull';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: {
    MdEditor
  },
  data() {
    return {
      text: '',
      screenfull
    };
  }
});
</script>
```

#### 2.2.2 Intranet link

对应的 js 文件可以去[https://www.jsdelivr.com/](https://www.jsdelivr.com/)，直接找到对应的文件下载即可。

These extensions

```js
<template>
  <md-editor v-model="text" :screenfullJs="screenfull"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// 引用screenfull
import screenfull from 'screenfull';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: {
    MdEditor
  },
  data() {
    return {
      text: '',
      screenfullJs: 'http://127.0.0.1:90/libs/screenfull.js'
    };
  }
});
</script>
```

### 2.3 图片上传

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

### 2.4 语言扩展与替换

```js
<template>
  <md-editor v-model="text" :screenfullJs="screenfull"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// 引用screenfull
import screenfull from 'screenfull';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: {
    MdEditor
  },
  data() {
    return {
      text: '',
      // 定义语言名称
      language: 'my-lang',
      // 定义语言具体内容
      languageUserDefined: [{
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
            linkModalTips: {
              title: '添加',
              descLable: '链接描述：',
              descLablePlaceHolder: '请输入描述...',
              urlLable: '链接地址：',
              UrlLablePlaceHolder: '请输入链接...',
              buttonOK: '确定',
              buttonUpload: '上传'
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
      ]
    }
  }
});
</script>
```

### 2.5 目录获取与展示

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
  components: {
    MdEditor
  },
  data() {
    return {
      text: '',
      catalogList: []
    };
  },
  methods: {
    onGetCatalog(list) {
      // 获取
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
      // 获取
      this.catalogList = list
    }
  }
});
```

更详细的实现可以参考本文档的源码！

## 更多

若有觉得可用的功能或发现编辑器的 Bug，或者需要更多的使用 demo，请通过以下方式反馈给我。

1. 邮箱：zbfcqtl@163.com
2. 博客留言：[imbf.cc](https://imbf.cc/message)
3. issue 管理：[github issues](https://github.com/imzbf/md-editor-v3/issues)
