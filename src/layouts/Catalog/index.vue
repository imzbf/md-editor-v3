<template>
  <div class="catalog">
    <div class="affix">
      <MdCatalog
        :editorId="props.editorId"
        :theme="store.state.theme"
        :scrollElement="scrollElement"
        :scrollElementOffsetTop="10"
        @onClick="onClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'IzCatalog'
};
</script>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useStore } from 'vuex';
import { MdCatalog } from 'md-editor-v3';
import type { TocItem } from 'md-editor-v3/lib/types/MdCatalog/MdCatalog';

const store = useStore();

const props = defineProps({
  editorId: {
    type: String as PropType<string>,
    default: ''
  }
});

const scrollElement = document.documentElement;

const onClick = (e: MouseEvent, t: TocItem) => {
  history.replaceState({}, '', `${location.pathname}#${t.text}`);
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
