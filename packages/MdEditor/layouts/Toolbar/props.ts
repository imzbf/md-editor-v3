import { PropType, VNode, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import { ToolbarNames, SettingType, UpdateSetting } from '~/type';

export const toolbarProps = {
  noPrettier: {
    type: Boolean as PropType<boolean>
  },
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
    type: Function as PropType<UpdateSetting>,
    default: () => {}
  },
  tableShape: {
    type: Array as PropType<Array<number>>,
    default: () => [6, 4]
  },
  defToolbars: {
    type: Object as PropType<VNode>
  },
  noUploadImg: {
    type: Boolean as PropType<boolean>
  },
  /**
   * 是否在工具栏下面显示对应的文字名称
   *
   * @default false
   */
  showToolbarName: {
    type: Boolean as PropType<boolean>
  },
  catalogVisible: {
    type: Boolean as PropType<boolean>
  },
  codeTheme: {
    type: String as PropType<string>
  },
  insertLinkDirect: {
    type: Boolean as PropType<boolean>
  }
};

export type ToolbarProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof toolbarProps>>>
>;
