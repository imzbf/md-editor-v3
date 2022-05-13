<template>
  <div class="project-preview">
    <div class="container">
      <md-editor-v3
        editorId="md-prev"
        v-model="data.text"
        :language="store.state.lang"
        :theme="store.state.theme"
        :previewTheme="store.state.previewTheme"
        :code-css-name="store.state.codeCssName"
        :toolbars="[
          'bold',
          'underline',
          'italic',
          'strikeThrough',
          '-',
          'title',
          'sub',
          'sup',
          'quote',
          'unorderedList',
          'orderedList',
          '-',
          'codeRow',
          'code',
          'link',
          'image',
          'table',
          'mermaid',
          'katex',
          0,
          1,
          '-',
          'revoke',
          'next',
          'save',
          '=',
          'prettier',
          'pageFullscreen',
          'fullscreen',
          'preview',
          'htmlPreview',
          'catalog',
          'github'
        ]"
        :extensions="[MarkExtension]"
        @onUploadImg="uploadImg"
      >
        <template #defToolbars>
          <normal-toolbar title="mark" @click="markHandler">
            <template #trigger>
              <svg class="md-icon" aria-hidden="true">
                <use xlink:href="#icon-mark"></use>
              </svg>
            </template>
          </normal-toolbar>
          <dropdown-toolbar
            title="emoji"
            :visible="data.emojiVisible"
            :onChange="emojiVisibleChanged"
          >
            <template #overlay>
              <div class="emoji-container">
                <ol class="emojis">
                  <li
                    v-for="(emoji, index) of emojis"
                    :key="`emoji-${index}`"
                    @click="emojiHandler(emoji)"
                    v-text="emoji"
                  ></li>
                </ol>
              </div>
            </template>
            <template #trigger>
              <svg class="md-icon" aria-hidden="true">
                <use xlink:href="#icon-emoji"></use>
              </svg>
            </template>
          </dropdown-toolbar>
        </template>
      </md-editor-v3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import mdEN from '../../../public/preview-en-US.md';
import mdCN from '../../../public/preview-zh-CN.md';
import axios from '../../utils/request';
import './index.less';
import { useStore } from 'vuex';

import { emojis } from './data';

import MarkExtension from '../../utils/marked-mark';

const data = reactive({
  text: mdEN,
  emojiVisible: false
});

const store = useStore();

watch(
  () => store.state.lang,
  (nVal: string) => {
    if (nVal === 'zh-CN') {
      data.text = mdCN;
    } else {
      data.text = mdEN;
    }
  }
);

const markHandler = () => {
  // 获取输入框
  const textarea = document.querySelector('#md-prev-textarea') as HTMLTextAreaElement;
  // 获取选中的内容
  const selection = window.getSelection()?.toString();
  // 获取鼠标位置
  const endPoint = textarea.selectionStart;

  // 生成标记文本
  const markStr = `@${selection}@`;

  // 根据鼠标位置分割旧文本
  // 前半部分
  const prefixStr = textarea.value.substring(0, endPoint);
  // 后半部分
  const suffixStr = textarea.value.substring(endPoint + (selection?.length || 0));

  data.text = `${prefixStr}${markStr}${suffixStr}`;

  setTimeout(() => {
    textarea.setSelectionRange(endPoint, markStr.length + endPoint);
    textarea.focus();
  }, 0);
};

const emojiHandler = (emoji: string) => {
  // 获取输入框
  const textarea = document.querySelector('#md-prev-textarea') as HTMLTextAreaElement;
  // 获取选中的内容
  const selection = window.getSelection()?.toString();
  // 获取鼠标位置
  const endPoint = textarea.selectionStart;

  // 根据鼠标位置分割旧文本
  // 前半部分
  const prefixStr = textarea.value.substring(0, endPoint);
  // 后半部分
  const suffixStr = textarea.value.substring(endPoint + (selection?.length || 0));

  data.text = `${prefixStr}${emoji}${suffixStr}`;

  setTimeout(() => {
    textarea.setSelectionRange(endPoint, endPoint + 1);
    textarea.focus();
  }, 0);
};

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

const emojiVisibleChanged = (visible: boolean) => {
  data.emojiVisible = visible;
};
</script>
