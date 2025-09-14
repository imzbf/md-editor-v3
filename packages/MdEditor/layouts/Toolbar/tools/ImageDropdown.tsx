import { ComputedRef, defineComponent, inject, onMounted, ref } from 'vue';
import Dropdown from '~/components/Dropdown';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { REPLACE, UPLOAD_IMAGE } from '~/static/event-name';
import { StaticTextDefaultValue } from '~/type';
import { ToolDirective } from '~/utils/content-help';
import bus from '~/utils/event-bus';
import Modals from '../../Modals';

const ToolbarImageDropdown = defineComponent({
  name: 'ToolbarImageDropdown',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const disabled = inject<ComputedRef<boolean>>('disabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');
    const wrapperId = `${editorId}-toolbar-wrapper`;
    const visible = ref(false);
    const clipVisible = ref(false);

    // 上传控件
    const uploadRef = ref();

    const uploadHandler = () => {
      bus.emit(
        editorId,
        UPLOAD_IMAGE,
        Array.from((uploadRef.value as HTMLInputElement).files || [])
      );
      // 清空内容，否则无法再次选取同一张图片
      (uploadRef.value as HTMLInputElement).value = '';
    };

    const emitHandler = (direct: ToolDirective, params?: unknown) => {
      if (disabled?.value) return;

      bus.emit(editorId, REPLACE, direct, params);
    };

    onMounted(() => {
      (uploadRef.value as HTMLInputElement).addEventListener('change', uploadHandler);
    });

    return () => (
      <>
        <label
          for={`${wrapperId}_label`}
          style={{ display: 'none' }}
          aria-label={ult.value.imgTitleItem?.upload}
        ></label>
        <input
          id={`${wrapperId}_label`}
          ref={uploadRef}
          accept="image/*"
          type="file"
          multiple={true}
          style={{ display: 'none' }}
        />
        <Dropdown
          relative={`#${wrapperId}`}
          visible={visible.value}
          onChange={(v) => {
            visible.value = v;
          }}
          disabled={disabled?.value}
          overlay={
            <ul
              class={`${prefix}-menu`}
              onClick={() => {
                visible.value = false;
              }}
              role="menu"
            >
              <li
                class={`${prefix}-menu-item ${prefix}-menu-item-image`}
                onClick={() => {
                  emitHandler('image');
                }}
                role="menuitem"
                tabindex="0"
              >
                {ult.value.imgTitleItem?.link}
              </li>
              <li
                class={`${prefix}-menu-item ${prefix}-menu-item-image`}
                onClick={() => {
                  (uploadRef.value as HTMLInputElement).click();
                }}
                role="menuitem"
                tabindex="0"
              >
                {ult.value.imgTitleItem?.upload}
              </li>
              <li
                class={`${prefix}-menu-item ${prefix}-menu-item-image`}
                onClick={() => {
                  clipVisible.value = true;
                }}
                role="menuitem"
                tabindex="0"
              >
                {ult.value.imgTitleItem?.clip2upload}
              </li>
            </ul>
          }
        >
          <button
            class={[`${prefix}-toolbar-item`, disabled?.value && `${prefix}-disabled`]}
            title={ult.value.toolbarTips?.image}
            disabled={disabled?.value}
            type="button"
          >
            <Icon name="image" />
            {showToolbarName?.value && (
              <div class={`${prefix}-toolbar-item-name`}>
                {ult.value.toolbarTips?.image}
              </div>
            )}
          </button>
        </Dropdown>
        <Modals
          clipVisible={clipVisible.value}
          onCancel={() => {
            clipVisible.value = false;
          }}
          onOk={(data) => {
            if (data) {
              emitHandler('image', {
                desc: data.desc,
                url: data.url,
                transform: true
              });
            }
            clipVisible.value = false;
          }}
        />
      </>
    );
  }
});

export default ToolbarImageDropdown;
