import { splitKatexValue } from '.';

export default {
  block(prefix: string, katex: any) {
    return {
      name: 'KaTexBlockExtension',
      level: 'block',
      start: (text: string) => text.match(/\n\$\$\n/)?.index,
      tokenizer(text: string) {
        if (/^\$\$\n/.test(text) && text.split('$$').length > 2) {
          const match = splitKatexValue(text, '$$');
          const token = {
            type: 'KaTexBlockExtension',
            raw: match[0],
            text: match[1].trim(),
            tokens: []
          };

          return token;
        }
      },
      renderer(token: any) {
        const _katex = katex || (typeof window !== 'undefined' && window.katex);

        if (_katex) {
          const html = _katex.renderToString(token.text, {
            throwOnError: false,
            displayMode: true
          });

          return `<span class="${prefix}-katex-block" data-processed>${html}</span>`;
        } else {
          return `<span class="${prefix}-katex-block">${token.text}</span>`;
        }
      }
    };
  },
  inline(prefix: string, katex: any) {
    return {
      name: 'KaTexInlineExtension',
      level: 'inline',
      start: (text: string) => text.match(/\$[^\n]*/)?.index,
      tokenizer(text: string) {
        if (/^\$[^\n]*\$/.test(text)) {
          const match = splitKatexValue(text);

          const token = {
            type: 'KaTexInlineExtension',
            raw: match[0],
            text: match[1].trim(),
            tokens: []
          };

          return token;
        }
      },
      renderer(token: any) {
        const _katex = katex || (typeof window !== 'undefined' && window.katex);

        if (_katex) {
          const html = _katex.renderToString(token.text, {
            throwOnError: false
          });

          return `<span class="${prefix}-katex-inline" data-processed>${html}</span>`;
        } else {
          return `<span class="${prefix}-katex-inline">${token.text}</span>`;
        }
      }
    };
  }
};
