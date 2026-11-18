---
name: md-editor-v3
description: 在 Vue 3.5.3+ 下游项目中集成、定制或排查 md-editor-v3。覆盖编辑器、预览与目录、上传、自定义工具栏、全局依赖和 Nuxt / Web Component 接入；不作为库仓库维护流程。
---

# md-editor-v3

面向使用 `md-editor-v3` 的下游业务项目。以 7.x 公开 API 和当前源码为参考；已发布安装包可能尚未包含仓库最新修复，先检查业务项目的 `node_modules/md-editor-v3/package.json` 和 `lib/types/index.d.ts`，保留用户已有的框架和部署方式。

## 按任务读取

- 常用 props、事件、ref 和配置：读 [公开 API](references/api.md)。
- 编辑器、预览、SSR、上传、本地依赖、自定义工具栏：读 [实战模式](references/playbook.md) 中对应章节。
- 离线、CSP 或本地依赖替换：读 [依赖矩阵](references/dependency-matrix.md)。
- 样式、目录、旧 API、键盘操作或代码高亮异常：读 [常见坑点](references/pitfalls.md)。
- 公开 API 无法解释的问题：再读 [实现机制](references/architecture.md)，并核对对应安装版本的源码。
- 完整的框架工程：参考仓库的 [examples](https://github.com/imzbf/md-editor-v3/tree/develop/examples)。技能里的代码模式不依赖本地克隆库仓库。

## 选择接入点

- 编辑 Markdown：`MdEditor`，配合 `v-model`（`modelValue`） 和 `md-editor-v3/lib/style.css`。
- 展示 Markdown：`MdPreview`，导入 `md-editor-v3/lib/preview.css`。
- 目录导航：`MdCatalog`，`editorId` 对应目标编辑器或预览器的 `id`。
- 扩展工具栏：`NormalToolbar`、`DropdownToolbar`、`ModalToolbar`；页脚用 `NormalFooterToolbar`。
- 外部命令：组件 ref 的 `insert`、`triggerSave`、`rerender` 等方法。
- 改 Markdown 渲染：`markdownItConfig` / `markdownItPlugins`；改编辑体验：`codeMirrorExtensions`。

## 接入约定

- Vue 使用 `v-model` 维护可编辑内容，`MdPreview` 使用 `:model-value`；依赖的 Vue 版本需满足当前安装包的 peerDependencies。
- 新代码给 `MdEditor` / `MdPreview` 使用 `id`；`MdCatalog` 仍用 `editorId`。无跨组件联动时可使用自动生成的 id；多个实例显式传值时要保持唯一。
- `MdPreview` 用于独立只读页面；`previewOnly` 工具栏动作和 `togglePreviewOnly()` 是编辑器内部显示切换，不是旧 `previewOnly` prop。
- SSR 使用字符串 `scrollElement`，如 `'html'` 或 `'#article-scroll'`；不要在模块初始化或服务端渲染期间访问 DOM。
- `onSave(markdown, htmlPromise)` 的第二项是 `Promise<string>`；需要 HTML 时先等待它。
- 自定义工具栏 / 页脚由数字占位符映射到 `defToolbars` / `defFooters`，不是按组件名注册。下拉和弹窗的 `visible` 与回调需要配套维护。
- `config()` 是全局单例，在应用初始化阶段调用。不要在组件渲染或每个实例的 setup 中反复设置；浏览器专用依赖放在客户端入口。
- 默认保留内置 markdown-it / CodeMirror 扩展，只增删任务需要的部分。
- 7.x 使用内置 SVG 图标；不要复制旧版 `iconfontType`、iconfont 脚本和字体资源。自定义图标查 `customIcon` 的当前类型。

## 渲染与资源约定

- 原生 HTML 默认关闭，Mermaid 默认 `strict`，KaTeX 默认 `trust: false`。依赖实例替换不改变这些配置。
- ECharts 默认使用 JSON5 解析对象；`parseOption` 管解析，`sanitizeOption` 管渲染配置。仅在业务明确需要时调整相应模块，保留其他默认值。
- 没有内置启用的 `XSSPlugin`；启用原生 HTML 或自定义渲染时，根据输入来源选择 `sanitize` / `XSSPlugin`。插件、解析器和回调是应用代码。
- 需要禁用运行时 CDN 时，为启用的功能注入本地实例并引入相应 CSS；未使用的能力可通过对应 `no*` prop 关闭。
- `clearSideEffects()` 会移除页面共享的 CDN 标签；在使用这些资源的所有实例卸载后，才由宿主统一清理。完全使用本地实例的普通组件卸载不需要调用它。

交付时说明接入方式、实际验证过的安装版本和场景；仅报告与这次改动相关的限制。
