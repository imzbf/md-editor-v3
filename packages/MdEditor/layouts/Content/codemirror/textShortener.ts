/**
 * https://discuss.codemirror.net/t/i-created-an-extension-to-collapse-and-display-long-text-but-im-encountering-issues-when-pasting-long-text-in-places-where-there-are-characters-before-or-after-it/9400
 *
 * 在 codemirror 作者帮助下优化了该插件。
 */

import { EditorState, Line, RangeSetBuilder, StateField } from '@codemirror/state';
import { Decoration, DecorationSet, EditorView, WidgetType } from '@codemirror/view';

export interface TextShortenerOptions {
  maxLength: number;
  // findTexts?: (text: string, defaultTextRegex: RegExp) => Array<[number, number]>;
}

// http:// https:// ftp:// 等
const protoLink = /[a-z][a-z0-9.+-]*:\/\/[^\s<>"'`()]+(?:\([^\s<>"'`]*\)[^\s<>"'`]*)*/i;
// 协议相对链接 //example.com
const protocolRelative = /\/\/[^\s<>"'`()]+/i;
// data:...
const dataUri = /data:[a-z]+\/[a-z0-9.+-]+(?:;base64)?,[a-z0-9+/=%]+/i;
// /path/to/file
const absPath = /\/(?!\/)[^\s<>"'`()]+/i;

const defaultTextRegex = new RegExp(
  `(?<![a-z0-9.+-])(${protoLink.source}|${protocolRelative.source}|${dataUri.source}|${absPath.source})`,
  'gi'
);

export const createTextShortener = (options: TextShortenerOptions) => {
  const shortenText = (text: string): string => {
    return text.length > 10 ? text.slice(0, 10) + '...' : text;
  };

  const scanLine = (line: Line, builder: RangeSetBuilder<Decoration>) => {
    const text = line.text;

    let m;
    while ((m = defaultTextRegex.exec(text))) {
      if (!m[0]) continue;

      const raw = m[0];
      if (raw.length > options.maxLength) {
        const short = shortenText(raw);
        builder.add(
          line.from + m.index,
          line.from + m.index + raw.length,
          Decoration.replace({ widget: new ShortTextWidget(short) })
        );
      }
    }
  };

  const shorten = (state: EditorState) => {
    const builder = new RangeSetBuilder<Decoration>();
    for (let i = 1; i <= state.doc.lines; i++) {
      const line = state.doc.line(i);
      scanLine(line, builder);
    }
    return builder.finish();
  };

  class ShortTextWidget extends WidgetType {
    constructor(readonly short: string) {
      super();
    }
    toDOM(): HTMLElement {
      const span = document.createElement('span');
      span.textContent = this.short;
      span.className = 'cm-short-text';
      span.style.display = 'inline';
      span.style.textDecoration = 'underline';
      return span;
    }
    eq(other: ShortTextWidget) {
      return this.short === other.short;
    }
  }

  return StateField.define<DecorationSet>({
    create(state) {
      return shorten(state);
    },

    update(deco, tr) {
      return tr.docChanged ? shorten(tr.state) : deco;
    },

    provide: (f) => EditorView.decorations.from(f)
  });
};
