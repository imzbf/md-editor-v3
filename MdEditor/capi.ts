import { onMounted, onUnmounted, SetupContext } from 'vue';
import { PropsType } from './Editor';
import bus from './utils/event-bus';
import { ToolDirective } from './utils';

export const useKeyBoard = (props: PropsType, context: SetupContext) => {
  // 先注册保存事件
  bus.on({
    name: 'onSave',
    callback() {
      if (props.onSave) {
        props.onSave(props.modelValue);
      } else {
        context.emit('onSave', props.modelValue);
      }
    }
  });

  const keyDownHandler = (event: KeyboardEvent) => {
    // 按键操作是否会替换内容
    // let toReplaceValue = false;

    // macos中以meta键位配s键位为保存，windows中如此会被系统默认的事件替代
    if (event.ctrlKey || event.metaKey) {
      switch (event.code) {
        case 'KeyS': {
          if (event.shiftKey) {
            // 删除线
            bus.emit('replace', 'strikeThrough' as ToolDirective);
          } else {
            // 触发保存事件
            bus.emit('onSave', props.modelValue);
            event.preventDefault();
          }
          break;
        }
        case 'KeyB': {
          bus.emit('replace', 'bold' as ToolDirective);
          event.preventDefault();
          break;
        }
        case 'KeyU': {
          if (event.shiftKey) {
            // ctrl+shift+u触发无需列表
            bus.emit('replace', 'unorderedList' as ToolDirective);
          } else {
            // ctrl+u触发下划线
            bus.emit('replace', 'underline' as ToolDirective);
          }
          event.preventDefault();
          break;
        }
        case 'KeyI': {
          if (event.shiftKey) {
            // ctrl+shift+l触发图片链接
            bus.emit('openModals', 'img');
          } else {
            bus.emit('replace', 'italic' as ToolDirective);
          }
          event.preventDefault();
          break;
        }
        case 'Digit1': {
          bus.emit('replace', 'h1' as ToolDirective);
          event.preventDefault();
          break;
        }
        case 'Digit2': {
          bus.emit('replace', 'h2' as ToolDirective);
          event.preventDefault();
          break;
        }
        case 'Digit3': {
          bus.emit('replace', 'h3' as ToolDirective);
          event.preventDefault();
          break;
        }
        case 'Digit4': {
          bus.emit('replace', 'h4' as ToolDirective);
          event.preventDefault();
          break;
        }
        case 'Digit5': {
          bus.emit('replace', 'h5' as ToolDirective);
          event.preventDefault();
          break;
        }
        case 'Digit6': {
          bus.emit('replace', 'h6' as ToolDirective);
          event.preventDefault();
          break;
        }
        case 'ArrowUp': {
          bus.emit('replace', 'sup' as ToolDirective);
          event.preventDefault();
          break;
        }
        case 'ArrowDown': {
          bus.emit('replace', 'sub' as ToolDirective);
          event.preventDefault();
          break;
        }
        case 'KeyQ': {
          bus.emit('replace', 'quote' as ToolDirective);
          event.preventDefault();
          break;
        }
        case 'KeyO': {
          bus.emit('replace', 'orderedList' as ToolDirective);
          event.preventDefault();
          break;
        }
        case 'KeyC': {
          if (event.shiftKey) {
            // ctrl+shift+c触发块级代码
            bus.emit('replace', 'code' as ToolDirective);
            event.preventDefault();
          } else if (event.altKey) {
            // ctrl+alt+c触发行内代码
            bus.emit('replace', 'codeRow' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'KeyL': {
          // ctrl+l触发普通链接
          bus.emit('openModals', 'link');

          event.preventDefault();
          break;
        }
        case 'KeyZ': {
          if (event.shiftKey) {
            // ctrl+shift+z 前进一步
            bus.emit('ctrlShiftZ');
          } else {
            // ctrl+z 后退一步
            bus.emit('ctrlZ');
          }
          event.preventDefault();
          break;
        }
        case 'KeyF': {
          // ctrl+shift+f 美化内容
          if (event.shiftKey) {
            bus.emit('replace', 'prettier');
            event.preventDefault();
          }
          break;
        }
      }
    }
  };

  // 粘贴板上传
  const pasteHandler = (e: ClipboardEvent) => {
    if (e.clipboardData && e.clipboardData.files.length > 0) {
      const file = e.clipboardData.files[0];

      if (/image\/.*/.test(file.type)) {
        bus.emit('uploadImage', [file]);
        e.preventDefault();
      }
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', keyDownHandler);

    document.addEventListener('paste', pasteHandler);
  });

  // 编辑器卸载时移除相应的监听事件
  onUnmounted(() => {
    window.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('paste', pasteHandler);
  });
};
