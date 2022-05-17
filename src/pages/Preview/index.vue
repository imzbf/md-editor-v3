<template>
  <div class="project-preview">
    <div class="container">
      <md-editor-v3
        v-model="state.text"
        :editor-id="editorId"
        :language="store.state.lang"
        :theme="store.state.theme"
        :previewTheme="store.state.previewTheme"
        :code-theme="store.state.codeTheme"
        :toolbars="toolbars"
        @onUploadImg="uploadImg"
      >
        <template #defToolbars>
          <mark-extension :editor-id="editorId" @onChange="onChange" />
          <emoji-extension :editor-id="editorId" @onChange="onChange" />
          <read-extension :md-text="state.text" />
        </template>
      </md-editor-v3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useStore } from 'vuex';
import mdEN from '../../../public/preview-en-US.md';
import mdCN from '../../../public/preview-zh-CN.md';
import axios from '../../utils/request';
import { toolbars } from './staticConfig';
import './index.less';

import EmojiExtension from '@/components/EmojiExtension/index.vue';
import MarkExtension from '@/components/MarkExtension/index.vue';
import ReadExtension from '@/components/ReadExtension/index.vue';

const store = useStore();

const editorId = 'editor-preview';

const state = reactive({
  text: store.state.lang === 'zh-CN' ? mdCN : mdEN,
  modalVisible: false,
  modalFullscreen: false
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

const onChange = (v: string) => (state.text = v);
</script>
