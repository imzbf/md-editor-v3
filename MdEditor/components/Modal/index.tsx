import {
  defineComponent,
  PropType,
  ref,
  onMounted,
  onBeforeUnmount,
  reactive,
  watch,
  nextTick
} from 'vue';
import { prefix } from '../../config';
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
      type: String as PropType<string>,
      default: 'auto'
    },
    height: {
      type: String as PropType<string>,
      default: 'auto'
    },
    onClosed: {
      type: Function as PropType<() => void>,
      default: () => () => {}
    },

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
      default: () => () => {}
    }
  },
  setup(props, ctx) {
    const modalVisible = ref(props.visible);

    const modalClass = ref([`${prefix}-modal`]);

    const modalRef = ref();
    const modalHeaderRef = ref();

    // 移动元素方法返回清除监听事件方法。
    let keyMoveClear = () => {};

    const state = reactive({
      initPos: {
        left: '0px',
        top: '0px'
      },
      historyPos: {
        left: '0px',
        top: '0px'
      }
    });

    onMounted(() => {
      keyMoveClear = keyMove(modalHeaderRef.value, (left: number, top: number) => {
        state.initPos.left = left + 'px';
        state.initPos.top = top + 'px';
      });
    });

    onBeforeUnmount(() => {
      keyMoveClear();
    });

    watch(
      () => props.isFullscreen,
      (nVal) => {
        // 全屏时不允许拖动元素
        if (nVal) {
          keyMoveClear();
        } else {
          keyMoveClear = keyMove(modalHeaderRef.value, (left: number, top: number) => {
            state.initPos.left = left + 'px';
            state.initPos.top = top + 'px';
          });
        }
      }
    );

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

            state.initPos.left = halfClientWidth - halfWidth + 'px';
            state.initPos.top = halfClientHeight - halfHeight + 'px';
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
        <div style={{ display: modalVisible.value ? 'block' : 'none' }}>
          <div class={`${prefix}-modal-mask`} onClick={props.onClosed} />
          <div
            class={modalClass.value}
            style={{
              ...state.initPos,
              width: props.width,
              height: props.height
            }}
            ref={modalRef}
          >
            <div class={`${prefix}-modal-header`} ref={modalHeaderRef}>
              {slotTitle || ''}
            </div>
            <div class={`${prefix}-modal-body`}>{slotDefault}</div>
            <div class={`${prefix}-modal-func`}>
              {props.showAdjust && (
                <div
                  class={`${prefix}-modal-adjust`}
                  onClick={(e) => {
                    e.stopPropagation();

                    // 全屏时，保存上次位置
                    if (!props.isFullscreen) {
                      state.historyPos = state.initPos;
                      state.initPos = {
                        left: '0',
                        top: '0'
                      };
                    } else {
                      state.initPos = state.historyPos;
                    }

                    props.onAdjust(!props.isFullscreen);
                  }}
                >
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use
                      xlinkHref={`#icon-${props.isFullscreen ? 'suoxiao' : 'fangda'}`}
                    />
                  </svg>
                </div>
              )}
              <div
                class={`${prefix}-modal-close`}
                onClick={(e) => {
                  e.stopPropagation();
                  props.onClosed && props.onClosed();
                }}
              >
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use xlinkHref="#icon-close" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      );
    };
  }
});
