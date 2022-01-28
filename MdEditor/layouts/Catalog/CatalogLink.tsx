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
          const previewEle = document.getElementById(`${prefix}-preview`);

          if (targetHeadEle) {
            const scrollLength = targetHeadEle.offsetTop;

            previewEle?.parentElement?.scrollTo({
              top: scrollLength,
              behavior: 'smooth'
            });
          }
        }}
      >
        <span>{props.tocItem.text}</span>
        {props.tocItem.children &&
          props.tocItem.children.map((item) => (
            <CatalogLink
              markedHeadingId={props.markedHeadingId}
              key={item.text}
              tocItem={item}
            />
          ))}
      </div>
    );
  }
});

export default CatalogLink;
