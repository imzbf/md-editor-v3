import { defineCustomElement } from 'vue';
import MdEditorElement from './MdEditorElement.ce.vue';

const MdEditorCustomElement = defineCustomElement(MdEditorElement);

export { MdEditorCustomElement };

export function register() {
  // 注册
  customElements.define('md-editor-element', MdEditorCustomElement);
}
