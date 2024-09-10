import{d,a9 as m,a as c,al as o,w as p,aa as u,ah as g,ad as f,c as r,am as i,an as s}from"./index-zPnkjGZv.js";import{_ as v}from"./index.vue_vue_type_script_setup_true_lang-sp39OdAX.js";import{_ as h}from"./index.vue_vue_type_style_index_0_lang-BMA8w3VR.js";import"./index-P_E2Dcuk.js";import"./index3-Cnng9Fu2.js";const l=`> Use it online: [Go](https://codesandbox.io/s/epic-bird-2znqo).

## 🔖 MdPreview Props

This is the props of \`MdPreview\`, which is also part of \`MdEditor\`:

### 📃 modelValue

- **type**: \`string\`
- **default**: \`''\`

  Markdown content.

  \`\`\`vue
  <MdEditor v-model="xxx" />
  \`\`\`

---

### 🛍 theme

- **type**: \`'light' | 'dark'\`
- **default**: \`'light'\`

  Editor's theme.

  \`\`\`vue
  <MdEditor theme="dark" />
  \`\`\`

---

### 🎀 class

- **type**: \`string\`
- **default**: \`''\`

  ...

---

### 🔤 language

- **type**: \`string\`
- **default**: \`'zh-CN'\`

  Build-in language('zh-CN', 'en-US').

  You can install the existing language also: [md-editor-extension](https://github.com/imzbf/md-editor-extension). Refer to extension library for the usage and the way to contribute~

---

### 🎲 editorId

- **type**: \`string\`
- **default**: \`'md-editor-v3\\_[\\d]'\`

  Editor's id, default incrementing by number. When using server-side rendering, make sure to set this attribute to a constant value.

---

### 🔢 showCodeRowNumber

- **type**: \`boolean\`
- **default**: \`true\`

  Show row number for code block or not.

---

### 🔦 previewTheme

- **type**: \`'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'\`
- **default**: \`'default'\`

  Preview themes.

  Custom:

  1. Write css

  \`\`\`css
  .xxx-theme {
    color: red;
  }
  \`\`\`

  2. Set \`previewTheme\`

  \`\`\`vue
  <MdEditor previewTheme="xxx" />
  \`\`\`

  For more, refer to [markdown-theme](https://github.com/imzbf/markdown-theme).

---

### 🎅🏻 style

- **type**: \`string | CSSProperties\`
- **default**: \`''\`

  Editor's inline style.

---

### ☝️ noMermaid

- **type**: \`boolean\`
- **default**: \`false\`

  Do not want to use \`mermaid\`, set it to \`true\`.

  \`\`\`vue
  <MdEditor noMermaid />
  \`\`\`

---

### ❌ noKatex

- **type**: \`boolean\`
- **default**: \`false\`

  Do not want to use \`katex\`, set it to \`true\`.

  \`\`\`vue
  <MdEditor noKatex />
  \`\`\`

---

### 🦉 codeTheme

- **type**: \`'atom'|'a11y'|'github'|'gradient'|'kimbie'|'paraiso'|'qtcreator'|'stackoverflow'\`
- **default**: \`'atom'\`

  Highlight code css name. Get Them from \`highlight.js\`.

  Custom:

  1. Config \`editorExtensions\`

  \`\`\`js
  import { config } from 'md-editor-v3';

  config({
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
  \`\`\`

  2. Set \`codeTheme\`

  \`\`\`vue
  <MdEditor codeTheme="xxx" />
  \`\`\`

---

### 🎱 mdHeadingId

- **type**: \`(text: string, level: number, index: number) => string\`
- **default**: \`(text) => text\`

  Heading \`ID\` generator.

  \`\`\`vue
  <template>
    <MdEditor :mdHeadingId="mdHeadingId" />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const mdHeadingId = (_text, _level, index) => \`heading-\${index}\`;
  <\/script>
  \`\`\`

---

### 🐣 sanitize

- **type**: \`(html: string) => string\`
- **default**: \`(html) => html\`

  This attribute is used to alter the compiled HTML content.

  !!! warning

  This is a reserved attribute.

  Basic solution for dangerous code has been built-in since version 3.x. eg: \`<script>alert(123)<\/script>\`. Prior to version 4.11.3, it was recommended to utilize this attribute for cleaning more complex content to prevent XSS attacks.

  A more comprehensive solution has been implemented since version 4.11.3. [Refer to](https://imzbf.github.io/md-editor-v3/en-US/demo#%F0%9F%94%8F%20Modify%20XSS%20configuration)

  !!!

  \`sanitize-html\` example:

  \`\`\`vue
  <template>
    <MdEditor :sanitize="sanitize" />
  </template>

  <script setup>
  import sanitizeHtml from 'sanitize-html';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const sanitize = (html) => sanitizeHtml(html);
  <\/script>
  \`\`\`

---

### 🤞🏼 noIconfont

- **type**: \`boolean\`
- **default**: \`false\`

  Not append iconfont script, download [Symbol version](\${iconfontSvgUrl}) or [Font class version](\${iconfontClassUrl}) and import it by yourself.

  \`\`\`js
  import '/assets/iconfont.js';

  // Use Font class
  // import { config } from 'md-editor-v3';
  // import '/assets/iconfont.css';
  // config({ iconfontType: 'class' })
  \`\`\`

  \`\`\`vue
  <template>
    <MdEditor noIconfont />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  <\/script>
  \`\`\`

---

### 💅 formatCopiedText

- **type**: \`(text: string) => string\`
- **default**: \`(text) => text\`

  Format copied code

  \`\`\`vue
  <template>
    <MdEditor :formatCopiedText="formatCopiedText" />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const formatCopiedText = (text) => {
    return \`\${text}  - from md-editor-v3\`;
  };
  <\/script>
  \`\`\`

---

### 🛁 codeStyleReverse

- **type**: \`boolean\`
- **default**: \`true\`

  Code style will be reversed to dark while code block of the theme has a dark background.

---

### 🧼 codeStyleReverseList

- **type**: \`Array\`
- **default**: \`['default', 'mk-cute']\`

  Themes to be reversed.

---

### 🕊 noHighlight

- **type**: \`boolean\`
- **default**: \`false\`

  Highlight code or not.

---

### 🕊 noImgZoomIn

- **type**: \`boolean\`
- **default**: \`false\`

  Enable the function of enlarging images.

  \`\`\`html
  <MdEditor noImgZoomIn />
  \`\`\`

  After version \`4.15.4\`, it is also possible to disable zooming by setting the class \`.not-zoom\`.

  \`\`\`markdown
  <img class="not-zoom">
  \`\`\`

---

### 😬 customIcon

- **type**: \`CustomIcon\`
- **default**: \`{}\`

  Customized icons

  !!! warning Type Warning

  The icon corresponding to \`copy\` and \`collapse-tips\` can only be a string, while others can be components or strings

  !!!

  \`\`\`vue
  <template>
    <MdEditor :customIcon="customIcon" />
  </template>

  <script 😬setup lang="ts">
  import type { CustomIcon } from 'md-editor-v3';
  import { MdEditor, StrIcon } from 'md-editor-v3';
  // Assuming you have installed an icon library or customized icon components
  import { IconFont } from 'tdesign-icons-vue-next';
  import 'md-editor-v3/lib/style.css';

  const customIcon: CustomIcon = {
    bold: {
      component: 'A'
    },
    // Demonstrating the use of default icons
    copy: StrIcon('copy', {}),
    // copy: '<i class="fa fa-car"></i>',
    // 'collapse-tips': '<i class="fa fa-car"></i>',
    preview: {
      component: '<i class="fa fa-car"></i>'
    },
    github: {
      component: IconFont,
      props: {
        name: 'sneer'
      }
    }
  };
  <\/script>
  \`\`\`

  Type \`CustomIcon\`

  \`\`\`ts
  type IconName =
    | 'bold'
    | 'underline'
    | 'italic'
    | 'strike-through'
    | 'title'
    | 'sub'
    | 'sup'
    | 'quote'
    | 'unordered-list'
    | 'ordered-list'
    | 'task'
    | 'code-row'
    | 'code'
    | 'link'
    | 'image'
    | 'table'
    | 'revoke'
    | 'next'
    | 'baocun'
    | 'prettier'
    | 'suoxiao'
    | 'fangda'
    | 'fullscreen-exit'
    | 'fullscreen'
    | 'preview'
    | 'coding'
    | 'catalog'
    | 'github'
    | 'mermaid'
    | 'formula'
    | 'close'
    | 'delete'
    | 'upload';

  type CustomIcon = {
    [key in IconName]?: {
      component: Component | JSX.Element | string;
      props: {
        [key: string | number | symbol]: any;
      };
    };
  } & {
    copy?: string;
  };
  \`\`\`

---

### 💅 sanitizeMermaid

- **type**: \`(h: string) => Promise<string>\`
- **default**: \`(h: string) => Promise.resolve(h)\`

  Convert the generated mermaid code

---

### 🕹 codeFoldable

- **type**: \`boolean\`
- **default**: \`true\`

  Whether to enable code folding feature

---

### ⏲ autoFoldThreshold

- **type**: \`number\`
- **default**: \`30\`

  Threshold for triggering automatic code folding by line count

---

## 🔩 MdEditor Props

Except for the same as \`MdPreview\`:

### 💻 pageFullscreen

- **type**: \`boolean\`
- **default**: \`false\`

  Screenfull in web page.

---

### 📱 preview

- **type**: \`boolean\`
- **default**: \`true\`

  Preview content in editor.

---

### 📀 htmlPreview

- **type**: \`boolean\`
- **default**: \`false\`

  Preview html in editor. Set \`preview\` to \`false\` when \`htmlPreview\` is \`true\`.

  \`\`\`jsx
  <MdEditor htmlPreview preview={false} />
  \`\`\`

---

### 🧱 toolbars

- **type**: \`Array\`
- **default**: \`[all]\`

  Show contents of toolbar, all keys.

  You can sort the toolbar as you like, split tools by \`'-'\`, the left and right toolbars are divided by \`'='\`！

  After v1.10.0, you can customize the toolbar. To display them, put index of \`defToolbars\` into \`toolbars\`(this is not standard)

  _[all]_

  \`\`\`js
  [
    'bold',
    'underline',
    'italic',
    '-',
    'title',
    'strikeThrough',
    'sub',
    'sup',
    'quote',
    'unorderedList',
    'orderedList',
    'task',
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
    'previewOnly',
    'htmlPreview',
    'catalog',
    'github'
  ];
  \`\`\`

---

### 🧱 toolbarsExclude

- **type**: \`Array\`
- **default**: \`[]\`

  Don't show contents of toolbar.

---

### 🪒 noPrettier

- **type**: \`boolean\`
- **default**: \`false\`

  Use prettier to beautify content or not.

---

### 🤏 tabWidth

- **type**: \`number\`
- **default**: \`2\`

  One tab eq some space.

---

### 📅 tableShape

- **type**: \`[number, number] \\| [number, number, number, number]\`
- **default**: \`[6, 4]\`

  Preset the size of the table, [columns, rows, Maximum number of columns, Maximum number of rows]

  \`\`\`vue
  <template>
    <MdEditor :tableShape="tableShape" />
  </tempale>

  <script setup>
  const tableShape = [8, 4];
  <\/script>
  \`\`\`

  ![Preview](https://imzbf.github.io/md-editor-v3/imgs/20211216165424.png)

---

### 🪧 placeholder

- **type**: \`string\`
- **default**: \`''\`

  em-\\_-！

---

### 🦶 footers

- **type**: \`Array<'markdownTotal' \\| '=' \\| 'scrollSwitch' \\| number>\`
- **default**: \`['markdownTotal', '=', 'scrollSwitch']\`

  Show contents of footer, they are divided by \`'='\`. Set it to [] to hidden footer.

---

### ⛵️ scrollAuto

- **type**: \`boolean\`
- **default**: \`true\`

  Scroll default setting.

---

### 🥹 noUploadImg

- **type**: \`boolean\`
- **default**: \`false\`

  Not show the entrance to upload pictures

  \`\`\`vue
  <MdEditor noUploadImg />
  \`\`\`

---

### 🔬 autoFocus

- **type**: \`boolean\`
- **default**: \`false\`

  Same as \`autofocus\` in native textarea.

---

### 🔩 disabled

- **type**: \`boolean\`
- **default**: \`false\`

  Same as \`disabled\` in native textarea.

---

### 🔒 readOnly

- **type**: \`boolean\`
- **default**: \`false\`

  Same as \`readonly\` in native textarea.

---

### 📏 maxLength

- **type**: \`number\`
- **default**: \`\`

  Same as \`maxlength\` in native textarea.

---

### 📥 autoDetectCode

- **type**: \`boolean\`
- **default**: \`false\`

  Auto detect the type of pasted code, only support that copied from \`vscode\`.

---

### 📝 completions

- **type**: \`Array<CompletionSource>\`
- **default**: \`[]\`

  Additional completion sources.

  \`\`\`vue
  <template>
    <MdEditor v-model="text" :completions="completions" />
  </template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import { CompletionSource } from '@codemirror/autocomplete';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const text = ref('');

  const completions = ref<Array<CompletionSource>>([
    (context) => {
      const word = context.matchBefore(/@\\w*/);

      if (word === null || (word.from == word.to && context.explicit)) {
        return null;
      }

      return {
        from: word.from,
        options: [
          {
            label: '@imzbf',
            type: 'text'
          }
        ]
      };
    }
  ]);
  <\/script>
  \`\`\`

---

### 📥 showToolbarName

- **type**: \`boolean\`
- **default**: \`false\`

  Show toolbar name or not

![](https://imzbf.github.io/md-editor-v3/imgs/showToolbarName.jpg)

---

### 📥 inputBoxWitdh

- **type**: \`string\`
- **default**: \`50%\`

  Default width of input box

![](https://imzbf.github.io/md-editor-v3/imgs/drag-width.jpg)

---

### 📥 transformImgUrl

- **type**: \`(imgUrl: string) => string | Promise<string>\`
- **default**: \`t => t\`

  Transform image links

---

## 🎍 slots

### 💪 defToolbars

Custom toolbar in \`DropdownToolbar\`, \`NormalToolbar\` or \`ModalToolbar\`.

- Setup Template

  \`\`\`vue
  <template>
    <MdEditor :toolbars="toolbars">
      <template #defToolbars>
        <NormalToolbar title="mark" @onClick="handler">
          <template #trigger>
            <svg class="md-editor-icon" aria-hidden="true">
              <use xlink:href="#icon-mark"></use>
            </svg>
          </template>
        </NormalToolbar>
      </template>
    </MdEditor>
  </template>

  <script setup>
  import { MdEditor, NormalToolbar } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const toolbars = ['bold', '-', 0, '=', 'github'];

  const handler = () => {
    console.log('NormalToolbar clicked!');
  };
  <\/script>
  \`\`\`

- Jsx Template

  \`\`\`jsx
  import { defineComponent } from 'vue';
  import { MdEditor, NormalToolbar } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const toolbars = ['bold', '-', 0, '=', 'github'];

  export default defineComponent({
    setup() {
      return () => (
        <MdEditor
          toolbars={toolbars}
          defToolbars={
            <>
              <NormalToolbar
                trigger={
                  <svg class="md-editor-icon" aria-hidden="true">
                    <use xlinkHref="#icon-strike-through" />
                  </svg>
                }
              />
            </>
          }
        />
      );
    }
  });
  \`\`\`

![NormalToolbar](https://imzbf.github.io/md-editor-v3/imgs/normal-toolbar.gif)

![DropdownToolbar](https://imzbf.github.io/md-editor-v3/imgs/dropdown-toolbar.gif)

For more info, Get **Internal Components** heading. Get source code of **mark**, **emoji** and **modal preview** at [docs](https://github.com/imzbf/md-editor-v3/tree/docs/src/components) branch.

---

### 🦿 defFooters

- Setup Template

  \`\`\`vue
  <template>
    <MdEditor :footers="footers">
      <template #defFooters>
        <span>￥_￥</span>
        <span>^_^</span>
      </template>
    </MdEditor>
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const footers = ['markdownTotal', 0, '=', 1, 'scrollSwitch'];
  <\/script>
  \`\`\`

- Jsx Template

  \`\`\`jsx
  import { defineComponent } from 'vue';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const footers = ['markdownTotal', 0, '=', 1, 'scrollSwitch'];

  export default defineComponent({
    setup() {
      return () => (
        <MdEditor
          footers={footers}
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
  \`\`\`

![](https://imzbf.github.io/md-editor-v3/imgs/footer.png)

---

## 🧵 MdPreview Events

### 🚁 onHtmlChanged

- **type**: \`(h: string) => void\`

  Compile markdown successful event, you can use it to get the html code.

---

### 🗒 onGetCatalog

- **type**: \`(list: HeadList[]) => void\`

  Get catalogue of article.

---

## 🪢 MdEditor Events

Except for the same as \`MdPreview\`:

### 📞 onChange

- **type**: \`(v: string) => void\`

  Content changed event(bind to \`oninput\` of \`textarea\`).

---

### 💾 onSave

- **type**: \`(v: string, h: Promise<string>) => void\`

  Saving content event, \`ctrl+s\` and clicking button will trigger it.

  \`\`\`vue
  <template>
    <MdEditor @onSave="onSave" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const onSave = (v, h) => {
    console.log(v);

    h.then((html) => {
      console.log(html);
    });
  };
  <\/script>
  \`\`\`

---

### 📸 onUploadImg

- **type**: \`files: Array<File>, callback: (urls: string[] | { url: string; alt: string; title: string }[]) => void\`

  Uploading picture event, when picture is uploading the modal will not close, please provide right urls to the callback function.

  \`\`\`vue
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

    // Approach 1
    callback(res.map((item) => item.data.url));

    // Approach 2
    // callback(
    //   res.map((item: any) => ({
    //     url: item.data.url,
    //     alt: 'alt',
    //     title: 'title'
    //   }))
    // );
  };
  <\/script>
  \`\`\`

---

### 💀 onError

- **type**: \`(err: { name: 'Cropper' \\| 'fullscreen' \\| 'prettier' \\| 'overlength'; message: string }) => void\`

  Run-Time error event, only be called when \`Cropper\`, \`fullscreen\`, \`prettier\` is not loaded. And content exceeds the length limit error.

  \`\`\`vue
  <template>
    <MdEditor @onError="onError" />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const onError = (err) => {
    alert(err.message);
  };
  <\/script>
  \`\`\`

---

### 🐾 onBlur

- **type**: \`(event: FocusEvent) => void\`

  Textarea has lost focus.

  \`\`\`vue
  <template>
    <MdEditor @onBlur="onBlur" />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const onBlur = (e) => {
    console.log('onBlur', e);
  };
  <\/script>
  \`\`\`

---

### 🔖 onFocus

- **type**: \`(event: FocusEvent) => void\`

  Textarea has received focus.

---

### 🔖 onInput

- **type**: \`(event: Event) => void\`

  Element gets input.

---

### 🔖 onDrop

- **type**: \`(event: DragEvent) => void\`

  The event occurs when a selection is being dragged.

  \`\`\`vue
  <template>
    <MdEditor v-model="text" @onDrop="onDrop" />
  </template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const text = ref('');

  const onDrop = (e: DragEvent) => {
    e.stopPropagation();
    console.log('ee', e.dataTransfer?.files[0]);
  };
  <\/script>
  \`\`\`

---

### 🔖 onInputBoxWitdhChange

- **type**: \`(width: string) => void\`

  Event occurs when width of input box has been changed

---

## 🤱🏼 Expose

After 2.5.0, Editor exposes several methods on the instance, used to get or change the internal status of the editor.

\`\`\`vue
<template>
  <MdEditor ref="editorRef" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MdEditor } from 'md-editor-v3';
import type { ExposeParam } from 'md-editor-v3';

//
// import type { ExposePreviewParam } from 'md-editor-v3';

import 'md-editor-v3/lib/style.css';

const editorRef = ref<ExposeParam>();

onMounted(() => {
  editorRef.value?.on('catalog', console.log);
});
<\/script>
\`\`\`

| Name                 | MdEditor | MdPreview |
| -------------------- | -------- | --------- |
| on                   | √        | ×         |
| togglePageFullscreen | √        | ×         |
| toggleFullscreen     | √        | ×         |
| togglePreview        | √        | ×         |
| togglePreviewOnly    | √        | ×         |
| toggleHtmlPreview    | √        | ×         |
| toggleCatalog        | √        | ×         |
| triggerSave          | √        | ×         |
| insert               | √        | ×         |
| focus                | √        | ×         |
| rerender             | √        | √         |
| getSelectedText      | √        | ×         |
| resetHistory         | √        | ×         |

### 👂🏼 on

Get the internal state of the editor, including pageFullscreen, fullscreen, preview, htmlPreview, catalog, etc.

- pageFullscreen

  \`\`\`js
  editorRef.value?.on('pageFullscreen', (status) => console.log(status));
  \`\`\`

- fullscreen

  \`\`\`js
  editorRef.value?.on('fullscreen', (status) => console.log(status));
  \`\`\`

- preview

  \`\`\`js
  editorRef.value?.on('preview', (status) => console.log(status));
  \`\`\`

- previewOnly

  \`\`\`js
  editorRef.value?.on('previewOnly', (status) => console.log(status));
  \`\`\`

- htmlPreview

  \`\`\`js
  editorRef.value?.on('htmlPreview', (status) => console.log(status));
  \`\`\`

- catalog

  \`\`\`js
  editorRef.value?.on('catalog', (status) => console.log(status));
  \`\`\`

---

### 💻 togglePageFullscreen

Toggle status of fullscreen within the page.

\`\`\`js
editorRef.value?.togglePageFullscreen(true);
\`\`\`

> Switched to the opposite status, without input parameter.

---

### 🖥 toggleFullscreen

Toggle status of fullscreen widthin browser.

\`\`\`js
editorRef.value?.toggleFullscreen(true);
\`\`\`

> Switched to the opposite status, without input parameter.

---

### 📖 togglePreview

Toggle status of preview.

\`\`\`js
editorRef.value?.togglePreview(true);
\`\`\`

> Switched to the opposite status, without input parameter.

---

### 📖 togglePreviewOnly

Toggle into Preview Only Mode.

\`\`\`js
editorRef.value?.togglePreviewOnly(true);
\`\`\`

> Switched to the opposite status, without input parameter.

---

### 📼 toggleHtmlPreview

Toggle status of htmlPreview.

\`\`\`js
editorRef.value?.toggleHtmlPreview(true);
\`\`\`

> Switched to the opposite status, without input parameter.

---

### 🧬 toggleCatalog

Toggle status of catalog.

\`\`\`js
editorRef.value?.toggleCatalog(true);
\`\`\`

> Switched to the opposite status, without input parameter.

---

### 💾 triggerSave

\`\`\`js
editorRef.value?.triggerSave();
\`\`\`

---

### 💉 insert

Manually insert content into textarea.

\`\`\`js
/**
 * @params selectedText
 */
editorRef.value?.insert((selectedText) => {
  /**
   * @return targetValue    Content to be inserted
   * @return select         Automatically select content, default: true
   * @return deviationStart Start position of the selected content, default: 0
   * @return deviationEnd   End position of the selected content, default: 0
   */
  return {
    targetValue: \`\${selectedText}\`,
    select: true,
    deviationStart: 0,
    deviationEnd: 0
  };
});
\`\`\`

---

### 🎯 focus

Focus on the textarea.

\`\`\`ts
import type { FocusOption } from 'md-editor-v3';

const option: FocusOption | undefined = 'start';

// Cursor position when focusing on textarea, default: position when it last lost focus
editorRef.value?.focus(option);
\`\`\`

\`\`\`ts
type FocusOption =
  | 'start'
  | 'end'
  | {
      // Start position, default cursor position
      rangeAnchor?: number;
      // End position, default cursor position
      rangeHead?: number;
      // Cursor position
      cursorPos: number;
    };
\`\`\`

---

### ✒️ rerender

Re render the content.

\`\`\`js
editorRef.value?.rerender();
\`\`\`

---

### 🔍 getSelectedText

Get the currently selected text.

\`\`\`js
console.log(editorRef.value?.getSelectedText());
\`\`\`

---

### 🗑 resetHistory

Clear current history.

---

### 🎛 domEventHandlers

Supports listening to all DOM events.

\`\`\`js
editorRef.value?.domEventHandlers({
  compositionstart: () => {
    console.log('compositionstart');
  }
});
\`\`\`

---

### 🎛 execCommand

Insert content into the editor via trigger.

\`\`\`js
editorRef.value?.execCommand('bold');
\`\`\`

---

### 🔖 getEditorView

Get codemirror instance.

---

## 💴 Config Editor

Use \`config(option: ConfigOption)\` to reconfigure \`markdown-it\` and so on.

!!! warning

We recommend configuring it at the project entry point, such as in \`main.js\` for projects created with Vite. Avoid calling \`config\` within components!

!!!

### 🦪 codeMirrorExtensions

Customize new extensions based on theme and default extensions f codeMirror.

\`\`\`ts
type CodeMirrorExtensions = (
  theme: Themes,
  extensions: Array<Extension>,
  keyBindings: Array<KeyBinding>,
  options: {
    editorId: string;
  }
) => Array<Extension>;
\`\`\`

Example: Editor does not render the line number of textarea by default, this extension needs to be manually added

\`\`\`js
import { config } from 'md-editor-v3';
import { lineNumbers } from '@codemirror/view';

config({
  codeMirrorExtensions(_theme, extensions) {
    return [...extensions, lineNumbers()];
  }
});
\`\`\`

---

### 🍤 markdownItConfig

Customize extensions, attributes of \`markdown-it\`, etc.

\`\`\`ts
type MarkdownItConfig = (
  md: markdownit,
  options: {
    editorId: string;
  }
) => void;
\`\`\`

Example: Use \`markdown-it-anchor\` to render a hyperlink symbol to the right of the title

\`\`\`js
import { config } from 'md-editor-v3';
import ancher from 'markdown-it-anchor';

config({
  markdownItConfig(mdit) {
    mdit.use(ancher, {
      permalink: true
    });
  }
});
\`\`\`

---

### 🍤 markdownItPlugins

Select and add built-in plugins to \`markdown-it\`.

\`\`\`ts
type MarkdownItPlugins = (
  plugins: Array<MarkdownItConfigPlugin>,
  options: {
    editorId: string;
  }
) => Array<MarkdownItConfigPlugin>;
\`\`\`

Example: Modify the class name of the image.

\`\`\`js
import { config } from 'md-editor-v3';

config({
  markdownItPlugins(plugins) {
    return plugins.map((p) => {
      if (p.type === 'image') {
        return {
          ...p,
          options: {
            ...p.options,
            classes: 'my-class'
          }
        };
      }

      return p;
    });
  }
});
\`\`\`

---

### 🍙 editorConfig

Add more languages, reset \`mermaid\` template or delay rendering time

#### 🍚 languageUserDefined

\`\`\`js
import { config } from 'md-editor-v3';

config({
  editorConfig: {
    languageUserDefined: {
      'en-US': {
        toolbarTips: {
          bold: 'bold',
          underline: 'underline',
          italic: 'italic',
          strikeThrough: 'strikeThrough',
          title: 'title',
          sub: 'subscript',
          sup: 'superscript',
          quote: 'quote',
          unorderedList: 'unordered list',
          orderedList: 'ordered list',
          task: 'task list',
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
          previewOnly: 'previewOnly',
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
          linkTitle: 'Add Link',
          imageTitle: 'Add Image',
          descLabel: 'Desc:',
          descLabelPlaceHolder: 'Enter a description...',
          urlLabel: 'Link:',
          urlLabelPlaceHolder: 'Enter a link...',
          buttonOK: 'OK'
        },
        clipModalTips: {
          title: 'Crop Image',
          buttonUpload: 'Upload'
        },
        copyCode: {
          text: 'Copy',
          successTips: 'Copied!',
          failTips: 'Copy failed!'
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
\`\`\`

#### 🍘 mermaidTemplate

\`\`\`js
import { config } from 'md-editor-v3';

config({
  editorConfig: {
    // mermaid template
    mermaidTemplate: {
      flow: \`flow tempalte\`,
      sequence: \`sequence template\`,
      gantt: \`gantt template\`,
      class: \`class template\`,
      state: \`state template\`,
      pie: \`pie template\`,
      relationship: \`relationship template\`,
      journey: \`journey template\`
    }
  }
});
\`\`\`

#### 🍥 renderDelay

\`\`\`js
import { config } from 'md-editor-v3';

config({
  editorConfig: {
    // delay rendering time(ms)
    renderDelay: 0
  }
});
\`\`\`

---

#### 🍥 zIndex

\`\`\`js
import { config } from 'md-editor-v3';

config({
  editorConfig: {
    // for modal component
    zIndex: 2000
  }
});
\`\`\`

---

### 🥠 editorExtensions

Config some dependency libraries, like highlight..

\`\`\`typescript
import { config } from 'md-editor-v3';

config({
  editorExtensions: { iconfont: 'https://xxx.cc' }
});
\`\`\`

\`\`\`ts
export interface EditorExtensions {
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
\`\`\`

---

### 🥠 editorExtensionsAttrs

Synchronously add attributes to the CDN link tags, consistent with the type of \`editorExtensions\`, with a value type of \`HTMLElementTagNameMap['tagName']\`.

\`\`\`js
import { config } from 'md-editor-v3';

config({
  editorExtensionsAttrs: {
    highlight: {
      js: {
        className: 'hglh-js'
      },
      css: {
        atom: {
          light: {
            className: 'atom-light-css'
          },
          dark: {
            className: 'atom-dark-css'
          }
        }
      }
    }
  }
});
\`\`\`

Example of using built-in basic configuration:

\`\`\`js
import { config, editorExtensionsAttrs } from 'md-editor-v3';

config({
  editorExtensionsAttrs
});
\`\`\`

!!! warning Warning

Do not attempt to define the src \\ onload \\ id of the script and rel \\ href \\ id of the link in editorExtensionsAttrs, as they will be overwritten by default values

!!!

---

### 🫨 iconfontType

Set the way to display icons:

- \`svg\`: with symbol
- \`class\`: with font-class

If the icon is customized through the attribute \`customIcon\`, the customized icon will be used first.

This can be usually used to avoid the issue of incompatible symbol.

\`\`\`js
import { config } from 'md-editor-v3';

config({
  iconfontType: 'class'
});
\`\`\`

---

### 🎨 mermaidConfig

Configure \`mermaid\`, [Details](https://mermaid.js.org/config/schema-docs/config.html)

\`\`\`js
import { config } from 'md-editor-v3';
config({
  mermaidConfig(base: any) {
    return {
      ...base,
      logLevel: 'error'
    };
  }
});
\`\`\`

---

### 🔧 katexConfig

Configure \`katex\`, [Details](https://katex.org/docs/options)

\`\`\`js
import { config } from 'md-editor-v3';

config({
  katexConfig(base: any) {
    return {
      ...base,
      strict: false
    };
  }
});
\`\`\`

---

## 🪡 Shortcut keys

!!! warning Pay attention

Shortcut keys are only available when the textarea has received focus!

!!!

| key | function | description |
| --- | --- | --- |
| TAB | insert space | Insert space, the length eq \`tabWidth\`, default: 2, support multiline |
| SHIFT + TAB | delete space, setting is the same as Tab |  |
| CTRL + C | copy | When selected, copy the selected content. When not selected, copy the content of the current line |
| CTRL + X | shear | When selected, cut the selected content. When not selected, cut the current line |
| CTRL + D | delete | When selected, delete the selected content. When not selected, delete the current line |
| CTRL + S | save | Trigger \`onSave\` event |
| CTRL + B | bold text | \`**bold**\` |
| CTRL + U | underline | \`<u>underline</u>\` |
| CTRL + I | italic | \`*italic*\` |
| CTRL + 1-6 | h1-h6 | \`# title\` |
| CTRL + ↑ | superscript | \`<sup>superscript</sup>\` |
| CTRL + ↓ | subscript | \`<sub>subscript</sub>\` |
| CTRL + O | ordered list | \`1. ordered list\` |
| CTRL + L | link | \`[link](https://github.com/imzbf/md-editor-v3)\` |
| CTRL + Z | withdraw | Withdraw history in editor, not the function of system |
| CTRL + F | find and replace |  |
| CTRL + SHIFT + S | line-through | \`~line-through~\` |
| CTRL + SHIFT + U | unordered list | \`- unordered list\` |
| CTRL + SHIFT + C | code block |  |
| CTRL + SHIFT + I | picture | \`![picture](https://github.com/imzbf)\` |
| CTRL + SHIFT + Z | forward | Forward history in editor, not the function of system |
| CTRL + SHIFT + F | Beautify |  |
| CTRL + ALT + C | code row |  |
| CTRL + SHIFT + ALT + T | table | \`\\|table\\|\` |

## 🪤 Internal Components

On-demand import, eg: \`import { DropdownToolbar } from 'md-editor-v3'\`.

!!! info Built-in attribute

To help developers quickly insert content and use editor attributes, the editor component has added the following attribute values to the written extension component by default:

| name | example |
| --- | --- |
| insert | Refer to the \`DropdownToolbar\` component example below |
| theme | Refer to the extension components in the [ExportPDF](https://github.com/imzbf/md-editor-extension/blob/main/packages/v3/components/ExportPDF/ExportPDF.tsx#L94) |
| previewtheme | Same as above |
| language | Same as above |

!!!

### 🐣 NormalToolbar

- **props**

  - \`title\`: \`string\`, not necessary, title of toolbar.

- **events**

  - \`onClick\`: \`(e: MouseEvent) => void\`, necessary.

- **slots**

  - \`trigger\`: \`VNode | JSX.Element\`, necessary, it is usually an icon, which is displayed on the toolbar.

usage:

\`\`\`vue
<template>
  <NormalToolbar title="mark" @onClick="handler">
    <template #trigger>
      <svg class="md-editor-icon" aria-hidden="true">
        <use xlink:href="#icon-mark"></use>
      </svg>
    </template>
  </NormalToolbar>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { NormalToolbar } from 'md-editor-v3';
import type { Insert } from 'md-editor-v3';

const props = defineProps({
  /**
   * \`insert\` will be automatically injected into the component by the editor
   */
  insert: {
    type: Function as PropType<Insert>,
    default: () => {
      //
    }
  }
});

const handler = () => {
  props.insert((selectedText) => {
    /**
     * @return targetValue    Content to be inserted
     * @return select         Automatically select content, default: true
     * @return deviationStart Start position of the selected content, default: 0
     * @return deviationEnd   End position of the selected content, default: 0
     */
    return {
      targetValue: \`==\${selectedText}==\`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    };
  });
};
<\/script>
\`\`\`

\`\`\`vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars">
    <template #defToolbars>
      <MyToolbar />
    </template>
  </MdEditor>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import MyToolbar from './MyToolbar.vue';
import 'md-editor-v3/lib/style.css';

const text = ref('');
const toolbars = ['bold', 0, 'github'];
<\/script>
\`\`\`

[MarkExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/MarkExtension/index.vue)

---

### 🐼 DropdownToolbar

- **props**

  - \`title\`: \`string\`, not necessary, title of toolbar.
  - \`visible\`: \`boolean\`, necessary.

- **events**

  - \`onChange\`: \`(visible: boolean) => void\`, necessary.

- **slots**

  - \`trigger\`: \`VNode | JSX.Element\`, necessary, it is usually an icon, which is displayed on the toolbar.
  - \`overlay\`: \`VNode | JSX.Element\`, necessary, content of dropdown box.

\`\`\`vue
<template>
  <DropdownToolbar title="emoji" :visible="visible" :onChange="onChange">
    <template #overlay>
      <div class="emoji-container">
        <ol class="emojis">
          <li
            v-for="(emoji, index) of emojis"
            :key="\`emoji-\${index}\`"
            @click="handler(emoji)"
            v-text="emoji"
          ></li>
        </ol>
      </div>
    </template>
    <template #trigger>
      <svg class="md-editor-icon" aria-hidden="true">
        <use xlink:href="#icon-emoji"></use>
      </svg>
    </template>
  </DropdownToolbar>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { DropdownToolbar } from 'md-editor-v3';
import type { Insert } from 'md-editor-v3';

const emojis = ['😀', '😃'];

const props = defineProps({
  /**
   * \`insert\` will be automatically injected into the component by the editor
   */
  insert: {
    type: Function as PropType<Insert>,
    default: () => {
      //
    }
  }
});

const visible = ref(false);

const onChange = () => {
  visible.value = !visible.value;
};

const handler = (emoji: any) => {
  props.insert(() => {
    /**
     * @return targetValue    Content to be inserted
     * @return select         Automatically select content, default: true
     * @return deviationStart Start position of the selected content, default: 0
     * @return deviationEnd   End position of the selected content, default: 0
     */
    return {
      targetValue: emoji,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    };
  });
};
<\/script>
\`\`\`

\`\`\`vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars">
    <template #defToolbars>
      <MyToolbar />
    </template>
  </MdEditor>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import MyToolbar from './MyToolbar.vue';
import 'md-editor-v3/lib/style.css';

const text = ref('');
const toolbars = ['bold', 0, 'github'];
<\/script>
\`\`\`

[EmojiExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/EmojiExtension/index.vue)

---

### 🦉 ModalToolbar

- **props**

  - \`title\`: \`string\`, not necessary, title of toolbar.
  - \`modalTitle\`: \`string\`, not necessary, title of the Modal.
  - \`visible\`: \`boolean\`, necessary, visibility of Modal.
  - \`width\`: \`string\`, not necessary, width of Modal, default \`auto\`.
  - \`height\`: \`string\`, same as \`width\`.
  - \`showAdjust\`: \`boolean\`, not necessary, visibility of fullscreen button.
  - \`isFullscreen\`: \`boolean\`, necessary when \`showAdjust = true\`, status of fullscreen.
  - \`class\`: \`string\`, \`^4.16.8\`, not necessary.
  - \`style\`: \`CSSProperties | string\`, \`^4.16.8\`, not necessary.
  - \`showMask\`: \`boolean\`, \`^4.16.8\`, not necessary, whether to display the mask layer, default \`true\`.

- **events**

  - \`onClick\`: \`() => void\`, necessary.
  - \`onClose\`: \`() => void\`, necessary, close event.
  - \`onAdjust\`: \`(val: boolean) => void\`, fullscreen button click event.

- **slots**

  - \`trigger\`: \`VNode | JSX.Element\`, necessary, it is usually an icon, which is displayed on the toolbar.
  - \`default\`: \`VNode | JSX.Element\`, necessary, content of Modal.

\`\`\`vue
<template>
  <ModalToolbar
    :visible="data.modalVisible"
    :isFullscreen="data.modalFullscreen"
    showAdjust
    title="Preview"
    modalTitle="Page Preview"
    width="870px"
    height="600px"
    @onClick="data.modalVisible = true"
    @onClose="data.modalVisible = false"
    @onAdjust="data.modalFullscreen = !data.modalFullscreen"
  >
    <button @click="handler">Click me</button>
    <template #trigger>
      <svg class="md-editor-icon" aria-hidden="true">
        <use xlink:href="#icon-read"></use>
      </svg>
    </template>
  </ModalToolbar>
</template>

<script setup lang="ts">
import { PropType, reactive } from 'vue';
import { ModalToolbar } from 'md-editor-v3';
import type { Insert } from 'md-editor-v3';

const data = reactive({
  modalVisible: false,
  modalFullscreen: false
});

const props = defineProps({
  /**
   * \`insert\` will be automatically injected into the component by the editor
   */
  insert: {
    type: Function as PropType<Insert>,
    default: () => {
      //
    }
  }
});

const handler = () => {
  props.insert((selectedText) => {
    /**
     * @return targetValue    Content to be inserted
     * @return select         Automatically select content, default: true
     * @return deviationStart Start position of the selected content, default: 0
     * @return deviationEnd   End position of the selected content, default: 0
     */
    return {
      targetValue: \`==\${selectedText}==\`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    };
  });
};
<\/script>
\`\`\`

\`\`\`vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars">
    <template #defToolbars>
      <MyToolbar />
    </template>
  </MdEditor>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import MyToolbar from './MyToolbar.vue';
import 'md-editor-v3/lib/style.css';

const text = ref('');
const toolbars = ['bold', 0, 'github'];
<\/script>
\`\`\`

[ReadExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/ReadExtension/index.vue)

---

### 🐻 MdCatalog

- **props**

  - \`editorId\`: \`string\`, necessary, editor's \`editorId\`, used to register listening events.
  - \`class\`: \`string\`, not necessary.
  - \`mdHeadingId\`: \`mdHeadingId\`, not necessary, same as editor.
  - \`scrollElement\`: \`string | HTMLElement\`, not necessary, it is an element selector when its type is string. When \`previewOnly\` eq \`true\`, it is usually set to \`document.documentElement\`.
  - \`theme\`: 'light' | 'dark', not necessary, provide it when you want to change theme online, it is the same as Editor \`theme\`.
  - \`offsetTop\`: \`number\`, not necessary, highlight current item of catalogs when title is \`offsetTop\` pixels from the top, default 20.
  - \`scrollElementOffsetTop\`: \`number\`, not necessary, offsetTop of the scroll container, default 0.

- **events**

  - \`onClick\`: \`(e: MouseEvent, t: TocItem) => void\`, not necessary.
  - \`onActive\`: \`(heading: HeadList | undefined) => void\`, not necessary, heading was highlighted.

usage:

\`\`\`vue
<template>
  <!-- Ensure that the editorId is the same -->
  <MdPreview :editorId="state.id" :modelValue="state.text" :theme="state.theme" />
  <MdCatalog :editorId="state.id" :scrollElement="scrollElement" :theme="state.theme" />
</template>

<script setup>
import { reactive } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const state = reactive({
  theme: 'dark',
  text: 'heading',
  id: 'my-editor'
});

const scrollElement = document.documentElement;
<\/script>
\`\`\`

---

### 🛸 MdModal

It is usually used in conjunction with \`DropdownToolbar\`.

- **props**

  - \`title\`: \`string\`, not necessary, title of Modal.
  - \`visible\`: \`boolean\`, necessary, visibility of Modal.
  - \`width\`: \`string\`, not necessary, width of Modal, default \`auto\`.
  - \`height\`: \`string\`, same as \`width\`.
  - \`showAdjust\`: \`boolean\`, not necessary, visibility of fullscreen button.
  - \`isFullscreen\`: \`boolean\`, necessary when \`showAdjust = true\`, status of fullscreen.
  - \`class\`: \`string\`, not necessary.
  - \`style\`: \`CSSProperties | string\`, not necessary.
  - \`showMask\`: \`boolean\`, \`^4.16.8\`, not necessary, whether to display the mask layer, default \`true\`.

- **events**

  - \`onClose\`: \`() => void\`, necessary, close event.
  - \`onAdjust\`: \`(val: boolean) => void\`, fullscreen button click event.

- **slots**

  - \`default\`: \`VNode | JSX.Element\`, necessary, content of Modal.

\`\`\`vue
<template>
  <DropdownToolbar title="emoji" :visible="state.visible" :onChange="onChange">
    <template #overlay>
      <ul>
        <li @click="state.mVisible = true">option 1</li>
        <li>option 2</li>
      </ul>
    </template>
    <template #trigger>
      <svg class="md-editor-icon" aria-hidden="true">
        <use xlink:href="#icon-emoji"></use>
      </svg>
    </template>
    <template #default>
      <MdModal title="title" :visible="state.mVisible" @onClose="onClose">
        Content, Content
      </MdModal>
    </template>
  </DropdownToolbar>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { DropdownToolbar, MdModal } from 'md-editor-v3';

const state = reactive({
  visible: false,
  mVisible: false
});

const onClose = () => {
  state.mVisible = !state.mVisible;
};

const onChange = () => {
  state.visible = !state.visible;
};
<\/script>
\`\`\`

---

## 🪤 Internal Configuration

\`\`\`js
import {
  iconfontClassUrl,
  iconfontSvgUrl,
  allToolbar,
  allFooter,
  zh_CN,
  en_US
} from 'md-editor-v3';

console.log(iconfontClassUrl, iconfontSvgUrl, allToolbar, allFooter, zh_CN, en_US);
\`\`\`

## ✍️ Edit This Page

[doc-en-US](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/doc-en-US.md)
`,a=`> 在线尝试示例：[传送门](https://codesandbox.io/s/epic-bird-2znqo)

## 🔖 MdPreview Props

这是预览组件\`MdPreview\`的\`Props\`，它们同样也是\`MdEditor\`的：

### 📃 modelValue

- **类型**：\`string\`
- **默认值**：\`''\`

  编辑的内容。

  \`\`\`vue
  <MdEditor v-model="xxx" />
  \`\`\`

---

### 🛍 theme

- **类型**：\`'light' | 'dark'\`
- **默认值**：\`'light'\`

  编辑器主题。

  \`\`\`vue
  <MdEditor theme="dark" />
  \`\`\`

---

### 🎀 class

- **类型**：\`string\`
- **默认值**：\`''\`

  ...

---

### 🔤 language

- **类型**：\`string\`
- **默认值**：\`'zh-CN'\`

  内置中英文(\`'zh-CN'\`,\`'en-US'\`)，可自行扩展其他语言，同时可覆盖内置的中英文。

  你也可以使用现成的扩展语言：[md-editor-extension](https://github.com/imzbf/md-editor-extension)。使用及贡献方式见扩展库文档~

---

### 🎲 editorId

- **类型**：\`string\`
- **默认值**：\`'md-editor-v3\\_[\\d]'\`

  编辑器唯一标识，默认数据递增。当使用服务端渲染时，请务必设置该属性为固定值，防止产生服务端与客户端渲染内容不一致错误提示。

---

### 🔢 showCodeRowNumber

- **类型**：\`boolean\`
- **默认值**：\`true\`

  代码块是否显示行号。

---

### 🔦 previewTheme

- **类型**：\`'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'\`
- **默认值**：\`'default'\`

  预览内容主题，支持自定义。

  主题自定义方式：

  1. 编辑 css

  \`\`\`css
  .xxx-theme {
    color: red;
  }
  \`\`\`

  2. 设置\`previewTheme\`

  \`\`\`vue
  <MdEditor previewTheme="xxx" />
  \`\`\`

  参考[markdown-theme](https://github.com/imzbf/markdown-theme)项目。

---

### 🎅🏻 style

- **类型**：\`string | CSSProperties\`
- **默认值**：\`''\`

  编辑器内联样式。

---

### ☝️ noMermaid

- **类型**：\`boolean\`
- **默认值**：\`false\`

  如果你不希望使用图表展示内容，可以设置关闭。

  \`\`\`vue
  <MdEditor noMermaid />
  \`\`\`

---

### ❌ noKatex

- **类型**：\`boolean\`
- **默认值**：\`false\`

  如果你不希望使用数学公式展示内容，可以设置关闭。

  \`\`\`vue
  <MdEditor noKatex />
  \`\`\`

---

### 🦉 codeTheme

- **类型**：\`'atom'|'a11y'|'github'|'gradient'|'kimbie'|'paraiso'|'qtcreator'|'stackoverflow'\`
- **默认值**：\`'atom'\`

  代码块高亮样式名称。

  你可以添加自己的样式，把该属性设置为你想要的即可，方式如下：

  1. 配置样式链接

  \`\`\`js
  import { config } from 'md-editor-v3';

  config({
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
  \`\`\`

  2. 设置\`codeTheme\`

  \`\`\`vue
  <MdEditor codeTheme="xxx" />
  \`\`\`

---

### 🎱 mdHeadingId

- **类型**：\`(text: string, level: number, index: number) => string\`
- **默认值**：\`(text) => text\`

  构造标题\`ID\`的生成方式。

  \`\`\`vue
  <template>
    <MdEditor :mdHeadingId="mdHeadingId" />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const mdHeadingId = (_text, _level, index) => \`heading-\${index}\`;
  <\/script>
  \`\`\`

---

### 🐣 sanitize

- **类型**：\`(html: string) => string\`
- **默认值**：\`(html) => html\`

  通过该属性修改编译后的html内容

  !!! warning

  该属性为保留属性

  基本的危险代码处理方案在3.x以后已内置，例如\`<script>alert(123)<\/script>\`，4.11.3之前建议使用该属性来清理更复杂的内容以防止 XSS。

  在4.11.3以后实现了更完善的处理方案，[参考](https://imzbf.github.io/md-editor-v3/zh-CN/demo#%F0%9F%94%8F%20%E4%BF%AE%E6%94%B9%20xss%20%E9%85%8D%E7%BD%AE)

  !!!

  使用\`sanitize-html\`演示

  \`\`\`vue
  <template>
    <MdEditor :sanitize="sanitize" />
  </template>

  <script setup>
  import sanitizeHtml from 'sanitize-html';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const sanitize = (html) => sanitizeHtml(html);
  <\/script>
  \`\`\`

---

### 🤞🏼 noIconfont

- **类型**：\`boolean\`
- **默认值**：\`false\`

  不插入 iconfont 链接，你可以下载[Symbol版本](\${iconfontSvgUrl})或者[Font class版本](\${iconfontClassUrl})到本地自行引入。

  \`\`\`js
  import '/assets/iconfont.js';

  // 使用Font class版本
  // import { config } from 'md-editor-v3';
  // import '/assets/iconfont.css';
  // config({ iconfontType: 'class' })
  \`\`\`

  \`\`\`vue
  <template>
    <MdEditor noIconfont />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  <\/script>
  \`\`\`

---

### 💅 formatCopiedText

- **类型**：\`(text: string) => string\`
- **默认值**：\`(text) => text\`

  格式化复制代码

  \`\`\`vue
  <template>
    <MdEditor :formatCopiedText="formatCopiedText" />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const formatCopiedText = (text) => {
    return \`\${text}  - from md-editor-v3\`;
  };
  <\/script>
  \`\`\`

---

### 🛁 codeStyleReverse

- **类型**：\`boolean\`
- **默认值**：\`true\`

  某些预览主题的代码模块背景是暗色系，将这个属性设置为 true，会自动在该主题下的 light 模式下使用暗色系的代码风格。

---

### 🧼 codeStyleReverseList

- **类型**：\`Array\`
- **默认值**：\`['default', 'mk-cute']\`

  需要自动调整的预览主题，已默认包含 default、mk-cute。

---

### 🕊 noHighlight

- **类型**：\`boolean\`
- **默认值**：\`false\`

  不高亮代码，也不会加载相应的扩展库

---

### 🕊 noImgZoomIn

- **类型**：\`boolean\`
- **默认值**：\`false\`

  是否关闭编辑器默认的放大功能

  \`\`\`html
  <MdEditor noImgZoomIn />
  \`\`\`

  在\`4.15.4\`以后，也可以设置\`.not-zoom\`来禁用它

  \`\`\`markdown
  <img class="not-zoom">
  \`\`\`

---

### 😬 customIcon

- **类型**：\`CustomIcon\`
- **默认值**：\`{}\`

  自定义的图标

  !!! warning 类型提示

  copy、collapse-tips 对应的图标只能是字符串，其他的都可以是组件或者字符串

  !!!

  \`\`\`vue
  <template>
    <MdEditor :customIcon="customIcon" />
  </template>

  <script 😬setup lang="ts">
  import type { CustomIcon } from 'md-editor-v3';
  import { MdEditor, StrIcon } from 'md-editor-v3';
  // 假设你使用了三方图标库或者自定义了图标组件
  import { IconFont } from 'tdesign-icons-vue-next';
  import 'md-editor-v3/lib/style.css';

  const customIcon: CustomIcon = {
    bold: {
      component: 'A'
    },
    // 演示使用默认图标复制内容
    copy: StrIcon('copy', {}),
    // copy: '<i class="fa fa-car"></i>',
    // 'collapse-tips': '<i class="fa fa-car"></i>',
    preview: {
      component: '<i class="fa fa-car"></i>'
    },
    github: {
      component: IconFont,
      props: {
        name: 'sneer'
      }
    }
  };
  <\/script>
  \`\`\`

  类型\`CustomIcon\`

  \`\`\`ts
  type IconName =
    | 'bold'
    | 'underline'
    | 'italic'
    | 'strike-through'
    | 'title'
    | 'sub'
    | 'sup'
    | 'quote'
    | 'unordered-list'
    | 'ordered-list'
    | 'task'
    | 'code-row'
    | 'code'
    | 'link'
    | 'image'
    | 'table'
    | 'revoke'
    | 'next'
    | 'baocun'
    | 'prettier'
    | 'suoxiao'
    | 'fangda'
    | 'fullscreen-exit'
    | 'fullscreen'
    | 'preview'
    | 'coding'
    | 'catalog'
    | 'github'
    | 'mermaid'
    | 'formula'
    | 'close'
    | 'delete'
    | 'upload';

  type CustomIcon = {
    [key in IconName]?: {
      component: Component | JSX.Element | string;
      props: {
        [key: string | number | symbol]: any;
      };
    };
  } & {
    copy?: string;
  };
  \`\`\`

---

### 💅 sanitizeMermaid

- **类型**：\`(h: string) => Promise<string>\`
- **默认值**：\`(h: string) => Promise.resolve(h)\`

  转换生成的 mermaid 代码

---

### 🕹 codeFoldable

- **类型**：\`boolean\`
- **默认值**：\`true\`

  是否开启折叠代码功能

---

### ⏲ autoFoldThreshold

- **类型**：\`number\`
- **默认值**：\`30\`

  触发自动折叠代码的行数阈值

---

## 🔩 MdEditor Props

除去和\`MdPreivew\`相同的以外：

### 💻 pageFullscreen

- **类型**：\`boolean\`
- **默认值**：\`false\`

  页面内全屏。

---

### 📱 preview

- **类型**：\`boolean\`
- **默认值**：\`true\`

  是否显示预览。

---

### 📀 htmlPreview

- **类型**：\`boolean\`
- **默认值**：\`false\`

  是否显示 html 预览。当设置为\`true\`时，需要将\`preview\`设置为\`false\`

  \`\`\`jsx
  <MdEditor htmlPreview preview={false} />
  \`\`\`

---

### 🧱 toolbars

- **类型**：\`Array\`
- **默认值**：\`[all]\`

  选择性展示工具栏，可选内容见下方。

  你可以随意排序工具栏，通过\`'-'\`分割两个工具，通过\`'='\`实现左右放置！

  从 v1.10.0 开始，你可以自定义工具栏，将\`defToolbars\`中自定义工具项的下标穿插在\`toolbars\`实现展示（这并不规范）

  _[all]_

  \`\`\`js
  [
    'bold',
    'underline',
    'italic',
    '-',
    'title',
    'strikeThrough',
    'sub',
    'sup',
    'quote',
    'unorderedList',
    'orderedList',
    'task',
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
    'previewOnly',
    'htmlPreview',
    'catalog',
    'github'
  ];
  \`\`\`

---

### 🧱 toolbarsExclude

- **类型**：\`Array\`
- **默认值**：\`[]\`

  选择性不展示工具栏，内容同上。

---

### 🪒 noPrettier

- **类型**：\`boolean\`
- **默认值**：\`false\`

  是否启用 prettier 优化 md 内容。

---

### 🤏 tabWidth

- **类型**：\`number\`
- **默认值**：\`2\`

  编辑器一个 TAB 键等于空格数。

---

### 📅 tableShape

- **类型**：\`[number, number] \\| [number, number, number, number]\`
- **默认值**：\`[6, 4]\`

  标题栏添加表格时，预设待选表格大小，第一个代表最大列数，第二个代表最大行数，第三个代表扩展最大列数，第四个代表扩展最大行数。

  \`\`\`vue
  <template>
    <MdEditor :tableShape="tableShape" />
  </tempale>

  <script setup>
  const tableShape = [8, 4];
  <\/script>
  \`\`\`

  ![表格预设大小预览](https://imzbf.github.io/md-editor-v3/imgs/20211216165424.png)

---

### 🪧 placeholder

- **类型**：\`string\`
- **默认值**：\`''\`

  啊这-\\_-！

---

### 🦶 footers

- **类型**：\`Array<'markdownTotal' | '=' | 'scrollSwitch' | number>\`
- **默认值**：\`['markdownTotal', '=', 'scrollSwitch']\`

  页脚显示内容，\`'='\`左右分割，设置为\`[]\`不显示页脚。

---

### ⛵️ scrollAuto

- **类型**：\`boolean\`
- **默认值**：\`true\`

  默认左右同步滚动状态。

---

### 🥹 noUploadImg

- **类型**：\`boolean\`
- **默认值**：\`false\`

  工具栏不显示上传图片入口。

  \`\`\`vue
  <template>
    <MdEditor noUploadImg />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  <\/script>
  \`\`\`

---

### 🔬 autoFocus

- **类型**：\`boolean\`
- **默认值**：\`false\`

  原生属性，文本区域自动获得焦点。

---

### 🔩 disabled

- **类型**：\`boolean\`
- **默认值**：\`false\`

  原生属性，禁用文本区域。

---

### 🔒 readOnly

- **类型**：\`boolean\`
- **默认值**：\`false\`

  原生属性，文本区域为只读。

---

### 📏 maxLength

- **类型**：\`number\`
- **默认值**：\`\`

  原生属性，文本区域允许的最大字符数。

---

### 📥 autoDetectCode

- **类型**：\`boolean\`
- **默认值**：\`false\`

  是否启用自动识别粘贴代码类别，目前仅支持从\`vscode\`复制的内容。

---

### 📝 completions

- **类型**：\`Array<CompletionSource>\`
- **默认值**：\`[]\`

  添加额外的输入自动完成来源。

  \`\`\`vue
  <template>
    <MdEditor v-model="text" :completions="completions" />
  </template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import { CompletionSource } from '@codemirror/autocomplete';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const text = ref('');

  const completions = ref<Array<CompletionSource>>([
    (context) => {
      const word = context.matchBefore(/@\\w*/);

      if (word === null || (word.from == word.to && context.explicit)) {
        return null;
      }

      return {
        from: word.from,
        options: [
          {
            label: '@imzbf',
            type: 'text'
          }
        ]
      };
    }
  ]);
  <\/script>
  \`\`\`

---

### 📥 showToolbarName

- **类型**：\`boolean\`
- **默认值**：\`false\`

  是否在工具栏下面显示对应的文字名称

![](https://imzbf.github.io/md-editor-v3/imgs/showToolbarName.jpg)

---

### 📥 inputBoxWitdh

- **类型**：\`string\`
- **默认值**：\`50%\`

  输入框默认的宽度

![](https://imzbf.github.io/md-editor-v3/imgs/drag-width.jpg)

---

### 🪒 transformImgUrl

- **类型**：\`(imgUrl: string) => string | Promise<string>\`
- **默认值**：\`t => t\`

  转换图片链接

---

## 🎍 插槽

### 🪶 defToolbars

自定义工具栏插槽，通过使用内置的\`NormalToolbar\`普通点击触发事件组件，\`DropdownToolbar\`下拉点击触发事件组件和\`ModalToolbar\`弹窗触发事件组件进行扩展。将\`defToolbars\`插槽中的组件下标穿插在\`toolbars\`实现展示（这并不规范）。

- Setup 模板

  \`\`\`vue
  <template>
    <MdEditor :toolbars="toolbars">
      <template #defToolbars>
        <NormalToolbar title="mark" @onClick="handler">
          <template #trigger>
            <svg class="md-editor-icon" aria-hidden="true">
              <use xlink:href="#icon-mark"></use>
            </svg>
          </template>
        </NormalToolbar>
      </template>
    </MdEditor>
  </template>

  <script setup>
  import { MdEditor, NormalToolbar } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const toolbars = ['bold', '-', 0, '=', 'github'];

  const handler = () => {
    console.log('NormalToolbar clicked!');
  };
  <\/script>
  \`\`\`

- Jsx 模板

  \`\`\`jsx
  import { defineComponent } from 'vue';
  import { MdEditor, NormalToolbar } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const toolbars = ['bold', '-', 0, '=', 'github'];

  export default defineComponent({
    setup() {
      return () => (
        <MdEditor
          toolbars={toolbars}
          defToolbars={
            <>
              <NormalToolbar
                trigger={
                  <svg class="md-editor-icon" aria-hidden="true">
                    <use xlinkHref="#icon-strike-through" />
                  </svg>
                }
              />
            </>
          }
        />
      );
    }
  });
  \`\`\`

![普通扩展工具栏](https://imzbf.github.io/md-editor-v3/imgs/normal-toolbar.gif)

![下拉扩展工具栏](https://imzbf.github.io/md-editor-v3/imgs/dropdown-toolbar.gif)

扩展组件属性参考**内置组件**，使用示例参见[文档分支](https://github.com/imzbf/md-editor-v3/tree/docs/src/components)，提供**标记**、**表情**和**弹窗预览**扩展组件。

---

### 🦿 defFooters

自定义扩展页脚

- Setup 模板

  \`\`\`vue
  <template>
    <MdEditor :footers="footers">
      <template #defFooters>
        <span>￥_￥</span>
        <span>^_^</span>
      </template>
    </MdEditor>
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  // 将插槽中的组件下标放到对应的位置即可显示
  const footers = ['markdownTotal', 0, '=', 1, 'scrollSwitch'];
  <\/script>
  \`\`\`

- Jsx 模板

  \`\`\`jsx
  import { defineComponent } from 'vue';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const footers = ['markdownTotal', 0, '=', 1, 'scrollSwitch'];

  export default defineComponent({
    setup() {
      return () => (
        <MdEditor
          footers={footers}
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
  \`\`\`

![](https://imzbf.github.io/md-editor-v3/imgs/footer.png)

---

## 🧵 MdPreview 绑定事件

### 🚁 onHtmlChanged

- **类型**：\`(h: string) => void\`

  html 变化回调事件，用于获取预览 html 代码。

---

### 🗒 onGetCatalog

- **类型**：\`(list: HeadList[]) => void\`

  动态获取\`markdown\`目录。

---

## 🪢 MdEditor 绑定事件

除去和\`MdPreivew\`相同的以外：

### 📞 onChange

- **类型**：\`(v: string) => void\`

  内容变化事件（当前与\`textarea\`的\`oninput\`事件绑定，每输入一个单字即会触发）。

---

### 💾 onSave

- **类型**：\`(v: string, h: Promise<string>) => void\`

  保存事件，快捷键与保存按钮均会触发。

  \`\`\`vue
  <template>
    <MdEditor @onSave="onSave" />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const onSave = (v, h) => {
    console.log(v);

    h.then((html) => {
      console.log(html);
    });
  };
  <\/script>
  \`\`\`

---

### 📸 onUploadImg

- **类型**：\`files: Array<File>, callback: (urls: string[] | { url: string; alt: string; title: string }[]) => void\`

  上传图片事件，弹窗会等待上传结果，务必将上传后的 urls 作为 callback 入参回传。

  \`\`\`vue
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

    // 方式一
    callback(res.map((item) => item.data.url));

    // 方式二
    // callback(
    //   res.map((item: any) => ({
    //     url: item.data.url,
    //     alt: 'alt',
    //     title: 'title'
    //   }))
    // );
  };
  <\/script>
  \`\`\`

---

### 💀 onError

- **类型**：\`(err: { name: 'Cropper' \\| 'fullscreen' \\| 'prettier' \\| 'overlength'; message: string }) => void\`

  捕获执行错误事件，目前支持\`Cropper\`、\`fullscreen\`、\`prettier\`实例未加载完成操作，以及输入内容超出限制长度的错误。

  \`\`\`vue
  <template>
    <MdEditor @onError="onError" />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const onError = (err) => {
    alert(err.message);
  };
  <\/script>
  \`\`\`

---

### 🐾 onBlur

- **类型**：\`(event: FocusEvent) => void\`

  输入框失去焦点时触发事件。

  \`\`\`vue
  <template>
    <MdEditor @onBlur="onBlur" />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const onBlur = (e) => {
    console.log('onBlur', e);
  };
  <\/script>
  \`\`\`

---

### 🔖 onFocus

- **类型**：\`(event: FocusEvent) => void\`

  输入框获得焦点时触发事件。

---

### 🔖 onInput

- **类型**：\`(event: Event) => void\`

  输入框键入内容事件。

---

### 🔖 onDrop

- **类型**：\`(event: DragEvent) => void\`

  拖放内容事件。

  \`\`\`vue
  <template>
    <MdEditor v-model="text" @onDrop="onDrop" />
  </template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const text = ref('');

  const onDrop = (e: DragEvent) => {
    e.stopPropagation();
    console.log('ee', e.dataTransfer?.files[0]);
  };
  <\/script>
  \`\`\`

---

### 🔖 onInputBoxWitdhChange

- **类型**：\`(width: string) => void\`

  调整输入框宽度事件

---

## 🤱🏼 实例暴露

2.5.0 版本之后，编辑器暴露了若干方法在组件实例上，用来快捷监听编辑器内部状态或对调整内部状态。

\`\`\`vue
<template>
  <MdEditor ref="editorRef" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MdEditor } from 'md-editor-v3';
import type { ExposeParam } from 'md-editor-v3';

//
// import type { ExposePreviewParam } from 'md-editor-v3';

import 'md-editor-v3/lib/style.css';

const editorRef = ref<ExposeParam>();

onMounted(() => {
  editorRef.value?.on('catalog', console.log);
});
<\/script>
\`\`\`

| Name                 | MdEditor | MdPreview |
| -------------------- | -------- | --------- |
| on                   | √        | ×         |
| togglePageFullscreen | √        | ×         |
| toggleFullscreen     | √        | ×         |
| togglePreview        | √        | ×         |
| togglePreviewOnly    | √        | ×         |
| toggleHtmlPreview    | √        | ×         |
| toggleCatalog        | √        | ×         |
| triggerSave          | √        | ×         |
| insert               | √        | ×         |
| focus                | √        | ×         |
| rerender             | √        | √         |
| getSelectedText      | √        | ×         |
| resetHistory         | √        | ×         |

### 👂🏼 on

监听编辑器内部状态，包括：屏幕全屏、浏览器全屏、预览文本、预览 html、目录等。

- pageFullscreen

  \`\`\`js
  editorRef.value?.on('pageFullscreen', (status) => console.log(status));
  \`\`\`

- fullscreen

  \`\`\`js
  editorRef.value?.on('fullscreen', (status) => console.log(status));
  \`\`\`

- preview

  \`\`\`js
  editorRef.value?.on('preview', (status) => console.log(status));
  \`\`\`

- previewOnly

  \`\`\`js
  editorRef.value?.on('previewOnly', (status) => console.log(status));
  \`\`\`

- htmlPreview

  \`\`\`js
  editorRef.value?.on('htmlPreview', (status) => console.log(status));
  \`\`\`

- catalog

  \`\`\`js
  editorRef.value?.on('catalog', (status) => console.log(status));
  \`\`\`

---

### 💻 togglePageFullscreen

切换页面内全屏。

\`\`\`js
editorRef.value?.togglePageFullscreen(true);
\`\`\`

> 不设置入参切换为相反状态

---

### 🖥 toggleFullscreen

切换屏幕全屏。

\`\`\`js
editorRef.value?.toggleFullscreen(true);
\`\`\`

> 不设置入参切换为相反状态

---

### 📖 togglePreview

切换是否显示预览。

\`\`\`js
editorRef.value?.togglePreview(true);
\`\`\`

> 不设置入参切换为相反状态

---

### 📖 togglePreviewOnly

切换仅预览状态。

\`\`\`js
editorRef.value?.togglePreviewOnly(true);
\`\`\`

> 不设置入参切换为相反状态

---

### 📼 toggleHtmlPreview

切换是否显示 html 预览。

\`\`\`js
editorRef.value?.toggleHtmlPreview(true);
\`\`\`

> 不设置入参切换为相反状态

---

### 🧬 toggleCatalog

切换是否显示目录。

\`\`\`js
editorRef.value?.toggleCatalog(true);
\`\`\`

> 不设置入参切换为相反状态

---

### 💾 triggerSave

触发保存。

\`\`\`js
editorRef.value?.triggerSave();
\`\`\`

---

### 💉 insert

手动向文本框插入内容。

\`\`\`js
/**
 * @params selectedText 选中的内容
 */
editorRef.value?.insert((selectedText) => {
  /**
   * @return targetValue    待插入内容
   * @return select         插入后是否自动选中内容，默认：true
   * @return deviationStart 插入后选中内容鼠标开始位置，默认：0
   * @return deviationEnd   插入后选中内容鼠标结束位置，默认：0
   */
  return {
    targetValue: \`\${selectedText}\`,
    select: true,
    deviationStart: 0,
    deviationEnd: 0
  };
});
\`\`\`

---

### 🎯 focus

手动聚焦输入框。

\`\`\`ts
import type { FocusOption } from 'md-editor-v3';

const option: FocusOption | undefined = 'start';

// 聚焦时光标的位置，不提供默认上次失焦时的位置
editorRef.value?.focus(option);
\`\`\`

\`\`\`ts
type FocusOption =
  | 'start'
  | 'end'
  | {
      // 选中的开始位置，默认光标位置
      rangeAnchor?: number;
      // 选中的结束位置，默认光标位置
      rangeHead?: number;
      // 光标的位置
      cursorPos: number;
    };
\`\`\`

---

### ✒️ rerender

手动重新渲染内容。

\`\`\`js
editorRef.value?.rerender();
\`\`\`

---

### 🔍 getSelectedText

获取当前选中的文字。

\`\`\`js
console.log(editorRef.value?.getSelectedText());
\`\`\`

---

### 🗑 resetHistory

清除当前的历史记录。

---

### 🎛 domEventHandlers

支持监听全部的dom事件。

\`\`\`js
editorRef.value?.domEventHandlers({
  compositionstart: () => {
    console.log('compositionstart');
  }
});
\`\`\`

---

### 🎛 execCommand

通过触发器向编辑器插入内容。

\`\`\`js
editorRef.value?.execCommand('bold');
\`\`\`

---

### 🔖 getEditorView

获取 codemirror 实例。

---

## 💴 配置编辑器

使用\`config(option: ConfigOption)\`方法，可以对构建实例进行定制。

!!! warning

我们建议你在项目入口配置，例如 vite 创建的项目中的 main.js。不要在组件中去调用 \`config\` ！

!!!

### 🦪 codeMirrorExtensions

根据主题和内部默认的 codeMirror 扩展自定义新的扩展。

\`\`\`ts
type CodeMirrorExtensions = (
  theme: Themes,
  extensions: Array<Extension>,
  keyBindings: Array<KeyBinding>,
  options: {
    editorId: string;
  }
) => Array<Extension>;
\`\`\`

使用示例：编辑器默认不显示输入框的行号，需要手动添加扩展

\`\`\`js
import { config } from 'md-editor-v3';
import { lineNumbers } from '@codemirror/view';

config({
  codeMirrorExtensions(_theme, extensions) {
    return [...extensions, lineNumbers()];
  }
});
\`\`\`

---

### 🍤 markdownItConfig

自定义 markdown-it 核心库扩展、属性等。

\`\`\`ts
type MarkdownItConfig = (
  md: markdownit,
  options: {
    editorId: string;
  }
) => void;
\`\`\`

使用示例：配置使用\`markdown-it-anchor\`并在标题右侧显示一个超链接符号

\`\`\`js
import { config } from 'md-editor-v3';
import ancher from 'markdown-it-anchor';

config({
  markdownItConfig(mdit) {
    mdit.use(ancher, {
      permalink: true
    });
  }
});
\`\`\`

---

### 🍤 markdownItPlugins

挑选、新增 markdown-it 核心库已预设的扩展。

\`\`\`ts
type MarkdownItPlugins = (
  plugins: Array<MarkdownItConfigPlugin>,
  options: {
    editorId: string;
  }
) => Array<MarkdownItConfigPlugin>;
\`\`\`

使用示例：修改图片的类名

\`\`\`js
import { config } from 'md-editor-v3';

config({
  markdownItPlugins(plugins) {
    return plugins.map((p) => {
      if (p.type === 'image') {
        return {
          ...p,
          options: {
            ...p.options,
            classes: 'my-class'
          }
        };
      }

      return p;
    });
  }
});
\`\`\`

---

### 🍙 editorConfig

编辑器常规配置，语言、\`mermaid\`默认模板、渲染延迟：

#### 🍚 languageUserDefined

\`\`\`js
import { config } from 'md-editor-v3';

config({
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
          previewOnly: '仅预览',
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
\`\`\`

#### 🍘 mermaidTemplate

\`\`\`js
import { config } from 'md-editor-v3';

config({
  editorConfig: {
    // mermaid模板
    mermaidTemplate: {
      // 流程图
      flow: \`flow tempalte\`,
      // 时序图
      sequence: \`sequence template\`,
      // 甘特图
      gantt: \`gantt template\`,
      // 类图
      class: \`class template\`,
      // 状态图
      state: \`state template\`,
      // 饼图
      pie: \`pie template\`,
      // 关系图
      relationship: \`relationship template\`,
      // 旅程图
      journey: \`journey template\`
    }
  }
});
\`\`\`

#### 🍥 renderDelay

\`\`\`js
import { config } from 'md-editor-v3';

config({
  editorConfig: {
    // 输入渲染延迟（ms）
    renderDelay: 0
  }
});
\`\`\`

---

#### 🍥 zIndex

\`\`\`js
import { config } from 'md-editor-v3';

config({
  editorConfig: {
    // 内部弹窗的zIndex
    zIndex: 2000
  }
});
\`\`\`

---

### 🥠 editorExtensions

类型如下，用于配置编辑器内部的扩展

\`\`\`typescript
import { config } from 'md-editor-v3';

config({
  editorExtensions: { iconfont: 'https://xxx.cc' }
});
\`\`\`

\`\`\`ts
export interface EditorExtensions {
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
\`\`\`

---

### 🥠 editorExtensionsAttrs

同步添加CDN链接标签的上属性，类型与\`editorExtensions\`一直，值类型是\`HTMLElementTagNameMap<script|link>\` 内部提供所有链接的\`integrity\`值，使用方式如下：

\`\`\`js
import { config } from 'md-editor-v3';

config({
  editorExtensionsAttrs: {
    highlight: {
      js: {
        className: 'hglh-js'
      },
      css: {
        atom: {
          light: {
            className: 'atom-light-css'
          },
          dark: {
            className: 'atom-dark-css'
          }
        }
      }
    }
  }
});
\`\`\`

使用内置的基础属性配置示例：

\`\`\`js
import { config, editorExtensionsAttrs } from 'md-editor-v3';

config({
  editorExtensionsAttrs
});
\`\`\`

!!! warning 提醒

不要尝试在editorExtensionsAttrs定义script的src\\onload\\id，link的rel\\href\\id它们会被默认值覆盖

!!!

---

### 🫨 iconfontType

固定使用那种方式展示图标，可以切换展示的方式

- \`svg\`: symbol 方式
- \`class\`: font-class 方式

如果通过属性\`customIcon\`自定义的图标，会优先使用自定义的。

这通常可以用来规避 symbol 方式不兼容的问题。

\`\`\`js
import { config } from 'md-editor-v3';

config({
  iconfontType: 'class'
});
\`\`\`

---

### 🎨 mermaidConfig

mermaid 配置项，[配置详情](https://mermaid.js.org/config/schema-docs/config.html)

\`\`\`js
import { config } from 'md-editor-v3';
config({
  mermaidConfig(base: any) {
    return {
      ...base,
      logLevel: 'error'
    };
  }
});
\`\`\`

---

### 🔧 katexConfig

katex 配置项，[配置详情](https://katex.org/docs/options)

\`\`\`js
import { config } from 'md-editor-v3';

config({
  katexConfig(base: any) {
    return {
      ...base,
      strict: false
    };
  }
});
\`\`\`

---

## 🪡 快捷键

主要以\`CTRL\`搭配对应功能英文单词首字母，冲突项添加\`SHIFT\`，再冲突替换为\`ALT\`。

!!! warning 注意事项

快捷键仅在输入框获取到焦点时可用！

!!!

| 键位 | 功能 | 说明 |
| --- | --- | --- |
| TAB | 空格 | 通过\`tabWidth\`属性预设 TAB 键位新增空格长度，默认 2，支持多行 |
| SHIFT + TAB | 取消空格 | 同上，一次取消两个空格，支持多行 |
| CTRL + C | 复制 | 选中时复制选中内容，未选中时复制当前行内容 |
| CTRL + X | 剪切 | 选中时剪切选中内容，未选中时剪切当前行 |
| CTRL + D | 删除 | 选中时删除选中内容，未选中时删除当前行 |
| CTRL + S | 保存 | 触发编辑器的\`onSave\`回调 |
| CTRL + B | 加粗 | \`**加粗**\` |
| CTRL + U | 下划线 | \`<u>下划线</u>\` |
| CTRL + I | 斜体 | \`*斜体*\` |
| CTRL + 1-6 | 1-6 级标题 | \`# 标题\` |
| CTRL + ↑ | 上角标 | \`<sup>上角标</sup>\` |
| CTRL + ↓ | 下角标 | \`<sub>下角标</sub>\` |
| CTRL + O | 有序列表 | \`1. 有序列表\` |
| CTRL + L | 链接 | \`[链接](https://github.com/imzbf)\` |
| CTRL + Z | 撤回 | 触发编辑器内内容撤回，与系统无关 |
| CTRL + F | 查找替换 |  |
| CTRL + SHIFT + S | 删除线 | \`~删除线~\` |
| CTRL + SHIFT + U | 无序列表 | \`- 无序列表\` |
| CTRL + SHIFT + C | 块级代码 | 多行代码块 |
| CTRL + SHIFT + I | 图片链接 | \`![图片](https://github.com/imzbf)\` |
| CTRL + SHIFT + Z | 前进一步 | 触发编辑器内内容前进，与系统无关 |
| CTRL + SHIFT + F | 美化内容 |  |
| CTRL + ALT + C | 行内代码 | 行内代码块 |
| CTRL + SHIFT + ALT + T | 表格 | \`\\|表格\\|\` |

## 🪤 内置组件

按需引用编辑器的扩展组件，例如：\`import { DropdownToolbar } from 'md-editor-v3'\`。

!!! info 内置属性提示

为了帮助开发者快速插入和使用编辑器的属性，编辑器组件已经默认向编写的扩展组件添加了下面的属性的值：

| 名称 | 使用示例 |
| --- | --- |
| insert | 参考下方的\`DropdownToolbar\`组件示例 |
| theme | 参考扩展组件中的[ExportPDF](https://github.com/imzbf/md-editor-extension/blob/main/packages/v3/components/ExportPDF/ExportPDF.tsx#L94) |
| previewtheme | 同上 |
| language | 同上 |

!!!

### 🐣 NormalToolbar

- **props**

  - \`title\`: \`string\`，非必须，作为工具栏上的 hover 提示。

- **events**

  - \`onClick\`: \`(e: MouseEvent) => void\`，必须，点击事件。

- **slots**

  - \`trigger\`: \`VNode | JSX.Element\`，必须，通常是个图标，用来展示在工具栏上。

\`\`\`vue
<template>
  <NormalToolbar title="mark" @onClick="handler">
    <template #trigger>
      <svg class="md-editor-icon" aria-hidden="true">
        <use xlink:href="#icon-mark"></use>
      </svg>
    </template>
  </NormalToolbar>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { NormalToolbar } from 'md-editor-v3';
import type { Insert } from 'md-editor-v3';

const props = defineProps({
  /**
   * \`insert\`方法会由编辑器自动向组件的组件注入。
   */
  insert: {
    type: Function as PropType<Insert>,
    default: () => {
      //
    }
  }
});

const handler = () => {
  props.insert((selectedText) => {
    /**
     * @return targetValue    待插入内容
     * @return select         插入后是否自动选中内容，默认：true
     * @return deviationStart 插入后选中内容鼠标开始位置，默认：0
     * @return deviationEnd   插入后选中内容鼠标结束位置，默认：0
     */
    return {
      targetValue: \`==\${selectedText}==\`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    };
  });
};
<\/script>
\`\`\`

\`\`\`vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars">
    <template #defToolbars>
      <MyToolbar />
    </template>
  </MdEditor>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import MyToolbar from './MyToolbar.vue';
import 'md-editor-v3/lib/style.css';

const text = ref('');
const toolbars = ['bold', 0, 'github'];
<\/script>
\`\`\`

[标记组件的源码](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/MarkExtension/index.vue)

---

### 🐼 DropdownToolbar

- **props**

  - \`title\`: \`string\`，非必须，作为工具栏上的 hover 提示。
  - \`visible\`: \`boolean\`，必须，下拉状态。

- **events**

  - \`onChange\`: \`(visible: boolean) => void\`，必须，状态变化事件。

- **slots**

  - \`trigger\`: \`VNode | JSX.Element\`，必须，通常是个图标，用来展示在工具栏上。
  - \`overlay\`: \`VNode | JSX.Element\`，必须，下拉框中的内容。

\`\`\`vue
<template>
  <DropdownToolbar title="emoji" :visible="visible" :onChange="onChange">
    <template #overlay>
      <div class="emoji-container">
        <ol class="emojis">
          <li
            v-for="(emoji, index) of emojis"
            :key="\`emoji-\${index}\`"
            @click="handler(emoji)"
            v-text="emoji"
          ></li>
        </ol>
      </div>
    </template>
    <template #trigger>
      <svg class="md-editor-icon" aria-hidden="true">
        <use xlink:href="#icon-emoji"></use>
      </svg>
    </template>
  </DropdownToolbar>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { DropdownToolbar } from 'md-editor-v3';
import type { Insert } from 'md-editor-v3';

const emojis = ['😀', '😃'];

const props = defineProps({
  /**
   * \`insert\`方法会由编辑器自动向组件的组件注入。
   */
  insert: {
    type: Function as PropType<Insert>,
    default: () => {
      //
    }
  }
});

const visible = ref(false);

const onChange = () => {
  visible.value = !visible.value;
};

const handler = (emoji: any) => {
  props.insert(() => {
    /**
     * @return targetValue    待插入内容
     * @return select         插入后是否自动选中内容，默认：true
     * @return deviationStart 插入后选中内容鼠标开始位置，默认：0
     * @return deviationEnd   插入后选中内容鼠标结束位置，默认：0
     */
    return {
      targetValue: emoji,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    };
  });
};
<\/script>
\`\`\`

\`\`\`vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars">
    <template #defToolbars>
      <MyToolbar />
    </template>
  </MdEditor>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import MyToolbar from './MyToolbar.vue';
import 'md-editor-v3/lib/style.css';

const text = ref('');
const toolbars = ['bold', 0, 'github'];
<\/script>
\`\`\`

[Emoji 组件的源码](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/EmojiExtension/index.vue)

---

### 🦉 ModalToolbar

- **props**

  - \`title\`: \`string\`，非必须，作为工具栏上的 hover 提示。
  - \`modalTitle\`: \`string\`，非必须，弹窗的标题。
  - \`visible\`: \`boolean\`，必须，弹窗显示状态。
  - \`width\`: \`string\`，非必须，弹窗宽度，默认\`auto\`。
  - \`height\`：\`string\`，同\`width\`。
  - \`showAdjust\`: \`boolean\`，非必须，是否显示弹窗全屏按钮。
  - \`isFullscreen\`: \`boolean\`，显示全屏按钮时必须，弹窗全屏状态。
  - \`class\`: \`string\`，\`^4.16.8\`，非必须，类名。
  - \`style\`: \`CSSProperties | string\`，\`^4.16.8\`，非必须，样式。
  - \`showMask\`: \`boolean\`，\`^4.16.8\`，非必须，是否展示遮罩层，默认true。

- **events**

  - \`onClick\`: \`() => void\`，必须，工具栏点击事件。
  - \`onClose\`：\`() => void\`，必须，弹窗点击关闭事件。
  - \`onAdjust\`：\`(val: boolean) => void\`，弹窗全屏按钮点击事件。

- **slots**

  - \`trigger\`: \`VNode | JSX.Element\`，必须，通常是个图标，用来展示在工具栏上。
  - \`default\`: \`VNode | JSX.Element\`，必须，弹窗中的内容。

\`\`\`vue
<template>
  <ModalToolbar
    :visible="data.modalVisible"
    :isFullscreen="data.modalFullscreen"
    showAdjust
    title="Preview"
    modalTitle="Page Preview"
    width="870px"
    height="600px"
    @onClick="data.modalVisible = true"
    @onClose="data.modalVisible = false"
    @onAdjust="data.modalFullscreen = !data.modalFullscreen"
  >
    <button @click="handler">Click me</button>
    <template #trigger>
      <svg class="md-editor-icon" aria-hidden="true">
        <use xlink:href="#icon-read"></use>
      </svg>
    </template>
  </ModalToolbar>
</template>

<script setup lang="ts">
import { PropType, reactive } from 'vue';
import { ModalToolbar } from 'md-editor-v3';
import type { Insert } from 'md-editor-v3';

const data = reactive({
  modalVisible: false,
  modalFullscreen: false
});

const props = defineProps({
  /**
   * \`insert\`方法会由编辑器自动向组件的组件注入。
   */
  insert: {
    type: Function as PropType<Insert>,
    default: () => {
      //
    }
  }
});

const handler = () => {
  props.insert((selectedText) => {
    /**
     * @return targetValue    待插入内容
     * @return select         插入后是否自动选中内容，默认：true
     * @return deviationStart 插入后选中内容鼠标开始位置，默认：0
     * @return deviationEnd   插入后选中内容鼠标结束位置，默认：0
     */
    return {
      targetValue: \`==\${selectedText}==\`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    };
  });
};
<\/script>
\`\`\`

\`\`\`vue
<template>
  <MdEditor v-model="text" :toolbars="toolbars">
    <template #defToolbars>
      <MyToolbar />
    </template>
  </MdEditor>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import MyToolbar from './MyToolbar.vue';
import 'md-editor-v3/lib/style.css';

const text = ref('');
const toolbars = ['bold', 0, 'github'];
<\/script>
\`\`\`

[阅读组件的源码](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/ReadExtension/index.vue)

---

### 🐻 MdCatalog

- **props**

  - \`editorId\`: \`string\`，必须，对应编辑器的\`editorId\`，在内部注册目录变化监听事件。
  - \`class\`: \`string\`，非必须，目录组件最外层类名。
  - \`mdHeadingId\`: \`mdHeadingId\`，非必须，特殊化编辑器标题的算法，与编辑器相同。
  - \`scrollElement\`: \`string | HTMLElement\`，非必须，为字符时应是一个元素选择器。仅预览模式中，整页滚动时，设置为\`document.documentElement\`。
  - \`theme\`: \`'light' | 'dark'\`，非必须，当需要切换主题时提供，同编辑器的\`theme\`。
  - \`offsetTop\`: \`number\`，非必须，标题距离顶部该像素时高亮当前目录项，默认 20 像素。
  - \`scrollElementOffsetTop\`: \`number\`，非必须，滚动区域的固定顶部高度，默认 0。

- **events**

  - \`onClick\`: \`(e: MouseEvent, t: TocItem) => void\`，非必须，导航点击事件。
  - \`onActive\`: \`(heading: HeadList | undefined) => void\`，非必须，高亮的标题变化事件。

> \`scrollElement\`说明：仅预览下，该元素必须已定位的并且支持滚动。

\`\`\`vue
<template>
  <!-- 保证editorId相同 -->
  <MdPreview :editorId="state.id" :modelValue="state.text" :theme="state.theme" />
  <MdCatalog :editorId="state.id" :scrollElement="scrollElement" :theme="state.theme" />
</template>

<script setup>
import { reactive } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const state = reactive({
  theme: 'dark',
  text: '标题',
  id: 'my-editor'
});

const scrollElement = document.documentElement;
<\/script>
\`\`\`

---

### 🛸 MdModal

编辑器内部的弹窗组件，它通常配合下拉工具栏组件使用。

- **props**

  - \`title\`: \`string\`，非必须，弹窗标题栏。
  - \`visible\`: \`boolean\`，必须，弹窗显示状态。
  - \`width\`: \`string\`，非必须，弹窗宽度，默认\`auto\`。
  - \`height\`: \`string\`，同\`width\`。
  - \`showAdjust\`: \`boolean\`，非必须，是否显示弹窗全屏按钮。
  - \`isFullscreen\`: \`boolean\`，显示全屏按钮时必须，弹窗全屏状态。
  - \`class\`: \`string\`，非必须，类名。
  - \`style\`: \`CSSProperties | string\`，非必须，样式。
  - \`showMask\`: \`boolean\`，\`^4.16.8\`，非必须，是否展示遮罩层，默认true。

- **events**

  - \`onClose\`: \`() => void\`，必须，弹窗点击关闭事件。
  - \`onAdjust\`: \`(val: boolean) => void\`，弹窗全屏按钮点击事件。

- **slots**

  - \`default\`: \`VNode | JSX.Element\`，必须，弹窗中的内容。

\`\`\`vue
<template>
  <DropdownToolbar title="emoji" :visible="state.visible" :onChange="onChange">
    <template #overlay>
      <ul>
        <li @click="state.mVisible = true">option 1</li>
        <li>option 2</li>
      </ul>
    </template>
    <template #trigger>
      <svg class="md-editor-icon" aria-hidden="true">
        <use xlink:href="#icon-emoji"></use>
      </svg>
    </template>
    <template #default>
      <MdModal title="title" :visible="state.mVisible" @onClose="onClose">
        Content, Content
      </MdModal>
    </template>
  </DropdownToolbar>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { DropdownToolbar, MdModal } from 'md-editor-v3';

const state = reactive({
  visible: false,
  mVisible: false
});

const onClose = () => {
  state.mVisible = !state.mVisible;
};

const onChange = () => {
  state.visible = !state.visible;
};
<\/script>
\`\`\`

---

## 🪤 内部配置

\`\`\`js
import {
  iconfontClassUrl,
  iconfontSvgUrl,
  allToolbar,
  allFooter,
  zh_CN,
  en_US
} from 'md-editor-v3';

console.log(iconfontClassUrl, iconfontSvgUrl, allToolbar, allFooter, zh_CN, en_US);
\`\`\`

## ✍️ 编辑此页面

[doc-zh-CN](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/doc-zh-CN.md)
`,b={class:"container"},y={class:"doc"},x={name:"DocPage"},P=d({...x,setup(w){const n=m(),e="doc-preview",t=c(o(n.state.lang==="en-US"?l:a,{iconfontSvgUrl:i,iconfontClassUrl:s}));return p(()=>n.state.lang,()=>{t.value=o(n.state.lang==="en-US"?l:a,{iconfontSvgUrl:i,iconfontClassUrl:s})}),(E,C)=>(u(),g("div",b,[f("div",y,[r(v,{editorId:e,modelValue:t.value},null,8,["modelValue"]),r(h,{editorId:e})])]))}});export{P as default};
