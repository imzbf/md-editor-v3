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
      type: [String, Object] as PropType<string | HTMLElement>,
      default: ''
    }
  },
  setup(props) {
    return () => (
      <div
        class={`${prefix}-catalog-link`}
        onClick={(e) => {
          e.stopPropagation();
          const id = props.markedHeadingId(props.tocItem.text, props.tocItem.level);
          const targetHeadEle = document.getElementById(id);
          const scrollContainer =
            props.scrollElement instanceof HTMLElement
              ? props.scrollElement
              : document.querySelector(props.scrollElement);

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
        <span title={props.tocItem.text}>{props.tocItem.text}</span>
        {props.tocItem.children &&
          props.tocItem.children.map((item) => (
            <CatalogLink
              markedHeadingId={props.markedHeadingId}
              key={item.text}
              tocItem={item}
              scrollElement={props.scrollElement}
            />
          ))}
      </div>
    );
  }
});

export default CatalogLink;
