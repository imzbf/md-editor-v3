import { inject, reactive, onMounted, computed, defineComponent, PropType } from 'vue';
import bus from '../../utils/event-bus';
import { HeadList, MarkedHeadingId } from '../../type';
import { prefix } from '../../config';
import CatalogLink from './CatalogLink';
import './style.less';

export interface TocItem {
  text: string;
  level: number;
  children?: Array<TocItem>;
}

const Catalog = defineComponent({
  props: {
    markedHeadingId: {
      type: Function as PropType<MarkedHeadingId>,
      default: () => {}
    }
  },
  setup(props) {
    // 获取Id
    const editorId = inject('editorId') as string;

    const state = reactive<{
      list: HeadList[];
      show: boolean;
    }>({
      list: [],
      show: false
    });

    // 重构的列表
    const catalogs = computed(() => {
      const tocItems: TocItem[] = [];

      state.list.forEach(({ text, level }) => {
        const item = { level, text };

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

      bus.on(editorId, {
        name: 'catalogShow',
        callback: () => {
          state.show = !state.show;
        }
      });
    });

    return () =>
      state.show ? (
        <div class={`${prefix}-catalog`}>
          {catalogs.value.map((item) => {
            return (
              <CatalogLink
                markedHeadingId={props.markedHeadingId}
                tocItem={item}
                key={item.text}
              />
            );
          })}
        </div>
      ) : (
        ''
      );
  }
});

export default Catalog;
