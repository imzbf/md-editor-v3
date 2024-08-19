import bus from '~/utils/event-bus';
import { TASK_STATE_CHANGED } from '~/static/event-name';
import { ContentPreviewProps } from '../ContentPreview';
import { inject, nextTick, onBeforeUnmount, Ref, watch } from 'vue';

const template = {
  checked: {
    regexp: /- \[x\]/,
    value: '- [ ]'
  },
  unChecked: {
    regexp: /- \[\s\]/,
    value: '- [x]'
  }
};

export const useTaskState = (props: ContentPreviewProps, html: Ref<string>) => {
  const editorId = inject('editorId') as string;
  const rootRef = inject('rootRef') as Ref<HTMLDivElement>;

  let removeListener = () => {};

  const addListener = () => {
    // immediate会在服务端也执行
    if (!rootRef.value) {
      return false;
    }

    const tasks = rootRef.value.querySelectorAll('.task-list-item.enabled');

    const listener = (e: Event) => {
      e.preventDefault();
      const nextValue = (e.target as HTMLInputElement).checked ? 'unChecked' : 'checked';
      const line = (e.target as HTMLInputElement).parentElement?.dataset.line;

      if (!line) {
        return;
      }

      const lineNumber = Number(line);

      const lines = props.modelValue.split('\n');
      const targetValue = lines[Number(lineNumber)].replace(
        template[nextValue].regexp,
        template[nextValue].value
      );

      if (props.previewOnly) {
        lines[Number(lineNumber)] = targetValue;
        props.onChange(lines.join('\n'));
      } else {
        bus.emit(editorId, TASK_STATE_CHANGED, lineNumber + 1, targetValue);
      }
    };

    tasks.forEach((item) => {
      item.addEventListener('click', listener);
    });

    removeListener = () => {
      tasks.forEach((item) => {
        item.removeEventListener('click', listener);
      });
    };
  };

  onBeforeUnmount(() => {
    removeListener();
  });

  watch(
    [html],
    () => {
      removeListener();
      nextTick(addListener);
    },
    {
      immediate: true
    }
  );
};
