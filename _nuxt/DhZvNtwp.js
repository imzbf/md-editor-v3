import{h as r,aw as d,q as m,v as s,K as l,ax as h,D as c,ay as p,S as u,az as v,c as y,a as w,b as a,o as g}from"#entry";import{_ as f}from"./B8hA0tRl.js";import{_ as k}from"./D2jHZTuG.js";import{u as x}from"./C1K6BqhZ.js";import"./C7y6EjaW.js";import"./CaH81vPM.js";import"./2xFzaUXI.js";const o=`!!! tip

When using inline syntax (such as bold, italic, etc.), if the text to be bolded contains special characters and the bold markers (like \`**\`) are immediately adjacent to other characters, be sure to add at least one space after the second marker (such as \`**\`). Otherwise, the Markdown parser may not correctly recognize the bold effect.

Example:

Incorrect: \`AAA**I have a dream.**BBB\`

Correct: \`AAA**I have a dream.** BBB\`

The same issue applies to other inline syntaxes (such as italics, etc.). Please remember to add a space after the syntax marker to ensure correct parsing.

!!!

## 🐶 Heading

\`\`\`markdown
## Heading
\`\`\`

---

## 🐱 Bold

**I have a dream that one day this nation will rise up.**

\`\`\`markdown
**I have a dream that one day this nation will rise up.**
\`\`\`

---

## 🐭 Italic

_It is a dream deeply rooted in the American dream._

\`\`\`markdown
_It is a dream deeply rooted in the American dream._
\`\`\`

---

## 🐹 Strikethrough

~~It is a dream deeply rooted in the American dream.~~

\`\`\`markdown
~~It is a dream deeply rooted in the American dream.~~
\`\`\`

---

## 🐻 Link

[md-editor-v3](https://imzbf.github.io/md-editor-v3/)

\`\`\`markdown
[md-editor-v3](https://imzbf.github.io/md-editor-v3/)
\`\`\`

---

## 🐼 Picture

![Description](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif 'title')

\`\`\`markdown
![Description](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif 'title')
\`\`\`

---

## 🙉 Underline

<u>So even though we face the difficulties of today and tomorrow, I still have a dream.</u>

\`\`\`markdown
<u>So even though we face the difficulties of today and tomorrow, I still have a dream.</u>
\`\`\`

---

## 🙊 Superscript

I have a dream that one day this nation will rise up.^[1]^

\`\`\`markdown
I have a dream that one day this nation will rise up.^[1]^
\`\`\`

---

## 🐒 Subscript

I have a dream that one day this nation will rise up.~[2]~

\`\`\`markdown
I have a dream that one day this nation will rise up.~[2]~
\`\`\`

---

## 🐰 Inline Code

\`md-editor-v3\`

\`\`\`markdown
\`md-editor-v3\`
\`\`\`

---

## 🦊 Block Code

\`\`\`\`markdown
\`\`\`js
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`
\`\`\`\`

### 🗄 Combination

\`\`\`shell [id:yarn]
yarn add md-editor-v3
\`\`\`

\`\`\`shell [id:npm]
npm install md-editor-v3
\`\`\`

\`\`\`shell [id:pnpm]
pnpm install md-editor-v3
\`\`\`

\`\`\`\`markdown
\`\`\`shell [id:yarn]
yarn add md-editor-v3
\`\`\`

\`\`\`shell [id:npm]
npm install md-editor-v3
\`\`\`

\`\`\`shell [id:pnpm]
pnpm install md-editor-v3
\`\`\`
\`\`\`\`

### 🤌🏻 Forcefully fold

\`\`\`js ::close
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`

\`\`\`\`markdown
\`\`\`js ::close
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`
\`\`\`\`

### 👐 Forcefully open

\`\`\`js ::open
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`

\`\`\`\`markdown
\`\`\`js ::open
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`
\`\`\`\`

According to the understanding of other editors, no other editors currently employ a similar syntax. Exercise caution when using this syntax if you intend to copy your content for display in other editors.

---

## 🐻‍❄️ Quote

> Quote: I Have a Dream

\`\`\`markdown
> Quote: I Have a Dream
\`\`\`

---

## 🐨 Ordered List

1. So even though we face the difficulties of today and tomorrow, I still have a dream.
2. It is a dream deeply rooted in the American dream.
3. I have a dream that one day this nation will rise up.

\`\`\`markdown
1. So even though we face the difficulties of today and tomorrow, I still have a dream.
2. It is a dream deeply rooted in the American dream.
3. I have a dream that one day this nation will rise up.
\`\`\`

---

## 🐯 Unordered List

- So even though we face the difficulties of today and tomorrow, I still have a dream.
- It is a dream deeply rooted in the American dream.
- I have a dream that one day this nation will rise up.

\`\`\`markdown
- So even though we face the difficulties of today and tomorrow, I still have a dream.
- It is a dream deeply rooted in the American dream.
- I have a dream that one day this nation will rise up.
\`\`\`

---

## 🦁 Task List

- [ ] Friday
- [ ] Saturday
- [x] Sunday

\`\`\`markdown
- [ ] Friday
- [ ] Saturday
- [x] Sunday
\`\`\`

[Example](https://imzbf.github.io/md-editor-v3/en-US/demo#☑%EF%B8%8F%20Toggleable%20status%20task%20list) that supports toggling task status in the preview module.

---

## 🐮 Table

| THead1          |      THead2       |           THead3 | THead4  |
| :-------------- | :---------------: | ---------------: | ------- |
| text-align:left | text-align:center | text-align:right | default |

\`\`\`markdown
| THead1          |      THead2       |           THead3 | THead4  |
| :-------------- | :---------------: | ---------------: | ------- |
| text-align:left | text-align:center | text-align:right | default |
\`\`\`

---

## 🐷 Mathematical Formula

Two modes.

### 🐽 Inline

$x+y^{2x}$ \\(\\xrightarrow[under]{over}\\)

\`\`\`markdown
$x+y^{2x}$

<!-- or -->

\\(\\xrightarrow[under]{over}\\)
\`\`\`

---

### 🐸 Block

$$\\sqrt[3]{x}$$

\\[\\xrightarrow[under]{over}\\]

\`\`\`markdown
$$
\\sqrt[3]{x}
$$

<!-- or -->

\\[\\xrightarrow[under]{over}\\]
\`\`\`

For more usage: [https://katex.org/docs/supported.html](https://katex.org/docs/supported.html)

---

## 🐵 Diagram

\`\`\`mermaid
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
\`\`\`

\`\`\`\`markdown
\`\`\`mermaid
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
\`\`\`
\`\`\`\`

For more usage: [https://mermaid.js.org/syntax/flowchart.html](https://mermaid.js.org/syntax/flowchart.html)

---

## 🙈 Alert

!!! note Supported Types

note、abstract、info、tip、success、question、warning、failure、danger、bug、example、quote、hint、caution、error、attention

!!!

\`\`\`markdown
!!! note Supported Types

note、abstract、info、tip、success、question、warning

failure、danger、bug、example、quote、hint、caution、error、attention

!!!
\`\`\`

---

## 📊 Echarts

\\>= v6.0.0

\`\`\`echarts
{
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}
\`\`\`

\`\`\`\`markdown
\`\`\`echarts
{
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}
\`\`\`
\`\`\`\`

!!! warning

Please note that this module will not handle dangerous code, and you need to ensure the security of your data on your own!

!!!

## 🦄 Link Reference

[md-editor-v3][1]

[1]: https://imzbf.github.io/md-editor-v3/

\`\`\`markdown
[md-editor-v3][1]

[1]: https://imzbf.github.io/md-editor-v3/
\`\`\`
`,i=`!!! tip

在使用行内语法（如加粗、斜体等）时，如果需要加粗的文本中包含特殊字符，并且加粗标识符（如 \`**\`）前后紧挨着其他字符，请务必在第二个标识符（如 \`**\`）后添加至少一个空格。否则，Markdown 解析器可能无法正确识别加粗效果。

示例：

错误写法：\`AAA**I have a dream.**BBB\`

正确写法：\`AAA**I have a dream.** BBB\`

同样的问题也适用于其它行内语法（如斜体等），请注意在语法标识符后添加空格以确保正确解析。

!!!

## 🐶 标题

\`\`\`markdown
## 标题
\`\`\`

---

## 🐱 加粗

**I have a dream that one day this nation will rise up.**

\`\`\`markdown
**I have a dream that one day this nation will rise up.**
\`\`\`

---

## 🐭 斜体

_It is a dream deeply rooted in the American dream._

\`\`\`markdown
_It is a dream deeply rooted in the American dream._
\`\`\`

---

## 🐹 删除线

~~It is a dream deeply rooted in the American dream.~~

\`\`\`markdown
~~It is a dream deeply rooted in the American dream.~~
\`\`\`

---

## 🐻 超链接

[md-editor-v3](https://imzbf.github.io/md-editor-v3/)

\`\`\`markdown
[md-editor-v3](https://imzbf.github.io/md-editor-v3/)
\`\`\`

---

## 🐼 图片

![描述文字](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif 'title')

\`\`\`markdown
![描述文字](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif 'title')
\`\`\`

---

## 🙉 下划线

<u>So even though we face the difficulties of today and tomorrow, I still have a dream.</u>

\`\`\`markdown
<u>So even though we face the difficulties of today and tomorrow, I still have a dream.</u>
\`\`\`

---

## 🙊 上标

I have a dream that one day this nation will rise up.^[1]^

\`\`\`markdown
I have a dream that one day this nation will rise up.^[1]^
\`\`\`

---

## 🐒 下标

I have a dream that one day this nation will rise up.~[2]~

\`\`\`markdown
I have a dream that one day this nation will rise up.~[2]~
\`\`\`

---

## 🐰 行内代码

\`md-editor-v3\`

\`\`\`markdown
\`md-editor-v3\`
\`\`\`

---

## 🦊 块级代码

\`\`\`\`markdown
\`\`\`js
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`
\`\`\`\`

### 🗄 代码组合

\`\`\`shell [id:yarn]
yarn add md-editor-v3
\`\`\`

\`\`\`shell [id:npm]
npm install md-editor-v3
\`\`\`

\`\`\`shell [id:pnpm]
pnpm install md-editor-v3
\`\`\`

\`\`\`\`markdown
\`\`\`shell [id:yarn]
yarn add md-editor-v3
\`\`\`

\`\`\`shell [id:npm]
npm install md-editor-v3
\`\`\`

\`\`\`shell [id:pnpm]
pnpm install md-editor-v3
\`\`\`
\`\`\`\`

### 🤌🏻 强制折叠

\`\`\`js ::close
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`

\`\`\`\`markdown
\`\`\`js ::close
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`
\`\`\`\`

### 👐 强制展开

\`\`\`js ::open
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`

\`\`\`\`markdown
\`\`\`js ::open
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`
\`\`\`\`

据其他编辑器的了解，目前没有其他编辑器使用类似的语法，如果需要拷贝你的内容到其他编辑器展示时，请谨慎使用该语法。

---

## 🐻‍❄️ 引用

> 引用：《I Have a Dream》

\`\`\`markdown
> 引用：《I Have a Dream》
\`\`\`

---

## 🐨 有序列表

1. So even though we face the difficulties of today and tomorrow, I still have a dream.
2. It is a dream deeply rooted in the American dream.
3. I have a dream that one day this nation will rise up.

\`\`\`markdown
1. So even though we face the difficulties of today and tomorrow, I still have a dream.
2. It is a dream deeply rooted in the American dream.
3. I have a dream that one day this nation will rise up.
\`\`\`

---

## 🐯 无序列表

- So even though we face the difficulties of today and tomorrow, I still have a dream.
- It is a dream deeply rooted in the American dream.
- I have a dream that one day this nation will rise up.

\`\`\`markdown
- So even though we face the difficulties of today and tomorrow, I still have a dream.
- It is a dream deeply rooted in the American dream.
- I have a dream that one day this nation will rise up.
\`\`\`

---

## 🦁 任务列表

- [ ] 周五
- [ ] 周六
- [x] 周天

\`\`\`markdown
- [ ] 周五
- [ ] 周六
- [x] 周天
\`\`\`

支持在预览模块切换任务状态的[示例](https://imzbf.github.io/md-editor-v3/zh-CN/demo#☑%EF%B8%8F%20可切换状态的任务列表)

---

## 🐮 表格

| 表头 1 |  表头 2  | 表头 3 | 表头 4 |
| :----- | :------: | -----: | ------ |
| 左对齐 | 中间对齐 | 右对齐 | 默认   |

\`\`\`markdown
| 表头 1 |  表头 2  | 表头 3 | 表头 4 |
| :----- | :------: | -----: | ------ |
| 左对齐 | 中间对齐 | 右对齐 | 默认   |
\`\`\`

---

## 🐷 数学公式

有两种模式

### 🐽 行内

$x+y^{2x}$ \\(\\xrightarrow[under]{over}\\)

\`\`\`markdown
$x+y^{2x}$

<!-- or -->

\\(\\xrightarrow[under]{over}\\)
\`\`\`

---

### 🐸 块级

$$\\sqrt[3]{x}$$

\\[\\xrightarrow[under]{over}\\]

\`\`\`markdown
$$
\\sqrt[3]{x}
$$

<!-- or -->

\\[\\xrightarrow[under]{over}\\]
\`\`\`

更多公式示例参考：[https://katex.org/docs/supported.html](https://katex.org/docs/supported.html)

---

## 🐵 图表

\`\`\`mermaid
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
\`\`\`

\`\`\`\`markdown
\`\`\`
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
\`\`\`
\`\`\`\`

更多图形示例参考：[https://mermaid.js.org/syntax/flowchart.html](https://mermaid.js.org/syntax/flowchart.html)

---

## 🙈 提示

!!! note 支持的类型

note、abstract、info、tip、success、question、warning、failure、danger、bug、example、quote、hint、caution、error、attention

!!!

\`\`\`markdown
!!! note 支持的类型

note、abstract、info、tip、success、question、warning

failure、danger、bug、example、quote、hint、caution、error、attention

!!!
\`\`\`

---

## 📊 Echarts

\\>= v6.0.0

\`\`\`echarts
{
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}
\`\`\`

\`\`\`\`markdown
\`\`\`echarts
{
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}
\`\`\`
\`\`\`\`

!!! warning

请注意，该模块不会处理危险的代码，你需要自行保证数据的安全！

!!!

## 🦄 链接引用语法

[md-editor-v3][1]

[1]: https://imzbf.github.io/md-editor-v3/

\`\`\`markdown
[md-editor-v3][1]

[1]: https://imzbf.github.io/md-editor-v3/
\`\`\`
`,I={class:"container"},b={class:"doc"},S={name:"DemoPage"},H=r({...S,setup(A){const n=d(),e="syntax-preview",t=m(n.lang==="en-US"?o:i);return s(()=>n.lang,()=>{t.value=n.lang==="en-US"?o:i}),x({title:n.lang==="en-US"?`Syntax - ${u}`:`语法 - ${v}`,meta:[{name:"keywords",content:n.lang==="en-US"?l:h},{name:"description",content:n.lang==="en-US"?c:p}]}),(E,T)=>(g(),y("div",I,[w("div",b,[a(k,{editorId:e,modelValue:t.value},null,8,["modelValue"]),a(f,{editorId:e})])]))}});export{H as default};
