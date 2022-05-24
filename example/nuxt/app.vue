<template>
  <md-editor v-model="text" :toolbarsExclude="toolbarsExclude" />
</template>

<script>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default {
  setup() {
    const text = ref('# Hello md-editor')
    const toolbarsExclude = ['catalog']

    return {
      text,
      toolbarsExclude
    }
  },
  components: {
    MdEditor
  }
}
</script>
