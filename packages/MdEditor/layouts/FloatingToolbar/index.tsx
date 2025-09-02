import { ComputedRef, defineComponent, inject } from 'vue';
import { prefix } from '~/config';
import { ToolbarNames } from '~/type';
import { useBarRender } from '../Toolbar/composition';

export default defineComponent({
  name: 'FloatingToolbar',
  setup() {
    const floatingToolbars = inject('floatingToolbars') as ComputedRef<
      Array<ToolbarNames>
    >;

    const { barRender } = useBarRender();

    return () => (
      <div class={`${prefix}-floating-toolbar`}>
        {floatingToolbars.value.map((barItem) => {
          return barRender(barItem);
        })}
      </div>
    );
  }
});
