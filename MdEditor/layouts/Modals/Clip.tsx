import {
  defineComponent,
  PropType,
  inject,
  ref,
  reactive,
  nextTick,
  ComputedRef,
  watch,
  computed
} from 'vue';
import Modal from '../../components/Modal';
import { StaticTextDefaultValue } from '../../type';
import { prefix } from '../../config';
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
    }
  },
  setup(props) {
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const editorId = inject('editorId') as string;
    // 传递下来的图片裁剪构造函数
    let Cropper = inject('Cropper') as any;

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

    // 弹出层宽度
    const modalSize = computed(() => {
      return data.isFullscreen
        ? {
            width: '100%',
            height: '100%'
          }
        : {
            width: '668px',
            height: '421px'
          };
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
        showAdjust
        isFullscreen={data.isFullscreen}
        onAdjust={(val) => {
          data.isFullscreen = val;
        }}
        {...modalSize.value}
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
            <div class={`${prefix}-clip-preview-target`} ref={previewTargetRef}></div>
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
