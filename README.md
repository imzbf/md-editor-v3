# md-editor-v3

vue3 项目下的 Markdown 编辑器，，使用 jsx 语法开发，支持在 tsx 项目使用。为了减小插入，没有使用`less.modifyVars`方法来切换主题，而采用了替换 class 名称的方式。

## 功能一览

1. 快捷插入内容工具栏、编辑器浏览器全屏、页面内全屏等；
2. 内置的白色主题和暗黑主题，支持绑定切换；
3. 支持快捷键插入内容；
4. 支持使用 prettier 格式化内容（使用 CDN 方式引入，只支持格式化 md 内容，可在代码内设置关闭）；
5. 支持多语言，支持自行扩展语言；
6. 支持复制粘贴上传图片；
7. ...

> 更多功能待后续更新，若有想要的功能未开发，请留言~

## 预览图

默认模式下：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65918d53d93b492ca51de2f36e439d83~tplv-k3u1fbpfcp-watermark.image)

暗黑模式下：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/012fb26afac745a79f6d5029de3ecd2b~tplv-k3u1fbpfcp-watermark.image)

主题跟随前往[文档页面](https://imzbf.github.io/md-editor-v3)尝试~~

## apis

### props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | String | '' | md 编辑内容，vue 模板支持双向绑定（v-model="value"） |
| editorClass | String | '' | 编辑器最外层样式 |
| hljs | Object | null | 项目中使用到了 highlight，可将实例直接传递，生产环境则不会请求 CDN，需要手动导入支持的高亮代码样式 |
| highlightJs | String | [highlight.js](https://cdn.bootcdn.net/ajax/libs/highlight.js/11.0.1/highlight.min.js) | highlightJs CDN |
| highlightCss | String | [atom-one-dark](https://cdn.bootcdn.net/ajax/libs/highlight.js/11.0.1/styles/atom-one-dark.min.css) | 预览高亮代码样式 |
| historyLength | Number | 10 | 最大记录操作数（太大会占用内存） |
| pageFullScreen | Boolean | false | 浏览器内全屏 |
| preview | Boolean | true | 预览模式 |
| htmlPreview | Boolean | false | html 预览 |
| language | String | 'zh-CN' | 内置中英文('zh-CN','en-US')，可自行扩展其他语言，同时可覆盖内置的中英文 |
| languageUserDefined | Array | [{key: StaticTextDefaultValue}] | 通过这里扩展语言，修改 language 值为扩展 key 即可，类型申明可手动导入 |
| toolbars | Array | [all] | 选择性展示工具栏，可选内容如下<sup>[toolbars]<sup> |
| prettier | Boolean | true | 是否启用 prettier 优化 md 内容 |
| prettierCDN | String | [standalone](https://unpkg.com/prettier@2.3.2/standalone.js) |  |
| prettierMDCDN | String | [parser-markdown](https://unpkg.com/prettier@2.3.2/parser-markdown.js) |
| editorName | String | 'editor' | 当在同一页面放置了多个编辑器，最好提供该属性以区别某些带有 ID 的内容 |

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
  toolbarTips?: ToolbarTips;
  titleItem?: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
  };
  linkModalTips?: {
    title?: string;
    descLable?: string;
    descLablePlaceHolder?: string;
    urlLable?: string;
    UrlLablePlaceHolder?: string;
    buttonOK?: string;
    buttonUpload?: string;
  };
}
```

### 事件绑定

| 名称 | 入参 | 说明 |
| --- | --- | --- |
| onChange | v:String | 内容变化事件（当前与`textare`的`oninput`事件绑定，每输入一个单字即会触发） |
| onSave | v:String | 保存事件，快捷键与保存按钮均会触发 |
| onUploadImg | files:FileList, callback:Function | 上传图片事件，弹窗会等待上传结果，务必将上传后的 urls 作为 callback 入参回传 |
| onHtmlChanged | h:String | html 变化回调事件，用于获取预览 html 代码 |

### 快捷键

主要以`CTRL`搭配对应功能英文单词首字母，冲突项添加`SHIFT`，再冲突替换为`ALT`。

| 键位             | 功能       | 说明                             | 开发标记 |
| ---------------- | ---------- | -------------------------------- | -------- |
| CTRL + S         | 保存       | 触发编辑器的`onSave`回调         | √        |
| CTRL + B         | 加粗       | `**加粗**`                       | √        |
| CTRL + U         | 下划线     | `<u>下划线</u>`                  | √        |
| CTRL + I         | 斜体       | `*斜体*`                         | √        |
| CTRL + 1-6       | 1-6 级标题 | `# 标题`                         | √        |
| CTRL + ↑         | 上角标     | `<sup>上角标</sup>`              | √        |
| CTRL + ↓         | 下角标     | `<sub>下角标</sub>`              | √        |
| CTRL + Q         | 引用       | `> 引用`                         | √        |
| CTRL + O         | 有序列表   | `1. 有序列表`                    | √        |
| CTRL + L         | 链接       | `[链接](https://imbf.cc)`        | √        |
| CTRL + T         | 表格       | `\|表格\|` 放弃开发（无法实现）  | x        |
| CTRL + Z         | 撤回       | 触发编辑器内内容撤回，与系统无关 | √        |
| CTRL + SHIFT + S | 删除线     | `~删除线~`                       | √        |
| CTRL + SHIFT + U | 无序列表   | `- 无序列表`                     | √        |
| CTRL + SHIFT + C | 块级代码   | 多行代码块                       | √        |
| CTRL + SHIFT + I | 图片链接   | `![图片](https://imbf.cc)`       | √        |
| CTRL + SHIFT + Z | 前进一步   | 触发编辑器内内容前进，与系统无关 | √        |
| CTRL + SHIFT + F | 美化内容   |                                  | √        |
| CTRL + ALT + C   | 行内代码   | 行内代码块                       | √        |

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
