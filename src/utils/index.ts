import { version } from '../../package.json';

/**
 * 防抖方法封装
 *
 * @param fn 目标方法
 * @param ms 防抖延迟
 * @returns
 */
export const debounce = (fn: (...params: Array<any>) => any, ms = 200) => {
  let timer = 0;

  return (...params: Array<any>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = window.setTimeout(() => {
      fn.apply(this, params);
      timer = 0;
    }, ms);
  };
};
export const replaceVersion = (text: string): string => {
  return text.replace(/\$\{EDITOR_VERSION\}/g, version);
};

/**
 * 获取距离body的位置
 *
 * @param targetEle
 * @returns
 */
export const getOffset = (targetEle: HTMLElement) => {
  let parentEle = targetEle.offsetParent as HTMLElement;
  let offsetTop = targetEle.offsetTop;
  let offsetLeft = targetEle.offsetLeft;

  if (parentEle?.nodeName.toLowerCase() !== 'body') {
    while (parentEle) {
      offsetTop += parentEle?.offsetTop;
      offsetLeft += parentEle?.offsetLeft;
      parentEle = parentEle?.offsetParent as HTMLElement;
    }
  }

  return {
    left: offsetLeft,
    top: offsetTop
  };
};
