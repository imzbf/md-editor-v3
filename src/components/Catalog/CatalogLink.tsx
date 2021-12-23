import { Anchor } from 'ant-design-vue';
import { defineComponent, PropType } from 'vue';

const { Link } = Anchor;
import { TocItem } from './';

const CatalogLink = defineComponent({
  props: {
    tocItem: {
      type: Object as PropType<TocItem>,
      default: () => ({})
    }
  },
  setup(props) {
    return () => {
      const { tocItem } = props;

      return (
        <Link href={`#${tocItem.text}`} title={tocItem.text}>
          {tocItem.children && (
            <div class="catalog-container">
              {tocItem.children.map((item) => (
                <CatalogLink key={`${item.level}-${item.text}`} tocItem={item} />
              ))}
            </div>
          )}
        </Link>
      );
    };
  }
});

export default CatalogLink;
