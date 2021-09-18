/**
 * 基础防抖
 *
 * @param event 目标事件
 * @param delay 延迟时间
 * @returns function
 */
export const debounce = (event: () => void, delay = 100) => {
  let timer: any = -1;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(event, delay);
  };
};
