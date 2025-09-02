import { inject, Ref, onMounted } from 'vue';
import { TEXTAREA_FOCUS } from '~/static/event-name';
import { FocusOption } from '~/type';
import bus from '~/utils/event-bus';
import CodeMirrorUt from '../codemirror';

/**
 * 一些附带的设置
 *
 * @deprecated 暂时没啥用
 */
const useAttach = (codeMirrorUt: Ref<CodeMirrorUt | undefined>) => {
  const editorId = inject('editorId') as string;

  onMounted(() => {
    bus.on(editorId, {
      name: TEXTAREA_FOCUS,
      callback(options: FocusOption) {
        codeMirrorUt.value?.focus(options);
      }
    });
  });
};

export default useAttach;
