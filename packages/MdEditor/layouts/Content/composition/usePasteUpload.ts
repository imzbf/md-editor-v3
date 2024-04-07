import { ShallowRef, inject } from 'vue';
import bus from '~/utils/event-bus';
import { ContentProps } from '../props';
import { ERROR_CATCHER, REPLACE, UPLOAD_IMAGE } from '~/static/event-name';
import CodeMirrorUt from '../codemirror';

/**
 * 处理粘贴板
 */
const usePasteUpload = (
  props: ContentProps,
  codeMirrorUt: ShallowRef<CodeMirrorUt | undefined>
) => {
  const editorId = inject('editorId') as string;

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
      bus.emit(editorId, REPLACE, 'universal', {
        generate() {
          return {
            targetValue: props.transformImgUrl(targetValue)
          };
        }
      });

      e.preventDefault();
      return;
    } else if (templateIn) {
      const matchArr = targetValue.match(/(?<=!\[.*\]\()\S+(?=\s?["']?.*["']?\))/);

      bus.emit(editorId, REPLACE, 'universal', {
        generate() {
          return {
            targetValue: matchArr
              ? targetValue.replace(matchArr[0], props.transformImgUrl(matchArr[0]))
              : targetValue
          };
        }
      });

      e.preventDefault();
      return;
    }

    // 识别vscode代码
    if (props.autoDetectCode && e.clipboardData.types.includes('vscode-editor-data')) {
      const vscCoodInfo = JSON.parse(e.clipboardData.getData('vscode-editor-data'));

      bus.emit(editorId, REPLACE, 'code', {
        mode: vscCoodInfo.mode,
        text: e.clipboardData.getData('text/plain')
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
