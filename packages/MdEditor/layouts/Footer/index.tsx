import {
  defineComponent,
  PropType,
  computed,
  VNode,
  ExtractPropTypes,
  cloneVNode,
  inject,
  ComputedRef
} from 'vue';
import { LooseRequired } from '@vue/shared';
import { allFooter, prefix } from '~/config';
import { Footers, Themes } from '~/type';
import MarkdownTotal from './MarkdownTotal';
import ScrollAuto from './ScrollAuto';

const props = {
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
  noScrollAuto: {
    type: Boolean as PropType<boolean>
  },
  onScrollAutoChange: {
    type: Function as PropType<(v: boolean) => void>,
    default: () => {}
  },
  defFooters: {
    type: Object as PropType<VNode>
  }
};

type FooterProps = Readonly<LooseRequired<Readonly<ExtractPropTypes<typeof props>>>>;

export default defineComponent({
  name: 'MDEditorFooter',
  props,
  setup(props: FooterProps) {
    // 主题
    const theme = inject('theme') as ComputedRef<Themes>;
    //语言
    const language = inject('language') as ComputedRef<string>;
    const disabled = inject<ComputedRef<boolean>>('disabled');

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
              !props.noScrollAuto && (
                <ScrollAuto
                  scrollAuto={props.scrollAuto}
                  onScrollAutoChange={props.onScrollAutoChange}
                />
              )
            );
          }
        }
      } else if (props.defFooters instanceof Array) {
        const defItem = props.defFooters[name as number];

        if (defItem) {
          const defItemCloned = cloneVNode(defItem, {
            theme: defItem.props?.theme || theme.value,
            language: defItem.props?.language || language.value,
            disabled: defItem.props?.disabled || disabled?.value
          });

          return defItemCloned;
        }

        return '';
      } else if (props.defFooters && props.defFooters.children instanceof Array) {
        // jsx语法，<></>包裹下，defToolbars是包裹插槽内容的对象
        const defItem = props.defFooters.children[name as number] as VNode;

        if (defItem) {
          const defItemCloned = cloneVNode(defItem, {
            theme: defItem.props?.theme || theme.value,
            language: defItem.props?.language || language.value,
            disabled: defItem.props?.disabled || disabled?.value
          });
          return defItemCloned;
        }

        return '';
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
