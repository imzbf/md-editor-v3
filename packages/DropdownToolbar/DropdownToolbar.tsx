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
import { PreviewThemes, Themes } from '~/type';

const props = {
  title: {
    type: String as PropType<string>,
    default: ''
  },
  visible: {
    type: Boolean as PropType<boolean>,
    default: undefined
  },
  /**
   * 展示在工具栏的内容，通常是个图标
   *
   * @deprecated 使用默认插槽代替
   */
  trigger: {
    type: [String, Object] as PropType<string | VNode>,
    default: undefined
  },
  onChange: {
    type: Function as PropType<(visible: boolean) => void>,
    default: undefined
  },
  // 下拉框中的内容
  overlay: {
    type: [String, Object] as PropType<string | VNode>,
    default: undefined
  },
  /**
   * ==没有意义，仅用于规避克隆组件自动嵌入insert方法时，传入的是该组件而产生的waring
   */
  insert: {
    type: Function as PropType<() => void>,
    default: undefined
  },
  language: {
    type: String as PropType<string>,
    default: undefined
  },
  theme: {
    type: String as PropType<Themes>,
    default: undefined
  },
  previewTheme: {
    type: String as PropType<PreviewThemes>,
    default: undefined
  },
  codeTheme: {
    type: String as PropType<string>,
    default: undefined
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: undefined
  },
  showToolbarName: {
    type: Boolean as PropType<boolean>,
    default: undefined
  }
  /**
   * ==结束
   */
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
          disabled={props.disabled}
        >
          <div
            class={[`${prefix}-toolbar-item`, props.disabled && `${prefix}-disabled`]}
            title={props.title || ''}
          >
            {Default || Trigger}
          </div>
        </Dropdown>
      );
    };
  }
});
