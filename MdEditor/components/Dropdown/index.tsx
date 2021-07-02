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
      type: String as PropType<'hover' | 'click'>,
      default: 'click'
    },
    overlay: {
      type: [String, Object] as PropType<string | JSX.Element>,
      default: ''
    },
    visible: {
      type: Boolean as PropType<boolean>,
      default: false
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

    const triggerHandler = (e: MouseEvent, type: 'click' | 'hover' = 'click') => {
      if (type === 'click') {
        ctl.visible = !ctl.visible;
      } else {
        ctl.visible = true;
      }
    };

    // 显示状态变化后修改某些属性
    watch(
      () => ctl.visible,
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
    const hiddenHandler = (e: MouseEvent) => {
      const triggerEle: HTMLElement = triggerRef.value;
      const overlayEle: HTMLElement = overlayRef.value;

      if (
        !triggerEle.contains(e.target as HTMLElement) &&
        !overlayEle.contains(e.target as HTMLElement)
      ) {
        ctl.visible = false;
      }
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
        top: offsetTop + offsetHeight + 'px',
        left: offsetLeft - overlayEle.offsetWidth / 2 + offsetWidth / 2 + 'px',
        marginTop: '10px'
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
        {
          onClick: triggerHandler,
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
      const overlayTo = () => <Teleport to={document.body}>{overlay}</Teleport>;

      return [trigger, overlayTo()];
    };
  }
});
