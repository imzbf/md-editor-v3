import {
  defineComponent,
  PropType,
  ref,
  reactive,
  watch,
  computed,
  Teleport,
  shallowRef,
  CSSProperties,
  inject,
  onBeforeMount,
  onMounted,
  useId,
  watchPostEffect,
  VNode
} from 'vue';
import Icon from '../Icon';
import { globalConfig, prefix } from '~/config';
import { Themes } from '~/type';
import { getZIndexIncrement } from '~/utils';
import { getFocusableElements, keyMove } from '~/utils/dom';
import { getSlot } from '~/utils/vue-tsx';

const props = {
  title: {
    type: [String, Object] as PropType<string | VNode | VNode[]>,
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

export default defineComponent({
  name: 'MdModal',
  props,
  emits: ['onClose'],
  setup(props, ctx) {
    // MdModal 也可独立使用；缺少编辑器注入时采用默认主题和页面挂载目标。
    const themeRef = inject(
      'theme',
      computed<Themes>(() => 'light')
    );
    const rootRef = inject('rootRef', ref<HTMLDivElement>());
    const modalVisible = ref(props.visible);
    const modalRef = ref<HTMLDivElement>();
    const modalHeaderRef = ref<HTMLDivElement>();
    const bodyRef = shallowRef<ShadowRoot | Element>();
    const containerRef = ref<HTMLDivElement>();
    const titleId = useId();
    let previousFocus: HTMLElement | null = null;

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
        insetInlineStart: '0px',
        insetBlockStart: '0px'
      },
      historyPos: {
        insetInlineStart: '0px',
        insetBlockStart: '0px'
      }
    });

    const rememberFocus = () => {
      const root = (rootRef.value?.getRootNode() || document) as Document | ShadowRoot;
      previousFocus = root.activeElement as HTMLElement | null;
    };

    onBeforeMount(() => {
      // 先记录返回目标，再挂载 Teleport，避免子控件 autofocus 覆盖打开前的焦点。
      if (props.visible) rememberFocus();
    });

    onMounted(() => {
      const rootNode = rootRef.value?.getRootNode();
      bodyRef.value = rootNode instanceof ShadowRoot ? rootNode : document.body;
    });

    watch(
      () => props.visible,
      (visible, _, onCleanup) => {
        if (visible) {
          // pre 阶段记录焦点，post 阶段再将焦点移入已经显示的弹窗。
          rememberFocus();
          modalVisible.value = true;
        } else {
          const timer = window.setTimeout(() => {
            modalVisible.value = false;
          }, 150);

          // 快速重开或卸载时取消退出动画，避免旧定时器再次隐藏弹窗。
          onCleanup(() => clearTimeout(timer));
        }
      }
    );

    watchPostEffect((onCleanup) => {
      const header = modalHeaderRef.value;
      if (!header || props.isFullscreen || !props.visible) return;
      onCleanup(
        keyMove(header, (left, top) => {
          state.initPos.insetInlineStart = left + 'px';
          state.initPos.insetBlockStart = top + 'px';
        })
      );
    });

    watchPostEffect((onCleanup) => {
      const modal = modalRef.value;
      // 退出动画期间保留视觉内容，但不再让隐藏中的控件参与键盘导航。
      if (containerRef.value) containerRef.value.inert = !props.visible;
      if (!props.visible || !modalVisible.value || !modal) return;

      // Teleport 挂载且可见后再测量；定位与初始焦点只在本次打开时设置。
      state.maskStyle = {
        zIndex: globalConfig.editorConfig.zIndex! + getZIndexIncrement()
      };
      state.modalStyle = {
        zIndex: globalConfig.editorConfig.zIndex! + getZIndexIncrement()
      };
      state.initPos = {
        insetInlineStart:
          (document.documentElement.clientWidth - modal.offsetWidth) / 2 + 'px',
        insetBlockStart:
          (document.documentElement.clientHeight - modal.offsetHeight) / 2 + 'px'
      };

      const root = modal.getRootNode() as Document | ShadowRoot;
      const returnFocus = previousFocus;
      const modalBody = modal.querySelector<HTMLElement>(`.${prefix}-modal-body`)!;
      if (!modal.contains(root.activeElement)) {
        // 等容器退出 inert 状态后再进入表单；空弹窗仍可通过关闭按钮接收按键。
        const initialFocus =
          getFocusableElements(modalBody)[0] || getFocusableElements(modal)[0] || modal;
        initialFocus.focus({ preventScroll: true });
      }

      onCleanup(() => {
        const activeElement = root.activeElement;
        // 动作若已将焦点交给其他界面，则保留该结果；关闭和卸载时才归还原焦点。
        if (
          returnFocus?.isConnected &&
          (!activeElement ||
            activeElement === document.body ||
            modal.contains(activeElement))
        ) {
          returnFocus.focus({ preventScroll: true });
        }
      });
    });

    const innerSize = computed(() => ({
      width: props.isFullscreen ? '100%' : props.width,
      height: props.isFullscreen ? '100%' : props.height
    }));

    const combinedStyle = computed(() => {
      const display = modalVisible.value ? 'block' : 'none';
      // 显示状态始终由 visible 控制，对象与字符串样式遵循相同的优先级。
      return typeof props.style === 'string'
        ? `${props.style}; display: ${display};`
        : { ...props.style, display };
    });

    const handleClose = () => {
      props.onClose?.();
      ctx.emit('onClose');
    };

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
            <div
              class={props.class}
              style={combinedStyle.value}
              aria-hidden={!props.visible || undefined}
            >
              {props.showMask && (
                <div
                  class={`${prefix}-modal-mask`}
                  style={state.maskStyle}
                  onClick={handleClose}
                />
              )}
              <div
                class={[`${prefix}-modal`, props.visible ? 'zoom-in' : 'zoom-out']}
                style={{
                  ...state.modalStyle,
                  ...state.initPos,
                  ...innerSize.value
                }}
                ref={modalRef}
                role="dialog"
                aria-modal={props.showMask || undefined}
                aria-labelledby={slotTitle ? titleId : undefined}
                aria-label={slotTitle ? undefined : 'Dialog'}
                tabindex={-1}
                onKeydown={(event) => {
                  if (!props.visible || event.defaultPrevented || event.isComposing) {
                    return;
                  }

                  if (event.key === 'Escape') {
                    event.preventDefault();
                    event.stopPropagation();
                    handleClose();
                    return;
                  }

                  if (event.key !== 'Tab' || !props.showMask) return;
                  const modal = event.currentTarget as HTMLElement;
                  const root = modal.getRootNode() as Document | ShadowRoot;
                  const items = getFocusableElements(modal);
                  const first = items[0];
                  const last = items.at(-1);
                  const atBoundary = event.shiftKey
                    ? root.activeElement === first || root.activeElement === modal
                    : root.activeElement === last;

                  // 有遮罩的弹窗限制 Tab 范围；无罩弹窗允许继续访问页面。
                  if (!first || atBoundary) {
                    event.preventDefault();
                    const next = event.shiftKey ? last : first;
                    (next || modal).focus({ preventScroll: true });
                  }
                }}
              >
                <div id={titleId} class={`${prefix}-modal-header`} ref={modalHeaderRef}>
                  {slotTitle || ''}
                </div>
                {/* 图标按钮使用固定的无障碍名称，避免扩展语言包配置。 */}
                <div class={`${prefix}-modal-func`}>
                  {props.showAdjust && (
                    <button
                      class={`${prefix}-modal-adjust`}
                      type="button"
                      aria-label={props.isFullscreen ? 'Restore' : 'Maximize'}
                      onClick={(event) => {
                        event.stopPropagation();

                        // 全屏时，保存上次位置
                        if (!props.isFullscreen) {
                          state.historyPos = state.initPos;
                          state.initPos = {
                            insetInlineStart: '0',
                            insetBlockStart: '0'
                          };
                        } else {
                          state.initPos = state.historyPos;
                        }

                        props.onAdjust(!props.isFullscreen);
                      }}
                    >
                      <Icon name={props.isFullscreen ? 'minimize' : 'maximize'} />
                    </button>
                  )}
                  <button
                    class={`${prefix}-modal-close`}
                    type="button"
                    aria-label="Close"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClose();
                    }}
                  >
                    <Icon name="close" />
                  </button>
                </div>
                <div class={`${prefix}-modal-body`}>{slotDefault}</div>
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
