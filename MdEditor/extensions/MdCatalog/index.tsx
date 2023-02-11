import {
  reactive,
  onMounted,
  computed,
  defineComponent,
  PropType,
  ExtractPropTypes
} from 'vue';
import { LooseRequired } from '@vue/shared';
import bus from '../../utils/event-bus';
import { HeadList, MarkedHeadingId, Themes } from '../../type';
import { prefix } from '../../config';
import CatalogLink from './CatalogLink';
import { throttle, getRelativeTop } from '../../utils';
import './style.less';

export interface TocItem {
  text: string;
  level: number;
  index: number;
  active: boolean;
  children?: Array<TocItem>;
}

const mdCatalogProps = () => ({
  /**
   * 编辑器的Id，务必与需要绑定的编辑器Id相同
   */
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
  /**
   * 指定滚动的容器，选择器需带上对应的符号，默认预览框
   * 元素必须定位！！！！！！
   *
   * 默认：#md-editor-preview-wrapper
   */
  scrollElement: {
    type: [String, Object] as PropType<string | HTMLElement>
  },
  theme: {
    type: String as PropType<Themes>,
    default: 'light'
  },
  /**
   * 高亮标题相对滚动容器顶部偏移量，即距离该值时，高亮当前目录菜单项
   *
   * 默认：20px
   */
  offsetTop: {
    type: Number as PropType<number>,
    default: 20
  },
  /**
   * 滚动区域的固定顶部高度
   *
   * 默认：0
   */
  scrollElementOffsetTop: {
    type: Number as PropType<number>,
    default: 0
  },
  onClick: {
    type: Function as PropType<(e: MouseEvent, t: TocItem) => void>
  }
});

type MdCatalogProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<ReturnType<typeof mdCatalogProps>>>>
>;

const MdCatalog = defineComponent({
  name: 'MdCatalog',
  props: mdCatalogProps(),
  emits: ['onClick'],
  setup(props: MdCatalogProps, ctx) {
    // 获取Id
    const editorId = props.editorId as string;

    const state = reactive<{
      list: HeadList[];
      show: boolean;
      scrollElement: string | HTMLElement;
    }>({
      list: [],
      show: false,
      scrollElement: props.scrollElement || `#${editorId}-preview-wrapper`
    });

    // 重构的列表
    const catalogs = computed(() => {
      const tocItems: TocItem[] = [];

      state.list.forEach(({ text, level, active }, index) => {
        const item = { level, text, index: index + 1, active: !!active };

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
          state.list = _list.map((item, index) => {
            if (index === 0) {
              return {
                ...item,
                active: true
              };
            }

            return {
              ...item
            };
          });
        }
      });

      // 主动触发一次接收
      bus.emit(editorId, 'pushCatalog');
    });

    onMounted(() => {
      const scrollElement =
        state.scrollElement instanceof HTMLElement
          ? state.scrollElement
          : (document.querySelector(state.scrollElement) as HTMLElement);

      // 滚动区域为document.documentElement需要把监听事件绑定在window上
      (scrollElement === document.documentElement
        ? window
        : scrollElement
      )?.addEventListener(
        'scroll',
        throttle(() => {
          if (state.list.length === 0) {
            return false;
          }

          // 获取标记当前位置的目录
          const { activeHead } = state.list.reduce(
            (activeData, link, index) => {
              const linkEle = document.getElementById(
                props.markedHeadingId(link.text, link.level, index + 1)
              );

              if (linkEle instanceof HTMLElement) {
                // 获得当前标题相对滚动容器视窗的高度
                const relativeTop = getRelativeTop(linkEle, scrollElement);

                // 当前标题滚动到超出容器的顶部且相比其他的标题最近
                if (relativeTop < props.offsetTop && relativeTop > activeData.minTop) {
                  return {
                    activeHead: link,
                    minTop: relativeTop
                  };
                }
              }

              return activeData;
            },
            {
              activeHead: state.list[0],
              minTop: Number.MIN_SAFE_INTEGER
            }
          );

          state.list = state.list.map((item) => {
            if (item === activeHead) {
              return {
                ...item,
                active: true
              };
            }

            return {
              ...item,
              active: false
            };
          });
        })
      );
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
              key={`link-${item.level}-${item.text}`}
              scrollElement={state.scrollElement}
              onClick={(e: MouseEvent, t: TocItem) => {
                if (props.onClick) {
                  props.onClick(e, t);
                } else {
                  ctx.emit('onClick', e, t);
                }
              }}
              scrollElementOffsetTop={props.scrollElementOffsetTop}
            />
          );
        })}
      </div>
    );
  }
});

export default MdCatalog;
