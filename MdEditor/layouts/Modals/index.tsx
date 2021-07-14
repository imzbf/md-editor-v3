import { computed, defineComponent, nextTick, PropType, reactive, ref, watch } from 'vue';
import Modal from '../../components/Modal';
import bus from '../../utils/event-bus';

import { prefix } from '../../Editor';

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
    },
    to: {
      type: Element as PropType<HTMLElement>,
      default: () => document.body
    }
  },

  setup(props) {
    const title = computed(() => {
      switch (props.type) {
        case 'link': {
          return '添加链接';
        }
        case 'image': {
          return '添加图片';
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

    // 上传控件
    const uploadRef = ref();

    watch(
      () => props.type,
      (nValue) => {
        if (nValue === 'image') {
          nextTick(() => {
            (uploadRef.value as HTMLInputElement).addEventListener('change', () => {
              bus.emit(
                'uploadImage',
                (uploadRef.value as HTMLInputElement).files,
                props.onOk
              );
            });
          });
        }
      }
    );

    return () => (
      <Modal
        title={title.value}
        visible={props.visible}
        onClosed={props.onCancel}
        to={props.to}
      >
        {props.type === 'help' ? (
          <div>帮助</div>
        ) : (
          <>
            <div class={`${prefix}-form-item`}>
              <label class={`${prefix}-lable`} for="link-desc">
                链接描述：
              </label>
              <input
                placeholder="请输入描述..."
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
                placeholder="请输入链接..."
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
                class={`${prefix}-btn ${props.type === 'link' && prefix + '-btn-row'}`}
                onClick={() => {
                  props.onOk(linkData);
                  linkData.desc = '';
                  linkData.url = '';
                }}
              >
                确定
              </button>
              {props.type === 'image' && (
                <>
                  <button
                    class={`${prefix}-btn`}
                    onClick={() => {
                      (uploadRef.value as HTMLInputElement).click();
                    }}
                  >
                    上传
                  </button>
                  <input
                    ref={uploadRef}
                    accept="image/*"
                    type="file"
                    multiple="true"
                    style={{ display: 'none' }}
                  />
                </>
              )}
            </div>
          </>
        )}
      </Modal>
    );
  }
});
