import { onMounted, inject, ref } from 'vue';
import { configOption, prefix, screenfullUrl } from '../../config';
import { appendHandler } from '../../utils/dom';
import bus from '../../utils/event-bus';
import { ToolbarProps } from './props';

export const useSreenfull = (props: ToolbarProps) => {
  const editorId = inject('editorId') as string;
  const previewOnly = inject('previewOnly') as boolean;
  let screenfull = configOption.editorExtensions?.screenfull?.instance;
  const screenfullJs = configOption.editorExtensions?.screenfull?.js;
  // 是否组件内部全屏标识
  const screenfullMe = ref(false);

  // 触发器
  const fullScreenHandler = () => {
    if (!screenfull) {
      bus.emit(editorId, 'errorCatcher', {
        name: 'fullScreen',
        message: 'fullScreen is undefined'
      });
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
