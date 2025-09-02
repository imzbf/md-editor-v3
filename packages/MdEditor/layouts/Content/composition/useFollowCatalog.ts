import { createSmoothScroll } from '@vavt/util';
import { inject, ref } from 'vue';
import { prefix } from '~~/config';

export const useFollowCatalog = () => {
  const editorId = inject('editorId') as string;
  const activeSync = ref(true);

  const smoothScroll = createSmoothScroll();

  const onCatalogActive = (_toc: unknown, ele: HTMLDivElement) => {
    const scroller = document.querySelector<HTMLElement>(
      `#${editorId} .${prefix}-catalog-editor`
    );

    if (!ele || !activeSync.value || !scroller) {
      return;
    }

    const dis = ele.offsetTop - scroller.scrollTop;
    if (dis > 100) {
      smoothScroll(scroller, ele.offsetTop - 100);
    } else if (dis < 100) {
      smoothScroll(scroller, ele.offsetTop - 100);
    }
  };

  const onMouseenter = () => (activeSync.value = false);

  const onMouseleave = () => (activeSync.value = true);

  return {
    onCatalogActive,
    onMouseenter,
    onMouseleave
  };
};
