import { watch, inject, Ref, toRef, onMounted } from 'vue';
import mediumZoom from 'medium-zoom';
import { debounce } from '@vavt/util';

import { ContentPreviewProps } from '../ContentPreview';

/**
 * 放大图片
 *
 * @param props 基础属性
 * @param html 编译后的html
 */
const userZoom = (props: ContentPreviewProps, html: Ref<string>) => {
  const editorId = inject('editorId') as string;

  // 解构出来，不让它响应式更新
  const { noImgZoomIn } = props;

  const zoomHander = debounce<any, void>(() => {
    const imgs = document.querySelectorAll(`#${editorId}-preview img:not(.not-zoom)`);

    if (imgs.length === 0) {
      return;
    }

    mediumZoom(imgs, {
      background: '#00000073'
    });
  });

  onMounted(() => {
    if (!noImgZoomIn && props.setting.preview) {
      zoomHander();
    }
  });

  watch([html, toRef(props.setting, 'preview')], () => {
    if (!noImgZoomIn && props.setting.preview) {
      zoomHander();
    }
  });
};

export default userZoom;
