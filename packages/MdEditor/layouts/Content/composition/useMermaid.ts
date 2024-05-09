import { watch, inject, ComputedRef, onMounted, shallowRef, nextTick } from 'vue';
import { LRUCache } from 'lru-cache';
import { prefix, configOption } from '~/config';
import { appendHandler, createHTMLElement } from '~/utils/dom';
import { uuid } from '@vavt/util';

import { ContentPreviewProps } from '../ContentPreview';

/**
 * 注册katex扩展到页面
 *
 */
const useMermaid = (props: ContentPreviewProps) => {
  const theme = inject('theme') as ComputedRef<string>;
  const { editorExtensions, editorExtensionsAttrs, mermaidConfig } = configOption;

  const mermaidRef = shallowRef(editorExtensions!.mermaid!.instance);
  const reRenderRef = shallowRef(-1);

  const mermaidCache = new LRUCache({
    max: 1000,
    // 缓存10分钟
    ttl: 600000
  });

  const configMermaid = () => {
    const mermaid = mermaidRef.value;

    if (!props.noMermaid && mermaid) {
      mermaid.initialize(
        mermaidConfig({
          startOnLoad: false,
          theme: theme.value === 'dark' ? 'dark' : 'default'
        })
      );
      reRenderRef.value = reRenderRef.value + 1;
    }
  };

  watch(
    () => theme.value,
    () => {
      mermaidCache.clear();
      configMermaid();
    }
  );

  onMounted(() => {
    if (props.noMermaid || mermaidRef.value?.instance) {
      return;
    }

    const jsSrc = editorExtensions.mermaid!.js as string;

    if (/\.mjs/.test(jsSrc)) {
      const modulePreload = createHTMLElement('link', {
        ...editorExtensionsAttrs.mermaid?.js,
        rel: 'modulepreload',
        href: jsSrc,
        id: `${prefix}-mermaid-m`
      });
      appendHandler(modulePreload);

      import(
        /* @vite-ignore */
        /* webpackIgnore: true */
        jsSrc
      ).then((module) => {
        mermaidRef.value = module.default;
        configMermaid();
      });
    } else {
      const mermaidScript = createHTMLElement('script', {
        ...editorExtensionsAttrs.mermaid?.js,
        src: jsSrc,
        id: `${prefix}-mermaid`,
        onload() {
          mermaidRef.value = window.mermaid;
          configMermaid();
        }
      });
      appendHandler(mermaidScript, 'mermaid');
    }
  });

  const replaceMermaid = () => {
    nextTick(() => {
      if (!props.noMermaid && mermaidRef.value) {
        const mermaidSourceEles = document.querySelectorAll<HTMLElement>(
          `div.${prefix}-mermaid`
        );

        const svgContainingElement = document.createElement('div');
        svgContainingElement.style.width = document.body.offsetWidth + 'px';
        svgContainingElement.style.height = document.body.offsetHeight + 'px';
        svgContainingElement.style.position = 'fixed';
        svgContainingElement.style.zIndex = '-10000';
        svgContainingElement.style.top = '-10000';

        let count = mermaidSourceEles.length;

        if (count > 0) {
          document.body.appendChild(svgContainingElement);
        }

        mermaidSourceEles.forEach(async (item) => {
          let mermaidHtml = mermaidCache.get(item.innerText) as string;

          if (!mermaidHtml) {
            const idRand = uuid();
            // @9以下使用renderAsync，@10以上使用render
            const render = mermaidRef.value.renderAsync || mermaidRef.value.render;
            let svg: { svg: string } | string = '';
            try {
              svg = await render(idRand, item.innerText, svgContainingElement);
            } catch (error) {
              // console.error(error);
            }

            // 9:10
            mermaidHtml = await props.sanitizeMermaid!(
              typeof svg === 'string' ? svg : svg.svg
            );
            mermaidCache.set(item.innerText, mermaidHtml);
          }

          const p = document.createElement('p');
          p.className = `${prefix}-mermaid`;
          p.setAttribute('data-processed', '');
          p.innerHTML = mermaidHtml;

          if (item.dataset.line !== undefined) {
            p.dataset.line = item.dataset.line;
          }

          item.replaceWith(p);

          if (--count === 0) {
            svgContainingElement.remove();
          }
        });
      }
    });
  };

  return { mermaidRef, reRenderRef, replaceMermaid };
};

export default useMermaid;
