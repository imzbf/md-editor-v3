<template>
  <div class="content">
    <md-editor-v3
      :editor-id="props.editorId"
      :theme="store.state.theme"
      :model-value="props.modelValue"
      :preview-theme="store.state.previewTheme"
      preview-only
      show-code-row-number
      :code-theme="store.state.codeTheme"
      @on-html-changed="onHtmlChanged"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'IzPreviewContent'
};
</script>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useStore } from 'vuex';
import { debounce } from '@/utils';
const store = useStore();

const props = defineProps({
  editorId: {
    type: String as PropType<string>,
    default: ''
  },
  modelValue: {
    type: String as PropType<string>,
    default: ''
  }
});

const onHtmlChanged = debounce(() => {
  const { hash } = location;

  if (/^#/.test(hash)) {
    const headingId = decodeURIComponent(hash.replace('#', ''));

    if (headingId) {
      const targetHeadDom = document.getElementById(headingId);

      if (targetHeadDom) {
        const scrollLength = (targetHeadDom as HTMLHeadElement).offsetTop + 414;

        window.scrollTo({
          top: scrollLength,
          behavior: 'smooth'
        });
      }
    }
  }
});
</script>
