## 从 1.x 升级到 2.x

下面列举的是`2.x`不兼容`1.x`的内容，兼容内容不作展示。

## Props

| 名称                | 说明                              |
| ------------------- | --------------------------------- |
| editorClass         | 修改为`class`                     |
| hljs                | 已移除，使用`MdEditor.config`配置 |
| highlightJs         | 同上                              |
| highlightCss        | 同上                              |
| languageUserDefined | 同上                              |
| prettier            | 修改为`noPrettier`，默认`false`   |
| prettierCDN         | 已移除，使用`MdEditor.config`配置 |
| prettierMDCDN       | 同上                              |
| cropperCss          | 同上                              |
| cropperJs           | 同上                              |
| iconfontJs          | 同上                              |
| screenfull          | 同上                              |
| screenfullJs        | 同上                              |
| mermaid             | 同上                              |
| mermaidJs           | 同上                              |
| katex               | 同上                              |
| katexJs             | 同上                              |
| katexCss            | 同上                              |
| extensions          | 同上                              |

## 内部组件

全局注册名称统一为组件的名称。

- 目录导航

  `Editor.Catalog`组件名称修改为`Editor.MdCatalog`。

  **局部注册**

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

  **全局注册**

  这会使得内部的所有组件按照名称注册

  _main.js_

  ```js
  import { createApp } from 'vue';
  import MdEditor from 'md-editor-v3';

  createApp(App).use(MdEditor);
  ```

  _App.vue_

  ```js
  <template>
    <md-editor editor-id="ddd" />
    <md-catalog editor-id="ddd" />
  </template>

  <script setup>
  // 不需要再import
  </script>
  ```
