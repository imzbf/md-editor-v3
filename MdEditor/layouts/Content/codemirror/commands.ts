import { KeyBinding } from '@codemirror/view';
import { deleteLine } from '@codemirror/commands';
import bus from '~/utils/event-bus';
import { ToolDirective } from '~/utils/content-help';
import { ON_SAVE } from '~/static/event-name';
import { ContentProps } from '../props';

const createCommands = (id: string, contentProps: ContentProps) => {
  const CtrlB: KeyBinding = {
    key: 'Ctrl-b',
    mac: 'Cmd-b',
    run: () => {
      bus.emit(id, 'replace', 'bold' as ToolDirective);
      return true;
    }
  };

  const CtrlS: KeyBinding = {
    key: 'Ctrl-s',
    mac: 'Cmd-s',
    run: (view) => {
      // 触发保存事件
      bus.emit(id, ON_SAVE, view.state.doc.toString());
      return true;
    },
    shift: () => {
      bus.emit(id, 'replace', 'strikeThrough' as ToolDirective);
      return true;
    }
  };

  const CtrlU: KeyBinding = {
    key: 'Ctrl-u',
    mac: 'Cmd-u',
    run: () => {
      // ctrl+u触发下划线
      bus.emit(id, 'replace', 'underline' as ToolDirective);
      return true;
    },
    shift: () => {
      // ctrl+shift+u触发无需列表
      bus.emit(id, 'replace', 'unorderedList' as ToolDirective);
      return true;
    }
  };

  const CtrlI: KeyBinding = {
    key: 'Ctrl-i',
    mac: 'Cmd-i',
    run: () => {
      bus.emit(id, 'replace', 'italic' as ToolDirective);
      return true;
    },
    shift: () => {
      // ctrl+shift+i触发图片链接
      bus.emit(id, 'openModals', 'image');
      return true;
    }
  };

  const Ctrl1: KeyBinding = {
    key: 'Ctrl-1',
    mac: 'Cmd-1',
    run: () => {
      bus.emit(id, 'replace', 'h1' as ToolDirective);
      return true;
    }
  };

  const Ctrl2: KeyBinding = {
    key: 'Ctrl-2',
    mac: 'Cmd-2',
    run: () => {
      bus.emit(id, 'replace', 'h2' as ToolDirective);
      return true;
    }
  };
  const Ctrl3: KeyBinding = {
    key: 'Ctrl-3',
    mac: 'Cmd-3',
    run: () => {
      bus.emit(id, 'replace', 'h3' as ToolDirective);
      return true;
    }
  };
  const Ctrl4: KeyBinding = {
    key: 'Ctrl-4',
    mac: 'Cmd-4',
    run: () => {
      bus.emit(id, 'replace', 'h4' as ToolDirective);
      return true;
    }
  };
  const Ctrl5: KeyBinding = {
    key: 'Ctrl-5',
    mac: 'Cmd-5',
    run: () => {
      bus.emit(id, 'replace', 'h5' as ToolDirective);
      return true;
    }
  };
  const Ctrl6: KeyBinding = {
    key: 'Ctrl-6',
    mac: 'Cmd-6',
    run: () => {
      bus.emit(id, 'replace', 'h6' as ToolDirective);
      return true;
    }
  };

  const CtrlArrowUp: KeyBinding = {
    key: 'Ctrl-ArrowUp',
    mac: 'Cmd-ArrowUp',
    run: () => {
      bus.emit(id, 'replace', 'sup' as ToolDirective);
      return true;
    }
  };

  const CtrlArrowDown: KeyBinding = {
    key: 'Ctrl-ArrowDown',
    mac: 'Cmd-ArrowDown',
    run: () => {
      bus.emit(id, 'replace', 'sub' as ToolDirective);
      return true;
    }
  };

  // 放弃，优先级不如浏览器默认的高
  // const CtrlQ: KeyBinding = {
  //   key: 'Ctrl-q',
  //   mac: 'Cmd-q',
  //   run: () => {
  //     bus.emit(id, 'replace', 'quote' as ToolDirective);
  //     return true;
  //   }
  // };

  const CtrlO: KeyBinding = {
    key: 'Ctrl-o',
    mac: 'Cmd-o',
    run: () => {
      bus.emit(id, 'replace', 'orderedList' as ToolDirective);
      return true;
    }
  };

  const CtrlC: KeyBinding = {
    key: 'Ctrl-c',
    mac: 'Cmd-c',
    shift: () => {
      // ctrl+shift+c触发块级代码
      bus.emit(id, 'replace', 'code' as ToolDirective);
      return true;
    },
    any(_view, e) {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.code === 'KeyC') {
        // ctrl+alt+c触发行内代码
        bus.emit(id, 'replace', 'codeRow' as ToolDirective);
        return true;
      }

      return false;
    }
  };

  const CtrlL: KeyBinding = {
    key: 'Ctrl-l',
    mac: 'Cmd-l',
    run: () => {
      bus.emit(id, 'openModals', 'link' as ToolDirective);
      return true;
    }
  };

  const CtrlF: KeyBinding = {
    key: 'Ctrl-f',
    mac: 'Cmd-f',

    shift: () => {
      // ctrl+shift+f 美化内容
      if (!contentProps.noPrettier) {
        bus.emit(id, 'replace', 'prettier');
        return true;
      }
      return false;
    }
  };

  const CtrlT: KeyBinding = {
    any: (_view, e) => {
      // ctrl+shift+alt+t 新增表格
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.shiftKey && e.code === 'KeyT') {
        bus.emit(id, 'replace', 'table');
        return true;
      }

      return false;
    }
  };

  const CtrlD: KeyBinding = {
    key: 'Ctrl-d',
    mac: 'Cmd-d',
    run: deleteLine,
    preventDefault: true
  };

  return [
    CtrlB,
    CtrlD,
    CtrlS,
    CtrlU,
    CtrlI,
    Ctrl1,
    Ctrl2,
    Ctrl3,
    Ctrl4,
    Ctrl5,
    Ctrl6,
    CtrlArrowUp,
    CtrlArrowDown,
    CtrlO,
    CtrlC,
    CtrlL,
    CtrlF,
    CtrlT
  ];
};

export default createCommands;
