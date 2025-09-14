import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { SettingType, StaticTextDefaultValue, UpdateSetting } from '~/type';

const ToolbarHtmlPreview = defineComponent({
  name: 'ToolbarHtmlPreview',
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
          setting.value.htmlPreview && `${prefix}-toolbar-active`,
          disabled?.value && `${prefix}-disabled`
        ]}
        title={ult.value.toolbarTips?.htmlPreview}
        disabled={disabled?.value}
        onClick={() => {
          updateSetting('htmlPreview');
        }}
        type="button"
      >
        <Icon name="preview-html" />

        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>
            {ult.value.toolbarTips?.htmlPreview}
          </div>
        )}
      </button>
    );
  }
});

export default ToolbarHtmlPreview;
