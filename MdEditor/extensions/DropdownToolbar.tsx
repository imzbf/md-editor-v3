import { defineComponent, PropType, inject, SetupContext, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import { prefix } from '../config';
import { getSlot } from '../utils/vue-tsx';
import Dropdown from '../components/Dropdown';

const dropdownToolbarProps = () => ({
  title: {
    type: String as PropType<string>,
    default: ''
  },
  visible: {
    type: Boolean as PropType<boolean>
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object] as PropType<string | JSX.Element>
  },
  onChange: {
    type: Function as PropType<(visible: boolean) => void>
  },
  // 下拉框中的内容
  overlay: {
    type: [String, Object] as PropType<string | JSX.Element>
  }
});

type DropdownToolbarProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<ReturnType<typeof dropdownToolbarProps>>>>
>;

export default defineComponent({
  name: 'DropdownToolbar',
  props: dropdownToolbarProps(),
  emits: ['onChange'],
  setup(props: DropdownToolbarProps, ctx: SetupContext<Array<'onChange'>>) {
    const editorId = inject('editorId');

    return () => {
      const Trigger = getSlot({ props, ctx }, 'trigger');
      const Overlay = getSlot({ props, ctx }, 'overlay');

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
          </div>
        </Dropdown>
      );
    };
  }
});
