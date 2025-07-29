import { defineComponent, PropType } from 'vue';
import { prefix } from '~/config';
import ClipModal from './Clip';

const props = {
  clipVisible: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  onCancel: {
    type: Function as PropType<() => void>,
    default: () => {}
  },
  onOk: {
    type: Function as PropType<(data?: any) => void>,
    default: () => {}
  }
};

// 链接弹窗\图片弹窗\帮助弹窗
export default defineComponent({
  name: `${prefix}-modals`,
  props,
  setup(props) {
    return () => (
      <ClipModal
        visible={props.clipVisible}
        onOk={props.onOk}
        onCancel={props.onCancel}
      />
    );
  }
});
