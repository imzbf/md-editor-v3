import { RangeSetBuilder } from '@codemirror/state';
import { Decoration, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';

export interface LinkShortenerOptions {
  maxLength: number;
  findLinks?: (text: string, defaultUrlRegex: RegExp) => Array<[number, number]>;
  shorten?: (fullLink: string, maxLength: number) => string;
}

// http:// https:// ftp:// 等
const protoLink = /[a-z][a-z0-9.+-]*:\/\/[^\s<>"'`()]+(?:\([^\s<>"'`]*\)[^\s<>"'`]*)*/i;
// 协议相对链接 //example.com
const protocolRelative = /\/\/[^\s<>"'`()]+/i;
// data:...
const dataUri = /data:[a-z]+\/[a-z0-9.+-]+(?:;base64)?,[a-z0-9+/=%]+/i;
// /path/to/file
const absPath = /\/(?!\/)[^\s<>"'`()]+/i;

const defaultUrlRegex = new RegExp(
  `(?<![a-z0-9.+-])(${protoLink.source}|${protocolRelative.source}|${dataUri.source}|${absPath.source})`,
  'gi'
);

export const linkShortenerPlugin = (options: LinkShortenerOptions) =>
  ViewPlugin.fromClass(
    class {
      decorations;

      constructor(view: EditorView) {
        this.decorations = this.buildDecorations(view);
      }

      update(update: ViewUpdate) {
        if (update.docChanged || update.selectionSet || update.viewportChanged) {
          this.decorations = this.buildDecorations(update.view);
        }
      }

      buildDecorations(view: EditorView) {
        const builder = new RangeSetBuilder<Decoration>();

        const cursorPos = view.state.selection.main.head;

        for (const { from, to } of view.visibleRanges) {
          const text = view.state.doc.sliceString(from, to);

          let links: Array<[number, number]> = [];

          if (options.findLinks) {
            // 用户自定义方式查找链接，返回绝对位置数组
            links = options.findLinks(text, defaultUrlRegex);
          } else {
            // 默认用内置正则匹配，转换成绝对位置区间
            links = [];
            let match;
            while ((match = defaultUrlRegex.exec(text)) !== null) {
              const start = from + match.index;
              const end = start + match[0].length;
              links.push([start, end]);
            }
          }

          for (const [start, end] of links) {
            if (cursorPos >= start && cursorPos <= end) continue;

            const fullLink = view.state.doc.sliceString(start, end);

            if (fullLink.length > options.maxLength) {
              const shortText = options.shorten
                ? options.shorten(fullLink, options.maxLength)
                : '…';

              builder.add(
                start,
                end,
                Decoration.mark({
                  class: 'cm-link-short',
                  attributes: { 'data-short': shortText }
                })
              );
            }
          }
        }
        return builder.finish();
      }
    },
    {
      decorations: (v) => v.decorations
    }
  );
