import {
  defineComponent,
  PropType,
  ref,
  reactive,
  watch,
  nextTick,
  computed,
  ExtractPropTypes,
  Teleport,
  shallowRef,
  CSSProperties,
  inject,
  ComputedRef,
  onMounted,
  VNode
} from 'vue';
import { LooseRequired } from '@vue/shared';
import { configOption, prefix } from '~/config';
import { getSlot } from '~/utils/vue-tsx';
import { keyMove } from '~/utils/dom';
import { Themes } from '~/type';
import Icon from '../Icon';
import { getZIndexIncrement } from '~/utils';

const props = {
  title: {
    type: [String, Object] as PropType<string | VNode>,
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
  onClose: {
    type: Function as PropType<() => void>
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
    default: () => {}
  },
  class: {
    type: String as PropType<string>,
    default: undefined
  },
  style: {
    type: [Object, String] as PropType<CSSProperties | string>,
    default: () => ({})
  },
  showMask: {
    type: Boolean as PropType<boolean>,
    default: true
  }
};

type ModalProps = Readonly<LooseRequired<Readonly<ExtractPropTypes<typeof props>>>>;

export default defineComponent({
  name: 'MdModal',
  props,
  emits: ['onClose'],
  setup(props: ModalProps, ctx) {
    const themeRef = inject('theme') as ComputedRef<Themes>;
    const rootRef = inject('rootRef') as ComputedRef<HTMLDivElement>;
    const modalVisible = ref(props.visible);

    const modalClass = ref([`${prefix}-modal`]);

    const modalRef = ref();
    const modalHeaderRef = ref();

    const bodyRef = ref<ShadowRoot | Element>();

    // 创建的弹窗容器，存放在document.body末尾
    const containerRef = shallowRef<HTMLDivElement>();

    // 移动元素方法返回清除监听事件方法。
    let keyMoveClear = () => {};

    const state = reactive<{
      maskStyle: CSSProperties;
      modalStyle: CSSProperties;
      initPos: CSSProperties;
      historyPos: CSSProperties;
    }>({
      maskStyle: {
        zIndex: -1
      },
      modalStyle: {
        zIndex: -1
      },
      initPos: {
        left: '0px',
        top: '0px'
      },
      historyPos: {
        left: '0px',
        top: '0px'
      }
    });

    const innerSize = computed(() => {
      if (props.isFullscreen) {
        return {
          width: '100%',
          height: '100%'
        };
      } else {
        return {
          width: props.width,
          height: props.height
        };
      }
    });

    watch(
      () => props.isFullscreen,
      (nVal) => {
        // 全屏时不允许拖动元素
        if (nVal) {
          keyMoveClear();
        } else {
          nextTick(() => {
            keyMoveClear = keyMove(modalHeaderRef.value, (left, top) => {
              state.initPos.left = left + 'px';
              state.initPos.top = top + 'px';
            });
          });
        }
      }
    );

    watch(
      () => props.visible,
      (nVal) => {
        if (nVal) {
          state.maskStyle.zIndex =
            configOption.editorConfig.zIndex! + getZIndexIncrement();
          state.modalStyle.zIndex =
            configOption.editorConfig.zIndex! + getZIndexIncrement();

          modalClass.value.push('zoom-in');
          modalVisible.value = nVal;

          nextTick(() => {
            const halfWidth = (modalRef.value as HTMLElement).offsetWidth / 2;
            const halfHeight = (modalRef.value as HTMLElement).offsetHeight / 2;

            const halfClientWidth = document.documentElement.clientWidth / 2;
            const halfClientHeight = document.documentElement.clientHeight / 2;

            state.initPos.left = halfClientWidth - halfWidth + 'px';
            state.initPos.top = halfClientHeight - halfHeight + 'px';

            // 如果预设了全屏展示弹窗，就不需要注册拖动事件
            if (!props.isFullscreen) {
              keyMoveClear = keyMove(modalHeaderRef.value, (left, top) => {
                state.initPos.left = left + 'px';
                state.initPos.top = top + 'px';
              });
            }
          });

          setTimeout(() => {
            modalClass.value = modalClass.value.filter((item) => item !== 'zoom-in');
          }, 140);
        } else {
          modalClass.value.push('zoom-out');

          keyMoveClear();

          setTimeout(() => {
            modalClass.value = modalClass.value.filter((item) => item !== 'zoom-out');
            modalVisible.value = nVal;
          }, 130);
        }
      }
    );

    const internalStyle = computed(() => ({
      display: modalVisible.value ? 'block' : 'none'
    }));

    const combinedStyle = computed(() => {
      if (typeof props.style === 'string') {
        // 内置的显示样式优先级要高
        return [props.style, internalStyle.value].join('; ');
      } else if (props.style instanceof Object) {
        return { ...internalStyle.value, ...props.style };
      } else {
        return internalStyle.value;
      }
    });

    onMounted(() => {
      const rootNode = rootRef.value?.getRootNode() as ShadowRoot;
      bodyRef.value = rootNode instanceof Document ? document.body : rootNode;
    });

    return () => {
      const slotDefault = getSlot({ ctx });
      const slotTitle = getSlot({ props, ctx }, 'title');

      return bodyRef.value ? (
        <Teleport to={bodyRef.value}>
          <div
            ref={containerRef}
            class={`${prefix}-modal-container`}
            data-theme={themeRef.value}
          >
            <div class={props.class} style={combinedStyle.value}>
              {props.showMask && (
                <div
                  class={`${prefix}-modal-mask`}
                  style={state.maskStyle}
                  onClick={() => {
                    props.onClose?.();
                    ctx.emit('onClose');
                  }}
                />
              )}
              <div
                class={modalClass.value}
                style={{
                  ...state.modalStyle,
                  ...state.initPos,
                  ...innerSize.value
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
                      <Icon name={props.isFullscreen ? 'minimize' : 'maximize'} />
                    </div>
                  )}
                  <div
                    class={`${prefix}-modal-close`}
                    onClick={(e) => {
                      e.stopPropagation();

                      props.onClose?.();
                      ctx.emit('onClose');
                    }}
                  >
                    <Icon name="close" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Teleport>
      ) : (
        ''
      );
    };
  }
});
