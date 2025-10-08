import { randomId } from '@vavt/util';
import { watch, inject, ComputedRef, onMounted, shallowRef, Ref } from 'vue';
import { prefix, globalConfig } from '~/config';
import { CDN_IDS } from '~/static';
import { ERROR_CATCHER } from '~/static/event-name';
import { mermaidCache } from '~/utils/cache';
import { appendHandler } from '~/utils/dom';
import eventBus from '~/utils/event-bus';

import { ContentPreviewProps } from '../ContentPreview';

/**
 * 注册katex扩展到页面
 *
 */
const useMermaid = (props: ContentPreviewProps) => {
  const editorId = inject('editorId') as string;
  const theme = inject('theme') as ComputedRef<string>;
  const rootRef = inject('rootRef') as Ref<HTMLDivElement>;
  const { editorExtensions, editorExtensionsAttrs, mermaidConfig } = globalConfig;

  let mermaid = editorExtensions.mermaid!.instance;
  const reRenderRef = shallowRef(-1);

  const configMermaid = () => {
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
    if (props.noMermaid || mermaid) {
      return;
    }

    const jsSrc = editorExtensions.mermaid!.js as string;

    if (/\.mjs/.test(jsSrc)) {
      appendHandler('link', {
        ...editorExtensionsAttrs.mermaid?.js,
        rel: 'modulepreload',
        href: jsSrc,
        id: CDN_IDS.mermaidM
      });

      import(
        /* @vite-ignore */
        /* webpackIgnore: true */
        jsSrc
      )
        .then((module) => {
          mermaid = module.default;
          configMermaid();
        })
        .catch((error) => {
          eventBus.emit(editorId, ERROR_CATCHER, {
            name: 'mermaid',
            message: `Failed to load mermaid module: ${error.message}`,
            error
          });
        });
    } else {
      appendHandler(
        'script',
        {
          ...editorExtensionsAttrs.mermaid?.js,
          src: jsSrc,
          id: CDN_IDS.mermaid,
          onload() {
            mermaid = window.mermaid;
            configMermaid();
          }
        },
        'mermaid'
      );
    }
  });

  const replaceMermaid = async () => {
    if (!props.noMermaid && mermaid) {
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
            if (item.dataset.closed === 'false') {
              return false;
            }

            const code = item.innerText;
            let mermaidHtml = mermaidCache.get(code) as string;

            if (!mermaidHtml) {
              const idRand = randomId();
              let result: { svg: string } = { svg: '' };
              try {
                result = await mermaid.render(idRand, code, svgContainingElement);

                mermaidHtml = await props.sanitizeMermaid!(result.svg);

                const p = document.createElement('p');
                p.className = `${prefix}-mermaid`;
                p.setAttribute('data-processed', '');
                p.setAttribute('data-content', code);
                p.innerHTML = mermaidHtml;
                p.children[0]?.removeAttribute('height');

                mermaidCache.set(code, p.innerHTML);

                if (item.dataset.line !== undefined) {
                  p.dataset.line = item.dataset.line;
                }

                item.replaceWith(p);
              } catch (error: any) {
                eventBus.emit(editorId, ERROR_CATCHER, {
                  name: 'mermaid',
                  message: error.message,
                  error
                });
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

  return { reRenderRef, replaceMermaid };
};

export default useMermaid;
