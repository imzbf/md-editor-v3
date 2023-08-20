import { inject } from 'vue';
import bus from '~/utils/event-bus';
import { ContentProps } from '../props';

/**
 * 处理粘贴板
 */
const usePasteUpload = (props: ContentProps) => {
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
        'uploadImage',
        Array.from(files).filter((file) => {
          return /image\/.*/.test(file.type);
        })
      );

      e.preventDefault();
      return;
    }

    // 识别vscode代码
    if (props.autoDetectCode && e.clipboardData.types.includes('vscode-editor-data')) {
      const vscCoodInfo = JSON.parse(e.clipboardData.getData('vscode-editor-data'));

      bus.emit(editorId, 'replace', 'code', {
        mode: vscCoodInfo.mode,
        text: e.clipboardData.getData('text/plain')
      });

      e.preventDefault();
      return;
    }

    const targetValue = e.clipboardData.getData('text/plain');
    if (
      props.maxlength &&
      targetValue.length + props.modelValue.length > props.maxlength
    ) {
      bus.emit(editorId, 'errorCatcher', {
        name: 'overlength',
        message: 'The input text is too long',
        data: targetValue
      });
    }
  };

  return pasteHandler;
};

export default usePasteUpload;
