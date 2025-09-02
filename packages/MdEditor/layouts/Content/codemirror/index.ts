import { indentUnit } from '@codemirror/language';
import {
  EditorState,
  Extension,
  Compartment,
  StateEffect,
  EditorSelection
} from '@codemirror/state';
import { EditorView, placeholder } from '@codemirror/view';
import { ERROR_CATCHER } from '~/static/event-name';
import { FocusOption } from '~/type';
import bus from '~/utils/event-bus';

const toggleWith = (view: EditorView) => {
  const mc = new Compartment();

  const toggle = (extension: Extension) => {
    if (mc.get(view.state)) {
      view.dispatch({ effects: mc.reconfigure(extension) });
    } else {
      view.dispatch({
        effects: StateEffect.appendConfig.of(mc.of(extension))
      });
    }
    return true;
  };

  return toggle;
};

export default class CodeMirrorUt {
  view: EditorView;

  maxLength = Number.MAX_SAFE_INTEGER;

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
  replaceSelectedText(text: string, _options: any, editorId: string) {
    const options = {
      // 是否选中
      select: true,
      // 选中时，开始位置的偏移量
      deviationStart: 0,
      // 结束的偏移量
      deviationEnd: 0,
      // 直接替换所有文本
      replaceAll: false,
      // 替换旧文本的开始位置
      replaceStart: -1,
      // 替换旧文本的结束位置
      replaceEnd: -1,
      ..._options
    };

    try {
      if (options.replaceAll) {
        this.setValue(text);

        // 全部替换直接对比文本大小
        if (text.length > this.maxLength) {
          throw new Error('The input text is too long');
        }

        return;
      }

      // 局部替换时，模拟替换后对比大小
      if (
        this.view.state.doc.length - this.getSelectedText().length + text.length >
        this.maxLength
      ) {
        throw new Error('The input text is too long');
      }

      const { from } = this.view.state.selection.main;

      // 未选中时替换整行
      if (options.replaceStart !== -1) {
        this.view.dispatch({
          changes: {
            from: options.replaceStart,
            to: options.replaceEnd,
            insert: text
          }
        });
      } else {
        this.view.dispatch(this.view.state.replaceSelection(text));
      }

      if (options.select) {
        this.view.dispatch({
          selection: {
            anchor:
              options.replaceStart === -1
                ? from + options.deviationStart
                : options.replaceStart + options.deviationStart,
            head:
              options.replaceStart === -1
                ? from + text.length + options.deviationEnd
                : options.replaceStart + text.length + options.deviationEnd
          }
        });
      }

      this.view.focus();
    } catch (e: any) {
      if (e.message === 'The input text is too long') {
        bus.emit(editorId, ERROR_CATCHER, {
          name: 'overlength',
          message: e.message,
          data: text
        });
      } else {
        throw e;
      }
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

  focus(options: FocusOption) {
    this.view.focus();

    if (!options) {
      return;
    }

    let anchor = 0;
    let head = 0;
    let pos = 0;

    switch (options) {
      case 'start': {
        break;
      }
      case 'end': {
        const length = this.getValue().length;
        anchor = head = pos = length;
        break;
      }
      default: {
        anchor = options.rangeAnchor || options.cursorPos;
        head = options.rangeHead || options.cursorPos;
        pos = options.cursorPos;
      }
    }

    this.view.dispatch({
      scrollIntoView: true,
      selection: EditorSelection.create(
        [EditorSelection.range(anchor, head), EditorSelection.cursor(pos)],
        1
      )
    });
  }

  setDisabled(d: boolean) {
    this.toggleDisabled([EditorView.editable.of(!d)]);
  }

  setReadOnly(r: boolean) {
    this.toggleReadOnly([EditorState.readOnly.of(r)]);
  }

  setMaxLength(ml: number) {
    this.maxLength = ml;
    this.toggleMaxlength([
      EditorState.changeFilter.of((tr) => {
        return tr.newDoc.length <= ml;
      })
    ]);
  }
}
