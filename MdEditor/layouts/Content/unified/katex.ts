/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('katex').KatexOptions} Options
 */

// import katex from 'katex';
import type { ShallowRef } from 'vue';
import { visit } from 'unist-util-visit';
import { removePosition } from 'unist-util-remove-position';
import { toText } from 'hast-util-to-text';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';

const assign = Object.assign;

const parseHtml = unified().use(rehypeParse, { fragment: true });

// const source = 'rehype-katex';

/**
 * Plugin to transform `<span class=math-inline>` and `<div class=math-display>`
 * with KaTeX.
 *
 */
export default function rehypeKatex(options: {
  katexRef: ShallowRef<any>;
  noKatex: boolean;
}) {
  // const throwOnError = settings.throwOnError || false;

  return (tree: any) => {
    visit(tree, 'element', (element) => {
      const classes =
        element.properties && Array.isArray(element.properties.className)
          ? element.properties.className
          : [];

      const inline = classes.includes('math-inline');
      const displayMode = classes.includes('math-display');

      if (!inline && !displayMode) {
        return;
      }

      const value = toText(element, { whitespace: 'pre' });

      let result: string;

      const { katexRef, noKatex } = options;

      if (noKatex || !katexRef.value) {
        return;
      }

      try {
        result = katexRef.value.renderToString(
          value,
          assign({}, options, { displayMode, throwOnError: true })
        );
      } catch (error: any) {
        // const fn = throwOnError ? 'fail' : 'message';
        // const origin = [source, error.name.toLowerCase()].join(':');

        // file[fn](error.message, element.position, origin);

        result = katexRef.value.renderToString(
          value,
          assign({}, options, {
            displayMode,
            throwOnError: false,
            strict: 'ignore'
          })
        );
      }

      // element.value = result;
      // element.children = [];
      // element.type = 'WhiteSpaceNode';
      // console.log(element);

      element.children = removePosition(parseHtml.parse(result), true).children;
    });
  };
}
