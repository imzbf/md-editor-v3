import { ComputedRef, defineComponent, inject, ref } from 'vue';
import Dropdown from '~/components/Dropdown';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { REPLACE } from '~/static/event-name';
import { StaticTextDefaultValue } from '~/type';
import { ToolDirective } from '~/utils/content-help';
import bus from '~/utils/event-bus';

const ToolbarKatex = defineComponent({
  name: 'ToolbarKatex',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const disabled = inject<ComputedRef<boolean>>('disabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');
    const wrapperId = `${editorId}-toolbar-wrapper`;
    const visible = ref(false);

    const emitHandler = (direct: ToolDirective) => {
      if (disabled?.value) return;

      bus.emit(editorId, REPLACE, direct);
    };

    return () => (
      <Dropdown
        relative={`#${wrapperId}`}
        visible={visible.value}
        onChange={(v) => {
          visible.value = v;
        }}
        disabled={disabled?.value}
        overlay={
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
        }
        key="bar-katex"
      >
        <button
          class={[`${prefix}-toolbar-item`, disabled?.value && `${prefix}-disabled`]}
          title={ult.value.toolbarTips?.katex}
          disabled={disabled?.value}
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
