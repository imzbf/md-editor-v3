import { watch, inject, ComputedRef, onMounted, shallowRef, nextTick } from 'vue';
import LRUCache from 'lru-cache';
import { prefix, mermaidUrl, configOption } from '~/config';
import { appendHandler } from '~/utils/dom';
import { uuid } from '~/utils';

import { ContentPreviewProps } from '../ContentPreview';

/**
 * 注册katex扩展到页面
 *
 */
const useMermaid = (props: ContentPreviewProps) => {
  const theme = inject('theme') as ComputedRef<string>;
  const { editorExtensions } = configOption;
  const mermaidConf = editorExtensions?.mermaid;

  const mermaidRef = shallowRef(mermaidConf?.instance);
  const reRenderRef = shallowRef(false);

  const mermaidCache = new LRUCache({
    max: 1000,
    // 缓存10分钟
    ttl: 600000
  });

  const setMermaidTheme = () => {
    const mermaid = mermaidConf?.instance || window.mermaid;

    if (!props.noMermaid && mermaid) {
      mermaid.initialize({
        startOnLoad: false,
        theme: theme.value === 'dark' ? 'dark' : 'default'
      });
      reRenderRef.value = !reRenderRef.value;
    }
  };

  watch(
    () => theme.value,
    () => {
      mermaidCache.clear();
      setMermaidTheme();
    }
  );

  onMounted(() => {
    if (props.noMermaid) {
      return;
    }

    // 没有提供实例，引入mermaid
    if (!mermaidConf?.instance) {
      const mermaidScript = document.createElement('script');
      mermaidScript.id = `${prefix}-mermaid`;
      const jsSrc = mermaidConf?.js || mermaidUrl;

      if (/\.mjs/.test(jsSrc)) {
        mermaidScript.setAttribute('type', 'module');
        mermaidScript.innerHTML = `import mermaid from "${jsSrc}";window.mermaid=mermaid;document.getElementById('${prefix}-mermaid').dispatchEvent(new Event('load'));`;
      } else {
        mermaidScript.src = jsSrc;
      }
      mermaidScript.onload = () => {
        mermaidRef.value = window.mermaid;
        setMermaidTheme();
      };

      appendHandler(mermaidScript, 'mermaid');
    }
  });

  const replaceMermaid = () => {
    nextTick(() => {
      if (!props.noMermaid && mermaidRef.value) {
        const mermaidSourceEles = document.querySelectorAll<HTMLElement>(
          `div.${prefix}-mermaid`
        );

        mermaidSourceEles.forEach(async (item) => {
          let mermaidHtml = mermaidCache.get(item.innerText) as string;

          if (!mermaidHtml) {
            const idRand = uuid();
            // @9以下使用renderAsync，@10以上使用render
            const render = mermaidRef.value.renderAsync || mermaidRef.value.render;

            const svg = await render(idRand, item.innerText);

            // 9:10
            mermaidHtml = typeof svg === 'string' ? svg : svg.svg;
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
        });
      }
    });
  };

  return { mermaidRef, reRenderRef, replaceMermaid };
};

export default useMermaid;
