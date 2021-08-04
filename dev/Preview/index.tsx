import { defineComponent, reactive, PropType, onMounted, onUnmounted, ref } from 'vue';
import Editor from '../../MdEditor';
import { mdText } from '../data';
import { Theme } from '../App';
import axios from 'axios';

import './index.less';

const SAVE_KEY = 'XHMPGLJIZTDB';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>
  },
  setup(props) {
    const storagedText = localStorage.getItem(SAVE_KEY) || '';
    const md = reactive({
      text: storagedText || mdText
    });

    // 自动保存
    let taskId = -1;
    onMounted(() => {
      taskId = window.setInterval(() => {
        localStorage.setItem(SAVE_KEY, md.text);
      }, 10_000);
    });

    onUnmounted(() => {
      clearInterval(taskId);
    });
    // -----end-----

    const ddd = ref(true);

    return () => (
      <div class="project-preview">
        <div class="container">
          <button
            onClick={() => {
              ddd.value = !ddd.value;
            }}
          >
            点我
          </button>
          {JSON.stringify(ddd.value)}
          <Editor
            theme={props.theme}
            modelValue={md.text}
            prettier={ddd.value}
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
            tips：本页上方的编辑器有localstorage保存功能，可手动点击保存触发，编辑器每10秒钟会自己保存一次，可用于一些文档的编辑。下方的文档内容也是使用该编辑器完成~
          </span>
        </div>
      </div>
    );
  }
});
