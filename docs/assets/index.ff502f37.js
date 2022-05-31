import{g as h,j as u,k as i,l as v,i as f,e as g,b as t,h as s,u as e,a as d,o as x}from"./index.97088d19.js";var l=`## \u{1F601} Basic Usage

It has been developing iteratively\uFF0Cso update the latest version please. Publish logs: [releases](https://github.com/imzbf/md-editor-v3/releases)

Now, we can develop vue3 project by \`jsx\` friendly. Editor is compatible for some enthusiasts(like me).

### \u{1F913} CDN

Use production version in html directly:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Global Load</title>
    <link
      href="https://cdn.jsdelivr.net/npm/md-editor-v3@\${EDITOR_VERSION}/lib/style.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="md-editor-v3">
      <md-editor-v3 v-model="text" />
    </div>
    <script src="https://unpkg.com/vue@3.2.31/dist/vue.global.prod.js"><\/script>
    <script src="https://cdn.jsdelivr.net/npm/md-editor-v3@\${EDITOR_VERSION}/lib/md-editor-v3.umd.js"><\/script>
    <script>
      const App = {
        data() {
          return {
            text: 'Hello Editor!!'
          };
        }
      };
      Vue.createApp(App).use(MdEditorV3).mount('#md-editor-v3');
    <\/script>
  </body>
</html>
\`\`\`

### \u{1F916} Npm Install

\`\`\`shell
yarn add md-editor-v3
\`\`\`

#### \u{1F971} Setup Template

\`\`\`vue
<template>
  <md-editor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
<\/script>
\`\`\`

#### \u{1F917} Jsx Template

\`\`\`js
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
\`\`\`

## \u{1F942} Api Usage

Usages of some APIs.

### \u{1F366} Change Theme

Themes are divided into editor theme(\`theme\`), article preview theme(\`previewTheme\`) and code theme(\`codeTheme\`).

#### \u{1F367} Editor Theme

Support \`light\` and \`dark\` default.

\`\`\`vue
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
<\/script>
\`\`\`

#### \u{1F361} Preview Theme

There are 6 kinds of themes: \`default\`, \`github\`, \`vuepress\`, \`mk-cute\`, \`smart-blue\` and \`cyanosis\`. It is useful When you want to show your article directly. Modify \`previewTheme\`.

- Usage

  \`\`\`vue
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
  <\/script>
  \`\`\`

- Custom

  1. Write \`css\` under the \`xxx-theme\` claa. \`xxx\` is the name of your theme, for more examples, refer to [markdown-theme](https://github.com/imzbf/markdown-theme).

  _xxx.css_

  \`\`\`css
  .xxx-theme code {
    color: red;
  }
  \`\`\`

  2. Import

  \`\`\`js
  import 'xxx.css';
  \`\`\`

  3. Set \`previewTheme\`

  \`\`\`html
  <md-editor preview-theme="xxx" />
  \`\`\`

#### \u{1F384} Code Theme

There are 8 kinds of themes: \`atom\`, \`a11y\`, \`github\`, \`gradient\`, \`kimbie\`, \`paraiso\`,\`qtcreator\` and \`stackoverflow\`, they are all from [highlight.js](https://highlightjs.org/).

- Usage

  \`\`\`vue
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
  <\/script>
  \`\`\`

- Custom

  1. Find or Write your favorite theme, then config them:

  \`\`\`js
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
  \`\`\`

  If some keys in object \`css\` are same as Editor's, Editor's whill be replaced.

  2. Set \`codeTheme\`

  \`\`\`html
  <md-editor code-theme="xxxxx" />
  \`\`\`

### \u{1F6E0} Config Extensions

Extensions highlight, prettier, cropper, screenfull are import from \`cdn\`. When your project is running offline, replace urls of these extensions. Some Extensions support be injected in development environment.

Example for \`screenfull\`:

#### \u26B0\uFE0F Inject Directly

\`\`\`vue
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
<\/script>
\`\`\`

#### \u{1F4E1} Intranet Link

Get files from [unpkg.com](https://unpkg.com).

\`\`\`vue
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
<\/script>
\`\`\`

### \u{1F4F7} Upload Pictures

By default, you can select multiple pictures. You can paste and upload screenshots and copy web page pictures.

> Tips: When pasting pictures, if they are GIF graphs, it does not work! Please upload it by file system.

\`\`\`vue
<template>
  <md-editor v-model="text" @onUploadImg="onUploadImg" />
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
<\/script>
\`\`\`

### \u{1F3F3}\uFE0F\u200D\u{1F308} Extension Language

\`\`\`vue
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
        }
      }
    }
  }
});

const state = reactive({
  text: '',
  language: 'my-lang'
});
<\/script>
\`\`\`

### \u{1F6EC} Modify Heading Structure

- Demand: open link in new window.

\`\`\`vue
<template>
  <md-editor v-model="text" :marked-heading-id="getId" />
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('');

const getId = (text, level, raw) => {
  return \`\${level}-text\`;
};

MdEditor.config({
  markedRenderer(renderer) {
    renderer.heading = (text, level, raw) => {
      // You can not use markedHeadingId method directly, but It's really simple.
      // If the ID you defined is not equal to \`raw\`(your title), be sure to tell the editor the algorithm for generating the ID by \`marketheadingid\`.
      // If not, the Catalog will not go right.
      const id = getId(text, level, raw);

      if (/<a.*>.*<\\/a>/.test(text)) {
        return \`<h\${level} id="\${id}">\${text.replace(
          /(?<=\\<a.*)>(?=.*<\\/a>)/,
          ' target="_blank">'
        )}</h\${level}>\`;
      } else if (text !== raw) {
        return \`<h\${level} id="\${id}">\${text}</h\${level}>\`;
      } else {
        return \`<h\${level} id="\${id}"><a href="#\${id}">\${raw}</a></h\${level}>\`;
      }
    };

    return renderer;
  }
});
<\/script>
\`\`\`

### \u{1F4C4} Get Catalogue

- Get

  \`\`\`vue
  <template>
    <md-editor v-model="text" @onGetCatalog="onGetCatalog" />
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
  <\/script>
  \`\`\`

- Display

  Use \`MdCatalog\`

  \`\`\`vue
  <template>
    <md-editor
      v-model="state.text"
      :editorId="state.id"
      :theme="state.theme"
      preview-only
    />
    <md-atalog :editorId="state.id" :scrollElement="scrollElement" :theme="state.theme" />
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
  <\/script>
  \`\`\`

### \u{1FA9A} Define Toolbar

> after v1.6.0, You can sort the toolbar as you like, split tools by \`'-'\`, the left and right toolbars are divided by \`'='\`\uFF01

\`\`\`vue
<template>
  <md-editor v-model="text" :toolbars="toolbars" />
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const toolbars = ['italic', 'underline', '-', 'bold', '=', 'github'];
<\/script>
\`\`\`

### \u{1F4AA} Customize Toolbar

There are examples of \`mark\` and \`emoji\`.

To get complete code, refer to [docs](https://github.com/imzbf/md-editor-v3/blob/docs/src/pages/Preview/index.vue).

![mark and Emoji extension](/md-editor-v3/imgs/mark_emoji.gif)

> Get more emojis, go to [https://getemoji.com/](https://getemoji.com/).

### \u{1F9D9}\u200D\u2642\uFE0F Change Styles

\`\`\`less
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
\`\`\`

Change background color in dark mode:

\`\`\`css
.md-dark {
  --md-bk-color: #333 !important;
}
\`\`\`

## \u{1F512} XSS

after\`1.8.0\`, please use \`sanitize\` to sanitize \`html\`. eg: \`sanitize-html\`

\`\`\`shell
yarn add sanitize-html
\`\`\`

\`\`\`vue
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
<\/script>
\`\`\`

## \u{1F9FB} Edit this page

[demo-en-US](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/demo-en-US.md)
`,m=`## \u{1F601} \u57FA\u672C\u4F7F\u7528\u793A\u4F8B

\u76EE\u524D\u4E00\u76F4\u5728\u8FED\u4EE3\u5F00\u53D1\uFF0C\u6240\u4EE5\u5C3D\u91CF\u5B89\u88C5\u6700\u65B0\u7248\u672C\u3002\u53D1\u5E03\u65E5\u5FD7\u8BF7\u524D\u5F80\uFF1A[releases](https://github.com/imzbf/md-editor-v3/releases)

\u76EE\u524D vue3 \u5DF2\u7ECF\u80FD\u5F88\u53CB\u597D\u7684\u4F7F\u7528 jsx \u6765\u5F00\u53D1\u4E86\uFF0C\u5BF9\u4E8E\u4E00\u4E9B\u7231\u597D\u8005\uFF08\u6BD4\u5982\u4F5C\u8005\u672C\u8EAB\uFF09\uFF0C\u9700\u8981\u8003\u8651\u517C\u5BB9\u4E00\u4E0B\u3002

### \u{1F913} CDN \u94FE\u63A5

\u901A\u8FC7\u76F4\u63A5\u94FE\u63A5\u751F\u4EA7\u7248\u672C\u6765\u4F7F\u7528\uFF0C\u4E0B\u9762\u662F\u4E00\u4E2A\u5C0F\u4F8B\u5B50\uFF1A

\`\`\`html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>\u5168\u5C40\u5F15\u7528</title>
    <link
      href="https://unpkg.com/md-editor-v3@\${EDITOR_VERSION}/lib/style.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="md-editor-v3">
      <md-editor-v3 v-model="text" />
    </div>
    <script src="https://unpkg.com/vue@3.2.31/dist/vue.global.prod.js"><\/script>
    <script src="https://unpkg.com/md-editor-v3@\${EDITOR_VERSION}/lib/md-editor-v3.umd.js"><\/script>
    <script>
      const App = {
        data() {
          return {
            text: 'Hello Editor!!'
          };
        }
      };
      Vue.createApp(App).use(MdEditorV3).mount('#md-editor-v3');
    <\/script>
  </body>
</html>
\`\`\`

### \u{1F916} NPM \u5B89\u88C5

\`\`\`shell
yarn add md-editor-v3
\`\`\`

#### \u{1F971} Setup \u6A21\u677F

\`\`\`vue
<template>
  <md-editor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
<\/script>
\`\`\`

#### \u{1F917} Jsx \u6A21\u677F

\`\`\`js
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
\`\`\`

## \u{1F942} \u6269\u5C55\u529F\u80FD

\u8FD9\u91CC\u5305\u542B\u4E86\u4E00\u4E9B\u7F16\u8F91\u5668\`api\`\u7684\u4F7F\u7528\u793A\u8303

### \u{1F366} \u4E3B\u9898\u5207\u6362

\u4E3B\u9898\u5206\u4E3A\u4E86\u7F16\u8F91\u5668\u4E3B\u9898\uFF08\`theme\`\uFF0C\u79F0\u4E3A\u5168\u5C40\u4E3B\u9898\uFF09\u3001\u9884\u89C8\u5185\u5BB9\u4E3B\u9898\uFF08\`previewTheme\`\uFF09\u548C\u5757\u7EA7\u4EE3\u7801\u4E3B\u9898\uFF08\`codeTheme\`\uFF09\uFF0C\u4ED6\u4EEC\u90FD\u652F\u6301\u54CD\u5E94\u5F0F\u66F4\u65B0\uFF0C\u800C\u975E\u53EA\u80FD\u9884\u8BBE\u3002

#### \u{1F367} \u7F16\u8F91\u5668\u4E3B\u9898

\u652F\u6301\u9ED8\u8BA4\u548C\u6697\u591C\u6A21\u5F0F\u4E24\u79CD

\`\`\`vue
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
<\/script>
\`\`\`

#### \u{1F361} \u9884\u89C8\u4E3B\u9898

\u5185\u7F6E\u4E86\`default\`\u3001\`github\`\u3001\`vuepress\`\u3001\`mk-cute\`\u3001\`smart-blue\`\u3001\`cyanosis\`6 \u79CD\u4E3B\u9898\uFF0C\u5728\u4E00\u4E9B\u76F4\u63A5\u9884\u89C8\u6587\u6863\u5185\u5BB9\u65F6\u4F7F\u7528\u3002\u5E76\u4E14\u652F\u6301\u5728\u7EBF\u5207\u6362\uFF08\u4FEE\u6539\`previewTheme\`\u5373\u53EF\uFF09\u548C\u81EA\u884C\u6269\u5C55\u3002

- \u4F7F\u7528

  \`\`\`vue
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
  <\/script>
  \`\`\`

- \u81EA\u5B9A\u4E49

  1. \u5148\u4EE5\`xxx-theme\`\u4E3A\u7C7B\u540D\uFF0C\u5B9A\u4E49\u4F60\u7684\u4E3B\u9898\`css\`\uFF0Cxxx \u662F\u4E3B\u9898\u540D\u79F0\uFF0C\u5177\u4F53\u7684\u5185\u5BB9\u53C2\u8003[markdown-theme](https://github.com/imzbf/markdown-theme)

  _xxx.css_

  \`\`\`css
  .xxx-theme code {
    color: red;
  }
  \`\`\`

  2. \u5168\u5C40\u5F15\u5165

  \`\`\`js
  import 'xxx.css';
  \`\`\`

  3. \u8BBE\u7F6E\`previewTheme\`\u4E3A xxx

  \`\`\`html
  <md-editor preview-theme="xxx" />
  \`\`\`

#### \u{1F384} \u4EE3\u7801\u4E3B\u9898

\u5185\u7F6E\u4E86\`atom\`\u3001\`a11y\`\u3001\`github\`\u3001\`gradient\`\u3001\`kimbie\`\u3001\`paraiso\`\u3001\`qtcreator\`\u3001\`stackoverflow\`\u4EE3\u7801\u4E3B\u9898\uFF0C\u5747\u6765\u81F3[highlight.js](https://highlightjs.org/)

- \u4F7F\u7528

  \`\`\`vue
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
  <\/script>
  \`\`\`

- \u81EA\u5B9A\u4E49

  1. \u627E\u5230\u4F60\u559C\u6B22\u7684\u4EE3\u7801\u4E3B\u9898\uFF0C\u6700\u597D\u652F\u6301\u6697\u591C\u6A21\u5F0F

  \`\`\`js
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
  \`\`\`

  \u4F60\u53EF\u4EE5\u901A\u8FC7\u5C06\`css\`\u7684\`key\`\u8BBE\u7F6E\u4E3A\u5185\u7F6E\u540D\u79F0\u6765\u8986\u76D6\u5185\u7F6E\u7684\u94FE\u63A5\u3002

  2. \u8BBE\u7F6E\`codeTheme\`

  \`\`\`html
  <md-editor code-theme="xxxxx" />
  \`\`\`

### \u{1F6E0} \u6269\u5C55\u5E93\u66FF\u6362

highlight\u3001prettier\u3001cropper\u3001screenfull \u5747\u4F7F\u7528\u5916\u94FE\u5F15\u5165\uFF0C\u5728\u65E0\u5916\u7F51\u7684\u65F6\u5019\uFF0C\u90E8\u5206\u53EF\u5C06\u9879\u76EE\u4E2D\u5DF2\u5B89\u88C5\u7684\u4F9D\u8D56\u4F20\u5165\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528\u4E0B\u8F7D\u597D\u7684\u5F15\u7528\u3002

\`screenfull\` \u7684\u4F8B\u5B50\uFF1A

#### \u26B0\uFE0F \u5185\u7F6E\u5B9E\u4F8B

\`\`\`vue
<template>
  <md-editor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
// \u5F15\u7528screenfull
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
<\/script>
\`\`\`

#### \u{1F4E1} \u5185\u7F51\u94FE\u63A5

\u5BF9\u5E94\u7684 js \u6587\u4EF6\u53EF\u4EE5\u53BB[unpkg.com](https://unpkg.com)\uFF0C\u76F4\u63A5\u627E\u5230\u5BF9\u5E94\u7684\u6587\u4EF6\u4E0B\u8F7D\u5373\u53EF\u3002

\`\`\`vue
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
<\/script>
\`\`\`

### \u{1F4F7} \u56FE\u7247\u4E0A\u4F20

\u9ED8\u8BA4\u53EF\u4EE5\u9009\u62E9\u591A\u5F20\u56FE\u7247\uFF0C\u652F\u6301\u622A\u56FE\u7C98\u8D34\u677F\u4E0A\u4F20\u56FE\u7247\uFF0C\u652F\u6301\u590D\u5236\u7F51\u9875\u56FE\u7247\u7C98\u8D34\u4E0A\u4F20\u3002

> \u6CE8\u610F\uFF1A\u7C98\u8D34\u677F\u4E0A\u4F20\u65F6\uFF0C\u5982\u679C\u662F\u7F51\u9875\u4E0A\u7684 gif \u56FE\uFF0C\u65E0\u6CD5\u6B63\u786E\u4E0A\u4F20\u4E3A gif \u683C\u5F0F\uFF01\u8BF7\u4FDD\u5B58\u672C\u5730\u540E\u518D\u624B\u52A8\u4E0A\u4F20\u3002

\`\`\`vue
<template>
  <md-editor v-model="text" @onUploadImg="onUploadImg" />
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
<\/script>
\`\`\`

### \u{1F3F3}\uFE0F\u200D\u{1F308} \u8BED\u8A00\u6269\u5C55\u4E0E\u66FF\u6362

\`\`\`vue
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
          bold: '\u52A0\u7C97',
          underline: '\u4E0B\u5212\u7EBF',
          italic: '\u659C\u4F53',
          strikeThrough: '\u5220\u9664\u7EBF',
          title: '\u6807\u9898',
          sub: '\u4E0B\u6807',
          sup: '\u4E0A\u6807',
          quote: '\u5F15\u7528',
          unorderedList: '\u65E0\u5E8F\u5217\u8868',
          orderedList: '\u6709\u5E8F\u5217\u8868',
          codeRow: '\u884C\u5185\u4EE3\u7801',
          code: '\u5757\u7EA7\u4EE3\u7801',
          link: '\u94FE\u63A5',
          image: '\u56FE\u7247',
          table: '\u8868\u683C',
          mermaid: 'mermaid\u56FE',
          katex: '\u516C\u5F0F',
          revoke: '\u540E\u9000',
          next: '\u524D\u8FDB',
          save: '\u4FDD\u5B58',
          prettier: '\u7F8E\u5316',
          pageFullscreen: '\u6D4F\u89C8\u5668\u5168\u5C4F',
          fullscreen: '\u5C4F\u5E55\u5168\u5C4F',
          preview: '\u9884\u89C8',
          htmlPreview: 'html\u4EE3\u7801\u9884\u89C8',
          catalog: '\u76EE\u5F55',
          github: '\u6E90\u7801\u5730\u5740'
        },
        titleItem: {
          h1: '\u4E00\u7EA7\u6807\u9898',
          h2: '\u4E8C\u7EA7\u6807\u9898',
          h3: '\u4E09\u7EA7\u6807\u9898',
          h4: '\u56DB\u7EA7\u6807\u9898',
          h5: '\u4E94\u7EA7\u6807\u9898',
          h6: '\u516D\u7EA7\u6807\u9898'
        },
        imgTitleItem: {
          link: '\u6DFB\u52A0\u94FE\u63A5',
          upload: '\u4E0A\u4F20\u56FE\u7247',
          clip2upload: '\u88C1\u526A\u4E0A\u4F20'
        },
        linkModalTips: {
          title: '\u6DFB\u52A0',
          descLable: '\u94FE\u63A5\u63CF\u8FF0\uFF1A',
          descLablePlaceHolder: '\u8BF7\u8F93\u5165\u63CF\u8FF0...',
          urlLable: '\u94FE\u63A5\u5730\u5740\uFF1A',
          UrlLablePlaceHolder: '\u8BF7\u8F93\u5165\u94FE\u63A5...',
          buttonOK: '\u786E\u5B9A'
        },
        clipModalTips: {
          title: '\u88C1\u526A\u56FE\u7247\u4E0A\u4F20',
          buttonUpload: '\u4E0A\u4F20'
        },
        copyCode: {
          text: '\u590D\u5236\u4EE3\u7801',
          successTips: '\u5DF2\u590D\u5236\uFF01',
          failTips: '\u590D\u5236\u5931\u8D25\uFF01'
        },
        mermaid: {
          flow: '\u6D41\u7A0B\u56FE',
          sequence: '\u65F6\u5E8F\u56FE',
          gantt: '\u7518\u7279\u56FE',
          class: '\u7C7B\u56FE',
          state: '\u72B6\u6001\u56FE',
          pie: '\u997C\u56FE',
          relationship: '\u5173\u7CFB\u56FE',
          journey: '\u65C5\u7A0B\u56FE'
        },
        katex: {
          inline: '\u884C\u5185\u516C\u5F0F',
          block: '\u5757\u7EA7\u516C\u5F0F'
        }
      }
    }
  }
});

const state = reactive({
  text: '',
  // \u5B9A\u4E49\u8BED\u8A00\u540D\u79F0
  language: 'my-lang'
});
<\/script>
\`\`\`

### \u{1F6EC} \u81EA\u5B9A\u4E49\u76EE\u5F55\u7ED3\u6784

\u9700\u6C42\uFF1A\u5728\u6807\u9898\u4E2D\u5B58\u5728\u5916\u94FE\u65F6\uFF0C\u70B9\u51FB\u6253\u5F00\u65B0\u7A97\u53E3\u3002

\u5B9E\u73B0\uFF1A

\`\`\`vue
<template>
  <md-editor v-model="text" :marked-heading-id="getId" />
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('');

const getId = (text, level, raw) => {
  return \`\${level}-text\`;
};

MdEditor.config({
  markedRenderer(renderer) {
    renderer.heading = (text, level, raw) => {
      // \u4F60\u4E0D\u80FD\u76F4\u63A5\u8C03\u7528\u9ED8\u8BA4\u7684markedHeadingId\uFF0C\u4F46\u662F\u5B83\u5F88\u7B80\u5355
      // \u5982\u679C\u4F60\u7684id\u4E0Eraw\u4E0D\u76F8\u540C\uFF0C\u8BF7\u4E00\u5B9A\u8BB0\u5F97\u5C06\u4F60\u7684\u751F\u6210\u65B9\u6CD5\u901A\u8FC7markedHeadingId\u544A\u8BC9\u7F16\u8F91\u5668
      // \u5426\u5219\u7F16\u8F91\u5668\u9ED8\u8BA4\u7684\u76EE\u5F55\u5B9A\u4F4D\u529F\u80FD\u65E0\u6CD5\u6B63\u786E\u4F7F\u7528
      const id = getId(text, level, raw);

      if (/<a.*>.*<\\/a>/.test(text)) {
        return \`<h\${level} id="\${id}">\${text.replace(
          /(?<=\\<a.*)>(?=.*<\\/a>)/,
          ' target="_blank">'
        )}</h\${level}>\`;
      } else if (text !== raw) {
        return \`<h\${level} id="\${id}">\${text}</h\${level}>\`;
      } else {
        return \`<h\${level} id="\${id}"><a href="#\${id}">\${raw}</a></h\${level}>\`;
      }
    };

    return renderer;
  }
});
<\/script>
\`\`\`

### \u{1F4C4} \u76EE\u5F55\u83B7\u53D6\u4E0E\u5C55\u793A

- \u83B7\u53D6

  \`\`\`vue
  <template>
    <md-editor v-model="text" @onGetCatalog="onGetCatalog" />
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
  <\/script>
  \`\`\`

- \u5C55\u793A

  \u4F7F\u7528\u5185\u7F6E\`MdCatalog\`\u7EC4\u4EF6

  \`\`\`vue
  <template>
    <md-editor
      v-model="state.text"
      :editorId="state.id"
      :theme="state.theme"
      preview-only
    />
    <md-atalog :editorId="state.id" :scrollElement="scrollElement" :theme="state.theme" />
  </template>

  <script setup>
  import { reactive } from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const state = reactive({
    theme: 'dark',
    text: '\u6807\u9898',
    id: 'my-editor'
  });

  const scrollElement = document.documentElement;
  <\/script>
  \`\`\`

### \u{1FA9A} \u8C03\u6574\u5DE5\u5177\u680F

\u4ECE\`v1.6.0\`\u5F00\u59CB\uFF0C\u652F\u6301\u8C03\u6574\u5DE5\u5177\u680F\u5185\u5BB9\u987A\u5E8F\u548C\u5206\u5272\u7B26\u4E86\u3002

\`\`\`vue
<template>
  <md-editor v-model="text" :toolbars="toolbars" />
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const toolbars = ['italic', 'underline', '-', 'bold', '=', 'github'];
<\/script>
\`\`\`

### \u{1F4AA} \u81EA\u5B9A\u4E49\u5DE5\u5177\u680F

\u8FD9\u91CC\u5305\u542B\u4E86\`mark\`\u6807\u8BB0\u6269\u5C55\u666E\u901A\u5DE5\u5177\u680F\u548C\`emoji\`\u6269\u5C55\u4E0B\u62C9\u5DE5\u5177\u680F\u7684\u7C7B\u578B

\u53EF\u8FD0\u884C\u6E90\u7801\u53C2\u8003\u672C\u6587\u6863[docs](https://github.com/imzbf/md-editor-v3/blob/docs/src/pages/Preview/index.vue)\u3002

![\u6807\u8BB0\u53CAEmoji\u9884\u89C8](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

> \u66F4\u591A emoji\uFF0C[https://getemoji.com/](https://getemoji.com/)\u3002

### \u{1F9D9}\u200D\u2642\uFE0F \u8C03\u6574\u7F16\u8F91\u5668\u6837\u5F0F

2.x \u4F7F\u7528 css \u53D8\u91CF\u5B9A\u4E49\u4E86\u5927\u90E8\u5206\u5185\u5BB9\uFF1A

\`\`\`less
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
\`\`\`

\u53EA\u9700\u8981\u8C03\u6574\u5BF9\u5E94\u7684 css \u53D8\u91CF\uFF0C\u6BD4\u5982\u8C03\u6574\u6697\u591C\u6A21\u5F0F\u4E0B\u7684\u80CC\u666F\uFF1A

\`\`\`css
.md-dark {
  --md-bk-color: #333 !important;
}
\`\`\`

## \u{1F512} XSS

\u5728\`1.8.0\`\u4E4B\u540E\uFF0C\u901A\u8FC7\`sanitize\`\u4E8B\u4EF6\uFF0C\u81EA\u884C\u5904\u7406\u4E0D\u5B89\u5168\u7684 html \u5185\u5BB9\u3002\u4F8B\u5982\uFF1A\u4F7F\u7528\`sanitize-html\`\u5904\u7406

\`\`\`shell
yarn add sanitize-html
\`\`\`

\`\`\`vue
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
<\/script>
\`\`\`

\u66F4\u8BE6\u7EC6\u7684\u5B9E\u73B0\u53EF\u4EE5\u53C2\u8003\u672C\u6587\u6863\u7684\u6E90\u7801\uFF01

## \u{1F9FB} \u7F16\u8F91\u6B64\u9875\u9762

[demo-zh-CN](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/demo-zh-CN.md)
`;const b={class:"container"},k={class:"doc"},y={class:"content"},E={class:"catalog"},w={class:"affix"},C={setup(M){const n=h(),r=u(i(n.state.lang==="en-US"?l:m)),o=()=>{r.value=i(n.state.lang==="en-US"?l:m)},a=document.documentElement;return v(o),f(()=>n.state.lang,o),(j,T)=>{const c=d("md-editor-v3"),p=d("md-catalog");return x(),g("div",b,[t("div",k,[t("div",y,[s(c,{"editor-id":"demo-preview",theme:e(n).state.theme,language:e(n).state.lang,"model-value":r.value,"preview-theme":e(n).state.previewTheme,"preview-only":"","show-code-row-number":"","code-theme":e(n).state.codeTheme},null,8,["theme","language","model-value","preview-theme","code-theme"])]),t("div",E,[t("div",w,[s(p,{"editor-id":"demo-preview",theme:e(n).state.theme,"scroll-element":e(a)},null,8,["theme","scroll-element"])])])])])}}};export{C as default};
