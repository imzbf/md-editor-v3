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
 * @param offset 光标定位偏移
 * @returns 插入后的值
 */
export const insert = (
  dom: HTMLInputElement | HTMLTextAreaElement,
  tarValue: string,
  offset = 0
) => {
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
    setPosition(dom, startPos + tarValue.length + offset);
  } else {
    res += tarValue;
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
  // 光标偏移量
  let offset = 0;

  if (/^h[1-6]{1}$/.test(direct)) {
    const pix = direct.replace(/^h(\d)/, (_, num) => {
      return new Array(Number(num)).fill('#', 0, num).join('');
    });

    targetValue = `${pix} ${selectedText}`;
  } else {
    switch (direct) {
      case 'bold': {
        targetValue = `**${selectedText}**`;
        offset = -2;
        break;
      }
      case 'underline': {
        targetValue = `<u>${selectedText}</u>`;
        offset = -4;
        break;
      }
      case 'italic': {
        targetValue = `*${selectedText}*`;
        offset = -1;
        break;
      }
      case 'strikeThrough': {
        targetValue = `~${selectedText}~`;
        offset = -1;
        break;
      }
      case 'sub': {
        targetValue = `<sub>${selectedText}</sub>`;
        offset = -6;
        break;
      }
      case 'sup': {
        targetValue = `<sup>${selectedText}</sup>`;
        offset = -6;
        break;
      }
      case 'codeRow': {
        targetValue = '`' + selectedText + '`';
        offset = -1;
        break;
      }
      case 'quote': {
        targetValue = `> ${selectedText}`;
        break;
      }
      case 'orderedList': {
        targetValue = `1. ${selectedText}`;
        break;
      }
      case 'unorderedList': {
        targetValue = `- ${selectedText}`;
        break;
      }
    }
  }

  return insert(inputArea, targetValue, offset);
};
