function keyMove(target: HTMLElement) {
  target.onmousedown = (mdown: MouseEvent) => {
    const parent: HTMLElement = target.parentElement || document.body;
    // 模块
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    // 当前页长宽
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;

    //
    const x = mdown.offsetX;
    const y = mdown.offsetY;

    //
    document.onmousemove = (e: MouseEvent) => {
      let tx =
        (e.pageX || e.clientX + document.body.scrollLeft - document.body.clientLeft) - x;
      let ty =
        (e.pageY || e.clientY + document.body.scrollTop - document.body.clientTop) - y;
      tx = tx < 1 ? 1 : tx < clientWidth - width - 1 ? tx : clientWidth - width - 1;
      ty = ty < 1 ? 1 : ty < clientHeight - height - 1 ? ty : clientHeight - height - 1;

      parent.style.left = tx + 'px';
      parent.style.top = ty + 'px';
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}

export default keyMove;
