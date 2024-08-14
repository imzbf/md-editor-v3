import { ComputedRef } from 'vue';
import markdownit from 'markdown-it';
import { Themes } from '~/type';
import { prefix } from '~/config';
import { mermaidCache } from '~/utils/cache';

const MermaidPlugin = (md: markdownit, options: { themeRef: ComputedRef<Themes> }) => {
  const temp = md.renderer.rules.fence!.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, ops, env, slf) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info === 'mermaid') {
      let line;
      if (tokens[idx].map && tokens[idx].level === 0) {
        line = tokens[idx].map![0];
        tokens[idx].attrSet('data-line', String(line));
      }

      const mermaidHtml = mermaidCache.get(code) as string;

      if (mermaidHtml) {
        return `<p class="${prefix}-mermaid" ${
          line !== undefined ? 'data-line=' + line : ''
        } data-processed>${mermaidHtml}</p>`;
      }

      return `<div class="${prefix}-mermaid" ${
        line !== undefined ? 'data-line=' + line : ''
      } data-mermaid-theme=${options.themeRef.value}>${code}</div>`;
    }

    return temp!(tokens, idx, ops, env, slf);
  };
};

export default MermaidPlugin;
