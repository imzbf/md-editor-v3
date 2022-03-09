import { defineComponent, reactive, PropType, onUnmounted, watch } from 'vue';
import Editor from '../../MdEditor';
import { mdText } from '../data';
import { Theme } from '../App';
import axios from 'axios';
// import katex from 'katex';
// import 'katex/dist/katex.min.css';

import './index.less';

const SAVE_KEY = 'XHMPGLJIZTDB';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>
  },
  setup(props) {
    const storagedText = localStorage.getItem(SAVE_KEY) || '';
    const md = reactive({
      text: storagedText || mdText,
      visible: false
    });

    // 自动保存
    let taskId = -1;
    watch(
      () => md.text,
      () => {
        clearInterval(taskId);
        taskId = window.setTimeout(() => {
          localStorage.setItem(SAVE_KEY, md.text);
        }, 2_000);
      }
    );

    onUnmounted(() => {
      clearInterval(taskId);
    });
    // -----end-----

    return () => (
      <div class="project-preview">
        <div class="container">
          <Editor
            editorId="md-prev"
            theme={props.theme}
            modelValue={md.text}
            // katex={katex}
            onSave={(v) => {
              localStorage.setItem(SAVE_KEY, v);
            }}
            // toolbars={['bold', 'link', '=', 'prettier', 'link']}
            // toolbarsExclude={['github']}
            onChange={(value) => (md.text = value)}
            onUploadImg={async (files: FileList, callback: (urls: string[]) => void) => {
              const res = await Promise.all(
                Array.from(files).map((file) => {
                  return new Promise((rev, rej) => {
                    const form = new FormData();
                    form.append('file', file);

                    axios
                      .post('/api/img/upload', form, {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }
                      })
                      .then((res) => rev(res))
                      .catch((error) => rej(error));
                  });
                })
              );

              callback(res.map((item: any) => item.data.url));
            }}
            toolbars={[
              'bold',
              'underline',
              'italic',
              'strikeThrough',
              '-',
              'title',
              'sub',
              'sup',
              'quote',
              'unorderedList',
              'orderedList',
              '-',
              'codeRow',
              'code',
              'link',
              'image',
              'table',
              'mermaid',
              'katex',
              '-',
              'revoke',
              'next',
              'save',
              0,
              1,
              '=',
              'prettier',
              'pageFullscreen',
              'fullscreen',
              'preview',
              'htmlPreview',
              'catalog',
              'github'
            ]}
            defToolbars={
              <>
                <Editor.NormalToolbar
                  trigger={
                    <svg class={`md-icon`} aria-hidden="true">
                      <use xlinkHref="#icon-strike-through" />
                    </svg>
                  }
                ></Editor.NormalToolbar>
                <Editor.DropdownToolbar
                  visible={md.visible}
                  trigger={
                    <svg class={`md-icon`} aria-hidden="true">
                      <use xlinkHref="#icon-strike-through" />
                    </svg>
                  }
                  onChange={(visible) => {
                    md.visible = visible;
                  }}
                  overlay={<div>下拉内容</div>}
                ></Editor.DropdownToolbar>
              </>
            }
          ></Editor>
          <br />
          <span class="tips-text">
            tips：本页上方的编辑器有localstorage保存功能，可手动点击保存触发，每次操作后两秒会自己保存一次，可用于一些文档的编辑。
          </span>
        </div>
      </div>
    );
  }
});
