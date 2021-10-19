import { defineComponent, reactive, PropType, onUnmounted, watch } from 'vue';
import Editor from 'md-editor-v3';
import { mdText, mdEnText } from '../../data';
import { Theme } from '../../App';
import axios from '@/utils/request';
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
        clearTimeout(taskId);
        taskId = window.setTimeout(() => {
          localStorage.setItem(SAVE_KEY, md.text);
        }, 2_000);
      }
    );

    onUnmounted(() => {
      clearTimeout(taskId);
    });
    // -----end-----

    const store = useStore();

    watch(
      () => store.state.lang,
      (nVal) => {
        if (nVal === 'zh-CN') {
          md.text = storagedText || mdText;
        } else {
          md.text = storagedText || mdEnText;
        }
      }
    );

    return () => (
      <div class="project-preview">
        <div class="container">
          <Editor
            editorId="md-prev"
            language={store.state.lang}
            theme={store.state.theme}
            previewTheme={store.state.previewTheme}
            modelValue={md.text}
            onSave={(v) => {
              localStorage.setItem(SAVE_KEY, v);
            }}
            markedHeading={(text, level) => `<h${level}>${text}</h${level}>`}
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
            {store.state.lang === 'zh-CN'
              ? 'Tips：本页上方的编辑器有localstorage保存功能，每次操作后两秒会自己保存一次，可手动点击保存触发，可用于一些文档的编辑。'
              : 'Tips: The editor in this page will save text to localstorage auto, and you can save text by yourself also. Wish this function can be used to edit some temporary document.'}
          </span>
        </div>
      </div>
    );
  }
});
