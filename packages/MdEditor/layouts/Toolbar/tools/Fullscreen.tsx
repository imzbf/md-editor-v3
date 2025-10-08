import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { SettingType, StaticTextDefaultValue } from '~/type';
import { useSreenfull } from '../composition';

const ToolbarFullscreen = defineComponent({
  name: 'ToolbarFullscreen',
  setup() {
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const disabled = inject<ComputedRef<boolean>>('disabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');
    const setting = inject('setting') as ComputedRef<SettingType>;

    // 全屏功能
    const { fullscreenHandler } = useSreenfull();

    return () => (
      <button
        class={[
          `${prefix}-toolbar-item`,
          setting.value.fullscreen && `${prefix}-toolbar-active`,
          disabled?.value && `${prefix}-disabled`
        ]}
        title={ult.value.toolbarTips?.fullscreen}
        disabled={disabled?.value}
        onClick={() => {
          fullscreenHandler();
        }}
        type="button"
      >
        <Icon name={setting.value.fullscreen ? 'fullscreen-exit' : 'fullscreen'} />

        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>
            {ult.value.toolbarTips?.fullscreen}
          </div>
        )}
      </button>
    );
  }
});

export default ToolbarFullscreen;
