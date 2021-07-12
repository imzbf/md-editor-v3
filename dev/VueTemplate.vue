<template>
  <div class="container">
    <editor v-model="text" :preview="true" html pageFullScreen></editor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Editor from '../MdEditor';
import { mdText } from './data';

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
    onUploadImg(files: FileList, callback: (urls: string[]) => void) {
      console.log(files);
      callback([
        'https://art-1252753142.cos.ap-chengdu.myqcloud.com/2021/06301522413082599421018280471.png',
        'https://art-1252753142.cos.ap-chengdu.myqcloud.com/2021/06301606102817061001806835437.gif'
      ]);
    }
  }
});
</script>
