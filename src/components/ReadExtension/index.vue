<template>
  <modal-toolbar
    :visible="state.visible"
    :is-fullscreen="state.modalFullscreen"
    show-adjust
    title="帮助"
    modal-title="编辑预览"
    width="870px"
    height="600px"
    @on-click="state.visible = true"
    @on-close="state.visible = false"
    @on-adjust="state.modalFullscreen = !state.modalFullscreen"
  >
    <div style="height: 100%; padding: 20px; overflow: auto">
      <md-editor-v3
        :theme="store.state.theme"
        :language="store.state.lang"
        :preview-theme="store.state.previewTheme"
        :code-theme="store.state.codeTheme"
        editor-id="edit2preview"
        preview-only
        :model-value="props.mdText"
        :marked-heading-id="readingHeadingId"
      />
    </div>
    <template #trigger>
      <svg class="md-editor-icon" aria-hidden="true">
        <use xlink:href="#icon-read"></use>
      </svg>
    </template>
  </modal-toolbar>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import type { PropType } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  mdText: {
    type: String as PropType<string>,
    default: ''
  }
});

const state = reactive({
  visible: false,
  modalFullscreen: false
});

const store = useStore();

/**
 * modal-toolbar组件不会再关闭时销毁子组件，这时需要区别预览扩展组件的标题ID生成方式和编辑器的标题ID生成方式
 *
 * @see https://github.com/imzbf/md-editor-v3/issues/207
 **/
const readingHeadingId = (_text: string, _level: number, index: number) =>
  `read-ex-heading-${index}`;
</script>

<script lang="ts">
export default {
  name: 'ReadExtension'
};
</script>
