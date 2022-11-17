import {
  defineComponent,
  reactive,
  cloneVNode,
  useSlots,
  watch,
  ref,
  Teleport,
  CSSProperties
} from 'vue';
import Menu from './Menu/index.vue';
import MenuItem from './MenuItem/index.vue';
import { debounce, getOffset } from '@/utils';
import './index.less';

const IzDropdown = defineComponent({
  name: 'IzDropdown',
  setup() {
    const slots = useSlots();
    const triggerRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();

    const state = reactive<{
      visible: boolean;
      style: CSSProperties;
      class: string[];
    }>({
      visible: false,
      style: {
        top: 0,
        left: 0
      },
      class: ['dropdown-content', 'animated']
    });

    const resetClass = (visible = true) => {
      state.class = ['dropdown-content', visible ? 'dropdown-active' : ''];
    };

    const changeVisibility = (visible = true) => {
      state.class = [
        'dropdown-content',
        'dropdown-active',
        'animated',
        visible ? 'dropdown-enter' : 'dropdown-leave'
      ];

      setTimeout(() => {
        resetClass(visible);
      }, 300);
    };

    const setVisible = debounce((visible = true) => {
      state.visible = visible;
    });

    watch(
      () => state.visible,
      (visible) => {
        if (visible) {
          const offsetValue = getOffset(triggerRef.value as HTMLElement);
          const triggerWidth = triggerRef.value?.offsetWidth || 0;
          const triggerHeight = triggerRef.value?.offsetHeight || 0;

          const contentWidth = contentRef.value?.offsetWidth || 0;

          state.style.left =
            offsetValue.left + triggerWidth / 2 - contentWidth / 2 + 'px';
          state.style.top = offsetValue.top + triggerHeight + 'px';
          changeVisibility(true);
        } else {
          changeVisibility(false);
        }
      }
    );

    return () => {
      const DropdownTrigger = cloneVNode((slots.default as Function)()[0], {
        ref: triggerRef,
        onMouseenter() {
          setVisible(true);
        },
        onMouseleave() {
          setVisible(false);
        }
      });

      return (
        <>
          {DropdownTrigger}
          <Teleport to={document.body}>
            <div
              class={state.class}
              style={state.style}
              ref={contentRef}
              onMouseenter={() => setVisible(true)}
              onMouseleave={() => setVisible(false)}
            >
              {(slots.content as Function)()}
            </div>
          </Teleport>
        </>
      );
    };
  }
});

IzDropdown.IzDropdownMenu = Menu;
IzDropdown.IzDropdownMenuItem = MenuItem;

export default IzDropdown;
