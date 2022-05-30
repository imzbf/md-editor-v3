var h=Object.defineProperty,g=Object.defineProperties;var u=Object.getOwnPropertyDescriptors;var s=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable;var r=(t,e,n)=>e in t?h(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,d=(t,e)=>{for(var n in e||(e={}))f.call(e,n)&&r(t,n,e[n]);if(s)for(var n of s(e))_.call(e,n)&&r(t,n,e[n]);return t},i=(t,e)=>g(t,u(e));import{r as a}from"./index.06934aae.js";import{d as v,g as C,j as M,i as x,a as E,e as J,b as m,h as j,u as o,o as A}from"./index.7a407f5c.js";var p=`## Upgrade from 1.x to 2.x

This is the content that 2.x is incompatible with version 1.x only.

## Props

| name                | description                              |
| ------------------- | ---------------------------------------- |
| editorClass         | rename to \`class\`                        |
| hljs                | removed, use \`MdEditor.config\` to config |
| highlightJs         | the same                                 |
| highlightCss        | the same                                 |
| languageUserDefined | the same                                 |
| prettier            | rename to \`noPrettier\`, default \`false\`  |
| prettierCDN         | removed, use \`MdEditor.config\` to config |
| prettierMDCDN       | the same                                 |
| cropperCss          | the same                                 |
| cropperJs           | the same                                 |
| iconfontJs          | the same                                 |
| screenfull          | the same                                 |
| screenfullJs        | the same                                 |
| mermaid             | the same                                 |
| mermaidJs           | the same                                 |
| katex               | the same                                 |
| katexJs             | the same                                 |
| katexCss            | the same                                 |
| extensions          | the same                                 |

## Component

- Catalog

  \`Editor.Catalog\` is renamed to \`Editor.MdCatalog\`.

  **Local Registration**

  _App.vue_

  \`\`\`js
  <template>
    <md-editor editor-id="ddd" />
    <md-catalog editor-id="ddd" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  const { MdCatalog } = MdEditor;
  <\/script>
  \`\`\`

  **Global Registration**

  _main.js_

  \`\`\`js
  import { createApp } from 'vue';
  import MdEditor from 'md-editor-v3';

  // All components in MdEditor will be registered.
  createApp(App).use(MdEditor);
  \`\`\`

  _App.vue_

  \`\`\`js
  <template>
    <md-editor editor-id="ddd" />
    <md-catalog editor-id="ddd" />
  </template>

  <script setup>
  // import nothing
  <\/script>
  \`\`\`
`,l=`## \u4ECE 1.x \u5347\u7EA7\u5230 2.x

\u4E0B\u9762\u5217\u4E3E\u7684\u662F\`2.x\`\u4E0D\u517C\u5BB9\`1.x\`\u7684\u5185\u5BB9\uFF0C\u517C\u5BB9\u5185\u5BB9\u4E0D\u4F5C\u5C55\u793A\u3002

## Props

| \u540D\u79F0                | \u8BF4\u660E                              |
| ------------------- | --------------------------------- |
| editorClass         | \u4FEE\u6539\u4E3A\`class\`                     |
| hljs                | \u5DF2\u79FB\u9664\uFF0C\u4F7F\u7528\`MdEditor.config\`\u914D\u7F6E |
| highlightJs         | \u540C\u4E0A                              |
| highlightCss        | \u540C\u4E0A                              |
| languageUserDefined | \u540C\u4E0A                              |
| prettier            | \u4FEE\u6539\u4E3A\`noPrettier\`\uFF0C\u9ED8\u8BA4\`false\`   |
| prettierCDN         | \u5DF2\u79FB\u9664\uFF0C\u4F7F\u7528\`MdEditor.config\`\u914D\u7F6E |
| prettierMDCDN       | \u540C\u4E0A                              |
| cropperCss          | \u540C\u4E0A                              |
| cropperJs           | \u540C\u4E0A                              |
| iconfontJs          | \u540C\u4E0A                              |
| screenfull          | \u540C\u4E0A                              |
| screenfullJs        | \u540C\u4E0A                              |
| mermaid             | \u540C\u4E0A                              |
| mermaidJs           | \u540C\u4E0A                              |
| katex               | \u540C\u4E0A                              |
| katexJs             | \u540C\u4E0A                              |
| katexCss            | \u540C\u4E0A                              |
| extensions          | \u540C\u4E0A                              |

## \u5185\u90E8\u7EC4\u4EF6

\u5168\u5C40\u6CE8\u518C\u540D\u79F0\u7EDF\u4E00\u4E3A\u7EC4\u4EF6\u7684\u540D\u79F0\u3002

- \u76EE\u5F55\u5BFC\u822A

  \`Editor.Catalog\`\u7EC4\u4EF6\u540D\u79F0\u4FEE\u6539\u4E3A\`Editor.MdCatalog\`\u3002

  **\u5C40\u90E8\u6CE8\u518C**

  _App.vue_

  \`\`\`js
  <template>
    <md-editor editor-id="ddd" />
    <md-catalog editor-id="ddd" />
  </template>

  <script setup>
  import MdEditor from 'md-editor-v3';
  const { MdCatalog } = MdEditor;
  <\/script>
  \`\`\`

  **\u5168\u5C40\u6CE8\u518C**

  \u8FD9\u4F1A\u4F7F\u5F97\u5185\u90E8\u7684\u6240\u6709\u7EC4\u4EF6\u6309\u7167\u540D\u79F0\u6CE8\u518C

  _main.js_

  \`\`\`js
  import { createApp } from 'vue';
  import MdEditor from 'md-editor-v3';

  createApp(App).use(MdEditor);
  \`\`\`

  _App.vue_

  \`\`\`js
  <template>
    <md-editor editor-id="ddd" />
    <md-catalog editor-id="ddd" />
  </template>

  <script setup>
  // \u4E0D\u9700\u8981\u518Dimport
  <\/script>
  \`\`\`
`;const w={class:"container"},k={class:"doc"},D={class:"content",style:{width:"100%"}},N={name:"ContrastPage"},S=v(i(d({},N),{setup(t){const e=C(),n=M(a(e.state.lang==="en-US"?p:l));return x(()=>e.state.lang,()=>{n.value=a(e.state.lang==="en-US"?p:l)}),(y,P)=>{const c=E("md-editor-v3");return A(),J("div",w,[m("div",k,[m("div",D,[j(c,{theme:o(e).state.theme,"model-value":n.value,"preview-theme":o(e).state.previewTheme,"preview-only":"","show-code-row-number":"","code-theme":o(e).state.codeTheme},null,8,["theme","model-value","preview-theme","code-theme"])])])])}}}));export{S as default};
