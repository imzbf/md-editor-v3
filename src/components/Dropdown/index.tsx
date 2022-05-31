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
        // visibility: 'hidden'
      },
      class: ['dropdown-content', 'animated']
    });

    const changeVisibility = debounce((visible = true) => {
      // state.style.visibility = visibility;
      state.class = [
        'dropdown-content',
        'animated',
        visible ? 'dropdown-enter' : 'dropdown-leave'
      ];
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
          state.visible = true;
        },
        onMouseleave() {
          state.visible = false;
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
              onMouseenter={changeVisibility}
              onMouseleave={() => changeVisibility(false)}
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
