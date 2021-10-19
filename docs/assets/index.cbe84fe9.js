import{E as C,a as f}from"./request.ad504d55.js";import{d as v,r as h,w as d,o as x,u as g,c as t}from"./vendor.a0b4d419.js";const m=`## md-editor-v3

Markdown \u7F16\u8F91\u5668\uFF0C\u57FA\u4E8E vue3\uFF0C\u4F7F\u7528 jsx \u548C typescript \u8BED\u6CD5\u5F00\u53D1\uFF0C\u652F\u6301\u5207\u6362\u4E3B\u9898\u3001prettier \u7F8E\u5316\u6587\u672C\u7B49\u3002

## \u57FA\u672C\u6F14\u793A

**\u52A0\u7C97**\uFF0C<u>\u4E0B\u5212\u7EBF</u>\uFF0C_\u659C\u4F53_\uFF0C~\u5220\u9664\u7EBF~\uFF0C\u4E0A\u6807<sup>26</sup>\uFF0C\u4E0B\u6807<sub>[1]</sub>\uFF0C\`inline code\`\uFF0C[\u8D85\u94FE\u63A5](https://imbf.cc)

> \u5F15\u7528\uFF1A\u8FD9\u662F\u4E00\u6BB5\u5F15\u7528

## \u4EE3\u7801\u6F14\u793A

\`\`\`js
import { defineComponent, ref } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";


export default defineComponent({
  name: "MdEditor",
  setup() {
    const text = ref("");
    return () => (
      <MdEditor modelValue={text.value} onChange={(v: string) => (text.value = v)} />
    );
  }
});
\`\`\`


## \u6587\u672C\u6F14\u793A


\u4F9D\u7167\u666E\u6717\u514B\u957F\u5EA6\u8FD9\u9879\u5355\u4F4D\uFF0C\u76EE\u524D\u53EF\u89C2\u6D4B\u7684\u5B87\u5B99\u7684\u76F4\u5F84\u4F30\u8BA1\u503C\uFF08\u76F4\u5F84\u7EA6 930 \u4EBF\u5149\u5E74\uFF0C\u5373 8.8 \xD7 10<sup>26</sup> \u7C73\uFF09\u5373\u4E3A 5.4 \xD7 10<sup>61</sup>\u500D\u666E\u6717\u514B\u957F\u5EA6\u3002\u800C\u53EF\u89C2\u6D4B\u5B87\u5B99\u4F53\u79EF\u5219\u4E3A 8.4 \xD7 10<sup>184</sup>\u7ACB\u65B9\u666E\u6717\u514B\u957F\u5EA6\uFF08\u666E\u6717\u514B\u4F53\u79EF\uFF09\u3002


## \u8868\u683C\u6F14\u793A


| \u6635\u79F0 | \u733F\u9F84\uFF08\u5E74\uFF09 | \u6765\u81EA      |
| ---- | ---------- | --------- |
| \u4E4B\u95F4 | 3          | \u4E2D\u56FD-\u91CD\u5E86 |


## \u5360\u4E2A\u5751@\uFF01
`,B=`## md-editor-v3

Markdown Editor for Vue3, developed by jsx and typescript, support different themes\u3001beautify content by prettier.

## Base

**bold**, <u>underline</u>, _italic_, ~line-through~, superscript<sup>26</sup>\uFF0Csubscript<sub>[1]</sub>\uFF0C\`inline code\`\uFF0C[link](https://imbf.cc)

> quote\uFF1Ahahaha

## Demo

\`\`\`js
import { defineComponent, ref } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";


export default defineComponent({
  name: "MdEditor",
  setup() {
    const text = ref("");
    return () => (
      <MdEditor modelValue={text.value} onChange={(v: string) => (text.value = v)} />
    );
  }
});
\`\`\`


## Text


The Old Man and the Sea served to reinvigorate Hemingway's literary reputation and prompted a reexamination of his entire body of work.


## Table


| nickname | age | from      |
| ---- | ---------- | --------- |
| zhijian | 3          | China ChongQing |


## em... 
`;const i="XHMPGLJIZTDB";var b=v({props:{theme:String},setup(){const o=localStorage.getItem(i)||"",e=h({text:o||m});let a=-1;d(()=>e.text,()=>{clearTimeout(a),a=window.setTimeout(()=>{localStorage.setItem(i,e.text)},2e3)}),x(()=>{clearTimeout(a)});const n=g();return d(()=>n.state.lang,u=>{u==="zh-CN"?e.text=o||m:e.text=o||B}),()=>t("div",{class:"project-preview"},[t("div",{class:"container"},[t(C,{editorId:"md-prev",language:n.state.lang,theme:n.state.theme,previewTheme:n.state.previewTheme,modelValue:e.text,onSave:u=>{localStorage.setItem(i,u)},onChange:u=>e.text=u,onUploadImg:async(u,p)=>{const l=await Promise.all(Array.from(u).map(r=>new Promise((E,c)=>{const F=new FormData;F.append("file",r),f.post("/api/img/upload",F,{headers:{"Content-Type":"multipart/form-data"}}).then(s=>E(s)).catch(s=>c(s))})));p(l.map(r=>r.data.url))}},null),t("br",null,null),t("span",{class:"tips-text"},[n.state.lang==="zh-CN"?"Tips\uFF1A\u672C\u9875\u4E0A\u65B9\u7684\u7F16\u8F91\u5668\u6709localstorage\u4FDD\u5B58\u529F\u80FD\uFF0C\u6BCF\u6B21\u64CD\u4F5C\u540E\u4E24\u79D2\u4F1A\u81EA\u5DF1\u4FDD\u5B58\u4E00\u6B21\uFF0C\u53EF\u624B\u52A8\u70B9\u51FB\u4FDD\u5B58\u89E6\u53D1\uFF0C\u53EF\u7528\u4E8E\u4E00\u4E9B\u6587\u6863\u7684\u7F16\u8F91\u3002":"Tips: The editor in this page will save text to localstorage auto, and you can save text by yourself also. Wish this function can be used to edit some temporary document."])])])}});export{b as default};
