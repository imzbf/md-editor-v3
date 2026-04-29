import markdownit from 'markdown-it';
import { prefix } from '~/config';

const GeogebraPlugin = (md: markdownit) => {
  const temp = md.renderer.rules.fence!.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, ops, env, slf) => {
    const token = tokens[idx];
    const code = token.content.trim();

    if (token.info === 'geogebra') {
      token.attrSet('class', `${prefix}-geogebra`);

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

export default GeogebraPlugin;
