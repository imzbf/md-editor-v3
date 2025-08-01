import { ComputedRef, defineComponent, inject, ref } from 'vue';
import Dropdown from '~/components/Dropdown';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { REPLACE } from '~/static/event-name';
import { StaticTextDefaultValue } from '~/type';
import { ToolDirective } from '~/utils/content-help';
import bus from '~/utils/event-bus';

const ToolbarMermaid = defineComponent({
  name: 'ToolbarMermaid',
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
              class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
              onClick={() => {
                emitHandler('flow');
              }}
              role="menuitem"
              tabindex="0"
            >
              {ult.value.mermaid?.flow}
            </li>
            <li
              class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
              onClick={() => {
                emitHandler('sequence');
              }}
              role="menuitem"
              tabindex="0"
            >
              {ult.value.mermaid?.sequence}
            </li>
            <li
              class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
              onClick={() => {
                emitHandler('gantt');
              }}
              role="menuitem"
              tabindex="0"
            >
              {ult.value.mermaid?.gantt}
            </li>
            <li
              class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
              onClick={() => {
                emitHandler('class');
              }}
              role="menuitem"
              tabindex="0"
            >
              {ult.value.mermaid?.class}
            </li>
            <li
              class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
              onClick={() => {
                emitHandler('state');
              }}
              role="menuitem"
              tabindex="0"
            >
              {ult.value.mermaid?.state}
            </li>
            <li
              class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
              onClick={() => {
                emitHandler('pie');
              }}
              role="menuitem"
              tabindex="0"
            >
              {ult.value.mermaid?.pie}
            </li>
            <li
              class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
              onClick={() => {
                emitHandler('relationship');
              }}
              role="menuitem"
              tabindex="0"
            >
              {ult.value.mermaid?.relationship}
            </li>
            <li
              class={`${prefix}-menu-item ${prefix}-menu-item-mermaid`}
              onClick={() => {
                emitHandler('journey');
              }}
              role="menuitem"
              tabindex="0"
            >
              {ult.value.mermaid?.journey}
            </li>
          </ul>
        }
        key="bar-mermaid"
      >
        <button
          class={[`${prefix}-toolbar-item`, disabled?.value && `${prefix}-disabled`]}
          title={ult.value.toolbarTips?.mermaid}
          disabled={disabled?.value}
        >
          <Icon name="mermaid" />
          {showToolbarName?.value && (
            <div class={`${prefix}-toolbar-item-name`}>
              {ult.value.toolbarTips?.mermaid}
            </div>
          )}
        </button>
      </Dropdown>
    );
  }
});

export default ToolbarMermaid;
