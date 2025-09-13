import { linkTo } from '@vavt/util';
import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';

const ToolbarGithub = defineComponent({
  name: 'ToolbarGithub',
  setup() {
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const disabled = inject<ComputedRef<boolean>>('disabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, disabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.github}
        disabled={disabled?.value}
        onClick={() => {
          linkTo('https://github.com/imzbf/md-editor-v3');
        }}
      >
        <Icon name="github" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>{ult.value.toolbarTips?.github}</div>
        )}
      </button>
    );
  }
});

export default ToolbarGithub;
