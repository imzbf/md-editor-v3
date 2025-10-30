/**
 * https://discuss.codemirror.net/t/i-created-an-extension-to-collapse-and-display-long-text-but-im-encountering-issues-when-pasting-long-text-in-places-where-there-are-characters-before-or-after-it/9400
 *
 * 在 codemirror 作者帮助下优化了该插件。
 */

import {
  EditorSelection,
  EditorState,
  Extension,
  RangeSetBuilder,
  StateEffect,
  StateField
} from '@codemirror/state';
import { Decoration, DecorationSet, EditorView, WidgetType } from '@codemirror/view';

export interface TextShortenerOptions {
  maxLength: number;
  shortenText?: (text: string) => string;
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

type ShortenedRange = { from: number; to: number };

interface ShortenerState {
  deco: DecorationSet;
  expanded: ShortenedRange[];
}

const isExpandedRange = (ranges: ShortenedRange[], from: number, to: number) => {
  return ranges.some((range) => range.from === from && range.to === to);
};

export const createTextShortener = (options: TextShortenerOptions): Extension => {
  const shortenText = options.shortenText || (() => '...');

  const toggleShortTextEffect = StateEffect.define<
    ShortenedRange & { expand: boolean }
  >();
  const collapseShortTextEffect = StateEffect.define<void>();

  const shorten = (state: EditorState, expanded: ShortenedRange[]) => {
    const builder = new RangeSetBuilder<Decoration>();
    const nextExpanded: ShortenedRange[] = [];

    for (let i = 1; i <= state.doc.lines; i++) {
      const line = state.doc.line(i);
      const text = line.text;

      defaultTextRegex.lastIndex = 0;

      let m: RegExpExecArray | null;
      while ((m = defaultTextRegex.exec(text))) {
        if (!m[0]) continue;

        const raw = m[0];
        if (raw.length <= options.maxLength) continue;

        const from = line.from + m.index;
        const to = from + raw.length;

        if (isExpandedRange(expanded, from, to)) {
          nextExpanded.push({ from, to });
          continue;
        }

        const short = shortenText(raw);
        builder.add(
          from,
          to,
          Decoration.replace({ widget: new ShortTextWidget(short, raw, from, to) })
        );
      }
    }

    return { deco: builder.finish(), expanded: nextExpanded };
  };

  class ShortTextWidget extends WidgetType {
    constructor(
      readonly short: string,
      private readonly raw: string,
      private readonly from: number,
      private readonly to: number
    ) {
      super();
    }

    toDOM(view: EditorView): HTMLElement {
      const span = document.createElement('span');
      span.textContent = this.short;
      span.className = 'cm-short-text';
      span.title = this.raw;
      span.style.display = 'inline';
      span.style.textDecoration = 'underline';
      span.addEventListener('mousedown', (event) => {
        event.preventDefault();
        event.stopPropagation();
        view.dispatch({
          selection: EditorSelection.cursor(this.from),
          effects: toggleShortTextEffect.of({
            from: this.from,
            to: this.to,
            expand: true
          })
        });
        view.focus();
      });
      span.addEventListener('click', (event) => {
        event.preventDefault();
      });
      return span;
    }

    ignoreEvent() {
      return false;
    }

    eq(other: ShortTextWidget) {
      return (
        this.short === other.short &&
        this.raw === other.raw &&
        this.from === other.from &&
        this.to === other.to
      );
    }
  }

  const shortenerField = StateField.define<ShortenerState>({
    create(state) {
      return shorten(state, []);
    },

    update(value, tr) {
      let expanded = value.expanded;

      if (tr.docChanged && expanded.length) {
        expanded = expanded
          .map(({ from, to }) => ({
            from: tr.changes.mapPos(from, 1),
            to: tr.changes.mapPos(to, -1)
          }))
          .filter(({ from, to }) => from < to);
      }

      let expandedChanged = expanded !== value.expanded;

      for (const effect of tr.effects) {
        if (effect.is(toggleShortTextEffect)) {
          if (effect.value.expand) {
            expanded = [{ from: effect.value.from, to: effect.value.to }];
          } else {
            expanded = expanded.filter(
              ({ from, to }) => from !== effect.value.from || to !== effect.value.to
            );
          }
        } else if (effect.is(collapseShortTextEffect)) {
          if (expanded.length > 0) {
            expanded = [];
          }
        }
      }

      if (!expandedChanged && expanded !== value.expanded) {
        expandedChanged = true;
      }

      if (tr.docChanged || expandedChanged) {
        const result = shorten(tr.state, expanded);
        return result;
      }

      return value;
    },

    provide: (field) =>
      EditorView.decorations.compute([field], (state) => state.field(field).deco)
  });

  const collapse = EditorView.domEventHandlers({
    mousedown(event, view) {
      const state = view.state.field(shortenerField, false);

      if (!state || state.expanded.length === 0) {
        return false;
      }

      const target = event.target as Node | null;

      if (target && view.dom.contains(target)) {
        const pos = view.posAtDOM(target, 0);
        if (pos != null && pos !== -1) {
          const isInsideExpanded = state.expanded.some(
            ({ from, to }) => pos >= from && pos <= to
          );
          if (isInsideExpanded) {
            return false;
          }
        }
      }

      view.dispatch({ effects: collapseShortTextEffect.of(undefined) });
      return false;
    }
  });

  return [shortenerField, collapse];
};
