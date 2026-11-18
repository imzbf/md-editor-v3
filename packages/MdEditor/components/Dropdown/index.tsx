import {
  defineComponent,
  PropType,
  SetupContext,
  EmitsOptions,
  cloneVNode,
  computed,
  CSSProperties,
  ref,
  useId,
  watchPostEffect,
  VNode
} from 'vue';
import { prefix } from '~/config';
import { getFocusableElements } from '~/utils/dom';
import { getSlot } from '~/utils/vue-tsx';

const props = {
  overlay: {
    type: [String, Object] as PropType<string | VNode | VNode[]>,
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
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: undefined
  }
};

const HIDDEN_CLASS = `${prefix}-dropdown-hidden`;
const MENU_ITEM_SELECTOR =
  '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]';

// 菜单项通过方向键聚焦，包括 tabindex 为 -1 的项目。
const getMenuItems = (overlay: HTMLElement) => {
  return Array.from(overlay.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR)).filter(
    (item) =>
      !item.matches(':disabled, [aria-disabled="true"]') &&
      !item.closest('[hidden], [inert], [aria-hidden="true"]') &&
      item.getClientRects().length > 0 &&
      getComputedStyle(item).visibility === 'visible'
  );
};

export default defineComponent({
  name: `${prefix}-dropdown`,
  props,
  setup(props, ctx: SetupContext<EmitsOptions>) {
    const visible = computed(() => props.visible && !props.disabled);
    const overlayId = useId();
    const overlayStyle = ref<CSSProperties>({});
    const triggerRef = ref<HTMLButtonElement>();
    const overlayRef = ref<HTMLDivElement>();
    let pendingFocus: 'first' | 'last' | null = null;
    let hiddenTimer = -1;

    const focusOverlay = (position: 'first' | 'last') => {
      const overlay = overlayRef.value!;
      const items = getMenuItems(overlay);
      const item = position === 'last' ? items.at(-1) : items[0];

      if (item) item.tabIndex = -1;
      // 自定义下拉内容也可以是表单；没有菜单项时保留其原生键盘行为。
      (item || getFocusableElements(overlay)[0] || overlay).focus({
        preventScroll: true
      });
    };

    const open = (position?: 'first' | 'last') => {
      if (props.disabled) return;
      clearTimeout(hiddenTimer);
      if (visible.value && position) {
        focusOverlay(position);
        return;
      }

      const triggerEle = triggerRef.value;
      const overlayEle = overlayRef.value;

      // 尝试移除元素不存在的潜在问题（https://github.com/imzbf/md-editor-v3/issues/308）
      if (!triggerEle || !overlayEle) return;

      const { width, height } = triggerEle.getBoundingClientRect();
      const rootNode = triggerEle.getRootNode() as Document | ShadowRoot;
      const relativeElement = rootNode.querySelector(props.relative);
      const scrollLeft = relativeElement?.scrollLeft || 0;
      const overlayWidth = overlayEle.offsetWidth;
      const left = triggerEle.offsetLeft + (width - overlayWidth) / 2 - scrollLeft;
      const maxLeft = scrollLeft + (relativeElement?.clientWidth || 0) - overlayWidth;

      // 居中对齐触发器，并限制在相对容器的左右边界内。
      overlayStyle.value = {
        insetBlockStart: triggerEle.offsetTop + height + 'px',
        insetInlineStart: Math.max(0, Math.min(left, maxLeft)) + 'px'
      };

      pendingFocus = position || null;
      props.onChange(true);
    };

    const leaveHidden = () => {
      if (!visible.value) return;
      clearTimeout(hiddenTimer);
      hiddenTimer = window.setTimeout(() => {
        const root = triggerRef.value?.getRootNode() as Document | ShadowRoot;
        const activeElement = root?.activeElement || null;

        // 跨过触发器与菜单间隙后会取消定时器；鼠标移走也不打断键盘操作。
        if (
          !triggerRef.value?.contains(activeElement) &&
          !overlayRef.value?.contains(activeElement)
        ) {
          props.onChange(false);
        }
      }, 10);
    };

    const leaveFocus = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (
        visible.value &&
        !triggerRef.value?.contains(next) &&
        !overlayRef.value?.contains(next)
      ) {
        props.onChange(false);
      }
    };

    // 等受控的 visible 提交到 DOM 后再聚焦，隐藏状态下的元素无法接收焦点。
    watchPostEffect((onCleanup) => {
      onCleanup(() => clearTimeout(hiddenTimer));
      const overlay = overlayRef.value;
      if (!overlay) return;

      if (visible.value) {
        // 菜单只有触发器参与 Tab 顺序，项目由方向键访问；也排除禁用项的 tabindex。
        overlay.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR).forEach((item) => {
          item.tabIndex = -1;
        });
        if (pendingFocus) {
          focusOverlay(pendingFocus);
          pendingFocus = null;
        }
      } else {
        pendingFocus = null;
        const root = overlay.getRootNode() as Document | ShadowRoot;
        if (overlay.contains(root.activeElement)) {
          triggerRef.value?.focus({ preventScroll: true });
        }
        if (props.disabled && props.visible) props.onChange(false);
      }
    });

    const keydown = (event: KeyboardEvent) => {
      if (
        props.disabled ||
        event.defaultPrevented ||
        event.isComposing ||
        event.ctrlKey ||
        event.metaKey ||
        (event.altKey && event.key !== 'Tab')
      )
        return;

      const fromTrigger = event.currentTarget === triggerRef.value;
      if (fromTrigger && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        event.preventDefault();
        open(event.key === 'ArrowUp' ? 'last' : 'first');
        return;
      }
      if (!visible.value) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        triggerRef.value?.focus({ preventScroll: true });
        props.onChange(false);
        return;
      }

      const item = event.target as HTMLElement;
      // 不接管自定义菜单项内输入框、按钮等子控件的按键。
      if (!fromTrigger && !item.matches(MENU_ITEM_SELECTOR)) return;
      if (event.key === 'Tab') {
        triggerRef.value?.focus({ preventScroll: true });
        props.onChange(false);
        return;
      }
      if (fromTrigger) return;

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        if (!event.repeat) item.click();
        return;
      }
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;

      const items = getMenuItems(event.currentTarget as HTMLElement);
      const index = items.indexOf(item);
      let nextIndex: number;
      switch (event.key) {
        case 'ArrowDown':
          nextIndex = (index + 1) % items.length;
          break;
        case 'ArrowUp':
          nextIndex = (index - 1 + items.length) % items.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        default:
          nextIndex = items.length - 1;
      }
      event.preventDefault();
      event.stopPropagation();
      const next = items[nextIndex];
      if (next) {
        next.tabIndex = -1;
        next.focus({ preventScroll: true });
      }
    };

    return () => {
      const slotDefault = getSlot({ ctx });
      const slotOverlay = getSlot({ props, ctx }, 'overlay');

      // cloneVNode 会合并原有事件；用户处理器可通过 preventDefault 取消默认动作。
      const trigger = cloneVNode(
        slotDefault instanceof Array ? slotDefault[0] : slotDefault,
        {
          ref: triggerRef,
          key: 'cloned-dropdown-trigger',
          'aria-haspopup': 'menu',
          'aria-expanded': visible.value,
          'aria-controls': overlayId,
          onMouseenter: (event: MouseEvent) => {
            if (!event.defaultPrevented) open();
          },
          onMouseleave: leaveHidden,
          // Vue 使用原生 focusout 接收子控件的失焦冒泡。
          onFocusout: leaveFocus,
          onKeydown: keydown,
          onClick: (event: MouseEvent) => {
            if (event.defaultPrevented) return;
            // 原生按钮的 Enter/空格和辅助技术共用 click，避免重复模拟激活。
            if (event.detail === 0) open('first');
            else if (!visible.value) open();
          }
        },
        true
      );

      const overlay = (
        <div
          id={overlayId}
          class={[`${prefix}-dropdown`, !visible.value && HIDDEN_CLASS]}
          style={overlayStyle.value}
          ref={overlayRef}
          tabindex={-1}
          aria-hidden={!visible.value}
          onMouseenter={() => clearTimeout(hiddenTimer)}
          onMouseleave={leaveHidden}
          onFocusout={leaveFocus}
          onKeydown={keydown}
          {...{
            onClickCapture: (event: MouseEvent) => {
              const item = (event.target as HTMLElement).closest(MENU_ITEM_SELECTOR);
              if (!item || !(event.currentTarget as HTMLElement).contains(item)) return;
              if (props.disabled || item.matches(':disabled, [aria-disabled="true"]')) {
                event.preventDefault();
                event.stopPropagation();
                return;
              }

              // 先恢复触发器，再执行菜单动作；新弹窗才能记住可见的返回目标。
              triggerRef.value?.focus({ preventScroll: true });
              props.onChange(false);
            }
          }}
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
