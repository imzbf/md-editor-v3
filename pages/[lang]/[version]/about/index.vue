<template>
  <div class="container">
    <div class="doc">
      <IzPreviewContent editorId="md-about" :modelValue="mdText" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from '@/store';
import mdEN from '../../../public/about-en-US.md';
import mdCN from '../../../public/about-zh-CN.md';
import IzPreviewContent from '@/layouts/PreviewContent/index.vue';

const store = useStore();

const mdText = ref(store.lang === 'en-US' ? mdEN : mdCN);
const queryMd = () => {
  mdText.value = store.lang === 'en-US' ? mdEN : mdCN;
};
watch(() => store.lang, queryMd);
</script>

<script lang="ts">
export default {
  name: 'AboutPage',
};
</script>
