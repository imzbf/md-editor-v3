/**
 * 重写markdown-it-xss，它的作者好像不维护了
 */

// 为了不与之前的配置冲突，目前采用全量引入
import * as xss from 'xss';
import markdownit from 'markdown-it';

export interface XSSPluginType {
  // https://github.com/leizongmin/js-xss/blob/master/README.zh.md
  xss?: (_xss: typeof xss) => XSS.IFilterXSSOptions | xss.IFilterXSSOptions;
  /**
   * 它不会覆盖默认的白名单，而是把默认白名单、内置白名单结合
   */
  extendedWhiteList?: xss.IFilterXSSOptions['whiteList'];
}

const MdWhiteList: xss.IFilterXSSOptions['whiteList'] = {
  img: ['class'],
  // 支持任务列表
  input: ['class', 'disabled', 'type', 'checked'],
  // 主要支持youtobe、腾讯视频、哔哩哔哩等内嵌视频代码
  iframe: [
    'class',
    'width',
    'height',
    'src',
    'title',
    'border',
    'frameborder',
    'framespacing',
    'allow',
    'allowfullscreen'
  ]
};

const XSSPlugin = (md: markdownit, options: XSSPluginType) => {
  const { extendedWhiteList = {}, xss: xssOption = {} } = options;
  let xssIns: xss.FilterXSS;

  if (typeof xssOption === 'function') {
    xssIns = new xss.FilterXSS(xssOption(xss));
  } else {
    const whiteList = xss.getDefaultWhiteList();

    // 把内置的和用户自定义的key拿出来，与默认的合并一下
    const keys = [...Object.keys(extendedWhiteList), ...Object.keys(MdWhiteList)];

    keys.forEach((key) => {
      const xssWhiteItem = whiteList[key] || [];
      const innerWhiteItem = MdWhiteList[key] || [];
      const userDefWhiteItem = extendedWhiteList[key] || [];
      whiteList[key] = [
        ...new Set([...xssWhiteItem, ...innerWhiteItem, ...userDefWhiteItem])
      ];
    });

    xssIns = new xss.FilterXSS({
      whiteList,
      // 自定义的优先级最高
      ...xssOption
    });
  }

  md.core.ruler.after('linkify', 'xss', (state) => {
    for (let i = 0; i < state.tokens.length; i++) {
      const cur = state.tokens[i];

      switch (cur.type) {
        case 'html_block': {
          cur.content = xssIns.process(cur.content);
          break;
        }

        case 'inline': {
          const inlineTokens = cur.children || [];

          inlineTokens.forEach((it) => {
            if (it.type === 'html_inline') {
              it.content = xssIns.process(it.content);
            }
          });

          break;
        }
      }
    }
  });
};

export default XSSPlugin;
