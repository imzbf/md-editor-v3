import {
  defineComponent,
  PropType,
  onBeforeUnmount,
  CSSProperties,
  SetupContext,
  reactive
} from 'vue';
import { prefix, allToolbar, allFooter } from './config';
import {
  useKeyBoard,
  useProvide,
  useExpansion,
  useConfig,
  useCatalog
} from './composition';
import ToolBar from './layouts/Toolbar';
import Content from './layouts/Content';
import Footer from './layouts/Footer';
import MdCatalog from './extensions/MdCatalog';
import bus from './utils/event-bus';

import {
  StaticTextDefaultKey,
  ToolbarNames,
  HeadList,
  PreviewThemes,
  MarkedHeadingId,
  Themes,
  InnerError,
  Footers
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
    type: String as PropType<Themes>,
    default: 'light'
  },
  // 外层扩展类名
  class: {
    type: String,
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
      (files: Array<File>, callBack: (urls: string[]) => void) => void
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
  noPrettier: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // html变化事件
  onHtmlChanged: {
    type: Function as PropType<(h: string) => void>
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
  // 预览内容样式
  previewTheme: {
    type: String as PropType<PreviewThemes>,
    default: 'default'
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
  // 不使用该函数功能
  noKatex: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  defToolbars: {
    type: [String, Object] as PropType<string | JSX.Element>
  },
  onError: {
    type: Function as PropType<(err: InnerError) => void>
  },
  codeTheme: {
    type: String as PropType<string>,
    default: 'atom'
  },
  footers: {
    type: Array as PropType<Array<Footers>>,
    default: allFooter
  },
  scrollAuto: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  defFooters: {
    type: [String, Object] as PropType<string | JSX.Element>
  },
  noIconfont: {
    type: Boolean as PropType<boolean>
  }
};

const Editor = defineComponent({
  name: 'MdEditorV3',
  props,
  emits: [
    'onChange',
    'onSave',
    'onUploadImg',
    'onHtmlChanged',
    'onGetCatalog',
    'onError',
    'update:modelValue'
  ],
  setup(props, context: SetupContext) {
    // ID不允许响应式（解构会失去响应式能力），这会扰乱eventbus
    const { editorId } = props;

    const state = reactive({
      scrollAuto: props.scrollAuto
    });

    // 快捷键监听
    useKeyBoard(props, context);
    // provide 部分prop
    useProvide(props);
    // 插入扩展的外链
    useExpansion(props);
    // 部分配置重构
    const [setting, updateSetting] = useConfig(props, context);
    // 目录状态
    const [catalogVisible, catalogShow] = useCatalog(props);
    // 卸载组件前清空全部事件监听
    onBeforeUnmount(() => {
      bus.clear(editorId);
    });

    return () => {
      const defToolbars = getSlot({ props, ctx: context }, 'defToolbars');
      const defFooters = getSlot({ props, ctx: context }, 'defFooters');

      return (
        <div
          id={editorId}
          class={[
            prefix,
            props.class,
            props.theme === 'dark' && `${prefix}-dark`,
            setting.fullscreen || setting.pageFullScreen ? `${prefix}-fullscreen` : '',
            props.previewOnly && `${prefix}-previewOnly`
          ]}
          style={props.style}
        >
          {!props.previewOnly && (
            <ToolBar
              noPrettier={props.noPrettier}
              toolbars={props.toolbars}
              toolbarsExclude={props.toolbarsExclude}
              setting={setting}
              updateSetting={updateSetting}
              tableShape={props.tableShape}
              defToolbars={defToolbars}
            />
          )}
          <Content
            value={props.modelValue}
            onChange={(value: string) => {
              bus.emit(editorId, 'saveHistoryPos');

              if (props.onChange) {
                props.onChange(value);
              } else {
                context.emit('update:modelValue', value);
                context.emit('onChange', value);
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
            markedHeadingId={props.markedHeadingId}
            noMermaid={props.noMermaid}
            sanitize={props.sanitize}
            placeholder={props.placeholder}
            noKatex={props.noKatex}
            scrollAuto={state.scrollAuto}
          />
          {!props.previewOnly && props.footers?.length > 0 && (
            <Footer
              modelValue={props.modelValue}
              footers={props.footers}
              defFooters={defFooters}
              scrollAuto={state.scrollAuto}
              onScrollAutoChange={(v) => (state.scrollAuto = v)}
            />
          )}
          {catalogShow.value && (
            <MdCatalog
              theme={props.theme}
              style={{
                display: catalogVisible.value ? 'block' : 'none'
              }}
              class={`${prefix}-catalog-editor`}
              editorId={editorId}
              markedHeadingId={props.markedHeadingId}
            />
          )}
        </div>
      );
    };
  }
});

export default Editor;
