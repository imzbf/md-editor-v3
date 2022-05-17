<template>
  <normal-toolbar title="mark" @click="markHandler">
    <template #trigger>
      <svg class="md-icon" aria-hidden="true">
        <use xlink:href="#icon-mark"></use>
      </svg>
    </template>
  </normal-toolbar>
</template>

<script setup lang="ts">
const props = defineProps({
  editorId: String
});

const markHandler = () => {
  // 获取输入框
  const textarea = document.querySelector(
    `#${props.editorId}-textarea`
  ) as HTMLTextAreaElement;
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

  textarea.value = `${prefixStr}${markStr}${suffixStr}`;

  setTimeout(() => {
    textarea.setSelectionRange(endPoint, markStr.length + endPoint);
    textarea.focus();
  }, 0);
};
</script>

<script lang="ts">
export default {
  name: 'MarkExtension'
};
</script>
