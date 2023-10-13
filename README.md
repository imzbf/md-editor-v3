# md-editor-v3

vue3 项目下的 Markdown 编辑器，，使用 jsx 语法开发，支持在 tsx 项目使用。采用了替换 class 名称的方式实现暗黑主题切换。

文档与在线预览：[传送门](https://imzbf.github.io/md-editor-v3)

在线尝试示例：[传送门](https://stackblitz.com/edit/vue-aleajl)

同系列`react`版本：[md-editor-rt](https://github.com/imzbf/md-editor-rt)

## 功能一览

1. 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等；
2. 内置的白色主题和暗黑主题，支持绑定切换；
3. 支持快捷键插入内容；
4. 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）；
5. 支持多语言，支持自行扩展语言；
6. 支持复制粘贴上传图片，图片裁剪上传；
7. 支持仅预览模式（不显示编辑器，只显示 md 预览内容，无额外监听）
8. ...

> 更多功能待后续更新，若有想要的功能未开发，请留言~

## 预览图

默认模式下：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d93b5ac7338479fb7fd0b94ba6e003a~tplv-k3u1fbpfcp-watermark.image)

暗黑模式下：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45d0ddaead1d48b2843ef16e2065a298~tplv-k3u1fbpfcp-watermark.image)

## apis

### props

| 名称 | 类型 | 默认值 | 响应式 | 说明 |
| --- | --- | --- | --- | --- |
| modelValue | String | '' | √ | md 编辑内容，vue 模板支持双向绑定（v-model="value"） |
| theme | 'light' \| 'dark' | 'light' | √ | 主题切换 |
| editorClass | String | '' | √ | 编辑器最外层样式 |
| hljs | Object | null | x | 项目中使用到了 highlight，可将实例直接传递，生产环境则不会请求 CDN，需要手动导入支持的高亮代码样式 |
| highlightJs | String | [highlight.js@11.2.0](https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/highlight.min.js) | x | highlightJs CDN |
| highlightCss | String | [atom-one-dark@11.2.0](https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/atom-one-dark.css) | x | 预览高亮代码样式 |
| historyLength | Number | 10 | x | 最大记录操作数（太大会占用内存） |
| pageFullScreen | Boolean | false | x | 浏览器内全屏 |
| preview | Boolean | true | x | 预览模式 |
| htmlPreview | Boolean | false | x | html 预览 |
| previewOnly<sup>v1.3.0</sup> | Boolean | false | x | 仅预览模式，不显示 bar 和编辑框，_不支持响应式，仅能初始设置一次_ |
| language | String | 'zh-CN' | √ | 内置中英文('zh-CN','en-US')，可自行扩展其他语言，同时可覆盖内置的中英文 |
| languageUserDefined | Array | [{key: StaticTextDefaultValue}] | √ | 通过这里扩展语言，修改 language 值为扩展 key 即可，类型申明可手动导入 |
| toolbars | Array | [all] | √ | 选择性展示工具栏，可选内容如下<sup>[toolbars]<sup> |
| toolbarsExclude<sup>v1.1.4</sup> | Array | [] | √ | 选择性不展示工具栏，内容同`toolbars` |
| prettier | Boolean | true | x | 是否启用 prettier 优化 md 内容 |
| prettierCDN | String | [standalone@2.4.0](https://cdn.jsdelivr.net/npm/prettier@2.4.0/standalone.js) | x |  |
| prettierMDCDN | String | [parser-markdown@2.4.0](https://cdn.jsdelivr.net/npm/prettier@2.4.0/parser-markdown.js) | x |  |
| editorName<sup>v1.3.2delete</sup> | String | 'editor' | x | 当在同一页面放置了多个编辑器，最好提供该属性以区别某些带有 ID 的内容，v1.3.2 后版本编辑器自动生成唯一 ID，不再需要手动设置 |
| cropperCss<sup>v1.2.0</sup> | String | [cropper.min.css@1.5.12](https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.css) | x | cropper css url |
| cropperJs<sup>v1.2.0</sup> | String | [cropper.min.js@1.5.12](https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.js) | x | cropper js url |
| iconfontJs<sup>v1.3.2</sup> | String | [iconfont](https://at.alicdn.com/t/font_2605852_khjf435c7th.js) | x | 矢量图标链接，无外网时，下载 js 到内网，提供链接 |
| editorId<sup>v1.4.0</sup> | String | random | x | 编辑器唯一标识，非必须项，用于后续支持`ssr`时，防止产生服务端与客户端渲染内容不一致错误提示 |
| tabWidth<sup>v1.4.0<sup> | Number | 2 | x | 编辑器 TAB 键位等于空格数 |
| showCodeRowNumber<sup>[v1.4.3](https://github.com/imzbf/md-editor-v3/releases/tag/v1.4.3)</sup> | Boolean | false | x | 代码块显示行号 |
| screenfull<sup>[v1.4.3](https://github.com/imzbf/md-editor-v3/releases/tag/v1.4.3)</sup> | Object | null | x | 全屏插件实例，项目中有使用可以将其传入，这样编辑器不再会使用 cdn 引入 |
| screenfullJs<sup>[v1.4.3](https://github.com/imzbf/md-editor-v3/releases/tag/v1.4.3)</sup> | String | [5.1.0](https://cdn.jsdelivr.net/npm/screenfull@5.1.0/dist/screenfull.js) | x | cdn 链接 |
| previewTheme<sup>[v1.4.3](https://github.com/imzbf/md-editor-v3/releases/tag/v1.4.3)</sup> | 'default' \| 'github' \| 'vuepress' | 'default' | √ | 预览内容主题 |

> 响应式=x，该属性只支持设置，不支持响应式更新~

[toolbars]

```js
[
  'bold',
  'underline',
  'italic',
  'strikeThrough',
  'title',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'revoke',
  'next',
  'save',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'htmlPreview',
  'github'
];
```

自定义语言，需要替换的内容如下（某些字段若不主动提供，可能会造成页面不美观）：

[StaticTextDefaultValue]

```ts
export interface StaticTextDefaultValue {
  // 工具栏hover title提示
  toolbarTips?: ToolbarTips;
  // 标题下拉框内容
  titleItem?: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
  };
  // 添加链接或图片时弹窗提示
  linkModalTips?: {
    title?: string;
    descLable?: string;
    descLablePlaceHolder?: string;
    urlLable?: string;
    urlLablePlaceHolder?: string;
    buttonOK?: string;
    buttonUpload?: string;
  };
  // 裁剪图片弹窗提示，v1.2.0
  clipModalTips?: {
    title?: string;
    buttonUpload?: string;
  };
  // 预览代码中复制代码提示，v1.1.4
  copyCode?: {
    text?: string;
    tips?: string;
  };
}
```

### 事件绑定

| 名称 | 入参 | 说明 |
| --- | --- | --- |
| onChange | v:String | 内容变化事件（当前与`textare`的`oninput`事件绑定，每输入一个单字即会触发） |
| onSave | v:String | 保存事件，快捷键与保存按钮均会触发 |
| onUploadImg | files:Array<File>, callback:Function | 上传图片事件，弹窗会等待上传结果，务必将上传后的 urls 作为 callback 入参回传 |
| onHtmlChanged | h:String | html 变化回调事件，用于获取预览 html 代码 |
| onGetCatalog<sup>v1.4.0</sup> | list: HeadList[] | 动态获取`markdown`目录 |

### 快捷键

主要以`CTRL`搭配对应功能英文单词首字母，冲突项添加`SHIFT`，再冲突替换为`ALT`。

| 键位 | 功能 | 说明 | 版本标记 |
| --- | --- | --- | --- |
| TAB | 空格 | 通过`tabWidth`属性预设 TAB 键位新增空格长度，默认 2，支持多行 | v1.4.0 |
| SHIFT + TAB | 取消空格 | 同上，一次取消两个空格，支持多行 | v1.4.0 |
| CTRL + C | 复制 | 选中时复制选中内容，未选中时复制当前行内容 | v1.4.0 |
| CTRL + X | 剪切 | 选中时剪切选中内容，未选中时剪切当前行 | v1.4.0 |
| CTRL + D | 删除 | 选中时删除选中内容，未选中时删除当前行 | v1.4.0 |
| CTRL + S | 保存 | 触发编辑器的`onSave`回调 | v1.0.0 |
| CTRL + B | 加粗 | `**加粗**` | v1.0.0 |
| CTRL + U | 下划线 | `<u>下划线</u>` | v1.0.0 |
| CTRL + I | 斜体 | `*斜体*` | v1.0.0 |
| CTRL + 1-6 | 1-6 级标题 | `# 标题` | v1.0.0 |
| CTRL + ↑ | 上角标 | `<sup>上角标</sup>` | v1.0.0 |
| CTRL + ↓ | 下角标 | `<sub>下角标</sub>` | v1.0.0 |
| CTRL + Q | 引用 | `> 引用` | v1.0.0 |
| CTRL + O | 有序列表 | `1. 有序列表` | v1.0.0 |
| CTRL + L | 链接 | `[链接](https://github.com/imzbf)` | v1.0.0 |
| CTRL + Z | 撤回 | 触发编辑器内内容撤回，与系统无关 | v1.0.0 |
| CTRL + SHIFT + S | 删除线 | `~删除线~` | v1.0.0 |
| CTRL + SHIFT + U | 无序列表 | `- 无序列表` | v1.0.0 |
| CTRL + SHIFT + C | 块级代码 | 多行代码块 | v1.0.0 |
| CTRL + SHIFT + I | 图片链接 | `![图片](https://github.com/imzbf)` | v1.0.0 |
| CTRL + SHIFT + Z | 前进一步 | 触发编辑器内内容前进，与系统无关 | v1.0.0 |
| CTRL + SHIFT + F | 美化内容 |  | v1.0.0 |
| CTRL + ALT + C | 行内代码 | 行内代码块 | v1.0.0 |
| CTRL + SHIFT + ALT + T | 表格 | `\|表格\|` | v1.4.0 |

## 演示

### jsx 语法项目

```js
import { defineComponent, reactive } from 'vue';
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export default defineComponent({
  setup() {
    const md = reactive({
      text: 'default markdown content'
    });
    return () => (
      <Editor hljs={hljs} modelValue={md.text} onChange={(value) => (md.text = value)} />
    );
  }
});
```

### vue 模板项目

```js
<template>
  <editor v-model="text" pageFullScreen></editor>
</template>

<script>
import { defineComponent } from 'vue';
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  name: 'VueTemplateDemo',
  components: { Editor },
  data() {
    return {
      text: '默认值'
    };
  }
});
</script>

```

### 上传图片

默认可以选择多张图片，支持粘贴板上传图片。

> 注意：粘贴板上传时，如果是网页上的 gif 图，无法正确上传为 gif 格式！

```js
async onUploadImg(files: Array<File>, callback: (urls: string[]) => void) {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append('file', file);

        axios
          .post('/api/img/upload', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );

  callback(res.map((item: any) => item.data.url));
}
```
