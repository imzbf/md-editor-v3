import { visit } from 'unist-util-visit';
import { removePosition } from 'unist-util-remove-position';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';

const parseHtml = unified().use(rehypeParse, { fragment: true });

export default function img() {
  return (tree: any) => {
    visit(tree, 'element', (element) => {
      if (element.tagName === 'p' && element.children) {
        const { children } = element;

        children.forEach((child: any, index: number) => {
          // 只处理平级的
          if (child.tagName === 'img') {
            const { src = '', alt = '', title = '' } = child.properties;
            const imgHtml = `<span class="figure"><img src="${src}" title="${title}" alt="${alt}" zoom><span class="figcaption">${alt}</span></span>`;

            children[index] = removePosition(parseHtml.parse(imgHtml), true);
          }
        });
      }
    });
  };
}
