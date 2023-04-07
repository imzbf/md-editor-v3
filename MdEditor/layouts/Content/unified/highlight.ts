import type { ComputedRef, ShallowRef } from 'vue';
import { visit } from 'unist-util-visit';
import { removePosition } from 'unist-util-remove-position';
import { toText } from 'hast-util-to-text';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { generateCodeRowNumber } from '~/utils';
import { Themes } from '~/type';
import { prefix } from '~/config';

const parseHtml = unified().use(rehypeParse, { fragment: true });

export default function highlight(options: {
  hljsRef: ShallowRef<any>;
  noHighlight: boolean;
  showCodeRowNumber: boolean;
  themeRef: ComputedRef<Themes>;
}) {
  // const throwOnError = settings.throwOnError || false;

  return (tree: any) => {
    visit(tree, 'element', (element, _, pElement) => {
      // 不是块级的代码，不处理高亮
      if (pElement?.tagName !== 'pre' || element.tagName !== 'code') {
        return;
      }

      const classes =
        element.properties && Array.isArray(element.properties.className)
          ? element.properties.className
          : [];

      let language = '';
      for (let i = 0; i < classes.length; i++) {
        const matchResult = classes[i].match(/language-(.*)/);
        if (matchResult) {
          language = matchResult[1];
          break;
        }
      }

      // 如果是mermaid，不在这里处理
      if (language === 'mermaid') {
        pElement.properties['data-mermaid-theme'] = options.themeRef.value;
        pElement.properties.class = `${prefix}-mermaid`;
        return;
      }

      // 设置默认不高亮或者实例没有准备好不处理
      const { hljsRef, noHighlight } = options;
      if (noHighlight || !hljsRef.value) {
        return;
      }

      let codeHtml;
      const value = toText(element, { whitespace: 'pre' });
      const hljsLang = hljsRef.value.getLanguage(language);
      if (hljsLang) {
        codeHtml = hljsRef.value.highlight(value, {
          language,
          ignoreIllegals: true
        }).value;
      } else {
        codeHtml = hljsRef.value.highlightAuto(value).value;
      }

      codeHtml = options.showCodeRowNumber
        ? generateCodeRowNumber(codeHtml.trim())
        : `<span class="code-block">${codeHtml.trim()}</span>`;

      element.children = removePosition(parseHtml.parse(codeHtml), true).children;
      element.properties = {
        class: `language-${language}`,
        language
      };
      // console.log('element', element);

      // const inline = classes.includes('math-inline');
      // const displayMode = classes.includes('math-display');

      // if (!inline && !displayMode) {
      //   return;
      // }

      // const value = toText(element, { whitespace: 'pre' });

      // let result: string;

      // const { hljsRef } = settings;

      // // console.log('katex', katex.value);

      // if (!hljsRef.value && !window.katex) {
      //   return;
      // }

      // try {
      //   result = hljsRef.value.renderToString(
      //     value,
      //     assign({}, settings, { displayMode, throwOnError: true })
      //   );
      // } catch (error: any) {
      //   // const fn = throwOnError ? 'fail' : 'message';
      //   // const origin = [source, error.name.toLowerCase()].join(':');

      //   // file[fn](error.message, element.position, origin);

      //   result = hljsRef.value.renderToString(
      //     value,
      //     assign({}, settings, {
      //       displayMode,
      //       throwOnError: false,
      //       strict: 'ignore'
      //     })
      //   );
      // }

      // element.children = removePosition(parseHtml.parse(result), true).children;
    });
  };
}
