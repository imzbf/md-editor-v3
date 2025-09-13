import { nextTick, onMounted, Ref, watch } from 'vue';
import { ContentPreviewProps } from '../ContentPreview';

export const useRemount = (
  props: ContentPreviewProps,
  html: Ref<string>,
  key: Ref<string>
) => {
  const handler = () => {
    void nextTick(() => {
      props.onRemount?.();
    });
  };

  const settingPreviewChanged = (nVal: boolean) => {
    if (nVal) {
      handler();
    }
  };

  watch([html, key], handler);
  watch(() => props.setting.preview, settingPreviewChanged);
  watch(() => props.setting.htmlPreview, settingPreviewChanged);
  onMounted(handler);
};
