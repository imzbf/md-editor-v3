<template>
  <div class="catalog">
    <div ref="scrollerRef" class="affix">
      <MdCatalog
        :editorId="props.editorId"
        :theme="store.theme"
        scrollElement="html"
        :scrollElementOffsetTop="10"
        @onClick="onClick"
        @onActive="onActive"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'IzCatalog',
};
</script>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
import { createSmoothScroll } from '@vavt/util';
import { MdCatalog } from 'md-editor-v3';
import type { TocItem } from 'md-editor-v3/lib/types/MdCatalog/MdCatalog';
import { useStore } from '@/store';

const store = useStore();

const props = defineProps({
  editorId: {
    type: String as PropType<string>,
    default: '',
  },
});

const scrollerRef = ref<HTMLDivElement>();
const smoothScroll = createSmoothScroll();

// const scrollElement = document.documentElement;

const onClick = (e: MouseEvent, t: TocItem) => {
  history.replaceState({}, '', `${location.pathname}#${t.text}`);
};

const onActive = (toc: any, ele: HTMLDivElement) => {
  if (!ele) {
    return;
  }
  const dis = ele.offsetTop - scrollerRef.value!.scrollTop;
  if (dis > 200) {
    smoothScroll(scrollerRef.value!, ele.offsetTop - 200);
  } else if (dis < 100) {
    smoothScroll(scrollerRef.value!, ele.offsetTop - 100);
  }
};
</script>

<style lang="less">
.affix {
  position: sticky;
  top: 10px;
  max-height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
}
</style>
