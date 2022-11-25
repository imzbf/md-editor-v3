import {
  reactive,
  watch,
  computed,
  onMounted,
  onBeforeUnmount,
  provide,
  SetupContext,
  ref
} from 'vue';
import bus from './utils/event-bus';
import { ToolDirective } from './utils/content-help';
import { ToolbarNames, InnerError, SettingType } from './type';
import { appendHandler } from './utils/dom';
import {
  prefix,
  staticTextDefault,
  iconfontUrl,
  prettierUrl,
  cropperUrl,
  highlightUrl,
  codeCss,
  configOption
} from './config';

import { EditorProps } from './props';

export const useKeyBoard = (props: EditorProps, context: SetupContext) => {
  const { editorId, noPrettier, previewOnly } = props;

  const state = reactive({
    // 是否已编译成html
    buildFinished: false,
    // 存储当前最新的html
    html: ''
  });

  const initFunc = (name: ToolbarNames) =>
    props.toolbars?.includes(name) &&
    !props.toolbarsExclude?.includes(name) &&
    !noPrettier;

  const keyDownHandler = (event: KeyboardEvent) => {
    // 只处理是编辑框内的内容
    if (event.target !== document.querySelector(`#${props.editorId}-textarea`)) {
      return;
    }

    // 使用快捷键时，保存选中文本
    bus.emit(editorId, 'selectTextChange');

    // 按键操作是否会替换内容
    // let toReplaceValue = false;
    // macos中以meta键位配s键位为保存，windows中如此会被系统默认的事件替代
    if (event.ctrlKey || event.metaKey) {
      switch (event.code) {
        case 'KeyS': {
          if (event.shiftKey) {
            // 删除线
            if (initFunc('strikeThrough')) {
              bus.emit(editorId, 'replace', 'strikeThrough' as ToolDirective);
            }
          } else {
            // 触发保存事件
            if (initFunc('save')) {
              bus.emit(editorId, 'onSave', props.modelValue);
              event.preventDefault();
            }
          }
          break;
        }
        case 'KeyB': {
          if (initFunc('bold')) {
            bus.emit(editorId, 'replace', 'bold' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'KeyU': {
          if (event.shiftKey) {
            // ctrl+shift+u触发无需列表
            if (initFunc('unorderedList')) {
              bus.emit(editorId, 'replace', 'unorderedList' as ToolDirective);
              event.preventDefault();
            }
          } else {
            // ctrl+u触发下划线
            if (initFunc('underline')) {
              bus.emit(editorId, 'replace', 'underline' as ToolDirective);
              event.preventDefault();
            }
          }

          break;
        }
        case 'KeyI': {
          if (event.shiftKey) {
            // ctrl+shift+l触发图片链接
            if (initFunc('image')) {
              bus.emit(editorId, 'openModals', 'image');
              event.preventDefault();
            }
          } else {
            if (initFunc('italic')) {
              bus.emit(editorId, 'replace', 'italic' as ToolDirective);
              event.preventDefault();
            }
          }

          break;
        }
        case 'Digit1': {
          if (initFunc('title')) {
            bus.emit(editorId, 'replace', 'h1' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit2': {
          if (initFunc('title')) {
            bus.emit(editorId, 'replace', 'h2' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit3': {
          if (initFunc('title')) {
            bus.emit(editorId, 'replace', 'h3' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit4': {
          if (initFunc('title')) {
            bus.emit(editorId, 'replace', 'h4' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit5': {
          if (initFunc('title')) {
            bus.emit(editorId, 'replace', 'h5' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit6': {
          if (initFunc('title')) {
            bus.emit(editorId, 'replace', 'h6' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'ArrowUp': {
          if (initFunc('sup')) {
            bus.emit(editorId, 'replace', 'sup' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'ArrowDown': {
          if (initFunc('sub')) {
            bus.emit(editorId, 'replace', 'sub' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'KeyQ': {
          if (event.key === 'a') {
            (event.target as HTMLTextAreaElement).select();
            return;
          }

          bus.emit(editorId, 'replace', 'quote' as ToolDirective);
          event.preventDefault();
          break;
        }
        case 'KeyA': {
          if (event.key === 'q') {
            bus.emit(editorId, 'replace', 'quote' as ToolDirective);
            event.preventDefault();
            break;
          } else {
            return;
          }
        }
        case 'KeyO': {
          if (initFunc('orderedList')) {
            bus.emit(editorId, 'replace', 'orderedList' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'KeyC': {
          if (event.shiftKey) {
            // ctrl+shift+c触发块级代码
            if (initFunc('code')) {
              bus.emit(editorId, 'replace', 'code' as ToolDirective);
              event.preventDefault();
            }
          } else if (event.altKey) {
            // ctrl+alt+c触发行内代码
            if (initFunc('codeRow')) {
              bus.emit(editorId, 'replace', 'codeRow' as ToolDirective);
              event.preventDefault();
            }
          } else {
            // 接管复制快捷键
            event.preventDefault();
            bus.emit(editorId, 'replace', 'ctrlC');
            break;
          }
          break;
        }
        case 'KeyL': {
          // ctrl+l触发普通链接
          if (initFunc('link')) {
            bus.emit(editorId, 'openModals', 'link');
            event.preventDefault();
          }
          break;
        }
        case 'KeyZ': {
          if (event.key === 'w') {
            return;
          }

          if (event.shiftKey) {
            // ctrl+shift+z 前进一步
            if (initFunc('next')) {
              bus.emit(editorId, 'ctrlShiftZ');
              event.preventDefault();
            }
          } else {
            // ctrl+z 后退一步
            if (initFunc('revoke')) {
              bus.emit(editorId, 'ctrlZ');
              event.preventDefault();
            }
          }

          break;
        }
        case 'KeyW': {
          if (event.key === 'z') {
            if (event.shiftKey) {
              // ctrl+shift+z 前进一步
              if (initFunc('next')) {
                bus.emit(editorId, 'ctrlShiftZ');
                event.preventDefault();
              }
            } else {
              // ctrl+z 后退一步
              if (initFunc('revoke')) {
                bus.emit(editorId, 'ctrlZ');
                event.preventDefault();
              }
            }

            break;
          } else {
            return;
          }
        }
        case 'KeyF': {
          // ctrl+shift+f 美化内容
          if (event.shiftKey) {
            if (initFunc('prettier')) {
              bus.emit(editorId, 'replace', 'prettier');
              event.preventDefault();
            }
          }
          break;
        }
        case 'KeyT': {
          // ctrl+shift+alt+t 新增表格
          if (event.altKey && event.shiftKey) {
            if (initFunc('table')) {
              bus.emit(editorId, 'replace', 'table');
              event.preventDefault();
            }
          }
          break;
        }
        case 'KeyX': {
          bus.emit(editorId, 'replace', 'ctrlX');
          event.preventDefault();
          break;
        }
        case 'KeyD': {
          event.preventDefault();
          bus.emit(editorId, 'replace', 'ctrlD');
          break;
        }
      }
    } else if (event.code === 'Tab') {
      event.preventDefault();
      // 缩进
      if (event.shiftKey) {
        bus.emit(editorId, 'replace', 'shiftTab');
      } else {
        bus.emit(editorId, 'replace', 'tab');
      }
    }
  };

  // 编辑后添加未编译完成标识
  watch(
    () => props.modelValue,
    () => {
      state.buildFinished = false;
    }
  );

  onMounted(() => {
    if (!previewOnly) {
      window.addEventListener('keydown', keyDownHandler);

      bus.on(editorId, {
        name: 'buildFinished',
        callback(html: string) {
          state.buildFinished = true;
          state.html = html;
        }
      });

      // 注册保存事件
      bus.on(editorId, {
        name: 'onSave',
        callback() {
          const htmlPromise = new Promise<string>((rev) => {
            if (state.buildFinished) {
              rev(state.html);
            } else {
              // 构建完成出发方法
              const buildFinishedCallback = (html: string) => {
                rev(html);

                bus.remove(editorId, 'buildFinished', buildFinishedCallback);
              };

              bus.on(editorId, {
                name: 'buildFinished',
                callback: buildFinishedCallback
              });
            }
          });

          if (props.onSave) {
            props.onSave(props.modelValue, htmlPromise);
          } else {
            context.emit('onSave', props.modelValue, htmlPromise);
          }
        }
      });
    }
  });

  // 编辑器卸载时移除相应的监听事件
  onBeforeUnmount(() => {
    if (!previewOnly) {
      window.removeEventListener('keydown', keyDownHandler);
    }
  });
};

export const useProvide = (props: EditorProps) => {
  const { editorId, previewOnly } = props;
  const highlightConfig = configOption?.editorExtensions?.highlight;

  provide('editorId', editorId);

  // tab=2space
  provide('tabWidth', props.tabWidth);

  provide(
    'theme',
    computed(() => props.theme)
  );

  // 注入高亮src
  provide(
    'highlight',
    computed(() => {
      // 备选列表
      const cssList = {
        ...codeCss,
        ...highlightConfig?.css
      };

      const theme =
        props.codeStyleReverse && props.codeStyleReverseList.includes(props.previewTheme)
          ? 'dark'
          : props.theme;

      return {
        js: highlightConfig?.js || highlightUrl,
        css: cssList[props.codeTheme]
          ? cssList[props.codeTheme][theme]
          : codeCss.atom[theme]
      };
    })
  );

  // 注入历史设置
  provide('historyLength', props.historyLength);

  // 注入是否仅预览
  provide('previewOnly', previewOnly);

  // 注入代码行号控制
  provide('showCodeRowNumber', props.showCodeRowNumber);

  // 注入语言设置
  const usedLanguageText = computed(() => {
    const allText: any = {
      ...staticTextDefault,
      ...configOption?.editorConfig?.languageUserDefined
    };

    if (allText[props.language]) {
      return allText[props.language];
    } else {
      return staticTextDefault['zh-CN'];
    }
  });

  provide('usedLanguageText', usedLanguageText);

  // 提供预览主题
  provide(
    'previewTheme',
    computed(() => props.previewTheme)
  );
};

export const useExpansion = (props: EditorProps) => {
  // 这部分内容只配置，不需要响应式更新
  const { noPrettier, previewOnly, noIconfont } = props;

  const { editorExtensions } = configOption;

  // 判断是否需要插入prettier标签
  const noPrettierScript =
    noPrettier || !!configOption.editorExtensions?.prettier?.prettierInstance;

  // 判断是否需要插入prettier markdown扩展标签
  const noParserMarkdownScript =
    noPrettier || !!configOption.editorExtensions?.prettier?.parserMarkdownInstance;

  // 判断是否需要插入裁剪图片标签
  const noCropperScript = !!configOption.editorExtensions?.cropper?.instance;

  onMounted(() => {
    // 图标
    const iconfontScript = document.createElement('script');
    iconfontScript.src = editorExtensions?.iconfont || iconfontUrl;
    iconfontScript.id = `${prefix}-icon`;

    // prettier
    const prettierScript = document.createElement('script');
    const prettierMDScript = document.createElement('script');

    prettierScript.src = editorExtensions?.prettier?.standaloneJs || prettierUrl.main;
    prettierScript.id = `${prefix}-prettier`;

    prettierMDScript.src =
      editorExtensions?.prettier?.parserMarkdownJs || prettierUrl.markdown;
    prettierMDScript.id = `${prefix}-prettierMD`;

    // 裁剪图片
    const cropperLink = document.createElement('link');
    cropperLink.rel = 'stylesheet';
    cropperLink.href = editorExtensions?.cropper?.css || cropperUrl.css;
    cropperLink.id = `${prefix}-cropperCss`;

    const cropperScript = document.createElement('script');
    cropperScript.src = editorExtensions?.cropper?.js || cropperUrl.js;
    cropperScript.id = `${prefix}-cropper`;

    // 非仅预览模式才添加扩展
    if (!previewOnly) {
      if (!noIconfont) {
        appendHandler(iconfontScript);
      }

      if (!noCropperScript) {
        appendHandler(cropperLink);
        appendHandler(cropperScript);
      }

      if (!noPrettierScript) {
        appendHandler(prettierScript);
      }

      if (!noParserMarkdownScript) {
        appendHandler(prettierMDScript);
      }
    }
  });
};

export const useErrorCatcher = (props: EditorProps, context: SetupContext) => {
  const { editorId } = props;

  onMounted(() => {
    bus.on(editorId, {
      name: 'errorCatcher',
      callback: (err: InnerError) => {
        if (props.onError instanceof Function) {
          props.onError(err);
        } else {
          context.emit('onError', err);
        }
      }
    });
  });
};

export const useConfig = (
  props: EditorProps,
  context: SetupContext
): [setting: SettingType, updateSetting: (v: any, k: keyof typeof setting) => void] => {
  const { editorId, previewOnly } = props;

  // ----编辑器设置----
  const setting = reactive<SettingType>({
    pageFullScreen: props.pageFullScreen,
    fullscreen: false,
    preview: props.preview,
    htmlPreview: props.preview ? false : props.htmlPreview
  });

  const updateSetting = (v: any, k: keyof typeof setting) => {
    setting[k] = v;
    if (k === 'preview' && setting.preview) {
      setting.htmlPreview = false;
    } else if (k === 'htmlPreview' && setting.htmlPreview) {
      setting.preview = false;
    }
  };

  // 将在客户端挂载时获取该样式
  let bodyOverflowHistory = '';

  const adjustBody = () => {
    if (setting.pageFullScreen || setting.fullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = bodyOverflowHistory;
    }
  };

  // 变化是调整一次
  watch(() => [setting.pageFullScreen, setting.fullscreen], adjustBody);
  // 进入时若默认全屏，调整一次
  onMounted(() => {
    // 监听上传图片
    if (!previewOnly) {
      bus.on(editorId, {
        name: 'uploadImage',
        callback(files: Array<File>, cb: () => void) {
          const insertHanlder = (urls: Array<string>) => {
            bus.emit(editorId, 'replace', 'image', {
              desc: '',
              urls
            });

            cb && cb();
          };

          if (props.onUploadImg) {
            props.onUploadImg(files, insertHanlder);
          } else {
            context.emit('onUploadImg', files, insertHanlder);
          }
        }
      });
    }

    bodyOverflowHistory = document.body.style.overflow;
    adjustBody();
  });

  return [setting, updateSetting];
};

export const useCatalog = (props: EditorProps) => {
  const { editorId } = props;
  const catalogVisible = ref(false);

  onMounted(() => {
    bus.on(editorId, {
      name: 'catalogShow',
      callback: () => {
        catalogVisible.value = !catalogVisible.value;
      }
    });
  });

  const catalogShow = computed(() => {
    return (
      !props.toolbarsExclude.includes('catalog') && props.toolbars.includes('catalog')
    );
  });

  return [catalogVisible, catalogShow];
};
