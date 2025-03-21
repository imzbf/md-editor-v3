import { ref, defineComponent, watch, inject, ComputedRef } from 'vue';
import { prefix } from '~~/config';
import { PreviewThemes } from '~/type';

// 将 HTML 字符串拆分为元素，返回第一层子节点（包括文本节点）
const splitNodes = (html: string): ChildNode[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return Array.from(doc.body.childNodes); // 包括文本节点
};

// 比较新旧 HTML，返回需更新和删除的节点信息
const compareHtml = (newNodes: ChildNode[], currentNodes: ChildNode[]) => {
  const updates: { index: number; newNode: ChildNode }[] = [];
  const deletes: ChildNode[] = [];

  newNodes.forEach((newNode, index) => {
    const currentNode = currentNodes[index];

    // 如果旧节点不存在，标记为新增
    if (!currentNode) {
      updates.push({ index, newNode });
      return;
    }

    // 如果节点类型不一致或内容不同，标记更新
    if (
      newNode.nodeType !== currentNode.nodeType ||
      newNode.textContent !== currentNode.textContent ||
      (newNode.nodeType === 1 &&
        (newNode as HTMLElement).outerHTML !== (currentNode as HTMLElement).outerHTML)
    ) {
      updates.push({ index, newNode });
    }
  });

  // 旧节点中有但新 HTML 中不存在的，标记为需要删除
  if (currentNodes.length > newNodes.length) {
    for (let i = newNodes.length; i < currentNodes.length; i++) {
      deletes.push(currentNodes[i]);
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

    // 初始化内容时的 HTML
    const firstHtml = props.html;

    // 更新 DOM 内容
    const updateHtmlContent = (
      updates: { index: number; newNode: ChildNode }[],
      deletes: ChildNode[]
    ) => {
      if (!htmlContainer.value) return;

      // 先删除待删除的节点
      deletes.forEach((node) => {
        node.remove();
      });

      // 更新或插入新的节点
      updates.forEach(({ index, newNode }) => {
        const targetNode = htmlContainer.value?.childNodes[index];

        // 如果目标节点不存在，直接插入新节点
        if (!targetNode) {
          htmlContainer.value?.appendChild(newNode.cloneNode(true));
        } else {
          // 如果目标节点存在但内容需要更新，替换
          htmlContainer.value?.replaceChild(newNode.cloneNode(true), targetNode);
        }
      });
    };

    watch(
      () => props.html,
      (newHtml) => {
        const newNodes = splitNodes(newHtml);
        // 从页面上获取真实的节点
        const currentNodes = Array.from(htmlContainer.value?.childNodes || []);
        const { updates, deletes } = compareHtml(newNodes, currentNodes);
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
        innerHTML={firstHtml}
        ref={htmlContainer}
      />
    );
  }
});

export default UpdateOnDemand;
