import bus from '~/utils/event-bus';
import { configOption } from '~/config';
import { InsertContentGenerator, UploadImgCallBackParam } from '~/type';
import CodeMirrorUt from '~/layouts/Content/codemirror';
import { ERROR_CATCHER } from '~/static/event-name';

export type ToolDirective =
  | 'bold'
  | 'underline'
  | 'italic'
  | 'strikeThrough'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'quote'
  | 'unorderedList'
  | 'orderedList'
  | 'task'
  | 'codeRow'
  | 'code'
  | 'link'
  | 'image'
  | 'table'
  | 'sub'
  | 'sup'
  | 'prettier'
  | 'flow'
  | 'sequence'
  | 'gantt'
  | 'class'
  | 'state'
  | 'pie'
  | 'relationship'
  | 'journey'
  | 'katexInline'
  | 'katexBlock'
  | 'universal';

/**
 *
 * @param direct 操作指令
 * @param codeMirrorUt 编辑区辅助实例
 * @param params 自定义参数
 *
 * @returns string
 */
export const directive2flag = async (
  direct: ToolDirective,
  codeMirrorUt: CodeMirrorUt,
  params?: any
) => {
  // 目标值
  let targetValue = '';
  // 光标开始位置偏移量
  let deviationStart = 0;
  // 结束位置偏移量
  let deviationEnd = 0;
  // 是否选中
  let select = true;
  // 直接替换所有文本
  let replaceAll = false;

  const selectedText = codeMirrorUt.getSelectedText();

  const mermaidTemplate = configOption.editorConfig.mermaidTemplate;

  if (/^h[1-6]{1}$/.test(direct)) {
    const pix = direct.replace(/^h(\d)/, (_, num) => {
      return new Array(Number(num)).fill('#', 0, num).join('');
    });

    targetValue = `${pix} ${selectedText}`;
    deviationStart = pix.length + 1;
  } else if (direct === 'prettier') {
    const prettier =
      window.prettier || configOption.editorExtensions.prettier!.prettierInstance;

    const prettierPlugins = [
      window.prettierPlugins?.markdown ||
        configOption.editorExtensions.prettier!.parserMarkdownInstance
    ];

    if (!prettier || prettierPlugins[0] === undefined) {
      // CATCH ERROR: 捕获全局错误
      bus.emit(params.editorId, ERROR_CATCHER, {
        name: 'prettier',
        message: 'prettier is undefined'
      });
      targetValue = codeMirrorUt.getValue();
    } else {
      targetValue = await prettier.format(codeMirrorUt.getValue(), {
        parser: 'markdown',
        plugins: prettierPlugins
      });
    }

    select = false;
    replaceAll = true;
  } else {
    switch (direct) {
      case 'bold': {
        targetValue = `**${selectedText}**`;
        deviationStart = 2;
        deviationEnd = -2;
        break;
      }
      case 'underline': {
        targetValue = `<u>${selectedText}</u>`;
        deviationStart = 3;
        deviationEnd = -4;
        break;
      }
      case 'italic': {
        targetValue = `*${selectedText}*`;
        deviationStart = 1;
        deviationEnd = -1;
        break;
      }
      case 'strikeThrough': {
        targetValue = `~~${selectedText}~~`;
        deviationStart = 2;
        deviationEnd = -2;
        break;
      }
      case 'sub': {
        targetValue = `<sub>${selectedText}</sub>`;
        deviationStart = 5;
        deviationEnd = -6;
        break;
      }
      case 'sup': {
        targetValue = `<sup>${selectedText}</sup>`;
        deviationStart = 5;
        deviationEnd = -6;
        break;
      }
      case 'codeRow': {
        targetValue = '`' + selectedText + '`';
        deviationStart = 1;
        deviationEnd = -1;
        break;
      }
      case 'quote': {
        targetValue = `> ${selectedText}`;
        deviationStart = 2;
        break;
      }
      case 'orderedList': {
        targetValue = `1. ${selectedText}`;
        deviationStart = 3;
        break;
      }
      case 'unorderedList': {
        targetValue = `- ${selectedText}`;
        deviationStart = 2;
        break;
      }
      case 'task': {
        targetValue = `- [ ] ${selectedText}`;
        deviationStart = 6;
        break;
      }
      case 'code': {
        // 插入的内容
        const text = params.text || selectedText || '';
        // 代码的类型
        const mode = params.mode || 'language';
        targetValue = `\`\`\`${mode}\n${text}\n\`\`\`\n`;
        deviationStart = 3;
        deviationEnd = 3 + mode.length - targetValue.length;
        break;
      }
      case 'table': {
        targetValue = '|';
        // '| col | col |\n| - | - |\n| content | content |\n'

        const { selectedShape = { x: 1, y: 1 } } = params;
        const { x, y } = selectedShape;

        // 添加表头
        for (let i = 0; i <= y; i++) {
          targetValue += ' col |';
        }

        // 添加分隔
        targetValue += '\n|';
        for (let i = 0; i <= y; i++) {
          targetValue += ' - |';
        }

        // 添加内容
        for (let row = 0; row <= x; row++) {
          targetValue += '\n|';
          for (let col = 0; col <= y; col++) {
            targetValue += ' content |';
          }
        }

        deviationStart = 2;
        deviationEnd = 5 - targetValue.length;
        break;
      }
      case 'link': {
        const { desc, url } = params;
        targetValue = `[${desc}](${url})`;
        select = false;
        break;
      }
      case 'image': {
        const { desc, url, urls } = params;

        if (urls instanceof Array) {
          targetValue = (urls as UploadImgCallBackParam).reduce<string>((pVal, _url) => {
            const {
              url = '',
              alt = '',
              title = ''
            } = typeof _url === 'object' ? _url : { url: _url };

            // ![alt](url 'title')
            return pVal + `![${alt}](${url}${title ? " '" + title + "'" : ''})\n`;
          }, '');
        } else {
          targetValue = `![${desc}](${url})\n`;
        }

        select = false;

        break;
      }
      // 流程图
      case 'flow': {
        targetValue = `\`\`\`mermaid\n${
          mermaidTemplate?.flow || 'flowchart TD \n  Start --> Stop'
        }\n\`\`\`\n`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }
      // 时序图
      case 'sequence': {
        targetValue = `\`\`\`mermaid\n${
          mermaidTemplate?.sequence ||
          'sequenceDiagram\n  A->>B: hello!\n  B-->>A: hi!\n  A-)B: bye!'
        }\n\`\`\`\n`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }
      // 甘特图
      case 'gantt': {
        targetValue = `\`\`\`mermaid\n${
          mermaidTemplate?.gantt ||
          'gantt\ntitle A Gantt Diagram\ndateFormat  YYYY-MM-DD\nsection Section\nA task  :a1, 2014-01-01, 30d\nAnother task  :after a1, 20d'
        }\n\`\`\`\n`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }
      // 类图
      case 'class': {
        targetValue = `\`\`\`mermaid\n${
          mermaidTemplate?.class || 'classDiagram\n  class Animal\n  Vehicle <|-- Car'
        }\n\`\`\`\n`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }
      // 状态图
      case 'state': {
        targetValue = `\`\`\`mermaid\n${
          mermaidTemplate?.state || 'stateDiagram-v2\n  s1 --> s2'
        }\n\`\`\`\n`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }
      // 饼图
      case 'pie': {
        targetValue = `\`\`\`mermaid\n${
          mermaidTemplate?.pie ||
          'pie title Pets adopted by volunteers\n  "Dogs" : 386\n  "Cats" : 85\n  "Rats" : 15'
        }\n\`\`\`\n`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }

      // 关系图
      case 'relationship': {
        targetValue = `\`\`\`mermaid\n${
          mermaidTemplate?.relationship ||
          'erDiagram\n  CAR ||--o{ NAMED-DRIVER : allows\n  PERSON ||--o{ NAMED-DRIVER : is'
        }\n\`\`\`\n`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }

      // 旅程图
      case 'journey': {
        targetValue = `\`\`\`mermaid\n${
          mermaidTemplate?.journey ||
          'journey\n  title My working day\n  section Go to work\n    Make tea: 5: Me\n    Go upstairs: 3: Me\n    Do work: 1: Me, Cat\n  section Go home\n    Go downstairs: 5: Me\n    Sit down: 5: Me'
        }\n\`\`\`\n`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }
      // 行内公式
      case 'katexInline': {
        targetValue = '$$';
        deviationStart = 1;
        deviationEnd = -1;
        break;
      }
      // 行内公式
      case 'katexBlock': {
        targetValue = '$$\n\n$$\n';
        deviationStart = 3;
        deviationEnd = -4;
        break;
      }

      // 通用插入
      case 'universal': {
        const { generate } = params as { generate: InsertContentGenerator };
        const insertOptions = generate(selectedText);

        targetValue = insertOptions.targetValue;
        select = insertOptions.select ?? true;
        deviationStart = insertOptions.deviationStart || 0;
        deviationEnd = insertOptions.deviationEnd || 0;
      }
    }
  }

  return {
    text: targetValue,
    options: {
      // 是否选中
      select,
      // 选中时，开始位置的偏移量
      deviationStart,
      // 结束的偏移量
      deviationEnd,
      // 是否整个替换
      replaceAll
    }
  };
};
