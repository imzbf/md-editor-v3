<template>
  <ModalToolbar
    showAdjust
    title="帮助"
    modalTitle="编辑预览"
    width="870px"
    height="600px"
    :visible="state.visible"
    :isFullscreen="state.modalFullscreen"
    @onClick="state.visible = true"
    @onClose="state.visible = false"
    @onAdjust="() => (state.modalFullscreen = !state.modalFullscreen)"
  >
    <div style="height: 100%; padding: 20px; overflow: auto">
      <MdEditorV3
        :theme="store.state.theme"
        :language="store.state.lang"
        :previewTheme="store.state.previewTheme"
        :codeTheme="store.state.codeTheme"
        editorId="edit2preview"
        previewOnly
        :modelValue="props.mdText"
        :mdHeadingId="readingHeadingId"
      />
    </div>
    <template #trigger>
      <svg class="md-editor-icon" aria-hidden="true">
        <use xlink:href="#icon-read"></use>
      </svg>
    </template>
  </ModalToolbar>
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
