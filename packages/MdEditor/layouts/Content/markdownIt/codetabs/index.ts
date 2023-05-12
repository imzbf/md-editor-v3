/**
 * 源码来自：https://github.com/cncws/markdown-it-codetabs
 *
 * 这里仅做适配
 *
 * 源码如果在页面中存在多个编辑器，但是内容又是相同的时候，第二个开始的内容有点混乱
 * 需要与编辑器的editorId绑定
 */
import markdownit from 'markdown-it/lib';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';

export interface CodeTabsPluginOps extends markdownit.Options {
  editorId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const codetabs = (md: markdownit, _opts: CodeTabsPluginOps) => {
  const defaultRender = md.renderer.rules.fence,
    unescapeAll = md.utils.unescapeAll,
    // [group:tab], :tab is optional
    re = /\[(\w*)(?::([\w ]*))?\]/;

  function getInfo(token: Token) {
    return token.info ? unescapeAll(token.info).trim() : '';
  }

  function getGroupAndTab(token: Token) {
    const info = getInfo(token),
      [group = null, tab = ''] = (re.exec(info) || []).slice(1);
    return [group, tab];
  }

  function getLangName(token: Token) {
    const info = getInfo(token);
    return info ? info.split(/(\s+)/g)[0] : '';
  }

  const fenceGroup = (
    tokens: Token[],
    idx: number,
    options: markdownit.Options,
    env: any,
    slf: Renderer
  ) => {
    if (tokens[idx].hidden) {
      return '';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [GROUP, _] = getGroupAndTab(tokens[idx]);
    if (GROUP === null) {
      return defaultRender!(tokens, idx, options, env, slf);
    }

    let token,
      group,
      tab,
      checked,
      labels = '',
      pres = '';
    for (let i = idx; i < tokens.length; i++) {
      token = tokens[i];
      [group, tab] = getGroupAndTab(token);
      if (group !== GROUP) {
        break;
      }

      token.info = token.info.replace(re, '');
      token.hidden = true;

      checked = i - idx > 0 ? '' : ' checked';
      labels +=
        `<li><input type="radio" name="label-group-${_opts.editorId}-${idx}"${checked}>` +
        `<label for="group-${_opts.editorId}-${idx}-tab-${
          i - idx
        }" onclick="this.previousElementSibling.click()">${
          tab || getLangName(token)
        }</label></li>\n`;
      pres +=
        `<input type="radio" id="group-${_opts.editorId}-${idx}-tab-${
          i - idx
        }" name="group-${_opts.editorId}-${idx}"${checked}>\n` +
        defaultRender!(tokens, i, options, env, slf);
    }

    return '<div class="code-tabs">\n<ul>\n' + labels + '</ul>\n' + pres + '</div>';
  };

  md.renderer.rules.fence = fenceGroup;
};

export default codetabs;
