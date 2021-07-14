import { watch, inject } from 'vue';
import bus from '../../utils/event-bus';
import { EditorContentProps } from './index';

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
