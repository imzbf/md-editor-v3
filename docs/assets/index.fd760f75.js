var B=Object.defineProperty,V=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var S=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;var y=(i,e,t)=>e in i?B(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,f=(i,e)=>{for(var t in e||(e={}))O.call(e,t)&&y(i,t,e[t]);if(S)for(var t of S(e))z.call(e,t)&&y(i,t,e[t]);return i},x=(i,e)=>V(i,I(e));import{d as b,r as k,a as v,o as p,c as C,w as h,b as m,e as $,f as D,u as o,F as q,t as A,g as T,h as F,i as M}from"./index.f10c775f.js";import{a as N}from"./request.1d324841.js";var j=`## \u{1F632} md-editor-v3

Markdown Editor for Vue3, developed by jsx and typescript, support different themes\u3001beautify content by prettier.

### \u{1F916} Base

**bold**, <u>underline</u>, _italic_, ~line-through~, superscript<sup>26</sup>\uFF0Csubscript<sub>[1]</sub>\uFF0C\`inline code\`\uFF0C[link](https://imzbf.cc)

> quote\uFF1Ahahaha

![mark and Emoji extension](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

## \u{1F917} Demo

\`\`\`vue
<template>
  <md-editor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
<\/script>
\`\`\`

## \u{1F5A8} Text

The Old Man and the Sea served to reinvigorate Hemingway's literary reputation and prompted a reexamination of his entire body of work.

## \u{1F4C8} Table

| nickname | age | from            |
| -------- | --- | --------------- |
| zhijian  | 3   | China ChongQing |

\u{1F4CF} \u516C\u5F0F

$$
\\sqrt[3]{x}
$$

## \u2618\uFE0F em...
`,E=`## \u{1F632} md-editor-v3

Markdown \u7F16\u8F91\u5668\uFF0C\u57FA\u4E8E react\uFF0C\u4F7F\u7528 jsx \u548C typescript \u8BED\u6CD5\u5F00\u53D1\uFF0C\u652F\u6301\u5207\u6362\u4E3B\u9898\u3001prettier \u7F8E\u5316\u6587\u672C\u7B49\u3002

### \u{1F916} \u57FA\u672C\u6F14\u793A

**\u52A0\u7C97**\uFF0C<u>\u4E0B\u5212\u7EBF</u>\uFF0C_\u659C\u4F53_\uFF0C~\u5220\u9664\u7EBF~\uFF0C\u4E0A\u6807<sup>26</sup>\uFF0C\u4E0B\u6807<sub>[1]</sub>\uFF0C\`inline code\`\uFF0C[\u8D85\u94FE\u63A5](https://imzbf.cc)

> \u5F15\u7528\uFF1A\u8FD9\u662F\u4E00\u6BB5\u5F15\u7528\u3002

![mark and Emoji extension](https://imzbf.github.io/md-editor-v3/imgs/mark_emoji.gif)

## \u{1F917} \u4EE3\u7801\u6F14\u793A

\`\`\`vue
<template>
  <md-editor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
<\/script>
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
`;const H=["bold","underline","italic","strikeThrough","-","title","sub","sup","quote","unorderedList","orderedList","-","codeRow","code","link","image","table","mermaid","katex",0,1,2,"-","revoke","next","save","=","prettier","pageFullscreen","fullscreen","preview","htmlPreview","catalog","github"];const P=["\u{1F600}","\u{1F603}","\u{1F604}","\u{1F601}","\u{1F606}","\u{1F605}","\u{1F602}","\u{1F923}","\u{1F972}","\u{1F914}","\u{1F60A}","\u{1F607}","\u{1F642}","\u{1F643}","\u{1F609}","\u{1F60C}","\u{1F60D}","\u{1F970}","\u{1F618}","\u{1F617}","\u{1F619}","\u{1F61A}","\u{1F60B}","\u{1F61B}","\u{1F61D}","\u{1F61C}","\u{1F92A}","\u{1F928}","\u{1F9D0}","\u{1F913}","\u{1F60E}","\u{1F978}","\u{1F929}","\u{1F973}","\u{1F60F}","\u{1F612}","\u{1F61E}","\u{1F614}","\u{1F61F}","\u{1F615}","\u{1F641}","\u{1F47B}","\u{1F623}","\u{1F616}","\u{1F62B}","\u{1F629}","\u{1F97A}","\u{1F622}","\u{1F62D}","\u{1F624}","\u{1F620}","\u{1F621}","\u{1F92C}","\u{1F92F}","\u{1F633}"],R={class:"emoji-container"},L={class:"emojis"},U=["onClick","textContent"],Q=m("svg",{class:"md-icon","aria-hidden":"true"},[m("use",{"xlink:href":"#icon-emoji"})],-1),G={name:"EmojiExtension"},J=b(x(f({},G),{props:{editorId:String},emits:["onChange"],setup(i,{emit:e}){const t=i,r=k({visible:!1}),d=n=>{var g;const a=document.querySelector(`#${t.editorId}-textarea`),l=(g=window.getSelection())==null?void 0:g.toString(),u=a.selectionStart,c=a.value.substring(0,u),_=a.value.substring(u+((l==null?void 0:l.length)||0));e("onChange",`${c}${n}${_}`),setTimeout(()=>{a.setSelectionRange(u,u+1),a.focus()},0)},s=n=>{r.visible=n};return(n,a)=>{const l=v("dropdown-toolbar");return p(),C(l,{title:"emoji",visible:o(r).visible,onOnChange:s},{overlay:h(()=>[m("div",R,[m("ol",L,[(p(!0),$(q,null,D(o(P),(u,c)=>(p(),$("li",{key:`emoji-${c}`,onClick:_=>d(u),textContent:A(u)},null,8,U))),128))])])]),trigger:h(()=>[Q]),_:1},8,["visible"])}}})),K=m("svg",{class:"md-icon","aria-hidden":"true"},[m("use",{"xlink:href":"#icon-mark"})],-1),W={name:"MarkExtension"},X=b(x(f({},W),{props:{editorId:String},emits:["onChange"],setup(i,{emit:e}){const t=i,r=()=>{var c;const d=document.querySelector(`#${t.editorId}-textarea`),s=(c=window.getSelection())==null?void 0:c.toString(),n=d.selectionStart,a=`@${s}@`,l=d.value.substring(0,n),u=d.value.substring(n+((s==null?void 0:s.length)||0));e("onChange",`${l}${a}${u}`),setTimeout(()=>{d.setSelectionRange(n,a.length+n),d.focus()},0)};return(d,s)=>{const n=v("normal-toolbar");return p(),C(n,{title:"mark",onClick:r},{trigger:h(()=>[K]),_:1})}}})),Y={style:{height:"100%",padding:"20px",overflow:"auto"}},Z=m("svg",{class:"md-icon","aria-hidden":"true"},[m("use",{"xlink:href":"#icon-read"})],-1),ee={name:"ReadExtension"},te=b(x(f({},ee),{props:{mdText:String},setup(i){const e=i,t=k({visible:!1,modalFullscreen:!1}),r=T();return(d,s)=>{const n=v("md-editor-v3"),a=v("modal-toolbar");return p(),C(a,{visible:o(t).visible,"is-fullscreen":o(t).modalFullscreen,"show-adjust":"",title:"\u5E2E\u52A9","modal-title":"\u7F16\u8F91\u9884\u89C8",width:"870px",height:"600px",onOnClick:s[0]||(s[0]=l=>o(t).visible=!0),onOnClose:s[1]||(s[1]=l=>o(t).visible=!1),onOnAdjust:s[2]||(s[2]=l=>o(t).modalFullscreen=!o(t).modalFullscreen)},{trigger:h(()=>[Z]),default:h(()=>[m("div",Y,[F(n,{theme:o(r).state.theme,language:o(r).state.lang,"preview-theme":o(r).state.previewTheme,"code-theme":o(r).state.codeTheme,"editor-id":"edit2preview","preview-only":"",modelValue:e.mdText},null,8,["theme","language","preview-theme","code-theme","modelValue"])])]),_:1},8,["visible","is-fullscreen"])}}})),ne={class:"project-preview"},oe={class:"container"},ae=b({setup(i){const e=T(),t="editor-preview",r=k({text:e.state.lang==="zh-CN"?E:j,modalVisible:!1,modalFullscreen:!1});M(()=>e.state.lang,n=>{n==="zh-CN"?r.text=E:r.text=j});const d=async(n,a)=>{const l=await Promise.all(n.map(u=>new Promise((c,_)=>{const g=new FormData;g.append("file",u),N.post("/api/img/upload",g,{headers:{"Content-Type":"multipart/form-data"}}).then(w=>c(w)).catch(w=>_(w))})));a(l.map(u=>u.data.url))},s=n=>r.text=n;return(n,a)=>{const l=v("md-editor-v3");return p(),$("div",ne,[m("div",oe,[F(l,{modelValue:o(r).text,"onUpdate:modelValue":a[0]||(a[0]=u=>o(r).text=u),"editor-id":t,language:o(e).state.lang,theme:o(e).state.theme,previewTheme:o(e).state.previewTheme,"code-theme":o(e).state.codeTheme,toolbars:o(H),onOnUploadImg:d},{defToolbars:h(()=>[F(X,{"editor-id":t,onOnChange:s}),F(J,{"editor-id":t,onOnChange:s}),F(te,{"md-text":o(r).text},null,8,["md-text"])]),_:1},8,["modelValue","language","theme","previewTheme","code-theme","toolbars"])])])}}});export{ae as default};
