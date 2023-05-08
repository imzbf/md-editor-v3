import { PropType, CSSProperties, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import { StaticTextDefaultKey, PreviewThemes, Themes } from '~/type';

import { defaultEditorId } from '~/config';

import { contentPreviewProps } from '~/layouts/Content/ContentPreview';

const residueProps = {
  /**
   * 主题，支持light和dark
   *
   * @default 'light'
   */
  theme: {
    type: String as PropType<Themes>,
    default: 'light'
  },
  /**
   * 外层类名
   *
   * @default ''
   */
  class: {
    type: String,
    default: ''
  },
  /**
   * 仅预览模式，不显示toolbar和编辑框
   *
   * @default false
   */
  previewOnly: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 预设语言名称
   *
   * @default 'zh-CN'
   */
  language: {
    type: String as PropType<StaticTextDefaultKey | string>,
    default: 'zh-CN'
  },
  /**
   * 格式化md
   *
   * @default true
   */
  noPrettier: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 编辑器唯一标识
   *
   * @default 'md-editor-v3'
   */
  editorId: {
    type: String as PropType<string>,
    default: defaultEditorId
  },
  /**
   * 预览中代码是否显示行号
   *
   * @default false
   */
  showCodeRowNumber: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 预览内容样式
   *
   * @default 'default'
   */
  previewTheme: {
    type: String as PropType<PreviewThemes>,
    default: 'default'
  },
  /**
   * 编辑器样式
   */
  style: {
    type: Object as PropType<CSSProperties | string>,
    default: () => ({})
  },
  /**
   * 代码主题
   *
   * @default 'atom'
   */
  codeTheme: {
    type: String as PropType<string>,
    default: 'atom'
  },
  /**
   * 不插入iconfont链接
   *
   * @default false
   */
  noIconfont: {
    type: Boolean as PropType<boolean>
  },
  /**
   * 某些预览主题的代码模块背景是暗色系
   * 将这个属性设置为true，会自动在该主题下的light模式下使用暗色系的代码风格
   *
   * @default true
   */
  codeStyleReverse: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   * 需要自动调整的预览主题
   *
   * @default ['default', 'mk-cute']
   */
  codeStyleReverseList: {
    type: Array as PropType<Array<string>>,
    default: ['default', 'mk-cute']
  }
};

export const mdPreviewProps = {
  ...contentPreviewProps,
  ...residueProps
};

export type MdPreviewProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof mdPreviewProps>>>
>;
