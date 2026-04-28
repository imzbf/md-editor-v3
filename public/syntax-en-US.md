!!! tip

When using inline syntax (such as bold, italic, etc.), if the text to be bolded contains special characters and the bold markers (like `**`) are immediately adjacent to other characters, be sure to add at least one space after the second marker (such as `**`). Otherwise, the Markdown parser may not correctly recognize the bold effect.

Example:

Incorrect: `AAA**I have a dream.**BBB`

Correct: `AAA**I have a dream.** BBB`

The same issue applies to other inline syntaxes (such as italics, etc.). Please remember to add a space after the syntax marker to ensure correct parsing.

!!!

## 🐶 Heading

```markdown
## Heading
```

---

## 🐱 Bold

**I have a dream that one day this nation will rise up.**

```markdown
**I have a dream that one day this nation will rise up.**
```

---

## 🐭 Italic

_It is a dream deeply rooted in the American dream._

```markdown
_It is a dream deeply rooted in the American dream._
```

---

## 🐹 Strikethrough

~~It is a dream deeply rooted in the American dream.~~

```markdown
~~It is a dream deeply rooted in the American dream.~~
```

---

## 🐻 Link

[md-editor-v3](https://imzbf.github.io/md-editor-v3/)

```markdown
[md-editor-v3](https://imzbf.github.io/md-editor-v3/)
```

---

## 🐼 Picture

![Description](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif 'title')

```markdown
![Description](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif 'title')
```

---

## 🙉 Underline

<u>So even though we face the difficulties of today and tomorrow, I still have a dream.</u>

```markdown
<u>So even though we face the difficulties of today and tomorrow, I still have a dream.</u>
```

---

## 🙊 Superscript

I have a dream that one day this nation will rise up.^[1]^

```markdown
I have a dream that one day this nation will rise up.^[1]^
```

---

## 🐒 Subscript

I have a dream that one day this nation will rise up.~[2]~

```markdown
I have a dream that one day this nation will rise up.~[2]~
```

---

## 🐰 Inline Code

`md-editor-v3`

```markdown
`md-editor-v3`
```

---

## 🦊 Block Code

````markdown
```js
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
```
````

### 🗄 Combination

```shell [id:yarn]
yarn add md-editor-v3
```

```shell [id:npm]
npm install md-editor-v3
```

```shell [id:pnpm]
pnpm install md-editor-v3
```

````markdown
```shell [id:yarn]
yarn add md-editor-v3
```

```shell [id:npm]
npm install md-editor-v3
```

```shell [id:pnpm]
pnpm install md-editor-v3
```
````

### 🤌🏻 Forcefully fold

```js ::close
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
```

````markdown
```js ::close
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
```
````

### 👐 Forcefully open

```js ::open
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
```

````markdown
```js ::open
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
```
````

According to the understanding of other editors, no other editors currently employ a similar syntax. Exercise caution when using this syntax if you intend to copy your content for display in other editors.

---

## 🐻‍❄️ Quote

> Quote: I Have a Dream

```markdown
> Quote: I Have a Dream
```

---

## 🐨 Ordered List

1. So even though we face the difficulties of today and tomorrow, I still have a dream.
2. It is a dream deeply rooted in the American dream.
3. I have a dream that one day this nation will rise up.

```markdown
1. So even though we face the difficulties of today and tomorrow, I still have a dream.
2. It is a dream deeply rooted in the American dream.
3. I have a dream that one day this nation will rise up.
```

---

## 🐯 Unordered List

- So even though we face the difficulties of today and tomorrow, I still have a dream.
- It is a dream deeply rooted in the American dream.
- I have a dream that one day this nation will rise up.

```markdown
- So even though we face the difficulties of today and tomorrow, I still have a dream.
- It is a dream deeply rooted in the American dream.
- I have a dream that one day this nation will rise up.
```

---

## 🦁 Task List

- [ ] Friday
- [ ] Saturday
- [x] Sunday

```markdown
- [ ] Friday
- [ ] Saturday
- [x] Sunday
```

[Example](https://imzbf.github.io/md-editor-v3/en-US/demo#☑%EF%B8%8F%20Toggleable%20status%20task%20list) that supports toggling task status in the preview module.

---

## 🐮 Table

| THead1          |      THead2       |           THead3 | THead4  |
| :-------------- | :---------------: | ---------------: | ------- |
| text-align:left | text-align:center | text-align:right | default |

```markdown
| THead1          |      THead2       |           THead3 | THead4  |
| :-------------- | :---------------: | ---------------: | ------- |
| text-align:left | text-align:center | text-align:right | default |
```

---

## 🐷 Mathematical Formula

Two modes.

### 🐽 Inline

$x+y^{2x}$ \(\xrightarrow[under]{over}\)

```markdown
$x+y^{2x}$

<!-- or -->

\(\xrightarrow[under]{over}\)
```

---

### 🐸 Block

$$\sqrt[3]{x}$$

\[\xrightarrow[under]{over}\]

```markdown
$$
\sqrt[3]{x}
$$

<!-- or -->

\[\xrightarrow[under]{over}\]
```

For more usage: [https://katex.org/docs/supported.html](https://katex.org/docs/supported.html)

---

## 🐵 Diagram

```mermaid
---
title: Example Git diagram
---
gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   commit
   checkout main
   merge develop
   commit
   commit
```

````markdown
```mermaid
---
title: Example Git diagram
---
gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   commit
   checkout main
   merge develop
   commit
   commit
```
````

For more usage: [https://mermaid.js.org/syntax/flowchart.html](https://mermaid.js.org/syntax/flowchart.html)

---

## 🙈 Alert

!!! note Supported Types

note、abstract、info、tip、success、question、warning、failure、danger、bug、example、quote、hint、caution、error、attention

!!!

```markdown
!!! note Supported Types

note、abstract、info、tip、success、question、warning

failure、danger、bug、example、quote、hint、caution、error、attention

!!!
```

---

## 📊 Echarts

\>= v6.0.0

Use the `echarts` code block to render charts. \>= v6.5.0 supports customizing the parser with `parseOption`; the current version still uses `new Function` by default. A future v7.0.0 release plans to switch the default parser to `JSON.parse`, so valid JSON is recommended for new content.

```echarts
{
  "tooltip": {
    "trigger": "axis"
  },
  "xAxis": {
    "type": "category",
    "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "data": [150, 230, 224, 218, 135, 147, 260],
      "type": "line"
    }
  ]
}
```

````markdown
```echarts
{
  "tooltip": {
    "trigger": "axis"
  },
  "xAxis": {
    "type": "category",
    "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "data": [150, 230, 224, 218, 135, 147, 260],
      "type": "line"
    }
  ]
}
```
````

!!! warning

The current default parser executes the code block content. If the content is untrusted, use `parseOption` in \>= v6.5.0 to replace it with `JSON.parse` or another strict parser.

!!!

## 🦄 Link Reference

[md-editor-v3][1]

[1]: https://imzbf.github.io/md-editor-v3/

```markdown
[md-editor-v3][1]

[1]: https://imzbf.github.io/md-editor-v3/
```
