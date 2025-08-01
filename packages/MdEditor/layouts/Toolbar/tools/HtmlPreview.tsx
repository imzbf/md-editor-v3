import { ComputedRef, defineComponent, inject, PropType } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { SettingType, StaticTextDefaultValue, UpdateSetting } from '~/type';

const ToolbarHtmlPreview = defineComponent({
  name: 'ToolbarHtmlPreview',
  props: {
    setting: {
      type: Object as PropType<SettingType>,
      default: () => ({})
    },
    updateSetting: {
      type: Function as PropType<UpdateSetting>,
      default: () => {}
    }
  },
  setup(props) {
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const disabled = inject<ComputedRef<boolean>>('disabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[
          `${prefix}-toolbar-item`,
          props.setting.htmlPreview && `${prefix}-toolbar-active`,
          disabled?.value && `${prefix}-disabled`
        ]}
        title={ult.value.toolbarTips?.htmlPreview}
        disabled={disabled?.value}
        onClick={() => {
          props.updateSetting('htmlPreview');
        }}
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
