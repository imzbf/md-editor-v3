import { ComputedRef, inject, onMounted, shallowRef, watch } from 'vue';
import { prefix, configOption } from '~/config';
import { appendHandler, updateHandler } from '~/utils/dom';
import { ContentProps } from '../props';

/**
 * 注册代码高亮扩展到页面
 *
 * @param props 内容组件props
 */
const useHighlight = (props: ContentProps) => {
  // 获取相应的扩展配置链接
  const hljsConf = configOption.editorExtensions?.highlight;
  const hljs = hljsConf?.instance;

  const highlightUrl = inject('highlight') as ComputedRef<{ js: string; css: string }>;

  // hljs是否已经提供
  const hljsRef = shallowRef(hljs);

  onMounted(() => {
    if (!props.noHighlight && !hljsRef.value) {
      const highlightScript = document.createElement('script');
      highlightScript.src = highlightUrl.value.js;
      highlightScript.onload = () => {
        hljsRef.value = window.hljs;
      };
      highlightScript.id = `${prefix}-hljs`;

      const highlightLink = document.createElement('link');
      highlightLink.rel = 'stylesheet';
      highlightLink.href = highlightUrl.value.css;
      highlightLink.id = `${prefix}-hlCss`;

      appendHandler(highlightScript, 'hljs');
      appendHandler(highlightLink);
    }
  });

  watch(
    () => highlightUrl.value.css,
    (url: string) => {
      updateHandler(`${prefix}-hlCss`, 'href', url);
    }
  );

  return hljsRef;
};

export default useHighlight;
