import { reactive, CSSProperties } from 'vue';

export const useStyle = (data: any) => {
  const editor = reactive<CSSProperties>(data.editorStyle);

  return {
    editor
  };
};
