import { watch, inject, ComputedRef, onMounted, shallowRef, Ref } from 'vue';
import { prefix, configOption } from '~/config';
import { appendHandler } from '~/utils/dom';
import { randomId } from '@vavt/util';
import { mermaidCache } from '~/utils/cache';

import { ContentPreviewProps } from '../ContentPreview';

/**
 * 注册katex扩展到页面
 *
 */
const useMermaid = (props: ContentPreviewProps) => {
  const theme = inject('theme') as ComputedRef<string>;
  const rootRef = inject('rootRef') as Ref<HTMLDivElement>;
  const { editorExtensions, editorExtensionsAttrs, mermaidConfig } = configOption;

  const mermaidRef = shallowRef(editorExtensions!.mermaid!.instance);
  const reRenderRef = shallowRef(-1);

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
    if (props.noMermaid || mermaidRef.value) {
      return;
    }

    const jsSrc = editorExtensions.mermaid!.js as string;

    if (/\.mjs/.test(jsSrc)) {
      appendHandler('link', {
        ...editorExtensionsAttrs.mermaid?.js,
        rel: 'modulepreload',
        href: jsSrc,
        id: `${prefix}-mermaid-m`
      });

      import(
        /* @vite-ignore */
        /* webpackIgnore: true */
        jsSrc
      ).then((module) => {
        mermaidRef.value = module.default;
        configMermaid();
      });
    } else {
      appendHandler(
        'script',
        {
          ...editorExtensionsAttrs.mermaid?.js,
          src: jsSrc,
          id: `${prefix}-mermaid`,
          onload() {
            mermaidRef.value = window.mermaid;
            configMermaid();
          }
        },
        'mermaid'
      );
    }
  });

  const replaceMermaid = async () => {
    if (!props.noMermaid && mermaidRef.value) {
      const mermaidSourceEles = rootRef.value.querySelectorAll<HTMLElement>(
        `div.${prefix}-mermaid`
      );

      const svgContainingElement = document.createElement('div');
      const sceWidth =
        document.body.offsetWidth > 1366 ? document.body.offsetWidth : 1366;
      const sceHeight =
        document.body.offsetHeight > 768 ? document.body.offsetHeight : 768;

      svgContainingElement.style.width = sceWidth + 'px';
      svgContainingElement.style.height = sceHeight + 'px';
      svgContainingElement.style.position = 'fixed';
      svgContainingElement.style.zIndex = '-10000';
      svgContainingElement.style.top = '-10000';

      let count = mermaidSourceEles.length;

      if (count > 0) {
        document.body.appendChild(svgContainingElement);
      }

      await Promise.allSettled(
        Array.from(mermaidSourceEles).map((ele) => {
          const handler = async (item: HTMLElement) => {
            let mermaidHtml = mermaidCache.get(item.innerText) as string;

            if (!mermaidHtml) {
              const idRand = randomId();
              let result: { svg: string } = { svg: '' };
              try {
                result = await mermaidRef.value.render(
                  idRand,
                  item.innerText,
                  svgContainingElement
                );

                mermaidHtml = await props.sanitizeMermaid!(result.svg);

                const p = document.createElement('p');
                p.className = `${prefix}-mermaid`;
                p.setAttribute('data-processed', '');
                p.innerHTML = mermaidHtml;
                p.children[0]?.removeAttribute('height');

                mermaidCache.set(item.innerText, p.innerHTML);

                if (item.dataset.line !== undefined) {
                  p.dataset.line = item.dataset.line;
                }

                item.replaceWith(p);
              } catch {
                // console.error(error.message);
              }

              if (--count === 0) {
                svgContainingElement.remove();
              }
            }
          };

          return handler(ele);
        })
      );
    }
  };

  return { mermaidRef, reRenderRef, replaceMermaid };
};

export default useMermaid;
