<template>
  <div class="container">
    <div class="doc">
      <iz-preview-content editor-id="md-contrast" :model-value="mdText" />
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'ContrastPage' };
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import mdEN from '../../../public/contrast-en-US.md';
import mdCN from '../../../public/contrast-zh-CN.md';
import IzPreviewContent from '@/layouts/PreviewContent/index.vue';

const store = useStore();

const mdText = ref(store.state.lang === 'en-US' ? mdEN : mdCN);
const queryMd = () => {
  mdText.value = store.state.lang === 'en-US' ? mdEN : mdCN;
};
watch(() => store.state.lang, queryMd);
</script>
