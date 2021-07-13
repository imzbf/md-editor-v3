import { defineComponent, PropType, reactive } from 'vue';
import Divider from '../../components/Divider';
import Dropdown from '../../components/Dropdown';
import { prefix, SettingType } from '../../Editor';
import bus from '../../utils/event-bus';
import { goto, ToolDirective } from '../../utils';
import screenfull from 'screenfull';
import Modals from '../Modals';

export default defineComponent({
  name: 'MDEditorToolbar',
  props: {
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
    const visible = reactive({
      title: false,
      menu: false
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

    return () => (
      <>
        <div class={`${prefix}-toolbar`}>
          <div class={`${prefix}-toolbar-left`}>
            <div
              class={`${prefix}-toolbar-item`}
              title="加粗"
              onClick={() => {
                emitHandler('bold');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-bold" />
              </svg>
            </div>
            <div
              class={`${prefix}-toolbar-item`}
              title="下划线"
              onClick={() => {
                emitHandler('underline');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-underline" />
              </svg>
            </div>
            <div
              class={`${prefix}-toolbar-item`}
              title="斜体"
              onClick={() => {
                emitHandler('italic');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-italic" />
              </svg>
            </div>
            <div
              class={`${prefix}-toolbar-item`}
              title="删除线"
              onClick={() => {
                emitHandler('strikeThrough');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-strike-through" />
              </svg>
            </div>
            <Divider />
            <Dropdown
              visible={visible.title}
              onChange={(v) => {
                visible.title = v;
              }}
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
                    一级标题
                  </li>
                  <li
                    class={`${prefix}-menu-item`}
                    onClick={() => {
                      emitHandler('h2');
                    }}
                  >
                    二级标题
                  </li>
                  <li
                    class={`${prefix}-menu-item`}
                    onClick={() => {
                      emitHandler('h3');
                    }}
                  >
                    三级标题
                  </li>
                  <li
                    class={`${prefix}-menu-item`}
                    onClick={() => {
                      emitHandler('h4');
                    }}
                  >
                    四级标题
                  </li>
                  <li
                    class={`${prefix}-menu-item`}
                    onClick={() => {
                      emitHandler('h5');
                    }}
                  >
                    五级标题
                  </li>
                  <li
                    class={`${prefix}-menu-item`}
                    onClick={() => {
                      emitHandler('h6');
                    }}
                  >
                    六级标题
                  </li>
                </ul>
              }
            >
              <div class={`${prefix}-toolbar-item`} title="标题">
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use xlinkHref="#icon-title" />
                </svg>
              </div>
            </Dropdown>
            <div
              class={`${prefix}-toolbar-item`}
              title="下标"
              onClick={() => {
                emitHandler('sub');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-sub" />
              </svg>
            </div>
            <div
              class={`${prefix}-toolbar-item`}
              title="上标"
              onClick={() => {
                emitHandler('sup');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-sup" />
              </svg>
            </div>
            <div
              class={`${prefix}-toolbar-item`}
              title="引用"
              onClick={() => {
                emitHandler('quote');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-quote" />
              </svg>
            </div>
            <div
              class={`${prefix}-toolbar-item`}
              title="无序列表"
              onClick={() => {
                emitHandler('unorderedList');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-unordered-list" />
              </svg>
            </div>
            <div
              class={`${prefix}-toolbar-item`}
              title="有序列表"
              onClick={() => {
                emitHandler('orderedList');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-ordered-list" />
              </svg>
            </div>
            <Divider />
            <div
              class={`${prefix}-toolbar-item`}
              title="行内代码"
              onClick={() => {
                emitHandler('codeRow');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-code-row" />
              </svg>
            </div>
            <div
              class={`${prefix}-toolbar-item`}
              title="代码块"
              onClick={() => {
                emitHandler('code');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-code" />
              </svg>
            </div>
            <div
              class={`${prefix}-toolbar-item`}
              title="链接"
              onClick={() => {
                modalData.type = 'link';
                modalData.visible = true;
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-link" />
              </svg>
            </div>
            <div
              class={`${prefix}-toolbar-item`}
              title="图片"
              onClick={() => {
                modalData.type = 'image';
                modalData.visible = true;
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-image" />
              </svg>
            </div>
            <div
              class={`${prefix}-toolbar-item`}
              title="表格"
              onClick={() => {
                emitHandler('table');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-table" />
              </svg>
            </div>
            <Divider />
            <div
              class={`${prefix}-toolbar-item`}
              title="撤回"
              onClick={() => {
                bus.emit('ctrlZ');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-revoke" />
              </svg>
            </div>
            <div
              class={`${prefix}-toolbar-item`}
              title="取消撤回"
              onClick={() => {
                bus.emit('ctrlShiftZ');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-next" />
              </svg>
            </div>
            <div
              class={`${prefix}-toolbar-item`}
              title="保存"
              onClick={() => {
                bus.emit('onSave');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-baocun" />
              </svg>
            </div>
          </div>
          <div class={`${prefix}-toolbar-right`}>
            {!props.setting.fullscreen && (
              <div
                class={`${prefix}-toolbar-item`}
                title="浏览器内全屏"
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
            <div class={`${prefix}-toolbar-item`} title="全屏放大" onClick={fullScreen}>
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use
                  xlinkHref={`#icon-${
                    props.setting.fullscreen ? 'fullScreen-exit' : 'fullScreen'
                  }`}
                />
              </svg>
            </div>

            {/* <Dropdown
              visible={visible.menu}
              onChange={(v) => {
                visible.menu = v;
              }}
              overlay={<div>123</div>}
            >
              <div class={`${prefix}-toolbar-item`} title="目录">
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use xlinkHref="#icon-mulu" />
                </svg>
              </div>
            </Dropdown> */}

            <div
              class={`${prefix}-toolbar-item`}
              title="预览"
              onClick={() => {
                props.updateSetting(!props.setting.preview, 'preview');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-preview" />
              </svg>
            </div>

            <div
              class={`${prefix}-toolbar-item`}
              title="html代码预览"
              onClick={() => {
                props.updateSetting(!props.setting.html, 'html');
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-coding" />
              </svg>
            </div>

            {/* <div
              class={`${prefix}-toolbar-item`}
              title="帮助"
              onClick={() => {
                modalData.type = 'help';
                modalData.visible = true;
              }}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-help" />
              </svg>
            </div> */}

            <div
              class={`${prefix}-toolbar-item`}
              title="源码"
              onClick={() => goto('https://github.com/imzbf/md-editor-v3')}
            >
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-github" />
              </svg>
            </div>
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
        />
      </>
    );
  }
});
