import { ShallowRef, inject } from 'vue';
import CodeMirrorUt from '../codemirror';
import { ContentProps } from '../props';
import { ERROR_CATCHER, UPLOAD_IMAGE } from '~/static/event-name';
import bus from '~/utils/event-bus';
import { emitReplace } from '~/utils/replace';

/**
 * 处理粘贴板
 */
const usePasteUpload = (
  props: ContentProps,
  codeMirrorUt: ShallowRef<CodeMirrorUt | undefined>
) => {
  const editorId = inject('editorId') as string;

  const imgInsert = (tv: string | Promise<string>) => {
    if (tv instanceof Promise) {
      tv.then((targetValue) => {
        emitReplace(editorId, {
          direct: 'universal',
          params: {
            generate() {
              return {
                targetValue
              };
            }
          }
        });
      }).catch((err) => {
        console.error(err);
      });
    } else {
      emitReplace(editorId, {
        direct: 'universal',
        params: {
          generate() {
            return {
              targetValue: tv
            };
          }
        }
      });
    }
  };

  // 粘贴板上传
  const pasteHandler = (e: ClipboardEvent) => {
    if (!e.clipboardData) {
      return;
    }

    // 处理文件
    if (e.clipboardData.files.length > 0) {
      const { files } = e.clipboardData;

      bus.emit(
        editorId,
        UPLOAD_IMAGE,
        Array.from(files).filter((file) => {
          return /image\/.*/.test(file.type);
        })
      );

      e.preventDefault();
      return;
    }
    const targetValue = e.clipboardData.getData('text/plain');

    const to = codeMirrorUt.value?.view.state.selection.main.to || 0;
    const from = codeMirrorUt.value?.view.state.doc.lineAt(to).from || 0;
    // 当前光标到当前行开头的字符串
    const lineStart = codeMirrorUt.value?.view.state.doc.sliceString(from, to) || '';

    // 图片语法在当前行开头
    const templateStart = /!\[.*\]\(\s*$/.test(lineStart);
    // 图片语法在粘贴的内容中
    const templateIn = /!\[.*\]\((.*)\s?.*\)/.test(targetValue);

    if (templateStart) {
      const tv = props.transformImgUrl(targetValue);
      imgInsert(tv);

      e.preventDefault();
      return;
    } else if (templateIn) {
      const matchArr = targetValue.match(/(?<=!\[.*\]\()([^)\s]+)(?=\s?["']?.*["']?\))/g);

      if (matchArr) {
        // transformImgUrl 同时支持同步值和 Promise，先归一化后再统一替换所有链接。
        Promise.all(
          matchArr.map((img) => {
            return Promise.resolve(props.transformImgUrl(img));
          })
        )
          .then((newUrls) => {
            imgInsert(
              newUrls.reduce((prev, curr, index) => {
                return prev.replace(matchArr[index], curr);
              }, targetValue)
            );
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        imgInsert(targetValue);
      }

      e.preventDefault();
      return;
    }

    // 识别vscode代码
    if (props.autoDetectCode && e.clipboardData.types.includes('vscode-editor-data')) {
      const vscCoodInfo = JSON.parse(e.clipboardData.getData('vscode-editor-data'));

      emitReplace(editorId, {
        direct: 'code',
        params: {
          mode: vscCoodInfo.mode,
          text: e.clipboardData.getData('text/plain')
        }
      });

      e.preventDefault();
      return;
    }

    if (
      props.maxlength &&
      targetValue.length + props.modelValue.length > props.maxlength
    ) {
      bus.emit(editorId, ERROR_CATCHER, {
        name: 'overlength',
        message: 'The input text is too long',
        data: targetValue
      });
    }
  };

  return pasteHandler;
};

export default usePasteUpload;
