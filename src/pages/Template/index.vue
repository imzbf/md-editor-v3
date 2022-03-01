<template>
  <md-editor v-model="text" :marked-heading="markedHeading" preview-only />
</template>

<script>
import { defineComponent } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
  components: { MdEditor },
  data() {
    return {
      text: '# 123 \n哈哈哈哈\n# 456'
    };
  },
  methods: {
    markedHeading(text, level, raw) {
      return `<h${level} id="${raw}" ddd>${text}</h${level}>`;
    }
  }
});
</script>
