import {
  defineComponent,
  PropType,
  reactive,
  onMounted,
  Teleport,
  watch,
  onBeforeUnmount,
  CSSProperties,
  computed
} from 'vue';

import {
  prefix,
  allToolbar,
  highlightUrl,
  iconfontUrl,
  prettierUrl,
  cropperUrl,
  screenfullUrl,
  mermaidUrl,
  katexJsUrl,
  katexCssUrl
} from './config';
import { useKeyBoard, useProvide } from './capi';
import ToolBar from './layouts/Toolbar';
import Content from './layouts/Content';
import Catalog from './layouts/Catalog';
import bus from './utils/event-bus';

import {
  StaticTextDefaultKey,
  StaticTextDefaultValue,
  ToolbarNames,
  HeadList,
  PreviewThemes,
  MarkedHeading,
  MarkedHeadingId,
  SettingType
} from './type';

import './styles/index.less';
import '@vavt/markdown-theme/css/all.css';
import { getSlot } from './utils/vue-tsx';

export const markedHeadingId: MarkedHeadingId = (text) => text;

const props = {
  modelValue: {
    type: String as PropType<string>,
    default: ''
  },
  // 主题，支持light和dark
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light'
  },
  // 外层扩展类名
  editorClass: {
    type: String,
    default: ''
  },
  // 如果项目中有使用highlight.js或者没有外网访问权限，可以直接传递实例hljs并且手动导入css
  hljs: {
    type: Object,
    default: null
  },
  // 可以手动提供highlight.js的cdn链接
  highlightJs: {
    type: String as PropType<string>,
    default: highlightUrl.js
  },
  highlightCss: {
    type: String as PropType<string>,
    default: ''
  },
  historyLength: {
    type: Number as PropType<number>,
    default: 10
  },
  onChange: {
    type: Function as PropType<(v: string) => void>
  },
  onSave: {
    type: Function as PropType<(v: string) => void>
  },
  onUploadImg: {
    type: Function as PropType<
      (files: FileList, callBack: (urls: string[]) => void) => void
    >
  },
  pageFullScreen: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  preview: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  htmlPreview: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  previewOnly: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  language: {
    type: String as PropType<StaticTextDefaultKey | string>,
    default: 'zh-CN'
  },
  // 语言扩展，以标准的形式定义内容，设置language为key值即可替换
  languageUserDefined: {
    type: Object as PropType<{ [key: string]: StaticTextDefaultValue }>,
    default: () => ({})
  },
  // 工具栏选择显示
  toolbars: {
    type: Array as PropType<Array<ToolbarNames>>,
    default: allToolbar
  },
  // 工具栏选择不显示
  toolbarsExclude: {
    type: Array as PropType<Array<ToolbarNames>>,
    default: []
  },
  prettier: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  prettierCDN: {
    type: String as PropType<string>,
    default: prettierUrl.main
  },
  prettierMDCDN: {
    type: String as PropType<string>,
    default: prettierUrl.markdown
  },
  // html变化事件
  onHtmlChanged: {
    type: Function as PropType<(h: string) => void>
  },
  // 图片裁剪对象
  Cropper: {
    type: Function,
    default: null
  },
  cropperCss: {
    type: String as PropType<string>,
    default: cropperUrl.css
  },
  cropperJs: {
    type: String as PropType<string>,
    default: cropperUrl.js
  },
  iconfontJs: {
    type: String as PropType<string>,
    default: iconfontUrl
  },
  onGetCatalog: {
    type: Function as PropType<(list: HeadList[]) => void>
  },
  editorId: {
    type: String as PropType<string>,
    default: 'md-editor-v3'
  },
  tabWidth: {
    type: Number as PropType<number>,
    default: 2
  },
  // 预览中代码是否显示行号
  showCodeRowNumber: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  screenfull: {
    type: Object,
    default: null
  },
  screenfullJs: {
    type: String as PropType<string>,
    default: screenfullUrl
  },
  // 预览内容样式
  previewTheme: {
    type: String as PropType<PreviewThemes>,
    default: 'default'
  },
  markedHeading: {
    type: Function as PropType<MarkedHeading>,
    default: (text: string, level: number, raw: string) => {
      // 我们默认同一级别的标题，你不会定义两个相同的
      const id = markedHeadingId(raw, level);

      // 如果标题有markdown语法内容，会按照该语法添加标题，而不再自定义，但是仍然支持目录定位
      if (text !== raw) {
        return `<h${level} id="${id}">${text}</h${level}>`;
      } else {
        return `<h${level} id="${id}"><a href="#${id}">${raw}</a></h${level}>`;
      }
    }
  },
  style: {
    type: Object as PropType<CSSProperties | string>,
    default: () => ({})
  },
  markedHeadingId: {
    type: Function as PropType<MarkedHeadingId>,
    default: markedHeadingId
  },
  // 表格预设格子数
  tableShape: {
    type: Array as PropType<Array<number>>,
    default: () => [6, 4]
  },
  // mermaid实例
  mermaid: {
    type: Object
  },
  // mermaid script链接
  mermaidJs: {
    type: String as PropType<string>,
    default: mermaidUrl
  },
  // 不使用该功能
  noMermaid: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 不能保证文本正确的情况，在marked编译md文本后通过该方法处理
  // 推荐DOMPurify、sanitize-html
  sanitize: {
    type: Function as PropType<(html: string) => string>,
    default: (html: string) => html
  },
  placeholder: {
    type: String as PropType<string>,
    default: ''
  },
  katex: {
    type: Object
  },
  // katex script链接
  katexJs: {
    type: String as PropType<string>,
    default: katexJsUrl
  },
  // katex css链接
  katexCss: {
    type: String as PropType<string>,
    default: katexCssUrl
  },
  // 不使用该函数功能
  noKatex: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  defToolbars: {
    type: [String, Object] as PropType<string | JSX.Element>
  },
  // 自定义marked扩展，只支持预设
  extensions: {
    type: Array as PropType<Array<any>>
  }
};

export default defineComponent({
  name: 'MdEditorV3',
  props,
  setup(props, context) {
    // 下面的内容不使用响应式（解构会失去响应式能力）
    // eslint-disable-next-line vue/no-setup-props-destructure
    const {
      hljs,
      previewOnly,
      iconfontJs,
      prettier,
      prettierCDN,
      prettierMDCDN,
      Cropper,
      cropperCss,
      cropperJs,
      editorId,
      screenfull,
      screenfullJs
    } = props;

    // 快捷键监听
    useKeyBoard(props, context);

    // ~~
    useProvide(props);

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
          callback(files: FileList, cb: () => void) {
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
    // ----end----

    // 卸载组件前清空全部事件监听
    onBeforeUnmount(() => {
      bus.clear(editorId);
    });

    const catalogShow = computed(() => {
      return (
        !props.toolbarsExclude.includes('catalog') && props.toolbars.includes('catalog')
      );
    });

    return () => {
      const defToolbars = getSlot({ props, ctx: context }, 'defToolbars');

      return (
        <div
          id={editorId}
          class={[
            prefix,
            props.editorClass,
            props.theme === 'dark' && `${prefix}-dark`,
            setting.fullscreen || setting.pageFullScreen ? `${prefix}-fullscreen` : '',
            previewOnly && `${prefix}-previewOnly`
          ]}
          style={props.style}
        >
          {!previewOnly && (
            <ToolBar
              prettier={prettier}
              screenfull={screenfull}
              screenfullJs={screenfullJs}
              toolbars={props.toolbars}
              toolbarsExclude={props.toolbarsExclude}
              setting={setting}
              updateSetting={updateSetting}
              tableShape={props.tableShape}
              defToolbars={defToolbars}
            />
          )}
          <Content
            hljs={hljs}
            value={props.modelValue}
            onChange={(value: string) => {
              if (props.onChange) {
                props.onChange(value);
              } else {
                context.emit('update:modelValue', value);
              }
            }}
            setting={setting}
            onHtmlChanged={(html: string) => {
              if (props.onHtmlChanged) {
                props.onHtmlChanged(html);
              } else {
                context.emit('onHtmlChanged', html);
              }
            }}
            onGetCatalog={(list: HeadList[]) => {
              if (props.onGetCatalog) {
                props.onGetCatalog(list);
              } else {
                context.emit('onGetCatalog', list);
              }
            }}
            markedHeading={props.markedHeading}
            mermaid={props.mermaid}
            mermaidJs={props.mermaidJs}
            noMermaid={props.noMermaid}
            sanitize={props.sanitize}
            placeholder={props.placeholder}
            katex={props.katex}
            katexJs={props.katexJs}
            katexCss={props.katexCss}
            noKatex={props.noKatex}
            extensions={props.extensions}
          />
          {catalogShow.value && <Catalog markedHeadingId={props.markedHeadingId} />}
          {!previewOnly && (
            <Teleport to="head">
              <script src={iconfontJs} />
            </Teleport>
          )}
          {prettier && !previewOnly && (
            <Teleport to="head">
              <script src={prettierCDN} />
              <script src={prettierMDCDN} />
            </Teleport>
          )}
          {!previewOnly && Cropper === null && (
            <Teleport to="head">
              <link href={cropperCss} rel="stylesheet" />
              <script src={cropperJs}></script>
            </Teleport>
          )}
        </div>
      );
    };
  }
});
