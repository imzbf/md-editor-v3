import { deepMerge } from '@vavt/util';
import { CodeCss, Config, ConfigOption, Footers, StaticTextDefault } from './type';

export const prefix = 'md-editor';

// 编辑器ID
export const defaultEditorId = 'md-editor-v3';

// 字体链接
export const iconfontSvgUrl = 'https://at.alicdn.com/t/c/font_2605852_cmafimm6hot.js';
export const iconfontClassUrl = 'https://at.alicdn.com/t/c/font_2605852_cmafimm6hot.css';

export const cdnBase = 'https://cdnjs.cloudflare.com/ajax/libs';

// 代码高亮cdn链接
export const highlightUrl = `${cdnBase}/highlight.js/11.8.0/highlight.min.js`;

// 美化代码cdn连接
export const prettierUrl = {
  main: `${cdnBase}/prettier/2.8.0/standalone.js`,
  markdown: `${cdnBase}/prettier/2.8.0/parser-markdown.js`
};

export const cropperUrl = {
  css: `${cdnBase}/cropperjs/1.5.13/cropper.min.css`,
  js: `${cdnBase}/cropperjs/1.5.13/cropper.min.js`
};

export const screenfullUrl = `${cdnBase}/screenfull.js/5.2.0/screenfull.min.js`;

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
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'prettier',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'previewOnly',
  'htmlPreview',
  'catalog',
  'github'
];

export const allFooter: Array<Footers> = ['markdownTotal', '=', 'scrollSwitch'];

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
      task: '任务列表',
      codeRow: '行内代码',
      code: '块级代码',
      link: '链接',
      image: '图片',
      table: '表格',
      mermaid: 'mermaid图',
      katex: 'katex公式',
      revoke: '后退',
      next: '前进',
      save: '保存',
      prettier: '美化',
      pageFullscreen: '浏览器全屏',
      fullscreen: '屏幕全屏',
      preview: '预览',
      previewOnly: '仅预览',
      htmlPreview: 'html代码预览',
      catalog: '目录',
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
    imgTitleItem: {
      link: '添加链接',
      upload: '上传图片',
      clip2upload: '裁剪上传'
    },
    linkModalTips: {
      linkTitle: '添加链接',
      imageTitle: '添加图片',
      descLabel: '链接描述：',
      descLabelPlaceHolder: '请输入描述...',
      urlLabel: '链接地址：',
      urlLabelPlaceHolder: '请输入链接...',
      buttonOK: '确定'
    },
    clipModalTips: {
      title: '裁剪图片上传',
      buttonUpload: '上传'
    },
    copyCode: {
      text: '复制代码',
      successTips: '已复制！',
      failTips: '复制失败！'
    },
    mermaid: {
      flow: '流程图',
      sequence: '时序图',
      gantt: '甘特图',
      class: '类图',
      state: '状态图',
      pie: '饼图',
      relationship: '关系图',
      journey: '旅程图'
    },
    katex: {
      inline: '行内公式',
      block: '块级公式'
    },
    footer: {
      markdownTotal: '字数',
      scrollAuto: '同步滚动'
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
      task: 'task list',
      codeRow: 'inline code',
      code: 'block-level code',
      link: 'link',
      image: 'image',
      table: 'table',
      mermaid: 'mermaid',
      katex: 'formula',
      revoke: 'revoke',
      next: 'undo revoke',
      save: 'save',
      prettier: 'prettier',
      pageFullscreen: 'fullscreen in page',
      fullscreen: 'fullscreen',
      preview: 'preview',
      previewOnly: 'preview only',
      htmlPreview: 'html preview',
      catalog: 'catalog',
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
    imgTitleItem: {
      link: 'Add Img Link',
      upload: 'Upload Img',
      clip2upload: 'Clip Upload'
    },
    linkModalTips: {
      linkTitle: 'Add Link',
      imageTitle: 'Add Image',
      descLabel: 'Desc:',
      descLabelPlaceHolder: 'Enter a description...',
      urlLabel: 'Link:',
      urlLabelPlaceHolder: 'Enter a link...',
      buttonOK: 'OK'
    },
    clipModalTips: {
      title: 'Crop Image',
      buttonUpload: 'Upload'
    },
    copyCode: {
      text: 'Copy',
      successTips: 'Copied!',
      failTips: 'Copy failed!'
    },
    mermaid: {
      flow: 'flow',
      sequence: 'sequence',
      gantt: 'gantt',
      class: 'class',
      state: 'state',
      pie: 'pie',
      relationship: 'relationship',
      journey: 'journey'
    },
    katex: {
      inline: 'inline',
      block: 'block'
    },
    footer: {
      markdownTotal: 'Character Count',
      scrollAuto: 'Scroll Auto'
    }
  }
};

export const mermaidUrl = `${cdnBase}/mermaid/10.6.1/mermaid.esm.min.mjs`;
// export const mermaidUrl = `${cdnBase}/mermaid/9.4.0/mermaid.min.js`;

export const katexUrl = {
  js: `${cdnBase}/KaTeX/0.16.9/katex.min.js`,
  css: `${cdnBase}/KaTeX/0.16.9/katex.min.css`
};

export const codeCss: CodeCss = {
  a11y: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/a11y-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/a11y-dark.min.css`
  },
  atom: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/atom-one-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/atom-one-dark.min.css`
  },
  github: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/github.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/github-dark.min.css`
  },
  gradient: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/gradient-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/gradient-dark.min.css`
  },
  kimbie: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/kimbie-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/kimbie-dark.min.css`
  },
  paraiso: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/paraiso-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/paraiso-dark.min.css`
  },
  qtcreator: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/qtcreator-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/qtcreator-dark.min.css`
  },
  stackoverflow: {
    light: `${cdnBase}/highlight.js/11.8.0/styles/stackoverflow-light.min.css`,
    dark: `${cdnBase}/highlight.js/11.8.0/styles/stackoverflow-dark.min.css`
  }
};

// 当前版本的值
export const editorExtensionsAttrs: ConfigOption['editorExtensionsAttrs'] = {
  highlight: {
    js: {
      integrity:
        'sha384-g4mRvs7AO0/Ol5LxcGyz4Doe21pVhGNnC3EQw5shw+z+aXDN86HqUdwXWO+Gz2zI',
      crossOrigin: 'anonymous'
    },
    css: {
      a11y: {
        light: {
          integrity:
            'sha384-qdZDAN3jffvh670RHw1wxLekabidEFaNRninYgIzBvMbL6WlHdXeHS/Bt+vx33lN',
          crossOrigin: 'anonymous'
        },
        dark: {
          integrity:
            'sha384-2QAAjX8pqaM5azX68KWI2wExF6Q13kY4kEiQFY4b/1zPe6rpgmTByNpDEllH3sb+',
          crossOrigin: 'anonymous'
        }
      },
      atom: {
        light: {
          integrity:
            'sha384-w6Ujm1VWa9HYFqGc89oAPn/DWDi2gUamjNrq9DRvEYm2X3ClItg9Y9xs1ViVo5b5',
          crossOrigin: 'anonymous'
        },
        dark: {
          integrity:
            'sha384-oaMLBGEzBOJx3UHwac0cVndtX5fxGQIfnAeFZ35RTgqPcYlbprH9o9PUV/F8Le07',
          crossOrigin: 'anonymous'
        }
      },
      github: {
        light: {
          integrity:
            'sha384-eFTL69TLRZTkNfYZOLM+G04821K1qZao/4QLJbet1pP4tcF+fdXq/9CdqAbWRl/L',
          crossOrigin: 'anonymous'
        },
        dark: {
          integrity:
            'sha384-wH75j6z1lH97ZOpMOInqhgKzFkAInZPPSPlZpYKYTOqsaizPvhQZmAtLcPKXpLyH',
          crossOrigin: 'anonymous'
        }
      },
      gradient: {
        light: {
          integrity:
            'sha384-yErHBR8aEZPxRl3XmR8dGSRAclMlnSRRw8sXQLcmPWzWUvb56BzQmBw3EWHl7QGI',
          crossOrigin: 'anonymous'
        },
        dark: {
          integrity:
            'sha384-lUCvtSOdvDbp5hLWKgwz/taFu1HxlpqES2OVP5UG2JMTfnU481gXcBhGF9lAGoSr',
          crossOrigin: 'anonymous'
        }
      },
      kimbie: {
        light: {
          integrity:
            'sha384-tloeSLUPczAvoZ48TUz+OxRie0oYLCRwlkadUXovGzzJEIbNQB2TkfUuvJ6SW5Mi',
          crossOrigin: 'anonymous'
        },
        dark: {
          integrity:
            'sha384-o5F1vUaMNOmou1sQrsWiFo4/QUGSV0svqNZW+EesmKxWC8MpFJcveBhAyfvTHbGb',
          crossOrigin: 'anonymous'
        }
      },
      paraiso: {
        light: {
          integrity:
            'sha384-5j6QHU2Hwg1ehtlIQNDebhETDB8bga3/88hzBFsMRaGmgQHCftqIN7GZNDNw0vTL',
          crossOrigin: 'anonymous'
        },
        dark: {
          integrity:
            'sha384-I5vnnMQu0LWDQnHpT61xyoMwKarAB8jpZkB2ioFOlmzUFnIFaV4QbUwlBBOMKhTH',
          crossOrigin: 'anonymous'
        }
      },
      qtcreator: {
        light: {
          integrity:
            'sha384-iEBgHrwi8Hv4dSZBz+MOGvS05rF7I7fGKM2fASQyE9jn2Istg9Qd5dSoK18WyRTB',
          crossOrigin: 'anonymous'
        },
        dark: {
          integrity:
            'sha384-D6LXJGWNR4QV7gnpuP3ccbvOYoR02td3cU0y7lESABPg/tzCSC4m+y+M2TtrmpHc',
          crossOrigin: 'anonymous'
        }
      },
      stackoverflow: {
        light: {
          integrity:
            'sha384-FMwt7cTGo4aLxZnno5k0xTj0W4gmi48Kwept+y/oQmE6cFk36Kr+QJZOKNOQwORe',
          crossOrigin: 'anonymous'
        },
        dark: {
          integrity:
            'sha384-iL+x+BroCyHm/p2c6sMA9umXhdCWp2cKe4QUjPeMzHgwXAk+ZxHyIGP3NZTZensU',
          crossOrigin: 'anonymous'
        }
      }
    }
  },
  prettier: {
    standaloneJs: {
      integrity:
        'sha384-cBKW1A8TbwohtSsrm+VWpXevI1PWdPmUrozwqTw7aS51JIhz9IvgHHa/bV6icWeL',
      crossOrigin: 'anonymous'
    },
    parserMarkdownJs: {
      integrity:
        'sha384-kXeeC2HiA6n3rpvz0MOjB7yZo9QjvYNAMihonwR5fdTOFs/rm/Bm3Xg8cOSE4900',
      crossOrigin: 'anonymous'
    }
  },
  cropper: {
    js: {
      integrity:
        'sha384-r+ljwOAhwY4/kdyzMnuBg7MEVoWpTMp5EYUDntB/E9qzNwL9dAEcNrb2XaV+mJc2',
      crossOrigin: 'anonymous'
    },
    css: {
      integrity:
        'sha384-oMy41mb/qJnpJlpXOF57hSu2KGi47l/UV9+tPNrBOs7/ap5Vubj/3phrCtjutHMQ',
      crossOrigin: 'anonymous'
    }
  },
  iconfont: {
    integrity: 'sha384-HRrf1e8/EiqrIZQftejl7pMTeuLeYczOz7rolAGxgw86N7UjiXkex67Uf2XTZz5z',
    crossOrigin: 'anonymous'
  },
  iconfontClass: {
    integrity: 'sha384-81pjilF/gLoQvAfd8madmeylVdv8IagPQaq1C/OZbysLav7k9g+Ir3XD5qK00Q5r',
    crossOrigin: 'anonymous'
  },
  screenfull: {
    js: {
      integrity:
        'sha384-ELVAm9p9T4LGCG4lz8hbYalUYAppIpI1zV8IXYDCBUJFiVnV+EeG8vGSYQi+Wi4S',
      crossOrigin: 'anonymous'
    }
  },
  mermaid: {
    js: {
      integrity:
        'sha384-zmipzuFBFDAekHS2uY4mN5cvpcSvgUi3aMjMJ2xnVRsU2kDHBtqLOJRnianHJeP1',
      crossOrigin: 'anonymous'
    }
  },
  katex: {
    js: {
      integrity:
        'sha384-XjKyOOlGwcjNTAIQHIpgOno0Hl1YQqzUOEleOLALmuqehneUG+vnGctmUb0ZY0l8',
      crossOrigin: 'anonymous'
    },
    css: {
      integrity:
        'sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV',
      crossOrigin: 'anonymous'
    }
  }
};

export const configOption: ConfigOption = {
  editorExtensions: {
    highlight: {
      js: highlightUrl,
      css: codeCss
    },
    prettier: {
      standaloneJs: prettierUrl.main,
      parserMarkdownJs: prettierUrl.markdown
    },
    cropper: {
      ...cropperUrl
    },
    iconfont: iconfontSvgUrl,
    iconfontClass: iconfontClassUrl,
    screenfull: {
      js: screenfullUrl
    },
    mermaid: {
      js: mermaidUrl
    },
    katex: {
      ...katexUrl
    }
  },
  editorExtensionsAttrs: {},
  editorConfig: {
    languageUserDefined: {},
    mermaidTemplate: {},
    renderDelay: 500,
    zIndex: 20000
  },
  codeMirrorExtensions: (_theme, innerExtensions) => innerExtensions,
  markdownItConfig: () => {},
  markdownItPlugins: (s) => s,
  iconfontType: 'svg',
  mermaidConfig: (c) => c,
  katexConfig: (c) => c
};

export const config: Config = (option) => {
  return deepMerge(configOption, option);
};

/**
 * 拖拽时最小的宽度
 */
export const MinInputBoxWidth = 170;
