<template>
  <dropdown-toolbar title="emoji" :visible="state.visible" @onChange="onChange">
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

<script lang="ts" setup>
import { reactive } from 'vue';
import { emojis } from './data';

const props = defineProps({
  editorId: String
});

const emit = defineEmits(['onChange']);

const state = reactive({
  visible: false
});

const emojiHandler = (emoji: string) => {
  // 获取输入框
  const textarea = document.querySelector(
    `#${props.editorId}-textarea`
  ) as HTMLTextAreaElement;
  // 获取选中的内容
  const selection = window.getSelection()?.toString();
  // 获取鼠标位置
  const endPoint = textarea.selectionStart;

  // 根据鼠标位置分割旧文本
  // 前半部分
  const prefixStr = textarea.value.substring(0, endPoint);
  // 后半部分
  const suffixStr = textarea.value.substring(endPoint + (selection?.length || 0));

  emit('onChange', `${prefixStr}${emoji}${suffixStr}`);

  setTimeout(() => {
    textarea.setSelectionRange(endPoint, endPoint + 1);
    textarea.focus();
  }, 0);
};

const onChange = (visible: boolean) => {
  state.visible = visible;
};
</script>

<script lang="ts">
export default {
  name: 'EmojiExtension'
};
</script>
