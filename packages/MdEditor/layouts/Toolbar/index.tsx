import { draggingScroll } from '@vavt/util';
import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  ref,
  cloneVNode,
  VNode,
  watch,
  nextTick,
  provide
} from 'vue';
import Divider from '~/components/Divider';
import { allToolbar, prefix } from '~/config';
import { REPLACE } from '~/static/event-name';
import { InsertContentGenerator, PreviewThemes, Themes, ToolbarNames } from '~/type';
import bus from '~/utils/event-bus';
import { toolbarProps as props, ToolbarProps } from './props';
import ToolbarBold from './tools/Bold';
import ToolbarCatalog from './tools/Catalog';
import ToolbarCode from './tools/Code';
import ToolbarCodeRow from './tools/CodeRow';
import ToolbarFullscreen from './tools/Fullscreen';
import ToolbarGithub from './tools/Github';
import ToolbarHtmlPreview from './tools/HtmlPreview';
import ToolbarImage from './tools/Image';
import ToolbarImageDropdown from './tools/ImageDropdown';
import ToolbarItalic from './tools/Italic';
import ToolbarKatex from './tools/Katex';
import ToolbarLink from './tools/Link';
import ToolbarMermaid from './tools/Mermaid';
import ToolbarNext from './tools/Next';
import ToolbarOrderedList from './tools/OrderedList';
import ToolbarPageFullscreen from './tools/PageFullscreen';
import ToolbarPrettier from './tools/Prettier';
import ToolbarPreview from './tools/Preview';
import ToolbarPreviewOnly from './tools/PreviewOnly';
import ToolbarQuote from './tools/Quote';
import ToolbarRevoke from './tools/Revoke';
import ToolbarSave from './tools/Save';
import ToolbarStrikeThrough from './tools/StrikeThrough';
import ToolbarSub from './tools/Sub';
import ToolbarSup from './tools/Sup';
import ToolbarTable from './tools/Table';
import ToolbarTask from './tools/Task';
import ToolbarTitle from './tools/Title';
import ToolbarUnderline from './tools/Underline';
import ToolbarUnorderedList from './tools/UnorderedList';

export default defineComponent({
  name: 'MDEditorToolbar',
  props,
  setup(props: ToolbarProps) {
    // 获取Id
    const editorId = inject('editorId') as string;
    // 主题
    const theme = inject('theme') as ComputedRef<Themes>;
    // 预览主题
    const previewTheme = inject('previewTheme') as ComputedRef<PreviewThemes>;
    //语言
    const language = inject('language') as ComputedRef<string>;
    const disabled = inject<ComputedRef<boolean>>('disabled');

    provide(
      'showToolbarName',
      computed(() => props.showToolbarName)
    );

    // wrapper ID
    const wrapperId = `${editorId}-toolbar-wrapper`;

    const wrapperRef = ref<HTMLDivElement>();

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

    const barRender = (barItem: ToolbarNames) => {
      if (allToolbar.includes(barItem as string)) {
        switch (barItem) {
          case '-': {
            return <Divider />;
          }
          case 'bold': {
            return <ToolbarBold />;
          }
          case 'underline': {
            return <ToolbarUnderline />;
          }
          case 'italic': {
            return <ToolbarItalic />;
          }
          case 'strikeThrough': {
            return <ToolbarStrikeThrough />;
          }
          case 'title': {
            return <ToolbarTitle />;
          }
          case 'sub': {
            return <ToolbarSub />;
          }
          case 'sup': {
            return <ToolbarSup />;
          }
          case 'quote': {
            return <ToolbarQuote />;
          }
          case 'unorderedList': {
            return <ToolbarUnorderedList />;
          }
          case 'orderedList': {
            return <ToolbarOrderedList />;
          }
          case 'task': {
            return <ToolbarTask />;
          }
          case 'codeRow': {
            return <ToolbarCodeRow />;
          }
          case 'code': {
            return <ToolbarCode />;
          }
          case 'link': {
            return <ToolbarLink />;
          }
          case 'image': {
            return props.noUploadImg ? <ToolbarImage /> : <ToolbarImageDropdown />;
          }
          case 'table': {
            return <ToolbarTable tableShape={props.tableShape} />;
          }
          case 'revoke': {
            return <ToolbarRevoke />;
          }
          case 'next': {
            return <ToolbarNext />;
          }
          case 'save': {
            return <ToolbarSave />;
          }
          case 'prettier': {
            return !props.noPrettier && <ToolbarPrettier />;
          }
          case 'pageFullscreen': {
            return (
              !props.setting.fullscreen && (
                <ToolbarPageFullscreen
                  setting={props.setting}
                  updateSetting={props.updateSetting}
                />
              )
            );
          }
          case 'fullscreen': {
            return (
              <ToolbarFullscreen
                setting={props.setting}
                updateSetting={props.updateSetting}
              />
            );
          }
          case 'preview': {
            return (
              <ToolbarPreview
                setting={props.setting}
                updateSetting={props.updateSetting}
              />
            );
          }
          case 'previewOnly': {
            return (
              <ToolbarPreviewOnly
                setting={props.setting}
                updateSetting={props.updateSetting}
              />
            );
          }
          case 'htmlPreview': {
            return (
              <ToolbarHtmlPreview
                setting={props.setting}
                updateSetting={props.updateSetting}
              />
            );
          }
          case 'catalog': {
            return <ToolbarCatalog catalogVisible={props.catalogVisible} />;
          }
          case 'github': {
            return <ToolbarGithub />;
          }
          case 'mermaid': {
            return <ToolbarMermaid />;
          }
          case 'katex': {
            return <ToolbarKatex />;
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
        </>
      );
    };
  }
});
