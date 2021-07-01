import {
  defineComponent,
  PropType,
  SetupContext,
  EmitsOptions,
  Teleport,
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
  visible: boolean;
  overlayClass: Array<string>;
  overlayStyle: CSSProperties;
}

import { prefix } from '../../Editor';

export default defineComponent({
  props: {
    trigger: {
      type: [Array] as PropType<Array<'hover' | 'click'>>
    },
    overlay: {
      type: [String, Object] as PropType<string | JSX.Element>
    }
  },
  setup(props, ctx: SetupContext<EmitsOptions>) {
    const HIDDEN_CLASS = `${prefix}-dropdown-hidden`;

    const ctl = reactive<CtlTypes>({
      visible: false,
      overlayClass: [`${prefix}-dropdown-overlay`, HIDDEN_CLASS],
      overlayStyle: {}
    });

    const triggerRef = ref();
    const overlayRef = ref();

    const triggerHandler = () => {
      const triggerEle: HTMLElement = triggerRef.value;

      console.log(triggerEle.offsetTop);

      ctl.visible = !ctl.visible;
    };

    watch(
      () => ctl.visible,
      (newV) => {
        console.log(newV);
        if (newV) {
          ctl.overlayClass = ctl.overlayClass.filter(
            (classItem: string) => classItem !== HIDDEN_CLASS
          );
        } else {
          ctl.overlayClass.push(HIDDEN_CLASS);
        }
      }
    );

    const hiddenHandler = () => {
      ctl.visible = false;
    };

    onMounted(() => {
      const triggerEle: HTMLElement = triggerRef.value;
      const overlayEle: HTMLElement = overlayRef.value;

      const offsetTop = triggerEle.offsetTop;
      const offsetLeft = triggerEle.offsetLeft;
      const offsetHeight = triggerEle.offsetHeight;
      const offsetWidth = triggerEle.offsetWidth;

      // 设置好正对位置
      ctl.overlayStyle = {
        ...ctl.overlayStyle,
        top: offsetTop + offsetHeight + 10 + 'px',
        left: offsetLeft - overlayEle.offsetWidth / 2 + offsetWidth / 2 + 'px'
      };

      document.addEventListener('click', hiddenHandler);
    });

    // 卸载组件时清除副作用
    onUnmounted(() => {
      document.removeEventListener('click', hiddenHandler);
    });

    return () => {
      const slotDefault = getSlot({ ctx });
      const slotOverlay = getSlot({ props, ctx }, 'overlay');

      // 触发器
      const trigger = cloneVNode(
        slotDefault instanceof Array ? slotDefault[0] : slotDefault,
        { onClick: triggerHandler, ref: triggerRef }
      );
      // 列表内容
      const overlay = cloneVNode(
        slotOverlay instanceof Array ? slotOverlay[0] : slotOverlay,
        { class: ctl.overlayClass, style: ctl.overlayStyle, ref: overlayRef }
      );
      const overlayTo = () => <Teleport to={document.body}>{overlay}</Teleport>;

      return [trigger, overlayTo()];
    };
  }
});
