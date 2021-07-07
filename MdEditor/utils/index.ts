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
    console.log('无法重置光标位置！');
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
  }
) => {
  const { deviationStart = 0, deviationEnd = 0, direct = false, select = false } = params;
  // 返回值
  let res = '';
  if (dom.selectionStart || dom.selectionStart === 0) {
    const startPos = dom.selectionStart;
    const endPos = dom.selectionEnd || 0;

    // 前半部分值
    const prefixVal = dom.value.substring(0, startPos);
    // 后半部分值
    const suffixVal = dom.value.substring(endPos, dom.value.length);
    res = prefixVal + tarValue + suffixVal;

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

export type ToolDirective =
  | 'bold'
  | 'underline'
  | 'italic'
  | 'strikeThrough'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'quote'
  | 'unorderedList'
  | 'orderedList'
  | 'codeRow'
  | 'code'
  | 'link'
  | 'image'
  | 'table'
  | 'sub'
  | 'sup';

export const directive2flag = (
  direct: ToolDirective,
  selectedText = '',
  inputArea: HTMLTextAreaElement
): string => {
  // 目标值
  let targetValue = '';
  // 光标开始位置偏移量
  let deviationStart = 0;
  // 结束位置偏移量
  let deviationEnd = 0;
  // 是否选中
  let select = false;

  if (/^h[1-6]{1}$/.test(direct)) {
    const pix = direct.replace(/^h(\d)/, (_, num) => {
      return new Array(Number(num)).fill('#', 0, num).join('');
    });

    targetValue = `${pix} ${selectedText}`;
    deviationStart = pix.length + 1;
  } else {
    switch (direct) {
      case 'bold': {
        targetValue = `**${selectedText}**`;
        deviationStart = 2;
        deviationEnd = -2;
        break;
      }
      case 'underline': {
        targetValue = `<u>${selectedText}</u>`;
        deviationStart = 3;
        deviationEnd = -4;
        break;
      }
      case 'italic': {
        targetValue = `*${selectedText}*`;
        deviationStart = 1;
        deviationEnd = -1;
        break;
      }
      case 'strikeThrough': {
        targetValue = `~${selectedText}~`;
        deviationStart = 1;
        deviationEnd = -1;
        break;
      }
      case 'sub': {
        targetValue = `<sub>${selectedText}</sub>`;
        deviationStart = 5;
        deviationEnd = -6;
        break;
      }
      case 'sup': {
        targetValue = `<sup>${selectedText}</sup>`;
        deviationStart = 5;
        deviationEnd = -6;
        break;
      }
      case 'codeRow': {
        targetValue = '`' + selectedText + '`';
        deviationStart = 1;
        deviationEnd = -1;
        break;
      }
      case 'quote': {
        targetValue = `> ${selectedText}`;
        deviationStart = 2;
        break;
      }
      case 'orderedList': {
        targetValue = `1. ${selectedText}`;
        deviationStart = 3;
        break;
      }
      case 'unorderedList': {
        targetValue = `- ${selectedText}`;
        deviationStart = 2;
        break;
      }
      case 'code': {
        targetValue = '```language\n' + selectedText + '\n```\n';
        deviationStart = 3;
        deviationEnd = 11 - targetValue.length;
        select = true;
        break;
      }
    }
  }

  return insert(inputArea, targetValue, { deviationStart, deviationEnd, select });
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
    console.warn('无效的链接！');
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
