import { defineComponent, PropType, reactive, watch } from 'vue';

import LinkModal from './Link';
import ClipModal from './Clip';

// 链接弹窗\图片弹窗\帮助弹窗
export default defineComponent({
  props: {
    type: {
      type: String as PropType<'link' | 'image' | 'help'>,
      default: 'link'
    },
    visible: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    onCancel: {
      type: Function as PropType<() => void>,
      default: () => () => {}
    },
    onOk: {
      type: Function as PropType<(data?: any) => void>,
      default: () => () => {}
    }
  },

  setup(props) {
    const modelVisible = reactive({
      link: false,
      clip: false
    });

    // 跟随外层状态
    watch(
      () => props.visible,
      (nVal) => {
        modelVisible.link = nVal;

        // 关闭时同步关闭裁剪弹窗
        if (!nVal) {
          modelVisible.clip = nVal;
        }
      }
    );

    return () => (
      <>
        <LinkModal
          {...props}
          visible={modelVisible.link}
          onClip={() => {
            // 关闭链接弹窗
            modelVisible.link = false;
            // 打开裁剪上传弹窗
            modelVisible.clip = true;
          }}
        />
        <ClipModal
          visible={modelVisible.clip}
          onOk={props.onOk}
          onCancel={props.onCancel}
        />
      </>
    );
  }
});
