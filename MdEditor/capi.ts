import { onMounted, onUnmounted, reactive, CSSProperties, SetupContext } from 'vue';
import { PropsType } from './Editor';
import bus from './utils/event-bus';
import { ToolDirective } from './utils';

export const useStyle = (data: any) => {
  const editor = reactive<CSSProperties>(data.editorStyle);

  return {
    editor
  };
};

export const useKeyBoard = (props: PropsType, context: SetupContext) => {
  // 先注册保存事件
  bus.on({
    name: 'onSave',
    callback() {
      if (props.onSave) {
        props.onSave(props.value);
      } else {
        context.emit('onSave', props.value);
      }
    }
  });

  const keyDownHandler = (event: KeyboardEvent) => {
    // 按键操作是否会替换内容
    // let toReplaceValue = false;
    // macos中以meta键位配s键位为保存，windows中如此会被系统默认的事件替代
    if (
      (event.ctrlKey && event.code === 'KeyS') ||
      (event.metaKey && event.code === 'KeyS')
    ) {
      // 触发保存事件
      bus.emit('onSave', props.value);

      event.stopPropagation();
      event.preventDefault();
    } else if (
      (event.ctrlKey && event.code === 'KeyB') ||
      (event.metaKey && event.code === 'KeyB')
    ) {
      bus.emit('replace', 'bold' as ToolDirective);
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', keyDownHandler);
  });

  // 编辑器卸载时移除相应的监听事件
  onUnmounted(() => {
    window.removeEventListener('keydown', keyDownHandler);
  });
};
