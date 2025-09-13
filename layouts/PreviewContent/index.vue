<template>
  <div class="content">
    <MdPreview
      :id="props.editorId"
      :theme="store.theme"
      :modelValue="props.modelValue"
      :previewTheme="store.previewTheme"
      :language="store.lang"
      :showCodeRowNumber="props.showCodeRowNumber"
      :codeTheme="store.codeTheme"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'IzPreviewContent',
};
</script>

<script setup lang="ts">
import { MdPreview } from 'md-editor-v3';
import type { PropType } from 'vue';
// import { debounce, getRootOffset } from '@vavt/util';
import { useStore } from '@/store';

const store = useStore();

const props = defineProps({
  editorId: {
    type: String as PropType<string>,
    default: '',
  },
  modelValue: {
    type: String as PropType<string>,
    default: '',
  },
  showCodeRowNumber: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
});

// const onHtmlChanged = debounce(() => {
//   if (/^#/.test(location.hash)) {
//     const headingId = decodeURIComponent(location.hash.replace('#', ''));

//     if (headingId) {
//       const targetHeadDom = document.getElementById(headingId);

//       if (targetHeadDom) {
//         const scrollLength = getRootOffset(targetHeadDom).offsetTop - 10;

//         window.scrollTo({
//           top: scrollLength,
//           behavior: 'smooth',
//         });
//       }
//     }
//   }
// });
</script>
