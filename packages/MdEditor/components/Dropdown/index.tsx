import {
  defineComponent,
  PropType,
  SetupContext,
  EmitsOptions,
  cloneVNode,
  reactive,
  CSSProperties,
  watch,
  ref,
  onMounted,
  onBeforeUnmount,
  ExtractPropTypes,
  VNode
} from 'vue';
import { LooseRequired } from '@vue/shared';
import { getSlot } from '~/utils/vue-tsx';
import { prefix } from '~/config';

interface CtlTypes {
  overlayClass: Array<string>;
  overlayStyle: CSSProperties;
  triggerHover: boolean;
  overlayHover: boolean;
}

const props = {
  overlay: {
    type: [String, Object] as PropType<string | VNode>,
    default: ''
  },
  visible: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  onChange: {
    type: Function as PropType<(v: boolean) => void>,
    default: () => {}
  },
  // 相对滚动的元素选择器
  relative: {
    type: String as PropType<string>,
    default: 'html'
  }
};

type DropdownToolbarProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof props>>>
>;

export default defineComponent({
  props,
  setup(props: DropdownToolbarProps, ctx: SetupContext<EmitsOptions>) {
    const HIDDEN_CLASS = `${prefix}-dropdown-hidden`;

    const ctl = reactive<CtlTypes>({
      overlayClass: [HIDDEN_CLASS],
      overlayStyle: {},
      triggerHover: false,
      overlayHover: false
    });

    const triggerRef = ref();
    const overlayRef = ref();

    const triggerHandler = () => {
      ctl.triggerHover = true;

      const triggerEle = triggerRef.value as HTMLElement;
      const overlayEle = overlayRef.value as HTMLElement;

      // 尝试移除元素不存在的潜在问题（https://github.com/imzbf/md-editor-v3/issues/308）
      if (!triggerEle || !overlayEle) {
        return;
      }

      const triggerInfo = triggerEle.getBoundingClientRect();

      const triggerTop = triggerEle.offsetTop;
      const triggerLeft = triggerEle.offsetLeft;
      const triggerHeight = triggerInfo.height;
      const triggerWidth = triggerInfo.width;

      const rootNode = triggerEle.getRootNode() as Document | ShadowRoot;
      const relativecrollLeft = rootNode.querySelector(props.relative)?.scrollLeft || 0;
      const relativeWidth = rootNode.querySelector(props.relative)?.clientWidth || 0;

      let left =
        triggerLeft - overlayEle.offsetWidth / 2 + triggerWidth / 2 - relativecrollLeft;

      // 下拉框的右侧超出了相对元素的右侧，则设定不能超过
      if (left + overlayEle.offsetWidth > relativecrollLeft + relativeWidth) {
        left = relativecrollLeft + relativeWidth - overlayEle.offsetWidth;
      }

      if (left < 0) {
        left = 0;
      }

      // 设置好正对位置
      ctl.overlayStyle = {
        ...ctl.overlayStyle,
        top: triggerTop + triggerHeight + 'px',
        left: left + 'px'
      };

      props.onChange(true);
    };

    const overlayHandler = () => {
      ctl.overlayHover = true;
    };

    // 显示状态变化后修改某些属性
    watch(
      () => props.visible,
      (newV) => {
        if (newV) {
          ctl.overlayClass = ctl.overlayClass.filter(
            (classItem: string) => classItem !== HIDDEN_CLASS
          );
        } else {
          ctl.overlayClass.push(HIDDEN_CLASS);
        }
      }
    );

    let hiddenTimer = -1;
    const leaveHidden = (e: MouseEvent) => {
      if (triggerRef.value === e.target) {
        ctl.triggerHover = false;
      } else {
        ctl.overlayHover = false;
      }

      clearTimeout(hiddenTimer);
      hiddenTimer = window.setTimeout(() => {
        if (!ctl.overlayHover && !ctl.triggerHover) {
          props.onChange(false);
        }
      }, 10);
    };

    onMounted(() => {
      (triggerRef.value as HTMLElement).addEventListener('mouseenter', triggerHandler);
      (triggerRef.value as HTMLElement).addEventListener('mouseleave', leaveHidden);

      (overlayRef.value as HTMLElement).addEventListener('mouseenter', overlayHandler);
      (overlayRef.value as HTMLElement).addEventListener('mouseleave', leaveHidden);
    });

    // 卸载组件时清除监听
    onBeforeUnmount(() => {
      (triggerRef.value as HTMLElement).removeEventListener('mouseenter', triggerHandler);
      (triggerRef.value as HTMLElement).removeEventListener('mouseleave', leaveHidden);

      // 同时移除内容区域监听
      (overlayRef.value as HTMLElement).removeEventListener('mouseenter', overlayHandler);
      (overlayRef.value as HTMLElement).removeEventListener('mouseleave', leaveHidden);
    });

    return () => {
      const slotDefault = getSlot({ ctx });
      const slotOverlay = getSlot({ props, ctx }, 'overlay');

      // 触发器
      const trigger = cloneVNode(
        slotDefault instanceof Array ? slotDefault[0] : slotDefault,
        {
          ref: triggerRef,
          key: 'cloned-dropdown-trigger'
        }
      );

      // 列表内容
      const overlay = (
        <div
          class={[`${prefix}-dropdown`, ctl.overlayClass]}
          style={ctl.overlayStyle}
          ref={overlayRef}
        >
          <div class={`${prefix}-dropdown-overlay`}>
            {slotOverlay instanceof Array ? slotOverlay[0] : slotOverlay}
          </div>
        </div>
      );

      return [trigger, overlay];
    };
  }
});
