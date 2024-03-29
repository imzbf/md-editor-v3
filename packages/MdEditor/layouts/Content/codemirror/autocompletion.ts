import { EditorSelection } from '@codemirror/state';
import {
  autocompletion,
  CompletionContext,
  CompletionResult,
  Completion,
  CompletionSource
} from '@codemirror/autocomplete';

const getPairApply = (
  flag: string,
  type: string,
  title: string,
  suffix: string,
  selectType: 'type' | 'title'
): Completion['apply'] => {
  return (view, _completion, from, to) => {
    const label = `${flag}${type}`.slice(to - from);

    view.dispatch(view.state.replaceSelection(`${label}${title}${suffix}`));

    // 开始+标记和类型+是否选中title
    const newTo =
      from + _completion.label.length + (selectType === 'title' ? title.length : 0);

    view.dispatch({
      selection: EditorSelection.create(
        [
          EditorSelection.range(
            from + _completion.label.length + (selectType === 'title' ? 1 : -type.length),
            newTo
          ),
          EditorSelection.cursor(newTo)
        ],
        1
      )
    });

    view.focus();
  };
};

const getApply = (_label: string): Completion['apply'] => {
  return (view, _completion, from, to) => {
    const label = _label.slice(to - from);
    view.dispatch(view.state.replaceSelection(`${label} `));
  };
};

const createAutocompletion = (completions: Array<CompletionSource> | undefined) => {
  const defaultCompletion = (context: CompletionContext): CompletionResult | null => {
    const word = context.matchBefore(
      /^#+|^-\s*\[*\s*\]*|`+|\[|!\[*|^\|\s?\|?|\$\$?|!+\s*\w*/
    );

    if (word === null || (word.from == word!.to && context.explicit)) {
      return null;
    }

    return {
      from: word.from,
      options: [
        // 标题
        ...['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((key, index) => {
          const label = new Array(index + 1).fill('#').join('');
          return {
            label,
            type: 'text',
            apply: getApply(label)
          };
        }),
        // 任务列表
        ...['unchecked', 'checked'].map((key) => {
          const label = key === 'checked' ? '- [x]' : '- [ ]';
          return {
            label,
            type: 'text',
            apply: getApply(label)
          };
        }),
        // 代码
        ...[
          ['`', ''],
          ['```', 'language'],
          ['```mermaid\n', '']
        ].map((c) => {
          return {
            label: `${c[0]}${c[1]}`,
            type: 'text',
            apply: getPairApply(c[0], c[1], '', c[0] === '`' ? '`' : '\n```', 'type')
          };
        }),
        // 链接
        {
          label: '[]()',
          type: 'text'
        },
        {
          label: '![]()',
          type: 'text'
        },
        // 表格
        {
          label: '| |',
          type: 'text',
          detail: 'table',
          apply:
            '| col | col | col |\n| - | - | - |\n| content | content | content |\n| content | content | content |'
        },
        // 公式
        {
          label: '$',
          type: 'text',
          apply: getPairApply('$', '', '', '$', 'type')
        },
        {
          label: '$$',
          type: 'text',
          apply: getPairApply('$$', '', '\n', '\n$$', 'title')
        },
        // 那啥？
        ...[
          'note',
          'abstract',
          'info',
          'tip',
          'success',
          'question',
          'warning',
          'failure',
          'danger',
          'bug',
          'example',
          'quote',
          'hint',
          'caution',
          'error',
          'attention'
        ].map((key) => {
          const label = `!!! ${key}`;
          return {
            label,
            type: 'text',
            apply: getPairApply('!!!', ` ${key}`, ' Title', '\n\n!!!', 'title')
          };
        })
      ]
    };
  };

  return autocompletion({
    override: completions ? [defaultCompletion, ...completions] : [defaultCompletion]
  });
};

export default createAutocompletion;
