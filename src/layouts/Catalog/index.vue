<template>
  <div class="catalog">
    <div class="affix">
      <md-catalog
        :editor-id="props.editorId"
        :theme="store.state.theme"
        :scroll-element="scrollElement"
        :scroll-element-offset-top="10"
        @on-click="onClick"
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
import type { TocItem } from 'md-editor-v3/lib/MdEditor/extensions/MdCatalog';

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
