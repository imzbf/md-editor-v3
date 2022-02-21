import{E,a as A}from"./request.9f8525b4.js";import{d as B,r as k,u as _,w as D,j as c,k as i,c as h,l as p,m as s,n as m,F as w,p as y,t as S}from"./vendor.41e98cc9.js";const g=`## \u{1F632} md-editor-v3

Markdown \u7F16\u8F91\u5668\uFF0C\u57FA\u4E8E react\uFF0C\u4F7F\u7528 jsx \u548C typescript \u8BED\u6CD5\u5F00\u53D1\uFF0C\u652F\u6301\u5207\u6362\u4E3B\u9898\u3001prettier \u7F8E\u5316\u6587\u672C\u7B49\u3002

### \u{1F916} \u57FA\u672C\u6F14\u793A

**\u52A0\u7C97**\uFF0C<u>\u4E0B\u5212\u7EBF</u>\uFF0C_\u659C\u4F53_\uFF0C~\u5220\u9664\u7EBF~\uFF0C\u4E0A\u6807<sup>26</sup>\uFF0C\u4E0B\u6807<sub>[1]</sub>\uFF0C\`inline code\`\uFF0C[\u8D85\u94FE\u63A5](https://imbf.cc)

> \u5F15\u7528\uFF1A\u4E16\u754C\u4E0A\u6CA1\u6709\u7EDD\u5BF9\uFF0C\u53EA\u6709\u76F8\u5BF9

## \u{1F917} \u4EE3\u7801\u6F14\u793A

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


## \u{1F5A8} \u6587\u672C\u6F14\u793A


\u4F9D\u7167\u666E\u6717\u514B\u957F\u5EA6\u8FD9\u9879\u5355\u4F4D\uFF0C\u76EE\u524D\u53EF\u89C2\u6D4B\u7684\u5B87\u5B99\u7684\u76F4\u5F84\u4F30\u8BA1\u503C\uFF08\u76F4\u5F84\u7EA6 930 \u4EBF\u5149\u5E74\uFF0C\u5373 8.8 \xD7 10<sup>26</sup> \u7C73\uFF09\u5373\u4E3A 5.4 \xD7 10<sup>61</sup>\u500D\u666E\u6717\u514B\u957F\u5EA6\u3002\u800C\u53EF\u89C2\u6D4B\u5B87\u5B99\u4F53\u79EF\u5219\u4E3A 8.4 \xD7 10<sup>184</sup>\u7ACB\u65B9\u666E\u6717\u514B\u957F\u5EA6\uFF08\u666E\u6717\u514B\u4F53\u79EF\uFF09\u3002


## \u{1F4C8} \u8868\u683C\u6F14\u793A


| \u6635\u79F0 | \u733F\u9F84\uFF08\u5E74\uFF09 | \u6765\u81EA      |
| ---- | ---------- | --------- |
| \u4E4B\u95F4 | 3          | \u4E2D\u56FD-\u91CD\u5E86 |


 ## \u{1F4CF} \u516C\u5F0F 

$$
\\sqrt[3]{x}
$$

 ## \u2618\uFE0F \u5360\u4E2A\u5751@\uFF01
`,T=`## \u{1F632} md-editor-v3

Markdown Editor for Vue3, developed by jsx and typescript, support different themes\u3001beautify content by prettier.

### \u{1F916} Base

**bold**, <u>underline</u>, _italic_, ~line-through~, superscript<sup>26</sup>\uFF0Csubscript<sub>[1]</sub>\uFF0C\`inline code\`\uFF0C[link](https://imbf.cc)

> quote\uFF1Ahahaha

## \u{1F917} Demo

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


## \u{1F5A8} Text


The Old Man and the Sea served to reinvigorate Hemingway's literary reputation and prompted a reexamination of his entire body of work.


## \u{1F4C8} Table


| nickname | age | from      |
| ---- | ---------- | --------- |
| zhijian | 3          | China ChongQing |


  \u{1F4CF} \u516C\u5F0F 

$$
\\sqrt[3]{x}
$$

 ## \u2618\uFE0F em... 
`;const $=["\u{1F600}","\u{1F603}","\u{1F604}","\u{1F601}","\u{1F606}","\u{1F605}","\u{1F602}","\u{1F923}","\u{1F972}","\u{1F914}","\u{1F60A}","\u{1F607}","\u{1F642}","\u{1F643}","\u{1F609}","\u{1F60C}","\u{1F60D}","\u{1F970}","\u{1F618}","\u{1F617}","\u{1F619}","\u{1F61A}","\u{1F60B}","\u{1F61B}","\u{1F61D}","\u{1F61C}","\u{1F92A}","\u{1F928}","\u{1F9D0}","\u{1F913}","\u{1F60E}","\u{1F978}","\u{1F929}","\u{1F973}","\u{1F60F}","\u{1F612}","\u{1F61E}","\u{1F614}","\u{1F61F}","\u{1F615}","\u{1F641}","\u{1F47B}","\u{1F623}","\u{1F616}","\u{1F62B}","\u{1F629}","\u{1F97A}","\u{1F622}","\u{1F62D}","\u{1F624}","\u{1F620}","\u{1F621}","\u{1F92C}","\u{1F92F}","\u{1F633}"];var j={name:"MarkExtension",level:"inline",start:a=>{var o;return(o=a.match(/@[^@]/))==null?void 0:o.index},tokenizer(a){const r=/^@([^@]*)@/.exec(a);if(r)return{type:"MarkExtension",raw:r[0],text:r[1].trim(),tokens:[]}},renderer(a){return`<mark>${a.text}</mark>`}};const M={class:"project-preview"},V={class:"container"},q=i("svg",{class:"md-icon","aria-hidden":"true"},[i("use",{"xlink:href":"#icon-mark"})],-1),N={class:"emoji-container"},P={class:"emojis"},z=["onClick","textContent"],I=i("svg",{class:"md-icon","aria-hidden":"true"},[i("use",{"xlink:href":"#icon-emoji"})],-1),H=i("br",null,null,-1),L={class:"tips-text"},R={key:0},O={key:1},G=B({setup(a){const o=k({text:g,emojiVisible:!1}),r=_();D(()=>r.state.lang,t=>{t==="zh-CN"?o.text=g:o.text=T});const x=()=>{var F;const t=document.querySelector("#md-prev-textarea"),u=(F=window.getSelection())==null?void 0:F.toString(),e=t.selectionStart,n=`@${u}@`,l=t.value.substring(0,e),d=t.value.substring(e+((u==null?void 0:u.length)||0));o.text=`${l}${n}${d}`,setTimeout(()=>{t.setSelectionRange(e,n.length+e),t.focus()},0)},f=t=>{var F;const u=document.querySelector("#md-prev-textarea"),e=(F=window.getSelection())==null?void 0:F.toString(),n=u.selectionStart,l=u.value.substring(0,n),d=u.value.substring(n+((e==null?void 0:e.length)||0));o.text=`${l}${t}${d}`,setTimeout(()=>{u.setSelectionRange(n,n+1),u.focus()},0)},v=async(t,u)=>{const e=await Promise.all(Array.from(t).map(n=>new Promise((l,d)=>{const F=new FormData;F.append("file",n),A.post("/api/img/upload",F,{headers:{"Content-Type":"multipart/form-data"}}).then(C=>l(C)).catch(C=>d(C))})));u(e.map(n=>n.data.url))},b=t=>{o.emojiVisible=t};return(t,u)=>(m(),c("div",M,[i("div",V,[h(s(E),{editorId:"md-prev",modelValue:s(o).text,"onUpdate:modelValue":u[0]||(u[0]=e=>s(o).text=e),language:s(r).state.lang,theme:s(r).state.theme,previewTheme:s(r).state.previewTheme,toolbars:["bold","underline","italic","strikeThrough","-","title","sub","sup","quote","unorderedList","orderedList","-","codeRow","code","link","image","table","mermaid","katex",0,1,"-","revoke","next","save","=","prettier","pageFullscreen","fullscreen","preview","htmlPreview","catalog","github"],extensions:[s(j)],onOnUploadImg:v},{defToolbars:p(()=>[h(s(E).NormalToolbar,{title:"mark",onClick:x},{trigger:p(()=>[q]),_:1}),h(s(E).DropdownToolbar,{title:"emoji",visible:s(o).emojiVisible,onChange:b},{overlay:p(()=>[i("div",N,[i("ol",P,[(m(!0),c(w,null,y(s($),(e,n)=>(m(),c("li",{key:`emoji-${n}`,onClick:l=>f(e),textContent:S(e)},null,8,z))),128))])])]),trigger:p(()=>[I]),_:1},8,["visible"])]),_:1},8,["modelValue","language","theme","previewTheme","extensions"]),H,i("span",L,[s(r).state.lang==="zh-CN"?(m(),c("span",R,"Tips\uFF1A\u672C\u9875\u5C55\u793A\u7F16\u8F91\u5668localstorage\u5B58\u50A8\u529F\u80FD\u5DF2\u79FB\u9664\uFF01")):(m(),c("span",O,"Tips: The editor in this page can not save text to localstorage now!"))])])]))}});export{G as default};
