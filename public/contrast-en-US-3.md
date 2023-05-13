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

  - `markedHeadingId`: deleted, use `mdHeadingId` instead of it
