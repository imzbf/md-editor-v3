import{e as d,u as m,r as l,c as v,a as _,b as k,at as n,o as x,aF as C}from"./XZG_4z3e.js";import{M as I}from"./Cr6ZTnZp.js";const S={name:"IzCatalog"},h=d({...S,props:{editorId:{type:String,default:""}},setup(c){const f=m(),i=c,t=l(!0),o=l(),s=C(),u=(a,e)=>{history.replaceState({},"",`${location.pathname}#${e.text}`)},p=(a,e)=>{if(!e||!t.value)return;const r=e.offsetTop-o.value.scrollTop;r>200?s(o.value,e.offsetTop-200):r<100&&s(o.value,e.offsetTop-100)};return(a,e)=>(x(),v("div",{class:"catalog",onMouseenter:e[0]||(e[0]=()=>t.value=!1),onMouseleave:e[1]||(e[1]=()=>t.value=!0)},[_("div",{ref_key:"scrollerRef",ref:o,class:"affix"},[k(n(I),{editorId:i.editorId,theme:n(f).theme,scrollElement:"html",scrollElementOffsetTop:10,onOnClick:u,onOnActive:p},null,8,["editorId","theme"])],512)],32))}});export{h as _};