export const replaceTemplate = (
  text: string,
  target: {
    [key: string]: string;
  }
) => {
  return Object.keys(target).reduce((prev, curr) => {
    return prev.replaceAll(`$\{${curr}}`, target[curr]);
  }, text);
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
