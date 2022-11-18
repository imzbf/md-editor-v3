import {
  defineComponent,
  PropType,
  inject,
  ref,
  reactive,
  nextTick,
  ComputedRef,
  watch,
  ExtractPropTypes
} from 'vue';
import { LooseRequired } from '@vue/shared';
import Modal from '../../components/Modal';
import { StaticTextDefaultValue } from '../../type';
import { configOption, prefix } from '../../config';
import { base642File } from '../../utils';
import bus from '../../utils/event-bus';

import './style.less';

const clipProps = () => ({
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
});

type ClipProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<ReturnType<typeof clipProps>>>>
>;

export default defineComponent({
  props: clipProps(),
  setup(props: ClipProps) {
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const editorId = inject('editorId') as string;
    // 传递下来的图片裁剪构造函数
    let Cropper = configOption?.editorExtensions?.cropper?.instance;

    const uploadRef = ref();
    const uploadImgRef = ref();

    // 预览框
    const previewTargetRef = ref();

    const data = reactive({
      cropperInited: false,
      imgSelected: false,
      imgSrc: '',
      // 是否全屏
      isFullscreen: false
    });

    let cropper: any = null;

    watch(
      () => props.visible,
      () => {
        // 显示时构建实例及监听事件
        if (props.visible && !data.cropperInited) {
          Cropper = Cropper || window.Cropper;

          // 直接定义onchange，防止创建新的实例时遗留事件
          (uploadRef.value as HTMLInputElement).onchange = () => {
            if (!Cropper) {
              bus.emit(editorId, 'errorCatcher', {
                name: 'Cropper',
                message: 'Cropper is undefined'
              });
              return;
            }

            const fileList = (uploadRef.value as HTMLInputElement).files || [];

            // 切换模式
            data.imgSelected = true;

            if (fileList?.length > 0) {
              const fileReader = new FileReader();

              fileReader.onload = (e: any) => {
                data.imgSrc = e.target.result;

                nextTick(() => {
                  cropper = new Cropper(uploadImgRef.value, {
                    viewMode: 2,
                    preview: `.${prefix}-clip-preview-target`
                    // aspectRatio: 16 / 9,
                  });
                });
              };

              fileReader.readAsDataURL(fileList[0]);
            }
          };
        }
      }
    );

    // 图片选择变化时，清除cropper残留样式
    watch(
      () => [data.imgSelected],
      () => {
        previewTargetRef.value.style = '';
      }
    );

    // 全屏变化时，清理cropper
    watch(
      () => data.isFullscreen,
      () => {
        nextTick(() => {
          cropper?.destroy();
          previewTargetRef.value.style = '';

          if (uploadImgRef.value) {
            cropper = new Cropper(uploadImgRef.value, {
              viewMode: 2,
              preview: `.${prefix}-clip-preview-target`
              // aspectRatio: 16 / 9,
            });
          }
        });
      }
    );

    const reset = () => {
      cropper.clear();
      cropper.destroy();
      cropper = null;
      (uploadRef.value as HTMLInputElement).value = '';
      data.imgSelected = false;
    };

    return () => (
      <Modal
        class={`${prefix}-modal-clip`}
        title={ult.value.clipModalTips?.title}
        visible={props.visible}
        onClose={props.onCancel}
        showAdjust
        isFullscreen={data.isFullscreen}
        onAdjust={(val) => {
          data.isFullscreen = val;
        }}
        width="668px"
        height="421px"
      >
        <div class={`${prefix}-form-item ${prefix}-clip`}>
          <div class={`${prefix}-clip-main`}>
            {data.imgSelected ? (
              <div class={`${prefix}-clip-cropper`}>
                <img src={data.imgSrc} ref={uploadImgRef} style={{ display: 'none' }} />
                <div class={`${prefix}-clip-delete`} onClick={reset}>
                  <svg class={`${prefix}-icon`} aria-hidden="true">
                    <use xlinkHref="#md-editor-icon-delete" />
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
                  <use xlinkHref="#md-editor-icon-upload" />
                </svg>
              </div>
            )}
          </div>
          <div class={`${prefix}-clip-preview`}>
            <div class={`${prefix}-clip-preview-target`} ref={previewTargetRef}></div>
          </div>
        </div>
        <div class={`${prefix}-form-item`}>
          <button
            class={`${prefix}-btn`}
            type="button"
            onClick={() => {
              if (cropper) {
                const cvs = cropper.getCroppedCanvas();
                bus.emit(
                  editorId,
                  'uploadImage',
                  [base642File(cvs.toDataURL('image/png'))],
                  props.onOk
                );

                reset();
              }
            }}
          >
            {ult.value.clipModalTips?.buttonUpload || ult.value.linkModalTips?.buttonOK}
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
