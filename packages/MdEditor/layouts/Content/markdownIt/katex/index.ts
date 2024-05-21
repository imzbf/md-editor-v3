/**
 * 源码来自https://github.com/waylonflinn/markdown-it-katex
 *
 * 该代码只是正对md-editor-v3系列功能做了适配
 */
import { ShallowRef } from 'vue';
import markdownit, {
  ParserBlock,
  ParserInline,
  Renderer,
  StateInline,
  Token
} from 'markdown-it';
import { prefix } from '~/config';
import { mergeAttrs } from '~/utils/markdown-it';

// Test if potential opening or closing delimieter
// Assumes that there is a "$" at state.src[pos]
const isValidDelim = (state: StateInline, pos: number) => {
  let can_open = true,
    can_close = true;

  const max = state.posMax;
  const prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1;
  const nextChar = pos + 1 <= max ? state.src.charCodeAt(pos + 1) : -1;

  // Check non-whitespace conditions for opening and closing, and
  // check that closing delimeter isn't followed by a number
  if (
    prevChar === 0x20 /* " " */ ||
    prevChar === 0x09 /* \t */ ||
    (nextChar >= 0x30 /* "0" */ && nextChar <= 0x39) /* "9" */
  ) {
    can_close = false;
  }
  if (nextChar === 0x20 /* " " */ || nextChar === 0x09 /* \t */) {
    can_open = false;
  }

  return {
    can_open: can_open,
    can_close: can_close
  };
};

const math_inline: ParserInline.RuleInline = (state, silent) => {
  let match, token, res, pos;

  if (state.src[state.pos] !== '$') {
    return false;
  }

  res = isValidDelim(state, state.pos);
  if (!res.can_open) {
    if (!silent) {
      state.pending += '$';
    }
    state.pos += 1;
    return true;
  }

  // First check for and bypass all properly escaped delimieters
  // This loop will assume that the first leading backtick can not
  // be the first character in state.src, which is known since
  // we have found an opening delimieter already.
  const start = state.pos + 1;
  match = start;
  while ((match = state.src.indexOf('$', match)) !== -1) {
    // Found potential $, look for escapes, pos will point to
    // first non escape when complete
    pos = match - 1;
    while (state.src[pos] === '\\') {
      pos -= 1;
    }

    // Even number of escapes, potential closing delimiter found
    if ((match - pos) % 2 == 1) {
      break;
    }
    match += 1;
  }

  // No closing delimter found.  Consume $ and continue.
  if (match === -1) {
    if (!silent) {
      state.pending += '$';
    }
    state.pos = start;
    return true;
  }

  // Check if we have empty content, ie: $$.  Do not parse.
  if (match - start === 0) {
    if (!silent) {
      state.pending += '$$';
    }
    state.pos = start + 1;
    return true;
  }

  // Check for valid closing delimiter
  res = isValidDelim(state, match);
  if (!res.can_close) {
    if (!silent) {
      state.pending += '$';
    }
    state.pos = start;
    return true;
  }

  if (!silent) {
    token = state.push('math_inline', 'math', 0);
    token.markup = '$';
    token.content = state.src.slice(start, match);
  }

  state.pos = match + 1;
  return true;
};

const math_block: ParserBlock.RuleBlock = (state, start, end, silent) => {
  let firstLine,
    lastLine,
    next,
    lastPos,
    found = false,
    pos = state.bMarks[start] + state.tShift[start],
    max = state.eMarks[start];

  if (pos + 2 > max) {
    return false;
  }
  if (state.src.slice(pos, pos + 2) !== '$$') {
    return false;
  }

  pos += 2;
  firstLine = state.src.slice(pos, max);

  if (silent) {
    return true;
  }
  if (firstLine.trim().slice(-2) === '$$') {
    // Single line expression
    firstLine = firstLine.trim().slice(0, -2);
    found = true;
  }

  for (next = start; !found; ) {
    next++;

    if (next >= end) {
      break;
    }

    pos = state.bMarks[next] + state.tShift[next];
    max = state.eMarks[next];

    if (pos < max && state.tShift[next] < state.blkIndent) {
      // non-empty line with negative indent should stop the list:
      break;
    }

    if (state.src.slice(pos, max).trim().slice(-2) === '$$') {
      lastPos = state.src.slice(0, max).lastIndexOf('$$');
      lastLine = state.src.slice(pos, lastPos);
      found = true;
    }
  }

  state.line = next + 1;

  const token = state.push('math_block', 'math', 0);
  token.block = true;
  token.content =
    (firstLine && firstLine.trim() ? firstLine + '\n' : '') +
    state.getLines(start + 1, next, state.tShift[start], true) +
    (lastLine && lastLine.trim() ? lastLine : '');
  token.map = [start, state.line];
  token.markup = '$$';
  return true;
};

const KatexPlugin = (md: markdownit, { katexRef }: { katexRef: ShallowRef }) => {
  // set KaTeX as the renderer for markdown-it-simplemath
  const katexInline: Renderer.RenderRule = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const tmpToken = {
      attrs: mergeAttrs(token, [['class', `${prefix}-katex-inline`]])
    };

    if (katexRef.value) {
      const html = katexRef.value.renderToString(token.content, {
        throwOnError: false
      });

      return `<span ${slf.renderAttrs(tmpToken as Token)} data-processed>${html}</span>`;
    } else {
      return `<span ${slf.renderAttrs(tmpToken as Token)}>${token.content}</span>`;
    }
  };

  const katexBlock: Renderer.RenderRule = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const tmpToken = {
      attrs: mergeAttrs(token, [['class', `${prefix}-katex-block`]])
    };

    if (katexRef.value) {
      const html = katexRef.value.renderToString(token.content, {
        throwOnError: false,
        displayMode: true
      });

      return `<p ${slf.renderAttrs(tmpToken as Token)} data-processed>${html}</p>`;
    } else {
      return `<p ${slf.renderAttrs(tmpToken as Token)}>${token.content}</p>`;
    }
  };

  md.inline.ruler.after('escape', 'math_inline', math_inline);
  md.block.ruler.after('blockquote', 'math_block', math_block, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']
  });

  md.renderer.rules.math_inline = katexInline;
  md.renderer.rules.math_block = katexBlock;
};

export default KatexPlugin;
