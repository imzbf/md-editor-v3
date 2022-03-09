<template>
  <md-editor
    editor-id="md1"
    v-model="text"
    :marked-image="markedImage"
    :marked-heading="markedHeading"
    @onUploadImg="onUploadImg"
  />
  <button @click="visible = true">打开</button>
  <Modal v-model:visible="visible" title="Basic Modal" width="1100px">
    <md-editor
      editor-id="md3"
      v-model="text2"
      :marked-heading="markedHeading"
      @onUploadImg="onUploadImg"
    />
  </Modal>
</template>

<script>
import { defineComponent } from 'vue';
import axios from '@/utils/request';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { Modal } from 'ant-design-vue';

export default defineComponent({
  components: { MdEditor, Modal },
  data() {
    return {
      text: '# 123 \n哈哈哈哈\n# 456\n\n',
      text2: '# 123 \n哈哈哈哈\n# 456\n\n',
      text3: '# 123 \n哈哈哈哈\n# 456\n\n',
      visible: false
    };
  },
  methods: {
    markedHeading(text, level, raw) {
      return `<h${level} id="${raw}" ddd>${text}</h${level}>`;
    },
    markedImage(href, _, desc) {
      return `<img src="${href}" alt="${desc}">`;
    },
    onUploadImg: async (files, callback) => {
      const res = await Promise.all(
        Array.from(files).map((file) => {
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

      callback(res.map((item) => item.data.url));
    }
  }
});
</script>
