import { ref, defineComponent, watch, inject, ComputedRef } from 'vue';
import { prefix } from '~~/config';
import { PreviewThemes } from '~/type';

// 将 HTML 字符串拆分为元素，返回第一层子元素
const splitHtml = (html: string): HTMLElement[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return Array.from(doc.body.children) as HTMLElement[];
};

// 比较新旧 HTML，返回需更新和删除的节点信息
const compareHtml = (newHtml: string, currentHtml: string) => {
  const newNodes = splitHtml(newHtml);
  const currentNodes = splitHtml(currentHtml);

  const updates: { index: number; newNode: string }[] = [];
  const deletes: number[] = [];

  // 对比每个节点，找出差异的部分
  newNodes.forEach((node, index) => {
    if (!currentNodes[index]) {
      // 该索引下的新节点不存在于旧 HTML，需要新增
      updates.push({ index, newNode: node.outerHTML });
    } else if (currentNodes[index].outerHTML !== node.outerHTML) {
      // 该索引下的节点存在但内容不同，需要更新
      updates.push({ index, newNode: node.outerHTML });
    }
  });

  // 旧节点中有但新 HTML 中不存在的，标记为需要删除
  if (currentNodes.length > newNodes.length) {
    for (let i = newNodes.length; i < currentNodes.length; i++) {
      deletes.push(i);
    }
  }

  return { updates, deletes };
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
    const htmlContainer = ref<HTMLElement>();

    // 永远缓存一份第一次的html，保证ssr正确
    const firstHtml = ref(props.html);

    // 更新 DOM 中的内容
    const updateHtmlContent = (
      updates: { index: number; newNode: string }[],
      deletes: number[]
    ) => {
      if (!htmlContainer.value) return;

      // 先删除多余的节点（从后向前删除，避免索引问题）
      deletes.reverse().forEach((index) => {
        htmlContainer.value?.children[index]?.remove();
      });

      // 更新或插入新的节点
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

    watch(
      () => props.html,
      (newHtml, oldHtml) => {
        const { updates, deletes } = compareHtml(newHtml, oldHtml || '');
        updateHtmlContent(updates, deletes);
      }
    );

    return () => (
      <div
        id={`${editorId}-preview`}
        class={[
          `${prefix}-preview`,
          `${previewTheme?.value}-theme`,
          showCodeRowNumber && `${prefix}-scrn`
        ]}
        innerHTML={firstHtml.value}
        ref={htmlContainer}
      />
    );
  }
});

export default UpdateOnDemand;
