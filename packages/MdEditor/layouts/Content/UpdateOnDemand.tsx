import { ref, defineComponent, watch } from 'vue';

// 将 HTML 字符串拆分为元素，返回第一层子节点（包括文本节点）
const splitNodes = (html: string): ChildNode[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return Array.from(doc.body.childNodes); // 包括文本节点
};

// 比较新旧 HTML，返回需更新和删除的节点信息
const isSameNode = (newNode: ChildNode, currentNode: ChildNode) => {
  if (newNode.nodeType !== currentNode.nodeType) {
    return false;
  }

  if (newNode.nodeType === Node.TEXT_NODE || newNode.nodeType === Node.COMMENT_NODE) {
    return newNode.textContent === currentNode.textContent;
  }

  if (newNode.nodeType === Node.ELEMENT_NODE) {
    return (newNode as Element).outerHTML === (currentNode as Element).outerHTML;
  }

  return newNode.isEqualNode ? newNode.isEqualNode(currentNode) : false;
};

const UpdateOnDemand = defineComponent({
  name: 'UpdateOnDemand',
  props: {
    id: {
      type: String,
      required: true
    },
    class: {
      type: [String, Array, Object],
      required: true
    },
    html: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // HTML 容器的 ref
    const htmlContainer = ref<HTMLElement>();

    // 初始化内容时的 HTML
    const firstHtml = props.html;

    // 更新 DOM 内容
    const updateHtmlContent = (newNodes: ChildNode[], prevNodes: ChildNode[]) => {
      if (!htmlContainer.value) return;

      const container = htmlContainer.value;
      const currentNodes = Array.from(container.childNodes);
      const minLength = Math.min(newNodes.length, prevNodes.length);

      let divergenceIndex = -1;

      for (let i = 0; i < minLength; i++) {
        if (!isSameNode(newNodes[i], prevNodes[i])) {
          divergenceIndex = i;
          break;
        }
      }

      if (divergenceIndex === -1) {
        if (prevNodes.length > newNodes.length) {
          divergenceIndex = newNodes.length;
        } else if (newNodes.length > prevNodes.length) {
          divergenceIndex = prevNodes.length;
        } else {
          return;
        }
      }

      const startRemove = Math.min(divergenceIndex, currentNodes.length);

      for (let i = currentNodes.length - 1; i >= startRemove; i--) {
        currentNodes[i].remove();
      }

      for (let i = divergenceIndex; i < newNodes.length; i++) {
        container.appendChild(newNodes[i].cloneNode(true));
      }
    };

    watch(
      () => props.html,
      (newHtml, oldHtml) => {
        const newNodes = splitNodes(newHtml);
        const prevNodes = splitNodes(oldHtml || '');
        updateHtmlContent(newNodes, prevNodes);
      }
    );

    return () => (
      <div id={props.id} class={props.class} innerHTML={firstHtml} ref={htmlContainer} />
    );
  }
});

export default UpdateOnDemand;
