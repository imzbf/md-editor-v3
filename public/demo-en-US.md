## 😁 Basic Usage

It has been developing iteratively，so update the latest version please. Publish logs: [releases](https://github.com/imzbf/md-editor-v3/releases)

Now, we can develop vue3 project by `jsx` friendly. Editor is compatible for some enthusiasts(like me).

### 🤓 CDN

Use production version in html directly:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Global Load</title>
    <link
      href="https://unpkg.com/md-editor-v3@${EDITOR_VERSION}/lib/style.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="md-editor-v3">
      <md-editor-v3 v-model="text" />
    </div>
    <script src="https://unpkg.com/vue@3.2.31/dist/vue.global.prod.js"></script>
    <script src="https://unpkg.com/md-editor-v3@${EDITOR_VERSION}/lib/md-editor-v3.umd.js"></script>
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

### 🤖 Npm Install

```shell
yarn add md-editor-v3
```

#### 🥱 Setup Template

```vue
<template>
  <md-editor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
</script>
```

#### 🤗 Jsx Template

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

## 🥂 Api Usage

Usages of some APIs.

### 🍦 Change Theme

Themes are divided into editor theme(`theme`), article preview theme(`previewTheme`) and code theme(`codeTheme`).

#### 🍧 Editor Theme

Support `light` and `dark` default.

```vue
<template>
  <md-editor v-model="state.text" :theme="state.theme" />
</template>

<script setup>
import { reactive } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const state = reactive({
  text: '',
  theme: 'dark'
});
</script>
```

#### 🍡 Preview Theme

There are 6 kinds of themes: `default`, `github`, `vuepress`, `mk-cute`, `smart-blue` and `cyanosis`. It is useful When you want to show your article directly. Modify `previewTheme`.

- Usage

  ```vue
  <template>
    <md-editor v-model="state.text" :preview-theme="state.theme" />
  </template>

  <script setup>
  import { defineComponent } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const state = reactive({
    text: '',
    theme: 'cyanosis'
  });
  </script>
  ```

- Custom

  1. Write `css` under the `xxx-theme` claa. `xxx` is the name of your theme, for more examples, refer to [markdown-theme](https://github.com/imzbf/markdown-theme).

  _xxx.css_

  ```css
  .xxx-theme code {
    color: red;
  }
  ```

  2. Import

  ```js
  import 'xxx.css';
  ```

  3. Set `previewTheme`

  ```html
  <md-editor preview-theme="xxx" />
  ```

#### 🎄 Code Theme

There are 8 kinds of themes: `atom`, `a11y`, `github`, `gradient`, `kimbie`, `paraiso`,`qtcreator` and `stackoverflow`, they are all from [highlight.js](https://highlightjs.org/).

- Usage

  ```vue
  <template>
    <md-editor v-model="state.text" :code-theme="state.theme" />
  </template>

  <script setup>
  import { reactive } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const state = reactive({
    text: '',
    theme: 'atom'
  });
  </script>
  ```

- Custom

  1. Find or Write your favorite theme, then config them:

  ```js
  import MdEditor from 'md-editor-v3';

  MdEditor.config({
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

  If some keys in object `css` are same as Editor's, Editor's whill be replaced.

  2. Set `codeTheme`

  ```html
  <md-editor code-theme="xxxxx" />
  ```

### 🛠 Config Extensions

Extensions highlight, prettier, cropper, screenfull are import from `cdn`. When your project is running offline, replace urls of these extensions. Some Extensions support be injected in development environment.

Example for `screenfull`:

#### ⚰️ Inject Directly

```vue
<template>
  <md-editor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import screenfull from 'screenfull';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

MdEditor.config({
  editorExtensions: {
    screenfull: {
      instance: screenfull
    }
  }
});

const text = ref('');
</script>
```

#### 📡 Intranet Link

Get files from [unpkg.com](https://unpkg.com).

```vue
<template>
  <md-editor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

MdEditor.config({
  editorExtensions: {
    screenfull: {
      js: 'https://localhost:8090/screenfull@6.0.1/index.js'
    }
  }
});

const text = ref('');
</script>
```

### 📷 Upload Pictures

By default, you can select multiple pictures. You can paste and upload screenshots and copy web page pictures.

> Tips: When pasting pictures, if they are GIF graphs, it does not work! Please upload it by file system.

```vue
<template>
  <md-editor v-model="text" @on-upload-img="onUploadImg" />
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
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

### 🏳️‍🌈 Extension Language

```vue
<template>
  <md-editor v-model="state.text" :language="state.language" />
</template>

<script setup>
import { reactive } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

MdEditor.config({
  editorConfig: {
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
          mermaid: 'mermaid',
          katex: 'formula',
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
          buttonOK: 'OK'
        },
        clipModalTips: {
          title: 'Crop Image',
          buttonUpload: 'Upload'
        },
        copyCode: {
          text: 'Copy',
          successTips: 'Copied!',
          failTips: 'Copy Error!'
        },
        mermaid: {
          flow: 'flow',
          sequence: 'sequence',
          gantt: 'gantt',
          class: 'class',
          state: 'state',
          pie: 'pie',
          relationship: 'relationship',
          journey: 'journey'
        },
        katex: {
          inline: 'inline',
          block: 'block'
        },
        footer: {
          markdownTotal: 'Word Count',
          scrollAuto: 'Scroll Auto'
        }
      }
    }
  }
});

const state = reactive({
  text: '',
  language: 'my-lang'
});
</script>
```

### 🛬 Modify Heading Structure

- Demand: open link in new window.

```vue
<template>
  <md-editor v-model="text" :marked-heading-id="getId" />
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('');

const getId = (_text, _level, index) => {
  return `heading-${index}`;
};

MdEditor.config({
  markedRenderer(renderer) {
    renderer.heading = (text, level, raw) => {
      // You can not use markedHeadingId method directly, but It's really simple.
      // If the ID you defined is not equal to `raw`(your title), be sure to tell the editor the algorithm for generating the ID by `marketheadingid`.
      // If not, the Catalog will not go right.
      const id = getId(text, level, index);

      if (text !== raw) {
        return `<h${level} id="${id}">${text}</h${level}>`;
      } else {
        return `<h${level} id="${id}"><a href="#${id}">${raw}</a></h${level}>`;
      }
    };

    return renderer;
  }
});
</script>
```

### 📄 Get Catalogue

- Get

  ```vue
  <template>
    <md-editor v-model="text" @on-get-catalog="onGetCatalog" />
  </template>

  <script setup>
  import { reactive } from 'vue';
  import MdEditor from 'md-editor-v3';
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

- Display

  Use `MdCatalog`

  ```vue
  <template>
    <md-editor
      v-model="state.text"
      :editor-id="state.id"
      :theme="state.theme"
      preview-only
    />
    <md-atalog
      :editor-id="state.id"
      :scroll-element="scrollElement"
      :theme="state.theme"
    />
  </template>

  <script setup>
  import { reactive } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const state = reactive({
    theme: 'dark',
    text: '',
    id: 'my-editor'
  });

  const scrollElement = document.documentElement;
  </script>
  ```

### 🪚 Define Toolbar

> after v1.6.0, You can sort the toolbar as you like, split tools by `'-'`, the left and right toolbars are divided by `'='`！

```vue
<template>
  <md-editor v-model="text" :toolbars="toolbars" />
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const toolbars = ['italic', 'underline', '-', 'bold', '=', 'github'];
</script>
```

### 💪 Customize Toolbar

There are examples of `mark` and `emoji`.

To get complete code, refer to [docs](https://github.com/imzbf/md-editor-v3/blob/docs/src/pages/Preview/index.vue).

![mark and Emoji extension](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

> Get more emojis, go to [https://getemoji.com/](https://getemoji.com/).

### 🧙‍♂️ Change Styles

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
  --md-scrollbar-thumb-avtive-color: if(@isDark, #3a3a3a, #00000061);
}

.md {
  .css-vars(false);
}

.md-dark {
  .css-vars(true);
}
```

Change background color in dark mode:

```css
.md-dark {
  --md-bk-color: #333 !important;
}
```

### 🙍🏻‍♂️ Import All Library

```vue
<template>
  <md-editor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import screenfull from 'screenfull';

import katex from 'katex';
import 'katex/dist/katex.min.css';

import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

import mermaid from 'mermaid';

import highlight from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';

import prettier from 'prettier';
import parserMarkdown from 'prettier/parser-markdown';

Editor.config({
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

> Tips: While import highlight styles by yourself, editor will not be able to change code styles.

## 🔒 XSS

after`1.8.0`, please use `sanitize` to sanitize `html`. eg: `sanitize-html`

```shell
yarn add sanitize-html
```

```vue
<template>
  <md-editor :sanitize="sanitize" />
</template>

<script setup>
import sanitizeHtml from 'sanitize-html';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const sanitize = (html) => {
  return sanitizeHtml(html);
};
</script>
```

## 🧻 Edit this page

[demo-en-US](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/demo-en-US.md)
