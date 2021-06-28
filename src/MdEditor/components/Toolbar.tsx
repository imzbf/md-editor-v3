import { defineComponent } from 'vue';
import Divider from './Divider';
import { prefix } from '../Editor';

export default defineComponent({
  name: 'MDEditorToolbar',
  setup() {
    return () => (
      <div class={`${prefix}-toolbar`}>
        <div class={`${prefix}-toolbar-left`}>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-bold"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-italic"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-xiahuaxian"></use>
            </svg>
          </div>
          <Divider />
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-strikethrough"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-title"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-baojiaquotation2"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-unorderedList"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-orderedList"></use>
            </svg>
          </div>

          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-daima"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-daima1"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-link"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-image"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-table"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-chexiao"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-baocun"></use>
            </svg>
          </div>
        </div>
        <ul class={`${prefix}-toolbar-right`}>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-fangda"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-fullScreen"></use>
            </svg>
          </div>

          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-subColumn"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-mulu"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-bangzhu"></use>
            </svg>
          </div>
          <div>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-github"></use>
            </svg>
          </div>
        </ul>
      </div>
    );
  }
});
