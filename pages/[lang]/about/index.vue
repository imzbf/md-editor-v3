<template>
  <div class="container">
    <div class="doc">
      <IzPreviewContent editorId="md-about" :modelValue="mdText" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { DESCRIPTION_CN, DESCRIPTION_EN, KEYWORDS_CN, KEYWORDS_EN, SITE_NAME_CN, SITE_NAME_EN } from '~/config';
import IzPreviewContent from '@/layouts/PreviewContent/index.vue';

import mdEN from '@/public/about-en-US.md';
import mdCN from '@/public/about-zh-CN.md';
import { useStore } from '@/store';
const store = useStore();

const mdText = ref(store.lang === 'en-US' ? mdEN : mdCN);
const queryMd = () => {
  mdText.value = store.lang === 'en-US' ? mdEN : mdCN;
};
watch(() => store.lang, queryMd);

useHead({
  title: store.lang === 'en-US' ? `About - ${SITE_NAME_EN}` : `关于 - ${SITE_NAME_CN}`,
  meta: [
    {
      name: 'keywords',
      content: store.lang === 'en-US' ? KEYWORDS_EN : KEYWORDS_CN,
    },
    {
      name: 'description',
      content: store.lang === 'en-US' ? DESCRIPTION_EN : DESCRIPTION_CN,
    },
  ],
});
</script>

<script lang="ts">
export default {
  name: 'AboutPage',
};
</script>
