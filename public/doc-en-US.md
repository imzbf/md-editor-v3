> Use it online: [Go](https://codesandbox.io/s/epic-bird-2znqo).

## 🔖 MdPreview Props

This is the props of `MdPreview`, which is also part of `MdEditor`:

### 📃 modelValue

- **type**: `string`
- **default**: `''`

  Markdown content.

  ```vue
  <MdEditor v-model="xxx" />
  ```

---

### 🛍 theme

- **type**: `'light' | 'dark'`
- **default**: `'light'`

  Editor's theme.

  ```vue
  <MdEditor theme="dark" />
  ```

---

### 🎀 class

- **type**: `string`
- **default**: `''`

  ...

---

### 🔤 language

- **type**: `string`
- **default**: `'zh-CN'`

  Build-in language('zh-CN', 'en-US').

  You can install the existing language also: [md-editor-extension](https://github.com/imzbf/md-editor-extension). Refer to extension library for the usage and the way to contribute~

---

### 🎲 editorId

- **type**: `string`
- **default**: `'md-editor-v3'`

  Editor's id, also the html id, it is used when there are two or more editor and server render.

---

### 🔢 showCodeRowNumber

- **type**: `boolean`
- **default**: `false`

  Show row number for code block or not.

---

### 🔦 previewTheme

- **type**: `'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'`
- **default**: `'default'`

  Preview themes.

  Custom:

  1. Write css

  ```css
  .xxx-theme {
    color: red;
  }
  ```

  2. Set `previewTheme`

  ```vue
  <MdEditor previewTheme="xxx" />
  ```

  For more, refer to [markdown-theme](https://github.com/imzbf/markdown-theme).

---

### 🎅🏻 style

- **type**: `string | CSSProperties`
- **default**: `''`

  Editor's inline style.

---

### ☝️ noMermaid

- **type**: `boolean`
- **default**: `false`

  Do not want to use `mermaid`, set it to `true`.

  ```vue
  <MdEditor noMermaid />
  ```

---

### ❌ noKatex

- **type**: `boolean`
- **default**: `false`

  Do not want to use `katex`, set it to `true`.

  ```vue
  <MdEditor noKatex />
  ```

---

### 🦉 codeTheme

- **type**: `'atom'|'a11y'|'github'|'gradient'|'kimbie'|'paraiso'|'qtcreator'|'stackoverflow'`
- **default**: `'atom'`

  Highlight code css name. Get Them from `highlight.js`.

  Custom:

  1. Config `editorExtensions`

  ```js
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
  ```

  2. Set `codeTheme`

  ```vue
  <MdEditor codeTheme="xxx" />
  ```

---

### 🎱 mdHeadingId

- **type**: `(text: string, level: number, index: number) => string`
- **default**: `(text) => text`

  Heading `ID` generator.

  ```vue
  <template>
    <MdEditor :mdHeadingId="mdHeadingId" />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const mdHeadingId = (_text, _level, index) => `heading-${index}`;
  </script>
  ```

---

### 🐣 sanitize

- **type**: `(html: string) => string`
- **default**: `(html) => html`

  Sanitize the html, prevent XSS. When you can be sure that your content is OK, ignore this.

  !!! warning Pay Attention

  After 3.x, dangerous code has been processed by default. Please do not use this attribute unless there are special requirements

  !!!

  `sanitize-html` example:

  ```vue
  <template>
    <MdEditor :sanitize="sanitize" />
  </template>

  <script setup>
  import sanitizeHtml from 'sanitize-html';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const sanitize = (html) => sanitizeHtml(html);
  </script>
  ```

---

### 🤞🏼 noIconfont

- **type**: `boolean`
- **default**: `true`

  Not append iconfont script, [download](https://at.alicdn.com/t/c/font_2605852_u82y61ve02.js) and import it by yourself.

  ```vue
  <template>
    <MdEditor noIconfont />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  import '/assets/iconfont.js';
  </script>
  ```

---

### 💅 formatCopiedText

- **type**: `(text: string) => string`
- **default**: `(text) => text`

  Format copied code

  ```vue
  <template>
    <MdEditor :formatCopiedText="formatCopiedText" />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const formatCopiedText = (text) => {
    return `${text}  - from md-editor-v3`;
  };
  </script>
  ```

---

### 🛁 codeStyleReverse

- **type**: `boolean`
- **default**: `true`

  Code style will be reversed to dark while code block of the theme has a dark background.

---

### 🧼 codeStyleReverseList

- **type**: `Array`
- **default**: `['default', 'mk-cute']`

  Themes to be reversed.

---

### 🕊 noHighlight

- **type**: `boolean`
- **default**: `false`

  Highlight code or not.

---

### 🕊 noImgZoomIn

- **type**: `boolean`
- **default**: `false`

  Enable the function of enlarging images.

---

### 😬 customIcon

- **type**: `CustomIcon`
- **default**: `{}`

  Customized icons

  !!! warning Type Warning

  The icon corresponding to copy can only be a string, while others can be components or strings

  !!!

  ```vue
  <template>
    <MdEditor :customIcon="customIcon" />
  </template>

  <script 😬setup lang="ts">
  import type { CustomIcon } from 'md-editor-v3';
  import { MdEditor } from 'md-editor-v3';
  // Assuming you have installed an icon library or customized icon components
  import { IconFont } from 'tdesign-icons-vue-next';
  import 'md-editor-v3/lib/style.css';

  const customIcon: CustomIcon = {
    bold: {
      component: 'A'
    },
    // copy: '<i class="fa fa-car"></i>',
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
  </script>
  ```

  Type `CustomIcon`

  ```ts
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
  ```

---

### 💅 sanitizeMermaid

- **type**: `(h: string) => Promise<string>`
- **default**: `(h: string) => Promise.resolve(h)`

  Convert the generated mermaid code

---

### 🕹 codeFoldable

- **type**: `boolean`
- **default**: `true`

  Whether to enable code folding feature

---

### ⏲ autoFoldThreshold

- **type**: `number`
- **default**: `30`

  Threshold for triggering automatic code folding by line count

---

## 🔩 MdEditor Props

Except for the same as `MdPreview`:

### 💻 pageFullscreen

- **type**: `boolean`
- **default**: `false`

  Screenfull in web page.

---

### 📱 preview

- **type**: `boolean`
- **default**: `true`

  Preview content in editor.

---

### 📀 htmlPreview

- **type**: `boolean`
- **default**: `false`

  Preview html in editor. Set `preview` to `false` when `htmlPreview` is `true`.

  ```jsx
  <MdEditor htmlPreview preview={false} />
  ```

---

### 🧱 toolbars

- **type**: `Array`
- **default**: `[all]`

  Show contents of toolbar, all keys.

  You can sort the toolbar as you like, split tools by `'-'`, the left and right toolbars are divided by `'='`！

  After v1.10.0, you can customize the toolbar. To display them, put index of `defToolbars` into `toolbars`(this is not standard)

  _[all]_

  ```js
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
  ```

---

### 🧱 toolbarsExclude

- **type**: `Array`
- **default**: `[]`

  Don't show contents of toolbar.

---

### 🪒 noPrettier

- **type**: `boolean`
- **default**: `false`

  Use prettier to beautify content or not.

---

### 🤏 tabWidth

- **type**: `number`
- **default**: `2`

  One tab eq some space.

---

### 📅 tableShape

- **type**: `[number, number] \| [number, number, number, number]`
- **default**: `[6, 4]`

  Preset the size of the table, [columns, rows, Maximum number of columns, Maximum number of rows]

  ```vue
  <MdEditor :tableShape="[8, 4]" />
  ```

  ![Preview](https://imzbf.github.io/md-editor-v3/imgs/20211216165424.png)

---

### 🪧 placeholder

- **type**: `string`
- **default**: `''`

  em-\_-！

---

### 🦶 footers

- **type**: `Array<'markdownTotal' \| '=' \| 'scrollSwitch' \| number>`
- **default**: `['markdownTotal', '=', 'scrollSwitch']`

  Show contents of footer, they are divided by `'='`. Set it to [] to hidden footer.

---

### ⛵️ scrollAuto

- **type**: `boolean`
- **default**: `true`

  Scroll default setting.

---

### 🥹 noUploadImg

- **type**: `boolean`
- **default**: `false`

  Not show the entrance to upload pictures

  ```vue
  <MdEditor noUploadImg />
  ```

---

### 🔬 autoFocus

- **type**: `boolean`
- **default**: `false`

  Same as `autofocus` in native textarea.

---

### 🔩 disabled

- **type**: `boolean`
- **default**: `false`

  Same as `disabled` in native textarea.

---

### 🔒 readOnly

- **type**: `boolean`
- **default**: `false`

  Same as `readonly` in native textarea.

---

### 📏 maxLength

- **type**: `number`
- **default**: ``

  Same as `maxlength` in native textarea.

---

### 📥 autoDetectCode

- **type**: `boolean`
- **default**: `false`

  Auto detect the type of pasted code, only support that copied from `vscode`.

---

### 📝 completions

- **type**: `Array<CompletionSource>`
- **default**: `[]`

  Additional completion sources.

  ```vue
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
      const word = context.matchBefore(/@\w*/);

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
  </script>
  ```

---

### 📥 showToolbarName

- **type**: `boolean`
- **default**: `false`

  Show toolbar name or not

![](https://imzbf.github.io/md-editor-v3/imgs/showToolbarName.jpg)

---

### 📥 inputBoxWitdh

- **type**: `string`
- **default**: `50%`

  Default width of input box

![](https://imzbf.github.io/md-editor-v3/imgs/drag-width.jpg)

---

### 📥 transformImgUrl

- **type**: `(imgUrl: string) => string | Promise<string>`
- **default**: `t => t`

  Transform image links

---

## 🎍 slots

### 💪 defToolbars

Custom toolbar in `DropdownToolbar`, `NormalToolbar` or `ModalToolbar`.

- Setup Template

  ```vue
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
  </script>
  ```

- Jsx Template

  ```jsx
  import { defineComponent } from 'vue';
  import { MdEditor, NormalToolbar } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  export default defineComponent({
    setup() {
      return () => (
        <MdEditor
          toolbars={['bold', '-', 0, '=', 'github']}
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
  ```

![NormalToolbar](https://imzbf.github.io/md-editor-v3/imgs/normal-toolbar.gif)

![DropdownToolbar](https://imzbf.github.io/md-editor-v3/imgs/dropdown-toolbar.gif)

For more info, Get **Internal Components** heading. Get source code of **mark**, **emoji** and **modal preview** at [docs](https://github.com/imzbf/md-editor-v3/tree/docs/src/components) branch.

---

### 🦿 defFooters

- Setup Template

  ```vue
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
  </script>
  ```

- Jsx Template

  ```jsx
  import { defineComponent } from 'vue';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  export default defineComponent({
    setup() {
      return () => (
        <MdEditor
          footers={['markdownTotal', 0, '=', 1, 'scrollSwitch']}
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
  ```

![](https://imzbf.github.io/md-editor-v3/imgs/footer.png)

---

## 🧵 MdPreview Events

### 🚁 onHtmlChanged

- **type**: `(h: string) => void`

  Compile markdown successful event, ou can use it to get the html code.

---

### 🗒 onGetCatalog

- **type**: `(list: HeadList[]) => void`

  Get catalogue of article.

---

## 🪢 MdEditor Events

Except for the same as `MdPreview`:

### 📞 onChange

- **type**: `(v: string) => void`

  Content changed event(bind to `oninput` of `textarea`).

---

### 💾 onSave

- **type**: `(v: string, h: Promise<string>) => void`

  Saving content event, `ctrl+s` and clicking button will trigger it.

  ```vue
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
  </script>
  ```

---

### 📸 onUploadImg

- **type**: `files: Array<File>, callback: (urls: string[] | { url: string; alt: string; title: string }[]) => void`

  Uploading picture event, when picture is uploading the modal will not close, please provide right urls to the callback function.

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
  </script>
  ```

---

### 💀 onError

- **type**: `(err: { name: 'Cropper' \| 'fullscreen' \| 'prettier' \| 'overlength'; message: string }) => void`

  Run-Time error event, only be called when `Cropper`, `fullscreen`, `prettier` is not loaded. And content exceeds the length limit error.

  ```vue
  <template>
    <MdEditor @onError="onError" />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const onError = (err) => {
    alert(err.message);
  };
  </script>
  ```

---

### 🐾 onBlur

- **type**: `(event: FocusEvent) => void`

  Textarea has lost focus.

  ```vue
  <template>
    <MdEditor @onBlur="onBlur" />
  </template>

  <script setup>
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const onBlur = (e) => {
    console.log('onBlur', e);
  };
  </script>
  ```

---

### 🔖 onFocus

- **type**: `(event: FocusEvent) => void`

  Textarea has received focus.

---

### 🔖 onInput

- **type**: `(event: Event) => void`

  Element gets input.

---

### 🔖 onDrop

- **type**: `(event: DragEvent) => void`

  The event occurs when a selection is being dragged.

  ```vue
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
  </script>
  ```

---

### 🔖 onInputBoxWitdhChange

- **type**: `(width: string) => void`

  Event occurs when width of input box has been changed

---

## 🤱🏼 Expose

After 2.5.0, Editor exposes several methods on the instance, used to get or change the internal status of the editor.

```vue
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
</script>
```

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

  ```js
  editorRef.value?.on('pageFullscreen', (status) => console.log(status));
  ```

- fullscreen

  ```js
  editorRef.value?.on('fullscreen', (status) => console.log(status));
  ```

- preview

  ```js
  editorRef.value?.on('preview', (status) => console.log(status));
  ```

- previewOnly

  ```js
  editorRef.value?.on('previewOnly', (status) => console.log(status));
  ```

- htmlPreview

  ```js
  editorRef.value?.on('htmlPreview', (status) => console.log(status));
  ```

- catalog

  ```js
  editorRef.value?.on('catalog', (status) => console.log(status));
  ```

---

### 💻 togglePageFullscreen

Toggle status of fullscreen within the page.

```js
editorRef.value?.togglePageFullscreen(true);
```

> Switched to the opposite status, without input parameter.

---

### 🖥 toggleFullscreen

Toggle status of fullscreen widthin browser.

```js
editorRef.value?.toggleFullscreen(true);
```

> Switched to the opposite status, without input parameter.

---

### 📖 togglePreview

Toggle status of preview.

```js
editorRef.value?.togglePreview(true);
```

> Switched to the opposite status, without input parameter.

---

### 📖 togglePreviewOnly

Toggle into Preview Only Mode.

```js
editorRef.value?.togglePreviewOnly(true);
```

> Switched to the opposite status, without input parameter.

---

### 📼 toggleHtmlPreview

Toggle status of htmlPreview.

```js
editorRef.value?.toggleHtmlPreview(true);
```

> Switched to the opposite status, without input parameter.

---

### 🧬 toggleCatalog

Toggle status of catalog.

```js
editorRef.value?.toggleCatalog(true);
```

> Switched to the opposite status, without input parameter.

---

### 💾 triggerSave

```js
editorRef.value?.triggerSave();
```

---

### 💉 insert

Manually insert content into textarea.

```js
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
    targetValue: `${selectedText}`,
    select: true,
    deviationStart: 0,
    deviationEnd: 0
  };
});
```

---

### 🎯 focus

Focus on the textarea.

```ts
import type { FocusOption } from 'md-editor-v3';

const option: FocusOption | undefined = 'start';

// Cursor position when focusing on textarea, default: position when it last lost focus
editorRef.value?.focus(option);
```

```ts
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
```

---

### ✒️ rerender

Re render the content.

```js
editorRef.value?.rerender();
```

---

### 🔍 getSelectedText

Get the currently selected text.

```js
console.log(editorRef.value?.getSelectedText());
```

---

### 🗑 resetHistory

Clear current history.

---

### 🎛 domEventHandlers

Supports listening to all DOM events.

```js
editorRef.value?.domEventHandlers({
  compositionstart: () => {
    console.log('compositionstart');
  }
});
```

---

### 🎛 execCommand

Insert content into the editor via trigger.

```js
editorRef.value?.execCommand('bold');
```

---

## 💴 Config Editor

Use `config(option: ConfigOption)` to reconfigure `markdown-it` and so on.

### 🦪 codeMirrorExtensions

Customize new extensions based on theme and default extensions f codeMirror.

Example: Editor does not render the line number of textarea by default, this extension needs to be manually added

```js
import { config } from 'md-editor-v3';
import { lineNumbers } from '@codemirror/view';

config({
  codeMirrorExtensions(_theme, extensions) {
    return [...extensions, lineNumbers()];
  }
});
```

---

### 🍤 markdownItConfig

Customize extensions, attributes of `markdown-it`, etc.

```ts
type MarkdownItConfig = (
  md: markdownit,
  options: {
    editorId: string;
  }
) => void;
```

Example: Use `markdown-it-anchor` to render a hyperlink symbol to the right of the title

```js
import { config } from 'md-editor-v3';
import ancher from 'markdown-it-anchor';

config({
  markdownItConfig(mdit) {
    mdit.use(ancher, {
      permalink: true
    });
  }
});
```

---

### 🍤 markdownItPlugins

Select and add built-in plugins to `markdown-it`.

```ts
type MarkdownItPlugins = (
  plugins: Array<MarkdownItConfigPlugin>,
  options: {
    editorId: string;
  }
) => Array<MarkdownItConfigPlugin>;
```

Example: Modify the class name of the image.

```js
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
```

---

### 🍙 editorConfig

Add more languages, reset `mermaid` template or delay rendering time

#### 🍚 languageUserDefined

```js
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
```

#### 🍘 mermaidTemplate

```js
import { config } from 'md-editor-v3';

config({
  editorConfig: {
    // mermaid template
    mermaidTemplate: {
      flow: `flow tempalte`,
      sequence: `sequence template`,
      gantt: `gantt template`,
      class: `class template`,
      state: `state template`,
      pie: `pie template`,
      relationship: `relationship template`,
      journey: `journey template`
    }
  }
});
```

#### 🍥 renderDelay

```js
import { config } from 'md-editor-v3';

config({
  editorConfig: {
    // delay rendering time(ms)
    renderDelay: 0
  }
});
```

---

#### 🍥 zIndex

```js
import { config } from 'md-editor-v3';

config({
  editorConfig: {
    // for modal component
    zIndex: 2000
  }
});
```

---

### 🥠 editorExtensions

Config some dependency libraries, like highlight..

```typescript
import { config } from 'md-editor-v3';

config({
  editorExtensions: { iconfont: 'https://xxx.cc' }
});
```

```ts
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
```

---

### 🥠 editorExtensionsAttrs

Synchronously add attributes to the CDN link tags, consistent with the type of `editorExtensions`, with a value type of `HTMLElementTagNameMap['tagName']`.

```js
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
```

Example of using built-in basic configuration:

```js
import { config, editorExtensionsAttrs } from 'md-editor-v3';

config({
  editorExtensionsAttrs
});
```

!!! warning Warning

Do not attempt to define the src \ onload \ id of the script and rel \ href \ id of the link in editorExtensionsAttrs, as they will be overwritten by default values

!!!

---

### 🫨 iconfontType

Set the way to display icons:

- `svg`: with symbol
- `class`: with font-class

If the icon is customized through the attribute `customIcon`, the customized icon will be used first.

This can be usually used to avoid the issue of incompatible symbol.

```js
import { config } from 'md-editor-v3';

config({
  iconfontType: 'class'
});
```

---

### 🎨 mermaidConfig

Configure `mermaid`, [Details](https://mermaid.js.org/config/schema-docs/config.html)

```js
import { config } from 'md-editor-v3';
config({
  mermaidConfig(base: any) {
    return {
      ...base,
      logLevel: 'error'
    };
  }
});
```

---

## 🪡 Shortcut keys

!!! warning Pay attention

Shortcut keys are only available when the textarea has received focus!

!!!

| key | function | description |
| --- | --- | --- |
| TAB | insert space | Insert space, the length eq `tabWidth`, default: 2, support multiline |
| SHIFT + TAB | delete space, setting is the same as Tab |  |
| CTRL + C | copy | When selected, copy the selected content. When not selected, copy the content of the current line |
| CTRL + X | shear | When selected, cut the selected content. When not selected, cut the current line |
| CTRL + D | delete | When selected, delete the selected content. When not selected, delete the current line |
| CTRL + S | save | Trigger `onSave` event |
| CTRL + B | bold text | `**bold**` |
| CTRL + U | underline | `<u>underline</u>` |
| CTRL + I | italic | `*italic*` |
| CTRL + 1-6 | h1-h6 | `# title` |
| CTRL + ↑ | superscript | `<sup>superscript</sup>` |
| CTRL + ↓ | subscript | `<sub>subscript</sub>` |
| CTRL + O | ordered list | `1. ordered list` |
| CTRL + L | link | `[link](https://github.com/imzbf/md-editor-v3)` |
| CTRL + Z | withdraw | Withdraw history in editor, not the function of system |
| CTRL + SHIFT + S | line-through | `~line-through~` |
| CTRL + SHIFT + U | unordered list | `- unordered list` |
| CTRL + SHIFT + C | code block |  |
| CTRL + SHIFT + I | picture | `![picture](https://github.com/imzbf)` |
| CTRL + SHIFT + Z | forward | Forward history in editor, not the function of system |
| CTRL + SHIFT + F | Beautify |  |
| CTRL + ALT + C | code row |  |
| CTRL + SHIFT + ALT + T | table | `\|table\|` |

## 🪤 Internal Components

On-demand import, eg: `import { DropdownToolbar } from 'md-editor-v3'`.

!!! info Built-in attribute

To help developers quickly insert content and use editor attributes, the editor component has added the following attribute values to the written extension component by default:

| name | example |
| --- | --- |
| insert | Refer to the `DropdownToolbar` component example below |
| theme | Refer to the extension components in the [ExportPDF](https://github.com/imzbf/md-editor-extension/blob/main/packages/v3/components/ExportPDF/ExportPDF.tsx#L94) |
| previewtheme | Same as above |
| language | Same as above |

!!!

### 🐣 NormalToolbar

- **props**

  - `title`: `string`, not necessary, title of toolbar.

- **events**

  - `onClick`: `(e: MouseEvent) => void`, necessary.

- **slots**

  - `trigger`: `VNode | JSX.Element`, necessary, it is usually an icon, which is displayed on the toolbar.

usage:

```vue
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
   * `insert` will be automatically injected into the component by the editor
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
      targetValue: `==${selectedText}==`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    };
  });
};
</script>
```

```vue
<template>
  <MdEditor v-model="text" :toolbars="['bold', 0, 'github']">
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
</script>
```

[MarkExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/MarkExtension/index.vue)

---

### 🐼 DropdownToolbar

- **props**

  - `title`: `string`, not necessary, title of toolbar.
  - `visible`: `boolean`, necessary.

- **events**

  - `onChange`: `(visible: boolean) => void`, necessary.

- **slots**

  - `trigger`: `VNode | JSX.Element`, necessary, it is usually an icon, which is displayed on the toolbar.
  - `overlay`: `VNode | JSX.Element`, necessary, content of dropdown box.

```vue
<template>
  <DropdownToolbar title="emoji" :visible="visible" :onChange="onChange">
    <template #overlay>
      <div class="emoji-container">
        <ol class="emojis">
          <li
            v-for="(emoji, index) of emojis"
            :key="`emoji-${index}`"
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
   * `insert` will be automatically injected into the component by the editor
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
</script>
```

```vue
<template>
  <MdEditor v-model="text" :toolbars="['bold', 0, 'github']">
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
</script>
```

[EmojiExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/EmojiExtension/index.vue)

---

### 🦉 ModalToolbar

- **props**

  - `title`: `string`, not necessary, title of toolbar.
  - `modalTitle`: `string`, not necessary, title of the Modal.
  - `visible`: `boolean`, necessary, visibility of Modal.
  - `width`: `string`, not necessary, width of Modal, default `auto`.
  - `height`: `string`, same as `width`.
  - `showAdjust`: `boolean`, not necessary, visibility of fullscreen button.
  - `isFullscreen`: `boolean`, necessary when `showAdjust = true`, status of fullscreen.

- **events**

  - `onClick`: `() => void`, necessary.
  - `onClose`: `() => void`, necessary, close event.
  - `onAdjust`: `(val: boolean) => void`, fullscreen button click event.

- **slots**

  - `trigger`: `VNode | JSX.Element`, necessary, it is usually an icon, which is displayed on the toolbar.
  - `default`: `VNode | JSX.Element`, necessary, content of Modal.

```vue
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
   * `insert` will be automatically injected into the component by the editor
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
      targetValue: `==${selectedText}==`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
    };
  });
};
</script>
```

```vue
<template>
  <MdEditor v-model="text" :toolbars="['bold', 0, 'github']">
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
</script>
```

[ReadExtension Source Code](https://github.com/imzbf/md-editor-v3/blob/docs/src/components/ReadExtension/index.vue)

---

### 🐻 MdCatalog

- **props**

  - `editorId`: `string`, necessary, editor's `editorId`, used to register listening events.
  - `class`: `string`, not necessary.
  - `mdHeadingId`: `mdHeadingId`, not necessary, same as editor.
  - `scrollElement`: `string | HTMLElement`, not necessary, it is an element selector when its type is string. When `previewOnly` eq `true`, it is usually set to `document.documentElement`.
  - `theme`: 'light' | 'dark', not necessary, provide it when you want to change theme online, it is the same as Editor `theme`.
  - `offsetTop`: `number`, not necessary, highlight current item of catalogs when title is `offsetTop` pixels from the top, default 20.
  - `scrollElementOffsetTop`: `number`, not necessary, offsetTop of the scroll container, default 0.

- **events**

  - `onClick`: `(e: MouseEvent, t: TocItem) => void`, not necessary.
  - `onActive`: `(heading: HeadList | undefined) => void`, not necessary, heading was highlighted.

usage:

```vue
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
</script>
```

---

### 🛸 MdModal

It is usually used in conjunction with `DropdownToolbar`.

- **props**

  - `title`: `string`, not necessary, title of Modal.
  - `visible`: `boolean`, necessary, visibility of Modal.
  - `width`: `string`, not necessary, width of Modal, default `auto`.
  - `height`: `string`, same as `width`.
  - `showAdjust`: `boolean`, not necessary, visibility of fullscreen button.
  - `isFullscreen`: `boolean`, necessary when `showAdjust = true`, status of fullscreen.
  - `className`: `string`, not necessary.
  - `style`: `string`, not necessary.

- **events**

  - `onClose`: `() => void`, necessary, close event.
  - `onAdjust`: `(val: boolean) => void`, fullscreen button click event.

- **slots**

  - `default`: `VNode | JSX.Element`, necessary, content of Modal.

```vue
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
</script>
```

---

## 🪤 Internal Configuration

```js
import {
  iconfontClassUrl,
  iconfontSvgUrl,
  allToolbar,
  allFooter,
  zh_CN,
  en_US
} from 'md-editor-v3';

console.log(iconfontClassUrl, iconfontSvgUrl, allToolbar, allFooter, zh_CN, en_US);
```

## ✍️ Edit This Page

[doc-en-US](https://github.com/imzbf/md-editor-v3/blob/dev-docs/public/doc-en-US.md)
