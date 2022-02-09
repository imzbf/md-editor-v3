import { defineComponent, reactive, PropType, watch } from 'vue';
import Editor from 'md-editor-v3';
import { mdText, mdEnText } from '../../data';
import { Theme } from '../../App';
import axios from '@/utils/request';
import './index.less';
import { useStore } from 'vuex';

import { emojis } from './data';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>
  },
  setup() {
    const data = reactive({
      text: mdText,
      emojiVisible: false
    });

    const store = useStore();

    watch(
      () => store.state.lang,
      (nVal: string) => {
        if (nVal === 'zh-CN') {
          data.text = mdText;
        } else {
          data.text = mdEnText;
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
            modelValue={data.text}
            onChange={(value: string) => (data.text = value)}
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
              0,
              '-',
              'revoke',
              'next',
              'save',
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
                <Editor.DropdownToolbar
                  visible={data.emojiVisible}
                  onChange={(visible) => {
                    data.emojiVisible = visible;
                  }}
                  overlay={
                    <>
                      <div class="emoji-container">
                        <ol class="emojis">
                          {emojis.map((emoji, index) => (
                            <li key={`emoji-${index}`}>{emoji}</li>
                          ))}
                        </ol>
                      </div>
                    </>
                  }
                  trigger={
                    <svg class="icon" aria-hidden="true">
                      <use xlinkHref="#icon-emoji"></use>
                    </svg>
                  }
                ></Editor.DropdownToolbar>
              </>
            }
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
