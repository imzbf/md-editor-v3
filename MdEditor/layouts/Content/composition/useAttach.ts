import { inject, Ref, onMounted } from 'vue';
import bus from '~/utils/event-bus';
import { TEXTAREA_FOCUS } from '~/static/event-name';
import CodeMirrorUt from '../codemirror';

/**
 * 一些附带的设置
 */
const useAttach = (codeMirrorUt: Ref<CodeMirrorUt | undefined>) => {
  const editorId = inject('editorId') as string;

  onMounted(() => {
    bus.on(editorId, {
      name: TEXTAREA_FOCUS,
      callback() {
        codeMirrorUt.value?.foucs();
      }
    });
  });
};

export default useAttach;
