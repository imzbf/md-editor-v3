---
name: md-editor-v3
description: 集成、定制或排查 md-editor-v3 时使用。适用于在 Vue 3、Nuxt、Electron 或 Web Component 项目中接入 MdEditor、MdPreview、MdCatalog，给 md-editor-v3 增加图片上传、目录联动、自定义工具栏、主题/语言、markdown-it 与 CodeMirror 扩展、config() 全局依赖替换，以及处理 SSR、样式、MdCatalog 滚动、高亮/公式/mermaid、本地实例替代 CDN、XSS 与副作用等常见问题。
---

# md-editor-v3

默认把这个 skill 用在**下游业务项目**里，而不是 md-editor-v3 仓库维护流程里。

本 skill 依据当前仓库的 `md-editor-v3@6.4.2` 整理。如果用户项目安装的版本不同，先核对本地安装包版本，再决定是否沿用这里的结论。

## 典型用户请求

- 帮我在 Vue 3 / Nuxt 项目里接入 `md-editor-v3`
- 帮我把 `MdPreview` 和 `MdCatalog` 接到文章详情页
- 给 `md-editor-v3` 加图片上传或自定义工具栏
- 用 `config()` 把 `highlight.js` / `katex` / `mermaid` 改成本地实例
- 排查 `MdCatalog` 不跟随滚动、SSR 报错、样式不对、保存时 HTML 不更新

## 先按任务找文档

- 想快速接入编辑器：看 `references/playbook.md#1-最小可编辑接入`
- 想做只读预览页：看 `references/playbook.md#2-只预览--外置目录`
- 想禁用 CDN、改用本地依赖实例：看 `references/playbook.md#3-在应用启动阶段注入本地依赖实例`
- 想做图片上传：看 `references/playbook.md#4-图片上传`
- 想从外部按钮或 AI 动作控制编辑器：看 `references/playbook.md#6-外部通过-ref-控制编辑器`
- 想做自定义工具栏或页脚：看 `references/api.md#6-自定义工具栏--页脚组件`
- 想扩展 markdown-it：看 `references/playbook.md#8-扩展-markdown-it-插件链`
- 想扩展 CodeMirror：看 `references/playbook.md#9-扩展-codemirror`
- 想确认某个功能依赖什么库、是否建议本地注入：看 `references/dependency-matrix.md`
- 遇到 SSR、目录滚动、旧 API、样式或安全问题：看 `references/pitfalls.md`
- 想理解实现机制或需要深度排障：看 `references/architecture.md`

## 先选组件，再动代码

先判断用户真正需要什么：

- 需要可编辑 Markdown：用 `MdEditor`
- 只需要渲染内容：用 `MdPreview`
- 需要目录导航：用 `MdCatalog`
- 需要自定义工具栏/页脚：用 `DropdownToolbar`、`ModalToolbar`、`NormalFooterToolbar`
- 需要改全局依赖、渲染链或编辑链：用 `config()`
- 需要处理 HTML 安全：用 `sanitize` 或 `XSSPlugin`
- 需要清理默认注入的外部资源：用 `clearSideEffects()`

默认接入规则：

- `MdEditor` 导入 `md-editor-v3/lib/style.css`
- `MdPreview` 导入 `md-editor-v3/lib/preview.css`
- 目录必须和目标编辑器/预览使用同一个 `id`/`editorId`
- 如果编辑器 / 预览器要和外部 `MdCatalog` 或业务控制逻辑跨组件联动，显式传同一个 `id`

## 按这个顺序排查和实施

1. 先确认场景
   - 是编辑器、预览器、目录、上传、工具栏扩展，还是渲染链/编辑链定制。
2. 先检查基础接入
   - 样式是否导对。
   - `id` 是否稳定。
   - `MdCatalog` 是否绑定到同一个实例。
   - SSR 下 `scrollElement` 是否传字符串选择器而不是 DOM。
3. 再决定扩展层级
   - 只改显示或交互：优先 props 和事件。
   - 需要外部控制：优先 ref API。
   - 需要改 Markdown 语法或 HTML 输出：优先 markdown-it 钩子。
   - 需要改编辑体验：优先 CodeMirror 钩子。
   - 需要改上传、保存、错误处理：优先事件 props。
4. 最后处理运行时细节
   - 决定是否要本地实例替换 CDN。
   - 决定是否要接入 `sanitize` / `XSSPlugin`。
   - 决定是否存在 Nuxt、Electron、Web Component 特殊约束。

## 坚持这些高优先级约束

- 不要继续引导用户给 `MdEditor` 传已移除的旧 `previewOnly` prop；业务层预览模式应改用 `MdPreview`。
- 给 `MdPreview` 和 `MdEditor` 写新代码时，优先使用 `id`；`MdPreview.editorId` 仅视为兼容旧代码。
- 给 `MdCatalog` 传参时继续使用 `editorId`，不要误写成 `id`。
- 把 `onSave` 的第二个参数当成 `Promise<string>` 处理，不要当同步 HTML 字符串用。
- 使用自定义工具栏和页脚时，牢记是“数字占位符 + `defToolbars` / `defFooters`”映射，不是按名字自动注册。
- 把 `config()` 当作全局单例初始化，而不是组件局部状态。
- 面向用户输入时主动处理 HTML/XSS 风险；默认 markdown-it 允许 `html: true`。

## 先核对安装版本，再决定是否深挖源码

如果用户反馈“skill 说得对，但项目里行为不一样”，按下面顺序核对：

1. 先看业务项目里的 `node_modules/md-editor-v3/package.json`
2. 再看业务项目里的 `node_modules/md-editor-v3/lib/types/index.d.ts`
3. 如果仍然解释不通，再去看本仓库源码：
   - `packages/MdEditor/props.ts`
   - `packages/MdEditor/type.ts`
   - `packages/MdEditor/config.ts`
   - `packages/MdEditor/composition.ts`
   - `packages/MdEditor/layouts/Content/composition/useMarkdownIt.ts`
   - `packages/MdEditor/layouts/Content/composition/useCodeMirror.ts`
   - `packages/MdPreview/MdPreview.tsx`
   - `packages/MdCatalog/MdCatalog.tsx`

默认不要一上来就从仓库内部实现讲起，除非用户正在调库源码，或者公开 API 已经不足以定位问题。

## 需要时再读附加文档

- 查公开 API、props、ref 方法：看 `references/api.md`
- 查推荐接入方式和可直接套用的代码模式：看 `references/playbook.md`
- 查功能依赖矩阵与本地实例建议：看 `references/dependency-matrix.md`
- 查常见坑与排查顺序：看 `references/pitfalls.md`
- 查内部实现理念和进阶排障线索：看 `references/architecture.md`

## 按这个标准交付

交付 md-editor-v3 相关改动时，默认说明：

- 为什么选 `MdEditor` / `MdPreview` / `MdCatalog`
- 接入点放在哪：组件、样式、`config()`、事件或 ref API
- 版本前提是什么
- 风险点有哪些：SSR、XSS、CDN、副作用、目录同步、上传链路
- 验证了哪些路径：至少写清手工验证项
