<script setup>
import { onMounted, ref, watch } from 'vue';
import mdEN from '../../../public/demo-en-US.md';
import mdCN from '../../../public/demo-zh-CN.md';
import { Affix as AtAffix } from 'ant-design-vue';
import { useStore } from 'vuex';
import { replaceVersion } from '@/utils';

const mdText = ref(replaceVersion(mdEN));
const store = useStore();

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
        />
      </div>
      <div class="catalog">
        <at-affix :offset-top="16">
          <md-catalog
            editor-id="demo-preview"
            :theme="store.state.theme"
            :scroll-element="scrollElement"
          />
        </at-affix>
      </div>
    </div>
  </div>
</template>
