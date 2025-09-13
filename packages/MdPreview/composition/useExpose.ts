import type { SetupContext } from 'vue';
import { RERENDER } from '~/static/event-name';
import { EditorEmits, ExposePreviewParam, MdPreviewProps } from '~/type';
import eventBus from '~/utils/event-bus';

export const useExpose = (
  props: MdPreviewProps,
  ctx: SetupContext<EditorEmits>,
  options: { editorId: string }
) => {
  const { editorId } = options;

  const exposeParam: ExposePreviewParam = {
    rerender() {
      eventBus.emit(editorId, RERENDER);
    }
  };

  ctx.expose(exposeParam);
};
