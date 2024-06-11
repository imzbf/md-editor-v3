<template>
  <div class="project-preview">
    <div class="container">
      <MdEditor
        ref="editorRef"
        v-model="state.text"
        :editorId="editorId"
        :language="store.state.lang"
        :theme="store.state.theme"
        :previewTheme="store.state.previewTheme"
        :codeTheme="store.state.codeTheme"
        :toolbars="state.toolbars"
        :footers="['markdownTotal', '=', 0, 'scrollSwitch']"
        :inputBoxWitdh="state.inputBoxWitdh"
        showCodeRowNumber
        autoDetectCode
        @onUploadImg="uploadImg"
      >
        <template #defToolbars>
          <Mark />
          <Emoji />
          <ReadExtension :mdText="state.text" />
          <ExportPDF :modelValue="state.text" height="700px" />
        </template>
        <template #defFooters>
          <TimeNow />
        </template>
      </MdEditor>
      <br />
      <span class="tips-text">
        {{ tips
        }}<a
          href="https://github.com/imzbf/md-editor-v3/tree/docs/src/components"
          target="_blank"
          >components</a
        >
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { MdEditor } from 'md-editor-v3';
import { Emoji, Mark, ExportPDF } from '@vavt/v3-extension';
import { isMobile } from '@vavt/util';
import type { ExposeParam } from 'md-editor-v3';
import '@vavt/v3-extension/lib/asset/style.css';
import mdEN from '../../../public/preview-en-US.md';
import mdCN from '../../../public/preview-zh-CN.md';
import axios from '../../utils/request';
import { toolbars } from './staticConfig';
import './index.less';

import ReadExtension from '@/components/ReadExtension/index.vue';

import TimeNow from '@/components/TimeNow/index.vue';

const store = useStore();

const editorId = 'editor-preview';

const editorRef = ref<ExposeParam>();

const state = reactive({
  text: store.state.lang === 'zh-CN' ? mdCN : mdEN,
  modalVisible: false,
  modalFullscreen: false,
  toolbars,
  inputBoxWitdh: '50%'
});

const tips = computed(() => {
  switch (store.state.lang) {
    case 'zh-CN':
      return '示例中的标记、emoji、预览和时间扩展组件源码：';
    default:
      return 'Source code of mark, emoji, preview and time extension components in this page: ';
  }
});

watch(
  () => store.state.lang,
  (nVal: string) => {
    if (nVal === 'zh-CN') {
      state.text = mdCN;
    } else {
      state.text = mdEN;
    }
  }
);

const uploadImg = async (files: Array<File>, callback: (urls: string[]) => void) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append('file', file);

        axios
          .post('/api/img/upload', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );

  callback(res.map((item: any) => item.data.url));
};

const changeLayout = () => {
  if (isMobile()) {
    // 在移动端不现实分屏预览，要么编辑，要么仅预览
    state.toolbars = [
      'previewOnly',
      ...toolbars.filter((item) => !(['preview', 'previewOnly'] as any).includes(item))
    ];
    state.inputBoxWitdh = '100%';
    editorRef.value?.togglePreview(false);
  } else {
    state.toolbars = toolbars;
    state.inputBoxWitdh = '50%';
    editorRef.value?.togglePreview(true);
  }
};

onMounted(() => {
  console.log(editorRef.value?.on('catalog', console.log));

  editorRef.value?.on('previewOnly', (v) => {
    if (isMobile()) {
      if (!v) {
        editorRef.value?.togglePreview(false);
      }
    }
  });

  changeLayout();
  window.addEventListener('resize', changeLayout);
});
</script>

<script lang="ts">
export default {
  name: 'PreviewPage'
};
</script>
