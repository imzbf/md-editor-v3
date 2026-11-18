# md-editor-v3 功能依赖矩阵

没有提供本地实例且功能未关闭时，编辑器可能在客户端加载默认 CDN 资源。离线或受 CSP 限制的项目只需为启用的功能提供依赖；浏览器专用库放在客户端入口。

| 功能 | 本地配置 | 导入与兼容要求 | 关闭方式 |
| --- | --- | --- | --- |
| 代码高亮 | `highlight.instance` | `highlight.js` 或已注册所需语法的 core；同时引入代码主题 CSS | `noHighlight` |
| Markdown 格式化 | `prettier.prettierInstance`、`prettier.parserMarkdownInstance` | 浏览器使用 `prettier/standalone` 和 `prettier/plugins/markdown`，两个实例都要传 | `noPrettier` |
| 图片裁剪 | `cropper.instance` | 使用 Cropper.js 1.x 和 `cropperjs/dist/cropper.css`；2.x API 不兼容 | `noUploadImg` 关闭上传入口 |
| 浏览器全屏 | `screenfull.instance` | 本地可使用 ESM 的 screenfull 6；CDN 经典脚本使用 5.2.0 | 从工具栏移除 `fullscreen` 只隐藏入口 |
| Mermaid | `mermaid.instance` | `mermaid`；默认 `strict`，`mermaidConfig` 可调整配置 | `noMermaid` |
| KaTeX | `katex.instance` | `katex` 和 `katex/dist/katex.min.css`；默认 `trust: false` | `noKatex` |
| ECharts | `echarts.instance` | `import * as echarts from 'echarts'`；解析和渲染策略独立配置 | `noEcharts` |

表中字段均位于 `config({ editorExtensions: ... })` 下。`MdPreview` 也可能加载高亮、公式和图表资源。

提供本地高亮实例后，代码主题 CSS 由应用自行管理；仅传 `codeTheme` 不会自动切换本地导入的 CSS。Web Component 的编辑器、代码主题和公式样式还需要注入 Shadow DOM；字体的 `@font-face` 同时在文档中注册。

屏幕全屏与页面内全屏是两项能力。组件没有 `noScreenfull` 开关，离线示例直接注入本地实例，不将隐藏工具栏按钮当作停止资源加载的保证。

完整配置见 [本地依赖接入](playbook.md#3-在应用启动阶段注入本地依赖实例)。无需把所有可选库强行加到只用基础编辑功能的业务项目中。
