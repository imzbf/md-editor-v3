import { watch, inject, Ref, onMounted, toRef } from 'vue';
import mediumZoom from 'medium-zoom';

import { debounce } from '~/utils';
import { ContentProps } from '../props';

/**
 * 放大图片
 *
 * @param props 基础属性
 * @param html 编译后的html
 */
const userZoom = (props: ContentProps, html: Ref<string>) => {
  const editorId = inject('editorId') as string;

  const zoomHander = debounce(() => {
    const imgs = document.querySelectorAll(`#${editorId}-preview img[zoom]`);

    if (imgs.length === 0) {
      return;
    }

    mediumZoom(imgs, {
      background: '#00000073'
    });
  });

  onMounted(zoomHander);
  watch([html, toRef(props.setting, 'preview')], zoomHander);
};

export default userZoom;
