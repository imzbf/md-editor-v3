/* eslint-disable vue/require-default-prop */
import {
  defineComponent,
  reactive,
  PropType,
  onUnmounted,
  watch,
  ref,
  onMounted
} from 'vue';
import Editor, { ExposeParam } from '../../MdEditor';
import mdText from '../data.md';
import { Theme } from '../App';
import axios from 'axios';
import 'katex/dist/katex.min.css';

// import { Extension } from '@codemirror/state';
import { lineNumbers } from '@codemirror/view';
// import screenfull from 'screenfull';
// import katex from 'katex';
// import Cropper from 'cropperjs';
// import 'cropperjs/dist/cropper.css';
// import mermaid from 'mermaid';
// import highlight from 'highlight.js';
// import 'highlight.js/styles/tokyo-night-dark.css';

// import prettier from 'prettier';
// import parserMarkdown from 'prettier/parser-markdown';

import './index.less';

// import { cdnBase } from '../../MdEditor/config';

Editor.config({
  codeMirrorExtensions(theme, extensions, keyBindings) {
    // console.log(theme, extensions, keyBindings);

    // return extensions;
    return [...extensions, lineNumbers()];
  },
  // markedRenderer(renderer) {
  //   renderer.link = (href, title, text) => {
  //     return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
  //   };

  //   renderer.image = (href: string, _: string, desc: string) => {
  //     return `<img src="${href}" alt="${desc}">`;
  //   };

  //   return renderer;
  // },
  editorExtensions: {
    // prettier: {
    //   prettierInstance: prettier,
    //   parserMarkdownInstance: parserMarkdown
    // },
    highlight: {
      // instance: highlight
      // css: {
      //   'tokyo-night': {
      //     light: `${cdnBase}/highlight.js/11.5.1/styles/tokyo-night-light.min.css`,
      //     dark: `${cdnBase}/highlight.js/11.5.1/styles/tokyo-night-dark.min.css`
      //   }
      // }
    }
    // screenfull: {
    //   instance: screenfull
    // },
    // katex: {
    //   instance: katex
    // },
    // cropper: {
    //   instance: Cropper
    // },
    // mermaid: {
    //   instance: mermaid
    // }
  }
});

const SAVE_KEY = 'XHMPGLJIZTDB';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>,
    previewTheme: String as PropType<string>,
    codeTheme: String as PropType<string>,
    lang: String as PropType<string>
  },
  setup(props) {
    const storagedText = localStorage.getItem(SAVE_KEY) || '';
    const md = reactive({
      text: storagedText || mdText,
      text2: 'Hello world',
      visible: false,
      modalVisible: false,
      isFullscreen: false
    });

    const editorRef = ref<ExposeParam>();

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

    onMounted(() => {
      editorRef.value?.on('preview', (status) => {
        console.log('preview', status);
      });

      editorRef.value?.on('htmlPreview', (status) => {
        console.log('htmlPreview', status);
      });

      editorRef.value?.on('pageFullscreen', (status) => {
        console.log('pageFullscreen', status);
      });

      editorRef.value?.on('fullscreen', (status) => {
        console.log('fullscreen', status);
      });

      editorRef.value?.on('catalog', (status) => {
        console.log('catalog', status);
      });
    });

    onUnmounted(() => {
      clearInterval(taskId);
    });
    // -----end-----

    return () => (
      <div class="project-preview">
        <div
          style={{
            width: '200px',
            padding: '10px',
            border: '1px solid #666',
            position: 'fixed',
            right: '10px',
            top: '170px'
          }}
        >
          <Editor.MdCatalog editorId="md-prev" theme={props.theme} />
        </div>
        <button
          style={{
            position: 'absolute',
            left: '10px',
            top: '10px',
            zIndex: 1000000
          }}
          onClick={() => {
            // editorRef.value?.toggleFullscreen();
            // editorRef.value?.togglePageFullscreen();
            // editorRef.value?.toggleCatalog();
            // editorRef.value?.toggleHtmlPreview();
            // editorRef.value?.togglePreview();
            // editorRef.value?.triggerSave();
            // editorRef.value?.insert((selectedText) => {
            //   return {
            //     targetValue: `@${selectedText}@`,
            //     select: false,
            //     deviationStart: 0,
            //     deviationEnd: 0
            //   };
            // });
            // editorRef.value?.focus();
          }}
        >
          1
        </button>
        <div class="container">
          <Editor
            ref={editorRef}
            editorId="md-prev"
            previewTheme={props.previewTheme}
            theme={props.theme}
            modelValue={md.text}
            // pageFullscreen
            // preview={false}
            // htmlPreview
            language={props.lang}
            // toolbarsExclude={['github']}
            // noPrettier
            // tabWidth={4}
            showCodeRowNumber
            // katex={katex}
            // tableShape={[10, 10]}
            // noMermaid
            // placeholder="placeholder"
            // noKatex
            // markedHeadingId={(t, l, index) => `heading-${index}`}
            // sanitize={(h) => `<a href="#">aaa</a>${h}`}
            // scrollAuto={false}
            // noIconfont
            // codeStyleReverse={false}
            // codeStyleReverseList={['mk-cute']}
            // autoFocus
            // disabled
            // readOnly
            // maxLength={10}
            // autoDetectCode
            onSave={(v, h) => {
              console.log('onSave');
              h.then((html) => {
                console.log('onSaveAsync', html);
              });
              localStorage.setItem(SAVE_KEY, v);
            }}
            codeTheme={props.codeTheme}
            // toolbars={['bold', 'link', '=', 'prettier', 'link']}
            // toolbarsExclude={['github']}
            onChange={(value) => (md.text = value)}
            onUploadImg={async (
              files: Array<File>,
              callback: (urls: string[]) => void
            ) => {
              const res = await Promise.all(
                files.map((file) => {
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
            formatCopiedText={(text: string) => {
              return `${text} \nfrom @imzbf`;
            }}
            onError={(error) => {
              console.log(error);
            }}
            // onBlur={console.log}
            // onFocus={console.log}
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
              'task',
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
              2,
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
                  title="普通扩展"
                  trigger={
                    <svg class={`md-editor-icon`} aria-hidden="true">
                      <use xlinkHref="#md-editor-icon-strike-through" />
                    </svg>
                  }
                ></Editor.NormalToolbar>
                <Editor.DropdownToolbar
                  title="下拉扩展"
                  visible={md.visible}
                  trigger={
                    <svg class={`md-editor-icon`} aria-hidden="true">
                      <use xlinkHref="#md-editor-icon-strike-through" />
                    </svg>
                  }
                  onChange={(visible) => {
                    md.visible = visible;
                  }}
                  overlay={<div>下拉内容</div>}
                ></Editor.DropdownToolbar>
                <Editor.ModalToolbar
                  title="弹窗扩展"
                  modalTitle="外置弹窗"
                  showAdjust
                  visible={md.modalVisible}
                  isFullscreen={md.isFullscreen}
                  onAdjust={(isFullscreen) => {
                    md.isFullscreen = isFullscreen;
                  }}
                  trigger={
                    <svg class={`md-editor-icon`} aria-hidden="true">
                      <use xlinkHref="#md-editor-icon-strike-through" />
                    </svg>
                  }
                  onClick={() => {
                    md.modalVisible = true;
                  }}
                  onClose={() => {
                    md.modalVisible = false;
                  }}
                >
                  <div
                    style={{
                      width: '500px',
                      height: '300px'
                    }}
                  ></div>
                </Editor.ModalToolbar>
              </>
            }
            footers={['markdownTotal', '=', 0, 'scrollSwitch']}
            defFooters={
              <>
                <span>^_^</span>
              </>
            }
          ></Editor>
          <br />
          {/* <Editor
            editorId="md-prev-2"
            theme={props.theme}
            previewTheme={props.previewTheme}
            codeTheme={props.codeTheme}
            modelValue={md.text2}
            onChange={(value) => (md.text2 = value)}
          /> */}
        </div>
      </div>
    );
  }
});
