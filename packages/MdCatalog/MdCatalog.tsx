import {
  reactive,
  onMounted,
  computed,
  defineComponent,
  PropType,
  ExtractPropTypes,
  shallowRef,
  onBeforeUnmount,
  watch,
  ref,
  provide
} from 'vue';
import { LooseRequired } from '@vue/shared';
import { HeadList, MdHeadingId, Themes } from '~/type';
import { prefix } from '~/config';
import { getRelativeTop } from '~/utils';
import bus from '~/utils/event-bus';
import CatalogLink from './CatalogLink';
import { CATALOG_CHANGED, PUSH_CATALOG } from '~/static/event-name';

export interface TocItem {
  text: string;
  level: number;
  index: number;
  active: boolean;
  children?: Array<TocItem>;
}

const props = {
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
  mdHeadingId: {
    type: Function as PropType<MdHeadingId>,
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
  },
  onActive: {
    type: Function as PropType<(heading: HeadList | undefined) => void>
  },
  /**
   * 滚动容器是否在web component中，默认不在
   *
   * 在其中的话通过document查询不到
   */
  isScrollElementInShadow: {
    type: Boolean as PropType<boolean>,
    default: false
  }
};

type MdCatalogProps = Readonly<LooseRequired<Readonly<ExtractPropTypes<typeof props>>>>;

const MdCatalog = defineComponent({
  name: 'MdCatalog',
  props,
  emits: ['onClick', 'onActive'],
  setup(props: MdCatalogProps, ctx) {
    // 获取Id
    const editorId = props.editorId as string;
    const defaultScrollElement = `#${editorId}-preview-wrapper`;

    const state = reactive<{
      list: HeadList[];
      show: boolean;
      scrollElement: string | HTMLElement;
    }>({
      list: [],
      show: false,
      scrollElement: props.scrollElement || defaultScrollElement
    });

    const activeItem = shallowRef<HeadList>();

    // 目录根部元素
    const catalogRef = ref<HTMLDivElement>();
    // 获取到的滚动root节点
    const scrollElementRef = ref<HTMLElement>();
    // 滚动容器，包括document
    const scrollContainerRef = ref<HTMLElement | Document>();
    // 获取到的目录root节点，注意，不支持目录和编辑器不在同一个web c中使用
    const rootNodeRef = ref<Document | ShadowRoot>();

    provide('scrollElementRef', scrollElementRef);
    provide('roorNodeRef', rootNodeRef);

    // 重构的列表
    const catalogs = computed(() => {
      const tocItems: TocItem[] = [];

      state.list.forEach((listItem, index) => {
        const { text, level } = listItem;
        const item = {
          level,
          text,
          index: index + 1,
          active: activeItem.value === listItem
        };

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

    const getScrollElement = () => {
      if (state.scrollElement instanceof HTMLElement) {
        return state.scrollElement;
      }

      let scrollRoot: ShadowRoot | Document = document;
      if (state.scrollElement === defaultScrollElement || props.isScrollElementInShadow) {
        scrollRoot = catalogRef.value?.getRootNode() as ShadowRoot | Document;
      }

      return scrollRoot.querySelector(state.scrollElement) as HTMLElement;
    };

    const findActiveHeading = (list: HeadList[]) => {
      if (list.length === 0) {
        state.list = [];
        return false;
      }

      // 获取标记当前位置的目录
      const { activeHead } = list.reduce(
        (activeData, link, index) => {
          const linkEle = rootNodeRef.value?.getElementById(
            props.mdHeadingId(link.text, link.level, index + 1)
          );

          if (linkEle instanceof HTMLElement) {
            // 获得当前标题相对滚动容器视窗的高度
            const relativeTop = getRelativeTop(linkEle, scrollElementRef.value!);

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
          activeHead: list[0],
          minTop: Number.MIN_SAFE_INTEGER
        }
      );

      activeItem.value = activeHead;
      state.list = list;
    };

    const scrollHandler = () => {
      findActiveHeading(state.list);
    };

    watch(
      () => activeItem.value,
      (nVal) => {
        const activeHeading = nVal ? { ...nVal } : undefined;
        if (props.onActive) {
          props.onActive(activeHeading);
        } else {
          ctx.emit('onActive', activeHeading);
        }
      }
    );

    onMounted(() => {
      // 获取当前元素所在的根节点
      rootNodeRef.value = catalogRef.value!.getRootNode() as Document | ShadowRoot;
      // 滚动区域为document.documentElement需要把监听事件绑定在window上
      let scrollElement = getScrollElement();
      scrollElementRef.value = scrollElement;

      bus.on(editorId, {
        name: CATALOG_CHANGED,
        callback: (_list: Array<HeadList>) => {
          // 切换预览状态后，需要重新获取滚动元素
          scrollElement = getScrollElement();
          scrollElementRef.value = scrollElement;
          scrollContainerRef.value =
            scrollElement === document.documentElement ? document : scrollElement;

          scrollContainerRef.value?.removeEventListener('scroll', scrollHandler);
          findActiveHeading(_list);
          scrollContainerRef.value?.addEventListener('scroll', scrollHandler);
        }
      });

      // 主动触发一次接收
      bus.emit(editorId, PUSH_CATALOG);
    }); // ==

    // 要移除监听事件，特别是全局的
    onBeforeUnmount(() => {
      scrollContainerRef.value?.removeEventListener('scroll', scrollHandler);
    });

    return () => (
      <div
        class={[
          `${prefix}-catalog`,
          props.theme === 'dark' && `${prefix}-catalog-dark`,
          props.class || ''
        ]}
        ref={catalogRef}
      >
        {catalogs.value.map((item) => {
          return (
            <CatalogLink
              mdHeadingId={props.mdHeadingId}
              tocItem={item}
              key={`link-${item.level}-${item.text}`}
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
