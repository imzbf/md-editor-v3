/**
 * 设置页面元素可移动
 *
 * @param trigger 触发器，通过该元素移动父级元素
 * @param moveHandler
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
    const { clientWidth, clientHeight } = document.documentElement;

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

/**
 * 向页面插入外链标签
 *
 * @param ele
 * @param checkKey 全局名称
 */
export const appendHandler = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes: Partial<HTMLElementTagNameMap[K]>,
  checkKey = ''
) => {
  const insertedEle = document.getElementById(attributes.id!);

  if (!insertedEle) {
    // 浅拷贝
    const attrsCopy = { ...attributes };
    attrsCopy.onload = null;
    const ele = createHTMLElement(tagName, attrsCopy);
    attributes.onload && ele.addEventListener('load', attributes.onload);
    document.head.appendChild(ele);
  } else if (checkKey !== '') {
    if (Reflect.get(window, checkKey)) {
      // 实例已存在，直接触发load事件
      attributes.onload?.call(insertedEle, new Event('load'));
    } else {
      attributes.onload && insertedEle.addEventListener('load', attributes.onload);
    }
  }
};

/**
 * 更新插入的元素属性
 *
 * @param id id选择器
 * @param attr 属性名
 * @param value 属性值
 */
export const updateHandler = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes: Partial<HTMLElementTagNameMap[K]>
) => {
  const insertedEle = document.getElementById(attributes.id!);
  insertedEle?.remove();

  appendHandler(tagName, attributes);
};

/**
 * 创建带属性的原始标签
 *
 * @param tagName
 * @param attributes
 * @returns
 */
export const createHTMLElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes: Partial<HTMLElementTagNameMap[K]>
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tagName);

  // 设置提供的属性到标签上
  Object.keys(attributes).forEach((key) => {
    if (attributes[key as keyof HTMLElementTagNameMap[K]] !== undefined) {
      (element as any)[key] = attributes[key as keyof HTMLElementTagNameMap[K]];
    }
  });

  return element;
};
