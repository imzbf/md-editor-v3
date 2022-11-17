## Upgrade from 1.x to 2.x

This is the content that 2.x is incompatible with version 1.x only.

## Props

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

## Component

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
