import markdownit from 'markdown-it';
import { ComputedRef } from 'vue';
import { prefix } from '~/config';
import { Themes } from '~/type';
import { mermaidCache } from '~/utils/cache';

const MermaidPlugin = (md: markdownit, options: { themeRef: ComputedRef<Themes> }) => {
  const temp = md.renderer.rules.fence!.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, ops, env, slf) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info === 'mermaid') {
      token.attrSet('class', `${prefix}-mermaid`);
      token.attrSet('data-mermaid-theme', options.themeRef.value);

      if (token.map && token.level === 0) {
        const closeLine = token.map[1] - 1;
        const closeLineText = env.srcLines[closeLine]?.trim();
        const isClosingFence = !!closeLineText?.startsWith('```');

        token.attrSet('data-closed', `${isClosingFence}`);
        token.attrSet('data-line', String(token.map[0]));
      }

      const mermaidHtml = mermaidCache.get(code) as string;

      if (mermaidHtml) {
        token.attrSet('data-processed', '');
        return `<p ${slf.renderAttrs(token)}>${mermaidHtml}</p>`;
      }

      return `<div ${slf.renderAttrs(token)}>${md.utils.escapeHtml(code)}</div>`;
    }

    return temp(tokens, idx, ops, env, slf);
  };
};

export default MermaidPlugin;
