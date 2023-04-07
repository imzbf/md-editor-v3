import type { Ref } from 'vue';
import { visit } from 'unist-util-visit';
import { removePosition } from 'unist-util-remove-position';
import { toText } from 'hast-util-to-text';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';

const parseHtml = unified().use(rehypeParse, { fragment: true });

import { HeadList, MarkedHeadingId } from '~/type';

export default function heading(options: {
  headingId: MarkedHeadingId;
  headsRef: Ref<HeadList[]>;
}) {
  return (tree: any) => {
    visit(tree, 'element', (element) => {
      const matchResult = element.tagName.match(/h([1-6])/);
      if (!matchResult) {
        return;
      }

      const raw = toText(element, { whitespace: 'pre' });
      const [, level] = matchResult;
      const { headingId, headsRef } = options;

      headsRef.value.push({ text: raw, level });

      const id = headingId(raw, level, headsRef.value.length);
      const headingHtml = `<a href="#${id}">${raw}</a>`;
      element.children = removePosition(parseHtml.parse(headingHtml), true).children;
      element.properties = {
        id
      };
    });
  };
}
