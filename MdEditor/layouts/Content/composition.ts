import { watch, inject, computed, ref } from 'vue';
import marked from 'marked';
import bus from '../../utils/event-bus';
import { EditorContentProps } from './index';
import { HeadList } from '../../Editor';

interface HistoryDataType {
  // 历史记录列表
  list: Array<string>;
  // 是否是手动输入而非撤回
  userUpdated: boolean;
  // 当前记录位置
  curr: number;
}

export const useHistory = (props: EditorContentProps) => {
  const historyLength = inject('historyLength') as number;

  // 防抖ID
  let saveHistoryId = -1;

  const history: HistoryDataType = {
    list: [props.value],
    userUpdated: true,
    curr: 0
  };

  watch(
    () => props.value,
    (nVal) => {
      clearTimeout(saveHistoryId);

      saveHistoryId = <any>setTimeout(() => {
        // 如果不是撤销操作，就记录
        if (history.userUpdated) {
          // 重置撤回之前的记录
          if (history.curr < history.list.length - 1) {
            history.list = history.list.slice(0, history.curr + 1);
          }
          if (history.list.length > historyLength) {
            history.list.shift();
          }

          history.list.push(nVal);
          // 下标调整为最后一个位置
          history.curr = history.list.length - 1;
        } else {
          history.userUpdated = true;
        }
      }, 500);
    }
  );

  bus.on({
    name: 'ctrlZ',
    callback() {
      history.userUpdated = false;
      // 倒退一个下标，最多倒退到0
      history.curr = history.curr - 1 < 0 ? 0 : history.curr - 1;
      props.onChange(history.list[history.curr]);
    }
  });

  bus.on({
    name: 'ctrlShiftZ',
    callback() {
      history.userUpdated = false;
      // 前进一个下标，最多倒退到最大下标
      history.curr =
        history.curr + 1 === history.list.length ? history.curr : history.curr + 1;
      props.onChange(history.list[history.curr]);
    }
  });
};

export const useMarked = (props: EditorContentProps) => {
  const highlightInited = ref(false);

  // 标题数目
  let count = Number(0);
  // 标题列表，扁平结构
  let headstemp: HeadList[] = new Array();

  // marked渲染实例
  const renderer = new marked.Renderer();

  // 标题重构
  renderer.heading = (text, level) => {
    headstemp.push({ text, level });
    count++;

    // Bug marked单实例，count等依赖被共享

    return `<h${level} id="heading-${count}"><span class="h-text">${text}</span></h${level}>`;
  };

  marked.setOptions({
    renderer
  });

  if (props.hljs) {
    // 提供了hljs，在创建阶段即完成设置
    marked.setOptions({
      highlight: (code) => props.hljs.highlightAuto(code).value
    });
  }

  // ---预览代码---
  const html = computed(() => {
    // 重置标题说和标题列表
    count = 0;
    headstemp = [];
    const markedContent = marked(props.value);

    // 代码高亮加载完成后再重新编译一次代码
    if (highlightInited.value) {
      return markedContent;
    } else {
      return markedContent;
    }
  });

  // 高亮代码js加载完成后回调
  const highlightLoad = () => {
    marked.setOptions({
      highlight(code) {
        return window.hljs.highlightAuto(code).value;
      }
    });

    highlightInited.value = true;
  };

  watch(
    () => html.value,
    (nVal) => {
      // 变化时调用变化事件
      props.onHtmlChanged(nVal);
      props.onGetCatalog(headstemp);
    }
  );

  return {
    html,
    highlightLoad
  };
};
