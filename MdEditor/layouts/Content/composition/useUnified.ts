import { computed, ComputedRef, inject, ref, shallowRef, toRef, watch } from 'vue';
import { unified } from 'unified';
// 处理markdown为tree
import rehypeParse from 'remark-parse';
// 转换tree为html
import remarkRehype from 'remark-rehype';
// 处理表格等
import remarkGfm from 'remark-gfm';
// 定义指令
import rehypeStringify from 'rehype-stringify';
import remarkMath from 'remark-math';
// 处理html
import rehypeRaw from 'rehype-raw';

import { ContentProps } from '../props';

import useKatex from './useKatex';
import useHighlight from './useHighlight';
import useMermaid from './useMermaid';

import rehypeKatex from '../unified/katex';
import unifiedHljs from '../unified/highlight';
import unifiedHeading from '../unified/heading';
import unifiedImg from '../unified/img';

import { configOption } from '~/config';

import { HeadList, Themes } from '~/type';
import { debounce } from '~/utils';
import bus from '~/utils/event-bus';
import admonition from '../unified/admonition';
import remarkDirective from '../unified/remarkAlert';

const useUnified = (props: ContentProps) => {
  const { editorConfig } = configOption;

  // 是否显示行号
  const showCodeRowNumber = inject('showCodeRowNumber') as boolean;
  const previewOnly = inject('previewOnly') as boolean;
  const editorId = inject('editorId') as string;
  const themeRef = inject('theme') as ComputedRef<Themes>;

  // 分析的语法树
  const mdST = shallowRef({});

  const katexRef = useKatex(props);
  const hljsRef = useHighlight(props);
  const { reRenderRef, replaceMermaid } = useMermaid(props);

  const headsRef = ref<HeadList[]>([]);

  const processor = unified();
  processor.use(rehypeParse);
  processor.use(remarkDirective);
  processor.use(admonition);
  processor.use(remarkRehype, { allowDangerousHtml: true });
  processor.use(rehypeRaw);
  processor.use(remarkGfm);
  processor.use(remarkMath);
  processor.use(rehypeStringify);
  processor.use(rehypeKatex, { katexRef, noKatex: props.noKatex });
  processor.use(unifiedHljs, {
    hljsRef,
    noHighlight: false,
    showCodeRowNumber,
    themeRef
  });
  processor.use(unifiedHeading, { headingId: props.markedHeadingId, headsRef });
  processor.use(unifiedImg);
  processor.use(() => (tree: any) => {
    mdST.value = tree;
  });

  const html = ref(processor.processSync(props.value).value as string);

  const needReRender = computed(() => {
    return (props.noKatex || katexRef.value) && (props.noHighlight || hljsRef.value);
  });

  const markHtml = debounce(
    async () => {
      // 清理历史标题
      headsRef.value = [];
      // 编译文本并替换异步任务模板占位
      console.time();
      const { value } = await processor.process(props.value || '');
      console.timeEnd();
      html.value = value as string;
      // 触发异步的保存事件（html总是会比text后更新）
      bus.emit(editorId, 'buildFinished', html.value);
      props.onHtmlChanged(html.value);
      replaceMermaid();
    },
    editorConfig?.renderDelay !== undefined
      ? editorConfig?.renderDelay
      : previewOnly
      ? 0
      : 500
  );

  // watch([toRef(props, 'value'), needReRender, reRenderRef], markHtml);

  return { html };
};

export default useUnified;
