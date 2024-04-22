import {
  defineComponent,
  PropType,
  inject,
  SetupContext,
  ExtractPropTypes,
  VNode
} from 'vue';
import { LooseRequired } from '@vue/shared';
import { prefix } from '~/config';
import { getSlot } from '~/utils/vue-tsx';
import Dropdown from '~/components/Dropdown';
import { Themes } from '~/type';

const props = {
  title: {
    type: String as PropType<string>,
    default: ''
  },
  visible: {
    type: Boolean as PropType<boolean>
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object] as PropType<string | VNode>
  },
  onChange: {
    type: Function as PropType<(visible: boolean) => void>
  },
  // 下拉框中的内容
  overlay: {
    type: [String, Object] as PropType<string | VNode>
  },
  /**
   * ==没有意义，仅用于规避克隆组件自动嵌入insert方法时，传入的是该组件而产生的waring
   */
  insert: {
    type: Function as PropType<() => void>
  },
  language: {
    type: String as PropType<string>
  },
  theme: {
    type: String as PropType<Themes>
  },
  /**
   * ==结束
   */
  default: {
    type: [String, Object] as PropType<string | Element>
  }
};

type DropdownToolbarProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof props>>>
>;

export default defineComponent({
  name: 'DropdownToolbar',
  props,
  emits: ['onChange'],
  setup(props: DropdownToolbarProps, ctx: SetupContext<Array<'onChange'>>) {
    const editorId = inject('editorId');

    return () => {
      const Trigger = getSlot({ props, ctx }, 'trigger');
      const Overlay = getSlot({ props, ctx }, 'overlay');
      const Default = getSlot({ props, ctx });

      return (
        <Dropdown
          relative={`#${editorId}-toolbar-wrapper`}
          visible={props.visible}
          onChange={(v) => {
            if (props.onChange instanceof Function) {
              props.onChange(v);
            } else {
              ctx.emit('onChange', v);
            }
          }}
          overlay={Overlay}
        >
          <div class={`${prefix}-toolbar-item`} title={props.title || ''}>
            {Trigger}
            {Default}
          </div>
        </Dropdown>
      );
    };
  }
});
