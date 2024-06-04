import { PropType, defineComponent } from 'vue';
import { prefix, configOption } from '~/config';

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
  | 'baocun'
  | 'prettier'
  | 'suoxiao'
  | 'fangda'
  | 'fullscreen-exit'
  | 'fullscreen'
  | 'preview-only'
  | 'preview'
  | 'coding'
  | 'catalog'
  | 'github'
  | 'mermaid'
  | 'formula'
  | 'close'
  | 'delete'
  | 'upload'
  | 'collapse-tips';

export default defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      default: ''
    }
  },
  setup(props) {
    return () => {
      return configOption.iconfontType === 'svg' ? (
        <svg class={`${prefix}-icon`} aria-hidden="true">
          <use xlinkHref={`#${prefix}-icon-${props.name}`} />
        </svg>
      ) : (
        <i class={`${prefix}-iconfont ${prefix}-icon-${props.name}`} />
      );
    };
  }
});
