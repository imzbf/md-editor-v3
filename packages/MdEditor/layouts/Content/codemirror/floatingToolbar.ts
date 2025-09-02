import { StateEffect, StateField } from '@codemirror/state';
import { EditorView, showTooltip, Tooltip } from '@codemirror/view';
import { App, createApp } from 'vue';
import Toolbar from '~/layouts/FloatingToolbar';

const tooltipEffect = StateEffect.define<Tooltip | null>();

const tooltipField = StateField.define<Tooltip | null>({
  create() {
    return null;
  },
  update(value, tr) {
    for (const e of tr.effects) if (e.is(tooltipEffect)) value = e.value;
    return value;
  },
  provide: (f) => showTooltip.from(f)
});

export const createFloatingToolbarPlugin = (options: { privide: (app: App) => void }) => {
  const showVueTooltip = (view: EditorView, pos: number) => {
    view.dispatch({
      effects: tooltipEffect.of({
        pos,
        above: true,
        arrow: true,
        create: () => {
          const dom = document.createElement('div');
          const app = createApp(Toolbar);
          options.privide(app);

          app.mount(dom);
          return { dom, destroy: () => app.unmount() };
        }
      })
    });
  };

  const selectionAndEmptyLineTooltip = EditorView.updateListener.of((update) => {
    if (update.selectionSet || update.docChanged) {
      const state = update.state;
      const sel = state.selection.main;

      if (!sel.empty) {
        // 选中文字 → 显示
        showVueTooltip(update.view, sel.from);
      } else {
        // 光标位置 → 判断是不是空白行
        const pos = sel.head;
        const line = state.doc.lineAt(pos);
        if (/^\s*$/.test(line.text)) {
          showVueTooltip(update.view, pos);
        } else {
          update.view.dispatch({ effects: tooltipEffect.of(null) });
        }
      }
    }
  });

  return [tooltipField, selectionAndEmptyLineTooltip];
};
