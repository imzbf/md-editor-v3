import { reactive, watch, computed, onMounted, provide, ref, Ref } from 'vue';
import {
  InnerError,
  SettingType,
  ExposeParam,
  UpdateSetting,
  ExposeEvent,
  MdPreviewProps,
  FocusOption,
  UploadImgCallBack,
  StaticTextDefaultValue,
  EditorProps,
  EditorContext,
  Themes
} from '~/type';
import { appendHandler } from '~/utils/dom';
import { prefix, staticTextDefault, codeCss, configOption } from '~/config';
import {
  CHANGE_CATALOG_VISIBLE,
  CHANGE_FULL_SCREEN,
  ON_SAVE,
  PAGE_FULL_SCREEN_CHANGED,
  FULL_SCREEN_CHANGED,
  PREVIEW_CHANGED,
  HTML_PREVIEW_CHANGED,
  CATALOG_VISIBLE_CHANGED,
  BUILD_FINISHED,
  ERROR_CATCHER,
  UPLOAD_IMAGE,
  REPLACE,
  RERENDER,
  EVENT_LISTENER,
  PREVIEW_ONLY_CHANGED
} from '~/static/event-name';
import bus from '~/utils/event-bus';
import { ContentExposeParam } from './layouts/Content/type';
import { deepClone, deepMerge } from '@vavt/util';

/**
 * 处理保存逻辑，主要是需要异步返回编译后的html
 *
 * @param props
 * @param context
 */
export const useOnSave = (props: EditorProps, context: EditorContext) => {
  const { editorId } = props;

  const state = reactive({
    // 是否已编译成html
    buildFinished: false,
    // 存储当前最新的html
    html: ''
  });

  // 编辑后添加未编译完成标识
  watch(
    () => props.modelValue,
    () => {
      state.buildFinished = false;
    }
  );

  onMounted(() => {
    bus.on(editorId, {
      name: BUILD_FINISHED,
      callback(html: string) {
        state.buildFinished = true;
        state.html = html;
      }
    });

    // 注册保存事件
    bus.on(editorId, {
      name: ON_SAVE,
      callback() {
        const htmlPromise = new Promise<string>((rev) => {
          if (state.buildFinished) {
            rev(state.html);
          } else {
            // 构建完成出发方法
            const buildFinishedCallback = (html: string) => {
              rev(html);

              bus.remove(editorId, BUILD_FINISHED, buildFinishedCallback);
            };

            bus.on(editorId, {
              name: BUILD_FINISHED,
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
  });
};

/**
 * 抽离预览组件需要提供的组件全局属性
 *
 * @param props 预览组件的props
 */
export const useProvidePreview = (
  props: MdPreviewProps,
  rootRef: Ref<HTMLDivElement | undefined>
) => {
  const { editorId } = props;
  const hljsUrls = configOption.editorExtensions.highlight;
  const hljsAttrs = configOption.editorExtensionsAttrs.highlight;

  provide('editorId', editorId);

  // 提供一个顶层元素的引用
  provide('rootRef', rootRef);

  provide(
    'theme',
    computed(() => props.theme)
  );

  provide(
    'language',
    computed(() => props.language)
  );

  // 注入高亮src
  provide(
    'highlight',
    computed(() => {
      // 链接
      const { js: jsUrl } = hljsUrls!;
      const cssList = {
        ...codeCss,
        ...hljsUrls!.css
      };

      // 属性
      const { js: jsAttrs, css: cssAttrs = {} } = hljsAttrs || {};

      const _theme =
        props.codeStyleReverse && props.codeStyleReverseList.includes(props.previewTheme)
          ? 'dark'
          : (props.theme as Themes);

      // 找到对应代码主题的链接和属性
      const codeCssHref = cssList[props.codeTheme]
        ? cssList[props.codeTheme][_theme]
        : codeCss.atom[_theme];
      const codeCssAttrs =
        cssList[props.codeTheme] && cssAttrs[props.codeTheme]
          ? cssAttrs[props.codeTheme][_theme]
          : cssAttrs['atom']
            ? cssAttrs['atom'][_theme]
            : {};

      return {
        js: {
          src: jsUrl,
          ...jsAttrs
        },
        css: {
          href: codeCssHref,
          ...codeCssAttrs
        }
      };
    })
  );

  // 注入代码行号控制
  provide('showCodeRowNumber', props.showCodeRowNumber);

  // 注入语言设置
  const usedLanguageText = computed((): StaticTextDefaultValue => {
    const allText: { [key: string]: StaticTextDefaultValue } = {
      ...staticTextDefault,
      ...configOption.editorConfig.languageUserDefined
    };

    return deepMerge(
      deepClone(staticTextDefault['en-US']),
      allText[props.language] || ({} as StaticTextDefaultValue)
    );
  });

  provide('usedLanguageText', usedLanguageText);

  // 提供预览主题
  provide(
    'previewTheme',
    computed(() => props.previewTheme)
  );

  // 自定义的图标和默认的结合
  provide(
    'customIcon',
    computed(() => props.customIcon)
  );
};
/**
 * 向下提供部分公共参数
 *
 * @param props
 */
export const useProvide = (
  props: EditorProps,
  rootRef: Ref<HTMLDivElement | undefined>
) => {
  useProvidePreview(props, rootRef);
  // tab=2space
  provide('tabWidth', props.tabWidth);
};

/**
 * 抽离预览组件需要嵌入的脚本
 *
 * @param props 预览组件的props
 */
export const useExpansionPreview = (props: MdPreviewProps) => {};

/**
 * 插入编辑器支持的扩展外链
 *
 * @param props
 */
export const useExpansion = (props: EditorProps) => {
  // 这部分内容只配置，不需要响应式更新
  const { noPrettier, noUploadImg } = props;

  const { editorExtensions, editorExtensionsAttrs } = configOption;

  // 判断是否需要插入prettier标签
  const noPrettierScript = noPrettier || editorExtensions.prettier!.prettierInstance;

  // 判断是否需要插入prettier markdown扩展标签
  const noParserMarkdownScript =
    noPrettier || editorExtensions.prettier!.parserMarkdownInstance;

  // 判断是否需要插入裁剪图片标签
  const noCropperScript = noUploadImg || editorExtensions.cropper!.instance;

  onMounted(() => {
    // 非仅预览模式才添加扩展
    if (!noCropperScript) {
      // 裁剪图片
      const { js = {}, css = {} } = editorExtensionsAttrs.cropper || {};

      appendHandler('link', {
        ...css,
        rel: 'stylesheet',
        href: editorExtensions.cropper!.css,
        id: `${prefix}-cropperCss`
      });
      appendHandler('script', {
        ...js,
        src: editorExtensions.cropper!.js,
        id: `${prefix}-cropper`
      });
    }

    if (!noPrettierScript) {
      const { standaloneJs = {} } = editorExtensionsAttrs.prettier || {};

      appendHandler('script', {
        ...standaloneJs,
        src: editorExtensions.prettier!.standaloneJs,
        id: `${prefix}-prettier`
      });
    }

    if (!noParserMarkdownScript) {
      const { parserMarkdownJs = {} } = editorExtensionsAttrs.prettier || {};

      appendHandler('script', {
        ...parserMarkdownJs,
        src: editorExtensions.prettier!.parserMarkdownJs,
        id: `${prefix}-prettierMD`
      });
    }
  });

  useExpansionPreview(props);
};

/**
 * 错误收集
 *
 * @param props
 * @param context
 */
export const useErrorCatcher = (props: EditorProps, context: EditorContext) => {
  const { editorId } = props;

  onMounted(() => {
    bus.on(editorId, {
      name: ERROR_CATCHER,
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

/**
 * 收集整理公共配置
 *
 * @param props
 * @param context
 * @returns
 */
export const useConfig = (
  props: EditorProps,
  context: EditorContext
): [setting: SettingType, updateSetting: UpdateSetting] => {
  const { editorId } = props;

  // ----编辑器设置----
  const setting = reactive<SettingType>({
    pageFullscreen: props.pageFullscreen,
    fullscreen: false,
    preview: props.preview,
    htmlPreview: props.preview ? false : props.htmlPreview,
    previewOnly: false
  });

  const cacheSetting = reactive({ ...setting });

  const updateSetting: UpdateSetting = (k, v) => {
    const realValue = v === undefined ? !setting[k] : v;

    switch (k) {
      case 'preview': {
        setting.htmlPreview = false;
        setting.previewOnly = false;

        break;
      }

      case 'htmlPreview': {
        setting.preview = false;
        setting.previewOnly = false;

        break;
      }

      case 'previewOnly': {
        if (realValue) {
          if (!setting.preview && !setting.htmlPreview) {
            // 如果没有显示预览模块，则需要手动展示
            setting.preview = true;
          }
        } else {
          if (!cacheSetting.preview) {
            setting.preview = false;
          }

          if (!cacheSetting.htmlPreview) {
            setting.htmlPreview = false;
          }
        }

        break;
      }
    }

    cacheSetting[k] = realValue;
    setting[k] = realValue;
  };

  // 将在客户端挂载时获取该样式
  let bodyOverflowHistory = '';

  const adjustBody = () => {
    if (setting.pageFullscreen || setting.fullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = bodyOverflowHistory;
    }
  };

  // 变化是调整一次
  watch(() => [setting.pageFullscreen, setting.fullscreen], adjustBody);
  // 进入时若默认全屏，调整一次
  onMounted(() => {
    bus.on(editorId, {
      name: UPLOAD_IMAGE,
      callback(files: Array<File>, cb: () => void) {
        const insertHanlder: UploadImgCallBack = (urls) => {
          bus.emit(editorId, REPLACE, 'image', {
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

    bodyOverflowHistory = document.body.style.overflow;
    adjustBody();
  });

  return [setting, updateSetting];
};

/**
 * 目录状态整理
 *
 * @param props
 * @returns
 */
export const useCatalog = (props: EditorProps) => {
  const { editorId } = props;
  const catalogShow = ref(false);

  onMounted(() => {
    bus.on(editorId, {
      name: CHANGE_CATALOG_VISIBLE,
      callback: (v: boolean | undefined) => {
        if (v === undefined) {
          catalogShow.value = !catalogShow.value;
        } else {
          catalogShow.value = v;
        }
      }
    });
  });

  const catalogVisible = computed(() => {
    return (
      !props.toolbarsExclude.includes('catalog') &&
      props.toolbars.includes('catalog') &&
      catalogShow.value
    );
  });

  return catalogVisible;
};

/**
 * 向外暴露属性
 *
 * @param props 组件属性
 * @param ctx vue conext
 * @param catalogVisible 目录显示状态
 * @param setting 内部状态集合
 * @param updateSetting 更新内部集合
 */
export const useExpose = (
  props: EditorProps,
  ctx: EditorContext,
  catalogVisible: Ref<boolean>,
  setting: SettingType,
  updateSetting: UpdateSetting,
  codeRef: Ref<ContentExposeParam | undefined>
) => {
  const { editorId } = props;

  watch(
    () => setting.pageFullscreen,
    (newVal) => {
      bus.emit(editorId, PAGE_FULL_SCREEN_CHANGED, newVal);
    }
  );

  watch(
    () => setting.fullscreen,
    (newVal) => {
      bus.emit(editorId, FULL_SCREEN_CHANGED, newVal);
    }
  );

  watch(
    () => setting.preview,
    (newVal) => {
      bus.emit(editorId, PREVIEW_CHANGED, newVal);
    }
  );

  watch(
    () => setting.previewOnly,
    (newVal) => {
      bus.emit(editorId, PREVIEW_ONLY_CHANGED, newVal);
    }
  );

  watch(
    () => setting.htmlPreview,
    (newVal) => {
      bus.emit(editorId, HTML_PREVIEW_CHANGED, newVal);
    }
  );

  watch(catalogVisible, (newVal) => {
    bus.emit(editorId, CATALOG_VISIBLE_CHANGED, newVal);
  });

  const exposeParam: ExposeParam = {
    on(eventName, callBack) {
      switch (eventName) {
        case 'pageFullscreen': {
          bus.on(editorId, {
            name: PAGE_FULL_SCREEN_CHANGED,
            callback(status: boolean) {
              (callBack as ExposeEvent['pageFullscreen'])(status);
            }
          });

          break;
        }
        case 'fullscreen': {
          bus.on(editorId, {
            name: FULL_SCREEN_CHANGED,
            callback(status: boolean) {
              (callBack as ExposeEvent['fullscreen'])(status);
            }
          });

          break;
        }

        case 'preview': {
          bus.on(editorId, {
            name: PREVIEW_CHANGED,
            callback(status: boolean) {
              (callBack as ExposeEvent['preview'])(status);
            }
          });

          break;
        }

        case 'previewOnly': {
          bus.on(editorId, {
            name: PREVIEW_ONLY_CHANGED,
            callback(status: boolean) {
              (callBack as ExposeEvent['previewOnly'])(status);
            }
          });

          break;
        }

        case 'htmlPreview': {
          bus.on(editorId, {
            name: HTML_PREVIEW_CHANGED,
            callback(status: boolean) {
              (callBack as ExposeEvent['htmlPreview'])(status);
            }
          });

          break;
        }

        case 'catalog': {
          bus.on(editorId, {
            name: CATALOG_VISIBLE_CHANGED,
            callback(status: boolean) {
              (callBack as ExposeEvent['catalog'])(status);
            }
          });

          break;
        }

        default: {
          //
        }
      }
    },
    togglePageFullscreen(status) {
      updateSetting('pageFullscreen', status);
    },
    toggleFullscreen(status) {
      bus.emit(editorId, CHANGE_FULL_SCREEN, status);
    },
    togglePreview(status) {
      updateSetting('preview', status);
    },
    togglePreviewOnly(status) {
      updateSetting('previewOnly', status);
    },
    toggleHtmlPreview(status) {
      updateSetting('htmlPreview', status);
    },
    toggleCatalog(status) {
      bus.emit(editorId, CHANGE_CATALOG_VISIBLE, status);
    },
    triggerSave() {
      bus.emit(editorId, ON_SAVE);
    },
    insert(generate) {
      bus.emit(editorId, REPLACE, 'universal', { generate });
    },
    focus(options: FocusOption) {
      codeRef.value?.focus(options);
    },
    rerender() {
      bus.emit(editorId, RERENDER);
    },
    getSelectedText() {
      return codeRef.value?.getSelectedText();
    },
    resetHistory() {
      codeRef.value?.resetHistory();
    },
    domEventHandlers(handlers) {
      bus.emit(editorId, EVENT_LISTENER, handlers);
    },
    execCommand(direct) {
      bus.emit(editorId, REPLACE, direct);
    },
    getEditorView() {
      return codeRef.value?.getEditorView();
    }
  };

  ctx.expose(exposeParam);
};
