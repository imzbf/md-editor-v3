import { defineComponent, PropType, SetupContext } from 'vue';
import { prefix } from '~/config';
import { Themes } from '~/type';
import { getSlot } from '~/utils/vue-tsx';

const props = {
  onClick: {
    type: Function as PropType<(e: MouseEvent) => void>,
    default: undefined
  },
  /**
   * ==没有意义，仅用于规避克隆组件自动嵌入insert方法时，传入的是该组件而产生的waring
   */
  language: {
    type: String as PropType<string>,
    default: undefined
  },
  theme: {
    type: String as PropType<Themes>,
    default: undefined
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: undefined
  }
  /**
   * ==结束
   */
};

export default defineComponent({
  name: 'NormalFooterToolbar',
  props,
  emits: ['onClick'],
  setup(props, ctx: SetupContext<Array<'onClick'>>) {
    return () => {
      const Children = getSlot({ props, ctx });

      return (
        <div
          class={[`${prefix}-footer-item`, props.disabled && `${prefix}-disabled`]}
          onClick={(e) => {
            if (props.disabled) return;

            props.onClick?.(e);
            ctx.emit('onClick', e);
          }}
        >
          {Children}
        </div>
      );
    };
  }
});
