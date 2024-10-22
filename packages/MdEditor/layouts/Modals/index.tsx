import { defineComponent, PropType, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import LinkModal from './Link';
import ClipModal from './Clip';
import { prefix } from '~/config';

const props = {
  type: {
    type: String as PropType<'link' | 'image' | 'help'>,
    default: 'link'
  },
  linkVisible: {
    type: Boolean as PropType<boolean>,
    default: false
  },
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
      <>
        <LinkModal
          type={props.type}
          visible={props.linkVisible}
          onOk={props.onOk}
          onCancel={props.onCancel}
        />
        <ClipModal
          visible={props.clipVisible}
          onOk={props.onOk}
          onCancel={props.onCancel}
        />
      </>
    );
  }
});
