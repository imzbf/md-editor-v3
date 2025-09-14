import { ComputedRef, inject, nextTick, onMounted, Ref, watch } from 'vue';
import { SettingType } from '~/type';
import { ContentPreviewProps } from '../ContentPreview';

export const useRemount = (
  props: ContentPreviewProps,
  html: Ref<string>,
  key: Ref<string>
) => {
  const setting = inject('setting') as ComputedRef<SettingType>;

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
  watch(() => setting.value.preview, settingPreviewChanged);
  watch(() => setting.value.htmlPreview, settingPreviewChanged);
  onMounted(handler);
};
