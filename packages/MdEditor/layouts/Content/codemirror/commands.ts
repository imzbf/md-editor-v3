import { deleteLine } from '@codemirror/commands';
import { searchKeymap } from '@codemirror/search';
import { KeyBinding } from '@codemirror/view';
import { ON_SAVE } from '~/static/event-name';
import bus from '~/utils/event-bus';
import { emitReplace } from '~/utils/replace';

export const createCommands = (
  id: string,
  options: {
    noPrettier: boolean;
  }
) => {
  const CtrlB: KeyBinding = {
    key: 'Ctrl-b',
    mac: 'Cmd-b',
    run: () => {
      emitReplace(id, { direct: 'bold' });
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
      emitReplace(id, { direct: 'strikeThrough' });
      return true;
    }
  };

  const CtrlU: KeyBinding = {
    key: 'Ctrl-u',
    mac: 'Cmd-u',
    preventDefault: true,
    run: () => {
      // ctrl+u触发下划线
      emitReplace(id, { direct: 'underline' });
      return true;
    },
    shift: () => {
      // ctrl+shift+u触发无需列表
      emitReplace(id, { direct: 'unorderedList' });
      return true;
    }
  };

  const CtrlI: KeyBinding = {
    key: 'Ctrl-i',
    mac: 'Cmd-i',
    preventDefault: true,
    run: () => {
      emitReplace(id, { direct: 'italic' });
      return true;
    },
    shift: () => {
      // ctrl+shift+i触发图片链接
      emitReplace(id, { direct: 'image' });
      return true;
    }
  };

  const Ctrl1: KeyBinding = {
    key: 'Ctrl-1',
    mac: 'Cmd-1',
    run: () => {
      emitReplace(id, { direct: 'h1' });
      return true;
    }
  };

  const Ctrl2: KeyBinding = {
    key: 'Ctrl-2',
    mac: 'Cmd-2',
    run: () => {
      emitReplace(id, { direct: 'h2' });
      return true;
    }
  };
  const Ctrl3: KeyBinding = {
    key: 'Ctrl-3',
    mac: 'Cmd-3',
    run: () => {
      emitReplace(id, { direct: 'h3' });
      return true;
    }
  };
  const Ctrl4: KeyBinding = {
    key: 'Ctrl-4',
    mac: 'Cmd-4',
    run: () => {
      emitReplace(id, { direct: 'h4' });
      return true;
    }
  };
  const Ctrl5: KeyBinding = {
    key: 'Ctrl-5',
    mac: 'Cmd-5',
    run: () => {
      emitReplace(id, { direct: 'h5' });
      return true;
    }
  };
  const Ctrl6: KeyBinding = {
    key: 'Ctrl-6',
    mac: 'Cmd-6',
    run: () => {
      emitReplace(id, { direct: 'h6' });
      return true;
    }
  };

  const CtrlArrowUp: KeyBinding = {
    key: 'Ctrl-ArrowUp',
    mac: 'Cmd-ArrowUp',
    run: () => {
      emitReplace(id, { direct: 'sup' });
      return true;
    }
  };

  const CtrlArrowDown: KeyBinding = {
    key: 'Ctrl-ArrowDown',
    mac: 'Cmd-ArrowDown',
    run: () => {
      emitReplace(id, { direct: 'sub' });
      return true;
    }
  };

  // 放弃，优先级不如浏览器默认的高
  // const CtrlQ: KeyBinding = {
  //   key: 'Ctrl-q',
  //   mac: 'Cmd-q',
  //   run: () => {
  //     emitReplace(id, { direct: 'quote' });
  //     return true;
  //   }
  // };

  const CtrlO: KeyBinding = {
    key: 'Ctrl-o',
    mac: 'Cmd-o',
    run: () => {
      emitReplace(id, { direct: 'orderedList' });
      return true;
    }
  };

  const CtrlC: KeyBinding = {
    key: 'Ctrl-c',
    mac: 'Cmd-c',
    shift: () => {
      // ctrl+shift+c触发块级代码
      emitReplace(id, { direct: 'code' });
      return true;
    },
    any(_view, e) {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.code === 'KeyC') {
        // ctrl+alt+c触发行内代码
        emitReplace(id, { direct: 'codeRow' });
        return true;
      }

      return false;
    }
  };

  const CtrlL: KeyBinding = {
    key: 'Ctrl-l',
    mac: 'Cmd-l',
    run: () => {
      emitReplace(id, { direct: 'link' });
      return true;
    }
  };

  const CtrlF: KeyBinding = {
    key: 'Ctrl-f',
    mac: 'Cmd-f',

    shift: () => {
      // ctrl+shift+f 美化内容
      if (!options.noPrettier) {
        emitReplace(id, { direct: 'prettier' });
        return true;
      }
      return false;
    }
  };

  const CtrlT: KeyBinding = {
    any: (_view, e) => {
      // ctrl+shift+alt+t 新增表格
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.shiftKey && e.code === 'KeyT') {
        emitReplace(id, { direct: 'table' });
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
    CtrlT,
    ...searchKeymap
  ];
};
