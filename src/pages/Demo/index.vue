<script setup>
import { onMounted, ref, watch } from 'vue';
import mdEN from '../../../public/demo-en-US.md';
import mdCN from '../../../public/demo-zh-CN.md';
import { useStore } from 'vuex';
import { replaceVersion } from '@/utils';
const store = useStore();

const mdText = ref(replaceVersion(store.state.lang === 'en-US' ? mdEN : mdCN));

const queryMd = () => {
  mdText.value = replaceVersion(store.state.lang === 'en-US' ? mdEN : mdCN);
};

const scrollElement = document.documentElement;

onMounted(queryMd);
watch(() => store.state.lang, queryMd);
</script>

<template>
  <div class="container">
    <div class="doc">
      <div class="content">
        <md-editor-v3
          editor-id="demo-preview"
          :theme="store.state.theme"
          :language="store.state.lang"
          :model-value="mdText"
          :preview-theme="store.state.previewTheme"
          preview-only
          show-code-row-number
          :code-theme="store.state.codeTheme"
        />
      </div>
      <div class="catalog">
        <div class="affix">
          <md-catalog
            editor-id="demo-preview"
            :theme="store.state.theme"
            :scroll-element="scrollElement"
          />
        </div>
      </div>
    </div>
  </div>
</template>
