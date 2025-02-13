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
  if (/^h[1-6]$/.test(direct)) {
    return handleHeading(direct, codeMirrorUt);
  } else if (direct === 'prettier') {
    return await handlePrettier(codeMirrorUt, params);
  }

  switch (direct) {
    case 'bold':
    case 'underline':
    case 'italic':
    case 'strikeThrough':
    case 'sub':
    case 'sup':
    case 'codeRow':
    case 'katexInline':
    case 'katexBlock': {
      return wrapText(direct, codeMirrorUt);
    }

    case 'quote':
    case 'orderedList':
    case 'unorderedList':
    case 'task': {
      return handleMultiLine(direct, codeMirrorUt);
    }
    case 'code': {
      return handleCodeBlock(params, codeMirrorUt);
    }
    case 'table': {
      return handleTable(params);
    }
    case 'link': {
      return { text: `[${params.desc}](${params.url})`, options: { select: false } };
    }
    case 'image': {
      return handleImage(params);
    }
    case 'flow':
    case 'sequence':
    case 'gantt':
    case 'class':
    case 'state':
    case 'pie':
    case 'relationship':
    case 'journey': {
      return handleMermaid(direct);
    }

    case 'universal': {
      return handleUniversal(codeMirrorUt.getSelectedText(), params);
    }
    default: {
      return { text: '', options: {} };
    }
  }
};

/**
 * 处理标题
 */
const handleHeading = (direct: string, codeMirrorUt: CodeMirrorUt) => {
  const level = direct.slice(1);
  const prefix = '#'.repeat(Number(level));
  const [text, replaceStart, replaceEnd] = getSelectedInfo(codeMirrorUt, {
    wholeLine: true
  });

  return {
    text: `${prefix} ${text}`,
    options: { deviationStart: prefix.length + 1, replaceStart, replaceEnd }
  };
};

/**
 * 处理代码格式化
 */
const handlePrettier = async (codeMirrorUt: CodeMirrorUt, params: any) => {
  const prettier =
    window.prettier || configOption.editorExtensions.prettier?.prettierInstance;
  const prettierPlugins = [
    window.prettierPlugins?.markdown ||
      configOption.editorExtensions.prettier?.parserMarkdownInstance
  ];

  if (!prettier || !prettierPlugins[0]) {
    bus.emit(params.editorId, ERROR_CATCHER, {
      name: 'prettier',
      message: 'prettier is undefined'
    });
    return {
      text: codeMirrorUt.getValue(),
      options: { select: false, replaceAll: true }
    };
  }

  return {
    text: await prettier.format(codeMirrorUt.getValue(), {
      parser: 'markdown',
      plugins: prettierPlugins
    }),
    options: { select: false, replaceAll: true }
  };
};

const wrappers: Record<string, [string, string, number, number]> = {
  bold: ['**', '**', 2, -2],
  underline: ['<u>', '</u>', 3, -4],
  italic: ['*', '*', 1, -1],
  strikeThrough: ['~~', '~~', 2, -2],
  sub: ['~', '~', 1, -1],
  sup: ['^', '^', 1, -1],
  codeRow: ['`', '`', 1, -1],
  katexInline: ['$', '$', 1, -1],
  katexBlock: ['\n$$\n', '\n$$\n', 4, -4]
};

/**
 * 处理文本包裹格式
 */
const wrapText = (type: string, codeMirrorUt: CodeMirrorUt) => {
  // const [text, replaceStart, replaceEnd] = getSelectedInfo(codeMirrorUt);
  // 包裹类未选中文本时不强制包裹整行内容
  const text = codeMirrorUt.getSelectedText();
  const [prefix, subfix, deviationStart, deviationEnd] = wrappers[type];

  return {
    text: `${prefix}${text}${subfix}`,
    options: {
      deviationStart,
      deviationEnd
      // replaceStart, replaceEnd
    }
  };
};

const keys: Record<string, string | number> = {
  quote: '> ',
  unorderedList: '- ',
  orderedList: 1,
  task: '- [ ] '
};

/**
 * 处理多行文本（引用、列表）
 */
const handleMultiLine = (type: string, codeMirrorUt: CodeMirrorUt) => {
  const [text, replaceStart, replaceEnd] = getSelectedInfo(codeMirrorUt, {
    wholeLine: true
  });
  const lines = text.split('\n');
  const key = keys[type];

  const formattedLines =
    type === 'orderedList'
      ? lines.map((line, i) => `${(key as number) + i}. ${line}`)
      : lines.map((line) => `${key}${line}`);

  // 计算 deviationStart
  const firstLinePrefix = type === 'orderedList' ? '1. ' : key.toString();
  const deviationStart = lines.length === 1 ? firstLinePrefix.length : 0;

  return {
    text: formattedLines.join('\n'),
    options: {
      deviationStart,
      replaceStart,
      replaceEnd
    }
  };
};

/**
 * 处理代码块
 */
const handleCodeBlock = (params: any, codeMirrorUt: CodeMirrorUt) => {
  const [text, replaceStart, replaceEnd] = getSelectedInfo(codeMirrorUt);

  // 代码的类型
  const mode = params.mode || 'language';
  // 插入的内容
  const _text = `\n\`\`\`${mode}\n${params.text || text || ''}\n\`\`\`\n`;
  return {
    text: _text,
    options: {
      deviationStart: 4,
      deviationEnd: 4 + mode.length - _text.length,
      replaceStart,
      replaceEnd
    }
  };
};

/**
 * 处理 Mermaid 图表
 */
const handleMermaid = (type: string) => {
  const mermaidTemplates: Record<string, string> = {
    flow: 'flowchart TD \n  Start --> Stop',
    sequence: 'sequenceDiagram\n  A->>B: hello!\n  B-->>A: hi!',
    gantt: 'gantt\ntitle Gantt Chart\ndateFormat  YYYY-MM-DD',
    class: 'classDiagram\n  class Animal',
    state: 'stateDiagram-v2\n  s1 --> s2',
    pie: 'pie\n  "Dogs" : 386\n  "Cats" : 85\n  "Rats" : 15',
    relationship: 'erDiagram\n  CAR ||--o{ NAMED-DRIVER : allows',
    journey: 'journey\n  title My Journey',
    ...configOption.editorConfig.mermaidTemplate
  };

  return {
    text: `\n\`\`\`mermaid\n${mermaidTemplates[type]}\n\`\`\`\n`,
    options: { deviationStart: 12, deviationEnd: -5 }
  };
};

/**
 * 处理图片插入
 */
const handleImage = (params: any) => {
  const { desc, url, urls } = params;
  let text = '';

  if (urls instanceof Array) {
    text = (urls as UploadImgCallBackParam).reduce<string>((pVal, _url) => {
      const {
        url = '',
        alt = '',
        title = ''
      } = typeof _url === 'object' ? _url : { url: _url };

      // ![alt](url 'title')
      return pVal + `![${alt}](${url}${title ? " '" + title + "'" : ''})\n`;
    }, '');
  } else {
    text = `![${desc}](${url})\n`;
  }

  return { text, options: { select: false } };
};

/**
 * 处理表格插入
 */
const handleTable = (params: any) => {
  const { selectedShape = { x: 1, y: 1 } } = params;
  const { x, y } = selectedShape;

  let text = '\n| Column';

  // 生成表头
  for (let i = 0; i <= y; i++) {
    text += ` |`;
  }

  text += '\n|';

  // 生成分隔行
  for (let i = 0; i <= y; i++) {
    text += ' - |';
  }

  // 生成数据行
  for (let row = 0; row <= x; row++) {
    text += '\n|';
    for (let col = 0; col <= y; col++) {
      text += ' |';
    }
  }

  text += '\n';

  return {
    text,
    options: {
      deviationStart: 3,
      deviationEnd: 10 - text.length
    }
  };
};

/**
 * 处理通用插入
 */
const handleUniversal = (selectedText: string, params: any) => {
  const { generate } = params as { generate: InsertContentGenerator };
  const insertOptions = generate(selectedText);

  return {
    text: insertOptions.targetValue,
    options: {
      select: insertOptions.select ?? true,
      deviationStart: insertOptions.deviationStart || 0,
      deviationEnd: insertOptions.deviationEnd || 0
    }
  };
};

const getSelectedInfo = (
  codeMirrorUt: CodeMirrorUt,
  options: {
    wholeLine?: boolean;
  } = {
    wholeLine: false
  }
): [string, number, number] => {
  // 如果没有选择内容，默认就是当前行的内容
  const state = codeMirrorUt.view.state;
  const selection = state.selection.main;

  if (selection.empty) {
    // 未选中时，返回光标所在行
    const startLine = state.doc.lineAt(selection.from);

    return [state.doc.lineAt(selection.from).text, startLine.from, startLine.to];
  } else if (options.wholeLine) {
    // 获取起始和结束位置所在的完整行
    const startLine = state.doc.lineAt(selection.from);
    const endLine = state.doc.lineAt(selection.to);

    // 提取完整的行文本（从 startLine 开始，到 endLine 结束）
    return [
      state.doc.sliceString(startLine.from, endLine.to),
      startLine.from,
      endLine.to
    ];
  }

  return [
    state.doc.sliceString(selection.from, selection.to),
    selection.from,
    selection.to
  ];
};
