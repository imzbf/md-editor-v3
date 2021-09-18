## 1. 基本使用示例

目前一直在迭代开发，所以尽量安装最新版本。发布日志请前往：[releases](https://github.com/imzbf/md-editor-v3/releases)

```shell
yarn add md-editor-v3
```

目前 vue3 已经能很友好的使用 jsx 来开发了，对于一些爱好者（比如作者本身），需要考虑兼容一下。

两种方式开发上区别在于**vue 模板**能很好的支持`vue`特性，比如指令，内置的双向绑定等；而**jsx 语法**更偏向于`react`的理念，开发环境来讲 jsx 如果在支持 ts 的环境下，会更友好一些。

### 1.1 传统开发模式

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

### 1.2 模块化的 vue 模板

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

### 1.3 模块化的 jsx

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

### 1.4 图片上传

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
