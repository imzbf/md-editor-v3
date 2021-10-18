import {
  computed,
  ComputedRef,
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

    onClip: {
      type: Function as PropType<() => void>,
      default: () => () => {}
    }
  },
  setup(props) {
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const editorId = inject('editorId') as string;

    const title = computed(() => {
      switch (props.type) {
        case 'link': {
          return `${ult.value.linkModalTips?.title}${ult.value.toolbarTips?.link}`;
        }
        case 'image': {
          return `${ult.value.linkModalTips?.title}${ult.value.toolbarTips?.image}`;
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
      bus.emit(
        editorId,
        'uploadImage',
        (uploadRef.value as HTMLInputElement).files,
        props.onOk
      );
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

    // 关闭时清空内容
    watch(
      () => props.visible,
      (nVal) => {
        if (!nVal) {
          setTimeout(() => {
            linkData.desc = '';
            linkData.url = '';
          }, 200);
        }
      }
    );

    return () => (
      <Modal title={title.value} visible={props.visible} onClosed={props.onCancel}>
        <div class={`${prefix}-form-item`}>
          <label class={`${prefix}-lable`} for={`link-desc-${editorId}`}>
            {ult.value.linkModalTips?.descLable}
          </label>
          <input
            placeholder={ult.value.linkModalTips?.descLablePlaceHolder}
            class={`${prefix}-input`}
            id={`link-desc-${editorId}`}
            type="text"
            value={linkData.desc}
            onChange={(e) => {
              linkData.desc = (e.target as HTMLInputElement).value;
            }}
            autocomplete="off"
          />
        </div>
        <div class={`${prefix}-form-item`}>
          <label class={`${prefix}-lable`} for={`link-url-${editorId}`}>
            {ult.value.linkModalTips?.urlLable}
          </label>
          <input
            placeholder={ult.value.linkModalTips?.UrlLablePlaceHolder}
            class={`${prefix}-input`}
            id={`link-url-${editorId}`}
            type="text"
            value={linkData.url}
            onChange={(e) => {
              linkData.url = (e.target as HTMLInputElement).value;
            }}
            autocomplete="off"
          />
        </div>
        <div class={`${prefix}-form-item`}>
          <button
            class={`${prefix}-btn ${props.type === 'link' && prefix + '-btn-row'}`}
            type="button"
            onClick={() => {
              props.onOk(linkData);
              linkData.desc = '';
              linkData.url = '';
            }}
          >
            {ult.value.linkModalTips?.buttonOK}
          </button>
          {props.type === 'image' && (
            <>
              <button
                class={`${prefix}-btn`}
                type="button"
                onClick={() => {
                  nextTick(() => {
                    (uploadRef.value as HTMLInputElement).click();
                  });
                }}
              >
                {ult.value.linkModalTips?.buttonUpload}
              </button>
              <button class={`${prefix}-btn`} type="button" onClick={props.onClip}>
                {ult.value.linkModalTips?.buttonUploadClip}
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
