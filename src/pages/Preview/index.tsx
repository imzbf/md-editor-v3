import { defineComponent, reactive, PropType, onUnmounted, watch } from 'vue';
import Editor from 'md-editor-v3';
import { mdText } from '../../data';
import { Theme } from '../../App';
import axios from 'axios';
import './index.less';
import { useStore } from 'vuex';

const SAVE_KEY = 'XHMPGLJIZTDB';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>
  },
  setup() {
    const storagedText = localStorage.getItem(SAVE_KEY) || '';
    const md = reactive({
      text: storagedText || mdText
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

    const store = useStore();

    return () => (
      <div class="project-preview">
        <div class="container">
          <Editor
            editorId="md-prev"
            theme={store.state.theme}
            previewTheme={store.state.previewTheme}
            modelValue={md.text}
            onSave={(v) => {
              localStorage.setItem(SAVE_KEY, v);
            }}
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
          />
          <br />
          <span class="tips-text">
            tips：本页上方的编辑器有localstorage保存功能，可手动点击保存触发，每次操作后两秒会自己保存一次，可用于一些文档的编辑。
          </span>
        </div>
      </div>
    );
  }
});
