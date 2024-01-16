import type { SetupContext } from 'vue';
import eventBus from '~/utils/event-bus';
import { EditorEmits, ExposePreviewParam, MdPreviewProps } from '~/type';
import { RERENDER } from '~/static/event-name';

export const useExpose = (props: MdPreviewProps, ctx: SetupContext<EditorEmits>) => {
  const { editorId } = props;

  const exposeParam: ExposePreviewParam = {
    rerender() {
      eventBus.emit(editorId, RERENDER);
    }
  };

  ctx.expose(exposeParam);
};
