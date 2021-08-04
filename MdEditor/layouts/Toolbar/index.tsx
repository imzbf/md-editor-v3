import { defineComponent, inject, onMounted, PropType, reactive, ref } from 'vue';
import Divider from '../../components/Divider';
import Dropdown from '../../components/Dropdown';
import { prefix } from '../../Editor';
import bus from '../../utils/event-bus';
import { goto, ToolDirective } from '../../utils';
import screenfull from 'screenfull';
import Modals from '../Modals';
import { StaticTextDefaultValue, ToolbarNames, SettingType } from '../../Editor';

export default defineComponent({
  name: 'MDEditorToolbar',
  props: {
    // 工具栏选择显示
    toolbars: {
      type: Array as PropType<Array<ToolbarNames>>,
      default: []
    },
    // 工具栏选择不显示
    toolbarsExclude: {
      type: Array as PropType<Array<ToolbarNames>>,
      default: []
    },
    setting: {
      type: Object as PropType<SettingType>,
      default: () => ({})
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
    const ult = inject('usedLanguageText') as StaticTextDefaultValue;

    const visible = reactive({
      title: false,
      catalog: false
    });

    const emitHandler = (direct: ToolDirective, params?: any) => {
      bus.emit('replace', direct, params);
    };

    const fullScreen = () => {
      if (screenfull.isEnabled) {
        if (screenfull.isFullscreen) {
          screenfull.exit();
        } else {
          screenfull.request();
        }
      } else {
        console.error('浏览器不支持全屏');
      }
    };

    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        props.updateSetting(!props.setting.fullscreen, 'fullscreen');
      });
    }

    // 链接
    const modalData = reactive<{ type: 'link' | 'image' | 'help'; visible: boolean }>({
      type: 'link',
      visible: false
    });

    bus.on({
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

    return () => {
      // 获取工具栏设置
      const toolbars = props.toolbars;
      // 获取排除的工具栏设置
      const toolbarsExclude = props.toolbarsExclude;

      const showBar = (name: ToolbarNames) =>
        toolbars.includes(name) && !toolbarsExclude.includes(name);

      return (
        <div class={`${prefix}-toolbar-wrapper`}>
          <div class={`${prefix}-toolbar`}>
            <div class={`${prefix}-toolbar-left`}>
              {showBar('bold') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.bold}
                  onClick={() => {
                    emitHandler('bold');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-bold" />
                  </svg>
                </div>
              )}
              {showBar('underline') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.underline}
                  onClick={() => {
                    emitHandler('underline');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-underline" />
                  </svg>
                </div>
              )}
              {showBar('italic') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.italic}
                  onClick={() => {
                    emitHandler('italic');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-italic" />
                  </svg>
                </div>
              )}
              {showBar('strikeThrough') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.strikeThrough}
                  onClick={() => {
                    emitHandler('strikeThrough');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-strike-through" />
                  </svg>
                </div>
              )}
              <Divider />
              {showBar('title') && (
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
                        {ult.titleItem?.h1}
                      </li>
                      <li
                        class={`${prefix}-menu-item`}
                        onClick={() => {
                          emitHandler('h2');
                        }}
                      >
                        {ult.titleItem?.h2}
                      </li>
                      <li
                        class={`${prefix}-menu-item`}
                        onClick={() => {
                          emitHandler('h3');
                        }}
                      >
                        {ult.titleItem?.h3}
                      </li>
                      <li
                        class={`${prefix}-menu-item`}
                        onClick={() => {
                          emitHandler('h4');
                        }}
                      >
                        {ult.titleItem?.h4}
                      </li>
                      <li
                        class={`${prefix}-menu-item`}
                        onClick={() => {
                          emitHandler('h5');
                        }}
                      >
                        {ult.titleItem?.h5}
                      </li>
                      <li
                        class={`${prefix}-menu-item`}
                        onClick={() => {
                          emitHandler('h6');
                        }}
                      >
                        {ult.titleItem?.h6}
                      </li>
                    </ul>
                  }
                >
                  <div class={`${prefix}-toolbar-item`} title={ult.toolbarTips?.title}>
                    <svg class={`${prefix}-icon`} aria-hidden="true">
                      <use xlinkHref="#icon-title" />
                    </svg>
                  </div>
                </Dropdown>
              )}
              {showBar('sub') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.sub}
                  onClick={() => {
                    emitHandler('sub');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-sub" />
                  </svg>
                </div>
              )}
              {showBar('sup') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.sup}
                  onClick={() => {
                    emitHandler('sup');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-sup" />
                  </svg>
                </div>
              )}
              {showBar('quote') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.quote}
                  onClick={() => {
                    emitHandler('quote');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-quote" />
                  </svg>
                </div>
              )}
              {showBar('unorderedList') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.unorderedList}
                  onClick={() => {
                    emitHandler('unorderedList');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-unordered-list" />
                  </svg>
                </div>
              )}
              {showBar('orderedList') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.orderedList}
                  onClick={() => {
                    emitHandler('orderedList');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-ordered-list" />
                  </svg>
                </div>
              )}
              <Divider />
              {showBar('codeRow') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.codeRow}
                  onClick={() => {
                    emitHandler('codeRow');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-code-row" />
                  </svg>
                </div>
              )}
              {showBar('code') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.code}
                  onClick={() => {
                    emitHandler('code');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-code" />
                  </svg>
                </div>
              )}
              {showBar('link') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.link}
                  onClick={() => {
                    modalData.type = 'link';
                    modalData.visible = true;
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-link" />
                  </svg>
                </div>
              )}
              {showBar('image') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.image}
                  onClick={() => {
                    modalData.type = 'image';
                    modalData.visible = true;
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-image" />
                  </svg>
                </div>
              )}
              {showBar('table') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.table}
                  onClick={() => {
                    emitHandler('table');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-table" />
                  </svg>
                </div>
              )}
              <Divider />
              {showBar('revoke') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.revoke}
                  onClick={() => {
                    bus.emit('ctrlZ');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-revoke" />
                  </svg>
                </div>
              )}
              {showBar('next') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.next}
                  onClick={() => {
                    bus.emit('ctrlShiftZ');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-next" />
                  </svg>
                </div>
              )}
              {showBar('save') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.save}
                  onClick={() => {
                    bus.emit('onSave');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-baocun" />
                  </svg>
                </div>
              )}
            </div>
            <div class={`${prefix}-toolbar-right`}>
              {showBar('prettier') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.prettier}
                  onClick={() => {
                    emitHandler('prettier');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-prettier" />
                  </svg>
                </div>
              )}

              {showBar('pageFullscreen') && !props.setting.fullscreen && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.pageFullscreen}
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
              )}

              {showBar('fullscreen') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.fullscreen}
                  onClick={fullScreen}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use
                      xlinkHref={`#icon-${
                        props.setting.fullscreen ? 'fullScreen-exit' : 'fullScreen'
                      }`}
                    />
                  </svg>
                </div>
              )}

              {showBar('preview') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.preview}
                  onClick={() => {
                    props.updateSetting(!props.setting.preview, 'preview');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-preview" />
                  </svg>
                </div>
              )}
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

              {showBar('htmlPreview') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.htmlPreview}
                  onClick={() => {
                    props.updateSetting(!props.setting.htmlPreview, 'htmlPreview');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-coding" />
                  </svg>
                </div>
              )}

              {showBar('github') && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.toolbarTips?.github}
                  onClick={() => goto('https://github.com/imzbf/md-editor-v3')}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-github" />
                  </svg>
                </div>
              )}
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
        </div>
      );
    };
  }
});
