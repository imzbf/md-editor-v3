import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { SettingType, StaticTextDefaultValue, UpdateSetting } from '~/type';

const ToolbarPreview = defineComponent({
  name: 'ToolbarPreview',
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
          setting.value.preview && `${prefix}-toolbar-active`,
          disabled?.value && `${prefix}-disabled`
        ]}
        title={ult.value.toolbarTips?.preview}
        disabled={disabled?.value}
        onClick={() => {
          updateSetting('preview');
        }}
        type="button"
      >
        <Icon name="preview" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>
            {ult.value.toolbarTips?.preview}
          </div>
        )}
      </button>
    );
  }
});

export default ToolbarPreview;
