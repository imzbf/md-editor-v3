import { computed, defineComponent, PropType, reactive } from 'vue';
import Modal from '../../components/Modal';

import { prefix } from '../../Editor';

// 链接弹窗\图片弹窗\帮助弹窗
export default defineComponent({
  props: {
    type: {
      type: String as PropType<'link' | 'img' | 'help'>,
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
    const title = computed(() => {
      switch (props.type) {
        case 'link': {
          return '添加链接';
          break;
        }
        case 'img': {
          return '添加图片';
          break;
        }
        default: {
          return '使用帮助';
        }
      }
    });

    // 链接
    const linkData = reactive({
      desc: '',
      url: ''
    });

    return () => (
      <Modal title={title.value} visible={props.visible} onClosed={props.onCancel}>
        {props.type === 'help' ? (
          <div>帮助</div>
        ) : (
          <>
            <div class={`${prefix}-form-item`}>
              <label class={`${prefix}-lable`} for="link-desc">
                链接描述：
              </label>
              <input
                class={`${prefix}-input`}
                id="link-desc"
                type="text"
                value={linkData.desc}
                onChange={(e) => {
                  linkData.desc = (e.target as HTMLInputElement).value;
                }}
              />
            </div>
            <div class={`${prefix}-form-item`}>
              <label class={`${prefix}-lable`} for="link-url">
                链接地址：
              </label>
              <input
                class={`${prefix}-input`}
                id="link-url"
                type="text"
                value={linkData.url}
                onChange={(e) => {
                  linkData.url = (e.target as HTMLInputElement).value;
                }}
              />
            </div>
            <div class={`${prefix}-form-item`}>
              <button
                class={`${prefix}-btn ${prefix}-btn-row`}
                onClick={() => {
                  props.onOk(linkData);
                }}
              >
                确定
              </button>
            </div>
          </>
        )}
      </Modal>
    );
  }
});
