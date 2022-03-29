> 当前最新版本：[${EDITOR_VERSION}](https://github.com/imzbf/md-editor-v3/releases/tag/v${EDITOR_VERSION})，在线尝试示例：[传送门](https://stackblitz.com/edit/vue-aleajl)

> 同系列`react`版本：[md-editor-rt](https://github.com/imzbf/md-editor-rt)

## 1. 基本使用示例

目前一直在迭代开发，所以尽量安装最新版本。发布日志请前往：[releases](https://github.com/imzbf/md-editor-v3/releases)

```shell
yarn add md-editor-v3
```

目前 vue3 已经能很友好的使用 jsx 来开发了，对于一些爱好者（比如作者本身），需要考虑兼容一下。

两种方式开发上区别在于**vue 模板**能很好的支持`vue`特性，比如指令，内置的双向绑定等；而**jsx 语法**更偏向于`react`的理念，开发环境来讲 jsx 如果在支持 ts 的环境下，会更友好一些。

### 1.1 传统开发模式

通过直接链接生产版本来使用，下面是一个小 demo：

```js
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>传统开发模式中使用</title>
    <link href="https://cdn.jsdelivr.net/npm/md-editor-v3@${EDITOR_VERSION}/lib/style.css" rel="stylesheet" />
  </head>
  <body>
    <div id="md-editor-v3">
      <md-editor-v3 v-model="text" />
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@3.1.5/dist/vue.global.prod.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/md-editor-v3@${EDITOR_VERSION}/lib/md-editor-v3.umd.js"></script>
    <script>
      const App = {
        data() {
          return {
            text: 'Hello Editor!!'
          };
        }
      };
      Vue.createApp(App).use(MdEditorV3).mount('#md-editor-v3');
    </script>
  </body>
</html>
```

### 1.2 模块化的 vue 模板

```js
<template>
  <md-editor v-model="text" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: {
    MdEditor
  },
  data() {
    return {
      text: ''
    };
  }
});
</script>
```

### 1.3 模块化的 jsx

```js
import { defineComponent, ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  name: 'MdEditor',
  setup() {
    const text = ref('');
    return () => (
      <MdEditor modelValue={text.value} onChange={(v: string) => (text.value = v)} />
    );
  }
});
```

### 1.4 图片上传

默认可以选择多张图片，支持截图粘贴板上传图片，支持复制网页图片粘贴上传。

> v1.2.0：图片裁剪上传只支持选择一张图片~，但回调入仍是一个文件数组

> 注意：粘贴板上传时，如果是网页上的 gif 图，无法正确上传为 gif 格式！请保存本地后再手动上传。

```js
async onUploadImg(files: FileList, callback: (urls: string[]) => void) {
  const res = await Promise.all(
    Array.from(files).map((file) => {
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

## 2. Props 说明

这是组件最重要的一部分内容，`MdEditorV3`的属性参数如下：

<br>

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
| openLinkInNewTab | Boolean | false | x | 是否在新的标签页打开链接 |
| showCodeRowNumber<sup>[v1.4.3](https://github.com/imzbf/md-editor-v3/releases/tag/v1.4.3)</sup> | Boolean | false | x | 代码块显示行号 |
| screenfull<sup>[v1.4.3](https://github.com/imzbf/md-editor-v3/releases/tag/v1.4.3)</sup> | Object | null | x | 全屏插件实例，项目中有使用可以将其传入，这样编辑器不再会使用 cdn 引入 |
| screenfullJs<sup>[v1.4.3](https://github.com/imzbf/md-editor-v3/releases/tag/v1.4.3)</sup> | String | [5.1.0](https://cdn.jsdelivr.net/npm/screenfull@5.1.0/dist/screenfull.js) | x | cdn 链接 |
| previewTheme<sup>[v1.4.3](https://github.com/imzbf/md-editor-v3/releases/tag/v1.4.3)</sup> | 'default' \| 'github' \| 'vuepress' | 'default' | √ | 预览内容主题 |

> 响应式=x，该属性只支持设置，不支持响应式更新~

> !!! 编辑器内比较大小的扩展均使用了 CDN 链接，在没有外网的情况，请使用扩展属性替换为本地链接，比如：highlightJs = "//xxx.com/highlight.min.js"

**工具栏选项**

```js
'bold', 'underline', 'italic', 'strikeThrough', 'sub', 'sup', 'quote', 'unorderedList',
'orderedList', 'codeRow', 'code', 'link', 'image', 'table', 'revoke', 'next', 'save',
'pageFullscreen', 'fullscreen', 'preview', 'htmlPreview', 'github'

// 对应功能名称
'加粗', '下划线', '斜体', '删除线', '下标', '上标', '引用', '无序列表',
'有序列表', '行内代码', '块级代码', '链接', '图片', '表格', '后退一步', '前进一步', '保存'，
'页面内全屏', '屏幕全屏', '内容预览', 'html代码预览', '源码地址'
```

自定义语言，可在源码中搜索`StaticTextDefaultValue`，即可找到类型提示。中文示例（某些字段若不主动提供，可能会造成页面不美观）：

```js
{
    toolbarTips: {
      bold: '加粗',
      underline: '下划线',
      italic: '斜体',
      strikeThrough: '删除线',
      title: '标题',
      sub: '下标',
      sup: '上标',
      quote: '引用',
      unorderedList: '无序列表',
      orderedList: '有序列表',
      codeRow: '行内代码',
      code: '块级代码',
      link: '链接',
      image: '图片',
      table: '表格',
      revoke: '后退',
      next: '前进',
      save: '保存',
      prettier: '美化',
      pageFullscreen: '浏览器全屏',
      fullscreen: '屏幕全屏',
      preview: '预览',
      htmlPreview: 'html代码预览',
      github: '源码地址'
    },
    titleItem: {
      h1: '一级标题',
      h2: '二级标题',
      h3: '三级标题',
      h4: '四级标题',
      h5: '五级标题',
      h6: '六级标题'
    },
    linkModalTips: {
      title: '添加',
      descLable: '链接描述：',
      descLablePlaceHolder: '请输入描述...',
      urlLable: '链接地址：',
      UrlLablePlaceHolder: '请输入链接...',
      buttonOK: '确定',
      buttonUpload: '上传'
    },
    // v1.2.0新增
    clipModalTips: {
      title: '裁剪图片上传',
      buttonUpload: '上传'
    },
    // v1.1.4新增
    copyCode: {
      text: '复制代码';
      tips: '已复制';
    }
  }
```

## 3. 绑定事件

目前支持的内容如下：

<br>

| 名称 | 入参 | 说明 |
| --- | --- | --- |
| onChange | v:String | 内容变化事件（当前与`textare`的`oninput`事件绑定，每输入一个单字即会触发） |
| onSave | v:String | 保存事件，快捷键与保存按钮均会触发 |
| onUploadImg | files:FileList, callback:Function | 上传图片事件，弹窗会等待上传结果，务必将上传后的 urls 作为 callback 入参回传 |
| onHtmlChanged | h:String | html 变化回调事件，用于获取预览 html 代码 |
| onGetCatalog<sup>v1.4.0 | list: HeadList[] | 动态获取`markdown`目录 |

<br>

## 4. 快捷键使用

目前除了`CTRL + T`与浏览器冲突意外，其余的都绑定了相应的快捷键。

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
| CTRL + L | 链接 | `[链接](https://imbf.cc)` | v1.0.0 |
| CTRL + Z | 撤回 | 触发编辑器内内容撤回，与系统无关 | v1.0.0 |
| CTRL + SHIFT + S | 删除线 | `~删除线~` | v1.0.0 |
| CTRL + SHIFT + U | 无序列表 | `- 无序列表` | v1.0.0 |
| CTRL + SHIFT + C | 块级代码 | 多行代码块 | v1.0.0 |
| CTRL + SHIFT + I | 图片链接 | `![图片](https://imbf.cc)` | v1.0.0 |
| CTRL + SHIFT + Z | 前进一步 | 触发编辑器内内容前进，与系统无关 | v1.0.0 |
| CTRL + SHIFT + F | 美化内容 |  | v1.0.0 |
| CTRL + ALT + C | 行内代码 | 行内代码块 | v1.0.0 |
| CTRL + SHIFT + ALT + T | 表格 | `\|表格\|` | v1.4.0 |

## 5. 开发理念

本节介绍编辑器中部分功能的实现。

### 5.1 编辑区

- 由于不是富文本编辑器，所以采用了`textarea`标签作为编辑区。

- 为解决代码插入文本，在我的博客留言板中封装了两个比较实用的方法`insert`和`setPosition`，一个用于向光标位置插入特定内容，另一个用于重新定位光标位置，[源码位置](https://github.com/imzbf/md-editor-v3/blob/master/MdEditor/utils/index.ts)。

- 编辑器与工具栏的交互，由于没有 vuex，所以内置了`EventBus`，在不同地方通过这种方式来进行交互。（目前，同一页面嵌入两个编辑器`EventBus`被共享，目前已修复该问题）。
- 编辑器与快捷键，通过监听每一个按键对应的`ctrl`、`shift`等属性是否为`true`实现，并且均阻止了默认事件触发。在 windows 中以`CTRL`键为主要触发单元，在 MacOS 中以`META`键为主。

### 5.2 组件：**Divider**

分隔符，应用于工具栏中分隔功能模块，美化作用，实现为以宽为`1px`的元素做衬托。

### 5.3 组件：**Dropdown**

源码：[传送门](https://github.com/imzbf/md-editor-v3/tree/master/MdEditor/components/Dropdown)

- 下拉模块，主要用于下拉菜单使用。该组件将主插槽内容作为触发器，`overlay`插槽内容作为拉下展示内容，通过 vue 内置的`cloneVNode`方法克隆组件，以绑定扩展属性及事件，达到了不添加多余的节点的目的；

- 内容插入通过 vue 内置的`Teleport`组件，将内容插入到编辑器内部（预设的地方），不会污染全局结构；

- 在卸载对应组件时，`onUnmounted`方法会主动卸载绑定事件。

### 5.4 组件：Modal

源码：[传送门](https://github.com/imzbf/md-editor-v3/tree/master/MdEditor/components/Modal)

- 作为弹窗模块使用，实现与**Dropdown**大为相似，默认了显示动画及居中位置；
- 这里加入了一个新特性，在显示弹窗时，可以通过点击弹窗标题移动弹框。

封装的移动元素[代码](https://github.com/imzbf/md-editor-v3/blob/master/MdEditor/utils/dom.ts)，优化了正确解绑事件，该方法针对了触发器实现，单一窗口并不通用。

### 5.5 主题模式

内置了暗黑和默认模式，两种模式由内部`theme`属性控制，由于`antd`中以`less`修改变量值达到切换主题的方式依赖项较多，并未采用，实现则是最基础的两种主题两个类名的方式。

### 5.6 图片裁剪上传

该功能主要依赖`cropperjs`库，目前不提供该库自定义设置。

### 5.7 预览主题

内置了`previewTheme`调整预览内容主题，内置了`github`、`vuepress`和默认三种。值得注意的是他们都只设置了基础`markdown`支持的语法内容样式，特殊样式（例如：轮播等）暂未提供。同时`github`主题切换暗黑模式时，会同时替换代码块链接样式。若同页面有嵌入了多个编辑器，会受到影响。

## 结尾

若有觉得可用的功能或发现编辑器的 Bug，请通过以下方式反馈给我，让我们共同进步。

1. 邮箱：zbfcqtl@163.com
2. 博客留言：[imbf.cc](https://imbf.cc)
3. issue 管理：[github issues](https://github.com/imzbf/md-editor-v3/issues)
