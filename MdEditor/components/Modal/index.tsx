import {
  defineComponent,
  PropType,
  Teleport,
  ref,
  onMounted,
  onUnmounted,
  reactive,
  watch,
  nextTick
} from 'vue';
import { prefix } from '../../Editor';
import { getSlot } from '../../utils/vue-tsx';
import { keyMove } from '../../utils/dom';
import './style.less';

export type ModalProps = Readonly<{
  title?: string;
  visible?: boolean;
  width?: number;
  onClosed?: (visible: boolean) => void;
  to?: HTMLElement;
}>;

export default defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
      default: ''
    },
    visible: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    width: {
      type: [Number, String] as PropType<number | string>,
      default: 'auto'
    },
    onClosed: {
      type: Function as PropType<() => void>,
      default: () => () => {}
    },
    to: {
      type: Element as PropType<HTMLElement>,
      default: () => document.body
    }
  },
  setup(props, ctx) {
    const modalVisible = ref(props.visible);

    const modalClass = ref([`${prefix}-modal`]);

    const modalRef = ref();
    const modalHeaderRef = ref();

    // 移动元素方法返回清除监听事件方法。
    let keyMoveClear = () => {};

    const initPos = reactive({
      left: '0px',
      top: '0px'
    });

    onMounted(() => {
      keyMoveClear = keyMove(modalHeaderRef.value, (left: number, top: number) => {
        initPos.left = left + 'px';
        initPos.top = top + 'px';
      });
    });

    onUnmounted(() => {
      keyMoveClear();
    });

    watch(
      () => props.visible,
      (nVal) => {
        if (nVal) {
          modalClass.value.push('zoom-in');
          modalVisible.value = nVal;

          nextTick(() => {
            const halfWidth = (modalRef.value as HTMLElement).offsetWidth / 2;
            const halfHeight = (modalRef.value as HTMLElement).offsetHeight / 2;

            const halfClientWidth = document.documentElement.clientWidth / 2;
            const halfClientHeight = document.documentElement.clientHeight / 2;

            initPos.left = halfClientWidth - halfWidth + 'px';
            initPos.top = halfClientHeight - halfHeight + 'px';
          });

          setTimeout(() => {
            modalClass.value = modalClass.value.filter((item) => item !== 'zoom-in');
          }, 140);
        } else {
          modalClass.value.push('zoom-out');
          setTimeout(() => {
            modalClass.value = modalClass.value.filter((item) => item !== 'zoom-out');
            modalVisible.value = nVal;
          }, 130);
        }
      }
    );

    return () => {
      const slotDefault = getSlot({ ctx });
      const slotTitle = getSlot({ props, ctx }, 'title');

      return (
        <Teleport to={props.to}>
          <div style={{ display: modalVisible.value ? 'block' : 'none' }}>
            <div class={`${prefix}-modal-mask`} />
            <div class={`${prefix}-modal-wrapper`}>
              <div
                class={modalClass.value}
                style={{
                  left: initPos.left,
                  top: initPos.top,
                  width:
                    typeof props.width === 'number' ? `${props.width}px` : props.width
                }}
                ref={modalRef}
              >
                <div class={`${prefix}-modal-header`} ref={modalHeaderRef}>
                  <div class={`${prefix}-modal-title`}>{slotTitle || ''}</div>
                  <div
                    class={`${prefix}-modal-close`}
                    onClick={(e) => {
                      e.stopPropagation();
                      props.onClosed && props.onClosed();
                    }}
                  >
                    X
                  </div>
                </div>
                <div class={`${prefix}-modal-body`}>{slotDefault}</div>
              </div>
            </div>
          </div>
        </Teleport>
      );
    };
  }
});
