import { marked } from 'marked';

export default {
  name: 'MarkExtension',
  level: 'inline',
  start: (text: string) => text.match(/@[^@]/)?.index,
  tokenizer(text: string) {
    const reg = /^@([^@]*)@/;
    const match = reg.exec(text);

    if (match) {
      const token = {
        type: 'MarkExtension',
        raw: match[0],
        text: match[1].trim(),
        tokens: []
      };

      return token;
    }
  },
  renderer(token: any) {
    return `<mark>${token.text}</mark>`;
  }
} as marked.TokenizerExtension & marked.RendererExtension;
