import markdownit from 'markdown-it';
import { ComputedRef } from 'vue';
import { prefix } from '~/config';
import { Themes } from '~/type';
import { renderTokenContent } from '~/utils/md-it';

const EchartsPlugin = (md: markdownit, options: { themeRef: ComputedRef<Themes> }) => {
  // 属性在 core 阶段进入 token，避免 renderer 临时拼装出其他插件无法检查的结构。
  md.core.ruler.after('block', 'echarts-token-attrs', (state) => {
    let sourceLines: string[] | undefined;
    state.tokens.forEach((token) => {
      if (token.type !== 'fence' || token.info.trim() !== 'echarts') {
        return;
      }

      token.tag = 'div';
      token.attrJoin('class', `${prefix}-echarts`);
      token.attrSet('data-echarts-theme', options.themeRef.value);
      token.attrSet('style', 'width: 100%; aspect-ratio: 4 / 3;');

      if (token.map) {
        sourceLines ??= state.src.split('\n');
        // map 包含开闭标记，content 仅包含正文。按解析结果判断闭合，兼容波浪线、
        // 更长标记和嵌套；检查末行后缀，排除缩进去除后为空的未闭合正文。
        const contentLineCount = token.content
          ? token.content.split('\n').length - Number(token.content.endsWith('\n'))
          : 0;
        const closeLineText = sourceLines[token.map[1] - 1].trimEnd();
        const isClosingFence =
          token.map[1] - token.map[0] === contentLineCount + 2 &&
          closeLineText.endsWith(token.markup);
        token.attrSet('data-closed', `${isClosingFence}`);
        if (token.level === 0) token.attrSet('data-line', String(token.map[0]));
      }
    });
  });

  const temp = md.renderer.rules.fence!.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, ops, env, slf) => {
    const token = tokens[idx];
    if (token.info.trim() === 'echarts') {
      return renderTokenContent(token, md.utils.escapeHtml(token.content.trim()), slf);
    }

    return temp(tokens, idx, ops, env, slf);
  };
};

export default EchartsPlugin;
