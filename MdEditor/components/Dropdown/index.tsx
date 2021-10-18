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
  onUnmounted
} from 'vue';
import { getSlot } from '../../utils/vue-tsx';

import './style.less';

interface CtlTypes {
  overlayClass: Array<string>;
  overlayStyle: CSSProperties;
}

import { prefix } from '../../Editor';

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
      overlayClass: [`${prefix}-dropdown-overlay`, HIDDEN_CLASS],
      overlayStyle: {}
    });

    const triggerRef = ref();
    const overlayRef = ref();

    const triggerHandler = () => {
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
        left: triggerLeft - overlayEle.offsetWidth / 2 + triggerWidth / 2 + 'px',
        marginTop: '10px'
      };

      props.onChange(!props.visible);
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
    const leaveHidden = () => {
      hiddenTimer = window.setTimeout(() => {
        props.onChange(false);
      }, 50);
    };

    onMounted(() => {
      if (props.trigger === 'click') {
        (triggerRef.value as HTMLElement).addEventListener('click', triggerHandler);
        document.addEventListener('click', clickHidden);
      } else {
        (triggerRef.value as HTMLElement).addEventListener('mouseenter', triggerHandler);
        (triggerRef.value as HTMLElement).addEventListener('mouseleave', leaveHidden);
      }

      (overlayRef.value as HTMLElement).addEventListener('mouseenter', () => {
        clearTimeout(hiddenTimer);
      });
    });

    // 卸载组件时清除监听
    onUnmounted(() => {
      if (props.trigger === 'click') {
        (triggerRef.value as HTMLElement).removeEventListener('click', triggerHandler);
        document.removeEventListener('click', clickHidden);
      } else {
        (triggerRef.value as HTMLElement).removeEventListener(
          'mouseenter',
          triggerHandler
        );
        (triggerRef.value as HTMLElement).removeEventListener('mouseleave', leaveHidden);
      }
    });

    return () => {
      const slotDefault = getSlot({ ctx });
      const slotOverlay = getSlot({ props, ctx }, 'overlay');

      // 触发器
      const trigger = cloneVNode(
        slotDefault instanceof Array ? slotDefault[0] : slotDefault,
        {
          // onClick: triggerHandler,
          // onMouseover: (e: MouseEvent) => triggerHandler(e, 'hover'),
          // onMouseleave: (e: MouseEvent) => {
          //   ctl.visible = false;
          // },
          ref: triggerRef
        }
      );

      // 列表内容
      const overlay = cloneVNode(
        slotOverlay instanceof Array ? slotOverlay[0] : slotOverlay,
        { class: ctl.overlayClass, style: ctl.overlayStyle, ref: overlayRef }
      );

      return [trigger, overlay];
    };
  }
});
