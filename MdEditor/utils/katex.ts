export default {
  block(prefix: string, katex: any) {
    return {
      name: 'KaTexBlockExtension',
      level: 'block',
      start: (text: string) => text.match(/\$\$\n/)?.index,
      tokenizer(text: string) {
        const reg = /^\$\$\n([^$]*)\$\$\n?/;
        const match = reg.exec(text);

        if (match) {
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
            throwOnError: false
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
      start: (text: string) => text.match(/\$[^$]/)?.index,
      tokenizer(text: string) {
        const reg = /^\$([^$]*)\$/;
        const match = reg.exec(text);

        if (match) {
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
