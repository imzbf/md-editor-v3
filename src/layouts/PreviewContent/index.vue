<template>
  <div class="content">
    <MdPreview
      :editorId="props.editorId"
      :theme="store.state.theme"
      :modelValue="props.modelValue"
      :previewTheme="store.state.previewTheme"
      :language="store.state.lang"
      :showCodeRowNumber="props.showCodeRowNumber"
      :codeTheme="store.state.codeTheme"
      :autoFoldThreshold="16"
      @onHtmlChanged="onHtmlChanged"
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
import { MdPreview } from 'md-editor-v3';
import { debounce, getRootOffset } from '@vavt/util';
import type { StateType } from '@/store';
const store = useStore<StateType>();

const props = defineProps({
  editorId: {
    type: String as PropType<string>,
    default: ''
  },
  modelValue: {
    type: String as PropType<string>,
    default: ''
  },
  showCodeRowNumber: {
    type: Boolean as PropType<boolean>,
    default: true
  }
});

const { hash } = location;

const onHtmlChanged = debounce(() => {
  if (/^#/.test(hash)) {
    const headingId = decodeURIComponent(hash.replace('#', ''));

    if (headingId) {
      const targetHeadDom = document.getElementById(headingId);

      if (targetHeadDom) {
        const scrollLength = getRootOffset(targetHeadDom).offsetTop - 10;

        window.scrollTo({
          top: scrollLength,
          behavior: 'smooth'
        });
      }
    }
  }
});
</script>
