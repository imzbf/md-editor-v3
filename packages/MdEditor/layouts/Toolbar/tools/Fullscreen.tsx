import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { useSreenfull } from '../composition';
import { toolbarProps as props } from '../props';

const ToolbarFullscreen = defineComponent({
  name: 'ToolbarFullscreen',
  props,
  setup(props) {
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const disabled = inject<ComputedRef<boolean>>('disabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    // 全屏功能
    const { fullscreenHandler } = useSreenfull(props);

    return () => (
      <button
        class={[
          `${prefix}-toolbar-item`,
          props.setting.fullscreen && `${prefix}-toolbar-active`,
          disabled?.value && `${prefix}-disabled`
        ]}
        title={ult.value.toolbarTips?.fullscreen}
        disabled={disabled?.value}
        onClick={() => {
          fullscreenHandler();
        }}
      >
        <Icon name={props.setting.fullscreen ? 'fullscreen-exit' : 'fullscreen'} />

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
