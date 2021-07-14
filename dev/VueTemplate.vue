<template>
  <div class="container">
    <editor
      v-model="text"
      theme="dark"
      :preview="true"
      html
      pageFullScreen
      language="en-US"
      @onUploadImg="onUploadImg"
    ></editor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Editor from '../MdEditor';
import { mdText } from './data';
import axios from 'axios';

import './style.less';

export default defineComponent({
  name: 'VueTemplateDemo',
  components: { Editor },
  data() {
    return {
      text: mdText
    };
  },
  methods: {
    async onUploadImg(files: FileList, callback: (urls: string[]) => void) {
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

      callback(res.map((item: any) => item.data.url));
    }
  }
});
</script>
