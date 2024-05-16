import {
  Teleport,
  cloneVNode,
  defineComponent,
  nextTick,
  reactive,
  ref,
  useSlots,
  watch
} from 'vue';

import './index.less';

const Drawer = defineComponent({
  name: 'IzDrawer',
  setup() {
    const slots = useSlots();
    const triggerRef = ref<HTMLElement>();
    const contentRef = ref<HTMLElement>();
    const containerRef = ref<HTMLElement>();

    const state = reactive<{
      visible: boolean;
      // style: CSSProperties;
      // class: string[];
    }>({
      visible: false
      // style: {
      //   top: 0,
      //   left: 0
      // },
      // class: ['dropdown-content', 'animated']
    });

    const changeVisible = () => {
      state.visible = !state.visible;
    };

    watch(
      () => state.visible,
      (val) => {
        if (val) {
          document.documentElement.classList.add('iz-drawer-root-hidden');
          containerRef.value?.classList.add('open');
          containerRef.value?.classList.remove('close');

          nextTick(() => {
            contentRef.value?.classList.add('open-content');
            contentRef.value?.classList.remove('close-content');
          });
        } else {
          contentRef.value?.classList.add('close-content');
          contentRef.value?.classList.remove('open-content');

          nextTick(() => {
            setTimeout(() => {
              containerRef.value?.classList.add('close');
              containerRef.value?.classList.remove('open');
              document.documentElement.classList.remove('iz-drawer-root-hidden');
            }, 300);
          });
        }
      }
    );

    return () => {
      const Trigger = cloneVNode(slots.default!()[0], {
        ref: triggerRef,
        onClick: changeVisible
      });

      return (
        <>
          {Trigger}
          <Teleport to={document.body}>
            <div class="iz-drawer" ref={containerRef} onClick={changeVisible}>
              <div
                class="iz-drawer-content"
                ref={contentRef}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {slots.content!()}
              </div>
            </div>
          </Teleport>
        </>
      );
    };
  }
});

export default Drawer;
