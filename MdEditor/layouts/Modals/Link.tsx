import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  PropType,
  reactive,
  watch,
  ExtractPropTypes
} from 'vue';
import { LooseRequired } from '@vue/shared';
import Modal from '../../components/Modal';

import { StaticTextDefaultValue } from '../../type';
import { prefix } from '../../config';

const linkProps = () => ({
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
    default: () => {}
  },
  onOk: {
    type: Function as PropType<(data?: any) => void>,
    default: () => {}
  }
});

type LinkProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<ReturnType<typeof linkProps>>>>
>;

export default defineComponent({
  props: linkProps(),
  setup(props: LinkProps) {
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const editorId = inject('editorId') as string;

    const title = computed(() => {
      switch (props.type) {
        case 'link': {
          return ult.value.linkModalTips?.linkTitle;
        }
        case 'image': {
          return ult.value.linkModalTips?.imageTitle;
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
      <Modal title={title.value} visible={props.visible} onClose={props.onCancel}>
        <div class={`${prefix}-form-item`}>
          <label class={`${prefix}-label`} for={`link-desc-${editorId}`}>
            {ult.value.linkModalTips?.descLabel}
          </label>
          <input
            placeholder={ult.value.linkModalTips?.descLabelPlaceHolder}
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
          <label class={`${prefix}-label`} for={`link-url-${editorId}`}>
            {ult.value.linkModalTips?.urlLabel}
          </label>
          <input
            placeholder={ult.value.linkModalTips?.urlLabelPlaceHolder}
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
