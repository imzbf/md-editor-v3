import { PropType, VNode, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import { ToolbarNames, SettingType } from '../../type';

export const toolbarProps = () => ({
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
    type: Function as PropType<(v: boolean, k: keyof SettingType) => void>,
    default: () => () => {}
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
  }
});

export type ToolbarProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<ReturnType<typeof toolbarProps>>>>
>;
