import { defineComponent, PropType, computed, VNode, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import { allFooter, prefix } from '../../config';
import { Footers } from '../../type';
import MarkdownTotal from './MarkdownTotal';
import ScrollAuto from './ScrollAuto';

const footerProps = () => ({
  modelValue: {
    type: String as PropType<string>,
    default: ''
  },
  footers: {
    type: Array as PropType<Array<Footers>>,
    default: []
  },
  scrollAuto: {
    type: Boolean as PropType<boolean>
  },
  onScrollAutoChange: {
    type: Function as PropType<(v: boolean) => void>,
    default: () => {}
  },
  defFooters: {
    type: Object as PropType<VNode>
  }
});

type FooterProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<ReturnType<typeof footerProps>>>>
>;

export default defineComponent({
  name: 'MDEditorFooter',
  props: footerProps(),
  setup(props: FooterProps) {
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
          case 'markdownTotal': {
            return <MarkdownTotal modelValue={props.modelValue} />;
          }
          case 'scrollSwitch': {
            return (
              <ScrollAuto
                scrollAuto={props.scrollAuto}
                onScrollAutoChange={props.onScrollAutoChange}
              />
            );
          }
        }
      } else if (props.defFooters instanceof Array) {
        return props.defFooters[name as number] || '';
      } else if (props.defFooters && props.defFooters.children instanceof Array) {
        // jsx语法，<></>包裹下，defToolbars是包裹插槽内容的对象
        return props.defFooters.children[name as number] || '';
      } else {
        return '';
      }
    };

    return () => {
      const LeftFooter = splitedItems.value[0].map((name) => footerRender(name));
      const RightFooter = splitedItems.value[1].map((name) => footerRender(name));

      return (
        <div class={`${prefix}-footer`}>
          <div class={`${prefix}-footer-left`}>{LeftFooter}</div>
          <div class={`${prefix}-footer-right`}>{RightFooter}</div>
        </div>
      );
    };
  }
});
