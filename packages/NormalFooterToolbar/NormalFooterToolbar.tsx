import { defineComponent, PropType, SetupContext, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import { getSlot } from '~/utils/vue-tsx';
import { prefix } from '~/config';
import { Themes } from '~/type';

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

type NormalFooterToolbar = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof props>>>
>;

export default defineComponent({
  name: 'NormalFooterToolbar',
  props,
  emits: ['onClick'],
  setup(props: NormalFooterToolbar, ctx: SetupContext<Array<'onClick'>>) {
    return () => {
      const Children = getSlot({ props, ctx });

      return (
        <div
          class={`${prefix}-footer-item`}
          onClick={(e) => {
            if (props.onClick instanceof Function) {
              props.onClick(e);
            } else {
              ctx.emit('onClick', e);
            }
          }}
        >
          {Children}
        </div>
      );
    };
  }
});
