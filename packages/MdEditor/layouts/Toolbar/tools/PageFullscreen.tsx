import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { SettingType, StaticTextDefaultValue, UpdateSetting } from '~/type';

const ToolbarPageFullscreen = defineComponent({
  name: 'ToolbarPageFullscreen',

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
          setting.value.pageFullscreen && `${prefix}-toolbar-active`,
          disabled?.value && `${prefix}-disabled`
        ]}
        title={ult.value.toolbarTips?.pageFullscreen}
        aria-label={ult.value.toolbarTips?.pageFullscreen}
        disabled={disabled?.value}
        onClick={() => {
          updateSetting('pageFullscreen');
        }}
        type="button"
      >
        <Icon name={setting.value.pageFullscreen ? 'minimize' : 'maximize'} />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>
            {ult.value.toolbarTips?.pageFullscreen}
          </div>
        )}
      </button>
    );
  }
});

export default ToolbarPageFullscreen;
