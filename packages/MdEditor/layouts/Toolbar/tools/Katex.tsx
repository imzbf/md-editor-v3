import { ComputedRef, computed, defineComponent, inject, ref } from 'vue';
import Dropdown from '~/components/Dropdown';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { ToolDirective } from '~/utils/content-help';
import { emitReplace } from '~/utils/replace';

const ToolbarKatex = defineComponent({
  name: 'ToolbarKatex',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');
    const wrapperId = `${editorId}-toolbar-wrapper`;
    const visible = ref(false);

    const emitHandler = (direct: ToolDirective) => {
      if (contentDisabled?.value) return;

      emitReplace(editorId, { direct });
    };

    const handleDropdownChange = (v: boolean) => {
      visible.value = v;
    };

    const overlayContent = computed(() => (
      <ul
        class={`${prefix}-menu`}
        onClick={() => {
          visible.value = false;
        }}
        role="menu"
      >
        <li
          class={`${prefix}-menu-item ${prefix}-menu-item-katex`}
          onClick={() => {
            emitHandler('katexInline');
          }}
          role="menuitem"
          tabindex="0"
        >
          {ult.value.katex?.inline}
        </li>
        <li
          class={`${prefix}-menu-item ${prefix}-menu-item-katex`}
          onClick={() => {
            emitHandler('katexBlock');
          }}
          role="menuitem"
          tabindex="0"
        >
          {ult.value.katex?.block}
        </li>
      </ul>
    ));

    return () => (
      <Dropdown
        relative={`#${wrapperId}`}
        visible={visible.value}
        onChange={handleDropdownChange}
        disabled={contentDisabled?.value}
        overlay={overlayContent.value}
        key="bar-katex"
      >
        <button
          class={[
            `${prefix}-toolbar-item`,
            contentDisabled?.value && `${prefix}-disabled`
          ]}
          title={ult.value.toolbarTips?.katex}
          aria-label={ult.value.toolbarTips?.katex}
          disabled={contentDisabled?.value}
          type="button"
        >
          <Icon name="formula" />
          {showToolbarName?.value && (
            <div class={`${prefix}-toolbar-item-name`}>
              {ult.value.toolbarTips?.katex}
            </div>
          )}
        </button>
      </Dropdown>
    );
  }
});

export default ToolbarKatex;
