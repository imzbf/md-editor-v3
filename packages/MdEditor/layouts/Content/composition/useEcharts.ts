import {
  watch,
  inject,
  ComputedRef,
  onMounted,
  shallowRef,
  Ref,
  onBeforeUnmount
} from 'vue';
import { prefix, globalConfig } from '~/config';
import { CDN_IDS } from '~/static';
import { appendHandler } from '~/utils/dom';

import { ContentPreviewProps } from '../ContentPreview';

/**
 * 注册katex扩展到页面
 *
 */
const useEcharts = (props: ContentPreviewProps) => {
  const editorId = inject('editorId') as string;
  const theme = inject('theme') as ComputedRef<string>;
  const rootRef = inject('rootRef') as Ref<HTMLDivElement>;
  const { editorExtensions, editorExtensionsAttrs } = globalConfig;

  let echarts = editorExtensions.echarts!.instance;
  const reRenderEcharts = shallowRef(-1);

  const configEcharts = () => {
    if (!props.noEcharts && echarts) {
      reRenderEcharts.value = reRenderEcharts.value + 1;
    }
  };

  watch(
    () => theme.value,
    () => {
      configEcharts();
    }
  );

  onMounted(() => {
    if (props.noEcharts || echarts) {
      return;
    }

    const jsSrc = editorExtensions.echarts!.js as string;

    appendHandler(
      'script',
      {
        ...editorExtensionsAttrs.echarts?.js,
        src: jsSrc,
        id: CDN_IDS.echarts,
        onload() {
          echarts = window.echarts;
          configEcharts();
        }
      },
      'mermaid'
    );
  });

  let mermaidSourceEles: Array<HTMLElement>;
  let echartsInstances: any[] = [];
  let observers: Array<ResizeObserver> = [];

  const clearEchartsEffects = () => {
    echartsInstances.forEach((instance) => {
      instance.dispose();
    });
    observers.forEach((observer) => {
      observer.disconnect();
    });

    echartsInstances = [];
    mermaidSourceEles = [];
    observers = [];
  };

  const replaceEcharts = () => {
    clearEchartsEffects();

    if (!props.noEcharts && echarts) {
      mermaidSourceEles = Array.from(
        rootRef.value.querySelectorAll<HTMLElement>(
          `#${editorId} div.${prefix}-echarts:not([data-processed])`
        )
      );

      mermaidSourceEles.forEach((item) => {
        if (item.dataset.closed === 'false') {
          return false;
        }

        const code = item.innerText;
        const ins = echarts.init(item, theme.value);
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        ins.setOption(new Function(`return ${code}`)());
        item.setAttribute('data-processed', '');

        echartsInstances.push(ins);

        const observer = new ResizeObserver(() => {
          ins.resize();
        });
        observer.observe(item);
        observers.push(observer);
      });
    }
  };

  onBeforeUnmount(() => {
    clearEchartsEffects();
  });

  return { reRenderEcharts, replaceEcharts };
};

export default useEcharts;
