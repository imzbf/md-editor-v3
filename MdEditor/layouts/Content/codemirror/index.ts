import {
  EditorState,
  Extension,
  Compartment,
  StateEffect,
  EditorSelection
} from '@codemirror/state';
import { EditorView, placeholder } from '@codemirror/view';
import { indentUnit } from '@codemirror/language';

const toggleWith = (view: EditorView) => {
  const mc = new Compartment();

  const toggle = (extension: Extension) => {
    mc.get(view.state)
      ? view.dispatch({ effects: mc.reconfigure(extension) })
      : view.dispatch({
          effects: StateEffect.appendConfig.of(mc.of(extension))
        });
    return true;
  };

  return toggle;
};

export default class CodeMirrorUt {
  view: EditorView;

  // 切换tabSize的执行方法。切换时，Compartment实例需要相同
  private toggleTabSize: (extension: Extension) => boolean;
  private togglePlaceholder: (extension: Extension) => boolean;

  /**
   * 设置全部的扩展
   */
  setExtensions: (extensions: Extension[]) => void;

  toggleDisabled: (extensions: Extension[]) => void;

  toggleReadOnly: (extensions: Extension[]) => void;

  toggleMaxlength: (extensions: Extension[]) => void;

  getValue() {
    return this.view.state.doc.toString();
  }

  /**
   * 设置内容
   *
   * @param insert 待插入内容
   * @param from 插入开始位置
   * @param to 插入结束位置
   */
  setValue(insert: string, from = 0, to = this.view.state.doc.length) {
    this.view.dispatch({
      changes: {
        from,
        to,
        insert
      }
    });
  }

  /**
   * 获取选中的文本
   */
  getSelectedText() {
    const { from, to } = this.view.state.selection.main;
    return this.view.state.sliceDoc(from, to);
  }

  /**
   * 使用新的内容替换选中的内容
   *
   * @param text 待替换内容
   * @param options 替换后是否选中
   */
  replaceSelectedText(
    text: string,
    options = {
      // 是否选中
      select: true,
      // 选中时，开始位置的偏移量
      deviationStart: 0,
      // 结束的偏移量
      deviationEnd: 0,
      // 直接替换所有文本
      replaceAll: false
    }
  ) {
    if (options.replaceAll) {
      this.setValue(text);
      return;
    }

    const { from } = this.view.state.selection.main;

    this.view.dispatch(this.view.state.replaceSelection(text));

    if (options.select) {
      const to = from + text.length + options.deviationEnd;
      this.view.dispatch({
        selection: EditorSelection.create(
          [
            EditorSelection.range(from + options.deviationStart, to),
            EditorSelection.cursor(to)
          ],
          1
        )
      });

      this.view.focus();
    }
  }

  constructor(view: EditorView) {
    this.view = view;

    this.toggleTabSize = toggleWith(this.view);
    this.togglePlaceholder = toggleWith(this.view);
    this.setExtensions = toggleWith(this.view);
    this.toggleDisabled = toggleWith(this.view);
    this.toggleReadOnly = toggleWith(this.view);
    this.toggleMaxlength = toggleWith(this.view);
  }

  /**
   * 设置tabSize
   *
   * @param tabSize 需要切换的大小
   */
  setTabSize(tabSize: number) {
    this.toggleTabSize([
      EditorState.tabSize.of(tabSize),
      indentUnit.of(' '.repeat(tabSize))
    ]);
  }

  /**
   * 设置placeholder
   *
   * @param t 目标内容
   */
  setPlaceholder(t: string) {
    this.togglePlaceholder(placeholder(t));
  }

  focus() {
    this.view.focus();
  }

  setDisabled(d: boolean) {
    this.toggleDisabled([EditorView.editable.of(!d)]);
  }

  setReadOnly(r: boolean) {
    this.toggleReadOnly([EditorState.readOnly.of(r)]);
  }

  setMaxLength(ml: number) {
    this.toggleMaxlength([
      EditorState.changeFilter.of((tr) => {
        return tr.newDoc.length <= ml;
      })
    ]);
  }
}
