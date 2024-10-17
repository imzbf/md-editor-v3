/**
 * 折叠代码源码来自：https://github.com/cncws/markdown-it-codetabs
 *
 * 该扩展添加了编辑器适配和折叠代码功能
 *
 * 源码如果在页面中存在多个编辑器，但是内容又是相同的时候，第二个开始的内容有点混乱
 * 需要与编辑器的editorId绑定
 */
import markdownit, { Renderer, Token } from 'markdown-it';
import { ComputedRef, Ref } from 'vue';
import { CustomIcon, StaticTextDefaultValue } from '~/type';
import { prefix } from '~/config';
import { mergeAttrs } from '~/utils/md-it';
import StrIcon from '~/components/Icon/Str';

export interface CodeTabsPluginOps extends markdownit.Options {
  editorId: string;
  usedLanguageTextRef: Ref<StaticTextDefaultValue>;
  codeFoldable: boolean;
  autoFoldThreshold: number;
  customIconRef: ComputedRef<CustomIcon>;
}

const codetabs = (md: markdownit, _opts: CodeTabsPluginOps) => {
  const defaultRender = md.renderer.rules.fence,
    unescapeAll = md.utils.unescapeAll,
    re = /\[(\w*)(?::([\w ]*))?\]/,
    mandatoryRe = /::(open|close)/;

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
    const mandatory = token.info.match(mandatoryRe) || [];
    const open =
      mandatory[1] === 'open' ||
      (mandatory[1] !== 'close' &&
        _opts.codeFoldable &&
        token.content.trim().split('\n').length < _opts.autoFoldThreshold);

    const tagContainer = mandatory[1] || _opts.codeFoldable ? 'details' : 'div',
      tagHeader = mandatory[1] || _opts.codeFoldable ? 'summary' : 'div';

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

    const codeCodeText = _opts.usedLanguageTextRef.value?.copyCode!.text;
    const copyBtnHtml = _opts.customIconRef.value.copy || codeCodeText;
    const isIcon = !!_opts.customIconRef.value.copy;

    const collapseTips = `<span class="${prefix}-collapse-tips">${StrIcon('collapse-tips', _opts.customIconRef.value)}</span>`;

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
      return `
        <${tagContainer} ${slf.renderAttrs(tmpToken as Token)}>
          <${tagHeader} class="${prefix}-code-head">
            <div class="${prefix}-code-flag"><span></span><span></span><span></span></div>
            <div class="${prefix}-code-action">
              <span class="${prefix}-code-lang">${tokens[idx].info.trim()}</span>
              <span class="${prefix}-copy-button" data-tips="${codeCodeText}"${isIcon ? ' data-is-icon=true' : ''}>${copyBtnHtml}</span>
              ${tagContainer === 'details' ? collapseTips : ''}
            </div>
          </${tagHeader}>
          ${codeRendered}
        </${tagContainer}>
      `;
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

      labels += `
        <li>
          <input
            type="radio"
            id="label-${prefix}-codetab-label-1-${_opts.editorId}-${idx}-${i - idx}"
            name="${prefix}-codetab-label-${_opts.editorId}-${idx}"
            class="${className}"
            ${checked}
          >
          <label
            for="label-${prefix}-codetab-label-1-${_opts.editorId}-${idx}-${i - idx}"
            onclick="this.getRootNode().querySelectorAll('.${className}').forEach(e => e.click())"
          >
            ${tab || getLangName(token)}
          </label>
        </li>`;

      pres += `
        <div role="tabpanel">
          <input
            type="radio"
            name="${prefix}-codetab-pre-${_opts.editorId}-${idx}"
            class="${className}"
            ${checked}
            role="presentation">
          ${defaultRender!(tokens, i, options, env, slf)}
        </div>`;

      langs += `
        <input
          type="radio"
          name="${prefix}-codetab-lang-${_opts.editorId}-${idx}"
          class="${className}"
          ${checked}
          role="presentation">
        <span class=${prefix}-code-lang role="note">${getLangName(token)}</span>`;
    }

    return `
      <${tagContainer} ${slf.renderAttrs(tmpToken as Token)}>
        <${tagHeader} class="${prefix}-code-head">
          <div class="${prefix}-code-flag">
            <ul class="${prefix}-codetab-label" role="tablist">${labels}</ul>
          </div>
          <div class="${prefix}-code-action">
            <span class="${prefix}-codetab-lang">${langs}</span>
            <span class="${prefix}-copy-button" data-tips="${codeCodeText}"${isIcon ? ' data-is-icon=true' : ''}>${copyBtnHtml}</span>
            ${tagContainer === 'details' ? collapseTips : ''}
          </div>
        </${tagHeader}>
        ${pres}
      </${tagContainer}>
    `;
  };

  md.renderer.rules.fence = fenceGroup;
  md.renderer.rules.code_block = fenceGroup;
};

export default codetabs;
