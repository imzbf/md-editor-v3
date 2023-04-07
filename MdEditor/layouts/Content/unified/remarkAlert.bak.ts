import { factorySpace } from 'micromark-factory-space';
import { constants } from 'micromark-util-symbol/constants.js';

import { markdownLineEnding } from 'micromark-util-character';
import { codes } from 'micromark-util-symbol/codes.js';
import { types } from 'micromark-util-symbol/types.js';

/** @type {Construct} */
const nonLazyContinuation = {
  tokenize: tokenizeNonLazyContinuation,
  partial: true
};

/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizealertFenced(this: any, effects, ok, nok) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this;
  const tail = this.events[this.events.length - 1];
  const initialSize =
    tail && tail[1].type === types.linePrefix
      ? tail[2].sliceSerialize(tail[1], true).length
      : 0;
  let sizeOpen = 0;

  return start;

  /**
   * Start of alert.
   *
   * ```markdown
   * > | $$
   *     ^
   *   | \frac{1}{2}
   *   | $$
   * ```
   *
   * @type {State}
   */
  function start(code: number) {
    effects.enter('alertFlow');
    effects.enter('alertFlowFence');
    effects.enter('alertFlowFenceSequence');

    return sequenceOpen(code);
  }

  /**
   * In opening fence sequence.
   *
   * ```markdown
   * > | $$
   *      ^
   *   | \frac{1}{2}
   *   | $$
   * ```
   *
   * @type {State}
   */
  function sequenceOpen(code: number) {
    if (code === codes.exclamationMark) {
      effects.consume(code);
      sizeOpen++;
      return sequenceOpen;
    }

    if (sizeOpen < 2) {
      return nok(code);
    }

    effects.exit('alertFlowFenceSequence');
    return factorySpace(effects, metaBefore, types.whitespace)(code);
  }

  /**
   * In opening fence, before meta.
   *
   * ```markdown
   * > | $$asciialert
   *       ^
   *   | x < y
   *   | $$
   * ```
   *
   * @type {State}
   */

  function metaBefore(code: number) {
    if (code === codes.eof || markdownLineEnding(code)) {
      return metaAfter(code);
    }

    effects.enter('alertFlowFenceMeta');
    effects.enter(types.chunkString, { contentType: constants.contentTypeString });
    return meta(code);
  }

  /**
   * In meta.
   *
   * ```markdown
   * > | $$asciialert
   *        ^
   *   | x < y
   *   | $$
   * ```
   *
   * @type {State}
   */
  function meta(code: number) {
    if (code === codes.eof || markdownLineEnding(code)) {
      effects.exit(types.chunkString);
      effects.exit('alertFlowFenceMeta');
      return metaAfter(code);
    }

    if (code === codes.exclamationMark) {
      return nok(code);
    }

    effects.consume(code);
    return meta;
  }

  /**
   * After meta.
   *
   * ```markdown
   * > | $$
   *       ^
   *   | \frac{1}{2}
   *   | $$
   * ```
   *
   * @type {State}
   */
  function metaAfter(code: number) {
    console.log(': number');
    // Guaranteed to be eol/eof.
    effects.exit('alertFlowFence');

    if (self.interrupt) {
      return ok(code);
    }

    return effects.attempt(nonLazyContinuation, beforeNonLazyContinuation, after)(code);
  }

  /**
   * After eol/eof in alert, at a non-lazy closing fence or content.
   *
   * ```markdown
   *   | $$
   * > | \frac{1}{2}
   *     ^
   * > | $$
   *     ^
   * ```
   *
   * @type {State}
   */
  function beforeNonLazyContinuation(code: number) {
    return effects.attempt(
      { tokenize: tokenizeClosingFence, partial: true },
      after,
      contentStart
    )(code);
  }

  /**
   * Before alert content, definitely not before a closing fence.
   *
   * ```markdown
   *   | $$
   * > | \frac{1}{2}
   *     ^
   *   | $$
   * ```
   *
   * @type {State}
   */
  function contentStart(code: number) {
    return (
      initialSize
        ? factorySpace(effects, beforeContentChunk, types.linePrefix, initialSize + 1)
        : beforeContentChunk
    )(code);
  }

  /**
   * Before alert content, after optional prefix.
   *
   * ```markdown
   *   | $$
   * > | \frac{1}{2}
   *     ^
   *   | $$
   * ```
   *
   * @type {State}
   */
  function beforeContentChunk(code: number) {
    if (code === codes.eof) {
      return after(code);
    }

    if (markdownLineEnding(code)) {
      return effects.attempt(nonLazyContinuation, beforeNonLazyContinuation, after)(code);
    }

    effects.enter('alertFlowValue');
    return contentChunk(code);
  }

  /**
   * In alert content.
   *
   * ```markdown
   *   | $$
   * > | \frac{1}{2}
   *      ^
   *   | $$
   * ```
   *
   * @type {State}
   */
  function contentChunk(code: number) {
    if (code === codes.eof || markdownLineEnding(code)) {
      effects.exit('alertFlowValue');
      return beforeContentChunk(code);
    }

    effects.consume(code);
    return contentChunk;
  }

  /**
   * After alert (ha!).
   *
   * ```markdown
   *   | $$
   *   | \frac{1}{2}
   * > | $$
   *       ^
   * ```
   *
   * @type {State}
   */
  function after(code: number) {
    effects.exit('alertFlow');
    return ok(code);
  }

  /** @type {Tokenizer} */
  function tokenizeClosingFence(effects, ok, nok) {
    let size = 0;

    /**
     * Before closing fence, at optional whitespace.
     *
     * ```markdown
     *   | $$
     *   | \frac{1}{2}
     * > | $$
     *     ^
     * ```
     */
    return factorySpace(
      effects,
      beforeSequenceClose,
      types.linePrefix,
      constants.tabSize
    );

    /**
     * In closing fence, after optional whitespace, at sequence.
     *
     * ```markdown
     *   | $$
     *   | \frac{1}{2}
     * > | $$
     *     ^
     * ```
     *
     * @type {State}
     */
    function beforeSequenceClose(code: number) {
      effects.enter('alertFlowFence');
      effects.enter('alertFlowFenceSequence');
      return sequenceClose(code);
    }

    /**
     * In closing fence sequence.
     *
     * ```markdown
     *   | $$
     *   | \frac{1}{2}
     * > | $$
     *      ^
     * ```
     *
     * @type {State}
     */
    function sequenceClose(code: number) {
      if (code === codes.exclamationMark) {
        size++;
        effects.consume(code);
        return sequenceClose;
      }

      if (size < sizeOpen) {
        return nok(code);
      }

      effects.exit('alertFlowFenceSequence');
      return factorySpace(effects, afterSequenceClose, types.whitespace)(code);
    }

    /**
     * After closing fence sequence, after optional whitespace.
     *
     * ```markdown
     *   | $$
     *   | \frac{1}{2}
     * > | $$
     *       ^
     * ```
     *
     * @type {State}
     */
    function afterSequenceClose(code: number) {
      if (code === codes.eof || markdownLineEnding(code)) {
        effects.exit('alertFlowFence');
        return ok(code);
      }

      return nok(code);
    }
  }
}

/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function tokenizeNonLazyContinuation(this: any, effects, ok, nok) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this;

  return start;

  /** @type {State} */
  function start(code: number) {
    if (code === null) {
      return ok(code);
    }

    effects.enter(types.lineEnding);
    effects.consume(code);
    effects.exit(types.lineEnding);
    return lineStart;
  }

  /** @type {State} */
  function lineStart(code: number) {
    return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
  }
}

/**
 * Create an extension for `mdast-util-from-markdown`.
 *
 * @returns {FromMarkdownExtension}
 *   Extension for `mdast-util-from-markdown`.
 */
export function mdAlertFromMarkdown() {
  return {
    enter: {
      alertFlow: enteralertFlow,
      alertFlowFenceMeta: enteralertFlowMeta
    },
    exit: {
      alertFlow: exitalertFlow,
      alertFlowFence: exitalertFlowFence,
      alertFlowFenceMeta: exitalertFlowMeta,
      alertFlowValue: exitalertData
    }
  };

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function enteralertFlow(this: any, token: unknown) {
    console.log('enteralertFlow', token);
    this.enter(
      {
        type: 'alert',
        meta: null,
        value: '',
        data: {
          hName: 'div',
          hProperties: { className: ['alert'] },
          hChildren: [{ type: 'text', value: '' }]
        }
      },
      token
    );
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function enteralertFlowMeta(this: any) {
    this.buffer();
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitalertFlowMeta(this: any) {
    const data = this.resume();
    console.log('exitalertFlowMeta', data);
    const node = /** @type {alert} */ this.stack[this.stack.length - 1];
    node.meta = data;
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitalertFlowFence(this: any) {
    // Exit if this is the closing fence.
    if (this.getData('alertFlowInside')) return;
    this.buffer();
    this.setData('alertFlowInside', true);
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitalertFlow(this: any, token) {
    const data = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '');
    const node = /** @type {alert} */ this.exit(token);
    node.value = data;
    node.data.hChildren[0].value = data;
    this.setData('alertFlowInside');
  }

  /**
   * @this {CompileContext}
   * @type {FromMarkdownHandle}
   */
  function exitalertData(this: any, token) {
    console.log('exitalertData', token);
    this.config.enter.data.call(this, token);
    this.config.exit.data.call(this, token);
  }
}

/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast-util-alert').ToOptions} Options
 *
 * @typedef {import('mdast-util-alert')} DoNotTouchAsThisImportIncludesalertInTree
 */

function mdAlert() {
  return {
    flow: {
      [codes.exclamationMark]: {
        tokenize: tokenizealertFenced,
        concrete: true
      }
    }
  };
}

/**
 * Plugin to support markdown alert.
 */
export default function remarkAlert(this: any) {
  const data = this.data();

  add('micromarkExtensions', mdAlert());
  add('fromMarkdownExtensions', mdAlertFromMarkdown());

  /**
   * @param {string} field
   * @param {unknown} value
   */
  function add(field: string, value: unknown) {
    const list /** @type {unknown[]} */ =
      // Other extensions
      /* c8 ignore next 2 */
      data[field] ? data[field] : (data[field] = []);

    list.push(value);
  }
}
