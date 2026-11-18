import { defineCustomElement } from 'vue';
import MdEditorElement from './MdEditorElement.ce.vue';
import '../config';

export const MdEditorCustomElement = defineCustomElement(MdEditorElement);

export function register() {
  if (!customElements.get('md-editor-element')) {
    customElements.define('md-editor-element', MdEditorCustomElement);
  }
}
