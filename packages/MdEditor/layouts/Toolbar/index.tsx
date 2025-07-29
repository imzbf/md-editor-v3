import { linkTo, draggingScroll } from '@vavt/util';
import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref,
  cloneVNode,
  VNode,
  watch,
  nextTick
} from 'vue';
import Divider from '~/components/Divider';
import Dropdown from '~/components/Dropdown';
import Icon from '~/components/Icon';
import { allToolbar, prefix } from '~/config';
import {
  CHANGE_CATALOG_VISIBLE,
  CTRL_SHIFT_Z,
  CTRL_Z,
  ON_SAVE,
  REPLACE,
  UPLOAD_IMAGE
} from '~/static/event-name';
import {
  InsertContentGenerator,
  PreviewThemes,
  StaticTextDefaultValue,
  Themes,
  ToolbarNames
} from '~/type';
import { ToolDirective } from '~/utils/content-help';
import bus from '~/utils/event-bus';
import { useSreenfull } from './composition';
import { toolbarProps as props, ToolbarProps } from './props';
import TableShape from './TableShape';
import Modals from '../Modals';

export default defineComponent({
  name: 'MDEditorToolbar',
  props,
  setup(props: ToolbarProps) {
    // 获取Id
    const editorId = inject('editorId') as string;
    // 获取语言设置
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    // 主题
    const theme = inject('theme') as ComputedRef<Themes>;
    // 预览主题
    const previewTheme = inject('previewTheme') as ComputedRef<PreviewThemes>;
    //语言
    const language = inject('language') as ComputedRef<string>;
    const disabled = inject<ComputedRef<boolean>>('disabled');

    // 全屏功能
    const { fullscreenHandler } = useSreenfull(props);

    // wrapper ID
    const wrapperId = `${editorId}-toolbar-wrapper`;

    const wrapperRef = ref<HTMLDivElement>();

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
      if (disabled?.value) {
        return false;
      }

      bus.emit(editorId, REPLACE, direct, params);
    };

    // 链接
    const clipVisible = ref<boolean>(false);

    // 监控左边的操作栏
    const toolbarLeftRef = ref<HTMLDivElement>();
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
        UPLOAD_IMAGE,
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
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.bold}
                onClick={() => {
                  emitHandler('bold');
                }}
              >
                <Icon name="bold" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.bold}
                  </div>
                )}
              </div>
            );
          }
          case 'underline': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.underline}
                onClick={() => {
                  emitHandler('underline');
                }}
              >
                <Icon name="underline" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.underline}
                  </div>
                )}
              </div>
            );
          }
          case 'italic': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.italic}
                onClick={() => {
                  emitHandler('italic');
                }}
              >
                <Icon name="italic" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.italic}
                  </div>
                )}
              </div>
            );
          }
          case 'strikeThrough': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.strikeThrough}
                onClick={() => {
                  emitHandler('strikeThrough');
                }}
              >
                <Icon name="strike-through" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.strikeThrough}
                  </div>
                )}
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
                disabled={disabled?.value}
                overlay={
                  <ul
                    class={`${prefix}-menu`}
                    onClick={() => {
                      visible.title = false;
                    }}
                    role="menu"
                  >
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-title`}
                      onClick={() => {
                        emitHandler('h1');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.titleItem?.h1}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-title`}
                      onClick={() => {
                        emitHandler('h2');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.titleItem?.h2}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-title`}
                      onClick={() => {
                        emitHandler('h3');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.titleItem?.h3}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-title`}
                      onClick={() => {
                        emitHandler('h4');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.titleItem?.h4}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-title`}
                      onClick={() => {
                        emitHandler('h5');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.titleItem?.h5}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-title`}
                      onClick={() => {
                        emitHandler('h6');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.titleItem?.h6}
                    </li>
                  </ul>
                }
              >
                <div
                  class={[
                    `${prefix}-toolbar-item`,
                    disabled?.value && `${prefix}-disabled`
                  ]}
                  title={ult.value.toolbarTips?.title}
                >
                  <Icon name="title" />

                  {props.showToolbarName && (
                    <div class={`${prefix}-toolbar-item-name`}>
                      {ult.value.toolbarTips?.title}
                    </div>
                  )}
                </div>
              </Dropdown>
            );
          }
          case 'sub': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.sub}
                onClick={() => {
                  emitHandler('sub');
                }}
              >
                <Icon name="sub" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.sub}
                  </div>
                )}
              </div>
            );
          }
          case 'sup': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.sup}
                onClick={() => {
                  emitHandler('sup');
                }}
              >
                <Icon name="sup" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.sup}
                  </div>
                )}
              </div>
            );
          }
          case 'quote': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.quote}
                onClick={() => {
                  emitHandler('quote');
                }}
              >
                <Icon name="quote" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.quote}
                  </div>
                )}
              </div>
            );
          }

          case 'unorderedList': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.unorderedList}
                onClick={() => {
                  emitHandler('unorderedList');
                }}
              >
                <Icon name="unordered-list" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.unorderedList}
                  </div>
                )}
              </div>
            );
          }
          case 'orderedList': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.orderedList}
                onClick={() => {
                  emitHandler('orderedList');
                }}
              >
                <Icon name="ordered-list" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.orderedList}
                  </div>
                )}
              </div>
            );
          }

          case 'task': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.task}
                onClick={() => {
                  emitHandler('task');
                }}
              >
                <Icon name="task" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.task}
                  </div>
                )}
              </div>
            );
          }

          case 'codeRow': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.codeRow}
                onClick={() => {
                  emitHandler('codeRow');
                }}
              >
                <Icon name="code-row" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.codeRow}
                  </div>
                )}
              </div>
            );
          }
          case 'code': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.code}
                onClick={() => {
                  emitHandler('code');
                }}
              >
                <Icon name="code" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.code}
                  </div>
                )}
              </div>
            );
          }
          case 'link': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.link}
                onClick={() => {
                  if (disabled?.value) {
                    return false;
                  }

                  emitHandler('link');
                }}
              >
                <Icon name="link" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.link}
                  </div>
                )}
              </div>
            );
          }
          case 'image': {
            return props.noUploadImg ? (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.image}
                onClick={() => {
                  if (disabled?.value) {
                    return false;
                  }

                  emitHandler('image');
                }}
              >
                <Icon name="image" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.image}
                  </div>
                )}
              </div>
            ) : (
              <Dropdown
                relative={`#${wrapperId}`}
                visible={visible.image}
                onChange={(v) => {
                  visible.image = v;
                }}
                disabled={disabled?.value}
                overlay={
                  <ul
                    class={`${prefix}-menu`}
                    onClick={() => {
                      visible.image = false;
                    }}
                    role="menu"
                  >
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-image`}
                      onClick={() => {
                        emitHandler('image');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.imgTitleItem?.link}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-image`}
                      onClick={() => {
                        (uploadRef.value as HTMLInputElement).click();
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.imgTitleItem?.upload}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-image`}
                      onClick={() => {
                        clipVisible.value = true;
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.imgTitleItem?.clip2upload}
                    </li>
                  </ul>
                }
              >
                {
                  <div
                    class={[
                      `${prefix}-toolbar-item`,
                      disabled?.value && `${prefix}-disabled`
                    ]}
                    title={ult.value.toolbarTips?.image}
                  >
                    <Icon name="image" />

                    {props.showToolbarName && (
                      <div class={`${prefix}-toolbar-item-name`}>
                        {ult.value.toolbarTips?.image}
                      </div>
                    )}
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
                disabled={disabled?.value}
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
                  class={[
                    `${prefix}-toolbar-item`,
                    disabled?.value && `${prefix}-disabled`
                  ]}
                  title={ult.value.toolbarTips?.table}
                >
                  <Icon name="table" />

                  {props.showToolbarName && (
                    <div class={`${prefix}-toolbar-item-name`}>
                      {ult.value.toolbarTips?.table}
                    </div>
                  )}
                </div>
              </Dropdown>
            );
          }
          case 'revoke': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.revoke}
                onClick={() => {
                  if (disabled?.value) {
                    return false;
                  }
                  bus.emit(editorId, CTRL_Z);
                }}
              >
                <Icon name="revoke" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.revoke}
                  </div>
                )}
              </div>
            );
          }
          case 'next': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.next}
                onClick={() => {
                  if (disabled?.value) {
                    return false;
                  }
                  bus.emit(editorId, CTRL_SHIFT_Z);
                }}
              >
                <Icon name="next" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.next}
                  </div>
                )}
              </div>
            );
          }
          case 'save': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.save}
                onClick={() => {
                  if (disabled?.value) {
                    return false;
                  }
                  bus.emit(editorId, ON_SAVE);
                }}
              >
                <Icon name="save" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.save}
                  </div>
                )}
              </div>
            );
          }
          case 'prettier': {
            return !props.noPrettier ? (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.prettier}
                onClick={() => {
                  emitHandler('prettier');
                }}
              >
                <Icon name="prettier" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.prettier}
                  </div>
                )}
              </div>
            ) : (
              ''
            );
          }
          case 'pageFullscreen': {
            return (
              !props.setting.fullscreen && (
                <div
                  class={[
                    `${prefix}-toolbar-item`,
                    props.setting.pageFullscreen && `${prefix}-toolbar-active`,
                    disabled?.value && `${prefix}-disabled`
                  ]}
                  title={ult.value.toolbarTips?.pageFullscreen}
                  onClick={() => {
                    if (disabled?.value) {
                      return false;
                    }
                    props.updateSetting('pageFullscreen');
                  }}
                >
                  <Icon name={props.setting.pageFullscreen ? 'minimize' : 'maximize'} />

                  {props.showToolbarName && (
                    <div class={`${prefix}-toolbar-item-name`}>
                      {ult.value.toolbarTips?.pageFullscreen}
                    </div>
                  )}
                </div>
              )
            );
          }
          case 'fullscreen': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  props.setting.fullscreen && `${prefix}-toolbar-active`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.fullscreen}
                onClick={() => {
                  if (disabled?.value) {
                    return false;
                  }
                  fullscreenHandler();
                }}
              >
                <Icon
                  name={props.setting.fullscreen ? 'fullscreen-exit' : 'fullscreen'}
                />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.fullscreen}
                  </div>
                )}
              </div>
            );
          }
          case 'preview': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  props.setting.preview && `${prefix}-toolbar-active`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.preview}
                onClick={() => {
                  if (disabled?.value) {
                    return false;
                  }
                  props.updateSetting('preview');
                }}
              >
                <Icon name="preview" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.preview}
                  </div>
                )}
              </div>
            );
          }
          case 'previewOnly': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  props.setting.previewOnly && `${prefix}-toolbar-active`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.previewOnly}
                onClick={() => {
                  if (disabled?.value) {
                    return false;
                  }
                  props.updateSetting('previewOnly');
                }}
              >
                <Icon name="preview-only" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.previewOnly}
                  </div>
                )}
              </div>
            );
          }
          case 'htmlPreview': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  props.setting.htmlPreview && `${prefix}-toolbar-active`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.htmlPreview}
                onClick={() => {
                  if (disabled?.value) {
                    return false;
                  }
                  props.updateSetting('htmlPreview');
                }}
              >
                <Icon name="preview-html" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.htmlPreview}
                  </div>
                )}
              </div>
            );
          }
          case 'catalog': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  props.catalogVisible && `${prefix}-toolbar-active`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.catalog}
                onClick={() => {
                  if (disabled?.value) {
                    return false;
                  }
                  bus.emit(editorId, CHANGE_CATALOG_VISIBLE);
                }}
                key="bar-catalog"
              >
                <Icon name="catalog" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.catalog}
                  </div>
                )}
              </div>
            );
          }
          case 'github': {
            return (
              <div
                class={[
                  `${prefix}-toolbar-item`,
                  disabled?.value && `${prefix}-disabled`
                ]}
                title={ult.value.toolbarTips?.github}
                onClick={() => {
                  if (disabled?.value) {
                    return false;
                  }
                  linkTo('https://github.com/imzbf/md-editor-v3');
                }}
              >
                <Icon name="github" />

                {props.showToolbarName && (
                  <div class={`${prefix}-toolbar-item-name`}>
                    {ult.value.toolbarTips?.github}
                  </div>
                )}
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
                disabled={disabled?.value}
                overlay={
                  <ul
                    class={`${prefix}-menu`}
                    onClick={() => {
                      visible.mermaid = false;
                    }}
                    role="menu"
                  >
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
                      onClick={() => {
                        emitHandler('flow');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.mermaid?.flow}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
                      onClick={() => {
                        emitHandler('sequence');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.mermaid?.sequence}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
                      onClick={() => {
                        emitHandler('gantt');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.mermaid?.gantt}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
                      onClick={() => {
                        emitHandler('class');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.mermaid?.class}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
                      onClick={() => {
                        emitHandler('state');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.mermaid?.state}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
                      onClick={() => {
                        emitHandler('pie');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.mermaid?.pie}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
                      onClick={() => {
                        emitHandler('relationship');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.mermaid?.relationship}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
                      onClick={() => {
                        emitHandler('journey');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.mermaid?.journey}
                    </li>
                  </ul>
                }
                key="bar-mermaid"
              >
                <div
                  class={[
                    `${prefix}-toolbar-item`,
                    disabled?.value && `${prefix}-disabled`
                  ]}
                  title={ult.value.toolbarTips?.mermaid}
                >
                  <Icon name="mermaid" />

                  {props.showToolbarName && (
                    <div class={`${prefix}-toolbar-item-name`}>
                      {ult.value.toolbarTips?.mermaid}
                    </div>
                  )}
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
                disabled={disabled?.value}
                overlay={
                  <ul
                    class={`${prefix}-menu`}
                    onClick={() => {
                      visible.katex = false;
                    }}
                    role="menu"
                  >
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-katex`}
                      onClick={() => {
                        emitHandler('katexInline');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.katex?.inline}
                    </li>
                    <li
                      class={`${prefix}-menu-item ${prefix}-menu-item-katex`}
                      onClick={() => {
                        emitHandler('katexBlock');
                      }}
                      role="menuitem"
                      tabindex="0"
                    >
                      {ult.value.katex?.block}
                    </li>
                  </ul>
                }
                key="bar-katex"
              >
                <div
                  class={[
                    `${prefix}-toolbar-item`,
                    disabled?.value && `${prefix}-disabled`
                  ]}
                  title={ult.value.toolbarTips?.katex}
                >
                  <Icon name="formula" />

                  {props.showToolbarName && (
                    <div class={`${prefix}-toolbar-item-name`}>
                      {ult.value.toolbarTips?.katex}
                    </div>
                  )}
                </div>
              </Dropdown>
            );
          }
        }
      } else if (props.defToolbars instanceof Array) {
        // vue3模板，插槽内容永远是个数组对象
        const defItem = props.defToolbars[barItem as number];

        if (defItem) {
          const defItemCloned = cloneVNode(defItem, {
            theme: defItem.props?.theme || theme.value,
            previewTheme: defItem.props?.theme || previewTheme.value,
            language: defItem.props?.theme || language.value,
            codeTheme: defItem.props?.codeTheme || props.codeTheme,
            disabled: defItem.props?.disabled || disabled?.value,
            showToolbarName: defItem.props?.showToolbarName || props.showToolbarName,
            insert(generate: InsertContentGenerator) {
              bus.emit(editorId, REPLACE, 'universal', { generate });
            }
          });
          return defItemCloned;
        }

        return '';
      } else if (props.defToolbars && props.defToolbars.children instanceof Array) {
        // jsx语法，<></>包裹下，defToolbars是包裹插槽内容的对象
        const defItem = props.defToolbars.children[barItem as number] as VNode;

        if (defItem) {
          const defItemCloned = cloneVNode(defItem, {
            theme: defItem.props?.theme || theme.value,
            previewTheme: defItem.props?.theme || previewTheme.value,
            language: defItem.props?.theme || language.value,
            codeTheme: defItem.props?.codeTheme || props.codeTheme,
            disabled: defItem.props?.disabled || disabled?.value,
            showToolbarName: defItem.props?.showToolbarName || props.showToolbarName,
            insert(generate: InsertContentGenerator) {
              bus.emit(editorId, REPLACE, 'universal', { generate });
            }
          });
          return defItemCloned;
        }

        return '';
      } else {
        return '';
      }
    };

    watch(
      () => props.toolbars,
      () => {
        void nextTick(() => {
          if (wrapperRef.value) {
            draggingScroll(wrapperRef.value);
          }
        });
      },
      { immediate: true }
    );

    return () => {
      const LeftBar = splitedbar.value[0].map((barItem) => barRender(barItem));
      const RightBar = splitedbar.value[1].map((barItem) => barRender(barItem));

      return (
        <>
          {props.toolbars.length > 0 && (
            <div class={`${prefix}-toolbar-wrapper`} ref={wrapperRef} id={wrapperId}>
              <div
                class={[`${prefix}-toolbar`, props.showToolbarName && `${prefix}-stn`]}
              >
                <div class={`${prefix}-toolbar-left`} ref={toolbarLeftRef}>
                  {LeftBar}
                </div>
                <div class={`${prefix}-toolbar-right`}>{RightBar}</div>
              </div>
            </div>
          )}
          <label
            for={`${wrapperId}_label`}
            style={{ display: 'none' }}
            aria-label={ult.value.imgTitleItem?.upload}
          ></label>
          <input
            id={`${wrapperId}_label`}
            ref={uploadRef}
            accept="image/*"
            type="file"
            multiple={true}
            style={{ display: 'none' }}
          />
          <Modals
            clipVisible={clipVisible.value}
            onCancel={() => {
              clipVisible.value = false;
            }}
            onOk={(data) => {
              if (data) {
                emitHandler('image', {
                  desc: data.desc,
                  url: data.url,
                  transform: true
                });
              }
              clipVisible.value = false;
            }}
          />
        </>
      );
    };
  }
});
