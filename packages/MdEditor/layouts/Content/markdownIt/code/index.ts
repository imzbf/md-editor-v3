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
import { mergeAttrs } from '~/utils/md-it';

export interface CodeTabsPluginOps extends markdownit.Options {
  editorId: string;
  usedLanguageTextRef: Ref<StaticTextDefaultValue>;
  codeFoldable: boolean;
  autoFoldThreshold: number;
}

const codetabs = (md: markdownit, _opts: CodeTabsPluginOps) => {
  const defaultRender = md.renderer.rules.fence,
    unescapeAll = md.utils.unescapeAll,
    re = /\[(\w*)(?::([\w ]*))?\]/,
    mandatoryRe = /::close/;

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
    const mandatory = mandatoryRe.test(token.info);

    const open =
      !mandatory && token.content.trim().split('\n').length < _opts.autoFoldThreshold;
    const tagContainer = mandatory || _opts.codeFoldable ? 'details' : 'div',
      tagHeader = mandatory || _opts.codeFoldable ? 'summary' : 'div';

    return { open, tagContainer, tagHeader };
  };

  const fenceGroup = (
    tokens: Token[],
    idx: number,
    options: markdownit.Options,
    env: any,
    slf: Renderer
  ) => {
    const copyBtnText = _opts.usedLanguageTextRef.value?.copyCode!.text;

    if (tokens[idx].hidden) {
      return '';
    }

    const [GROUP] = getGroupAndTab(tokens[idx]);
    if (GROUP === null) {
      const { open, tagContainer, tagHeader } = getTagType(tokens[idx]);
      const addAttrs: [[string, string]] = [['class', `${prefix}-code`]];
      open && addAttrs.push(['open', '']);

      const tmpToken = {
        attrs: mergeAttrs(tokens[idx], addAttrs)
      };

      tokens[idx].info = tokens[idx].info.replace(mandatoryRe, '');

      const codeRendered = defaultRender!(tokens, idx, options, env, slf);
      return `<${tagContainer} ${slf.renderAttrs(tmpToken as Token)}>
        <${tagHeader} class="${prefix}-code-head">
          <div class="${prefix}-code-flag"><span></span><span></span><span></span></div>
          <div>
            <span class="${prefix}-code-lang">${tokens[idx].info.trim()}</span>
            <span class="${prefix}-copy-button" data-tips="${copyBtnText}">${copyBtnText}</span>
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
    const addAttrs: [[string, string]] = [['class', `${prefix}-code`]];
    open && addAttrs.push(['open', '']);

    const tmpToken = {
      attrs: mergeAttrs(tokens[idx], addAttrs)
    };

    for (let i = idx; i < tokens.length; i++) {
      token = tokens[i];
      [group, tab] = getGroupAndTab(token);
      if (group !== GROUP) {
        break;
      }

      token.info = token.info.replace(re, '').replace(mandatoryRe, '');
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
        <span class="${prefix}-copy-button" data-tips="${copyBtnText}">${copyBtnText}</span>
      </div>
    </${tagHeader}>${pres}</${tagContainer}>`;
  };

  md.renderer.rules.fence = fenceGroup;
};

export default codetabs;
