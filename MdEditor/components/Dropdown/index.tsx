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
  onBeforeUnmount
} from 'vue';
import { getSlot } from '../../utils/vue-tsx';

import './style.less';

interface CtlTypes {
  overlayClass: Array<string>;
  overlayStyle: CSSProperties;
  triggerHover: boolean;
  overlayHover: boolean;
}

import { prefix } from '../../config';

export default defineComponent({
  props: {
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover'
    },
    overlay: {
      type: [String, Object] as PropType<string | JSX.Element>,
      default: ''
    },
    visible: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    onChange: {
      type: Function as PropType<(v: boolean) => void>,
      default: () => () => {}
    }
  },
  setup(props, ctx: SetupContext<EmitsOptions>) {
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
      if (props.trigger === 'hover') {
        ctl.triggerHover = true;
      }

      const triggerEle = triggerRef.value as HTMLElement;
      const overlayEle = overlayRef.value as HTMLElement;

      const triggerInfo = triggerEle.getBoundingClientRect();

      const triggerTop = triggerEle.offsetTop;
      const triggerLeft = triggerEle.offsetLeft;
      const triggerHeight = triggerInfo.height;
      const triggerWidth = triggerInfo.width;

      // 设置好正对位置
      ctl.overlayStyle = {
        ...ctl.overlayStyle,
        top: triggerTop + triggerHeight + 'px',
        left: triggerLeft - overlayEle.offsetWidth / 2 + triggerWidth / 2 + 'px'
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

    // 点击非内容区域时触发关闭
    const clickHidden = (e: MouseEvent) => {
      const triggerEle: HTMLElement = triggerRef.value;
      const overlayEle: HTMLElement = overlayRef.value;

      if (
        !triggerEle.contains(e.target as HTMLElement) &&
        !overlayEle.contains(e.target as HTMLElement)
      ) {
        props.onChange(false);
      }
    };

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
      if (props.trigger === 'click') {
        (triggerRef.value as HTMLElement).addEventListener('click', triggerHandler);
        document.addEventListener('click', clickHidden);
      } else {
        (triggerRef.value as HTMLElement).addEventListener('mouseenter', triggerHandler);
        (triggerRef.value as HTMLElement).addEventListener('mouseleave', leaveHidden);

        (overlayRef.value as HTMLElement).addEventListener('mouseenter', overlayHandler);
        (overlayRef.value as HTMLElement).addEventListener('mouseleave', leaveHidden);
      }
    });

    // 卸载组件时清除监听
    onBeforeUnmount(() => {
      if (props.trigger === 'click') {
        (triggerRef.value as HTMLElement).removeEventListener('click', triggerHandler);
        document.removeEventListener('click', clickHidden);
      } else {
        (triggerRef.value as HTMLElement).removeEventListener(
          'mouseenter',
          triggerHandler
        );
        (triggerRef.value as HTMLElement).removeEventListener('mouseleave', leaveHidden);

        // 同时移除内容区域监听
        (overlayRef.value as HTMLElement).removeEventListener(
          'mouseenter',
          overlayHandler
        );
        (overlayRef.value as HTMLElement).removeEventListener('mouseleave', leaveHidden);
      }
    });

    return () => {
      const slotDefault = getSlot({ ctx });
      const slotOverlay = getSlot({ props, ctx }, 'overlay');

      // 触发器
      const trigger = cloneVNode(
        slotDefault instanceof Array ? slotDefault[0] : slotDefault,
        {
          ref: triggerRef
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
