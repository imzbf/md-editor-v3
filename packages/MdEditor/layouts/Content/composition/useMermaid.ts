import { randomId } from '@vavt/util';
import {
  watch,
  inject,
  ComputedRef,
  onMounted,
  onBeforeUnmount,
  shallowRef,
  Ref
} from 'vue';

import { ContentPreviewProps } from '../ContentPreview';

import { prefix, globalConfig } from '~/config';
import { CDN_IDS } from '~/static';
import { ERROR_CATCHER } from '~/static/event-name';
import { TtlLruCache } from '~/utils/cache';
import { appendHandler } from '~/utils/dom';
import eventBus from '~/utils/event-bus';

interface MermaidResult {
  svg: string;
  bindFunctions?: (element: HTMLElement) => void;
}

interface MermaidInstance {
  initialize: (options: Record<string, any>) => void;
  render: (id: string, code: string, container: HTMLElement) => Promise<MermaidResult>;
  mermaidAPI?: { defaultConfig?: { secure?: string[] } };
}

// initialize 会修改 Mermaid 的共享配置，必须和 render 一起排队；只依赖第三方
// render 自己的队列，仍会被另一预览的 initialize 改写主题或安全策略。
const renderQueues = new WeakMap<object, Promise<void>>();
const enqueueRender = <T>(instance: object, render: () => Promise<T>): Promise<T> => {
  const task = (renderQueues.get(instance) || Promise.resolve()).then(render);
  renderQueues.set(
    instance,
    task.then(
      () => {},
      () => {}
    )
  );
  return task;
};

/** 加载 Mermaid，按预览实例缓存已清洗的 SVG，并绑定当前 DOM 的交互事件。 */
const useMermaid = (props: ContentPreviewProps) => {
  const editorId = inject('editorId') as string;
  const theme = inject('theme') as ComputedRef<string>;
  const rootRef = inject('rootRef') as Ref<HTMLDivElement>;
  const { editorExtensions, editorExtensionsAttrs, mermaidConfig } = globalConfig;

  let mermaid = editorExtensions.mermaid!.instance as MermaidInstance | undefined;
  const reRenderRef = shallowRef(0);
  const cache = new TtlLruCache<string, MermaidResult>({ max: 1000, ttl: 600000 });
  const bound = new WeakSet<HTMLElement>();
  const pending = new WeakMap<
    HTMLElement,
    { generation: number; promise: Promise<void> }
  >();
  let generation = 0;
  let disposed = false;

  const getCachedMermaid = (block: string | undefined, code: string) => {
    return cache.get(JSON.stringify([reRenderRef.value, block, code]));
  };

  const invalidateMermaid = () => {
    generation += 1;
    cache.clear();
    reRenderRef.value += 1;
  };

  watch([theme, () => props.sanitizeMermaid], invalidateMermaid, { flush: 'sync' });
  watch(
    () => props.modelValue,
    () => {
      // Markdown 编译可能仍在防抖等待中，先阻止旧文档的异步结果写回。
      generation += 1;
    },
    { flush: 'sync' }
  );

  onMounted(() => {
    if (props.noMermaid || mermaid) {
      return;
    }

    const jsSrc = editorExtensions.mermaid!.js as string;
    const loaded = (instance: MermaidInstance) => {
      if (disposed) return;
      mermaid = instance;
      invalidateMermaid();
    };

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
        .then((module) => loaded(module.default as MermaidInstance))
        .catch((error) => {
          if (disposed) return;
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
            loaded(window.mermaid as MermaidInstance);
          }
        },
        'mermaid'
      );
    }
  });

  const replaceMermaid = async () => {
    const root = rootRef.value;
    if (disposed || props.noMermaid || !mermaid || !root) return;
    const instance = mermaid;

    const nodes = root.querySelectorAll<HTMLElement>(
      `div.${prefix}-mermaid, p.${prefix}-mermaid[data-processed]`
    );
    await Promise.all(
      Array.from(nodes)
        .filter((item) => {
          // 策略更新后 HTML 可能尚未提交，等待当前版本的节点，避免对即将替换的节点启动渲染。
          return (
            item.dataset.closed !== 'false' &&
            item.dataset.mermaidRevision === String(reRenderRef.value) &&
            !bound.has(item)
          );
        })
        .map((item) => {
          const existing = pending.get(item);
          if (existing?.generation === generation) return existing.promise;

          const render = async () => {
            const version = generation;
            const revision = reRenderRef.value;
            const code = item.dataset.content ?? item.textContent ?? '';
            const block = item.dataset.mermaidBlock;
            const key = JSON.stringify([revision, block, code]);
            const sanitize = props.sanitizeMermaid;
            const currentTheme = theme.value;
            const isCurrent = () =>
              !disposed &&
              generation === version &&
              item.isConnected &&
              root.contains(item);

            if (!isCurrent()) return;

            try {
              let result = cache.get(key);
              if (result && item.dataset.processed !== undefined) {
                // Markdown renderer 可以复用当前实例的已清洗 SVG，但新生成的 DOM
                // 仍需绑定事件，不能把 data-processed 当作事件也已绑定的标记。
                result.bindFunctions?.(item);
                bound.add(item);
                return;
              }
              if (!result) {
                const rendered = await enqueueRender(instance, async () => {
                  if (!isCurrent()) return;

                  const securityDefaults = {
                    startOnLoad: false,
                    securityLevel: 'strict',
                    secure: Array.from(
                      new Set([
                        ...(instance.mermaidAPI?.defaultConfig?.secure || []),
                        'secure',
                        'securityLevel',
                        'startOnLoad',
                        'maxTextSize',
                        'suppressErrorRendering',
                        'maxEdges',
                        'dompurifyConfig'
                      ])
                    )
                  };
                  const baseConfig = {
                    ...securityDefaults,
                    ...(currentTheme === 'dark'
                      ? { theme: 'dark' }
                      : {
                          theme: 'base',
                          themeVariables: {
                            background: '#ffffff',
                            primaryColor: '#ffffff',
                            primaryTextColor: '#1f2329',
                            primaryBorderColor: '#b7c0cc',
                            secondaryColor: '#f7f8fa',
                            tertiaryColor: '#f7f8fa',
                            lineColor: '#596273',
                            edgeLabelBackground: '#ffffff',
                            clusterBkg: '#ffffff',
                            clusterBorder: '#b7c0cc'
                          }
                        })
                  };
                  const configured = mermaidConfig(baseConfig) as
                    | Record<string, unknown>
                    | undefined;
                  instance.initialize({
                    ...configured,
                    // 返回部分主题配置时仍继承安全默认值，显式覆盖则尊重调用方选择。
                    startOnLoad: configured?.startOnLoad ?? false,
                    securityLevel: configured?.securityLevel ?? 'strict',
                    secure: configured?.secure ?? securityDefaults.secure
                  });

                  const container = document.createElement('div');
                  container.style.cssText =
                    'position:fixed;z-index:-10000;top:-10000px;left:-10000px;';
                  container.style.width =
                    Math.max(document.body.offsetWidth, 1366) + 'px';
                  container.style.height =
                    Math.max(document.body.offsetHeight, 768) + 'px';
                  document.body.appendChild(container);
                  try {
                    return await instance.render(randomId(), code, container);
                  } finally {
                    container.remove();
                  }
                });
                if (!rendered || !isCurrent()) return;

                const svg = sanitize ? await sanitize(rendered.svg) : rendered.svg;
                if (!isCurrent()) return;
                if (typeof svg !== 'string') {
                  throw new TypeError('Mermaid sanitizer must return a string.');
                }
                result = { svg, bindFunctions: rendered.bindFunctions };
              }

              if (!isCurrent()) return;
              const paragraph = document.createElement('p');
              for (const attribute of Array.from(item.attributes)) {
                paragraph.setAttribute(attribute.name, attribute.value);
              }
              paragraph.setAttribute('data-processed', '');
              paragraph.setAttribute('data-content', code);
              paragraph.innerHTML = result.svg;
              paragraph.children[0]?.removeAttribute('height');
              const normalized = { ...result, svg: paragraph.innerHTML };

              item.replaceWith(paragraph);
              try {
                // 每次插入新的 DOM 都重新绑定。缓存只在同一预览的同一代码块中复用，
                // 相同源码的其他图表会获得独立 SVG id，避免回调绑定到错误的图表。
                result.bindFunctions?.(paragraph);
                bound.add(paragraph);
              } catch (error) {
                paragraph.replaceWith(item);
                throw error;
              }
              cache.set(key, normalized);
            } catch (error: any) {
              if (!isCurrent()) return;
              if (item.dataset.processed !== undefined) {
                item.textContent = code;
                item.removeAttribute('data-processed');
              }
              eventBus.emit(editorId, ERROR_CATCHER, {
                name: 'mermaid',
                message: error?.message,
                error
              });
            }
          };

          const task = render().finally(() => {
            if (pending.get(item)?.promise === task) pending.delete(item);
          });
          pending.set(item, { generation, promise: task });
          return task;
        })
    );
  };

  onBeforeUnmount(() => {
    disposed = true;
    generation += 1;
    cache.clear();
  });

  return { reRenderRef, replaceMermaid, invalidateMermaid, getCachedMermaid };
};

export default useMermaid;
