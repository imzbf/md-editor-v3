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
  // 获取相应的扩展配置链接
  const katexConf = configOption.editorExtensions.katex;
  const katexIns = katexConf!.instance;

  // katex是否加载完成
  const katex = shallowRef(katexIns);

  onMounted(() => {
    // 标签引入katex
    if (!props.noKatex && !katex.value) {
      const katexScript = document.createElement('script');

      katexScript.src = katexConf!.js!;
      katexScript.onload = () => {
        katex.value = window.katex;
      };
      katexScript.id = `${prefix}-katex`;

      const katexLink = document.createElement('link');
      katexLink.rel = 'stylesheet';
      katexLink.href = katexConf!.css!;
      katexLink.id = `${prefix}-katexCss`;

      appendHandler(katexScript, 'katex');
      appendHandler(katexLink);
    }
  });

  return katex;
};

export default useKatex;
