/**
 * 平滑滚动
 *
 * @param ele 滚动容器
 * @param top 目标位置
 */
const smoothScroll = (ele: HTMLElement, top: number, cb?: () => void) => {
  // 当前滚动高度
  let scrollTop = ele.scrollTop;

  const scrollHandler = () => {
    // 距离目标距离
    const distance = top - scrollTop;
    // 加上本次滚动位置
    scrollTop = scrollTop + distance / 5;

    if (Math.abs(distance) < 1) {
      ele.scrollTo(0, top);
      cb && setTimeout(cb, 100);
    } else {
      ele.scrollTo(0, scrollTop);
      requestAnimationFrame(scrollHandler);
    }
  };

  scrollHandler();
};

export default smoothScroll;
