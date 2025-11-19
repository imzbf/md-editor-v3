import { ComputedRef, computed, defineComponent, inject, ref } from 'vue';
import Dropdown from '~/components/Dropdown';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { REPLACE } from '~/static/event-name';
import { StaticTextDefaultValue } from '~/type';
import { ToolDirective } from '~/utils/content-help';
import bus from '~/utils/event-bus';

const ToolbarTitle = defineComponent({
  name: 'ToolbarTitle',
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
          class={`${prefix}-menu-item ${prefix}-menu-item-title`}
          onClick={() => {
            emitHandler('h1');
          }}
          role="menuitem"
          tabindex="0"
        >
          {ult.value.titleItem?.h1}
        </li>
        <li
          class={`${prefix}-menu-item ${prefix}-menu-item-title`}
          onClick={() => {
            emitHandler('h2');
          }}
          role="menuitem"
          tabindex="0"
        >
          {ult.value.titleItem?.h2}
        </li>
        <li
          class={`${prefix}-menu-item ${prefix}-menu-item-title`}
          onClick={() => {
            emitHandler('h3');
          }}
          role="menuitem"
          tabindex="0"
        >
          {ult.value.titleItem?.h3}
        </li>
        <li
          class={`${prefix}-menu-item ${prefix}-menu-item-title`}
          onClick={() => {
            emitHandler('h4');
          }}
          role="menuitem"
          tabindex="0"
        >
          {ult.value.titleItem?.h4}
        </li>
        <li
          class={`${prefix}-menu-item ${prefix}-menu-item-title`}
          onClick={() => {
            emitHandler('h5');
          }}
          role="menuitem"
          tabindex="0"
        >
          {ult.value.titleItem?.h5}
        </li>
        <li
          class={`${prefix}-menu-item ${prefix}-menu-item-title`}
          onClick={() => {
            emitHandler('h6');
          }}
          role="menuitem"
          tabindex="0"
        >
          {ult.value.titleItem?.h6}
        </li>
      </ul>
    ));

    return () => (
      <Dropdown
        relative={`#${wrapperId}`}
        visible={visible.value}
        onChange={handleDropdownChange}
        disabled={disabled?.value}
        overlay={overlayContent.value}
      >
        <button
          class={[`${prefix}-toolbar-item`, disabled?.value && `${prefix}-disabled`]}
          disabled={disabled?.value}
          title={ult.value.toolbarTips?.title}
          type="button"
        >
          <Icon name="title" />

          {showToolbarName?.value && (
            <div class={`${prefix}-toolbar-item-name`}>
              {ult.value.toolbarTips?.title}
            </div>
          )}
        </button>
      </Dropdown>
    );
  }
});

export default ToolbarTitle;
