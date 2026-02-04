import markdownit from 'markdown-it';
import { ComputedRef } from 'vue';
import { prefix } from '~/config';
import { Themes } from '~/type';

const EchartsPlugin = (md: markdownit, options: { themeRef: ComputedRef<Themes> }) => {
  const temp = md.renderer.rules.fence!.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, ops, env, slf) => {
    const token = tokens[idx];
    let code = token.content.trim();
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

      let width = 640;
      let height = 480;

      try {
        const func = new Function('return (' + code + ')')
        const cfg = func();
        if (cfg.grid) {
          const w = cfg.grid.width;
          const h = cfg.grid.height;
          if (!!w && !!h) {
            width = w;
            height = h;
          }
          delete cfg.grid;
          code = JSON.stringify(cfg);
        }

      }
      catch (ex: any) {
        console.error(ex);
      }

      return `<div ${slf.renderAttrs(token)} style="margin: 0 auto; width: ${width}px; height: ${height}px;">${md.utils.escapeHtml(code)}</div>`;
    }

    return temp(tokens, idx, ops, env, slf);
  };
};

export default EchartsPlugin;
