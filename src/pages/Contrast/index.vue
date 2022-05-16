<template>
  <div class="container">
    <div class="doc">
      <div class="content" style="width: 100%">
        <md-editor-v3
          :theme="store.state.theme"
          :modelValue="mdText"
          :previewTheme="store.state.previewTheme"
          preview-only
          show-code-row-number
          :code-theme="store.state.codeTheme"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'ContrastPage' };
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { replaceVersion } from '@/utils';
import { useStore } from 'vuex';

import mdEN from '../../../public/contrast-en-US.md';
import mdCN from '../../../public/contrast-zh-CN.md';

const store = useStore();

const mdText = ref(replaceVersion(store.state.lang === 'en-US' ? mdEN : mdCN));

const queryMd = () => {
  mdText.value = replaceVersion(store.state.lang === 'en-US' ? mdEN : mdCN);
};

watch(() => store.state.lang, queryMd);
</script>
