import { ref, onMounted, inject, ComputedRef, watch, shallowRef } from 'vue';
import { EditorView } from 'codemirror';
import { keymap, drawSelection } from '@codemirror/view';
import { languages } from '@codemirror/language-data';
import { markdown } from '@codemirror/lang-markdown';
import { Compartment } from '@codemirror/state';
import {
  indentWithTab,
  defaultKeymap,
  history,
  historyKeymap,
  undo,
  redo
} from '@codemirror/commands';
import { directive2flag, ToolDirective } from '~/utils/content-help';
import { Themes, DOMEventHandlers } from '~/type';
import { configOption } from '~/config';
import bus from '~/utils/event-bus';

import { ContentProps } from '../props';
import { oneDark } from '../codemirror/themeOneDark';
import { oneLight } from '../codemirror/themeLight';
import createAutocompletion from '../codemirror/autocompletion';
import CodeMirrorUt from '../codemirror';
import usePasteUpload from './usePasteUpload';
// import useAttach from './useAttach';
import createCommands from '../codemirror/commands';
import {
  CTRL_SHIFT_Z,
  CTRL_Z,
  ERROR_CATCHER,
  EVENT_LISTENER,
  REPLACE,
  TASK_STATE_CHANGED
} from '~/static/event-name';
import { throttle } from '@vavt/util';

// 禁用掉>=6.28.0的实验性功能
(EditorView as any).EDIT_CONTEXT = false;

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
  // 输入状态，取消拼字时的回调
  const spelling = ref(false);

  const languageComp = new Compartment(),
    themeComp = new Compartment(),
    autocompletionComp = new Compartment(),
    historyComp = new Compartment(),
    eventComp = new Compartment();

  const mdEditorCommands = createCommands(editorId, props);

  // 搜集默认快捷键列表，通过方法返回，防止默认列表被篡改
  const getDefaultKeymaps = () => [
    ...mdEditorCommands,
    ...defaultKeymap,
    ...historyKeymap,
    indentWithTab
  ];

  // 粘贴、弹窗添加图片

  // 粘贴上传
  const pasteHandler = usePasteUpload(props, codeMirrorUt);

  const domEventHandlers: DOMEventHandlers = {
    paste: pasteHandler,
    blur: props.onBlur,
    focus: props.onFocus,
    drop: props.onDrop,
    compositionstart: () => {
      spelling.value = true;
    },
    compositionend: (_e, view) => {
      spelling.value = false;
      // spelling状态调整后updateListener不能立刻获取到
      // 所以需要手动触发一次onChange
      props.updateModelValue(view.state.doc.toString());
    },
    input: (e) => {
      if (props.onInput) {
        props.onInput(e);
      }

      const { data } = e as any;
      if (props.maxlength && props.modelValue.length + data.length > props.maxlength) {
        bus.emit(editorId, ERROR_CATCHER, {
          name: 'overlength',
          message: 'The input text is too long',
          data: data
        });
      }
    }
  };

  const defaultExtensions = [
    keymap.of(getDefaultKeymaps()),
    historyComp.of(history()),
    languageComp.of(markdown({ codeLanguages: languages })),
    // 横向换行
    EditorView.lineWrapping,
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        props.onChange(update.state.doc.toString());

        if (!spelling.value) {
          props.updateModelValue(update.state.doc.toString());
        }
      }
    }),
    eventComp.of(EditorView.domEventHandlers(domEventHandlers)),
    // 解决多行placeholder时，光标异常的情况
    drawSelection()
  ];

  const getExtensions = () => {
    const extensions = [
      ...defaultExtensions,
      themeComp.of(theme.value === 'light' ? oneLight : oneDark),
      autocompletionComp.of(createAutocompletion(props.completions))
    ];

    return configOption.codeMirrorExtensions!(
      theme.value,
      extensions,
      getDefaultKeymaps(),
      { editorId }
    );
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
      async callback(direct: ToolDirective, params = {}) {
        // 弹窗插入图片时，将链接使用transformImgUrl转换后再插入
        if (direct === 'image' && params.transform) {
          const tv = props.transformImgUrl(params.url);

          if (tv instanceof Promise) {
            tv.then(async (url) => {
              const { text, options } = await directive2flag(
                direct,
                codeMirrorUt.value!,
                {
                  ...params,
                  url
                }
              );
              codeMirrorUt.value?.replaceSelectedText(text, options, editorId);
            }).catch((err) => {
              console.error(err);
            });
          } else {
            const { text, options } = await directive2flag(direct, codeMirrorUt.value!, {
              ...params,
              url: tv
            });
            codeMirrorUt.value?.replaceSelectedText(text, options, editorId);
          }
        } else {
          const { text, options } = await directive2flag(
            direct,
            codeMirrorUt.value!,
            params
          );
          codeMirrorUt.value?.replaceSelectedText(text, options, editorId);
        }
      }
    });

    // 原始事件
    bus.on(editorId, {
      name: EVENT_LISTENER,
      callback: throttle((handlers: DOMEventHandlers) => {
        const nextDomEventHandlers: DOMEventHandlers = {
          ...domEventHandlers
        };

        const defaultEventNames = Object.keys(domEventHandlers);

        for (const eventName in handlers) {
          const en = eventName as keyof HTMLElementEventMap;

          if (defaultEventNames.includes(en)) {
            nextDomEventHandlers[en] = (e, v) => {
              handlers[en]!(e as any, v);

              // 如果用户自行监听的事件调用了preventDefault，则不再执行内部的方法
              if (!e.defaultPrevented) {
                domEventHandlers[en]!(e as any, v);
              }
            };
          } else {
            nextDomEventHandlers[en] = handlers[en] as any;
          }
        }

        codeMirrorUt.value?.view.dispatch({
          effects: eventComp.reconfigure(
            EditorView.domEventHandlers(nextDomEventHandlers)
          )
        });
      })
    });

    // 点击任务修改事件
    bus.on(editorId, {
      name: TASK_STATE_CHANGED,
      callback: (lineNumber: number, value: string) => {
        const line = view.state.doc.line(lineNumber);
        // 应用交易到编辑器视图
        view.dispatch(
          view.state.update({
            changes: { from: line.from, to: line.to, insert: value }
          })
        );
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
  // useAttach(codeMirrorUt);

  return {
    inputWrapperRef,
    codeMirrorUt,
    resetHistory() {
      codeMirrorUt.value?.view.dispatch({
        effects: historyComp.reconfigure([])
      });

      codeMirrorUt.value?.view.dispatch({
        effects: historyComp.reconfigure(history())
      });
    }
  };
};

export default useCodeMirror;
