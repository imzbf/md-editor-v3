import { defineComponent, PropType, SetupContext, VNode } from 'vue';
import { prefix } from '~/config';
import { PreviewThemes, Themes } from '~/type';
import { getSlot } from '~/utils/vue-tsx';

const props = {
  title: {
    type: String as PropType<string>,
    default: ''
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
  onClick: {
    type: Function as PropType<(e: MouseEvent) => void>,
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

export default defineComponent({
  name: 'NormalToolbar',
  props,
  emits: ['onClick'],
  setup(props, ctx: SetupContext<Array<'onClick'>>) {
    return () => {
      const Trigger = getSlot({ props, ctx }, 'trigger');
      const Default = getSlot({ props, ctx });

      return (
        <div
          class={[`${prefix}-toolbar-item`, props.disabled && `${prefix}-disabled`]}
          title={props.title}
          onClick={(e) => {
            if (props.disabled) return;

            props.onClick?.(e);
            ctx.emit('onClick', e);
          }}
        >
          {Default || Trigger}
        </div>
      );
    };
  }
});
