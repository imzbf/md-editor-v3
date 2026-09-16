import markdownit from 'markdown-it';
import { ComputedRef } from 'vue';
import { prefix } from '~/config';
import { Themes } from '~/type';
import { mermaidCache } from '~/utils/cache';
import { renderTokenContent } from '~/utils/md-it';

const MermaidPlugin = (md: markdownit, options: { themeRef: ComputedRef<Themes> }) => {
  // 在 renderer 之前补齐 token 结构，使后续 core 插件能够读取并检查标签与属性。
  md.core.ruler.after('block', 'mermaid-token-attrs', (state) => {
    state.tokens.forEach((token) => {
      if (token.type !== 'fence' || token.info !== 'mermaid') {
        return;
      }

      token.tag = 'div';
      token.attrJoin('class', `${prefix}-mermaid`);
      token.attrSet('data-mermaid-theme', options.themeRef.value);

      if (token.map && token.level === 0) {
        const closeLine = token.map[1] - 1;
        const closeLineText = state.env.srcLines?.[closeLine]?.trim();
        const isClosingFence = !!closeLineText?.startsWith('```');

        token.attrSet('data-closed', `${isClosingFence}`);
        token.attrSet('data-line', String(token.map[0]));
      }
    });
  });

  const temp = md.renderer.rules.fence!.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, ops, env, slf) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info === 'mermaid') {
      const mermaidHtml = mermaidCache.get(code) as string;

      if (mermaidHtml) {
        token.tag = 'p';
        token.attrSet('data-processed', '');
        token.attrSet('data-content', code);
        return renderTokenContent(token, mermaidHtml, slf);
      }

      return renderTokenContent(token, md.utils.escapeHtml(code), slf);
    }

    return temp(tokens, idx, ops, env, slf);
  };
};

export default MermaidPlugin;
