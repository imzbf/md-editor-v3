## 😲 md-editor-v3

Markdown Editor for Vue3, developed in jsx and typescript, support different themes、beautify content by prettier.

### 🤖 Base

**bold**, <u>underline</u>, _italic_, ~line-through~, superscript<sup>26</sup>, subscript<sub>1</sub>, `inline code`, [link](https://imzbf.cc)

> quote：hahaha

![mark and Emoji extension](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

## 🤗 Demo

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

## 🖨 Text

The Old Man and the Sea served to reinvigorate Hemingway's literary reputation and prompted a reexamination of his entire body of work.

## 📈 Table

| nickname | from             |
| -------- | ---------------- |
| zhijian  | ChongQing, China |

## 📏 Formula

Inline: $x+y^{2x}$

$$
\sqrt[3]{x}
$$

## 🧬 Diagram

```mermaid
flowchart TD
  Start --> Stop
```

## ☘️ em...
