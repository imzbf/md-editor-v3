import { insert } from '.';

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
  | 'sup'
  | 'help'
  | 'prettier'
  | 'tab'
  | 'shiftTab'
  | 'ctrlC'
  | 'ctrlX'
  | 'ctrlD';

export const directive2flag = (
  direct: ToolDirective,
  selectedText = '',
  inputArea: HTMLTextAreaElement,
  params?: any
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
  } else if (direct === 'prettier') {
    return window.prettier.format(inputArea.value, {
      parser: 'markdown',
      plugins: window.prettierPlugins
    });
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
      case 'table': {
        targetValue = '| 表头 | 表头 |\n| - | - |\n| 内容 | 内容 |\n';
        deviationStart = 2;
        deviationEnd = 4 - targetValue.length;
        select = true;
        break;
      }
      case 'link': {
        const { desc, url } = params;
        targetValue = `[${desc}](${url})`;
        break;
      }
      case 'image': {
        const { desc, url } = params;
        targetValue = `![${desc}](${url})\n`;
      }
      case 'tab': {
        // 缩进
        // 1. 未选中内容
        // 2. 选中单行或中间内容
        // 3. 选中多行

        inputArea.selectionStart;

        if (selectedText === '') {
          console.log('未选中内容');
        } else if (/\n/.test(selectedText)) {
          console.log('选中多行');
        } else {
          console.log('选中单行或中间内容');
        }
      }
    }
  }

  return insert(inputArea, targetValue, { deviationStart, deviationEnd, select });
};
