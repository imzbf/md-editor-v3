## 😁 Basic usage

It has been developing iteratively，so update the latest version please. Publish logs: [releases](https://github.com/imzbf/md-editor-v3/releases)

### 🤖 Install

```shell
yarn add md-editor-v3
```

Now, we can develop vue3 project by `jsx` friendly. Editor is compatible for some enthusiasts(like me).

### 🤓 Traditional development

Use production version in html directly:

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

### 🥱 Vue template

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

### 🤗 Jsx module

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

## 🥂 Api usage

Usages of some APIs.

### 🍦 Change Theme

After `v1.4.3`, Themes are divided into editor themes(api: `theme`) and article preview themes(api: `previewTheme`).

#### 🍧 Editor Theme

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

#### 🍡 Preview Theme

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

### 🛠 Extension component

Extensions highlight, prettier, cropper, screenfull are import from `cdn`. When your project is running offline, replace urls of these extensions. Some Extensions support be injected in development environment.

Demo of `screenfull`

#### ⚰️ Inject directly

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

#### 📡 Intranet link

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

### 📷 Upload pictures

By default, you can select multiple pictures. You can paste and upload screenshots and copy web page pictures.

> v1.2.0: Only one image can be selected for image clipping ~，but `onUploadImg` function will receive an array also.

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

### 🏳️‍🌈 Extension language

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
            catalog: 'catalog',
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
          imgTitleItem: {
            link: 'Add Img Link',
            upload: 'Upload Img',
            clip2upload: 'Clip Upload'
          },
          linkModalTips: {
            title: 'Add ',
            descLable: 'Desc:',
            descLablePlaceHolder: 'Enter a description...',
            urlLable: 'Link:',
            UrlLablePlaceHolder: 'Enter a link...',
            buttonOK: 'OK',
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

### 🛬 Modify head structure

Use `markedHeading` to modify head structure, after `v1.7.2`, if there are some content about `markdown`(like: link..）, editor will display them first.

> Document of `markedHeading` is the same as `heading` in [marked.js](https://marked.js.org/using_pro#renderer).

- Demand: open link in new window.

- Demo:

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
      // You can not use markedHeadingId method directly, but It's really simple.
      // If the ID you defined is not equal to `raw`(your title), be sure to tell the editor the algorithm for generating the ID by `marketheadingid`.
      // If not, the Catalog will not go right.
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

### 📄 Get catalogue

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

#### 🚥 Generate catalogs

We need create `Catalog` component and `CatalogLink` component to finish this function.

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
      tocItems.push(item);
    } else {
      let lastItem = tocItems[tocItems.length - 1];

      if (item.level > lastItem.level) {
        for (let i = lastItem.level + 1; i <= 6; i++) {
          const { children } = lastItem;
          if (!children) {
            lastItem.children = [item];
            break;
          }

          lastItem = children[children.length - 1];
          if (item.level <= lastItem.level) {
            children.push(item);
            break;
          }
        }
      } else {
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

- `Vue Template`: [Source code](https://github.com/imzbf/md-editor-v3/tree/dev-docs/src/components/Catalog/index.vue)
- `Tsx`: [Source code](https://github.com/imzbf/md-editor-v3/tree/dev-docs/src/components/Catalog)

### 🪚 Define toolbar

> after v1.6.0, You can sort the toolbar as you like, split tools by `'-'`, the left and right toolbars are divided by `'='`！

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

## 🔒 xss 防范

after`1.3.0`, please use `sanitize` to sanitize `html`. eg: `sanitize-html`

```js
// install
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

## 🧻 Edit this page

[demo-en-US](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/demo-en-US.md)
