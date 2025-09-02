// eslint-disable-next-line vue/prefer-import-from-vue
import { LooseRequired } from '@vue/shared';
import { PropType, ExtractPropTypes } from 'vue';
import { ToolbarNames } from '~/type';

export const toolbarProps = {
  // 工具栏选择显示
  toolbars: {
    type: Array as PropType<Array<ToolbarNames>>,
    default: () => []
  },
  // 工具栏选择不显示
  toolbarsExclude: {
    type: Array as PropType<Array<ToolbarNames>>,
    default: () => []
  }
};

export type ToolbarProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof toolbarProps>>>
>;
