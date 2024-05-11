import { onMounted, shallowRef } from 'vue';
import { prefix, configOption } from '~/config';
import { appendHandler } from '~/utils/dom';
import { ContentPreviewProps } from '../ContentPreview';

/**
 * 注册katex扩展到页面
 *
 * @param props 内容组件props
 */
const useKatex = (props: ContentPreviewProps) => {
  // katex是否加载完成
  const katex = shallowRef(configOption.editorExtensions.katex!.instance);

  onMounted(() => {
    if (props.noKatex || katex.value) {
      return;
    }

    const { editorExtensions } = configOption;

    appendHandler(
      'script',
      {
        src: editorExtensions.katex!.js,
        id: `${prefix}-katex`,
        onload() {
          katex.value = window.katex;
        }
      },
      'katex'
    );

    appendHandler('link', {
      rel: 'stylesheet',
      href: editorExtensions.katex!.css,
      id: `${prefix}-katexCss`
    });
  });

  return katex;
};

export default useKatex;
