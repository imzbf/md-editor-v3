import type { Renderer, Token } from 'markdown-it';

/**
 * 按 markdown-it 默认 renderer 的约定渲染带内容的 token。
 *
 * 标签由插件写入 `token.tag`，属性统一交给 `renderAttrs` 转义。调用方仍需明确
 * content 是经过 `escapeHtml` 的不可信文本，还是由 KaTeX、Mermaid 等依赖生成的
 * 可信 HTML，避免结构属性化后再次引入原始内容注入。
 */
export const renderTokenContent = (token: Token, content: string, renderer: Renderer) => {
  return `<${token.tag}${renderer.renderAttrs(token)}>${content}</${token.tag}>`;
};

export const mergeAttrs = (token: Token, addAttrs: [string, string][]) => {
  const tmpAttrs = token.attrs ? token.attrs.slice() : [];

  addAttrs.forEach((addAttr) => {
    const i = token.attrIndex(addAttr[0]);
    if (i < 0) {
      tmpAttrs.push(addAttr);
    } else {
      tmpAttrs[i] = tmpAttrs[i].slice() as [string, string];
      tmpAttrs[i][1] += ` ${addAttr[1]}`;
    }
  });

  return tmpAttrs;
};
