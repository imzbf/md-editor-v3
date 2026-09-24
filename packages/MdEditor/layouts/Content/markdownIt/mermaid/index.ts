import markdownit from 'markdown-it';
import { ComputedRef, Ref } from 'vue';
import { prefix } from '~/config';
import { Themes } from '~/type';
import { renderTokenContent } from '~/utils/md-it';

const MermaidPlugin = (
  md: markdownit,
  options: {
    themeRef: ComputedRef<Themes>;
    revision?: Ref<number>;
    getCached?: (block: string | undefined, code: string) => { svg: string } | undefined;
  }
) => {
  // 在 renderer 之前补齐 token 结构，使后续 core 插件能够读取并检查标签与属性。
  md.core.ruler.after('block', 'mermaid-token-attrs', (state) => {
    state.tokens.forEach((token, index) => {
      if (token.type !== 'fence' || token.info !== 'mermaid') {
        return;
      }

      token.tag = 'div';
      token.attrJoin('class', `${prefix}-mermaid`);
      token.attrSet('data-mermaid-theme', options.themeRef.value);
      token.attrSet('data-mermaid-block', String(token.map?.[0] ?? index));
      // 策略变化也必须使 HTML 改变，触发按需 DOM 更新并移除旧策略生成的 SVG。
      token.attrSet('data-mermaid-revision', String(options.revision?.value ?? 0));

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
      // 仅复用当前预览、代码块与策略版本的已清洗结果；首次渲染和未闭合代码块
      // 仍输出转义源码。这样 HTML 导出也能继续包含缓存中的图表。
      const cached =
        token.attrGet('data-closed') !== 'false'
          ? options.getCached?.(token.attrGet('data-mermaid-block') ?? undefined, code)
          : undefined;
      if (cached) {
        token.tag = 'p';
        token.attrSet('data-processed', '');
        token.attrSet('data-content', code);
        return renderTokenContent(token, cached.svg, slf);
      }

      return renderTokenContent(token, md.utils.escapeHtml(code), slf);
    }

    return temp(tokens, idx, ops, env, slf);
  };
};

export default MermaidPlugin;
