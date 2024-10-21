import {
  Bold,
  ChartArea,
  CircleChevronDown,
  Code,
  Expand,
  Eye,
  CodeXml,
  Forward,
  Heading,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  ListTodo,
  ListTree,
  Maximize2,
  Minimize2,
  Quote,
  Reply,
  Save,
  Shrink,
  SquareCode,
  SquareSigma,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  Trash2,
  Underline,
  Upload,
  View,
  X
} from 'lucide-vue-next';
import { Component, PropType, defineComponent, h } from 'vue';
import { prefix } from '~/config';
import Github from './Github';

export type IconName =
  | 'bold'
  | 'underline'
  | 'italic'
  | 'strike-through'
  | 'title'
  | 'sub'
  | 'sup'
  | 'quote'
  | 'unordered-list'
  | 'ordered-list'
  | 'task'
  | 'code-row'
  | 'code'
  | 'link'
  | 'image'
  | 'table'
  | 'revoke'
  | 'next'
  | 'save'
  | 'prettier'
  | 'minimize'
  | 'maximize'
  | 'fullscreen-exit'
  | 'fullscreen'
  | 'preview-only'
  | 'preview'
  | 'preview-html'
  | 'catalog'
  | 'github'
  | 'mermaid'
  | 'formula'
  | 'close'
  | 'delete'
  | 'upload'
  | 'collapse-tips';

const iconMaps: { [key in IconName]: Component } = {
  bold: Bold,
  underline: Underline,
  italic: Italic,
  'strike-through': Strikethrough,
  title: Heading,
  sub: Subscript,
  sup: Superscript,
  quote: Quote,
  'unordered-list': List,
  'ordered-list': ListOrdered,
  task: ListTodo,
  'code-row': Code,
  code: SquareCode,
  link: Link,
  image: Image,
  table: Table,
  revoke: Reply,
  next: Forward,
  save: Save,
  prettier: SquareCode,
  minimize: Minimize2,
  maximize: Maximize2,
  'fullscreen-exit': Shrink,
  fullscreen: Expand,
  'preview-only': View,
  preview: Eye,
  'preview-html': CodeXml,
  catalog: ListTree,
  github: Github,
  mermaid: ChartArea,
  formula: SquareSigma,
  close: X,
  delete: Trash2,
  upload: Upload,
  'collapse-tips': CircleChevronDown
};

export default defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      default: ''
    }
  },
  setup(props) {
    return () => {
      return h(iconMaps[props.name], {
        class: `${prefix}-icon`
      });
    };
  }
});
