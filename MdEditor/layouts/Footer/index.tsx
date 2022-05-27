import { defineComponent, PropType, computed, ref } from 'vue';
import { prefix } from '../../config';
import Checkbox from '../../components/Checkbox';

export default defineComponent({
  name: 'MDEditorFooter',
  props: {
    modelValue: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props) {
    const scrollEnabled = ref(false);

    const state = computed(() => {
      return {
        length: props.modelValue.length,
        rows: props.modelValue.split('\n').length
      };
    });
    return () => {
      return (
        <div class={`${prefix}-footer`}>
          <div class={`${prefix}-footer-left`}>
            <div class={`${prefix}-footer-item`}>
              <label>字符数：</label>
              <span>{state.value.length}</span>
            </div>
            <div class={`${prefix}-footer-item`}>
              <label>行数：</label>
              <span>{state.value.rows}</span>
            </div>
          </div>
          <div class={`${prefix}-footer-right`}>
            <div class={`${prefix}-footer-item`}>
              <label class={`${prefix}-footer-label`} for="">
                同步滚动
              </label>
              <Checkbox
                id={`${prefix}-scroll-ctl`}
                checked={scrollEnabled.value}
                onChange={(checked) => (scrollEnabled.value = checked)}
              />
            </div>
          </div>
        </div>
      );
    };
  }
});
