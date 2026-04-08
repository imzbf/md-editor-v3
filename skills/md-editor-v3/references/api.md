# md-editor-v3 公开 API 速查

> 基于 `md-editor-v3@6.4.2` 整理。若用户项目版本不同，先核对本地安装包类型定义。

## 目录

- [1. 公开导出](#1-公开导出)
- [2. `MdEditor` 关键 props](#2-mdeditor-关键-props)
- [3. `MdEditor` ref API](#3-mdeditor-ref-api)
- [4. `MdPreview`](#4-mdpreview)
- [5. `MdCatalog`](#5-mdcatalog)
- [6. 自定义工具栏 / 页脚组件](#6-自定义工具栏--页脚组件)
- [7. `config()` 全局配置](#7-config-全局配置)
- [8. 安全与 HTML 清洗](#8-安全与-html-清洗)
- [9. 清理副作用](#9-清理副作用)
- [10. 用户项目里如何核对当前版本 API](#10-用户项目里如何核对当前版本-api)

## 1. 公开导出

主入口 `packages/index.ts` / `packages/preview.ts` 暴露了这些能力：

- `MdEditor`
- `MdPreview`
- `MdCatalog`
- `NormalToolbar`
- `DropdownToolbar`
- `ModalToolbar`
- `MdModal`
- `StrIcon`
- `NormalFooterToolbar`
- `config`
- `allToolbar`
- `allFooter`
- `editorExtensionsAttrs`
- `clearSideEffects`
- `XSSPlugin`
- 类型导出，例如 `ExposeParam`、`MdHeadingId`、`ToolbarNames`

样式入口：

- 编辑器：`md-editor-v3/lib/style.css`
- 仅预览：`md-editor-v3/lib/preview.css`

## 2. `MdEditor` 关键 props

最常用：

- `modelValue`
- `theme`: `'light' | 'dark'`
- `language`
- `previewTheme`
- `codeTheme`
- `id`
- `onChange`
- `onSave`
- `onUploadImg`

显示与布局：

- `pageFullscreen`
- `preview`
- `htmlPreview`
- `toolbars`
- `floatingToolbars`
- `toolbarsExclude`
- `footers`
- `inputBoxWidth`
- `catalogLayout`
- `catalogMaxDepth`

编辑体验：

- `placeholder`
- `tabWidth`
- `autoFocus`
- `disabled`
- `readOnly`
- `maxLength`
- `autoDetectCode`
- `showToolbarName`
- `completions`

渲染控制：

- `sanitize`
- `sanitizeMermaid`
- `mdHeadingId`
- `showCodeRowNumber`
- `codeStyleReverse`
- `codeStyleReverseList`
- `formatCopiedText`
- `previewComponent`
- `codeFoldable`
- `autoFoldThreshold`

依赖开关：

- `noPrettier`
- `noUploadImg`
- `noMermaid`
- `noKatex`
- `noHighlight`
- `noImgZoomIn`
- `noEcharts`

图片与拖拽：

- `transformImgUrl`
- `onDrop`

自定义插槽型扩展：

- `defToolbars`
- `defFooters`

重要事件：

- `onChange`
- `onSave`
- `onUploadImg`
- `onHtmlChanged`
- `onGetCatalog`
- `onError`
- `onBlur`
- `onFocus`
- `onInput`
- `onDrop`
- `oninputBoxWidthChange`
- `onRemount`

## 3. `MdEditor` ref API

类型：`ExposeParam`

方法：

- `on(eventName, callback)`
- `togglePageFullscreen(status?)`
- `toggleFullscreen(status?)`
- `togglePreview(status?)`
- `togglePreviewOnly(status?)`
- `toggleHtmlPreview(status?)`
- `toggleCatalog(status?)`
- `triggerSave()`
- `insert(generate)`
- `focus(options?)`
- `rerender()`
- `getSelectedText()`
- `resetHistory()`
- `domEventHandlers(handlers)`
- `execCommand(direct)`
- `getEditorView()`

值得注意：

- `insert(generate)` 会把当前选中文本传给生成器，再决定插入内容与选区行为。
- `getEditorView()` 允许业务方直接接管底层 CodeMirror 6 实例。
- `togglePreviewOnly` 只是编辑器内切换状态，不等同于业务层应该继续使用旧 `previewOnly` prop。

## 4. `MdPreview`

复用大量渲染相关 props：

- `modelValue`
- `theme`
- `language`
- `previewTheme`
- `codeTheme`
- `id`
- `mdHeadingId`
- `sanitize`
- `sanitizeMermaid`
- `showCodeRowNumber`
- `formatCopiedText`
- `noMermaid`
- `noKatex`
- `noHighlight`
- `noImgZoomIn`
- `noEcharts`
- `previewComponent`
- `codeFoldable`
- `autoFoldThreshold`
- `onHtmlChanged`
- `onGetCatalog`
- `onRemount`

ref API 只有：

- `rerender()`

补充说明：

- `MdPreview` 仍兼容旧字段 `editorId`，但新代码优先用 `id`。
- CSS 入口是 `preview.css`，不要误导入完整编辑器样式。

## 5. `MdCatalog`

核心 props：

- `editorId`
- `scrollElement`
- `theme`
- `offsetTop`
- `scrollElementOffsetTop`
- `mdHeadingId`
- `isScrollElementInShadow`
- `syncWith`: `'editor' | 'preview'`
- `catalogMaxDepth`
- `onClick`
- `onActive`

关键约束：

- `editorId` 必须和目标编辑器/预览实例一致。
- `scrollElement` 默认指向 `#${editorId}-preview-wrapper`。
- SSR 场景推荐传选择器字符串。
- 如果 `scrollElement` 传的是自定义元素，该元素本身应是实际滚动容器，并且应具备定位上下文。
- Web Component 场景如果滚动容器在 shadow DOM 内，需要 `isScrollElementInShadow`。

## 6. 自定义工具栏 / 页脚组件

可用组件：

- `DropdownToolbar`
- `ModalToolbar`
- `NormalFooterToolbar`

接入方式不是自动注册，而是：

1. 在 `toolbars` / `footers` 数组里放数字占位，例如 `0`、`1`
2. 在 `defToolbars` / `defFooters` 里按顺序提供对应 vnode

库会克隆这些 vnode，并额外注入：

- `theme`
- `previewTheme`
- `language`
- `codeTheme`
- `disabled`
- `showToolbarName`
- `insert(generate)`，仅工具栏扩展会拿到

## 7. `config()` 全局配置

`config(options)` 修改的是全局单例 `globalConfig`。

最重要的字段：

- `editorExtensions`
  - 传入本地实例或 CDN 地址
- `editorExtensionsAttrs`
  - 为注入的 script/link 补充 `integrity`、`crossOrigin` 等属性
- `editorConfig`
  - `languageUserDefined`
  - `mermaidTemplate`
  - `renderDelay`
  - `zIndex`
- `codeMirrorExtensions(extensions, options)`
  - 接管或补充 CodeMirror 扩展列表
- `markdownItConfig(md, options)`
  - 直接修改 markdown-it 实例
- `markdownItPlugins(plugins, options)`
  - 调整内置插件列表与参数
- `mermaidConfig(base)`
- `katexConfig(base)`
- `echartsConfig(base)`

细节：

- `config()` 内部是深合并。
- 名字带 `instance` 的字段不会深合并，而是直接替换。
- 默认把 `config()` 放在应用启动阶段执行一次，不要在组件 `setup()` 里频繁调用。

## 8. 安全与 HTML 清洗

两条常用路径：

- `sanitize(html) => html`
  - 适合业务方接入 DOMPurify、自定义清洗逻辑
- `XSSPlugin`
  - 作为 markdown-it 插件插入渲染链

因为默认 markdown-it 开启了 `html: true`，如果业务允许用户输入任意 Markdown/HTML，应主动处理安全问题。

## 9. 清理副作用

`clearSideEffects()` 会移除组件通过 CDN 注入的资源标签，适合：

- 微前端宿主卸载
- Web Component 动态注册/卸载
- 演示页反复重建实例

如果业务方完全通过 `config()` 注入本地实例并自行管理样式，通常不需要这个方法。

## 10. 用户项目里如何核对当前版本 API

如果担心 skill 依据的版本和用户项目不一致，先按这个顺序核对：

1. `node_modules/md-editor-v3/package.json`
2. `node_modules/md-editor-v3/lib/types/index.d.ts`
3. 必要时再看仓库源码里的：
   - `packages/MdEditor/props.ts`
   - `packages/MdEditor/type.ts`
   - `packages/MdEditor/config.ts`
