import { onMounted, inject, ref } from 'vue';
import { prefix, screenfullUrl } from '../../config';
import { appendHandler } from '../../utils/dom';
import { ConfigOption } from '../../type';

export const useSreenfull = (props: any) => {
  const previewOnly = inject('previewOnly') as boolean;
  const extension = inject('extension') as ConfigOption;
  let screenfull = extension.editorExtensions?.screenfull?.instance;
  const screenfullJs = extension.editorExtensions?.screenfull?.js;
  // 是否组件内部全屏标识
  const screenfullMe = ref(false);

  // 触发器
  const fullScreenHandler = () => {
    if (!screenfull) {
      // CATCH ERROR: 捕获全局错误
      return;
    }

    if (screenfull.isEnabled) {
      screenfullMe.value = true;
      if (screenfull.isFullscreen) {
        screenfull.exit();
      } else {
        screenfull.request();
      }
    } else {
      console.error('browser does not support screenfull!');
    }
  };

  // 挂载监听事件
  const onScreenfullEvent = () => {
    if (screenfull && screenfull.isEnabled) {
      screenfull.on('change', () => {
        if (screenfullMe.value) {
          screenfullMe.value = false;
          props.updateSetting(!props.setting.fullscreen, 'fullscreen');
        }
      });
    }
  };

  const screenfullLoad = () => {
    // 复制实例
    screenfull = window.screenfull;
    // 重新监听
    onScreenfullEvent();
  };

  onMounted(() => {
    onScreenfullEvent();

    if (!previewOnly && !screenfull) {
      const screenScript = document.createElement('script');
      screenScript.src = screenfullJs || screenfullUrl;
      screenScript.onload = screenfullLoad;
      screenScript.id = `${prefix}-screenfull`;

      appendHandler(screenScript, 'screenfull');
    }
  });

  return { fullScreenHandler };
};
