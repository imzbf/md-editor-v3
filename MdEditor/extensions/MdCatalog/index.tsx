import { reactive, onMounted, computed, defineComponent, PropType } from 'vue';
import bus from '../../utils/event-bus';
import { HeadList, MarkedHeadingId, Themes } from '../../type';
import { prefix } from '../../config';
import CatalogLink from './CatalogLink';
import './style.less';

export interface TocItem {
  text: string;
  level: number;
  index: number;
  children?: Array<TocItem>;
}

const MdCatalog = defineComponent({
  name: 'MdCatalog',
  props: {
    editorId: {
      type: String as PropType<string>
    },
    class: {
      type: String,
      default: ''
    },
    markedHeadingId: {
      type: Function as PropType<MarkedHeadingId>,
      default: (text: string) => text
    },
    // 指定滚动的容器，选择器需带上对应的符号，默认预览框
    // 元素必须定位！！！！！！
    scrollElement: {
      type: [String, Object] as PropType<string | Element>
    },
    theme: {
      type: String as PropType<Themes>,
      default: 'light'
    }
  },
  emits: ['onClick'],
  setup(props, ctx) {
    // 获取Id
    const editorId = props.editorId as string;

    const state = reactive<{
      list: HeadList[];
      show: boolean;
      scrollElement: string | Element;
    }>({
      list: [],
      show: false,
      scrollElement: props.scrollElement || `#${editorId}-preview-wrapper`
    });

    // 重构的列表
    const catalogs = computed(() => {
      const tocItems: TocItem[] = [];

      state.list.forEach(({ text, level }, index) => {
        const item = { level, text, index: index + 1 };

        if (tocItems.length === 0) {
          // 第一个 item 直接 push
          tocItems.push(item);
        } else {
          let lastItem = tocItems[tocItems.length - 1]; // 最后一个 item

          if (item.level > lastItem.level) {
            // item 是 lastItem 的 children
            for (let i = lastItem.level + 1; i <= 6; i++) {
              const { children } = lastItem;
              if (!children) {
                // 如果 children 不存在
                lastItem.children = [item];
                break;
              }

              lastItem = children[children.length - 1]; // 重置 lastItem 为 children 的最后一个 item

              if (item.level <= lastItem.level) {
                // item level 小于或等于 lastItem level 都视为与 children 同级
                children.push(item);
                break;
              }
            }
          } else {
            // 置于最顶级
            tocItems.push(item);
          }
        }
      });

      return tocItems;
    });

    onMounted(() => {
      bus.on(editorId, {
        name: 'catalogChanged',
        callback: (_list: Array<HeadList>) => {
          state.list = _list;
        }
      });

      // 主动触发一次接收
      bus.emit(editorId, 'pushCatalog');
    });

    return () => (
      <div
        class={`${prefix}-catalog${props.theme === 'dark' ? '-dark' : ''} ${props.class}`}
      >
        {catalogs.value.map((item) => {
          return (
            <CatalogLink
              markedHeadingId={props.markedHeadingId}
              tocItem={item}
              key={item.text}
              scrollElement={state.scrollElement}
              onClick={(e: MouseEvent, t: TocItem) => {
                ctx.emit('onClick', e, t);
              }}
            />
          );
        })}
      </div>
    );
  }
});

export default MdCatalog;
