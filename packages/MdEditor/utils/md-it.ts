import type { Token } from 'markdown-it';

const CODE_LINE_HIGHLIGHT_VALUE_PATTERN =
  /^\s*\d+(?:\s*-\s*\d+)?(?:\s*,\s*\d+(?:\s*-\s*\d+)?)*\s*$/;

interface CodeLineHighlightMatch {
  endIndex: number;
  startIndex: number;
  value: string;
}

export interface CodeLineHighlightRange {
  end: number;
  start: number;
}

export interface ParsedCodeBlockInfo {
  attrs: string;
  language: string;
  lineHighlightRanges: CodeLineHighlightRange[];
}

/**
 * 行高亮标记只能出现在语言后缀或独立属性位置，属性赋值与引号中的大括号必须保留。
 */
const findCodeLineHighlight = (info: string): CodeLineHighlightMatch | null => {
  const firstWhitespaceIndex = info.search(/\s/);
  let quote = '';
  let escaped = false;

  for (let index = 0; index < info.length; index += 1) {
    const character = info[index];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (character === '\\') {
        escaped = true;
        continue;
      }

      if (character === quote) {
        quote = '';
      }
      continue;
    }

    if (character === '"' || character === "'" || character === '`') {
      quote = character;
      continue;
    }

    if (character !== '{') {
      continue;
    }

    const endIndex = info.indexOf('}', index + 1);
    if (endIndex === -1) {
      break;
    }

    const value = info.slice(index + 1, endIndex);
    if (!CODE_LINE_HIGHLIGHT_VALUE_PATTERN.test(value)) {
      continue;
    }

    const previousCharacter = info[index - 1] || '';
    const nextCharacter = info[endIndex + 1] || '';
    const hasFollowingBoundary = !nextCharacter || /\s/.test(nextCharacter);
    const isLanguageSuffix =
      (firstWhitespaceIndex === -1 || index < firstWhitespaceIndex) &&
      (!previousCharacter || !/[\s="'`]/.test(previousCharacter)) &&
      hasFollowingBoundary;
    const isStandalone =
      (!previousCharacter || /\s/.test(previousCharacter)) && hasFollowingBoundary;

    if (isLanguageSuffix || isStandalone) {
      return {
        endIndex: endIndex + 1,
        startIndex: index,
        value
      };
    }
  }

  return null;
};

/**
 * 解析代码围栏信息中的语言、附加属性与高亮行区间。
 *
 * 同时支持 `js {1,3-5}` 和 `js{1,3-5}`，但不会误删属性赋值、引号及转义
 * 引号中的大括号。区间只保留正向的正整数，也不会为了大区间提前展开数组。
 */
export const parseCodeBlockInfo = (language: string, attrs = ''): ParsedCodeBlockInfo => {
  const info = `${language}${attrs ? ` ${attrs}` : ''}`.trim();
  const lineHighlightMatch = findCodeLineHighlight(info);
  const normalizedInfo = lineHighlightMatch
    ? `${info.slice(0, lineHighlightMatch.startIndex)} ${info.slice(lineHighlightMatch.endIndex)}`.trim()
    : info;
  const attrsStartIndex = normalizedInfo.search(/\s/);
  const normalizedLanguage =
    attrsStartIndex === -1 ? normalizedInfo : normalizedInfo.slice(0, attrsStartIndex);
  const normalizedAttrs =
    attrsStartIndex === -1 ? '' : normalizedInfo.slice(attrsStartIndex).trim();

  const lineHighlightRanges = lineHighlightMatch
    ? lineHighlightMatch.value
        .split(',')
        .reduce<CodeLineHighlightRange[]>((ranges, item) => {
          const [startValue, endValue] = item
            .split('-')
            .map((value) => Number.parseInt(value.trim(), 10));
          const rangeEnd = endValue ?? startValue;

          if (startValue > 0 && rangeEnd >= startValue) {
            ranges.push({ start: startValue, end: rangeEnd });
          }

          return ranges;
        }, [])
    : [];

  return {
    attrs: normalizedAttrs,
    language: normalizedLanguage,
    lineHighlightRanges
  };
};

export const mergeAttrs = (token: Token, addAttrs: [string, string][]) => {
  const tmpAttrs = token.attrs ? token.attrs.slice() : [];

  addAttrs.forEach((addAttr) => {
    const i = token.attrIndex(addAttr[0]);
    if (i < 0) {
      tmpAttrs.push(addAttr);
    } else {
      tmpAttrs[i] = tmpAttrs[i].slice() as [string, string];
      tmpAttrs[i][1] += ` ${addAttr[1]}`;
    }
  });

  return tmpAttrs;
};
