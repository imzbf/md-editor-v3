import { prefix } from '../config';
import type { CodeLineHighlightRange } from './md-it';

const HIGHLIGHT_TAG_PATTERN =
  /^<\s*(\/?)\s*([a-zA-Z][a-zA-Z0-9:_-]*)(?:\s[\s\S]*?)?\s*(\/?)>$/;
const VOID_HIGHLIGHT_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]);

interface ParsedHighlightTag {
  isClosing: boolean;
  isSelfClosing: boolean;
  name: string;
  source: string;
}

interface HighlightTagState {
  name: string;
  openingTag: string;
}

interface HighlightTagToken {
  endIndex: number;
  parsedTag: ParsedHighlightTag | null;
  startIndex: number;
}

interface HighlightContentRange {
  endIndex: number;
  startIndex: number;
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

/**
 * HTML 属性允许包含 `>`，因此标签结束位置必须在引号之外查找。
 */
const findHighlightTagEnd = (markup: string, startIndex: number) => {
  if (markup.startsWith('<!--', startIndex)) {
    const commentEndIndex = markup.indexOf('-->', startIndex + 4);
    return commentEndIndex === -1 ? -1 : commentEndIndex + 2;
  }

  if (markup.startsWith('<![CDATA[', startIndex)) {
    const cdataEndIndex = markup.indexOf(']]>', startIndex + 9);
    return cdataEndIndex === -1 ? -1 : cdataEndIndex + 2;
  }

  let quote = '';

  for (let index = startIndex + 1; index < markup.length; index += 1) {
    const character = markup[index];

    if (quote) {
      if (character === quote) {
        quote = '';
      }
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
    } else if (character === '>') {
      return index;
    }
  }

  return -1;
};

const parseHighlightTag = (token: string): ParsedHighlightTag | null => {
  const match = HIGHLIGHT_TAG_PATTERN.exec(token);

  if (!match) {
    return null;
  }

  const name = match[2].toLowerCase();

  return {
    isClosing: match[1] === '/',
    isSelfClosing: match[3] === '/' || VOID_HIGHLIGHT_TAGS.has(name),
    name,
    source: token
  };
};

const findNextHighlightTag = (
  markup: string,
  startIndex: number
): HighlightTagToken | null => {
  const tagStartIndex = markup.indexOf('<', startIndex);
  if (tagStartIndex === -1) {
    return null;
  }

  const tagEndIndex = findHighlightTagEnd(markup, tagStartIndex);
  if (tagEndIndex === -1) {
    return null;
  }

  return {
    endIndex: tagEndIndex,
    parsedTag: parseHighlightTag(markup.slice(tagStartIndex, tagEndIndex + 1)),
    startIndex: tagStartIndex
  };
};

const getLinePrefix = (openTags: HighlightTagState[]) => {
  return openTags.map((tag) => tag.openingTag).join('');
};

const getLineSuffix = (openTags: HighlightTagState[]) => {
  return [...openTags]
    .reverse()
    .map((tag) => `</${tag.name}>`)
    .join('');
};

const hasVisibleHighlightContent = (markup: string) => {
  let cursor = 0;

  while (cursor < markup.length) {
    const tag = findNextHighlightTag(markup, cursor);
    const textEndIndex = tag?.startIndex ?? markup.length;

    if (markup.slice(cursor, textEndIndex).trim()) {
      return true;
    }

    if (!tag) {
      return false;
    }

    cursor = tag.endIndex + 1;
  }

  return false;
};

const findPreCodeContentRange = (html: string): HighlightContentRange | null => {
  const preTag = findNextHighlightTag(html, 0);
  if (
    !preTag ||
    preTag.startIndex !== 0 ||
    preTag.parsedTag?.name !== 'pre' ||
    preTag.parsedTag.isClosing ||
    preTag.parsedTag.isSelfClosing
  ) {
    return null;
  }

  let codeDepth = 0;
  let codeContentStartIndex = -1;
  let cursor = preTag.endIndex + 1;

  while (cursor < html.length) {
    const tag = findNextHighlightTag(html, cursor);
    if (!tag) {
      break;
    }

    const parsedTag = tag.parsedTag;
    if (!parsedTag) {
      cursor = tag.endIndex + 1;
      continue;
    }

    if (parsedTag.name === 'pre' && parsedTag.isClosing && codeDepth === 0) {
      break;
    }

    if (parsedTag.name === 'code') {
      if (parsedTag.isClosing) {
        if (codeDepth > 0) {
          codeDepth -= 1;
          if (codeDepth === 0) {
            return {
              endIndex: tag.startIndex,
              startIndex: codeContentStartIndex
            };
          }
        }
      } else if (!parsedTag.isSelfClosing) {
        if (codeDepth === 0) {
          codeContentStartIndex = tag.endIndex + 1;
        }
        codeDepth += 1;
      }
    }

    cursor = tag.endIndex + 1;
  }

  return null;
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
      const tagEndIndex = findHighlightTagEnd(normalizedMarkup, cursor);

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
            if (openTags[index].name === parsedTag.name) {
              openTags.splice(index, 1);
              break;
            }
          }
        } else if (!parsedTag.isSelfClosing) {
          openTags.push({
            name: parsedTag.name,
            openingTag: parsedTag.source
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

interface GenerateCodeBlockOptions {
  lineHighlightRanges?: CodeLineHighlightRange[];
  showLineNumber?: boolean;
}

interface PreparedCustomCodeHighlight {
  html: string;
  shouldReturnDirectly: boolean;
}

/**
 * 生成支持自动换行的逐行代码结构。
 *
 * 行号与行高亮共用同一层逻辑行包装，浏览器自动换行时背景和行号都会跟随整条
 * 逻辑行，而不会把视觉换行误判成新的 Markdown 代码行。
 */
export const generateCodeBlock = (
  code: string,
  sourceCode: string,
  options: GenerateCodeBlockOptions = {}
) => {
  const { lineHighlightRanges = [], showLineNumber = false } = options;
  const codeLines = splitCodeLines(sourceCode);
  const lineMarkups = splitHighlightedMarkupIntoLines(code);

  while (
    lineMarkups.length > codeLines.length &&
    !hasVisibleHighlightContent(lineMarkups[lineMarkups.length - 1])
  ) {
    lineMarkups.pop();
  }

  // 自定义高亮器若改变了换行数量，继续按索引拼接会串行；此时宁可回退纯文本。
  const canUseHighlightedMarkup = lineMarkups.length === codeLines.length;

  const codeLineList = codeLines.map((line, index) => {
    const lineMarkup = canUseHighlightedMarkup ? lineMarkups[index] : escapeHtml(line);
    const lineNumber = index + 1;
    const isHighlighted = lineHighlightRanges.some(
      ({ start, end }) => lineNumber >= start && lineNumber <= end
    );
    const codeLineClass = [
      `${prefix}-code-line`,
      showLineNumber ? `${prefix}-code-line-numbered` : '',
      isHighlighted ? `${prefix}-code-line-highlight` : ''
    ]
      .filter(Boolean)
      .join(' ');
    const lineNumberMarkup = showLineNumber
      ? `<span rn-wrapper aria-hidden="true" data-line-number="${lineNumber}"></span>`
      : '';

    return [
      `<span class="${codeLineClass}">`,
      lineNumberMarkup,
      `<span class="${prefix}-code-line-content">${lineMarkup}</span>`,
      '</span>'
    ].join('');
  });

  // 包装层通过 white-space: normal 折叠行间文本节点，但仍保留真实换行供 textContent
  // 复制；变量也挂在这里，避免为完整的第三方 <pre><code> 改写 code 的 class/style。
  const codeBlockStyle = showLineNumber
    ? ` style="--md-code-line-number-width: ${Math.max(2, String(codeLines.length).length) + 0.5}ch;"`
    : '';

  return `<span class="${prefix}-code-block-lines"${codeBlockStyle}>${codeLineList.join('\n')}</span>`;
};

/**
 * MarkdownIt 允许自定义高亮器返回完整 `<pre><code>`。保留外层主题与属性，仅替换
 * code 的内容，使 Shiki 等完整结构同样可以复用行号和行高亮布局。
 */
export const generateCodeBlockFromPre = (
  preHtml: string,
  sourceCode: string,
  options: GenerateCodeBlockOptions = {}
) => {
  const codeContentRange = findPreCodeContentRange(preHtml);
  if (!codeContentRange) {
    return null;
  }

  const codeBlockHtml = generateCodeBlock(
    preHtml.slice(codeContentRange.startIndex, codeContentRange.endIndex),
    sourceCode,
    options
  );

  return `${preHtml.slice(0, codeContentRange.startIndex)}${codeBlockHtml}${preHtml.slice(codeContentRange.endIndex)}`;
};

/**
 * 决定自定义高亮器结果是否需要进入编辑器的逐行布局。
 *
 * 未启用行号或行高亮时原样返回，避免无故改写第三方输出；启用后，完整
 * `<pre><code>` 在原结构内替换内容，普通片段则交给调用方统一包裹。
 */
export const prepareCustomCodeHighlight = (
  highlightedHtml: string,
  sourceCode: string,
  options: GenerateCodeBlockOptions = {}
): PreparedCustomCodeHighlight => {
  const { lineHighlightRanges = [], showLineNumber = false } = options;

  if (!showLineNumber && !lineHighlightRanges.length) {
    return { html: highlightedHtml, shouldReturnDirectly: true };
  }

  if (highlightedHtml.startsWith('<pre')) {
    return {
      html:
        generateCodeBlockFromPre(highlightedHtml, sourceCode, options) ?? highlightedHtml,
      shouldReturnDirectly: true
    };
  }

  return { html: highlightedHtml, shouldReturnDirectly: false };
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
