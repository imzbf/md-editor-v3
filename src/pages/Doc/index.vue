<script setup>
import { ref, watch } from 'vue';
import mdEN from '../../../public/doc-en-US.md';
import mdCN from '../../../public/doc-zh-CN.md';

import { replaceVersion } from '@/utils';
import { Affix as AtAffix } from 'ant-design-vue';
import { useStore } from 'vuex';
const store = useStore();

const mdText = ref(replaceVersion(store.state.lang === 'en-US' ? mdEN : mdCN));

const queryMd = () => {
  mdText.value = replaceVersion(store.state.lang === 'en-US' ? mdEN : mdCN);
};

const scrollElement = document.documentElement;

watch(() => store.state.lang, queryMd);
</script>

<template>
  <div class="container">
    <div class="doc">
      <div class="content">
        <md-editor-v3
          editor-id="doc-preview"
          :theme="store.state.theme"
          :language="store.state.lang"
          :model-value="mdText"
          :preview-theme="store.state.previewTheme"
          preview-only
          show-code-row-number
        />
      </div>
      <div class="catalog">
        <at-affix :offset-top="16">
          <md-catalog
            editor-id="doc-preview"
            :theme="store.state.theme"
            :scroll-element="scrollElement"
          />
        </at-affix>
      </div>
    </div>
  </div>
</template>
