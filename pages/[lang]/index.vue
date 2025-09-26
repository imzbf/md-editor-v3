<template>
  <div class="project-preview">
    <div class="container">
      <MdEditor
        :id="editorId"
        ref="editorRef"
        v-model="state.text"
        :language="store.lang"
        :theme="store.theme"
        :previewTheme="store.previewTheme"
        :codeTheme="store.codeTheme"
        :toolbars="state.toolbars"
        :floatingToolbars="state.floatingToolbars"
        :footers="['markdownTotal', '=', 0, 'scrollSwitch']"
        :inputBoxWidth="state.inputBoxWidth"
        insertLinkDirect
        showCodeRowNumber
        autoDetectCode
        catalogLayout="flat"
        @onUploadImg="uploadImg"
      >
        <template #defToolbars>
          <Mark />
          <Emoji />
          <!-- <ReadExtension :mdText="state.text" /> -->
          <ExportPDF :modelValue="state.text" height="700px" />
        </template>
        <template #defFooters>
          <TimeNow />
        </template>
      </MdEditor>
      <br />
      <span class="tips-text">
        {{ tips
        }}<a href="https://github.com/imzbf/md-editor-extension/tree/develop/packages/v3/components" target="_blank"
          >components</a
        >
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isMobile } from '@vavt/util';
import { Emoji, Mark, ExportPDF } from '@vavt/v3-extension';
import { MdEditor } from 'md-editor-v3';
import type { ExposeParam, ToolbarNames } from 'md-editor-v3';
import { computed, reactive, watch, ref, onMounted } from 'vue';
import { DESCRIPTION_CN, DESCRIPTION_EN, KEYWORDS_CN, KEYWORDS_EN, SITE_NAME_CN, SITE_NAME_EN } from '~/config';
import TimeNow from '@/components/TimeNow/index.vue';
import { useStore } from '@/store';
import axios from '@/utils/request';

import '@vavt/v3-extension/lib/asset/style.css';

import { toolbars } from './staticConfig';
import mdEN from '../../../public/preview-en-US.md';
import mdCN from '../../../public/preview-zh-CN.md';
import './index.less';

// import ReadExtension from '@/components/ReadExtension/index.vue';

// const message = VavtMes.message;

const store = useStore();

const editorId = 'editor-preview';

const editorRef = ref<ExposeParam>();

const state = reactive<{
  text: string;
  modalVisible: boolean;
  modalFullscreen: boolean;
  toolbars: ToolbarNames[];
  inputBoxWidth: string;
  floatingToolbars: ToolbarNames[];
}>({
  text: store.lang === 'zh-CN' ? mdCN : mdEN,
  modalVisible: false,
  modalFullscreen: false,
  toolbars,
  inputBoxWidth: '50%',
  floatingToolbars: ['bold', 'underline'],
});

const tips = computed(() => {
  switch (store.lang) {
    case 'zh-CN':
      return '示例中的标记、emoji、预览和时间扩展组件源码：';
    default:
      return 'Source code of mark, emoji, preview and time extension components in this page: ';
  }
});

watch(
  () => store.lang,
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
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res: any) => rev(res))
          .catch((error: any) => rej(error));
      });
    })
  );

  callback(res.map((item: any) => item.data.url));
};

const changeLayout = () => {
  if (isMobile()) {
    // 在移动端不现实分屏预览，要么编辑，要么仅预览
    state.toolbars = ['previewOnly', ...toolbars.filter((item) => !(['preview', 'previewOnly'] as any).includes(item))];
    state.inputBoxWidth = '100%';
    editorRef.value?.togglePreview(false);
  } else {
    state.toolbars = toolbars;
    state.inputBoxWidth = '50%';
    editorRef.value?.togglePreview(true);
  }
};

useHead({
  title: store.lang === 'en-US' ? `HomePage - ${SITE_NAME_EN}` : `首页 - ${SITE_NAME_CN}`,
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

onMounted(() => {
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
  name: 'PreviewPage',
};
</script>
