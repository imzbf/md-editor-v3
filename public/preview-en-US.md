## 😲 md-editor-v3

Markdown Editor for Vue3, developed by jsx and typescript, support different themes、beautify content by prettier.

### 🤖 Base

**bold**, <u>underline</u>, _italic_, ~line-through~, superscript<sup>26</sup>，subscript<sub>[1]</sub>，`inline code`，[link](https://imbf.cc)

> quote：hahaha

![mark and Emoji extension](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

## 🤗 Demo

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

## 🖨 Text

The Old Man and the Sea served to reinvigorate Hemingway's literary reputation and prompted a reexamination of his entire body of work.

## 📈 Table

| nickname | age | from            |
| -------- | --- | --------------- |
| zhijian  | 3   | China ChongQing |

📏 公式

$$
\sqrt[3]{x}
$$

## ☘️ em...
