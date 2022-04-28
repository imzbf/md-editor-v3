import { defineComponent, reactive, PropType, onUnmounted, watch } from 'vue';
import Editor from '../../MdEditor';
import { mdText } from '../data';
import { Theme } from '../App';
import axios from 'axios';
import 'katex/dist/katex.min.css';

import highlight from 'highlight.js';
import screenfull from 'screenfull';
import katex from 'katex';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import mermaid from 'mermaid';

import 'highlight.js/styles/atom-one-dark.css';

import './index.less';

Editor.config({
  markedRenderer(renderer) {
    renderer.link = (href, title, text) => {
      return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
    };

    renderer.image = (href: string, _: string, desc: string) => {
      return `<img src="${href}" alt="${desc}">`;
    };

    return renderer;
  },
  editorExtensions: {
    highlight: {
      instance: highlight
    },
    screenfull: {
      instance: screenfull
    },
    katex: {
      instance: katex
    },
    cropper: {
      instance: Cropper
    },
    mermaid: {
      instance: mermaid
    }
  }
});

const SAVE_KEY = 'XHMPGLJIZTDB';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>
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
          <Editor.Catalog editorId="md-prev" theme={props.theme} />
        </div>
        <div class="container">
          <Editor
            editorId="md-prev"
            previewTheme="mk-cute"
            theme={props.theme}
            modelValue={md.text}
            // katex={katex}
            onSave={(v) => {
              localStorage.setItem(SAVE_KEY, v);
            }}
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
            onError={(error) => {
              console.log(error);
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
                    <svg class={`md-icon`} aria-hidden="true">
                      <use xlinkHref="#icon-strike-through" />
                    </svg>
                  }
                ></Editor.NormalToolbar>
                <Editor.DropdownToolbar
                  title="下拉扩展"
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
                    <svg class={`md-icon`} aria-hidden="true">
                      <use xlinkHref="#icon-strike-through" />
                    </svg>
                  }
                  onClick={() => {
                    md.modalVisible = true;
                  }}
                  onClosed={() => {
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
          ></Editor>
          <br />
          <Editor
            editorId="md-prev-2"
            theme={props.theme}
            modelValue={md.text2}
            onChange={(value) => (md.text2 = value)}
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
