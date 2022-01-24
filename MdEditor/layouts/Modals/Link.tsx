import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  PropType,
  reactive,
  watch
} from 'vue';
import Modal from '../../components/Modal';

import { StaticTextDefaultValue } from '../../type';
import { prefix } from '../../config';

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
            class={[`${prefix}-btn`, `${prefix}-btn-row`]}
            type="button"
            onClick={() => {
              props.onOk(linkData);
              linkData.desc = '';
              linkData.url = '';
            }}
          >
            {ult.value.linkModalTips?.buttonOK}
          </button>
        </div>
      </Modal>
    );
  }
});
