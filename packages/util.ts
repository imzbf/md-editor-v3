import { CDN_IDS } from './MdEditor/static';

/**
 * 清空组件带来的副作用，例如
 * 1. 使用CDN嵌入的链接，为了保证多个组件能够正常使用，组件在卸载时不会主动移除
 */
export const clearSideEffects = () => {
  (Object.keys(CDN_IDS) as Array<keyof typeof CDN_IDS>).forEach((key) => {
    const ele = document.getElementById(CDN_IDS[key]);

    if (ele) {
      ele.remove();
    }
  });
};
