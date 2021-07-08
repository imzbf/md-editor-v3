# md-editor-v3

Markdown 编辑器，基于 vue3，使用 jsx 语法开发，支持在 tsx 项目使用。使用 vite 来开发打包。

目前龟速开发中...

## 预览图

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65918d53d93b492ca51de2f36e439d83~tplv-k3u1fbpfcp-watermark.image)

## 快捷键

主要以`CTRL`搭配对应功能英文单词首字母，冲突项添加`SHIFT`，再冲突替换为`ALT`。

| 键位             | 功能       | 说明                             | 开发标记 |
| ---------------- | ---------- | -------------------------------- | -------- |
| CTRL + S         | 保存       | 触发编辑器的`onSave`回调         | √        |
| CTRL + B         | 加粗       | `**加粗**`                       | √        |
| CTRL + U         | 下划线     | `<u>下划线</u>`                  | √        |
| CTRL + I         | 斜体       | `*斜体*`                         | √        |
| CTRL + 1-6       | 1-6 级标题 | `# 标题`                         | √        |
| CTRL + ↑         | 上角标     | `<sup>上角标</sup>`              | √        |
| CTRL + ↓         | 下角标     | `<sub>下角标</sub>`              | √        |
| CTRL + Q         | 引用       | `> 引用`                         | √        |
| CTRL + O         | 有序列表   | `1. 有序列表`                    | √        |
| CTRL + L         | 链接       | `[链接](https://imbf.cc)`        | x        |
| CTRL + T         | 表格       | `\|表格\|`                       | x        |
| CTRL + Z         | 撤回       | 触发编辑器内内容撤回，与系统无关 | x        |
| CTRL + SHIFT + S | 删除线     | `~删除线~`                       | √        |
| CTRL + SHIFT + U | 无序列表   | `- 无序列表`                     | √        |
| CTRL + SHIFT + C | 块级代码   | 多行代码块                       | √        |
| CTRL + SHIFT + I | 图片链接   | `![图片](https://imbf.cc)`       | x        |
| CTRL + SHIFT + Z | 前进一步   | 触发编辑器内内容前进，与系统无关 | x        |
| CTRL + ALT + C   | 行内代码   | 行内代码块                       | √        |
