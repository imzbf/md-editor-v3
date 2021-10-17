import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  onMounted,
  PropType,
  reactive,
  ref,
  Teleport
} from 'vue';
import Divider from '../../components/Divider';
import Dropdown from '../../components/Dropdown';
import { prefix, StaticTextDefaultValue, ToolbarNames, SettingType } from '../../Editor';
import bus from '../../utils/event-bus';
import { goto } from '../../utils';
import Modals from '../Modals';
import { ToolDirective } from '../../utils/content-help';
import { useSreenfull } from './composition';

export default defineComponent({
  name: 'MDEditorToolbar',
  props: {
    // 工具栏选择显示
    toolbars: {
      type: Array as PropType<Array<ToolbarNames>>,
      default: () => []
    },
    // 工具栏选择不显示
    toolbarsExclude: {
      type: Array as PropType<Array<ToolbarNames>>,
      default: () => []
    },
    setting: {
      type: Object as PropType<SettingType>,
      default: () => ({})
    },
    screenfull: {
      type: Object,
      default: null
    },
    screenfullJs: {
      type: String as PropType<string>,
      default: ''
    },
    updateSetting: {
      type: Function as PropType<(v: boolean, k: keyof SettingType) => void>,
      default: () => () => {}
    }
  },
  setup(props) {
    // 获取Id
    const editorId = inject('editorId') as string;
    // 获取语言设置
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const previewOnly = inject('previewOnly') as boolean;

    // 全屏功能
    const { fullScreenHandler, screenfullLoad } = useSreenfull(props);

    const visible = reactive({
      title: false,
      catalog: false
    });

    const emitHandler = (direct: ToolDirective, params?: any) => {
      bus.emit(editorId, 'replace', direct, params);
    };

    // 链接
    const modalData = reactive<{ type: 'link' | 'image' | 'help'; visible: boolean }>({
      type: 'link',
      visible: false
    });

    bus.on(editorId, {
      name: 'openModals',
      callback(type) {
        modalData.type = type;
        modalData.visible = true;
      }
    });

    // 挂载位置
    const to = ref(document.body);
    onMounted(() => {
      to.value = document.getElementById(editorId) as HTMLElement;
    });

    // 监控左边的操作栏
    const toolbarLeftRef = ref<HTMLDivElement>();
    onMounted(() => {
      toolbarLeftRef.value?.addEventListener('mouseover', () => {
        if (!window.getSelection()?.toString()) {
          bus.emit(editorId, 'selectTextChange', '');
        }
      });
    });
    // end

    // 通过'='分割左右
    const splitedbar = computed(() => {
      const excluedBars = props.toolbars.filter(
        (barItem) => !props.toolbarsExclude.includes(barItem)
      );
      const moduleSplitIndex = excluedBars.indexOf('=');

      // 左侧部分
      const barLeft =
        moduleSplitIndex === -1
          ? excluedBars
          : excluedBars.slice(0, moduleSplitIndex + 1);

      const barRight =
        moduleSplitIndex === -1
          ? []
          : excluedBars.slice(moduleSplitIndex, Number.MAX_SAFE_INTEGER);

      return [barLeft, barRight];
    });

    const barRender = (barItem: ToolbarNames) => {
      switch (barItem) {
        case '-': {
          return <Divider />;
        }
        case 'bold': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.bold}
              onClick={() => {
                emitHandler('bold');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-bold" />
              </svg>
            </div>
          );
        }
        case 'underline': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.underline}
              onClick={() => {
                emitHandler('underline');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-underline" />
              </svg>
            </div>
          );
        }
        case 'italic': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.italic}
              onClick={() => {
                emitHandler('italic');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-italic" />
              </svg>
            </div>
          );
        }
        case 'strikeThrough': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.strikeThrough}
              onClick={() => {
                emitHandler('strikeThrough');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-strike-through" />
              </svg>
            </div>
          );
        }
        case 'title': {
          return (
            <Dropdown
              visible={visible.title}
              onChange={(v) => {
                visible.title = v;
              }}
              to={to.value}
              overlay={
                <ul
                  class={`${prefix}-menu`}
                  onClick={() => {
                    visible.title = false;
                  }}
                >
                  <li
                    class={`${prefix}-menu-item`}
                    onClick={() => {
                      emitHandler('h1');
                    }}
                  >
                    {ult.value.titleItem?.h1}
                  </li>
                  <li
                    class={`${prefix}-menu-item`}
                    onClick={() => {
                      emitHandler('h2');
                    }}
                  >
                    {ult.value.titleItem?.h2}
                  </li>
                  <li
                    class={`${prefix}-menu-item`}
                    onClick={() => {
                      emitHandler('h3');
                    }}
                  >
                    {ult.value.titleItem?.h3}
                  </li>
                  <li
                    class={`${prefix}-menu-item`}
                    onClick={() => {
                      emitHandler('h4');
                    }}
                  >
                    {ult.value.titleItem?.h4}
                  </li>
                  <li
                    class={`${prefix}-menu-item`}
                    onClick={() => {
                      emitHandler('h5');
                    }}
                  >
                    {ult.value.titleItem?.h5}
                  </li>
                  <li
                    class={`${prefix}-menu-item`}
                    onClick={() => {
                      emitHandler('h6');
                    }}
                  >
                    {ult.value.titleItem?.h6}
                  </li>
                </ul>
              }
            >
              <div class={`${prefix}-toolbar-item`} title={ult.value.toolbarTips?.title}>
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use xlinkHref="#icon-title" />
                </svg>
              </div>
            </Dropdown>
          );
        }
        case 'sub': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.sub}
              onClick={() => {
                emitHandler('sub');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-sub" />
              </svg>
            </div>
          );
        }
        case 'sup': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.sup}
              onClick={() => {
                emitHandler('sup');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-sup" />
              </svg>
            </div>
          );
        }
        case 'quote': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.quote}
              onClick={() => {
                emitHandler('quote');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-quote" />
              </svg>
            </div>
          );
        }

        case 'unorderedList': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.unorderedList}
              onClick={() => {
                emitHandler('unorderedList');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-unordered-list" />
              </svg>
            </div>
          );
        }
        case 'orderedList': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.orderedList}
              onClick={() => {
                emitHandler('orderedList');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-ordered-list" />
              </svg>
            </div>
          );
        }

        case 'codeRow': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.codeRow}
              onClick={() => {
                emitHandler('codeRow');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-code-row" />
              </svg>
            </div>
          );
        }
        case 'code': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.code}
              onClick={() => {
                emitHandler('code');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-code" />
              </svg>
            </div>
          );
        }
        case 'link': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.link}
              onClick={() => {
                modalData.type = 'link';
                modalData.visible = true;
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-link" />
              </svg>
            </div>
          );
        }
        case 'image': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.image}
              onClick={() => {
                modalData.type = 'image';
                modalData.visible = true;
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-image" />
              </svg>
            </div>
          );
        }
        case 'table': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.table}
              onClick={() => {
                emitHandler('table');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-table" />
              </svg>
            </div>
          );
        }
        case 'revoke': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.revoke}
              onClick={() => {
                bus.emit(editorId, 'ctrlZ');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-revoke" />
              </svg>
            </div>
          );
        }
        case 'next': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.next}
              onClick={() => {
                bus.emit(editorId, 'ctrlShiftZ');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-next" />
              </svg>
            </div>
          );
        }
        case 'save': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.save}
              onClick={() => {
                bus.emit(editorId, 'onSave');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-baocun" />
              </svg>
            </div>
          );
        }
        case 'prettier': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.prettier}
              onClick={() => {
                emitHandler('prettier');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-prettier" />
              </svg>
            </div>
          );
        }
        case 'pageFullscreen': {
          return (
            !props.setting.fullscreen && (
              <div
                class={`${prefix}-toolbar-item`}
                title={ult.value.toolbarTips?.pageFullscreen}
                onClick={() => {
                  props.updateSetting(!props.setting.pageFullScreen, 'pageFullScreen');
                }}
              >
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use
                    xlinkHref={`#icon-${
                      props.setting.pageFullScreen ? 'suoxiao' : 'fangda'
                    }`}
                  />
                </svg>
              </div>
            )
          );
        }
        case 'fullscreen': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.fullscreen}
              onClick={fullScreenHandler}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use
                  xlinkHref={`#icon-${
                    props.setting.fullscreen ? 'fullScreen-exit' : 'fullScreen'
                  }`}
                />
              </svg>
            </div>
          );
        }
        case 'preview': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.preview}
              onClick={() => {
                props.updateSetting(!props.setting.preview, 'preview');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-preview" />
              </svg>
            </div>
          );
        }
        case 'htmlPreview': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.htmlPreview}
              onClick={() => {
                props.updateSetting(!props.setting.htmlPreview, 'htmlPreview');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-coding" />
              </svg>
            </div>
          );
        }
        case 'github': {
          return (
            <div
              class={`${prefix}-toolbar-item`}
              title={ult.value.toolbarTips?.github}
              onClick={() => goto('https://github.com/imzbf/md-editor-v3')}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-github" />
              </svg>
            </div>
          );
        }
      }
    };

    return () => {
      const LeftBar = splitedbar.value[0].map((barItem) => barRender(barItem));
      const RightBar = splitedbar.value[1].map((barItem) => barRender(barItem));

      return (
        <div class={`${prefix}-toolbar-wrapper`}>
          <div class={`${prefix}-toolbar`}>
            <div class={`${prefix}-toolbar-left`} ref={toolbarLeftRef}>
              {LeftBar}
            </div>
            <div class={`${prefix}-toolbar-right`}>
              {RightBar}
              {/*
            <Dropdown
              visible={visible.catalog}
              onChange={(v) => {
                visible.catalog = v;
              }}
              overlay={<div>123</div>}
              to={to.value}
            >
              <div class={`${prefix}-toolbar-item`} title="目录">
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use xlinkHref="#icon-catalog" />
                </svg>
              </div>
            </Dropdown> */}
            </div>
          </div>
          <Modals
            visible={modalData.visible}
            type={modalData.type}
            onCancel={() => {
              modalData.visible = false;
            }}
            onOk={(data) => {
              if (data) {
                emitHandler(modalData.type, {
                  desc: data.desc,
                  url: data.url
                });
              }
              modalData.visible = false;
            }}
            to={to.value}
          />
          {/* 非预览模式且未提供screenfull时请求cdn */}
          {!previewOnly && props.screenfull === null && (
            <Teleport to={document.head}>
              <script src={props.screenfullJs} onLoad={screenfullLoad}></script>
            </Teleport>
          )}
        </div>
      );
    };
  }
});
