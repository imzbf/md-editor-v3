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
- [4. 图片上传](#4-图片上传)
- [4.1 图片上传排查清单](#41-图片上传排查清单)
- [5. 保存时拿到最新 HTML](#5-保存时拿到最新-html)
- [6. 外部通过 ref 控制编辑器](#6-外部通过-ref-控制编辑器)
- [7. 自定义工具栏](#7-自定义工具栏)
- [7.1 自定义工具栏的实现步骤](#71-自定义工具栏的实现步骤)
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
const scrollElement = document.documentElement;
</script>
```

SSR 下改成：

```ts
const scrollElement = 'html';
```

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

适合：

- 业务有严格 CSP，不能依赖 CDN
- 已经安装了 `highlight.js`、`katex`、`mermaid` 等依赖
- 想避免运行时插 script/link

```ts
import { config } from 'md-editor-v3';
import highlight from 'highlight.js';
import mermaid from 'mermaid';
import katex from 'katex';
import * as prettier from 'prettier';
import parserMarkdown from 'prettier/plugins/markdown';

config({
  editorExtensions: {
    highlight: { instance: highlight },
    mermaid: { instance: mermaid, enableZoom: true },
    katex: { instance: katex },
    prettier: {
      prettierInstance: prettier,
      parserMarkdownInstance: parserMarkdown
    }
  }
});
```

注意：

- 这类调用应在应用初始化时执行一次
- 不要在组件 `setup()` 中每次渲染都调用

## 3.1 一次性替换常见本地实例

如果业务项目不希望依赖默认 CDN，可以一次性把常用实例都交给 `config()`：

```ts
import { config } from 'md-editor-v3';
import highlight from 'highlight.js';
import mermaid from 'mermaid';
import katex from 'katex';
import Cropper from 'cropperjs';
import screenfull from 'screenfull';
import * as prettier from 'prettier';
import parserMarkdown from 'prettier/plugins/markdown';

config({
  editorExtensions: {
    highlight: { instance: highlight },
    mermaid: { instance: mermaid, enableZoom: true },
    katex: { instance: katex },
    cropper: { instance: Cropper },
    screenfull: { instance: screenfull },
    prettier: {
      prettierInstance: prettier,
      parserMarkdownInstance: parserMarkdown
    }
  }
});
```

别忘了同步处理样式资源，例如：

- `highlight.js` 代码主题 CSS
- `katex/dist/katex.min.css`
- `cropperjs/dist/cropper.css`

例如：

```ts
import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.min.css';
import 'cropperjs/dist/cropper.css';
```

## 3.2 ECharts 配置解析

`>=6.5.0` 支持通过 `editorExtensions.echarts.parseOption` 自定义 echarts 代码块解析。当前 `6.5.x` 默认仍用 `new Function`，如果内容来源不可信，建议在应用启动阶段改成严格解析：

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

未来 `7.0` 计划默认使用 `JSON.parse`。如果升级后仍要兼容 ECharts 官方示例里的函数写法，可以由业务显式配置执行型解析器，但只应在内容可信时使用：

```ts
config({
  editorExtensions: {
    echarts: {
      parseOption(code) {
        // eslint-disable-next-line no-new-func
        return new Function(`return ${code}`)();
      }
    }
  }
});
```

## 3.3 GeoGebra 配置解析

GeoGebra 使用 `geogebra` 代码块，代码块内容默认按 JSON 解析为 `GGBApplet` 参数：

````md
```geogebra
{
  "appName": "graphing",
  "showAlgebraInput": true,
  "commands": ["f(x)=sin(x)", "g(x)=cos(x)"]
}
```
````

如果业务需要支持对象字面量或其他格式，可以在应用启动阶段显式替换解析策略。

## 4. 图片上传

```vue
<MdEditor v-model="text" :on-upload-img="handleUploadImg" />
```

```ts
const handleUploadImg = async (files, callback) => {
  const uploaded = await Promise.all(
    files.map(async (file) => {
      const url = await uploadFile(file);
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
const handleSave = (markdown, htmlPromise) => {
  void htmlPromise.then((html) => {
    persist(markdown, html);
  });
};
```

不要把第二个参数当同步字符串处理。内部渲染默认有 `renderDelay`，而且 mermaid/echarts 等替换流程也是异步的。

## 6. 外部通过 ref 控制编辑器

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor, type ExposeParam } from 'md-editor-v3';

const editorRef = ref<ExposeParam>();

const insertTemplate = () => {
  editorRef.value?.insert((selectedText) => ({
    targetValue: `> ${selectedText || 'quoted text'}`,
    select: false
  }));
};
</script>
```

适合：

- 命令面板
- AI 一键插入模板块
- 与业务操作按钮联动

## 7. 自定义工具栏

```vue
<MdEditor v-model="text" :toolbars="['bold', 'italic', 0, '=', 'preview']">
  <template #defToolbars>
    <DropdownToolbar title="模板" :overlay="overlay">
      Custom
    </DropdownToolbar>
  </template>
</MdEditor>
```

规则：

- `toolbars` 里的 `0` 对应 `defToolbars` 的第一个节点
- 如果有多个自定义节点，顺序靠索引映射，不靠名字
- 自定义工具栏组件会拿到一个 `insert(generate)` 注入 prop，可直接回填内容

## 7.1 自定义工具栏的实现步骤

推荐按这个顺序做：

1. 先在 `toolbars` 数组里放一个数字占位，例如 `0`
2. 再在 `defToolbars` 里提供第一个自定义工具节点
3. 如果自定义工具需要往编辑器里写内容，使用注入进来的 `insert(generate)` 回填 Markdown
4. 如果是弹窗型或下拉型工具，优先复用 `DropdownToolbar` 或 `ModalToolbar`

先跑通一个自定义按钮，再扩展成多个，避免一开始就把索引映射写乱。

## 8. 扩展 markdown-it 插件链

```ts
import { config, XSSPlugin } from 'md-editor-v3';

config({
  markdownItPlugins(plugins, { editorId }) {
    return [
      ...plugins,
      {
        type: 'xss',
        plugin: XSSPlugin,
        options: {
          extendedWhiteList: {
            iframe: ['data-foo']
          }
        }
      }
    ].map((item) => {
      if (item.type === 'taskList') {
        return {
          ...item,
          options: {
            ...item.options,
            enabled: editorId === 'article-editor'
          }
        };
      }

      return item;
    });
  }
});
```

这个模式适合：

- 加安全清洗
- 改内置插件参数
- 追加业务自定义 Markdown 语法

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
  - 若动态卸载频繁，可考虑 `clearSideEffects()`
- Electron
  - 优先本地依赖实例，不依赖外网 CDN

## 11. 需要替换预览 DOM 外壳时

使用 `previewComponent`：

- 组件会收到 `html`、`id`、`class`
- 适合接入业务自定义滚动容器、额外包裹层或动画
- 这是高级用法，先确认默认 `UpdateOnDemand` 不能满足需求再用
