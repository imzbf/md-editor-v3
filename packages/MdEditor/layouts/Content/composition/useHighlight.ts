import { ComputedRef, inject, onMounted, shallowRef, watch } from 'vue';
import { prefix, configOption } from '~/config';
import { appendHandler, updateHandler, createHTMLElement } from '~/utils/dom';
import { ContentPreviewProps } from '../ContentPreview';

/**
 * 注册代码高亮扩展到页面
 *
 * @param props 内容组件props
 */
const useHighlight = (props: ContentPreviewProps) => {
  const highlight = inject('highlight') as ComputedRef<{
    js: Partial<HTMLElementTagNameMap['script']>;
    css: Partial<HTMLElementTagNameMap['link']>;
  }>;

  // hljs是否已经提供
  const hljsRef = shallowRef(configOption.editorExtensions.highlight!.instance);

  onMounted(() => {
    // 强制不高亮，则什么都不做
    if (props.noHighlight || hljsRef.value) {
      return;
    }

    const highlightScript = createHTMLElement('script', {
      ...highlight.value.js,
      id: `${prefix}-hljs`,
      onload() {
        hljsRef.value = window.hljs;
      }
    });

    const highlightLink = createHTMLElement('link', {
      ...highlight.value.css,
      rel: 'stylesheet',
      id: `${prefix}-hlCss`
    });

    appendHandler(highlightLink);
    appendHandler(highlightScript, 'hljs');
  });

  watch(
    () => highlight.value.css,
    () => {
      updateHandler(
        createHTMLElement('link', {
          ...highlight.value.css,
          rel: 'stylesheet',
          id: `${prefix}-hlCss`
        })
      );
    }
  );

  return hljsRef;
};

export default useHighlight;
