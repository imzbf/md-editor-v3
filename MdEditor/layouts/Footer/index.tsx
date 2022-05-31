import { defineComponent, PropType, computed, ref } from 'vue';
import { allFooter, prefix } from '../../config';
import Checkbox from '../../components/Checkbox';
import { Footers } from '../../type';

export default defineComponent({
  name: 'MDEditorFooter',
  props: {
    modelValue: {
      type: String as PropType<string>,
      default: ''
    },
    footers: {
      type: Array as PropType<Array<Footers>>,
      default: allFooter
    },
    scrollAuto: {
      type: Boolean as PropType<boolean>
    },
    onScrollAutoChange: {
      type: Function as PropType<(v: boolean) => void>,
      default: () => () => {}
    }
  },
  setup(props) {
    const state = computed(() => {
      return {
        length: props.modelValue.length
      };
    });

    const splitedItems = computed(() => {
      const moduleSplitIndex = props.footers.indexOf('=');

      // 左侧部分
      const barLeft =
        moduleSplitIndex === -1
          ? props.footers
          : props.footers.slice(0, moduleSplitIndex);

      const barRight =
        moduleSplitIndex === -1
          ? []
          : props.footers.slice(moduleSplitIndex, Number.MAX_SAFE_INTEGER);

      return [barLeft, barRight];
    });

    const footerRender = (name: Footers) => {
      if (allFooter.includes(name)) {
        switch (name) {
          case 'count': {
            return (
              <div class={`${prefix}-footer-item`}>
                <label>字符数：</label>
                <span>{state.value.length}</span>
              </div>
            );
          }
          case 'scrollSwitch': {
            return (
              <div class={`${prefix}-footer-item`}>
                <label class={`${prefix}-footer-label`} for="">
                  同步滚动
                </label>
                <Checkbox
                  id={`${prefix}-scroll-ctl`}
                  checked={props.scrollAuto}
                  onChange={props.onScrollAutoChange}
                />
              </div>
            );
          }
        }
      }
    };

    return () => {
      const LeftFooter = splitedItems.value[0].map((name) => footerRender(name));
      const RightFooter = splitedItems.value[1].map((name) => footerRender(name));

      return (
        props.footers.length > 0 && (
          <div class={`${prefix}-footer`}>
            <div class={`${prefix}-footer-left`}>{LeftFooter}</div>
            <div class={`${prefix}-footer-right`}>{RightFooter}</div>
          </div>
        )
      );
    };
  }
});
