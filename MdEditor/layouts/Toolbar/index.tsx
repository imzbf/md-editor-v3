import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref
} from 'vue';
import Divider from '../../components/Divider';
import Dropdown from '../../components/Dropdown';
import { StaticTextDefaultValue, ToolbarNames } from '../../type';
import bus from '../../utils/event-bus';
import { goto } from '../../utils';
import Modals from '../Modals';
import { ToolDirective } from '../../utils/content-help';
import { useSreenfull } from './composition';
import TableShape from './TableShape';
import { allToolbar, prefix } from '../../config';
import { toolbarProps, ToolbarProps } from './props';
import { CHANGE_CATALOG_VISIBLE, ON_SAVE } from '../../static/event-name';

export default defineComponent({
  name: 'MDEditorToolbar',
  props: toolbarProps(),
  setup(props: ToolbarProps) {
    // 获取Id
    const editorId = inject('editorId') as string;
    // 获取语言设置
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;

    // 全屏功能
    const { fullscreenHandler } = useSreenfull(props);

    // wrapper ID
    const wrapperId = `${editorId}-toolbar-wrapper`;

    const visible = reactive({
      title: false,
      catalog: false,
      // 图片上传下拉
      image: false,
      // 表格预选
      table: false,
      // mermaid
      mermaid: false,
      katex: false
    });

    const emitHandler = (direct: ToolDirective, params?: any) => {
      bus.emit(editorId, 'replace', direct, params);
    };

    // 链接
    const modalData = reactive<{
      type: 'link' | 'image' | 'help';
      linkVisible: boolean;
      clipVisible: boolean;
    }>({
      type: 'link',
      linkVisible: false,
      clipVisible: false
    });

    // 监控左边的操作栏
    const toolbarLeftRef = ref<HTMLDivElement>();
    onMounted(() => {
      // 打开弹窗监听事件
      bus.on(editorId, {
        name: 'openModals',
        callback(type) {
          modalData.type = type;
          modalData.linkVisible = true;
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

    // 上传控件
    const uploadRef = ref();

    const uploadHandler = () => {
      bus.emit(
        editorId,
        'uploadImage',
        Array.from((uploadRef.value as HTMLInputElement).files || [])
      );
      // 清空内容，否则无法再次选取同一张图片
      (uploadRef.value as HTMLInputElement).value = '';
    };
    onMounted(() => {
      (uploadRef.value as HTMLInputElement).addEventListener('change', uploadHandler);
    });

    const barRender = (barItem: ToolbarNames) => {
      if (allToolbar.includes(barItem as string)) {
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
                  <use xlinkHref="#md-editor-icon-bold" />
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
                  <use xlinkHref="#md-editor-icon-underline" />
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
                  <use xlinkHref="#md-editor-icon-italic" />
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
                  <use xlinkHref="#md-editor-icon-strike-through" />
                </svg>
              </div>
            );
          }
          case 'title': {
            return (
              <Dropdown
                relative={`#${wrapperId}`}
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
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.value.toolbarTips?.title}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#md-editor-icon-title" />
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
                  <use xlinkHref="#md-editor-icon-sub" />
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
                  <use xlinkHref="#md-editor-icon-sup" />
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
                  <use xlinkHref="#md-editor-icon-quote" />
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
                  <use xlinkHref="#md-editor-icon-unordered-list" />
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
                  <use xlinkHref="#md-editor-icon-ordered-list" />
                </svg>
              </div>
            );
          }

          case 'task': {
            return (
              <div
                class={`${prefix}-toolbar-item`}
                title={ult.value.toolbarTips?.task}
                onClick={() => {
                  emitHandler('task');
                }}
              >
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use xlinkHref="#md-editor-icon-task" />
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
                  <use xlinkHref="#md-editor-icon-code-row" />
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
                  <use xlinkHref="#md-editor-icon-code" />
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
                  modalData.linkVisible = true;
                }}
              >
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use xlinkHref="#md-editor-icon-link" />
                </svg>
              </div>
            );
          }
          case 'image': {
            return props.noUploadImg ? (
              <div
                class={`${prefix}-toolbar-item`}
                title={ult.value.toolbarTips?.image}
                onClick={() => {
                  modalData.type = 'image';
                  modalData.linkVisible = true;
                }}
              >
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use xlinkHref="#md-editor-icon-image" />
                </svg>
              </div>
            ) : (
              <Dropdown
                relative={`#${wrapperId}`}
                visible={visible.image}
                onChange={(v) => {
                  visible.image = v;
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
                        modalData.type = 'image';
                        modalData.linkVisible = true;
                      }}
                    >
                      {ult.value.imgTitleItem?.link}
                    </li>
                    <li
                      class={`${prefix}-menu-item`}
                      onClick={() => {
                        (uploadRef.value as HTMLInputElement).click();
                      }}
                    >
                      {ult.value.imgTitleItem?.upload}
                    </li>
                    <li
                      class={`${prefix}-menu-item`}
                      onClick={() => {
                        modalData.clipVisible = true;
                      }}
                    >
                      {ult.value.imgTitleItem?.clip2upload}
                    </li>
                  </ul>
                }
              >
                {
                  <div
                    class={`${prefix}-toolbar-item`}
                    title={ult.value.toolbarTips?.image}
                  >
                    <svg class={`${prefix}-icon`} aria-hidden="true">
                      <use xlinkHref="#md-editor-icon-image" />
                    </svg>
                  </div>
                }
              </Dropdown>
            );
          }
          case 'table': {
            return (
              <Dropdown
                relative={`#${wrapperId}`}
                visible={visible.table}
                onChange={(v) => {
                  visible.table = v;
                }}
                key="bar-table"
                overlay={
                  <TableShape
                    tableShape={props.tableShape}
                    onSelected={(selectedShape) => {
                      emitHandler('table', { selectedShape });
                    }}
                  />
                }
              >
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.value.toolbarTips?.table}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#md-editor-icon-table" />
                  </svg>
                </div>
              </Dropdown>
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
                  <use xlinkHref="#md-editor-icon-revoke" />
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
                  <use xlinkHref="#md-editor-icon-next" />
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
                  bus.emit(editorId, ON_SAVE);
                }}
              >
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use xlinkHref="#md-editor-icon-baocun" />
                </svg>
              </div>
            );
          }
          case 'prettier': {
            return !props.noPrettier ? (
              <div
                class={`${prefix}-toolbar-item`}
                title={ult.value.toolbarTips?.prettier}
                onClick={() => {
                  emitHandler('prettier');
                }}
              >
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use xlinkHref="#md-editor-icon-prettier" />
                </svg>
              </div>
            ) : (
              ''
            );
          }
          case 'pageFullscreen': {
            return (
              !props.setting.fullscreen && (
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.value.toolbarTips?.pageFullscreen}
                  onClick={() => {
                    props.updateSetting('pageFullscreen');
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use
                      xlinkHref={`#md-editor-icon-${
                        props.setting.pageFullscreen ? 'suoxiao' : 'fangda'
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
                onClick={() => {
                  fullscreenHandler();
                }}
              >
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use
                    xlinkHref={`#md-editor-icon-${
                      props.setting.fullscreen ? 'fullscreen-exit' : 'fullscreen'
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
                  props.updateSetting('preview');
                }}
              >
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use xlinkHref="#md-editor-icon-preview" />
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
                  props.updateSetting('htmlPreview');
                }}
              >
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use xlinkHref="#md-editor-icon-coding" />
                </svg>
              </div>
            );
          }
          case 'catalog': {
            return (
              <div
                class={`${prefix}-toolbar-item`}
                title={ult.value.toolbarTips?.catalog}
                onClick={() => {
                  bus.emit(editorId, CHANGE_CATALOG_VISIBLE);
                }}
                key="bar-catalog"
              >
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use xlinkHref="#md-editor-icon-catalog" />
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
                  <use xlinkHref="#md-editor-icon-github" />
                </svg>
              </div>
            );
          }
          case 'mermaid': {
            return (
              <Dropdown
                relative={`#${wrapperId}`}
                visible={visible.mermaid}
                onChange={(v) => {
                  visible.mermaid = v;
                }}
                overlay={
                  <ul
                    class={`${prefix}-menu`}
                    onClick={() => {
                      visible.mermaid = false;
                    }}
                  >
                    <li
                      class={`${prefix}-menu-item`}
                      onClick={() => {
                        emitHandler('flow');
                      }}
                    >
                      {ult.value.mermaid?.flow}
                    </li>
                    <li
                      class={`${prefix}-menu-item`}
                      onClick={() => {
                        emitHandler('sequence');
                      }}
                    >
                      {ult.value.mermaid?.sequence}
                    </li>
                    <li
                      class={`${prefix}-menu-item`}
                      onClick={() => {
                        emitHandler('gantt');
                      }}
                    >
                      {ult.value.mermaid?.gantt}
                    </li>
                    <li
                      class={`${prefix}-menu-item`}
                      onClick={() => {
                        emitHandler('class');
                      }}
                    >
                      {ult.value.mermaid?.class}
                    </li>
                    <li
                      class={`${prefix}-menu-item`}
                      onClick={() => {
                        emitHandler('state');
                      }}
                    >
                      {ult.value.mermaid?.state}
                    </li>
                    <li
                      class={`${prefix}-menu-item`}
                      onClick={() => {
                        emitHandler('pie');
                      }}
                    >
                      {ult.value.mermaid?.pie}
                    </li>
                    <li
                      class={`${prefix}-menu-item`}
                      onClick={() => {
                        emitHandler('relationship');
                      }}
                    >
                      {ult.value.mermaid?.relationship}
                    </li>
                    <li
                      class={`${prefix}-menu-item`}
                      onClick={() => {
                        emitHandler('journey');
                      }}
                    >
                      {ult.value.mermaid?.journey}
                    </li>
                  </ul>
                }
                key="bar-mermaid"
              >
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.value.toolbarTips?.mermaid}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#md-editor-icon-mermaid" />
                  </svg>
                </div>
              </Dropdown>
            );
          }
          case 'katex': {
            return (
              <Dropdown
                relative={`#${wrapperId}`}
                visible={visible.katex}
                onChange={(v) => {
                  visible.katex = v;
                }}
                overlay={
                  <ul
                    class={`${prefix}-menu`}
                    onClick={() => {
                      visible.katex = false;
                    }}
                  >
                    <li
                      class={`${prefix}-menu-item`}
                      onClick={() => {
                        emitHandler('katexInline');
                      }}
                    >
                      {ult.value.katex?.inline}
                    </li>
                    <li
                      class={`${prefix}-menu-item`}
                      onClick={() => {
                        emitHandler('katexBlock');
                      }}
                    >
                      {ult.value.katex?.block}
                    </li>
                  </ul>
                }
                key="bar-katex"
              >
                <div
                  class={`${prefix}-toolbar-item`}
                  title={ult.value.toolbarTips?.katex}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#md-editor-icon-formula" />
                  </svg>
                </div>
              </Dropdown>
            );
          }
        }
      } else if (props.defToolbars instanceof Array) {
        // vue3模板，插槽内容永远是个数组对象
        const defItem = props.defToolbars[barItem as number];

        return defItem || '';
      } else if (props.defToolbars && props.defToolbars.children instanceof Array) {
        // jsx语法，<></>包裹下，defToolbars是包裹插槽内容的对象
        const defItem = props.defToolbars.children[barItem as number];

        return defItem || '';
      } else {
        return '';
      }
    };

    return () => {
      const LeftBar = splitedbar.value[0].map((barItem) => barRender(barItem));
      const RightBar = splitedbar.value[1].map((barItem) => barRender(barItem));

      return (
        <div class={`${prefix}-toolbar-wrapper`} id={wrapperId}>
          <div class={`${prefix}-toolbar`}>
            <div class={`${prefix}-toolbar-left`} ref={toolbarLeftRef}>
              {LeftBar}
            </div>
            <div class={`${prefix}-toolbar-right`}>{RightBar}</div>
          </div>
          <input
            ref={uploadRef}
            accept="image/*"
            type="file"
            multiple={true}
            style={{ display: 'none' }}
          />
          <Modals
            linkVisible={modalData.linkVisible}
            clipVisible={modalData.clipVisible}
            type={modalData.type}
            onCancel={() => {
              modalData.linkVisible = false;
              modalData.clipVisible = false;
            }}
            onOk={(data) => {
              if (data) {
                emitHandler(modalData.type, {
                  desc: data.desc,
                  url: data.url
                });
              }
              modalData.linkVisible = false;
              modalData.clipVisible = false;
            }}
          />
        </div>
      );
    };
  }
});
