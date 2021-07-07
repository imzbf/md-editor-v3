import { defineComponent, reactive, ref } from 'vue';
import Divider from '../../components/Divider';
import Dropdown from '../../components/Dropdown';
import { prefix } from '../../Editor';
import bus from '../../utils/event-bus';
import { goto, ToolDirective } from '../../utils';
import screenfull from 'screenfull';

export default defineComponent({
  name: 'MDEditorToolbar',
  setup() {
    const visible = reactive({
      title: false
    });

    const emitHandler = (direct: ToolDirective) => {
      bus.emit('replace', direct);
    };

    const fullScreen = () => {
      if (screenfull.isEnabled) {
        if (screenfull.isFullscreen) {
          screenfull.exit();
        } else screenfull.request();
      } else {
        console.error('浏览器不支持全屏');
      }
    };

    const isFullscreen = ref(false);

    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        isFullscreen.value = !isFullscreen.value;
      });
    }

    return () => (
      <div class={`${prefix}-toolbar`}>
        <div class={`${prefix}-toolbar-left`}>
          <div
            class={`${prefix}-toolbar-item`}
            title="加粗"
            onClick={(e) => {
              emitHandler('bold');
            }}
          >
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-bold"></use>
            </svg>
          </div>
          <div
            class={`${prefix}-toolbar-item`}
            title="下划线"
            onClick={() => {
              emitHandler('underline');
            }}
          >
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-underline"></use>
            </svg>
          </div>
          <div
            class={`${prefix}-toolbar-item`}
            title="斜体"
            onClick={() => {
              emitHandler('italic');
            }}
          >
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-italic"></use>
            </svg>
          </div>
          <div
            class={`${prefix}-toolbar-item`}
            title="删除线"
            onClick={() => {
              emitHandler('strikeThrough');
            }}
          >
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-strike-through"></use>
            </svg>
          </div>
          <Divider />
          <Dropdown
            visible={visible.title}
            onChange={(v) => {
              visible.title = v;
            }}
            overlay={
              <ul
                class={`${prefix}-menu`}
                onClick={() => {
                  visible.title = false;
                }}
              >
                <li
                  class={`${prefix}-menu-item`}
                  onClick={() => {
                    emitHandler('h1');
                  }}
                >
                  一级标题
                </li>
                <li
                  class={`${prefix}-menu-item`}
                  onClick={() => {
                    emitHandler('h2');
                  }}
                >
                  二级标题
                </li>
                <li
                  class={`${prefix}-menu-item`}
                  onClick={() => {
                    emitHandler('h3');
                  }}
                >
                  三级标题
                </li>
                <li
                  class={`${prefix}-menu-item`}
                  onClick={() => {
                    emitHandler('h4');
                  }}
                >
                  四级标题
                </li>
                <li
                  class={`${prefix}-menu-item`}
                  onClick={() => {
                    emitHandler('h5');
                  }}
                >
                  五级标题
                </li>
                <li
                  class={`${prefix}-menu-item`}
                  onClick={() => {
                    emitHandler('h6');
                  }}
                >
                  六级标题
                </li>
              </ul>
            }
          >
            <div class={`${prefix}-toolbar-item`} title="标题">
              <svg class={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-title"></use>
              </svg>
            </div>
          </Dropdown>
          <div
            class={`${prefix}-toolbar-item`}
            title="下标"
            onClick={() => {
              emitHandler('sub');
            }}
          >
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-sub"></use>
            </svg>
          </div>
          <div
            class={`${prefix}-toolbar-item`}
            title="上标"
            onClick={() => {
              emitHandler('sup');
            }}
          >
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-sup"></use>
            </svg>
          </div>
          <div
            class={`${prefix}-toolbar-item`}
            title="引用"
            onClick={() => {
              emitHandler('quote');
            }}
          >
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-quote"></use>
            </svg>
          </div>
          <div
            class={`${prefix}-toolbar-item`}
            title="无序列表"
            onClick={() => {
              emitHandler('unorderedList');
            }}
          >
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-unordered-list"></use>
            </svg>
          </div>
          <div
            class={`${prefix}-toolbar-item`}
            title="有序列表"
            onClick={() => {
              emitHandler('orderedList');
            }}
          >
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-ordered-list"></use>
            </svg>
          </div>
          <Divider />
          <div
            class={`${prefix}-toolbar-item`}
            title="行内代码"
            onClick={() => {
              emitHandler('codeRow');
            }}
          >
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-code-row"></use>
            </svg>
          </div>
          <div
            class={`${prefix}-toolbar-item`}
            title="代码块"
            onClick={() => {
              emitHandler('code');
            }}
          >
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
          <div class={`${prefix}-toolbar-item`} title="全屏放大" onClick={fullScreen}>
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use
                xlinkHref={`#icon-${
                  isFullscreen.value ? 'fullScreen-exit' : 'fullScreen'
                }`}
              ></use>
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
          <div
            class={`${prefix}-toolbar-item`}
            title="源码"
            onClick={() => goto('https://github.com/imzbf/md-editor-v3')}
          >
            <svg class={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-github"></use>
            </svg>
          </div>
        </div>
      </div>
    );
  }
});
