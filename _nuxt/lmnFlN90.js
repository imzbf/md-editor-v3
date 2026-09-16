import{h as i,aw as d,p as m,q as s,K as l,ax as h,D as p,ay as c,S as u,az as v,c as g,a as f,b as a,o as w}from"#entry";import{_ as y}from"./D2Xn8Hnj.js";import{_ as k}from"./CX9DeQA-.js";import{u as x}from"./C1K6BqhZ.js";import"./Bc4MD_Gn.js";import"./BDxgAFMV.js";import"./BQaxBUgI.js";const o=`!!! tip

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

Underline uses the raw HTML tag \`<u>\`, which is also inserted by the toolbar button and shortcut. With the default \`html: false\`, it is displayed as text. To render an underline, explicitly enable \`html: true\` through [markdownItConfig](https://imzbf.github.io/md-editor-v3/en-US/api#%F0%9F%8D%A4%20markdownItConfig).

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
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`
\`\`\`\`

### 🖍 Line Highlighting

\\>= v7.0.0

Append a \`{...}\` marker to the language identifier to highlight specific code lines. Line numbers are 1-based; separate individual lines with commas and use \`start-end\` for ranges. Both \`js {2,4-5}\` and \`js{2,4-5}\` are supported.

\`\`\`js {2,4-5}
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const value = ref('# Hello');
export { MdEditor, value };
\`\`\`

\`\`\`\`markdown
\`\`\`js {2,4-5}
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const value = ref('# Hello');
export { MdEditor, value };
\`\`\`
\`\`\`\`

Line highlighting works independently of \`showCodeRowNumber\`, so it remains active when line numbers are hidden.

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
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`

\`\`\`\`markdown
\`\`\`js ::close
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`
\`\`\`\`

### 👐 Forcefully open

\`\`\`js ::open
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`

\`\`\`\`markdown
\`\`\`js ::open
import { MdEditor } from 'md-editor-v3';
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

Starting with v7.x, the default parser uses \`JSON5.parse\` and requires a top-level object. Unquoted property names, single-quoted strings, comments, and trailing commas are supported. JSON5 parses data only, so functions, variable references, \`new\`, and call expressions are not supported.

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

Starting with v7.x, the default parser does not execute JavaScript. For functions or other JavaScript-only options, provide a custom \`editorExtensions.echarts.parseOption\`. Custom parsers receive the raw Markdown content, so use them only with trusted input or strict validation.

!!!

## 🦄 Link Reference

[md-editor-v3][1]

[1]: https://imzbf.github.io/md-editor-v3/

\`\`\`markdown
[md-editor-v3][1]

[1]: https://imzbf.github.io/md-editor-v3/
\`\`\`
`,r=`!!! tip

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

下划线使用原生 HTML 标签 \`<u>\`，工具栏按钮和快捷键都会插入这种写法。由于默认 \`html: false\`，它会显示为普通文本。需要渲染下划线时，请通过 [markdownItConfig](https://imzbf.github.io/md-editor-v3/zh-CN/api#%F0%9F%8D%A4%20markdownItConfig) 显式开启 \`html: true\`。

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
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`
\`\`\`\`

### 🖍 行高亮

\\>= v7.0.0

在语言标识后添加 \`{...}\` 可高亮指定代码行。行号从 \`1\` 开始，多个行号使用逗号分隔，连续区间使用 \`起始行-结束行\`；支持 \`js {2,4-5}\` 和 \`js{2,4-5}\` 两种写法。

\`\`\`js {2,4-5}
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const value = ref('# Hello');
export { MdEditor, value };
\`\`\`

\`\`\`\`markdown
\`\`\`js {2,4-5}
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const value = ref('# Hello');
export { MdEditor, value };
\`\`\`
\`\`\`\`

行高亮与 \`showCodeRowNumber\` 相互独立，隐藏行号后仍会保留高亮效果。

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
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`

\`\`\`\`markdown
\`\`\`js ::close
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`
\`\`\`\`

### 👐 强制展开

\`\`\`js ::open
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
\`\`\`

\`\`\`\`markdown
\`\`\`js ::open
import { MdEditor } from 'md-editor-v3';
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

从 v7.x 开始，默认解析器使用 \`JSON5.parse\`，且顶层必须是对象。支持未加引号的属性名、单引号字符串、注释和尾随逗号等 JSON5 数据语法。JSON5 只解析数据，因此不支持函数、变量引用、\`new\` 或调用表达式。

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

从 v7.x 开始，默认解析不会执行 JavaScript。若需函数回调等仅 JavaScript 支持的配置，可通过 \`editorExtensions.echarts.parseOption\` 自定义解析器。自定义解析器会接收原始 Markdown 内容，请仅在输入可信或完成严格校验后使用。

!!!

## 🦄 链接引用语法

[md-editor-v3][1]

[1]: https://imzbf.github.io/md-editor-v3/

\`\`\`markdown
[md-editor-v3][1]

[1]: https://imzbf.github.io/md-editor-v3/
\`\`\`
`,b={class:"container"},I={class:"doc"},S={name:"DemoPage"},C=i({...S,setup(E){const n=d(),e="syntax-preview",t=m(n.lang==="en-US"?o:r);return s(()=>n.lang,()=>{t.value=n.lang==="en-US"?o:r}),x({title:n.lang==="en-US"?`Syntax - ${u}`:`语法 - ${v}`,meta:[{name:"keywords",content:n.lang==="en-US"?l:h},{name:"description",content:n.lang==="en-US"?p:c}]}),(_,M)=>(w(),g("div",b,[f("div",I,[a(k,{editorId:e,modelValue:t.value},null,8,["modelValue"]),a(y,{editorId:e})])]))}});export{C as default};
