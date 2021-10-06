## 1. Basic usage

It has been developing iteratively，so update the latest version please. Publish logs: [releases](https://github.com/imzbf/md-editor-v3/releases)

```shell
yarn add md-editor-v3
```

Now, we can develop vue3 project by `jsx` friendly. Editor is compatible for some enthusiasts(like me).

### 1.1 Traditional development

Use production version in html directly：

```js
<!DOCTYPE html>
<html lang="en">
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
  components: { MdEditor },
  data() {
    return { text: '' };
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

After `v1.4.3`, Themes are divided into editor themes(api: `theme`) and article preview themes(api: `previewTheme`).

#### 2.1.1 Editor Theme

Support `light` and `dark` default.

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

#### 2.1.2 Preview Theme

There are three themes `default`, `github` and `vuepress`. It is useful When you want to show your article directly. Modify `previewTheme`.

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
  components: { MdEditor },
  data() {
    return {
      text: '',
      theme: 'vuepress'
    };
  }
});
</script>
```

### 2.2 Extension component

Extensions highlight, prettier, cropper, screenfull are import from `cdn`. When your project is running offline, replace urls of these extensions. Some Extensions support be injected in development environment.

Demo of `screenfull`

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

#### 2.2.2 Intranet link

Get these extension files from [https://www.jsdelivr.com/](https://www.jsdelivr.com/).

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

### 2.3 Upload pictures

By default, you can select multiple pictures. You can paste and upload screenshots and copy web page pictures.

> v1.2.0：Only one image can be selected for image clipping ~，but `onUploadImg` function will receive an array also.

> Tips: When pasting pictures, if they are GIF graphs, it does not work! Please upload it by file system.

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

### 2.4 Extension language

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
      // name
      language: 'my-lang',
      // text
      languageUserDefined: {
        'my-lang': {
          toolbarTips: {
            bold: '----',
            underline: 'underline',
            italic: 'italic',
            strikeThrough: 'strikeThrough',
            title: 'title',
            sub: 'subscript',
            sup: 'superscript',
            quote: 'quote',
            unorderedList: 'unordered list',
            orderedList: 'ordered list',
            codeRow: 'inline code',
            code: 'block-level code',
            link: 'link',
            image: 'image',
            table: 'table',
            revoke: 'revoke',
            next: 'undo revoke',
            save: 'save',
            prettier: 'prettier',
            pageFullscreen: 'fullscreen in page',
            fullscreen: 'fullscreen',
            preview: 'preview',
            htmlPreview: 'html preview',
            github: 'source code'
          },
          titleItem: {
            h1: 'Lv1 Heading',
            h2: 'Lv2 Heading',
            h3: 'Lv3 Heading',
            h4: 'Lv4 Heading',
            h5: 'Lv5 Heading',
            h6: 'Lv6 Heading'
          },
          linkModalTips: {
            title: 'Add ',
            descLable: 'Desc:',
            descLablePlaceHolder: 'Enter a description...',
            urlLable: 'Link:',
            UrlLablePlaceHolder: 'Enter a link...',
            buttonOK: 'OK',
            buttonUpload: 'Upload',
            buttonUploadClip: 'Crop2upload'
          },
          clipModalTips: {
            title: 'Crop Image',
            buttonUpload: 'Upload'
          },
          copyCode: {
            text: 'Copy',
            tips: 'Copied!'
          }
        }
      }
    };
  }
});
</script>

```

### 2.5 Get catalogue

Get data list by `onGetCatalog`:

```js
<template>
  <md-editor v-model="text" @onGetCatalog="onGetCatalog" />
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
    onGetCatalog(list: any) {
      this.catalogList = list;
    }
  }
});
</script>

```

If there is a component like [`Anchor`](https://2x.antdv.com/components/anchor-cn) in your project, continue.

Create `Catalog` component, source code: [Catalog](https://github.com/imzbf/md-editor-v3/tree/dev-docs/src/components/Catalog)

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

## End
