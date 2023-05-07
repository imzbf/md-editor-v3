import { defineComponent, inject, ComputedRef, PropType, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import Checkbox from '~/components/Checkbox';

const props = {
  scrollAuto: {
    type: Boolean as PropType<boolean>
  },
  onScrollAutoChange: {
    type: Function as PropType<(v: boolean) => void>,
    default: () => {}
  }
};

type ScrollAutoProps = Readonly<LooseRequired<Readonly<ExtractPropTypes<typeof props>>>>;

export default defineComponent({
  props,
  setup(props: ScrollAutoProps) {
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;

    return () => (
      <div class={`${prefix}-footer-item`}>
        <label
          class={`${prefix}-footer-label`}
          onClick={() => {
            props.onScrollAutoChange(!props.scrollAuto);
          }}
        >
          {ult.value.footer?.scrollAuto}
        </label>
        <Checkbox checked={props.scrollAuto} onChange={props.onScrollAutoChange} />
      </div>
    );
  }
});
