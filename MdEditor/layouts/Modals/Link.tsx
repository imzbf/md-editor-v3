import {
  computed,
  defineComponent,
  inject,
  nextTick,
  PropType,
  reactive,
  ref,
  watch
} from 'vue';
import Modal from '../../components/Modal';
import bus from '../../utils/event-bus';

import { prefix, StaticTextDefaultValue } from '../../Editor';

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
    },
    onClip: {
      type: Function as PropType<() => void>,
      default: () => () => {}
    }
  },
  setup(props) {
    const ult = inject('usedLanguageText') as StaticTextDefaultValue;
    const editorName = inject('editorName');

    const title = computed(() => {
      switch (props.type) {
        case 'link': {
          return `${ult.linkModalTips?.title}${ult.toolbarTips?.link}`;
        }
        case 'image': {
          return `${ult.linkModalTips?.title}${ult.toolbarTips?.image}`;
        }
        default: {
          return '';
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

    const uploadHandler = () => {
      bus.emit('uploadImage', (uploadRef.value as HTMLInputElement).files, props.onOk);
      // 清空内容，否则无法再次选取同一张图片
      (uploadRef.value as HTMLInputElement).value = '';
    };

    watch(
      () => props.type,
      (nValue) => {
        if (nValue === 'image') {
          nextTick(() => {
            (uploadRef.value as HTMLInputElement).addEventListener(
              'change',
              uploadHandler
            );
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
        <div class={`${prefix}-form-item`}>
          <label class={`${prefix}-lable`} for={`link-desc-${editorName}`}>
            {ult.linkModalTips?.descLable}
          </label>
          <input
            placeholder={ult.linkModalTips?.descLablePlaceHolder}
            class={`${prefix}-input`}
            id={`link-desc-${editorName}`}
            type="text"
            value={linkData.desc}
            onChange={(e) => {
              linkData.desc = (e.target as HTMLInputElement).value;
            }}
          />
        </div>
        <div class={`${prefix}-form-item`}>
          <label class={`${prefix}-lable`} for={`link-url-${editorName}`}>
            {ult.linkModalTips?.urlLable}
          </label>
          <input
            placeholder={ult.linkModalTips?.UrlLablePlaceHolder}
            class={`${prefix}-input`}
            id={`link-url-${editorName}`}
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
            {ult.linkModalTips?.buttonOK}
          </button>
          {props.type === 'image' && (
            <>
              <button
                class={`${prefix}-btn`}
                onClick={() => {
                  nextTick(() => {
                    (uploadRef.value as HTMLInputElement).click();
                  });
                }}
              >
                {ult.linkModalTips?.buttonUpload}
              </button>
              <button class={`${prefix}-btn`} onClick={props.onClip}>
                {ult.linkModalTips?.buttonUploadClip}
              </button>
              <input
                ref={uploadRef}
                accept="image/*"
                type="file"
                multiple={true}
                style={{ display: 'none' }}
              />
            </>
          )}
        </div>
      </Modal>
    );
  }
});
