import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { SettingType, StaticTextDefaultValue, UpdateSetting } from '~/type';

const ToolbarPreviewOnly = defineComponent({
  name: 'ToolbarPreviewOnly',

  setup() {
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const disabled = inject<ComputedRef<boolean>>('disabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');
    const setting = inject('setting') as ComputedRef<SettingType>;
    const updateSetting = inject('updateSetting') as UpdateSetting;

    return () => (
      <button
        class={[
          `${prefix}-toolbar-item`,
          setting.value.previewOnly && `${prefix}-toolbar-active`,
          disabled?.value && `${prefix}-disabled`
        ]}
        title={ult.value.toolbarTips?.previewOnly}
        disabled={disabled?.value}
        onClick={() => {
          updateSetting('previewOnly');
        }}
      >
        <Icon name="preview-only" />

        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>
            {ult.value.toolbarTips?.previewOnly}
          </div>
        )}
      </button>
    );
  }
});

export default ToolbarPreviewOnly;
