/**
 * 源码来自https://github.com/waylonflinn/markdown-it-katex
 *
 * 该代码只是正对md-editor-v3系列功能做了适配
 */
import markdownit, { Renderer, Token, ParserInline, ParserBlock } from 'markdown-it';
import { ShallowRef } from 'vue';
import { prefix, globalConfig } from '~/config';
import { mergeAttrs } from '~/utils/md-it';

interface CreateOptions {
  delimiters: Array<{
    open: string;
    close: string;
  }>;
}

interface KatexOptions {
  katexRef: ShallowRef;
  inlineDelimiters?: Array<{
    open: string;
    close: string;
  }>;
  blockDelimiters?: Array<{
    open: string;
    close: string;
  }>;
}

const delimiters = {
  block: [
    { open: '$$', close: '$$' },
    { open: '\\[', close: '\\]' }
  ],
  inline: [
    { open: '$$', close: '$$' },
    { open: '$', close: '$' },
    { open: '\\[', close: '\\]' },
    { open: '\\(', close: '\\)' }
  ]
};

const create_math_inline =
  (options: CreateOptions): ParserInline.RuleInline =>
  (state, silent) => {
    const delimiters = options.delimiters;

    for (const delim of delimiters) {
      if (!state.src.startsWith(delim.open, state.pos)) {
        continue;
      }

      const start = state.pos + delim.open.length;
      let match = start;

      // 查找未转义的结束符
      while ((match = state.src.indexOf(delim.close, match)) !== -1) {
        // 检查结束符前的反斜杠数量
        let backslashCount = 0;
        let pos = match - 1;

        while (pos >= 0 && state.src[pos] === '\\') {
          backslashCount++;
          pos--;
        }

        // 偶数个反斜杠表示结束符未被转义
        if (backslashCount % 2 === 0) {
          break;
        }

        match += delim.close.length;
      }

      // 未找到结束符
      if (match === -1) {
        continue;
      }

      // 空内容处理
      if (match - start === 0) {
        if (!silent) {
          state.pending += delim.open + delim.close;
        }
        state.pos = match + delim.close.length;
        return true;
      }

      // 创建数学公式 token
      if (!silent) {
        const token = state.push('math_inline', 'math', 0);
        token.markup = delim.open;
        token.content = state.src.slice(start, match);
      }

      state.pos = match + delim.close.length;
      return true;
    }

    return false;
  };

const create_math_block =
  (options: CreateOptions): ParserBlock.RuleBlock =>
  (state, start, end, silent) => {
    const delimiters = options.delimiters;
    const pos = state.bMarks[start] + state.tShift[start];
    const max = state.eMarks[start];

    // 辅助函数：创建数学块 token
    const createMathToken = (content: string, endLine: number, markup: string) => {
      state.line = endLine;
      const token = state.push('math_block', 'math', 0);
      token.block = true;
      token.content = content;
      token.map = [start, state.line];
      token.markup = markup;
      return true;
    };

    for (const delim of delimiters) {
      const contentStart = pos;

      // 确保开始符号在行首
      if (
        state.src.slice(contentStart, contentStart + delim.open.length) !== delim.open
      ) {
        continue;
      }

      const openEnd = contentStart + delim.open.length;
      const restOfLine = state.src.slice(openEnd, max).trim();

      // 块级公式要求：开始符号单独占一行，或开始/结束在同一行
      const isSingleLineOpen = restOfLine === '';
      const isSingleLineBlock = restOfLine === delim.close;
      const hasCloseOnSameLine = restOfLine.endsWith(delim.close);

      if (!isSingleLineOpen && !isSingleLineBlock && !hasCloseOnSameLine) {
        continue;
      }

      if (silent) {
        return true;
      }

      // 情况1: 空块 \[\]
      if (isSingleLineBlock) {
        return createMathToken('', start + 1, delim.open);
      }

      // 情况2: 单行块 \[ content \]
      if (!isSingleLineOpen && hasCloseOnSameLine) {
        const content = restOfLine.slice(0, -delim.close.length);
        return createMathToken(content, start + 1, delim.open);
      }

      // 情况3: 多行块
      let next = start + 1;
      let found = false;
      let lastLine = '';

      for (; next < end; next++) {
        const linePos = state.bMarks[next] + state.tShift[next];
        const lineMax = state.eMarks[next];

        if (linePos < lineMax && state.tShift[next] < state.blkIndent) {
          break;
        }

        const lineContent = state.src.slice(linePos, lineMax);

        if (lineContent.trim().endsWith(delim.close)) {
          const lastPos = state.src.slice(0, lineMax).lastIndexOf(delim.close);
          lastLine = state.src.slice(linePos, lastPos);
          found = true;
          break;
        }
      }

      if (!found) {
        continue;
      }

      const middleLines = state.getLines(start + 1, next, state.tShift[start], true);
      const content = middleLines + (lastLine.trim() ? lastLine : '');

      return createMathToken(content, next + 1, delim.open);
    }

    return false;
  };

const KatexPlugin = (
  md: markdownit,
  { katexRef, inlineDelimiters, blockDelimiters }: KatexOptions
) => {
  const renderKatex = (
    token: Token,
    className: string,
    tagName: 'span' | 'p',
    slf: Renderer,
    displayMode = false
  ) => {
    const tmpToken = {
      attrs: mergeAttrs(token, [['class', className]])
    };
    const attrs = slf.renderAttrs(tmpToken as Token);

    if (!katexRef.value) {
      return `<${tagName} ${attrs}>${token.content}</${tagName}>`;
    }

    const html = katexRef.value.renderToString(
      token.content,
      globalConfig.katexConfig({
        throwOnError: false,
        displayMode
      })
    );

    return `<${tagName} ${attrs} data-processed>${html}</${tagName}>`;
  };

  const katexInline: Renderer.RenderRule = (tokens, idx, options, env, slf) => {
    return renderKatex(tokens[idx], `${prefix}-katex-inline`, 'span', slf);
  };

  const katexBlock: Renderer.RenderRule = (tokens, idx, options, env, slf) => {
    return renderKatex(tokens[idx], `${prefix}-katex-block`, 'p', slf, true);
  };

  md.inline.ruler.before(
    'escape',
    'math_inline',
    create_math_inline({
      delimiters: inlineDelimiters || delimiters.inline
    })
  );
  md.block.ruler.after(
    'blockquote',
    'math_block',
    create_math_block({
      delimiters: blockDelimiters || delimiters.block
    }),
    {
      alt: ['paragraph', 'reference', 'blockquote', 'list']
    }
  );

  md.renderer.rules.math_inline = katexInline;
  md.renderer.rules.math_block = katexBlock;
};

export default KatexPlugin;
