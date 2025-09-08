import { onMounted, inject, ref, ComputedRef, cloneVNode, VNode } from 'vue';
import Divider from '~/components/Divider';
import { globalConfig } from '~/config';
import { allToolbar } from '~/config';
import { CDN_IDS } from '~/static';
import { CHANGE_FULL_SCREEN, ERROR_CATCHER } from '~/static/event-name';
import { REPLACE } from '~/static/event-name';
import {
  InsertContentGenerator,
  PreviewThemes,
  SettingType,
  Themes,
  ToolbarNames,
  UpdateSetting
} from '~/type';
import { appendHandler } from '~/utils/dom';
import bus from '~/utils/event-bus';

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

export const useSreenfull = () => {
  const editorId = inject('editorId') as string;
  const setting = inject('setting') as ComputedRef<SettingType>;
  const updateSetting = inject('updateSetting') as UpdateSetting;

  const { editorExtensions, editorExtensionsAttrs } = globalConfig;
  let screenfull = editorExtensions.screenfull!.instance;
  // 是否组件内部全屏标识
  const screenfullMe = ref(false);

  // 触发器
  const fullscreenHandler = (status?: boolean) => {
    if (!screenfull) {
      bus.emit(editorId, ERROR_CATCHER, {
        name: 'fullscreen',
        message: 'fullscreen is undefined'
      });
      return;
    }

    if (screenfull.isEnabled) {
      screenfullMe.value = true;

      const targetStatus = status === undefined ? !screenfull.isFullscreen : status;
      if (targetStatus) {
        screenfull.request();
      } else {
        screenfull.exit();
      }
    } else {
      console.error('browser does not support screenfull!');
    }
  };

  // 挂载监听事件
  const onScreenfullEvent = () => {
    if (screenfull && screenfull.isEnabled) {
      screenfull.on('change', () => {
        if (screenfullMe.value || setting.value.fullscreen) {
          screenfullMe.value = false;
          updateSetting('fullscreen');
        }
      });
    }
  };

  const screenfullLoad = () => {
    // 复制实例
    screenfull = window.screenfull;
    // 重新监听
    onScreenfullEvent();
  };

  onMounted(() => {
    onScreenfullEvent();

    if (!screenfull) {
      appendHandler(
        'script',
        {
          ...editorExtensionsAttrs.screenfull?.js,
          src: editorExtensions.screenfull!.js,
          id: CDN_IDS.screenfull,
          onload: screenfullLoad
        },
        'screenfull'
      );
    }
  });

  onMounted(() => {
    // 注册切换全屏监听
    bus.on(editorId, {
      name: CHANGE_FULL_SCREEN,
      callback: fullscreenHandler
    });
  });

  return { fullscreenHandler };
};

let splitNum = 0;

export const useBarRender = () => {
  const editorId = inject('editorId') as string;
  const theme = inject('theme') as ComputedRef<Themes>;
  const previewTheme = inject('previewTheme') as ComputedRef<PreviewThemes>;
  const language = inject('language') as ComputedRef<string>;
  const disabled = inject('disabled') as ComputedRef<boolean>;
  const noUploadImg = inject('noUploadImg') as boolean;
  const noPrettier = inject('noPrettier') as boolean;
  const codeTheme = inject('codeTheme') as ComputedRef<string>;
  const showToolbarName = inject('showToolbarName') as ComputedRef<boolean>;
  const setting = inject('setting') as ComputedRef<SettingType>;
  const defToolbars = inject('defToolbars') as ComputedRef<VNode | VNode[]>;

  const barRender = (barItem: ToolbarNames) => {
    if (allToolbar.includes(barItem as string)) {
      switch (barItem) {
        case '-': {
          return <Divider key={`bar-${splitNum++}`} />;
        }
        case 'bold': {
          return <ToolbarBold key="bar-bold" />;
        }
        case 'underline': {
          return <ToolbarUnderline key="bar-unorderline" />;
        }
        case 'italic': {
          return <ToolbarItalic key="bar-italic" />;
        }
        case 'strikeThrough': {
          return <ToolbarStrikeThrough key="bar-strikeThrough" />;
        }
        case 'title': {
          return <ToolbarTitle key="bar-title" />;
        }
        case 'sub': {
          return <ToolbarSub key="bar-sub" />;
        }
        case 'sup': {
          return <ToolbarSup key="bar-sup" />;
        }
        case 'quote': {
          return <ToolbarQuote key="bar-quote" />;
        }
        case 'unorderedList': {
          return <ToolbarUnorderedList key="bar-unorderedList" />;
        }
        case 'orderedList': {
          return <ToolbarOrderedList key="bar-orderedList" />;
        }
        case 'task': {
          return <ToolbarTask key="bar-task" />;
        }
        case 'codeRow': {
          return <ToolbarCodeRow key="bar-codeRow" />;
        }
        case 'code': {
          return <ToolbarCode key="bar-code" />;
        }
        case 'link': {
          return <ToolbarLink key="bar-link" />;
        }
        case 'image': {
          return noUploadImg ? (
            <ToolbarImage key="bar-image" />
          ) : (
            <ToolbarImageDropdown key="bar-imageDropdown" />
          );
        }
        case 'table': {
          return <ToolbarTable key="bar-table" />;
        }
        case 'revoke': {
          return <ToolbarRevoke key="bar-revoke" />;
        }
        case 'next': {
          return <ToolbarNext key="bar-next" />;
        }
        case 'save': {
          return <ToolbarSave key="bar-save" />;
        }
        case 'prettier': {
          return noPrettier && <ToolbarPrettier key="bar-prettier" />;
        }
        case 'pageFullscreen': {
          return (
            !setting.value.fullscreen && (
              <ToolbarPageFullscreen key="bar-pageFullscreen" />
            )
          );
        }
        case 'fullscreen': {
          return <ToolbarFullscreen key="bar-fullscreen" />;
        }
        case 'catalog': {
          return <ToolbarCatalog key="bar-catalog" />;
        }
        case 'preview': {
          return <ToolbarPreview key="bar-preview" />;
        }
        case 'previewOnly': {
          return <ToolbarPreviewOnly key="bar-previewOnly" />;
        }
        case 'htmlPreview': {
          return <ToolbarHtmlPreview key="bar-htmlPreview" />;
        }
        case 'github': {
          return <ToolbarGithub key="bar-github" />;
        }
        case 'mermaid': {
          return <ToolbarMermaid key="bar-mermaid" />;
        }
        case 'katex': {
          return <ToolbarKatex key="bar-katex" />;
        }
      }
    } else if (defToolbars.value instanceof Array) {
      // vue3模板，插槽内容永远是个数组对象
      const defItem = defToolbars.value[barItem as number];

      if (defItem) {
        const defItemCloned = cloneVNode(defItem, {
          theme: defItem.props?.theme || theme.value,
          previewTheme: defItem.props?.theme || previewTheme.value,
          language: defItem.props?.theme || language.value,
          codeTheme: defItem.props?.codeTheme || codeTheme.value,
          disabled: defItem.props?.disabled || disabled.value,
          showToolbarName: defItem.props?.showToolbarName || showToolbarName.value,
          insert(generate: InsertContentGenerator) {
            bus.emit(editorId, REPLACE, 'universal', { generate });
          }
        });
        return defItemCloned;
      }

      return '';
    } else if (defToolbars.value?.children instanceof Array) {
      // jsx语法，<></>包裹下，defToolbars是包裹插槽内容的对象
      const defItem = defToolbars.value.children[barItem as number] as VNode;

      if (defItem) {
        const defItemCloned = cloneVNode(defItem, {
          theme: defItem.props?.theme || theme.value,
          previewTheme: defItem.props?.theme || previewTheme.value,
          language: defItem.props?.theme || language.value,
          codeTheme: defItem.props?.codeTheme || codeTheme.value,
          disabled: defItem.props?.disabled || disabled.value,
          showToolbarName: defItem.props?.showToolbarName || showToolbarName.value,
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

  return {
    barRender
  };
};
