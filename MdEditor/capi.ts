import { onMounted, onUnmounted, SetupContext } from 'vue';
import bus from './utils/event-bus';
import { ToolDirective } from './utils';
import { ToolbarNames } from './Editor';

export const useKeyBoard = (props: any, context: SetupContext) => {
  const initFunc = (name: ToolbarNames) =>
    props.toolbars?.includes(name) && !props.toolbarsExclude?.includes(name);

  const keyDownHandler = (event: KeyboardEvent) => {
    // 按键操作是否会替换内容
    // let toReplaceValue = false;

    // macos中以meta键位配s键位为保存，windows中如此会被系统默认的事件替代
    if (event.ctrlKey || event.metaKey) {
      switch (event.code) {
        case 'KeyS': {
          if (event.shiftKey) {
            // 删除线
            if (initFunc('strikeThrough')) {
              bus.emit('replace', 'strikeThrough' as ToolDirective);
            }
          } else {
            // 触发保存事件
            if (initFunc('save')) {
              bus.emit('onSave', props.modelValue);
              event.preventDefault();
            }
          }
          break;
        }
        case 'KeyB': {
          if (initFunc('bold')) {
            bus.emit('replace', 'bold' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'KeyU': {
          if (event.shiftKey) {
            // ctrl+shift+u触发无需列表
            if (initFunc('unorderedList')) {
              bus.emit('replace', 'unorderedList' as ToolDirective);
              event.preventDefault();
            }
          } else {
            // ctrl+u触发下划线
            if (initFunc('underline')) {
              bus.emit('replace', 'underline' as ToolDirective);
              event.preventDefault();
            }
          }

          break;
        }
        case 'KeyI': {
          if (event.shiftKey) {
            // ctrl+shift+l触发图片链接
            if (initFunc('image')) {
              bus.emit('openModals', 'img');
              event.preventDefault();
            }
          } else {
            if (initFunc('italic')) {
              bus.emit('replace', 'italic' as ToolDirective);
              event.preventDefault();
            }
          }

          break;
        }
        case 'Digit1': {
          if (initFunc('title')) {
            bus.emit('replace', 'h1' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit2': {
          if (initFunc('title')) {
            bus.emit('replace', 'h2' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit3': {
          if (initFunc('title')) {
            bus.emit('replace', 'h3' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit4': {
          if (initFunc('title')) {
            bus.emit('replace', 'h4' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit5': {
          if (initFunc('title')) {
            bus.emit('replace', 'h5' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'Digit6': {
          if (initFunc('title')) {
            bus.emit('replace', 'h6' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'ArrowUp': {
          if (initFunc('sup')) {
            bus.emit('replace', 'sup' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'ArrowDown': {
          if (initFunc('sub')) {
            bus.emit('replace', 'sub' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'KeyQ': {
          bus.emit('replace', 'quote' as ToolDirective);
          event.preventDefault();
          break;
        }
        case 'KeyO': {
          if (initFunc('orderedList')) {
            bus.emit('replace', 'orderedList' as ToolDirective);
            event.preventDefault();
          }
          break;
        }
        case 'KeyC': {
          if (event.shiftKey) {
            // ctrl+shift+c触发块级代码
            if (initFunc('code')) {
              bus.emit('replace', 'code' as ToolDirective);
              event.preventDefault();
            }
          } else if (event.altKey) {
            // ctrl+alt+c触发行内代码
            if (initFunc('codeRow')) {
              bus.emit('replace', 'codeRow' as ToolDirective);
              event.preventDefault();
            }
          }
          break;
        }
        case 'KeyL': {
          // ctrl+l触发普通链接
          if (initFunc('link')) {
            bus.emit('openModals', 'link');
            event.preventDefault();
          }
          break;
        }
        case 'KeyZ': {
          if (event.shiftKey) {
            // ctrl+shift+z 前进一步
            if (initFunc('next')) {
              bus.emit('ctrlShiftZ');
              event.preventDefault();
            }
          } else {
            // ctrl+z 后退一步
            if (initFunc('revoke')) {
              bus.emit('ctrlZ');
              event.preventDefault();
            }
          }

          break;
        }
        case 'KeyF': {
          // ctrl+shift+f 美化内容
          if (event.shiftKey) {
            if (initFunc('prettier')) {
              bus.emit('replace', 'prettier');
              event.preventDefault();
            }
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
    if (!props.previewOnly) {
      window.addEventListener('keydown', keyDownHandler);

      document.addEventListener('paste', pasteHandler);
    }
  });

  // 编辑器卸载时移除相应的监听事件
  onUnmounted(() => {
    window.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('paste', pasteHandler);
  });

  // 注册保存事件
  !props.previewOnly &&
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
};
