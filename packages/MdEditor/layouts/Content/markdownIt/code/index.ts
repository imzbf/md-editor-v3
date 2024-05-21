/**
 * 折叠代码源码来自：https://github.com/cncws/markdown-it-codetabs
 *
 * 该扩展添加了编辑器适配和折叠代码功能
 *
 * 源码如果在页面中存在多个编辑器，但是内容又是相同的时候，第二个开始的内容有点混乱
 * 需要与编辑器的editorId绑定
 */
import markdownit, { Renderer, Token } from 'markdown-it';
import { Ref } from 'vue';
import { StaticTextDefaultValue } from '~/type';
import { prefix } from '~/config';

export interface CodeTabsPluginOps extends markdownit.Options {
  editorId: string;
  usedLanguageTextRef: Ref<StaticTextDefaultValue>;
  codeFoldable: boolean;
  autoFoldThreshold: number;
}

const mergeAttrs = (token: Token, open: boolean) => {
  const i = token.attrIndex('class');
  const tmpAttrs = token.attrs ? token.attrs!.slice() : [];

  if (i < 0) {
    tmpAttrs.push(['class', `${prefix}-code`]);
  } else {
    tmpAttrs[i] = tmpAttrs[i].slice() as [string, string];
    tmpAttrs[i][1] += ` ${prefix}-code"`;
  }

  open && tmpAttrs.push(['open', '']);

  return tmpAttrs;
};

const codetabs = (md: markdownit, _opts: CodeTabsPluginOps) => {
  const defaultRender = md.renderer.rules.fence,
    unescapeAll = md.utils.unescapeAll,
    re = /\[(\w*)(?::([\w ]*))?\]/;

  const getInfo = (token: Token) => {
    return token.info ? unescapeAll(token.info).trim() : '';
  };

  const getGroupAndTab = (token: Token) => {
    const info = getInfo(token),
      [group = null, tab = ''] = (re.exec(info) || []).slice(1);

    return [group, tab];
  };

  const getLangName = (token: Token) => {
    const info = getInfo(token);
    return info ? info.split(/(\s+)/g)[0] : '';
  };

  const getTagType = (token: Token) => {
    const open = token.content.trim().split('\n').length < _opts.autoFoldThreshold;
    const tagContainer = _opts.codeFoldable ? 'details' : 'div',
      tagHeader = _opts.codeFoldable ? 'summary' : 'div';

    return { open, tagContainer, tagHeader };
  };

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

    const [GROUP] = getGroupAndTab(tokens[idx]);
    if (GROUP === null) {
      const { open, tagContainer, tagHeader } = getTagType(tokens[idx]);
      const tmpToken = {
        attrs: mergeAttrs(tokens[idx], open)
      };

      const codeRendered = defaultRender!(tokens, idx, options, env, slf);
      return `<${tagContainer} ${slf.renderAttrs(tmpToken as Token)}>
    <${tagHeader} class="${prefix}-code-head">
      <div class="${prefix}-code-flag">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div>
        <span class="${prefix}-code-lang">${tokens[idx].info.trim()}</span>
        <span class="${prefix}-copy-button">${_opts.usedLanguageTextRef.value?.copyCode!.text}</span>
      </div>
    </${tagHeader}>${codeRendered}</${tagContainer}>`;
    }

    let token,
      group,
      tab,
      checked,
      labels = '',
      pres = '',
      langs = '';

    const { open, tagContainer, tagHeader } = getTagType(tokens[idx]);
    const tmpToken = {
      attrs: mergeAttrs(tokens[idx], open)
    };

    for (let i = idx; i < tokens.length; i++) {
      token = tokens[i];
      [group, tab] = getGroupAndTab(token);
      if (group !== GROUP) {
        break;
      }

      token.info = token.info.replace(re, '');
      token.hidden = true;

      const className = `${prefix}-codetab-${_opts.editorId}-${idx}-${i - idx}`;

      checked = i - idx > 0 ? '' : 'checked';

      labels += `<li>
          <input type="radio" name="${prefix}-codetab-label-${_opts.editorId}-${idx}" class="${className}" ${checked}>
          <label onclick="document.querySelectorAll('.${className}').forEach(e => e.click())">${
            tab || getLangName(token)
          }</label>
        </li>`;

      pres += `<input type="radio" name="${prefix}-codetab-pre-${_opts.editorId}-${idx}" class="${className}" ${checked}>
      ${defaultRender!(tokens, i, options, env, slf)}`;

      langs += `<input type="radio" name="${prefix}-codetab-lang-${_opts.editorId}-${idx}" class="${className}" ${checked}>
      <span class=${prefix}-code-lang>${getLangName(token)}</span>`;
    }

    return `<${tagContainer} ${slf.renderAttrs(tmpToken as Token)}>
    <${tagHeader} class="${prefix}-code-head">
      <div class="${prefix}-code-flag">
        <ul class="${prefix}-codetab-label">${labels}</ul>
      </div>
      <div>
        <span class="${prefix}-codetab-lang">${langs}</span>
        <span class="${prefix}-copy-button">${_opts.usedLanguageTextRef.value?.copyCode!.text}</span>
      </div>
    </${tagHeader}>${pres}</${tagContainer}>`;
  };

  md.renderer.rules.fence = fenceGroup;
};

export default codetabs;
