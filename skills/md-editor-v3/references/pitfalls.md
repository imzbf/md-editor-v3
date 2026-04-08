# md-editor-v3 常见坑点

## 目录

- [1. 导错样式文件](#1-导错样式文件)
- [2. 手动生成的 `id` 每次渲染都变化](#2-手动生成的-id-每次渲染都变化)
- [3. `MdCatalog` 绑定错字段](#3-mdcatalog-绑定错字段)
- [4. 继续使用旧 `previewOnly` prop](#4-继续使用旧-previewonly-prop)
- [5. `onSave` 误当同步 HTML](#5-onsave-误当同步-html)
- [6. 自定义工具栏顺序错乱](#6-自定义工具栏顺序错乱)
- [7. 只看示例，不看当前类型](#7-只看示例不看当前类型)
- [8. 忽略 HTML/XSS 风险](#8-忽略-htmlxss-风险)
- [9. 在组件内部频繁调用 `config()`](#9-在组件内部频繁调用-config)
- [10. 忽略 CDN 副作用](#10-忽略-cdn-副作用)
- [11. 预览目录不跟随滚动](#11-预览目录不跟随滚动)
- [12. `scrollElement` 指向了错误或未定位的滚动容器](#12-scrollelement-指向了错误或未定位的滚动容器)
- [13. Nuxt / SSR 路径里直接访问了 `document` 或 `window`](#13-nuxt--ssr-路径里直接访问了-document-或-window)
- [14. 自定义 markdown-it / CodeMirror 时把内置能力全丢了](#14-自定义-markdown-it--codemirror-时把内置能力全丢了)

## 1. 导错样式文件

症状：

- `MdPreview` 看起来像半残的编辑器
- 目录或预览样式异常

处理：

- `MdEditor` 用 `lib/style.css`
- `MdPreview` 用 `lib/preview.css`

## 2. 手动生成的 `id` 每次渲染都变化

症状：

- 目录联动失效
- hydration 不一致
- 多实例串台

处理：

- 从 5.0 开始，默认 `useId` 已可覆盖常规 SSR 场景，不再强制要求手动传固定 `id`
- 如果编辑器 / 预览器要和外部 `MdCatalog` 或业务控制逻辑跨组件联动，显式传同一个 `id`
- 如果业务层自己生成 id，不要用 `Math.random()` 这类每次渲染都变化的值

## 3. `MdCatalog` 绑定错字段

常见误解：

- 给 `MdCatalog` 传 `id`

实际：

- `MdCatalog` 用的是 `editorId`
- `MdPreview` / `MdEditor` 新代码优先用 `id`

所以目录接入时往往需要写成：

```vue
<MdPreview :id="previewId" />
<MdCatalog :editorId="previewId" />
```

## 4. 继续使用旧 `previewOnly` prop

现状：

- 编辑器内部还有 previewOnly 状态和工具栏按钮
- 但业务层公开用法已经改成独立 `MdPreview` 组件

处理：

- 新代码不要再尝试给 `MdEditor` 传旧 `previewOnly` prop

## 5. `onSave` 误当同步 HTML

症状：

- 保存时拿到旧 HTML
- 公式/图表还没替换完成

原因：

- 第二个参数是 `Promise<string>`
- 默认还存在渲染延迟 `renderDelay`

处理：

- `await htmlPromise` 或 `htmlPromise.then(...)`

## 6. 自定义工具栏顺序错乱

症状：

- 点击了自定义按钮但渲染的是另一个组件
- 自定义按钮完全不显示

原因：

- `toolbars` / `footers` 用数字占位映射
- `defToolbars` / `defFooters` 按 vnode 顺序取值

处理：

- 保持占位数字和插槽节点顺序一一对应

## 7. 只看示例，不看当前类型

症状：

- 使用了源码里不存在的配置项
- 老示例能跑但当前类型报错

处理：

- 先看业务项目里的 `node_modules/md-editor-v3/lib/types/index.d.ts`
- 再看仓库里的 `packages/MdEditor/props.ts` / `packages/MdEditor/type.ts`
- 最后再参考 `dev/` 和 `example/`

## 8. 忽略 HTML/XSS 风险

现状：

- markdown-it 默认 `html: true`
- `sanitize` 默认直接返回原 HTML

处理：

- 面向用户输入时，至少接入 `sanitize`
- 或在 `markdownItPlugins` 中加入 `XSSPlugin`

## 9. 在组件内部频繁调用 `config()`

症状：

- 多个页面行为互相影响
- 配置重复覆盖
- 难以定位是谁改了全局渲染链

处理：

- 把 `config()` 放到应用启动阶段
- 把它当单例初始化，不当局部状态

## 10. 忽略 CDN 副作用

症状：

- 动态挂载卸载后页面残留 script/link
- 微前端场景重复注入

处理：

- 如果完全本地注入实例，尽量不用默认 CDN
- 动态销毁后如有必要调用 `clearSideEffects()`

## 11. 预览目录不跟随滚动

排查顺序：

1. `MdCatalog.editorId` 是否正确
2. `scrollElement` 是否指向真正滚动容器
3. 容器是否需要 `scrollElementOffsetTop`
4. Web Component 场景是否忘了 `isScrollElementInShadow`
5. 是否应该改成 `syncWith="editor"`

## 12. `scrollElement` 指向了错误或未定位的滚动容器

症状：

- `MdCatalog` 能渲染目录，但高亮不同步
- 点击目录后能跳转，但滚动时当前项不更新
- 只有默认预览容器能工作，自定义容器失效

原因：

- `scrollElement` 没有指向真正发生滚动的元素
- 传入了自定义滚动容器，但该元素缺少定位上下文
- SSR 场景把 DOM 元素直接传到了服务端渲染路径

处理：

- 优先确认真正滚动的是哪个元素
- 自定义滚动容器时，让 `scrollElement` 直接指向该容器
- SSR / Nuxt 下优先传选择器字符串，例如 `'#article-scroll'`
- 容器如果不是默认预览区，补查是否需要 `scrollElementOffsetTop`

## 13. Nuxt / SSR 路径里直接访问了 `document` 或 `window`

症状：

- 服务端报 `document is not defined`
- 明明编辑器能渲染，但预览目录或自定义逻辑在 Nuxt 中报错

原因：

- 在服务端执行路径里直接写了 `document.documentElement`
- 把依赖真实 DOM 的逻辑直接写进了通用 setup 过程

处理：

- SSR 下优先给 `scrollElement` 传字符串选择器
- 把依赖 DOM 的逻辑移动到客户端环境
- 先确认问题来自业务代码，而不是 md-editor-v3 组件本身

## 14. 自定义 markdown-it / CodeMirror 时把内置能力全丢了

症状：

- 快捷键没了
- Markdown 识别异常
- 预览里的任务列表、标题锚点或代码块功能消失

处理：

- 在返回值里保留原扩展/原插件，再做增量修改
- 只有在非常清楚后果时才整体替换
