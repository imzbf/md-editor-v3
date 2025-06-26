import { defineComponent, PropType, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import ClipModal from './Clip';
import { prefix } from '~/config';

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

type ModalsProps = Readonly<LooseRequired<Readonly<ExtractPropTypes<typeof props>>>>;

// 链接弹窗\图片弹窗\帮助弹窗
export default defineComponent({
  name: `${prefix}-modals`,
  props,
  setup(props: ModalsProps) {
    return () => (
      <ClipModal
        visible={props.clipVisible}
        onOk={props.onOk}
        onCancel={props.onCancel}
      />
    );
  }
});
