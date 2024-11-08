import { defineComponent, PropType, SetupContext, ExtractPropTypes, VNode } from 'vue';
import { LooseRequired } from '@vue/shared';
import { prefix } from '~/config';
import { getSlot } from '~/utils/vue-tsx';
import { PreviewThemes, Themes } from '~/type';

const props = {
  title: {
    type: String as PropType<string>,
    default: ''
  },
  // 展示在工具栏的内容，通常是个图标
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
  }
  /**
   * ==结束
   */
};

type NormalToolbarProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof props>>>
>;

export default defineComponent({
  name: 'NormalToolbar',
  props,
  emits: ['onClick'],
  setup(props: NormalToolbarProps, ctx: SetupContext<Array<'onClick'>>) {
    return () => {
      const Trigger = getSlot({ props, ctx }, 'trigger');

      return (
        <div
          class={`${prefix}-toolbar-item`}
          title={props.title}
          onClick={(e) => {
            if (props.onClick instanceof Function) {
              props.onClick(e);
            } else {
              ctx.emit('onClick', e);
            }
          }}
        >
          {Trigger}
        </div>
      );
    };
  }
});
