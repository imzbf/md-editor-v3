import { ComputedRef, inject, onMounted, shallowRef, watch } from 'vue';
import { globalConfig } from '~/config';
import { appendHandler, updateHandler } from '~/utils/dom';
import { ContentPreviewProps } from '../ContentPreview';
import { CDN_IDS } from '~/static';

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
  const hljsRef = shallowRef(globalConfig.editorExtensions.highlight!.instance);

  onMounted(() => {
    // 强制不高亮，则什么都不做
    if (props.noHighlight || hljsRef.value) {
      return;
    }

    appendHandler('link', {
      ...highlight.value.css,
      rel: 'stylesheet',
      id: CDN_IDS.hlcss
    });
    appendHandler(
      'script',
      {
        ...highlight.value.js,
        id: CDN_IDS.hljs,
        onload() {
          hljsRef.value = window.hljs;
        }
      },
      'hljs'
    );
  });

  watch(
    () => highlight.value.css,
    () => {
      // 强制不高亮，则什么都不做
      if (props.noHighlight || globalConfig.editorExtensions.highlight!.instance) {
        return;
      }

      updateHandler('link', {
        ...highlight.value.css,
        rel: 'stylesheet',
        id: CDN_IDS.hlcss
      });
    }
  );

  return hljsRef;
};

export default useHighlight;
