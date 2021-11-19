import { defineComponent, reactive, PropType, watch } from 'vue';
import Editor from 'md-editor-v3';
import { mdText, mdEnText } from '../../data';
import { Theme } from '../../App';
import axios from '@/utils/request';
import './index.less';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>
  },
  setup() {
    const md = reactive({
      text: mdText
    });

    const store = useStore();

    watch(
      () => store.state.lang,
      (nVal) => {
        if (nVal === 'zh-CN') {
          md.text = mdText;
        } else {
          md.text = mdEnText;
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
            onChange={(value: string) => (md.text = value)}
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
              ? 'Tips：本页展示编辑器localstorage存储功能已移除！'
              : 'Tips: The editor in this page can not save text to localstorage now!'}
          </span>
        </div>
      </div>
    );
  }
});
