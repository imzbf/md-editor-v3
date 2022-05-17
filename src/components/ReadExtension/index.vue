<template>
  <modal-toolbar
    :visible="state.visible"
    :is-fullscreen="state.modalFullscreen"
    show-adjust
    title="帮助"
    modal-title="编辑预览"
    width="870px"
    height="600px"
    @onClick="state.visible = true"
    @onClose="state.visible = false"
    @onAdjust="state.modalFullscreen = !state.modalFullscreen"
  >
    <div style="height: 100%; padding: 20px; overflow: auto">
      <md-editor-v3
        :theme="store.state.theme"
        :language="store.state.lang"
        :preview-theme="store.state.previewTheme"
        :code-theme="store.state.codeTheme"
        editor-id="edit2preview"
        preview-only
        :modelValue="props.mdText"
      />
    </div>
    <template #trigger>
      <svg class="md-icon" aria-hidden="true">
        <use xlink:href="#icon-read"></use>
      </svg>
    </template>
  </modal-toolbar>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  mdText: String
});

const state = reactive({
  visible: false,
  modalFullscreen: false
});

const store = useStore();
</script>

<script lang="ts">
export default {
  name: 'ReadExtension'
};
</script>
