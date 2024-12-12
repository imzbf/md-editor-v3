import {
  defineComponent,
  PropType,
  SetupContext,
  ExtractPropTypes,
  VNode,
  CSSProperties
} from 'vue';
import { LooseRequired } from '@vue/shared';
import { prefix } from '~/config';
import { getSlot } from '~/utils/vue-tsx';
import Modal from '~/components/Modal';
import { PreviewThemes, Themes } from '~/type';

const props = {
  title: {
    type: String as PropType<string>,
    default: ''
  },
  modalTitle: {
    type: [String, Object] as PropType<string | VNode>,
    default: ''
  },
  visible: {
    type: Boolean as PropType<boolean>,
    default: undefined
  },
  width: {
    type: String as PropType<string>,
    default: 'auto'
  },
  height: {
    type: String as PropType<string>,
    default: 'auto'
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object] as PropType<string | VNode>,
    default: undefined
  },
  onClick: {
    type: Function as PropType<() => void>,
    default: undefined
  },
  onClose: {
    type: Function as PropType<() => void>,
    default: undefined
  },
  /**
   * 显示全屏按钮
   */
  showAdjust: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isFullscreen: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  onAdjust: {
    type: Function as PropType<(val: boolean) => void>,
    default: undefined
  },
  class: {
    type: String as PropType<string>,
    default: undefined
  },
  style: {
    type: [Object, String] as PropType<CSSProperties | string>,
    default: undefined
  },
  showMask: {
    type: Boolean as PropType<boolean>,
    default: true
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
  }
  /**
   * ==结束
   */
};

type ModalToolbarProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof props>>>
>;

export default defineComponent({
  name: 'ModalToolbar',
  props,
  emits: ['onClick', 'onClose', 'onAdjust'],
  setup(
    props: ModalToolbarProps,
    ctx: SetupContext<Array<'onClick' | 'onClose' | 'onAdjust'>>
  ) {
    return () => {
      const Trigger = getSlot({ props, ctx }, 'trigger');
      const ModalTitle = getSlot({ props, ctx }, 'modalTitle');
      const Default = getSlot({ props, ctx });

      return (
        <>
          <div
            class={`${prefix}-toolbar-item`}
            title={props.title}
            onClick={() => {
              if (props.onClick instanceof Function) {
                props.onClick();
              } else {
                ctx.emit('onClick');
              }
            }}
          >
            {Trigger}
          </div>
          <Modal
            style={props.style}
            class={props.class}
            width={props.width}
            height={props.height}
            title={ModalTitle}
            visible={props.visible}
            showMask={props.showMask}
            onClose={() => {
              if (props.onClose instanceof Function) {
                props.onClose();
              } else {
                ctx.emit('onClose');
              }
            }}
            showAdjust={props.showAdjust}
            isFullscreen={props.isFullscreen}
            onAdjust={(v) => {
              if (props.onAdjust instanceof Function) {
                props.onAdjust(v);
              } else {
                ctx.emit('onAdjust', v);
              }
            }}
          >
            {Default}
          </Modal>
        </>
      );
    };
  }
});
