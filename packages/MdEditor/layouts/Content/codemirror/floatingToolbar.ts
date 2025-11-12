import { StateEffect, StateField } from '@codemirror/state';
import { EditorView, showTooltip, Tooltip } from '@codemirror/view';
import { App, createApp } from 'vue';
import { prefix } from '~/config';
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

export const createFloatingToolbar = (options: { privide: (app: App) => void }) => {
  type TooltipState = { kind: 'selection' | 'emptyLine'; pos: number };

  let lastTooltip: TooltipState | null = null;

  const showTooltip = (view: EditorView, nextState: TooltipState) => {
    if (
      lastTooltip &&
      lastTooltip.kind === nextState.kind &&
      lastTooltip.pos === nextState.pos
    ) {
      return;
    }

    lastTooltip = nextState;
    view.dispatch({
      effects: tooltipEffect.of({
        pos: nextState.pos,
        above: true,
        arrow: true,
        create: () => {
          const dom = document.createElement('div');

          const tooltipClass = `${prefix}-floating-toolbar-container`;

          dom.classList.add(tooltipClass);
          dom.dataset.state = 'hidden';

          requestAnimationFrame(() => {
            dom.dataset.state = 'visible';
          });

          // 保持与react版本一直，虽然vue不存在该问题
          // 这里需要创建一个 react 根节点
          // 如果直接使用dom，每次react更新都会重置dom中codemirror添加的节点，比如箭头
          const appNode = document.createElement('div');
          dom.appendChild(appNode);

          const app = createApp(Toolbar);
          options.privide(app);

          app.mount(dom);
          return { dom, destroy: () => app.unmount() };
        }
      })
    });
  };

  const hideTooltip = (view: EditorView) => {
    if (!lastTooltip) return;

    lastTooltip = null;
    view.dispatch({ effects: tooltipEffect.of(null) });
  };

  const selectionAndEmptyLineTooltip = EditorView.updateListener.of((update) => {
    if (update.selectionSet || update.docChanged) {
      const state = update.state;
      const sel = state.selection.main;

      if (!sel.empty) {
        // 选中文字 → 显示
        showTooltip(update.view, { kind: 'selection', pos: sel.anchor });
      } else {
        // 光标位置 → 判断是不是空白行
        const pos = sel.head;
        const line = state.doc.lineAt(pos);
        if (/^\s*$/.test(line.text)) {
          showTooltip(update.view, { kind: 'emptyLine', pos });
        } else {
          hideTooltip(update.view);
        }
      }
    }
  });

  return [tooltipField, selectionAndEmptyLineTooltip];
};
