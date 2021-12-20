/**
 * 设置页面元素可移动
 *
 * @param trigger 触发器，通过该元素移动父级元素
 */
export const keyMove = (
  trigger: HTMLElement,
  moveHandler?: (left: number, top: number) => void
): (() => void) => {
  const triggerMouseDown = (mdown: MouseEvent) => {
    const parent: HTMLElement = trigger.parentElement || document.body;
    // 被移动框大小
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    // 当前页长宽
    const { clientWidth } = document.documentElement;
    const { clientHeight } = document.documentElement;

    const x = mdown.offsetX;
    const y = mdown.offsetY;

    const mouseMoveHandler = (e: MouseEvent) => {
      let tx = e.x + document.body.scrollLeft - document.body.clientLeft - x;
      let ty = e.y + document.body.scrollTop - document.body.clientTop - y;
      tx = tx < 1 ? 1 : tx < clientWidth - width - 1 ? tx : clientWidth - width - 1;
      ty = ty < 1 ? 1 : ty < clientHeight - height - 1 ? ty : clientHeight - height - 1;

      if (moveHandler) {
        moveHandler(tx, ty);
      } else {
        parent.style.left = `${tx}px`;
        parent.style.top = `${ty}px`;
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mouseup', mouseUpHandler);
  };

  trigger.addEventListener('mousedown', triggerMouseDown);

  return () => {
    // 清除时间监听
    trigger.removeEventListener('mousedown', triggerMouseDown);
  };
};

export const appendHandler = (ele: HTMLElement) => {
  // 判断页面上是否已经存在该内容
  if (!document.getElementById(ele.id)) {
    document.head.appendChild(ele);
  }
};
