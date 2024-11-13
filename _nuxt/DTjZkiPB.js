import{j as S,e as N,r as q,aw as R,s as B,aV as T,aW as E,v as U,aX as V,y as A,aY as w,aZ as F,a_ as I,A as x,a$ as O,b0 as k,b1 as D,n as H,b2 as $,b3 as z,b4 as M}from"./B2JbQZDz.js";async function j(t,r=S()){const{path:f,matched:b}=r.resolve(t);if(!b.length||(r._routePreloaded||(r._routePreloaded=new Set),r._routePreloaded.has(f)))return;const e=r._preloadPromises=r._preloadPromises||[];if(e.length>4)return Promise.all(e).then(()=>j(t,r));r._routePreloaded.add(f);const a=b.map(o=>{var n;return(n=o.components)==null?void 0:n.default}).filter(o=>typeof o=="function");for(const o of a){const n=Promise.resolve(o()).catch(()=>{}).finally(()=>e.splice(e.indexOf(n)));e.push(n)}await Promise.all(e)}const W=(...t)=>t.find(r=>r!==void 0);function Q(t){const r=t.componentName||"NuxtLink";function f(e,a){if(!e||t.trailingSlash!=="append"&&t.trailingSlash!=="remove")return e;if(typeof e=="string")return L(e,t.trailingSlash);const o="path"in e&&e.path!==void 0?e.path:a(e).path;return{...e,name:void 0,path:L(o,t.trailingSlash)}}function b(e){const a=S(),o=$(),n=x(()=>!!e.target&&e.target!=="_self"),v=x(()=>{const d=e.to||e.href||"";return typeof d=="string"&&O(d,{acceptRelative:!0})}),y=w("RouterLink"),m=y&&typeof y!="string"?y.useLink:void 0,g=x(()=>{if(e.external)return!0;const d=e.to||e.href||"";return typeof d=="object"?!1:d===""||v.value}),i=x(()=>{const d=e.to||e.href||"";return g.value?d:f(d,a.resolve)}),s=g.value||m==null?void 0:m({...e,to:i}),p=x(()=>{var d;if(!i.value||v.value)return i.value;if(g.value){const P=typeof i.value=="object"&&"path"in i.value?k(i.value):i.value,C=typeof P=="object"?a.resolve(P).href:P;return f(C,a.resolve)}return typeof i.value=="object"?((d=a.resolve(i.value))==null?void 0:d.href)??null:f(D(o.app.baseURL,i.value),a.resolve)});return{to:i,hasTarget:n,isAbsoluteUrl:v,isExternal:g,href:p,isActive:(s==null?void 0:s.isActive)??x(()=>i.value===a.currentRoute.value.path),isExactActive:(s==null?void 0:s.isExactActive)??x(()=>i.value===a.currentRoute.value.path),route:(s==null?void 0:s.route)??x(()=>a.resolve(i.value)),async navigate(){await H(p.value,{replace:e.replace,external:g.value||n.value})}}}return N({name:r,props:{to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},prefetchOn:{type:[String,Object],default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1},custom:{type:Boolean,default:void 0,required:!1}},useLink:b,setup(e,{slots:a}){const o=S(),{to:n,href:v,navigate:y,isExternal:m,hasTarget:g,isAbsoluteUrl:i}=b(e),s=q(!1),p=q(null),d=l=>{var c;p.value=e.custom?(c=l==null?void 0:l.$el)==null?void 0:c.nextElementSibling:l==null?void 0:l.$el};function P(l){var c,u;return!s.value&&(typeof e.prefetchOn=="string"?e.prefetchOn===l:((c=e.prefetchOn)==null?void 0:c[l])??((u=t.prefetchOn)==null?void 0:u[l]))&&(e.prefetch??t.prefetch)!==!1&&e.noPrefetch!==!0&&e.target!=="_blank"&&!Y()}async function C(l=R()){if(s.value)return;s.value=!0;const c=typeof n.value=="string"?n.value:m.value?k(n.value):o.resolve(n.value).fullPath;await Promise.all([l.hooks.callHook("link:prefetch",c).catch(()=>{}),!m.value&&!g.value&&j(n.value,o).catch(()=>{})])}if(P("visibility")){const l=R();let c,u=null;B(()=>{const h=X();T(()=>{c=E(()=>{var _;(_=p==null?void 0:p.value)!=null&&_.tagName&&(u=h.observe(p.value,async()=>{u==null||u(),u=null,await C(l)}))})})}),U(()=>{c&&V(c),u==null||u(),u=null})}return()=>{var u;if(!m.value&&!g.value){const h={ref:d,to:n.value,activeClass:e.activeClass||t.activeClass,exactActiveClass:e.exactActiveClass||t.exactActiveClass,replace:e.replace,ariaCurrentValue:e.ariaCurrentValue,custom:e.custom};return e.custom||(P("interaction")&&(h.onPointerenter=C.bind(null,void 0),h.onFocus=C.bind(null,void 0)),s.value&&(h.class=e.prefetchedClass||t.prefetchedClass),h.rel=e.rel||void 0),A(w("RouterLink"),h,a.default)}const l=e.target||null,c=W(e.noRel?"":e.rel,t.externalRelAttribute,i.value||g.value?"noopener noreferrer":"")||null;return e.custom?a.default?a.default({href:v.value,navigate:y,prefetch:C,get route(){if(!v.value)return;const h=new URL(v.value,window.location.href);return{path:h.pathname,fullPath:h.pathname,get query(){return F(h.search)},hash:h.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:v.value}},rel:c,target:l,isExternal:m.value||g.value,isActive:!1,isExactActive:!1}):null:A("a",{ref:p,href:v.value||null,rel:c,target:l},(u=a.default)==null?void 0:u.call(a))}}})}const G=Q(I);function L(t,r){const f=r==="append"?z:M;return O(t)&&!t.startsWith("http")?t:f(t,!0)}function X(){const t=R();if(t._observer)return t._observer;let r=null;const f=new Map,b=(a,o)=>(r||(r=new IntersectionObserver(n=>{for(const v of n){const y=f.get(v.target);(v.isIntersecting||v.intersectionRatio>0)&&y&&y()}})),f.set(a,o),r.observe(a),()=>{f.delete(a),r.unobserve(a),f.size===0&&(r.disconnect(),r=null)});return t._observer={observe:b}}function Y(){const t=navigator.connection;return!!(t&&(t.saveData||/2g/.test(t.effectiveType)))}export{G as _};
