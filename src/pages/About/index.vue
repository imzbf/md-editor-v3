<template>
  <div class="container">
    <div class="doc">
      <div class="content">
        <md-editor-v3
          :theme="store.state.theme"
          :model-value="mdText"
          :preview-theme="store.state.previewTheme"
          preview-only
          show-code-row-number
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import mdEN from '../../../public/about-en-US.md';
import mdCN from '../../../public/about-zh-CN.md';
import { replaceVersion } from '@/utils';
import { useStore } from 'vuex';

const mdText = ref(replaceVersion(mdEN));
const store = useStore();

const queryMd = () => {
  mdText.value = replaceVersion(store.state.lang === 'en-US' ? mdEN : mdCN);
};

watch(() => store.state.lang, queryMd);
</script>
