import { Anchor } from 'ant-design-vue';
import { defineComponent, PropType } from 'vue';

const { Link } = Anchor;

export interface Head {
  text: string;
  level: number;
}

export interface TocItem extends Head {
  anchor: string;
  children?: Array<TocItem>;
}

const Recursive = defineComponent({
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
        <Link href={`#${tocItem.anchor}`} title={tocItem.text}>
          {tocItem.children &&
            tocItem.children.map((item) => (
              <Recursive key={item.anchor} tocItem={item} />
            ))}
        </Link>
      );
    };
  }
});

export default Recursive;
