import { defineComponent, PropType, SetupContext, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import { getSlot } from '~/utils/vue-tsx';
import { prefix } from '~/config';

const props = {
  onClick: {
    type: Function as PropType<(e: MouseEvent) => void>
  }
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
