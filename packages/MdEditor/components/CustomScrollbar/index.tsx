import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  PropType
} from 'vue';
import { prefixHump, prefix } from '~/config';

export default defineComponent({
  name: `${prefixHump}CustomScrollbar`,
  props: {
    id: {
      type: String as PropType<string>,
      default: undefined
    },
    class: {
      type: [String, Array] as PropType<string | string[]>,
      default: undefined
    },
    /**
     * 滚动元素选择器，默认取 slot 根节点
     */
    scrollTarget: {
      type: String as PropType<string>,
      default: undefined
    },
    /**
     * 是否一直显示轨道
     */
    alwaysShowTrack: {
      type: Boolean,
      default: false
    },
    onMouseenter: {
      type: Function as PropType<(e: MouseEvent) => void>,
      default: () => {}
    },
    onMouseleave: {
      type: Function as PropType<(e: MouseEvent) => void>,
      default: () => {}
    }
  },
  setup(props, { slots }) {
    const wrapperRef = ref<HTMLElement | null>(null);
    const scrollEl = ref<HTMLElement | null>(null);
    const thumbRef = ref<HTMLElement | null>(null);
    const trackRef = ref<HTMLElement | null>(null);
    let observer: MutationObserver | null = null;
    let bindTimer: number | null = null;

    let isDragging = false;
    let startY = 0;
    let startScrollTop = 0;

    /** 更新滑块位置和高度 */
    const updateThumb = () => {
      if (!scrollEl.value || !wrapperRef.value || !thumbRef.value || !trackRef.value)
        return;

      const clientH = wrapperRef.value.clientHeight;
      const scrollH = scrollEl.value.scrollHeight;
      const scrollTop = scrollEl.value.scrollTop;

      if (scrollH <= clientH) {
        thumbRef.value.style.display = 'none';
        if (!props.alwaysShowTrack) {
          trackRef.value.style.display = 'none';
        }
        return;
      } else {
        thumbRef.value.style.display = 'block';
        trackRef.value.style.display = 'block';
      }

      const ratio = clientH / scrollH;
      const thumbHeight = Math.max(clientH * ratio, 20);
      const maxTop = clientH - thumbHeight;
      const thumbTop = Math.min(scrollTop * ratio, maxTop);

      thumbRef.value.style.height = `${thumbHeight}px`;
      thumbRef.value.style.top = `${thumbTop}px`;
    };

    const onScroll = () => updateThumb();

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startY = e.clientY;
      startScrollTop = scrollEl.value!.scrollTop;
      document.body.style.userSelect = 'none';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !scrollEl.value || !wrapperRef.value) return;
      const deltaY = e.clientY - startY;
      const ratio = scrollEl.value.scrollHeight / wrapperRef.value.clientHeight;
      scrollEl.value.scrollTop = startScrollTop + deltaY * ratio;
    };

    const onMouseUp = () => {
      isDragging = false;
      document.body.style.userSelect = '';
    };

    /** 隐藏原生滚动条 */
    const hideNativeScrollbar = (el: HTMLElement) => {
      el.classList.add(`${prefix}-custom-scrollbar--hide-native`);
    };

    /** 绑定滚动元素事件 */
    const bindScrollEl = (el: HTMLElement | null) => {
      // 解绑旧的
      if (scrollEl.value) {
        scrollEl.value.removeEventListener('scroll', onScroll);
      }

      scrollEl.value = el;

      if (scrollEl.value) {
        hideNativeScrollbar(scrollEl.value);
        scrollEl.value.addEventListener('scroll', onScroll);
        updateThumb();
      } else {
        // 滚动元素消失时隐藏轨道
        if (trackRef.value && !props.alwaysShowTrack) {
          trackRef.value.style.display = 'none';
        }
      }
    };

    /** 查找并绑定最新的滚动元素 */
    const findAndBindScrollEl = () => {
      if (!wrapperRef.value) return;
      const el = props.scrollTarget
        ? wrapperRef.value.querySelector<HTMLElement>(props.scrollTarget)
        : (wrapperRef.value.firstElementChild as HTMLElement);
      bindScrollEl(el);
    };

    onMounted(async () => {
      await nextTick();
      findAndBindScrollEl();

      // 监听 slot 内容变化（防抖）
      observer = new MutationObserver(() => {
        if (bindTimer) cancelAnimationFrame(bindTimer);
        bindTimer = requestAnimationFrame(() => {
          findAndBindScrollEl();
        });
      });
      observer.observe(wrapperRef.value!, {
        childList: true,
        subtree: true
      });

      window.addEventListener('resize', updateThumb);
      thumbRef.value?.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    onBeforeUnmount(() => {
      observer?.disconnect();
      if (scrollEl.value) {
        scrollEl.value.removeEventListener('scroll', onScroll);
      }
      window.removeEventListener('resize', updateThumb);
      thumbRef.value?.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    });

    return () => (
      <div
        id={props.id}
        class={[`${prefix}-custom-scrollbar`, props.class]}
        ref={wrapperRef}
        onMouseenter={props.onMouseenter}
        onMouseleave={props.onMouseleave}
      >
        {slots.default?.()}
        <div class={`${prefix}-custom-scrollbar__track`} ref={trackRef}>
          <div class={`${prefix}-custom-scrollbar__thumb`} ref={thumbRef}></div>
        </div>
      </div>
    );
  }
});
