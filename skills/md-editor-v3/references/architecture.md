# md-editor-v3 架构与实现理念

> 这份文档用于进阶排障。默认先解决用户项目接入问题，再回来看内部机制。

## 目录

- [1. 组件分层](#1-组件分层)
- [2. 为什么扩展点被拆成两条链](#2-为什么扩展点被拆成两条链)
- [3. 为什么默认走“重依赖延迟注入”](#3-为什么默认走重依赖延迟注入)
- [4. 为什么 `editorId` / `id` 这么关键](#4-为什么-editorid--id-这么关键)
- [5. 为什么 `MdPreview` 不是旧 `previewOnly` 的简单替换](#5-为什么-mdpreview-不是旧-previewonly-的简单替换)
- [6. Markdown 渲染管线里默认做了什么](#6-markdown-渲染管线里默认做了什么)
- [7. 为什么 ref API 很适合业务集成](#7-为什么-ref-api-很适合业务集成)
- [8. 为什么示例代码不能高于类型定义](#8-为什么示例代码不能高于类型定义)

## 1. 组件分层

公开导出大致分成三层：

- 主组件
  - `MdEditor`
  - `MdPreview`
  - `MdCatalog`
- 可复用的工具栏/页脚组件
  - `NormalToolbar`
  - `DropdownToolbar`
  - `ModalToolbar`
  - `NormalFooterToolbar`
- 全局能力
  - `config`
  - `XSSPlugin`
  - `clearSideEffects`
  - `zh_CN` / `en_US`

`MdEditor` 内部再拆成：

- `ToolBar`
- `Content`
  - CodeMirror 编辑区
  - Markdown 预览区
  - HTML 预览区
  - 内置目录区
- `Footer`

对应源码入口：

- `packages/MdEditor/Editor.tsx`
- `packages/MdPreview/MdPreview.tsx`
- `packages/MdCatalog/MdCatalog.tsx`

## 2. 为什么扩展点被拆成两条链

库把“编辑体验”和“渲染结果”明确分开：

- 编辑体验走 CodeMirror 6 扩展体系
- 渲染结果走 markdown-it 插件体系

这意味着：

- 想加自动补全、快捷键、编辑器主题、浮动工具栏，应该先看 `codeMirrorExtensions`
- 想加 Markdown 语法、改 code block HTML、加 XSS 处理、调整标题 id，应该先看 `markdownItConfig` / `markdownItPlugins`

对应源码：

- `packages/MdEditor/layouts/Content/composition/useCodeMirror.ts`
- `packages/MdEditor/layouts/Content/composition/useMarkdownIt.ts`

## 3. 为什么默认走“重依赖延迟注入”

库没有强迫业务项目安装所有富文本能力依赖，而是把这类依赖放进全局 `editorExtensions`：

- `highlight`
- `prettier`
- `cropper`
- `screenfull`
- `mermaid`
- `katex`
- `echarts`

默认行为：

- 如果没有手动提供实例，组件会在运行时按需插入 CDN 脚本/样式
- 例如编辑器需要图片裁剪时，才会插入 cropper 资源
- 仅预览模式不会去注入编辑区相关依赖

优点：

- 下游项目最小接入成本低
- 很多能力可以零配置启用

代价：

- 需要注意 CDN、副作用和 CSP
- 多次挂载/卸载后可能需要手动清理残留标签

相关代码：

- `packages/MdEditor/config.ts`
- `packages/MdEditor/composition.ts`
- `packages/util.ts`

## 4. 为什么 `editorId` / `id` 这么关键

`MdEditor`、`MdPreview`、`MdCatalog` 的部分协同不是靠直接 prop drilling，而是靠 `editorId` 对应的内部 event bus。

典型用途：

- 保存时等待异步 HTML 编译完成
- 目录组件主动拉取标题列表
- 全屏、预览、目录显示状态切换
- 外部 ref API 调用插入、重渲染、执行命令

这解释了两个关键约束：

- `id` / `editorId` 必须唯一；如果有外置目录或跨组件协同，相关组件要显式共用同一组标识
- `MdCatalog` 必须和目标实例共用同一个 `editorId`

补充说明：

- 从 5.0 开始，库内部默认使用 `useId`，SSR 场景不再强制要求手动传固定 `id`
- 但如果业务层自己生成 id，不要用每次渲染都会变化的随机值

相关代码：

- `packages/MdEditor/composition.ts`
- `packages/MdEditor/static/event-name.ts`
- `packages/MdEditor/utils/event-bus.ts`

## 5. 为什么 `MdPreview` 不是旧 `previewOnly` 的简单替换

虽然编辑器内部仍保留“previewOnly 状态”供工具栏按钮切换，但对外 API 已经明确改为独立组件：

- 业务层直接渲染内容：用 `MdPreview`
- 业务层需要编辑器内切换显示模式：通过 `MdEditor` 的设置状态和工具栏按钮

这样做的好处：

- 预览模式能更轻量地复用渲染链
- 业务代码不会被编辑器内部状态牵着走
- SSR / 纯展示场景更清晰

## 6. Markdown 渲染管线里默认做了什么

默认 markdown-it 管线里已经包含这些插件：

- `markdown-it-image-figures`
- admonition
- task list
- heading
- code
- `markdown-it-sub`
- `markdown-it-sup`
- 可选：katex
- 可选：mermaid
- 可选：echarts

并且设置了：

- `html: true`
- `breaks: true`
- `linkify: true`

这意味着：

- HTML 片段默认会被渲染
- 安全策略需要业务方主动考虑
- code block、标题、任务列表、公式、图表都已经有一层内置包装逻辑

## 7. 为什么 ref API 很适合业务集成

`MdEditor` 的 ref 暴露了很多适合业务集成的方法：

- 切换页面全屏、屏幕全屏、预览、目录、HTML 预览
- 手动插入 Markdown 片段
- 手动触发保存
- 重新渲染
- 读取选中文本
- 重置历史记录
- 挂 DOM 事件
- 获取底层 `EditorView`

这让库适合以下场景：

- AI 辅助写作
- 外部工具栏或命令面板
- 图片上传后回填
- 业务侧一键插入模板块
- 与自定义目录、侧边栏、快捷键系统集成

## 8. 为什么示例代码不能高于类型定义

这个仓库内的示例很有价值，但不应该比源码类型定义更高优先级。

原因：

- 示例可能保留历史兼容写法
- 类型定义和 props 才是当前版本的公开契约
- 一旦发现示例里有源码中不存在的字段，应以源码为准

一个直接例子：

- `MdPreview` 已经把 `editorId` 标记为 deprecated，并新增 `id`
- 但目录组件依然使用 `editorId`

因此，先看当前类型，再参考示例。
