import { onMounted, shallowRef } from 'vue';
import { globalConfig } from '~/config';
import { CDN_IDS } from '~/static';
import { appendHandler } from '~/utils/dom';
import { ContentPreviewProps } from '../ContentPreview';

/**
 * 注册katex扩展到页面
 *
 * @param props 内容组件props
 */
const useKatex = (props: ContentPreviewProps) => {
  // katex是否加载完成
  const katex = shallowRef(globalConfig.editorExtensions.katex!.instance);

  onMounted(() => {
    if (props.noKatex || katex.value) {
      return;
    }

    const { editorExtensions, editorExtensionsAttrs } = globalConfig;

    appendHandler(
      'script',
      {
        ...editorExtensionsAttrs.katex?.js,
        src: editorExtensions.katex!.js,
        id: CDN_IDS.katexjs,
        onload() {
          katex.value = window.katex;
        }
      },
      'katex'
    );

    appendHandler('link', {
      ...editorExtensionsAttrs.katex?.css,
      rel: 'stylesheet',
      href: editorExtensions.katex!.css,
      id: CDN_IDS.katexcss
    });
  });

  return katex;
};

export default useKatex;
