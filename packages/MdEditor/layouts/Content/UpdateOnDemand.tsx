import { ref, onMounted, defineComponent, watch, inject, ComputedRef } from 'vue';
import { prefix } from '~~/config';
import { PreviewThemes } from '~/type';

// 将 HTML 字符串拆分为元素，返回第一层子元素
const splitHtml = (html: string): HTMLElement[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return Array.from(doc.body.children) as HTMLElement[];
};

// 比较两个 HTML 内容，返回更新的节点
const compareHtml = (newHtml: string, currentHtml: string) => {
  const newNodes = splitHtml(newHtml);
  const currentNodes = splitHtml(currentHtml);

  // 对比每个节点，找出差异的部分
  return newNodes
    .map((node, index) => ({
      index,
      newNode: node.outerHTML,
      isUpdated: currentNodes[index]?.outerHTML !== node.outerHTML
    }))
    .filter((update) => update.isUpdated); // 过滤出差异节点
};

const UpdateOnDemand = defineComponent({
  name: 'UpdateOnDemand',
  props: {
    html: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // 注入 editorId、previewTheme 和 showCodeRowNumber
    const editorId = inject('editorId') as string;
    const previewTheme = inject<ComputedRef<PreviewThemes>>('previewTheme');
    const showCodeRowNumber = inject('showCodeRowNumber') as boolean;

    // HTML 容器的 ref
    const htmlContainer = ref<HTMLElement | null>(null);

    // 更新 DOM 中的内容
    const updateHtmlContent = (updates: { index: number; newNode: string }[]) => {
      updates.forEach(({ index, newNode }) => {
        const targetNode = htmlContainer.value?.children[index];
        if (targetNode) {
          // 如果目标节点存在，更新它的 outerHTML
          targetNode.outerHTML = newNode;
        } else {
          // 如果目标节点不存在，则插入新的节点
          htmlContainer.value?.insertAdjacentHTML('beforeend', newNode);
        }
      });
    };

    // 监听 html 属性的变化，进行 DOM 更新
    watch(
      () => props.html,
      (newHtml, oldHtml) => {
        // 如果新旧 HTML 内容不同，执行更新
        const updates = compareHtml(newHtml, oldHtml || '');
        updateHtmlContent(updates);
      },
      { immediate: true }
    );

    // 在组件挂载时，初始化 HTML 内容
    onMounted(() => {
      if (htmlContainer.value) {
        htmlContainer.value.innerHTML = props.html;
      }
    });

    return () => (
      <div
        id={`${editorId}-preview`}
        class={[
          `${prefix}-preview`,
          `${previewTheme?.value}-theme`,
          showCodeRowNumber && `${prefix}-scrn`
        ]}
        ref={htmlContainer}
      />
    );
  }
});

export default UpdateOnDemand;
