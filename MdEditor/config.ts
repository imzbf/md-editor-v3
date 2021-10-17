import { StaticTextDefault } from './Editor';

// 编辑器ID
export const iconScriptId = 'md-editor-v3';

// 字体链接
export const iconfontUrl = 'https://at.alicdn.com/t/font_2605852_khjf435c7th.js';

// 代码高亮cdn链接
export const highlightUrl = {
  atom: 'https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/atom-one-dark.css',
  github: 'https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/github.css',
  githubDark: 'https://cdn.jsdelivr.net/npm/highlight.js@11.2.0/styles/github-dark.css',
  js: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.2.0/build/highlight.min.js'
};

// 美化代码cdn连接
export const prettierUrl = {
  main: 'https://cdn.jsdelivr.net/npm/prettier@2.4.0/standalone.js',
  markdown: 'https://cdn.jsdelivr.net/npm/prettier@2.4.0/parser-markdown.js'
};

export const cropperUrl = {
  css: 'https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.css',
  js: 'https://cdn.jsdelivr.net/npm/cropperjs@1.5.12/dist/cropper.min.js'
};

export const screenfullUrl =
  'https://cdn.jsdelivr.net/npm/screenfull@5.1.0/dist/screenfull.js';

// 所有的编辑器功能点
export const allToolbar = [
  'bold',
  'underline',
  'italic',
  'strikeThrough',
  '-',
  'title',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'prettier',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'htmlPreview',
  'github'
];

export const staticTextDefault: StaticTextDefault = {
  'zh-CN': {
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
      buttonUpload: '上传',
      buttonUploadClip: '裁剪上传'
    },
    clipModalTips: {
      title: '裁剪图片上传',
      buttonUpload: '上传'
    },
    copyCode: {
      text: '复制代码',
      tips: '已复制！'
    }
  },
  'en-US': {
    toolbarTips: {
      bold: 'bold',
      underline: 'underline',
      italic: 'italic',
      strikeThrough: 'strikeThrough',
      title: 'title',
      sub: 'subscript',
      sup: 'superscript',
      quote: 'quote',
      unorderedList: 'unordered list',
      orderedList: 'ordered list',
      codeRow: 'inline code',
      code: 'block-level code',
      link: 'link',
      image: 'image',
      table: 'table',
      revoke: 'revoke',
      next: 'undo revoke',
      save: 'save',
      prettier: 'prettier',
      pageFullscreen: 'fullscreen in page',
      fullscreen: 'fullscreen',
      preview: 'preview',
      htmlPreview: 'html preview',
      github: 'source code'
    },
    titleItem: {
      h1: 'Lv1 Heading',
      h2: 'Lv2 Heading',
      h3: 'Lv3 Heading',
      h4: 'Lv4 Heading',
      h5: 'Lv5 Heading',
      h6: 'Lv6 Heading'
    },
    linkModalTips: {
      title: 'Add ',
      descLable: 'Desc:',
      descLablePlaceHolder: 'Enter a description...',
      urlLable: 'Link:',
      UrlLablePlaceHolder: 'Enter a link...',
      buttonOK: 'OK',
      buttonUpload: 'Upload',
      buttonUploadClip: 'Crop2upload'
    },
    clipModalTips: {
      title: 'Crop Image',
      buttonUpload: 'Upload'
    },
    copyCode: {
      text: 'Copy',
      tips: 'Copied!'
    }
  }
};
