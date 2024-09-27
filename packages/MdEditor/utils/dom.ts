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

/**
 * 缩放、拖拽mermaid模块
 */
export const zoomMermaid = (() => {
  const addEvent = (container: HTMLElement | null) => {
    if (!container) {
      return;
    }
    const content = container.firstChild as HTMLElement;

    let scale = 1;
    let posX = 0;
    let posY = 0;
    let isDragging = false;
    let startX: number, startY: number;
    let initialDistance: number;
    let initialScale = 1;

    const updateTransform = () => {
      content.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    };

    // 处理拖拽和单指移动
    container.addEventListener('touchstart', (event) => {
      if (event.touches.length === 1) {
        isDragging = true;
        startX = event.touches[0].clientX - posX;
        startY = event.touches[0].clientY - posY;
      } else if (event.touches.length === 2) {
        initialDistance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY
        );
        initialScale = scale;
      }
    });

    container.addEventListener('touchmove', (event) => {
      event.preventDefault();

      if (isDragging && event.touches.length === 1) {
        posX = event.touches[0].clientX - startX;
        posY = event.touches[0].clientY - startY;
        updateTransform();
      } else if (event.touches.length === 2) {
        const newDistance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY
        );
        const scaleChange = newDistance / initialDistance;
        const previousScale = scale;
        scale = initialScale * (1 + (scaleChange - 1)); // 调整缩放速度

        // 计算双指中心点
        const centerX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
        const centerY = (event.touches[0].clientY + event.touches[1].clientY) / 2;

        // 获取内容区域的边界
        const rect = content.getBoundingClientRect();
        // 计算相对位置
        const relativeX = (centerX - rect.left) / previousScale;
        const relativeY = (centerY - rect.top) / previousScale;

        // 调整 posX 和 posY 使得缩放发生在双指中心
        posX -= relativeX * (scale - previousScale);
        posY -= relativeY * (scale - previousScale);

        updateTransform();
      }
    });

    container.addEventListener('touchend', () => {
      isDragging = false;
    });

    // PC 端缩放功能
    container.addEventListener('wheel', (event) => {
      event.preventDefault();
      const scaleAmount = 0.02; // 缩放速度
      const previousScale = scale;

      if (event.deltaY < 0) {
        // 放大
        scale += scaleAmount;
      } else {
        // 缩小
        scale = Math.max(0.1, scale - scaleAmount);
      }

      // 计算鼠标相对于内容的位置
      const rect = content.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // 调整 posX 和 posY，以使缩放中心为鼠标位置
      posX -= (mouseX / previousScale) * (scale - previousScale);
      posY -= (mouseY / previousScale) * (scale - previousScale);

      updateTransform();
    });

    // PC 端拖拽功能
    container.addEventListener('mousedown', (event) => {
      isDragging = true;
      startX = event.clientX - posX;
      startY = event.clientY - posY;
    });

    container.addEventListener('mousemove', (event) => {
      if (isDragging) {
        posX = event.clientX - startX;
        posY = event.clientY - startY;
        updateTransform();
      }
    });

    container.addEventListener('mouseup', () => {
      isDragging = false;
    });

    container.addEventListener('mouseleave', () => {
      isDragging = false;
    });
  };

  const handler = (containers: NodeListOf<HTMLElement>) => {
    containers.forEach((mm) => {
      addEvent(mm);
    });
  };

  return handler;
})();
