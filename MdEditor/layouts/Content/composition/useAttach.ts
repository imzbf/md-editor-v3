import { inject, Ref, onMounted } from 'vue';
import bus from '~/utils/event-bus';

import { TEXTAREA_FOCUS } from '~/static/event-name';

/**
 * 一些附带的设置
 */
const useAttach = (textAreaRef: Ref) => {
  const editorId = inject('editorId') as string;

  onMounted(() => {
    bus.on(editorId, {
      name: TEXTAREA_FOCUS,
      callback() {
        textAreaRef.value?.focus();
      }
    });
  });
};

export default useAttach;
