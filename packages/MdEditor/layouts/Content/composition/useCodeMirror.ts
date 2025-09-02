import {
  indentWithTab,
  defaultKeymap,
  history,
  historyKeymap,
  undo,
  redo
} from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { Compartment } from '@codemirror/state';
import { keymap, drawSelection } from '@codemirror/view';
import { throttle } from '@vavt/util';
import { EditorView } from 'codemirror';
import { ref, onMounted, inject, ComputedRef, watch, shallowRef, VNode } from 'vue';
import { globalConfig } from '~/config';
import {
  CTRL_SHIFT_Z,
  CTRL_Z,
  ERROR_CATCHER,
  EVENT_LISTENER,
  GET_EDITOR_VIEW,
  REPLACE,
  SEND_EDITOR_VIEW,
  TASK_STATE_CHANGED
} from '~/static/event-name';
import {
  Themes,
  DOMEventHandlers,
  CodeMirrorExtension,
  StaticTextDefaultValue,
  CustomIcon,
  PreviewThemes,
  SettingType,
  ToolbarNames
} from '~/type';
import { directive2flag, ToolDirective } from '~/utils/content-help';
import bus from '~/utils/event-bus';

import CodeMirrorUt from '../codemirror';
import { createAutocompletion } from '../codemirror/autocompletion';
import { createFloatingToolbarPlugin } from '../codemirror/floatingToolbar';
import { oneLight } from '../codemirror/themeLight';
import { oneDark } from '../codemirror/themeOneDark';
import { ContentProps } from '../props';
import usePasteUpload from './usePasteUpload';
// import useAttach from './useAttach';
import { createCommands } from '../codemirror/commands';
import { textShortenerPlugin } from '../codemirror/textShortener';

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
  const previewTheme = inject('previewTheme') as ComputedRef<PreviewThemes>;
  const language = inject('language') as ComputedRef<string>;
  const usedLanguageText = inject(
    'usedLanguageText'
  ) as ComputedRef<StaticTextDefaultValue>;
  const disabled = inject('disabled') as ComputedRef<boolean>;
  const showToolbarName = inject('showToolbarName') as ComputedRef<boolean>;
  const customIcon = inject('customIcon') as ComputedRef<CustomIcon>;
  const noUploadImg = inject('noUploadImg') as ComputedRef<boolean>;
  const tableShape = inject('tableShape') as ComputedRef<Array<number>>;
  const noPrettier = inject('noPrettier') as boolean;
  const codeTheme = inject('codeTheme') as ComputedRef<string>;
  const setting = inject('setting') as ComputedRef<SettingType>;
  const updateSetting = inject('updateSetting') as (key: string, value?: any) => void;
  const catalogVisible = inject('catalogVisible') as ComputedRef<boolean>;
  const defToolbars = inject('defToolbars') as ComputedRef<VNode | VNode[]>;
  const floatingToolbars = inject('floatingToolbars') as ComputedRef<Array<ToolbarNames>>;

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

  const mdEditorCommands = createCommands(editorId, {
    noPrettier
  });

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
          data
        });
      }
    }
  };

  const defaultExtensions: Array<CodeMirrorExtension> = [
    {
      type: 'keymap',
      extension: keymap.of(getDefaultKeymaps())
    },
    {
      type: 'history',
      extension: history(),
      compartment: historyComp
    },
    {
      type: 'markdown',
      extension: markdown({ codeLanguages: languages }),
      compartment: languageComp
    },
    // 横向换行
    {
      type: 'lineWrapping',
      extension: EditorView.lineWrapping
    },
    {
      type: 'updateListener',
      extension: EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          props.onChange(update.state.doc.toString());

          if (!spelling.value) {
            props.updateModelValue(update.state.doc.toString());
          }
        }
      })
    },
    {
      type: 'domEventHandlers',
      extension: EditorView.domEventHandlers(domEventHandlers),
      compartment: eventComp
    },
    // 解决多行placeholder时，光标异常的情况
    {
      type: 'drawSelection',
      extension: drawSelection()
    },
    {
      type: 'linkShortener',
      extension: textShortenerPlugin({
        maxLength: 30
      })
    },
    {
      type: 'floatingToolbar',
      extension: createFloatingToolbarPlugin({
        privide(app) {
          app.provide('editorId', editorId);
          app.provide('theme', theme);
          app.provide('previewTheme', previewTheme);
          app.provide('language', language);
          app.provide('disabled', disabled);
          app.provide('noUploadImg', noUploadImg);
          app.provide('tableShape', tableShape);
          app.provide('noPrettier', noPrettier);
          app.provide('codeTheme', codeTheme);
          app.provide('showToolbarName', showToolbarName);
          app.provide('setting', setting);
          app.provide('updateSetting', updateSetting);
          app.provide('usedLanguageText', usedLanguageText);
          app.provide('catalogVisible', catalogVisible);
          app.provide('defToolbars', defToolbars);
          app.provide('tabWidth', tabWidth);
          app.provide('customIcon', customIcon);
          app.provide('floatingToolbars', floatingToolbars);
        }
      })
    }
  ];

  const getExtensions = () => {
    const extensions: Array<CodeMirrorExtension> = [
      ...defaultExtensions,
      {
        type: 'theme',
        extension: theme.value === 'light' ? oneLight : oneDark,
        compartment: themeComp
      },
      {
        type: 'completions',
        extension: createAutocompletion(props.completions),
        compartment: autocompletionComp
      }
    ];

    return globalConfig
      .codeMirrorExtensions(extensions, {
        editorId,
        theme: theme.value,
        keyBindings: getDefaultKeymaps()
      })
      .map((item) =>
        item.compartment ? item.compartment.of(item.extension) : item.extension
      );
  };

  onMounted(() => {
    const view = new EditorView({
      doc: props.modelValue,
      parent: inputWrapperRef.value,
      extensions: getExtensions()
    });

    const nc = new CodeMirrorUt(view);
    codeMirrorUt.value = nc;

    setTimeout(() => {
      nc.setTabSize(tabWidth);
      nc.setDisabled(disabled.value);
      nc.setReadOnly(props.readonly!);

      if (props.placeholder) nc.setPlaceholder(props.placeholder);
      if (typeof props.maxlength === 'number') nc.setMaxLength(props.maxlength);
      if (props.autofocus) view.focus();
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
          const tv = props.transformImgUrl(params.url as string);

          if (tv instanceof Promise) {
            tv.then(async (url) => {
              const { text, options } = await directive2flag(
                direct,
                codeMirrorUt.value!,
                { ...params, url }
              );
              codeMirrorUt.value?.replaceSelectedText(text as string, options, editorId);
            }).catch((err) => {
              console.error(err);
            });
          } else {
            const { text, options } = await directive2flag(direct, codeMirrorUt.value!, {
              ...params,
              url: tv
            });
            codeMirrorUt.value?.replaceSelectedText(text as string, options, editorId);
          }
        } else {
          const { text, options } = await directive2flag(
            direct,
            codeMirrorUt.value!,
            params
          );
          codeMirrorUt.value?.replaceSelectedText(text as string, options, editorId);
        }
      }
    });

    // 原始事件
    bus.on(editorId, {
      name: EVENT_LISTENER,
      callback: throttle((handlers: DOMEventHandlers) => {
        const nextDomEventHandlers: DOMEventHandlers = { ...domEventHandlers };

        const defaultEventNames = Object.keys(domEventHandlers);

        for (const eventName in handlers) {
          const en = eventName as keyof HTMLElementEventMap;

          if (defaultEventNames.includes(en)) {
            nextDomEventHandlers[en] = (e, v) => {
              (handlers[en] as (event: Event, view: EditorView) => void)(e, v);

              // 如果用户自行监听的事件调用了preventDefault，则不再执行内部的方法
              if (!e.defaultPrevented) {
                (domEventHandlers[en] as (event: Event, view: EditorView) => void)(e, v);
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
          view.state.update({ changes: { from: line.from, to: line.to, insert: value } })
        );
      }
    });

    bus.on(editorId, {
      name: SEND_EDITOR_VIEW,
      callback() {
        bus.emit(editorId, GET_EDITOR_VIEW, view);
      }
    });

    // 主动触发一次获取编辑器视图
    bus.emit(editorId, GET_EDITOR_VIEW, view);
  });

  watch(
    theme,
    () => {
      codeMirrorUt.value?.view.dispatch({
        effects: themeComp.reconfigure(theme.value === 'light' ? oneLight : oneDark)
      });
    },
    { deep: true }
  );

  watch(
    () => props.completions,
    () => {
      codeMirrorUt.value?.view.dispatch({
        effects: autocompletionComp.reconfigure(createAutocompletion(props.completions))
      });
    },
    { deep: true }
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

  watch([disabled], () => {
    codeMirrorUt.value?.setDisabled(disabled.value);
  });

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
      codeMirrorUt.value?.view.dispatch({ effects: historyComp.reconfigure([]) });

      codeMirrorUt.value?.view.dispatch({ effects: historyComp.reconfigure(history()) });
    }
  };
};

export default useCodeMirror;
