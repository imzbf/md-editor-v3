import {
  defineComponent,
  PropType,
  ExtractPropTypes,
  inject,
  Ref,
  watch,
  ref,
  nextTick
} from 'vue';
import { LooseRequired } from '@vue/shared';
import { MdHeadingId } from '~/type';
import { prefix } from '~/config';
import { TocItem } from './MdCatalog';
import { getComputedStyleNum } from '~/utils/scroll-auto';

const props = {
  tocItem: {
    type: Object as PropType<TocItem>,
    default: () => ({})
  },
  mdHeadingId: {
    type: Function as PropType<MdHeadingId>,
    default: () => {}
  },
  onActive: {
    type: Function as PropType<(tocItem: TocItem, ele: HTMLDivElement) => void>,
    default: () => {}
  },
  onClick: {
    type: Function as PropType<(e: MouseEvent, t: TocItem) => void>,
    default: () => {}
  },
  scrollElementOffsetTop: {
    type: Number as PropType<number>,
    default: 0
  }
};

export type CatalogLinkProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof props>>>
>;

const CatalogLink = defineComponent({
  props,
  setup(props: CatalogLinkProps) {
    const scrollElementRef = inject('scrollElementRef') as Ref<HTMLElement>;
    const rootNodeRef = inject('roorNodeRef') as Ref<Document | ShadowRoot>;

    const currRef = ref<HTMLDivElement>();

    watch(
      () => props.tocItem.active,
      (active) => {
        if (active) {
          if (currRef.value) {
            props.onActive(props.tocItem, currRef.value);
          } else {
            nextTick(() => {
              props.onActive(props.tocItem, currRef.value!);
            });
          }
        }
      },
      {
        immediate: true
      }
    );

    return () => {
      const { tocItem, mdHeadingId, onClick, scrollElementOffsetTop } = props;

      return (
        <div
          ref={currRef}
          class={[`${prefix}-catalog-link`, tocItem.active && `${prefix}-catalog-active`]}
          onClick={(e) => {
            onClick(e, tocItem);
            e.stopPropagation();
            const id = mdHeadingId(tocItem.text, tocItem.level, tocItem.index);
            const targetHeadEle = rootNodeRef.value.getElementById(id);
            const scrollContainer = scrollElementRef.value;

            if (targetHeadEle && scrollContainer) {
              let par = targetHeadEle.offsetParent as HTMLElement;
              let offsetTop = targetHeadEle.offsetTop;

              // 滚动容器包含父级offser标准元素
              if (scrollContainer.contains(par)) {
                while (par && scrollContainer != par) {
                  // 循环获取当前对象与相对的top高度
                  offsetTop += par?.offsetTop;
                  par = par?.offsetParent as HTMLElement;
                }
              }

              const pel = targetHeadEle.previousElementSibling;
              let currMarginTop = 0;
              if (!pel) {
                currMarginTop = getComputedStyleNum(targetHeadEle, 'margin-top');
              }

              scrollContainer?.scrollTo({
                top: offsetTop - scrollElementOffsetTop - currMarginTop,
                behavior: 'smooth'
              });
            }
          }}
        >
          <span title={tocItem.text}>{tocItem.text}</span>
          {tocItem.children && tocItem.children.length > 0 && (
            <div class={`${prefix}-catalog-wrapper`}>
              {tocItem.children.map((item) => (
                <CatalogLink
                  mdHeadingId={mdHeadingId}
                  key={`${tocItem.text}-link-${item.level}-${item.text}`}
                  tocItem={item}
                  onActive={props.onActive}
                  onClick={onClick}
                  scrollElementOffsetTop={scrollElementOffsetTop}
                />
              ))}
            </div>
          )}
        </div>
      );
    };
  }
});

export default CatalogLink;
