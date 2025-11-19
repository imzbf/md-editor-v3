import { defineComponent, PropType, inject, Ref, watch, ref, onMounted } from 'vue';
import { prefix } from '~/config';
import { MdHeadingId } from '~/type';
import { getComputedStyleNum } from '~/utils/scroll-auto';
import { TocItem } from './MdCatalog';

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

const CatalogLink = defineComponent({
  props,
  setup(props) {
    const scrollElementRef = inject('scrollElementRef') as Ref<HTMLElement>;
    const rootNodeRef = inject('roorNodeRef') as Ref<Document | ShadowRoot>;

    const currRef = ref<HTMLDivElement>();

    watch(
      () => props.tocItem.active,
      (active) => {
        if (active) {
          props.onActive(props.tocItem, currRef.value!);
        }
      }
    );

    onMounted(() => {
      if (props.tocItem.active) {
        props.onActive(props.tocItem, currRef.value!);
      }
    });

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();

      props.onClick(e, props.tocItem);
      if (e.defaultPrevented) {
        return;
      }
      const id = props.mdHeadingId({
        text: props.tocItem.text,
        level: props.tocItem.level,
        index: props.tocItem.index,
        currentToken: props.tocItem.currentToken,
        nextToken: props.tocItem.nextToken
      });
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
          top: offsetTop - props.scrollElementOffsetTop - currMarginTop,
          behavior: 'smooth'
        });
      }
    };

    return () => {
      return (
        <div
          ref={currRef}
          class={[
            `${prefix}-catalog-link`,
            props.tocItem.active && `${prefix}-catalog-active`
          ]}
          onClick={handleClick}
        >
          <span title={props.tocItem.text}>{props.tocItem.text}</span>
          {props.tocItem.children && props.tocItem.children.length > 0 && (
            <div class={`${prefix}-catalog-wrapper`}>
              {props.tocItem.children.map((item) => (
                <CatalogLink
                  mdHeadingId={props.mdHeadingId}
                  key={`${props.tocItem.text}-link-${item.level}-${item.text}`}
                  tocItem={item}
                  onActive={props.onActive}
                  onClick={props.onClick}
                  scrollElementOffsetTop={props.scrollElementOffsetTop}
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
