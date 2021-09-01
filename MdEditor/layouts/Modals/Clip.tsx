import {
  defineComponent,
  PropType,
  inject,
  ref,
  onMounted,
  reactive,
  nextTick,
  ComputedRef
} from 'vue';
import Modal from '../../components/Modal';
import { StaticTextDefaultValue, prefix } from '../../Editor';
import { base642File } from '../../utils';
import bus from '../../utils/event-bus';

import './style.less';

export default defineComponent({
  props: {
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
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const editorId = inject('editorId') as string;

    const uploadRef = ref();
    const uploadImgRef = ref();

    const data = reactive({
      imgSelected: false,
      imgSrc: ''
    });

    let cropper: any = null;

    onMounted(() => {
      (uploadRef.value as HTMLInputElement).addEventListener('change', () => {
        const fileList = (uploadRef.value as HTMLInputElement).files || [];

        // 切换模式
        data.imgSelected = true;

        if (fileList?.length > 0) {
          const fileReader = new FileReader();

          fileReader.onload = (e: any) => {
            data.imgSrc = e.target.result;

            nextTick(() => {
              cropper = new window.Cropper(uploadImgRef.value, {
                viewMode: 2,
                preview: `.${prefix}-clip-preview-target`
                // aspectRatio: 16 / 9,
              });
            });
          };

          fileReader.readAsDataURL(fileList[0]);
        }
      });
    });

    const reset = () => {
      cropper.destroy();
      (uploadRef.value as HTMLInputElement).value = '';
      data.imgSelected = false;
    };

    return () => (
      <Modal
        title={ult.value.clipModalTips?.title}
        visible={props.visible}
        onClosed={props.onCancel}
        to={props.to}
      >
        <div class={`${prefix}-form-item ${prefix}-clip`}>
          <div class={`${prefix}-clip-main`}>
            {data.imgSelected ? (
              <div class={`${prefix}-clip-cropper`}>
                <img src={data.imgSrc} ref={uploadImgRef} style={{ display: 'none' }} />
                <div class={`${prefix}-clip-delete`} onClick={reset}>
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#icon-delete" />
                  </svg>
                </div>
              </div>
            ) : (
              <div
                class={`${prefix}-clip-upload`}
                onClick={() => {
                  (uploadRef.value as HTMLInputElement).click();
                }}
              >
                <svg class={`${prefix}-icon`} aria-hidden="true">
                  <use xlinkHref="#icon-upload" />
                </svg>
              </div>
            )}
          </div>
          <div class={`${prefix}-clip-preview`}>
            <div class={`${prefix}-clip-preview-target`}></div>
          </div>
        </div>
        <div class={`${prefix}-form-item`}>
          <button
            class={`${prefix}-btn`}
            type="button"
            onClick={() => {
              const cvs = cropper.getCroppedCanvas();
              bus.emit(
                editorId,
                'uploadImage',
                [base642File(cvs.toDataURL('image/png'))],
                props.onOk
              );

              reset();
            }}
          >
            {ult.value.linkModalTips?.buttonOK}
          </button>
        </div>
        <input
          ref={uploadRef}
          accept="image/*"
          type="file"
          multiple={false}
          style={{ display: 'none' }}
        />
      </Modal>
    );
  }
});
