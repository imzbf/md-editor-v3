import { ref, onMounted, inject, ComputedRef, watch, shallowRef } from 'vue';
import { EditorView, minimalSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { languages } from '@codemirror/language-data';
import { markdown } from '@codemirror/lang-markdown';
import { indentWithTab, undo, redo } from '@codemirror/commands';
import { directive2flag, ToolDirective } from '~/utils/content-help';
import { Themes } from '~/type';
import { configOption } from '~/config';
import bus from '~/utils/event-bus';

import { ContentProps } from '../props';
import { oneDark } from '../codemirror/themeOneDark';
import { oneLight } from '../codemirror/themeLight';
import CodeMirrorUt from '../codemirror';
import usePasteUpload from './usePasteUpload';
import useAttach from './useAttach';
import createCommands from '../codemirror/commands';

/**
 * 文本编辑区组件
 *
 * @param props
 * @returns
 */
const useCodeMirror = (props: ContentProps) => {
  const tabWidth = inject('tabWidth') as number;
  const editorId = inject('editorId') as string;
  const theme = inject('theme') as ComputedRef<Themes>;
  const inputWrapperRef = ref<HTMLDivElement>();

  // 编辑器的实例不能用ref包裹，vue会处理内部属性
  // https://discuss.codemirror.net/t/invalid-child-in-posbefore-codemirror6/3371/5
  const codeMirrorUt = shallowRef<CodeMirrorUt>();

  const mdEditorCommands = createCommands(editorId, props);

  // 粘贴上传
  const pasteHandler = usePasteUpload(props);

  const defaultExtensions = [
    keymap.of([...mdEditorCommands, indentWithTab]),
    minimalSetup,
    markdown({ codeLanguages: languages }),
    // 横向换行
    EditorView.lineWrapping,
    EditorView.updateListener.of((update) => {
      update.docChanged && props.onChange(update.state.doc.toString());
    }),
    EditorView.domEventHandlers({
      paste: pasteHandler,
      blur: props.onBlur,
      focus: props.onFocus
    })
  ];

  const getExtensions = () => {
    if (theme.value === 'light') {
      return configOption.codeMirrorExtensions!(
        theme.value,
        [...defaultExtensions, oneLight],
        [...mdEditorCommands]
      );
    }

    return configOption.codeMirrorExtensions!(
      theme.value,
      [...defaultExtensions, oneDark],
      [...mdEditorCommands]
    );
  };

  onMounted(() => {
    const startState = EditorState.create({
      doc: props.value
    });

    const view = new EditorView({
      state: startState,
      parent: inputWrapperRef.value
    });

    // window.view = view;
    // window.ddd = EditorView;

    codeMirrorUt.value = new CodeMirrorUt(view);

    codeMirrorUt.value.setTabSize(tabWidth);
    codeMirrorUt.value.setExtensions(getExtensions());
    codeMirrorUt.value.setPlaceholder(props.placeholder);
    codeMirrorUt.value.setDisabled(props.disabled!);
    codeMirrorUt.value.setReadOnly(props.readonly!);

    // view.dispatch({
    //   changes: { from: 10, insert: '*' },
    //   selection: { anchor: 11 }
    // });

    // view.dispatch({
    //   selection: EditorSelection.create(
    //     [
    //       EditorSelection.range(20, 32),
    //       // EditorSelection.range(6, 7),
    //       EditorSelection.cursor(32)
    //     ],
    //     1
    //   )
    // });

    // console.log(view.state.selection.main);
    // console.log(view.state.sliceDoc());

    if (props.autofocus) {
      view.focus();
    }

    if (props.maxlength) {
      codeMirrorUt.value.setMaxLength(props.maxlength);
    }
    // console.log()
    // view.dispatch(view.state.replaceSelection('`vscode`'));

    bus.on(editorId, {
      name: 'ctrlZ',
      callback() {
        undo(view);
      }
    });

    bus.on(editorId, {
      name: 'ctrlShiftZ',
      callback() {
        redo(view);
      }
    });

    // 注册指令替换内容事件
    bus.on(editorId, {
      name: 'replace',
      callback(direct: ToolDirective, params = {}) {
        const { text, options } = directive2flag(direct, codeMirrorUt.value!, params);
        codeMirrorUt.value?.replaceSelectedText(text, options);
      }
    });
  });

  watch(
    () => theme.value,
    () => {
      if (theme.value === 'dark') {
        codeMirrorUt.value?.setExtensions(getExtensions());
      } else {
        codeMirrorUt.value?.setExtensions(getExtensions());
      }
    }
  );

  watch(
    () => props.value,
    () => {
      // 可控组件，只有不是输入的时候才手动设置编辑区的内容
      if (codeMirrorUt.value?.getValue() !== props.value) {
        codeMirrorUt.value?.setValue(props.value);
      }
    }
  );

  watch(
    () => props.value,
    () => {
      codeMirrorUt.value?.setPlaceholder(props.placeholder);
    }
  );

  watch(
    () => props.disabled,
    () => {
      codeMirrorUt.value?.setDisabled(props.disabled!);
    }
  );

  watch(
    () => props.readonly,
    () => {
      codeMirrorUt.value?.setDisabled(props.readonly!);
    }
  );

  watch(
    () => props.maxlength,
    () => {
      if (props.maxlength) {
        codeMirrorUt.value?.setMaxLength(props.maxlength);
      }
    }
  );

  // 附带的设置
  useAttach(codeMirrorUt);

  return {
    inputWrapperRef,
    codeMirrorUt
  };
};

export default useCodeMirror;
