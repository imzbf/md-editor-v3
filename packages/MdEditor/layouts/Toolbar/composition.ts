import { onMounted, inject, ref } from 'vue';
import { configOption } from '~/config';
import { appendHandler } from '~/utils/dom';
import bus from '~/utils/event-bus';
import { CDN_IDS } from '~/static';
import { CHANGE_FULL_SCREEN, ERROR_CATCHER } from '~/static/event-name';
import { ToolbarProps } from './props';

export const useSreenfull = (props: ToolbarProps) => {
  const editorId = inject('editorId') as string;
  const { editorExtensions, editorExtensionsAttrs } = configOption;
  let screenfull = editorExtensions.screenfull!.instance;
  // 是否组件内部全屏标识
  const screenfullMe = ref(false);

  // 触发器
  const fullscreenHandler = (status?: boolean) => {
    if (!screenfull) {
      bus.emit(editorId, ERROR_CATCHER, {
        name: 'fullscreen',
        message: 'fullscreen is undefined'
      });
      return;
    }

    if (screenfull.isEnabled) {
      screenfullMe.value = true;

      const targetStatus = status === undefined ? !screenfull.isFullscreen : status;
      if (targetStatus) {
        screenfull.request();
      } else {
        screenfull.exit();
      }
    } else {
      console.error('browser does not support screenfull!');
    }
  };

  // 挂载监听事件
  const onScreenfullEvent = () => {
    if (screenfull && screenfull.isEnabled) {
      screenfull.on('change', () => {
        if (screenfullMe.value || props.setting.fullscreen) {
          screenfullMe.value = false;
          props.updateSetting('fullscreen');
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

    if (!screenfull) {
      appendHandler(
        'script',
        {
          ...editorExtensionsAttrs.screenfull?.js,
          src: editorExtensions.screenfull!.js,
          id: CDN_IDS.screenfull,
          onload: screenfullLoad
        },
        'screenfull'
      );
    }
  });

  onMounted(() => {
    // 注册切换全屏监听
    bus.on(editorId, {
      name: CHANGE_FULL_SCREEN,
      callback: fullscreenHandler
    });
  });

  return { fullscreenHandler };
};
