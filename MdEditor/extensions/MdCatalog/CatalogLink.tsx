import { TocItem } from './index';
import { MarkedHeadingId } from '../../type';
import { prefix } from '../../config';
import { defineComponent, PropType } from 'vue';

export interface CatalogLinkProps {
  tocItem: TocItem;
  markedHeadingId: MarkedHeadingId;
}

const CatalogLink = defineComponent({
  props: {
    tocItem: {
      type: Object as PropType<TocItem>,
      default: () => ({})
    },
    markedHeadingId: {
      type: Function as PropType<MarkedHeadingId>,
      default: () => {}
    },
    scrollElement: {
      type: [String, Object] as PropType<string | Element>,
      default: ''
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent, t: TocItem) => void>,
      default: () => {}
    }
  },
  setup({ tocItem, markedHeadingId, scrollElement, onClick }) {
    return () => (
      <div
        class={`${prefix}-catalog-link`}
        onClick={(e) => {
          onClick(e, tocItem);
          e.stopPropagation();
          const id = markedHeadingId(tocItem.text, tocItem.level, tocItem.index);
          const targetHeadEle = document.getElementById(id);
          const scrollContainer =
            scrollElement instanceof Element
              ? scrollElement
              : document.querySelector(scrollElement);

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

            scrollContainer?.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }}
      >
        <span title={tocItem.text}>{tocItem.text}</span>
        <div class={`${prefix}-catalog-wrapper`}>
          {tocItem.children &&
            tocItem.children.map((item) => (
              <CatalogLink
                markedHeadingId={markedHeadingId}
                key={item.text}
                tocItem={item}
                scrollElement={scrollElement}
                onClick={onClick}
              />
            ))}
        </div>
      </div>
    );
  }
});

export default CatalogLink;
