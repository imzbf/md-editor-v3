import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarLink = defineComponent({
  name: 'ToolbarLink',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, contentDisabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.link}
        aria-label={ult.value.toolbarTips?.link}
        disabled={contentDisabled?.value}
        onClick={() => {
          emitReplace(editorId, { direct: 'link' });
        }}
        type="button"
      >
        <Icon name="link" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>{ult.value.toolbarTips?.link}</div>
        )}
      </button>
    );
  }
});

export default ToolbarLink;
