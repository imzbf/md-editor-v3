import { EditorView } from '@codemirror/view';
import {
  reactive,
  onMounted,
  computed,
  defineComponent,
  PropType,
  shallowRef,
  onBeforeUnmount,
  ref,
  provide,
  CSSProperties,
  watch
} from 'vue';
import { prefix } from '~/config';
import {
  CATALOG_CHANGED,
  GET_EDITOR_VIEW,
  PUSH_CATALOG,
  SEND_EDITOR_VIEW
} from '~/static/event-name';
import { HeadList, MdHeadingId, Themes } from '~/type';
import { getRelativeTop } from '~/utils';
import bus from '~/utils/event-bus';
import { getComputedStyleNum } from '~/utils/scroll-auto';
import CatalogLink from './CatalogLink';

export interface TocItem extends HeadList {
  index: number;
  children?: Array<TocItem>;
}

const props = {
  /**
   * 编辑器的Id，务必与需要绑定的编辑器Id相同
   */
  editorId: {
    type: String as PropType<string>,
    default: undefined
  },
  class: {
    type: String,
    default: ''
  },
  mdHeadingId: {
    type: Function as PropType<MdHeadingId>,
    default: (({ text }) => text) as MdHeadingId
  },
  /**
   * 指定滚动的容器，选择器需带上对应的符号，默认预览框
   * 元素必须定位！！！！！！
   *
   * 默认：#md-editor-preview-wrapper
   */
  scrollElement: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: undefined
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
    type: Function as PropType<(e: MouseEvent, t: TocItem) => void>,
    default: undefined
  },
  onActive: {
    type: Function as PropType<
      (heading: HeadList | undefined, activeElement: HTMLDivElement) => void
    >,
    default: undefined
  },
  /**
   * 滚动容器是否在web component中，默认不在
   *
   * 在其中的话通过document查询不到
   */
  isScrollElementInShadow: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 设置与哪个区域同步，默认与内容区域同步
   *
   * >= v5.3.0
   */
  syncWith: {
    type: String as PropType<'editor' | 'preview'>,
    default: 'preview'
  },
  /**
   * 控制最大显示的目录层级
   */
  catalogMaxDepth: {
    type: Number as PropType<number>,
    default: undefined
  }
};

const MdCatalog = defineComponent({
  name: 'MdCatalog',
  props,
  emits: ['onClick', 'onActive'],
  setup(props, ctx) {
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
    // 编辑器view
    const editorViewRef = shallowRef<EditorView>();

    /**
     * 指示器样式
     */
    const indicatorStyles = ref<CSSProperties>({});

    provide('scrollElementRef', scrollElementRef);
    provide('roorNodeRef', rootNodeRef);

    // 重构的列表
    const catalogs = computed(() => {
      const tocItems: TocItem[] = [];

      state.list.forEach((listItem, index) => {
        if (props.catalogMaxDepth && listItem.level > props.catalogMaxDepth) {
          return;
        }

        const { text, level, line } = listItem;
        const item = {
          level,
          text,
          line,
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
        activeItem.value = undefined;
        state.list = [];
        return false;
      }

      // 获取标记当前位置的目录
      const { activeHead, activeIndex } = list.reduce(
        (activeData, link, index) => {
          let relativeTop = 0;

          if (props.syncWith === 'preview') {
            const linkEle = rootNodeRef.value?.getElementById(
              props.mdHeadingId({
                text: link.text,
                level: link.level,
                index: index + 1,
                currentToken: link.currentToken,
                nextToken: link.nextToken
              })
            );

            if (linkEle instanceof HTMLElement) {
              // 获得当前标题相对滚动容器视窗的高度
              relativeTop = getRelativeTop(linkEle, scrollElementRef.value!);
            }
          } else {
            const view = editorViewRef.value;

            if (view) {
              const top = view.lineBlockAt(view.state.doc.line(link.line + 1).from).top;
              const scrollTop = view.scrollDOM.scrollTop;

              relativeTop = top - scrollTop;
            }
          }

          // 当前标题滚动到超出容器的顶部且相比其他的标题最近
          if (relativeTop < props.offsetTop && relativeTop > activeData.minTop) {
            return {
              activeHead: link,
              activeIndex: index,
              minTop: relativeTop
            };
          }

          return activeData;
        },
        {
          activeHead: list[0],
          activeIndex: 0,
          minTop: Number.MIN_SAFE_INTEGER
        }
      );

      let highlightHead = activeHead;

      const { catalogMaxDepth } = props;

      if (catalogMaxDepth && highlightHead.level > catalogMaxDepth) {
        for (let i = activeIndex; i >= 0; i--) {
          const candidate = list[i];

          if (candidate.level <= catalogMaxDepth) {
            highlightHead = candidate;
            break;
          }
        }

        if (highlightHead.level > catalogMaxDepth) {
          const fallback = list.find((item) => item.level <= catalogMaxDepth);
          if (fallback) {
            highlightHead = fallback;
          }
        }
      }

      activeItem.value = highlightHead;
      state.list = list;
    };

    const onActive = (tocItem: TocItem, ele: HTMLDivElement) => {
      indicatorStyles.value.top =
        ele.offsetTop + getComputedStyleNum(ele, 'padding-top') + 'px';

      props.onActive?.(tocItem, ele);
      ctx.emit('onActive', tocItem, ele);
    };

    const scrollHandler = () => {
      findActiveHeading(state.list);
    };

    const catalogChangedHandler = (_list: Array<HeadList>) => {
      scrollContainerRef.value?.removeEventListener('scroll', scrollHandler);

      if (props.syncWith === 'editor') {
        scrollContainerRef.value = editorViewRef.value?.scrollDOM;
      } else {
        // 滚动区域为document.documentElement需要把监听事件绑定在window上
        const scrollElement = getScrollElement();
        scrollElementRef.value = scrollElement;
        scrollContainerRef.value =
          scrollElement === document.documentElement ? document : scrollElement;
      }

      findActiveHeading(_list);
      scrollContainerRef.value?.addEventListener('scroll', scrollHandler);
    };

    const getEditorView = (view: EditorView) => {
      editorViewRef.value = view;
    };

    watch([() => props.syncWith, editorViewRef, () => props.catalogMaxDepth], () => {
      catalogChangedHandler(state.list);
    });

    onMounted(() => {
      // 获取当前元素所在的根节点
      rootNodeRef.value = catalogRef.value!.getRootNode() as Document | ShadowRoot;
      bus.on(editorId, {
        name: CATALOG_CHANGED,
        callback: catalogChangedHandler
      });

      bus.on(editorId, {
        name: GET_EDITOR_VIEW,
        callback: getEditorView
      });

      // 主动触发一次接收
      bus.emit(editorId, PUSH_CATALOG);
      bus.emit(editorId, SEND_EDITOR_VIEW);
    }); // ==

    // 要移除监听事件，特别是全局的
    onBeforeUnmount(() => {
      bus.remove(editorId, CATALOG_CHANGED, catalogChangedHandler);
      bus.remove(editorId, GET_EDITOR_VIEW, getEditorView);
      scrollContainerRef.value?.removeEventListener('scroll', scrollHandler);
    });

    const handleCatalogClick = (e: MouseEvent, t: TocItem) => {
      props.onClick?.(e, t);
      ctx.emit('onClick', e, t);
    };

    return () => (
      <div
        class={[
          `${prefix}-catalog`,
          props.theme === 'dark' && `${prefix}-catalog-dark`,
          props.class || ''
        ]}
        ref={catalogRef}
      >
        {catalogs.value.length > 0 && (
          <>
            <div class={`${prefix}-catalog-indicator`} style={indicatorStyles.value} />
            <div class={`${prefix}-catalog-container`}>
              {catalogs.value.map((item) => {
                return (
                  <CatalogLink
                    mdHeadingId={props.mdHeadingId}
                    tocItem={item}
                    key={`link-${item.level}-${item.text}`}
                    onActive={onActive}
                    onClick={handleCatalogClick}
                    scrollElementOffsetTop={props.scrollElementOffsetTop}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
});

export default MdCatalog;
