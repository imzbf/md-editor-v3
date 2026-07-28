import { prefix } from '../config';

const HIGHLIGHT_TAG_PATTERN = /^<\/?([a-zA-Z0-9-]+)([^>]*)>$/;

interface ParsedHighlightTag {
  isClosing: boolean;
  name: string;
  source: string;
}

interface HighlightTagState {
  closingTag: string;
  openingTag: string;
}

const escapeHtml = (value: string) => {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
};

const splitCodeLines = (source: string) => {
  const normalizedSource = source.replace(/\r\n?/g, '\n');
  const codeWithoutFenceEnding = normalizedSource.endsWith('\n')
    ? normalizedSource.slice(0, -1)
    : normalizedSource;

  if (!codeWithoutFenceEnding) {
    return [''];
  }

  return codeWithoutFenceEnding.split('\n');
};

const parseHighlightTag = (token: string): ParsedHighlightTag | null => {
  const match = HIGHLIGHT_TAG_PATTERN.exec(token);

  if (!match) {
    return null;
  }

  return {
    isClosing: token.startsWith('</'),
    name: match[1].toLowerCase(),
    source: token
  };
};

const getLinePrefix = (openTags: HighlightTagState[]) => {
  return openTags.map((tag) => tag.openingTag).join('');
};

const getLineSuffix = (openTags: HighlightTagState[]) => {
  return [...openTags]
    .reverse()
    .map((tag) => tag.closingTag)
    .join('');
};

/**
 * highlight.js 的 span 可能横跨多行。行号布局需要逐行包裹，所以换行时要临时闭合
 * 当前行的开放标签，并在下一行重新补开，避免多行字符串或注释的颜色被拆断。
 */
const splitHighlightedMarkupIntoLines = (highlightedMarkup: string) => {
  const normalizedMarkup = highlightedMarkup.replace(/\r\n?/g, '\n');
  const lineMarkups = [''];
  const openTags: HighlightTagState[] = [];
  let lineIndex = 0;
  let cursor = 0;

  while (cursor < normalizedMarkup.length) {
    const currentCharacter = normalizedMarkup[cursor];

    if (currentCharacter === '<') {
      const tagEndIndex = normalizedMarkup.indexOf('>', cursor);

      if (tagEndIndex === -1) {
        lineMarkups[lineIndex] += normalizedMarkup.slice(cursor);
        break;
      }

      const tagSource = normalizedMarkup.slice(cursor, tagEndIndex + 1);
      const parsedTag = parseHighlightTag(tagSource);
      lineMarkups[lineIndex] += tagSource;

      if (parsedTag) {
        if (parsedTag.isClosing) {
          for (let index = openTags.length - 1; index >= 0; index -= 1) {
            if (openTags[index].closingTag === parsedTag.source) {
              openTags.splice(index, 1);
              break;
            }
          }
        } else if (!tagSource.endsWith('/>')) {
          openTags.push({
            openingTag: parsedTag.source,
            closingTag: `</${parsedTag.name}>`
          });
        }
      }

      cursor = tagEndIndex + 1;
      continue;
    }

    if (currentCharacter === '\n') {
      lineMarkups[lineIndex] += getLineSuffix(openTags);
      lineMarkups.push(getLinePrefix(openTags));
      lineIndex += 1;
      cursor += 1;
      continue;
    }

    lineMarkups[lineIndex] += currentCharacter;
    cursor += 1;
  }

  return lineMarkups;
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

    return new File([u8arr], fileName, { type: mime });
  }

  return null;
};

/**
 * 对代码块添加行号
 *
 * @param code 代码html内容
 * @param source 原始代码内容
 * @returns 逐行代码html和行号列宽
 */
export const generateCodeRowNumber = (code: string, source: string) => {
  const codeLines = splitCodeLines(source);
  const lineMarkups = splitHighlightedMarkupIntoLines(code);
  const lineNumberWidth = `${Math.max(2, String(codeLines.length).length) + 0.5}ch`;

  const codeLineList = codeLines.map((line, index) => {
    const lineMarkup = lineMarkups[index] ?? escapeHtml(line);
    const lineNumber = index + 1;

    return [
      `<span class="${prefix}-code-line">`,
      `<span rn-wrapper aria-hidden="true" data-line-number="${lineNumber}"></span>`,
      `<span class="${prefix}-code-line-content">${lineMarkup}</span>`,
      '</span>'
    ].join('');
  });

  // 行之间保留真实换行，复制按钮继续通过 textContent 获得原代码。
  return {
    html: codeLineList.join('\n'),
    lineNumberWidth
  };
};

/**
 * 逻辑分离katex相关文本
 * 不再采用正确匹配，会导致性能问题
 *
 * @param str 待处理字符串
 * @param key 单行或多行标识符
 * @returns []
 */
export const splitKatexValue = (str: string, key = '$'): Array<string> => {
  const arr = str.split(key);
  let regText = key;
  let text = '';

  for (let i = 1; i < arr.length; i++) {
    // 以\结尾的添加到文本中
    if (/\\$/.test(arr[i])) {
      regText += arr[i] + '$';
      text += arr[i] + '$';
    } else {
      regText += arr[i] + key;
      text += arr[i];

      break;
    }
  }

  return [regText, text];
};

/**
 * 获取元素相对目标元素顶部位置
 * 代码来自antd
 *
 * @param element
 * @param container
 * @returns
 */
export const getRelativeTop = (element: HTMLElement, container: HTMLElement): number => {
  // 尝试移除元素不存在的潜在问题（https://github.com/imzbf/md-editor-v3/issues/308）
  if (!element || !container) {
    return 0;
  }

  const eleRect = element?.getBoundingClientRect();

  if (container === document.documentElement) {
    return eleRect.top - container.clientTop;
  }

  const conRect = container?.getBoundingClientRect();

  return eleRect.top - conRect.top;
};

/**
 * 获取递增的zIndex
 */
export const getZIndexIncrement = (() => {
  let startIndex = 0;

  return () => {
    return ++startIndex;
  };
})();
