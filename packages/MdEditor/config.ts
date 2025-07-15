import { deepMerge } from '@vavt/util';
import { CodeCss, Config, GlobalConfig, Footers, StaticTextDefault } from './type';

export const prefix = 'md-editor';

// 编辑器ID
export const defaultEditorId = 'md-editor-v3';

export const cdnBase = 'https://unpkg.com';

// 代码高亮cdn链接
export const highlightUrl = `${cdnBase}/@highlightjs/cdn-assets@11.10.0/highlight.min.js`;

// 美化代码cdn连接
export const prettierUrl = {
  main: `${cdnBase}/prettier@3.3.3/standalone.js`,
  markdown: `${cdnBase}/prettier@3.3.3/plugins/markdown.js`
};

export const cropperUrl = {
  css: `${cdnBase}/cropperjs@1.6.2/dist/cropper.min.css`,
  js: `${cdnBase}/cropperjs@1.6.2/dist/cropper.min.js`
};

export const screenfullUrl = `${cdnBase}/screenfull@5.2.0/dist/screenfull.js`;

export const mermaidUrl = `${cdnBase}/mermaid@11.3.0/dist/mermaid.min.js`;
// export const mermaidUrl = `${cdnBase}/mermaid/9.4.0/mermaid.min.js`;

export const katexUrl = {
  js: `${cdnBase}/katex@0.16.22/dist/katex.min.js`,
  css: `${cdnBase}/katex@0.16.22/dist/katex.min.css`
};

export const codeCss: CodeCss = {
  a11y: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/a11y-light.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/a11y-dark.min.css`
  },
  atom: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/atom-one-light.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/atom-one-dark.min.css`
  },
  github: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/github.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/github-dark.min.css`
  },
  gradient: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/gradient-light.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/gradient-dark.min.css`
  },
  kimbie: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/kimbie-light.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/kimbie-dark.min.css`
  },
  paraiso: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/paraiso-light.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/paraiso-dark.min.css`
  },
  qtcreator: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/qtcreator-light.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/qtcreator-dark.min.css`
  },
  stackoverflow: {
    light: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/stackoverflow-light.min.css`,
    dark: `${cdnBase}/@highlightjs/cdn-assets@11.10.0/styles/stackoverflow-dark.min.css`
  }
};

// 当前版本的值
export const editorExtensionsAttrs: GlobalConfig['editorExtensionsAttrs'] = {
  highlight: {
    js: {
      integrity:
        'sha384-GdEWAbCjn+ghjX0gLx7/N1hyTVmPAjdC2OvoAA0RyNcAOhqwtT8qnbCxWle2+uJX',
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
        'sha384-92h6ALm8/lHpNGn6MfGlgZ+I8c/4yn/nSN8dV9ZmDxqbP9L93gk/Jj2i0LtV+AVd',
      crossOrigin: 'anonymous'
    },
    parserMarkdownJs: {
      integrity:
        'sha384-5ufuUgoSsr/2oihBZ5d+c+yt0qaUmzLtUz41VZNJ4txtyJ6mBve3ZwuKoq/IygYX',
      crossOrigin: 'anonymous'
    }
  },
  cropper: {
    js: {
      integrity:
        'sha384-jrOgQzBlDeUNdmQn3rUt/PZD+pdcRBdWd/HWRqRo+n2OR2QtGyjSaJC0GiCeH+ir',
      crossOrigin: 'anonymous'
    },
    css: {
      integrity:
        'sha384-6LFfkTKLRlzFtgx8xsWyBdKGpcMMQTkv+dB7rAbugeJAu1Ym2q1Aji1cjHBG12Xh',
      crossOrigin: 'anonymous'
    }
  },
  screenfull: {
    js: {
      integrity:
        'sha384-Qfbv8upMDu/ikv42M0Jnym2hahbDQ77Nm8PGU0G+iA6UIwt1+scE6P1qKXA0anWU',
      crossOrigin: 'anonymous'
    }
  },
  mermaid: {
    js: {
      integrity:
        'sha384-B2tp/GqmE6VfDRB3JPTsesr0+SXypThjLSvQEQH7iv3f3/PYKCm5Q4+SGPcitStz',
      crossOrigin: 'anonymous'
    }
  },
  katex: {
    js: {
      integrity:
        'sha384-cMkvdD8LoxVzGF/RPUKAcvmm49FQ0oxwDF3BGKtDXcEc+T1b2N+teh/OJfpU0jr6',
      crossOrigin: 'anonymous'
    },
    css: {
      integrity:
        'sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP',
      crossOrigin: 'anonymous'
    }
  }
};

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
      link: 'Add Image Link',
      upload: 'Upload Images',
      clip2upload: 'Crop And Upload'
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

export const globalConfig: GlobalConfig = {
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
    screenfull: {
      js: screenfullUrl
    },
    mermaid: {
      js: mermaidUrl,
      enableZoom: true
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
  mermaidConfig: (c) => c,
  katexConfig: (c) => c
};

export const config: Config = (option) => {
  return deepMerge(globalConfig, option, {
    excludeKeys(key) {
      return /[iI]{1}nstance/.test(key);
    }
  });
};

/**
 * 拖拽时最小的宽度
 * 5.3.0开始使用百分比，不能小于10%
 */
export const MinInputBoxWidth = 0.1;
