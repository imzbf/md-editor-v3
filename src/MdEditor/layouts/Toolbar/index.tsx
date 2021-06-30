import { defineComponent } from 'vue';
import Divider from '../../components/Divider';
import Dropdown from '../../components/Dropdown';
import { prefix } from '../../Editor';

export default defineComponent({
  name: 'MDEditorToolbar',
  setup() {
    return () => (
      <div class={`${prefix}-toolbar`}>
        <div class={`${prefix}-toolbar-left`}>
          <div class={`${prefix}-toolbar-item`} title="加粗">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-bold"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="下划线">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-underline"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="斜体">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-italic"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="删除线">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-strike-through"></use>
            </svg>
          </div>
          <Divider />
          <Dropdown>
            <div class={`${prefix}-toolbar-item`} title="标题">
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-title"></use>
              </svg>
            </div>
          </Dropdown>
          <div class={`${prefix}-toolbar-item`} title="引用">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-quote"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="无序列表">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-unordered-list"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="有序列表">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-ordered-list"></use>
            </svg>
          </div>
          <Divider />
          <div class={`${prefix}-toolbar-item`} title="行内代码">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-code-row"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="代码块">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-code"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="链接">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-link"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="图片">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-image"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="表格">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-table"></use>
            </svg>
          </div>
          <Divider />
          <div class={`${prefix}-toolbar-item`} title="撤回">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-revoke"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="取消撤回">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-next"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="保存">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-baocun"></use>
            </svg>
          </div>
        </div>
        <div class={`${prefix}-toolbar-right`}>
          <div class={`${prefix}-toolbar-item`} title="浏览器内全屏">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-fangda"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="全屏放大">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-fullScreen"></use>
            </svg>
          </div>

          <div class={`${prefix}-toolbar-item`} title="分栏">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-sub-column"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="目录">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-mulu"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="帮助">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-help"></use>
            </svg>
          </div>
          <div class={`${prefix}-toolbar-item`} title="源码">
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-github"></use>
            </svg>
          </div>
        </div>
      </div>
    );
  }
});
