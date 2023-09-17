import { ref, onMounted, inject, ComputedRef, watch, shallowRef } from 'vue';
import { EditorView, minimalSetup } from 'codemirror';
import { keymap } from '@codemirror/view';
import { languages } from '@codemirror/language-data';
import { markdown } from '@codemirror/lang-markdown';
import { Compartment } from '@codemirror/state';
import { indentWithTab, undo, redo } from '@codemirror/commands';
import { directive2flag, ToolDirective } from '~/utils/content-help';
import { Themes } from '~/type';
import { configOption } from '~/config';
import bus from '~/utils/event-bus';

import { ContentProps } from '../props';
import { oneDark } from '../codemirror/themeOneDark';
import { oneLight } from '../codemirror/themeLight';
import createAutocompletion from '../codemirror/autocompletion';
import CodeMirrorUt from '../codemirror';
import usePasteUpload from './usePasteUpload';
import useAttach from './useAttach';
import createCommands from '../codemirror/commands';
import { CTRL_SHIFT_Z, CTRL_Z, ERROR_CATCHER, REPLACE } from '~/static/event-name';

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

  const languageComp = new Compartment(),
    themeComp = new Compartment(),
    autocompletionComp = new Compartment();

  const mdEditorCommands = createCommands(editorId, props);

  // 粘贴上传
  const pasteHandler = usePasteUpload(props);

  const defaultExtensions = [
    keymap.of([...mdEditorCommands, indentWithTab]),
    minimalSetup,
    languageComp.of(markdown({ codeLanguages: languages })),
    // 横向换行
    EditorView.lineWrapping,
    EditorView.updateListener.of((update) => {
      update.docChanged && props.onChange(update.state.doc.toString());
    }),
    EditorView.domEventHandlers({
      paste: pasteHandler,
      blur: props.onBlur,
      focus: props.onFocus,
      drop: props.onDrop,
      input: (e) => {
        props.onInput && props.onInput(e);

        const { data } = e as any;
        if (props.maxlength && props.modelValue.length + data.length > props.maxlength) {
          bus.emit(editorId, ERROR_CATCHER, {
            name: 'overlength',
            message: 'The input text is too long',
            data: data
          });
        }
      }
    })
  ];

  const getExtensions = () => {
    const extensions = [
      ...defaultExtensions,
      themeComp.of(theme.value === 'light' ? oneLight : oneDark),
      autocompletionComp.of(createAutocompletion(props.completions))
    ];

    return configOption.codeMirrorExtensions!(theme.value, extensions, [
      ...mdEditorCommands
    ]);
  };

  onMounted(() => {
    const view = new EditorView({
      doc: props.modelValue,
      parent: inputWrapperRef.value,
      extensions: [getExtensions()]
    });

    const nc = new CodeMirrorUt(view);
    codeMirrorUt.value = nc;

    setTimeout(() => {
      nc.setTabSize(tabWidth);
      nc.setDisabled(props.disabled!);
      nc.setReadOnly(props.readonly!);
      props.placeholder && nc.setPlaceholder(props.placeholder);
      typeof props.maxlength === 'number' && nc.setMaxLength(props.maxlength);
      props.autofocus && view.focus();
    }, 0);

    bus.on(editorId, {
      name: CTRL_Z,
      callback() {
        undo(view);
      }
    });

    bus.on(editorId, {
      name: CTRL_SHIFT_Z,
      callback() {
        redo(view);
      }
    });

    // 注册指令替换内容事件
    bus.on(editorId, {
      name: REPLACE,
      callback(direct: ToolDirective, params = {}) {
        const { text, options } = directive2flag(direct, codeMirrorUt.value!, params);
        codeMirrorUt.value?.replaceSelectedText(text, options, editorId);
      }
    });
  });

  watch(
    theme,
    () => {
      codeMirrorUt.value?.view.dispatch({
        effects: themeComp.reconfigure(theme.value === 'light' ? oneLight : oneDark)
      });
    },
    {
      deep: true
    }
  );

  watch(
    () => props.completions,
    () => {
      codeMirrorUt.value?.view.dispatch({
        effects: autocompletionComp.reconfigure(createAutocompletion(props.completions))
      });
    },
    {
      deep: true
    }
  );

  watch(
    () => props.modelValue,
    () => {
      // 只有不是输入的时候才手动设置编辑区的内容
      if (codeMirrorUt.value?.getValue() !== props.modelValue) {
        codeMirrorUt.value?.setValue(props.modelValue);
      }
    }
  );

  watch(
    () => props.placeholder,
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
