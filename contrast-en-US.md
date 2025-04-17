This is the content that is incompatible only.

## 🧙🏼 Upgrade from 4.x to 5.x

!!! warning

Version 3.5.3 or higher of Vue must now be used!!!

!!!

### 🔖 Props

| name          | description                                                                                                                                                                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| editorId      | Marked as deprecated, but still usable; it is recommended to use id instead. Note: Only the `MdEditor` and `MdPreview` components have been adjusted; other components still use `editorId` to identify that this is the editor's ID, not their own. |
| inputBoxWitdh | Spelling error, corrected to: inputBoxWidth.                                                                                                                                                                                                         |
| noIconfont    | Removed, and now use the open-source icon library [lucide](https://lucide.dev/icons/) as a replacement.                                                                                                                                              |
| customIcon    | Still supports custom icons, but some icon keywords have been updated. Please check [CustomIcon](https://imzbf.github.io/md-editor-v3/en-US/api#%F0%9F%98%AC%20customIcon).                                                                          |

### Events

| name                  | description                                         |
| --------------------- | --------------------------------------------------- |
| onInputBoxWitdhChange | Spelling error, corrected to: onInputBoxWidthChange |

### 🪤 Internal Components

1. Remove the default XSS extension. Now export the extension XSSPlugin. Please add it yourself. [Example](https://imzbf.github.io/md-editor-v3/en-US/demo#%F0%9F%94%92%20Add%20XSS%20extension).
2. Remove the configuration related to iconfont. Specifically, this includes: `iconfontType`、`editorExtensions.iconfont`、`editorExtensions.iconfontClass`、`editorExtensionsAttrs.iconfont`、`editorExtensionsAttrs.iconfontClass`.

---

## 🧙🏼 Upgrade from 3.x to 4.x

### 🏄🏼 Usage

Starting from version 4.0, supports on-demand importing components and no longer exporting default editor.

#### 🏄🏼‍♂️ CDN

```diff
- <script src="https://unpkg.com/md-editor-v3@latest/lib/md-editor-v3.umd.js"></script>
+ <script src="https://unpkg.com/md-editor-v3@latest/lib/umd/index.js"></script>
<script>
  const App = {
    data() {
      return {
        text: 'Hello Editor!!'
      };
    }
  };
- Vue.createApp(App).use(MdEditorV3).mount('#md-editor-v3');
+ Vue.createApp(App).use(MdEditorV3.MdEditor).mount('#md-editor-v3');
</script>
```

#### 🏄🏼‍♀️ ES Module

```diff
<script setup>
- import MdEditor from 'md-editor-v3';
- const NormalToolbar = MdEditor.NormalToolbar;
- const DropdownToolbar = MdEditor.DropdownToolbar;
- const ModalToolbar = MdEditor.ModalToolbar;
- const MdCatalog = MdEditor.MdCatalog;
+ import { MdEditor, NormalToolbar, DropdownToolbar, ModalToolbar, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
</script>
```

### 🔖 Props

| name        | description                       |
| ----------- | --------------------------------- |
| previewOnly | deleted, replace with `MdPreview` |

### 🪤 Internal Components

New component `MdPreview` and replacing the attribute `previewOnly`.

```diff
<template>
- <MdEditor previewOnly />
+ <MdPreview />
</template>

<script setup>
- import MdEditor from 'md-editor-v3';
+ import { MdPreview } from 'md-editor-v3';
- import 'md-editor-v3/lib/style.css';
+ import 'md-editor-v3/lib/preview.css';
</script>
```

---

## 🧙🏻‍♂️ Upgrade from 2.x to 3.x

This is the content that 3.x is incompatible with version 2.x only.

### 🤹🏼‍♂️ Grammar

- Strikethrough

  ```diff
  - ~It is a dream deeply rooted in the American dream.~
  + ~~It is a dream deeply rooted in the American dream.~~
  ```

### 🔩 Props

| name            | description             |
| --------------- | ----------------------- |
| markedHeadingId | rename to `mdHeadingId` |
| historyLength   | deleted                 |

### 🤿 Config

```diff
MdEditor.config({
-  markedRenderer: (renderer) => renderer,
-  markedExtensions: [],
-  markedOptions,
+  codeMirrorExtensions: (theme, extensions) => extensions,
+  markdownItConfig: (mdit) { }
})
```

### 🎤 Shortcut Key

| key      | function | description |
| -------- | -------- | ----------- |
| CTRL + Q | quote    | deleted     |

### 🪤 Component

#### 🐻 MdCatalog

- **props**

  - **markedHeadingId**: deleted, use `mdHeadingId` instead of it

## 🧙🏻‍♂️ Upgrade from 1.x to 2.x

### Props

| name                | description                              |
| ------------------- | ---------------------------------------- |
| editorClass         | rename to `class`                        |
| hljs                | removed, use `MdEditor.config` to config |
| highlightJs         | the same                                 |
| highlightCss        | the same                                 |
| languageUserDefined | the same                                 |
| prettier            | rename to `noPrettier`, default `false`  |
| prettierCDN         | removed, use `MdEditor.config` to config |
| prettierMDCDN       | the same                                 |
| cropperCss          | the same                                 |
| cropperJs           | the same                                 |
| iconfontJs          | the same                                 |
| screenfull          | the same                                 |
| screenfullJs        | the same                                 |
| mermaid             | the same                                 |
| mermaidJs           | the same                                 |
| katex               | the same                                 |
| katexJs             | the same                                 |
| katexCss            | the same                                 |
| extensions          | the same                                 |

### Component

- Catalog

  `Editor.Catalog` is renamed to `Editor.MdCatalog`.

  **Local Registration**

  _App.vue_

  ```js
  <template>
    <md-editor editor-id="ddd" />
    <md-catalog editor-id="ddd" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  const { MdCatalog } = MdEditor;
  </script>
  ```

  **Global Registration**

  _main.js_

  ```js
  import { createApp } from 'vue';
  import MdEditor from 'md-editor-v3';

  // All components in MdEditor will be registered.
  createApp(App).use(MdEditor);
  ```

  _App.vue_

  ```js
  <template>
    <md-editor editor-id="ddd" />
    <md-catalog editor-id="ddd" />
  </template>

  <script setup>
  // import nothing
  </script>
  ```
