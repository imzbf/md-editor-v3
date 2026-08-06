import markdownit from 'markdown-it';
import { ComputedRef } from 'vue';
import { prefix } from '~/config';
import { Themes } from '~/type';
import { renderTokenContent } from '~/utils/md-it';

const EchartsPlugin = (md: markdownit, options: { themeRef: ComputedRef<Themes> }) => {
  // 属性在 core 阶段进入 token，避免 renderer 临时拼装出其他插件无法检查的结构。
  md.core.ruler.after('block', 'echarts-token-attrs', (state) => {
    state.tokens.forEach((token) => {
      if (token.type !== 'fence' || token.info !== 'echarts') {
        return;
      }

      token.tag = 'div';
      token.attrJoin('class', `${prefix}-echarts`);
      token.attrSet('data-echarts-theme', options.themeRef.value);
      token.attrSet('style', 'width: 100%; aspect-ratio: 4 / 3;');

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
    if (token.info === 'echarts') {
      return renderTokenContent(token, md.utils.escapeHtml(code), slf);
    }

    return temp(tokens, idx, ops, env, slf);
  };
};

export default EchartsPlugin;
