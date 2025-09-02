import markdownit from 'markdown-it';
import { ComputedRef } from 'vue';
import { prefix } from '~/config';
import { Themes } from '~/type';

const EchartsPlugin = (md: markdownit, options: { themeRef: ComputedRef<Themes> }) => {
  const temp = md.renderer.rules.fence!.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, ops, env, slf) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info === 'echarts') {
      token.attrSet('class', `${prefix}-echarts`);
      token.attrSet('data-echarts-theme', options.themeRef.value);

      if (token.map && token.level === 0) {
        const closeLine = token.map[1] - 1;
        const closeLineText = env.srcLines[closeLine]?.trim();
        const isClosingFence = !!closeLineText?.startsWith('```');

        token.attrSet('data-closed', `${isClosingFence}`);
        token.attrSet('data-line', String(token.map[0]));
      }

      return `<div ${slf.renderAttrs(token)} style="width: 100%; aspect-ratio: 4 / 3;">${md.utils.escapeHtml(code)}</div>`;
    }

    return temp(tokens, idx, ops, env, slf);
  };
};

export default EchartsPlugin;
