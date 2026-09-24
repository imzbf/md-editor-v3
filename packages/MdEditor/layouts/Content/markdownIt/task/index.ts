/**
 * 源码来自https://github.com/revin/markdown-it-task-lists
 *
 * 进行了部分重构
 * 1. 使用ts和箭头函数重构
 * 2. 将option作为局部变量，支持了多个实例的使用
 */
import markdownit, { Token } from 'markdown-it';

interface Options {
  enabled?: boolean;
  label?: boolean;
  labelAfter?: boolean;
}

const attrSet = (token: Token, name: string, value: string) => {
  const index = token.attrIndex(name);
  const attr: [string, string] = [name, value];

  if (index < 0) {
    token.attrPush(attr);
  } else {
    token.attrs = token.attrs || [];
    token.attrs[index] = attr;
  }
};

const isInline = (token: Token) => {
  return token.type === 'inline';
};

const isParagraph = (token: Token) => {
  return token.type === 'paragraph_open';
};

const isListItem = (token: Token) => {
  return token.type === 'list_item_open';
};

const startsWithTodoMarkdown = (token: Token) => {
  // leading whitespace in a list item is already trimmed off by markdown-it
  return (
    token.content.indexOf('[ ] ') === 0 ||
    token.content.indexOf('[x] ') === 0 ||
    token.content.indexOf('[X] ') === 0
  );
};

const isTodoItem = (tokens: Token[], index: number) => {
  return (
    isInline(tokens[index]) &&
    isParagraph(tokens[index - 1]) &&
    isListItem(tokens[index - 2]) &&
    startsWithTodoMarkdown(tokens[index])
  );
};

const parentToken = (tokens: Token[], index: number) => {
  const targetLevel = tokens[index].level - 1;
  for (let i = index - 1; i >= 0; i--) {
    if (tokens[i].level === targetLevel) {
      return i;
    }
  }
  return -1;
};

// these next two functions are kind of hacky; probably should really be a
// true block-level token with .tag=='label'
const beginLabel = (TokenConstructor: any) => {
  return new TokenConstructor('label_open', 'label', 1) as Token;
};

const endLabel = (TokenConstructor: any) => {
  return new TokenConstructor('label_close', 'label', -1) as Token;
};

const makeCheckbox = (token: Token, TokenConstructor: any, options: Options) => {
  const checkbox: Token = new TokenConstructor('html_inline', '', 0);
  const disabledAttr = !options.enabled ? ' disabled="" ' : ' ';
  if (token.content.indexOf('[ ] ') === 0) {
    checkbox.content =
      '<input class="task-list-item-checkbox"' + disabledAttr + 'type="checkbox">';
  } else if (token.content.indexOf('[x] ') === 0 || token.content.indexOf('[X] ') === 0) {
    checkbox.content =
      '<input class="task-list-item-checkbox" checked=""' +
      disabledAttr +
      'type="checkbox">';
  }
  return checkbox;
};

const todoify = (token: Token, TokenConstructor: any, options: Options) => {
  token.children = token.children || [];
  token.children.unshift(makeCheckbox(token, TokenConstructor, options));
  token.children[1].content = token.children[1].content.slice(3);
  token.content = token.content.slice(3);

  if (options.label) {
    if (options.labelAfter) {
      // Use large random number as id property of the checkbox.
      const id = 'task-item-' + Math.ceil(Math.random() * (10000 * 1000) - 1000);
      token.children[0].content =
        token.children[0].content.slice(0, -1) + ' id="' + id + '">';
      // 包住已有行内 token，保留强调、链接等语义，也不把 html:false 已转义的
      // 原始文本重新拼成 HTML。label 的属性由 markdown-it renderer 统一转义。
      const label = beginLabel(TokenConstructor);
      label.attrSet('class', 'task-list-item-label');
      label.attrSet('for', id);
      token.children.splice(1, 0, label);
      token.children.push(endLabel(TokenConstructor));
    } else {
      token.children.unshift(beginLabel(TokenConstructor));
      token.children.push(endLabel(TokenConstructor));
    }
  }
};

const githubTaskLists = (md: markdownit, options: Options = {}) => {
  md.core.ruler.after('inline', 'github-task-lists', (state) => {
    const tokens = state.tokens;
    for (let i = 2; i < tokens.length; i++) {
      if (isTodoItem(tokens, i)) {
        todoify(tokens[i], state.Token, options);
        attrSet(
          tokens[i - 2],
          'class',
          'task-list-item' + (options.enabled ? ' enabled' : ' ')
        );
        attrSet(tokens[parentToken(tokens, i - 2)], 'class', 'contains-task-list');
      }
    }
  });
};

export default githubTaskLists;
