# md-editor-v3 实战模式

> 先按这里的模式接入，再做进阶定制。示例默认面向 Vue 3 下游业务项目。

## 目录

- [1. 最小可编辑接入](#1-最小可编辑接入)
- [2. 只预览 + 外置目录](#2-只预览--外置目录)
- [2.1 Nuxt / SSR 快速检查清单](#21-nuxt--ssr-快速检查清单)
- [2.2 Nuxt 中接入可编辑 `MdEditor`](#22-nuxt-中接入可编辑-mdeditor)
- [2.3 让目录跟随编辑区而不是预览区](#23-让目录跟随编辑区而不是预览区)
- [3. 在应用启动阶段注入本地依赖实例](#3-在应用启动阶段注入本地依赖实例)
- [3.1 一次性替换常见本地实例](#31-一次性替换常见本地实例)
- [3.2 ECharts 配置解析](#32-echarts-配置解析)
- [3.3 按模块开放受信任能力](#33-按模块开放受信任能力)
- [4. 图片上传](#4-图片上传)
- [4.1 图片上传排查清单](#41-图片上传排查清单)
- [5. 保存时拿到最新 HTML](#5-保存时拿到最新-html)
- [6. 外部通过 ref 控制编辑器](#6-外部通过-ref-控制编辑器)
- [7. 自定义工具栏](#7-自定义工具栏)
- [8. 扩展 markdown-it 插件链](#8-扩展-markdown-it-插件链)
- [9. 扩展 CodeMirror](#9-扩展-codemirror)
- [10. Web Component / Electron / Nuxt](#10-web-component--electron--nuxt)
- [11. 需要替换预览 DOM 外壳时](#11-需要替换预览-dom-外壳时)

## 1. 最小可编辑接入

```vue
<template>
  <MdEditor v-model="text" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('# Hello md-editor-v3');
</script>
```

适用：

- 普通 Vue 3 页面
- 先跑通，再逐步叠加上传、目录、定制工具栏

## 2. 只预览 + 外置目录

```vue
<template>
  <MdPreview :id="previewId" :model-value="text" />
  <MdCatalog :editorId="previewId" :scroll-element="scrollElement" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const previewId = 'article-preview';
const text = ref('# Preview');
const scrollElement = 'html';
</script>
```

字符串选择器同时适用于客户端和 SSR；这里的 `html` 对应整页滚动。自定义容器应传实际滚动元素的选择器。

## 2.1 Nuxt / SSR 快速检查清单

出现目录不同步、hydration 不一致或服务端报错时，优先检查：

1. 如果存在外置目录或外部控制逻辑，是否给 `MdEditor` / `MdPreview` 显式传了同一个 `id`
2. `MdCatalog` 是否继续使用同一个 `editorId`
3. `scrollElement` 是否在 SSR 场景下传了字符串选择器，而不是 `document.documentElement`
4. 是否把只读场景拆成了 `MdPreview`，而不是继续依赖旧 `previewOnly` 思路

默认先修这四项，再看更深层问题。

## 2.2 Nuxt 中接入可编辑 `MdEditor`

最小思路：

```vue
<template>
  <MdEditor v-model="text" id="article-editor" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('# md-editor-v3');
</script>
```

补充约束：

- 先给编辑器传稳定 `id`
- 如果业务代码里还要访问 `document`、`window` 或真实 DOM，把这些逻辑放到客户端环境里
- 如果目录组件一起使用，`MdCatalog.editorId` 必须继续指向同一个 `id`

## 2.3 让目录跟随编辑区而不是预览区

如果用户希望目录高亮跟随**编辑区滚动**，而不是预览区滚动，可以这样写：

```vue
<MdCatalog editorId="article-editor" syncWith="editor" />
```

适合：

- 左侧编辑、右侧预览，但用户主要在编辑区工作
- 预览区没有独立滚动，目录却需要随编辑位置高亮

先确认用户到底想跟随哪个区域，再决定是否需要改成 `syncWith="editor"`。

## 3. 在应用启动阶段注入本地依赖实例

下面的完整配置适用于需要离线运行的浏览器入口；只用部分功能时，按 [依赖矩阵](dependency-matrix.md) 保留所需实例并关闭未使用的能力。

```ts
import { config } from 'md-editor-v3';
import highlight from 'highlight.js';
import mermaid from 'mermaid';
import katex from 'katex';
import Cropper from 'cropperjs';
import screenfull from 'screenfull';
import * as echarts from 'echarts';
import * as prettier from 'prettier/standalone';
import parserMarkdown from 'prettier/plugins/markdown';
import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.min.css';
import 'cropperjs/dist/cropper.css';

config({
  editorExtensions: {
    highlight: { instance: highlight },
    mermaid: { instance: mermaid },
    katex: { instance: katex },
    cropper: { instance: Cropper },
    screenfull: { instance: screenfull },
    echarts: { instance: echarts },
    prettier: {
      prettierInstance: prettier,
      parserMarkdownInstance: parserMarkdown
    }
  }
});
```

## 3.1 一次性替换常见本地实例

- 安装与实例 API 兼容的版本：Cropper.js 使用 1.x；本地 screenfull 可使用 ESM 6.x。
- Prettier 使用浏览器入口 `prettier/standalone`，不要从 Node 主入口导入。
- ECharts 使用命名空间导入；上面的配置也覆盖了这个可选模块。
- 同一套配置在应用初始化时设置，不在每个组件实例或重渲染时调用。
- 提供本地高亮实例后，代码主题 CSS 由应用管理；切换 `codeTheme` 不会自动替换已导入的本地 CSS。
- Web Component 需要将组件 CSS 注入 Shadow DOM，并在文档中注册字体，见对应 [examples](https://github.com/imzbf/md-editor-v3/tree/develop/examples)。

## 3.2 ECharts 配置解析

`>=6.5.0` 支持通过 `editorExtensions.echarts.parseOption` 自定义 ECharts 代码块解析。7.x 默认使用 `JSON5.parse`，只接受对象数据且不会执行代码；例如，需要严格 JSON 格式时可在应用启动阶段覆盖解析器：

```ts
import { config } from 'md-editor-v3';

config({
  editorExtensions: {
    echarts: {
      parseOption(code) {
        return JSON.parse(code);
      }
    }
  }
});
```

如果业务需要兼容 ECharts 官方示例里的函数写法，可以显式配置执行型解析器，但只应在内容可信时使用：

```ts
config({
  editorExtensions: {
    echarts: {
      parseOption(code) {
        // eslint-disable-next-line no-new-func
        return new Function(`"use strict"; return (${code}\n);`)();
      }
    }
  }
});
```

渲染链按 `parseOption → echartsConfig → sanitizeOption → setOption` 执行。上例只开放 JavaScript 解析，默认仍将 tooltip 设为 `richText`、转义数据视图文案并过滤危险跳转协议。格式化模板中的 HTML 会作为文本显示。

当内容及回调都可信，而且需要 HTML tooltip 等完整渲染能力时，再独立开放渲染策略：

```ts
config({
  editorExtensions: {
    echarts: {
      sanitizeOption: (option) => option
    }
  }
});
```

`sanitizeOption` 是同步函数，接收 `(option, { editorId, element })`，返回交给 `setOption` 的对象。自定义它会接管整个渲染安全处理；JSON5 解析失败不会自动尝试 `new Function`。执行型解析器仍受宿主 CSP 限制。

## 3.3 按模块开放受信任能力

下面各项相互独立，在应用挂载前只配置需要开放的模块。

```ts
import { config } from 'md-editor-v3';

// 原生 HTML：默认 html:false，显式开启后可按需搭配 sanitize 或 XSSPlugin。
config({
  markdownItConfig(md) {
    md.set({ html: true });
  }
});

// Mermaid：默认 strict；loose 允许受信任的图表交互，插入 SVG 后会绑定回调。
config({
  mermaidConfig(base) {
    return { ...base, securityLevel: 'loose' };
  }
});

// KaTeX：默认 trust:false，也可将 trust 设为按命令和协议判断的函数。
config({
  katexConfig(base) {
    return { ...base, trust: true };
  }
});
```

普通主题配置和依赖实例替换会继续继承安全默认值。Mermaid 文档中的 frontmatter / init 指令不能覆盖 `securityLevel`、`secure`、`dompurifyConfig` 等受保护配置；这些选项由应用的 `mermaidConfig` 决定。`sanitizeMermaid` 保持异步后处理接口，更换它或切换主题会使当前预览的 SVG 缓存失效。

默认安全边界覆盖文档内容。应用注入的 renderer、插件、解析器和回调属于受信任代码，需要与文档数据区分。

浏览器专用依赖的初始化模块应放在客户端入口。Nuxt 可使用 `.client.ts` 插件；Next 中若某个依赖在导入时访问 DOM，再通过客户端动态导入加载，并在配置完成后挂载编辑器。不要仅为了避免业务代码中的 DOM 访问而关闭整个页面的 SSR。

## 4. 图片上传

```vue
<MdEditor v-model="text" :on-upload-img="handleUploadImg" />
```

```ts
import type { UploadImgEvent } from 'md-editor-v3';

const handleUploadImg: UploadImgEvent = async (files, callback) => {
  const uploaded = await Promise.all(
    files.map(async (file) => {
      const body = new FormData();
      body.append('file', file);
      const response = await fetch('/api/upload', { method: 'POST', body });
      if (!response.ok) throw new Error('上传失败');
      const { url } = await response.json();
      return {
        url,
        alt: file.name,
        title: file.name
      };
    })
  );

  callback(uploaded);
};
```

接口片段约定 `/api/upload` 返回 `{ url: string }`，上传异常需要接入业务的错误提示。

理解要点：

- 组件并不负责真正上传，只负责接文件和回填 Markdown
- `callback` 可以接字符串数组，也可以接 `{ url, alt, title }[]`
- 需要彻底禁掉图片上传 UI 时用 `noUploadImg`

## 4.1 图片上传排查清单

如果用户说“上传没反应”或“上传成功但没回填”，按这个顺序检查：

1. 是否真的传了 `onUploadImg`
2. 上传函数是否最终调用了 `callback(...)`
3. `callback` 传入的是不是字符串数组或 `{ url, alt, title }[]`
4. 是否同时开启了 `noUploadImg`
5. 是否还需要 `transformImgUrl` 对最终链接做二次转换

## 5. 保存时拿到最新 HTML

```ts
import type { SaveEvent } from 'md-editor-v3';

const handleSave: SaveEvent = async (markdown, htmlPromise) => {
  const html = await htmlPromise;
  const response = await fetch('/api/article/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ markdown, html })
  });
  if (!response.ok) throw new Error('保存失败');
};
```

通过 `<MdEditor :on-save="handleSave" />` 绑定到已有编辑器；接口路径和错误提示接入由业务提供。

不要把第二个参数当同步字符串处理。内部渲染默认有 `renderDelay`，而且 mermaid/echarts 等替换流程也是异步的。

## 6. 外部通过 ref 控制编辑器

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor, type ExposeParam } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const editorRef = ref<ExposeParam>();
const text = ref('# 引用模板');

const insertQuote = () => {
  editorRef.value?.insert((selectedText) => ({
    targetValue: `> ${selectedText || '引用内容'}`,
    select: false
  }));
};
</script>

<template>
  <button type="button" @click="insertQuote">插入引用</button>
  <MdEditor ref="editorRef" v-model="text" />
</template>
```

`editorRef` 必须绑定到 `MdEditor` 实例；方法可用于外部命令面板或业务操作按钮。

## 7. 自定义工具栏

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  MdEditor,
  DropdownToolbar,
  NormalFooterToolbar,
  type ExposeParam
} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('');
const visible = ref(false);
const editorRef = ref<ExposeParam>();

const changeVisible = (next: boolean) => {
  visible.value = next;
};
const insertQuote = () => {
  editorRef.value?.insert((selectedText) => ({
    targetValue: `> ${selectedText || '引用内容'}`,
    select: false
  }));
  visible.value = false;
};
</script>

<template>
  <MdEditor
    ref="editorRef"
    v-model="text"
    :toolbars="['bold', 'italic', 0, '=', 'preview']"
    :footers="['markdownTotal', '=', 0]"
  >
    <template #defToolbars>
      <DropdownToolbar title="插入模板" :visible="visible" :on-change="changeVisible">
        模板
        <template #overlay>
          <div role="menu" aria-label="模板">
            <button type="button" role="menuitem" @click="insertQuote">引用</button>
          </div>
        </template>
      </DropdownToolbar>
    </template>
    <template #defFooters>
      <NormalFooterToolbar>草稿</NormalFooterToolbar>
    </template>
  </MdEditor>
</template>
```

数字 `0` 对应插槽中的第一个节点。`visible` 与 `onChange` 配套维护下拉状态；这里用编辑器 ref 插入内容，无需让每个业务组件自己实现插入逻辑。原生菜单按钮配合内置键盘导航，表单下拉则保留原生表单语义。

## 8. 扩展 markdown-it 插件链

```ts
import { config } from 'md-editor-v3';

config({
  markdownItConfig(md) {
    md.set({ typographer: true });
  },
  markdownItPlugins(plugins) {
    return plugins.map((item) =>
      item.type === 'image'
        ? { ...item, options: { ...item.options, figcaption: false } }
        : item
    );
  }
});
```

这里只修改排版选项和图片说明，保留标题、任务列表、代码块等内置插件。需要处理业务允许的原生 HTML 时，再按 [安全与 HTML 清洗](api.md#8-安全与-html-清洗) 接入 `XSSPlugin` 或 `sanitize`。

## 9. 扩展 CodeMirror

```ts
import { lineNumbers } from '@codemirror/view';
import { config } from 'md-editor-v3';

config({
  codeMirrorExtensions(extensions) {
    return [
      ...extensions,
      {
        type: 'lineNumbers',
        extension: lineNumbers()
      }
    ];
  }
});
```

适合：

- 行号
- 自定义快捷键
- 自动补全
- 浮动工具栏增强

做这类定制时，尽量返回“原扩展 + 增量扩展”，避免完全丢掉内置扩展。

## 10. Web Component / Electron / Nuxt

这三个场景都已经有仓库示例，但落地时要抓住真正的约束：

- Nuxt / SSR
  - `id` 必须稳定
  - `scrollElement` 优先传字符串选择器
  - 业务代码里不要在服务端路径直接访问 `document` / `window`
- Web Component
  - 如果目录跟随的滚动容器在 shadow DOM 内，给 `MdCatalog` 传 `isScrollElementInShadow`
  - 共享 CDN 资源仅在所有相关实例卸载后由宿主统一清理；本地实例模式不需要 `clearSideEffects()`
- Electron
  - 优先本地依赖实例，不依赖外网 CDN

## 11. 需要替换预览 DOM 外壳时

使用 `previewComponent`：

- 组件会收到 `html`、`id`、`class`
- 适合接入业务自定义滚动容器、额外包裹层或动画
- 这是高级用法，先确认默认 `UpdateOnDemand` 不能满足需求再用
