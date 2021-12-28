/**
 * created by zbf at 2019-12-13 10:24:20
 *
 * 设置foucs位置/选中元素
 *
 * @param tarDom 目标元素
 * @param startPos 选中开始位置
 * @param endPos 结束位置
 */
export const setPosition = (
  tarDom: HTMLInputElement | HTMLTextAreaElement,
  startPos = 0,
  endPos = startPos
): void => {
  if (tarDom.setSelectionRange) {
    // setTimeout必须写，不然setSelectionRange无效
    // https://stackoverflow.com/questions/11723420/chrome-setselectionrange-not-work-in-oninput-handler
    setTimeout(() => {
      tarDom.setSelectionRange(startPos, endPos);
      tarDom.focus();
    }, 0);
  } else {
    console.log('can not reset position!');
  }
};

/**
 * created by zbf at 2019-12-13 09:56:23
 *
 * 从focus位置插入元素
 *
 * @param dom 需要插入的input或textarea元素
 * @param tarValue 插入的目标值
 * @param params 光标定位偏移
 * @returns 插入后的值
 */
export const insert = (
  dom: HTMLInputElement | HTMLTextAreaElement,
  tarValue: string,
  params: {
    deviationStart?: number;
    deviationEnd?: number;
    select?: boolean;
    direct?: boolean;
    prefixVal?: string; // 前半部分内容
    subfixVal?: string; // 后半部分内容
  }
) => {
  const { deviationStart = 0, deviationEnd = 0, direct = false, select = false } = params;
  // 返回值
  let res = '';
  if (dom.selectionStart || dom.selectionStart === 0) {
    const startPos = dom.selectionStart;
    const endPos = dom.selectionEnd || 0;

    const {
      prefixVal = dom.value.substring(0, startPos),
      subfixVal = dom.value.substring(endPos, dom.value.length)
    } = params;

    res = prefixVal + tarValue + subfixVal;

    // 设置光标位置
    setPosition(
      dom,
      // 选中值开始位置为设定开始，否者为结束位置
      select ? startPos + deviationStart : startPos + tarValue.length + deviationEnd,
      startPos + tarValue.length + deviationEnd
    );
  } else {
    res += tarValue;
  }

  if (direct) {
    dom.value = res;
  }

  return res;
};

/**
 * js模拟a链接点击
 *
 * @param {string} url 目标地址
 * @param {*} option 是否新窗口、是否要求不跟踪
 */
export const goto = (
  url: string,
  option = {
    newWindow: true,
    nofollow: true
  }
) => {
  if (!url) {
    console.warn('error link!');
  }

  const aEle = document.createElement('a');
  aEle.href = url;
  aEle.style.display = 'none';

  if (option.newWindow) {
    aEle.target = '_blank';
  }

  if (option.nofollow) {
    aEle.rel = 'noopener noreferrer';
  }

  document.body.appendChild(aEle);
  aEle.click();
  document.body.removeChild(aEle);
};

/**
 * 两块区域同步滚动
 *
 * @param pEle 宿主区域
 * @param cEle 寄主区域
 * @returns 清除监听的方法
 */
export const scrollAuto = (pEle: HTMLElement, cEle: HTMLElement) => {
  // 注册一个防抖监听事件函数
  const addEvent = debounce(() => {
    // 宿主绑定事件
    pEle.removeEventListener('scroll', scrollHandler);
    pEle.addEventListener('scroll', scrollHandler);

    // 寄主绑定事件
    cEle.removeEventListener('scroll', scrollHandler);
    cEle.addEventListener('scroll', scrollHandler);
  }, 50);

  const scrollHandler = (e: Event) => {
    const pHeight = pEle.clientHeight;
    const cHeight = cEle.clientHeight;

    const pScrollHeight = pEle.scrollHeight;
    const cScrollHeight = cEle.scrollHeight;
    // 计算一个高度比
    const scale = (pScrollHeight - pHeight) / (cScrollHeight - cHeight);

    if (e.target === pEle) {
      // 清除寄主监听
      cEle.removeEventListener('scroll', scrollHandler);
      cEle.scrollTo({
        top: pEle.scrollTop / scale
        // behavior: 'smooth'
      });

      addEvent();
    } else {
      // 清除宿主监听
      pEle.removeEventListener('scroll', scrollHandler);

      pEle.scrollTo({
        top: cEle.scrollTop * scale
        // behavior: 'smooth'
      });

      addEvent();
    }
  };

  return [
    addEvent,
    () => {
      pEle.removeEventListener('scroll', scrollHandler);
      cEle.removeEventListener('scroll', scrollHandler);
    }
  ];
};

/**
 * 转换base64为file对象
 * 方法来自网络
 *
 * @param base64 Base64
 * @param fileName 图片名称
 * @returns
 */
export const base642File = (base64: string, fileName = 'image.png') => {
  const arr = base64.split(',');
  const regResult = arr[0].match(/:(.*?);/);

  if (regResult) {
    const mime = regResult[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const file = new File([u8arr], fileName, { type: mime });
    return file;
  }

  return null;
};

/**
 * 对代码块添加行号
 *
 * @param code 代码html内容
 * @returns string
 */
export const generateCodeRowNumber = (code: string) => {
  if (!code.trim()) {
    return code;
  }

  const list = code.split('\n');
  // 行号html代码拼接列表
  const rowNumberList = ['<span rn-wrapper aria-hidden="true">'];
  list.forEach(() => {
    rowNumberList.push('<span></span>');
  });
  rowNumberList.push('</span>');
  return `<span class="code-block">${code}</span>${rowNumberList.join('')}`;
};

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
