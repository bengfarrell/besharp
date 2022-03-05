/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$3=Symbol(),n$3=new Map;class s$3{constructor(t,n){if(this._$cssResult$=!0,n!==e$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){let e=n$3.get(this.cssText);return t$2&&void 0===e&&(n$3.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o$4=t=>new s$3("string"==typeof t?t:t+"",e$3),r$2=(t,...n)=>{const o=1===t.length?t[0]:n.reduce(((e,n,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[s+1]),t[0]);return new s$3(o,e$3)},i$2=(e,n)=>{t$2?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),s=window.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,e.appendChild(n);}));},S$1=t$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return o$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$2=window.trustedTypes,r$1=e$2?e$2.emptyScript:"",h$1=window.reactiveElementPolyfillSupport,o$3={toAttribute(t,i){switch(i){case Boolean:t=t?r$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$2=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:o$3,reflect:!1,hasChanged:n$2};class a$1 extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o();}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S$1(i));}else void 0!==i&&s.push(S$1(i));return s}static _$Eh(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$Eg)&&void 0!==i?i:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$Eg)||void 0===i||i.splice(this._$Eg.indexOf(t)>>>0,1);}_$Em(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i$2(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$ES(t,i,s=l$2){var e,r;const h=this.constructor._$Eh(t,s);if(void 0!==h&&!0===s.reflect){const n=(null!==(r=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==r?r:o$3.toAttribute)(i,s.type);this._$Ei=t,null==n?this.removeAttribute(h):this.setAttribute(h,n),this._$Ei=null;}}_$AK(t,i){var s,e,r;const h=this.constructor,n=h._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=h.getPropertyOptions(n),l=t.converter,a=null!==(r=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==r?r:o$3.fromAttribute;this._$Ei=n,this[n]=a(i,t.type),this._$Ei=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$2)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ep=this._$E_());}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$EU();}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$Eg)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$ES(i,this[i],t))),this._$EC=void 0),this._$EU();}updated(t){}firstUpdated(t){}}a$1.finalized=!0,a$1.elementProperties=new Map,a$1.elementStyles=[],a$1.shadowRootOptions={mode:"open"},null==h$1||h$1({ReactiveElement:a$1}),(null!==(s$2=globalThis.reactiveElementVersions)&&void 0!==s$2?s$2:globalThis.reactiveElementVersions=[]).push("1.3.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$1=globalThis.trustedTypes,s$1=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$1=`lit$${(Math.random()+"").slice(9)}$`,o$2="?"+e$1,n$1=`<${o$2}>`,l$1=document,h=(t="")=>l$1.createComment(t),r=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d=Array.isArray,u=t=>{var i;return d(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,a=/>/g,f=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,m=/"/g,g=/^(?:script|style|textarea|title)$/i,p=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),$=p(1),b=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),T=new WeakMap,x=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(h(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},A=l$1.createTreeWalker(l$1,129,null,!1),C=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<o;i++){const s=t[i];let o,u,p=-1,$=0;for(;$<s.length&&(d.lastIndex=$,u=d.exec(s),null!==u);)$=d.lastIndex,d===c?"!--"===u[1]?d=v:void 0!==u[1]?d=a:void 0!==u[2]?(g.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f):void 0!==u[3]&&(d=f):d===f?">"===u[0]?(d=null!=h?h:c,p=-1):void 0===u[1]?p=-2:(p=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f:'"'===u[3]?m:_):d===m||d===_?d=f:d===v||d===a?d=c:(d=f,h=void 0);const y=d===f&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+n$1:p>=0?(l.push(o),s.slice(0,p)+"$lit$"+s.slice(p)+e$1+y):s+e$1+(-2===p?(l.push(void 0),i):y);}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==s$1?s$1.createHTML(u):u,l]};class E{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,s);if(this.el=E.createElement(v,n),A.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(e$1)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(e$1),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?H:"@"===i[1]?I:S});}else c.push({type:6,index:r});}for(const i of t)l.removeAttribute(i);}if(g.test(l.tagName)){const t=l.textContent.split(e$1),s=t.length-1;if(s>0){l.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],h()),A.nextNode(),c.push({type:2,index:++r});l.append(t[s],h());}}}else if(8===l.nodeType)if(l.data===o$2)c.push({type:2,index:r});else {let t=-1;for(;-1!==(t=l.data.indexOf(e$1,t+1));)c.push({type:7,index:r}),t+=e$1.length-1;}r++;}}static createElement(t,i){const s=l$1.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=r(i)?void 0:i._$litDirective$;return (null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=P(t,d._$AS(t,i.values),d,e)),i}class V{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:l$1).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r];}h!==(null==d?void 0:d.index)&&(n=A.nextNode(),h++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),r(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==b&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):u(t)?this.S(t):this.$(t);}A(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t));}$(t){this._$AH!==w&&r(this._$AH)?this._$AA.nextSibling.data=t:this.k(l$1.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=E.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new V(o,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new E(t)),i}S(t){d(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.A(h()),this.A(h()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!r(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!r(h)||h!==this._$AH[l]),h===w?t=w:t!==w&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.C(t);}C(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}C(t){this.element[this.name]=t===w?void 0:t;}}const k=i$1?i$1.emptyScript:"";class H extends S{constructor(){super(...arguments),this.type=4;}C(t){t&&t!==w?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name);}}class I extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:w)===b)return;const e=this._$AH,o=t===w&&e!==w||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==w&&(e===w||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=window.litHtmlPolyfillSupport;null==z||z(E,N),(null!==(t$1=globalThis.litHtmlVersions)&&void 0!==t$1?t$1:globalThis.litHtmlVersions=[]).push("2.2.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o$1;class s extends a$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=x(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1);}render(){return b}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n=globalThis.litElementPolyfillSupport;null==n||n({LitElement:s});(null!==(o$1=globalThis.litElementVersions)&&void 0!==o$1?o$1:globalThis.litElementVersions=[]).push("3.2.0");

(function(factory){typeof define==="function"&&define.amd?define(factory):factory();})((function(){const Notes=["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];function*noteGenerator(startNote){const pivot=Notes.indexOf(startNote);const layout=[...Notes.slice(pivot,Notes.length),...Notes.slice(0,pivot)];let octave=0;let first=true;while(true){for(let i=0;i<layout.length;i++){const note=layout[i];if(note==="C"&&!first){octave=octave+1;}yield {name:note,octave:octave};first=false;}}}const NaturalWidth=10;const SharpWidth=6;function sharpKey(note,octave,offset){return `<rect class="sharp-note note" data-note="${note}" data-octave="${octave}" x=${offset} y=1></rect>`}function naturalKey(note,octave,offset){return `<rect class="natural-note note" data-note="${note}" data-octave="${octave}" x=${offset} y=1></rect>`}class Piano extends HTMLElement{constructor(){super();this.root=this.attachShadow({mode:"open"});this.root.addEventListener("mousedown",event=>{this.handleClick(event,true);event.preventDefault();});this.root.addEventListener("mouseup",event=>{this.handleClick(event,false);event.preventDefault();});this.root.addEventListener("mouseout",event=>{this.handleClick(event,false);event.preventDefault();});this.root.innerHTML=`<style>${this.getCss()}</style><div>${this.getNoteSvg()}`;}static get observedAttributes(){return ["key-count","keyboard-layout","read-only"]}get config(){return {keyCount:parseInt(this.getAttribute("key-count")||"88"),keyboardLayout:this.getAttribute("keyboard-layout")||"A",readOnly:this.hasAttribute("read-only")}}connectedCallback(){}attributeChangedCallback(){this.root.innerHTML=`<style>${this.getCss()}</style><div>${this.getNoteSvg()}</div>`;}handleClick(event,down){if(this.config.readOnly){return}const target=event.target;if(target.tagName==="rect"){const note=event.target.getAttribute("data-note");const octave=parseInt(event.target.getAttribute("data-octave"));if(down){this.setNoteDown(note,octave);this.dispatchEvent(new CustomEvent("note-down",{detail:{note:note,octave:octave}}));}else {if(target.hasAttribute("data-depressed")){this.setNoteUp(note,octave);this.dispatchEvent(new CustomEvent("note-up",{detail:{note:note,octave:octave}}));}}}}setNoteDown(note,octave){const elem=this.root.querySelector(keySelector(note,octave));elem.classList.add("depressed");elem.setAttribute("data-depressed","data-depressed");}setNoteUp(note,octave){const elem=this.root.querySelector(keySelector(note,octave));elem.classList.remove("depressed");elem.removeAttribute("data-depressed");}getNoteSvg(){const noteCount=this.config.keyCount;const generator=noteGenerator(this.config.keyboardLayout);const notes=new Array(noteCount).fill(1).map(()=>generator.next().value);const naturalKeys=notes.filter(note=>!note.name.includes("#")).length;const lastKeySharp=notes[notes.length-1].name.includes("#");const totalWidth=naturalKeys*NaturalWidth+(lastKeySharp?SharpWidth/2:0)+2;return `<svg viewBox="0 0 ${totalWidth} 52" version="1.1" xmlns="http://www.w3.org/2000/svg">\n            ${this.getKeysForNotes(notes)}\n        </svg>`}getKeysForNotes(notes){let totalOffset=-NaturalWidth+1;const offsets=notes.map(note=>{const isSharp=note.name.includes("#");let thisOffset=0;if(isSharp){thisOffset=totalOffset+7;}else {totalOffset=totalOffset+NaturalWidth;thisOffset=totalOffset;}return {note:note.name,octave:note.octave,offset:thisOffset}});const naturalKeys=offsets.filter(pos=>!pos.note.includes("#")).map(pos=>naturalKey(pos.note,pos.octave,pos.offset));const sharpKeys=offsets.filter(pos=>pos.note.includes("#")).map(pos=>sharpKey(pos.note,pos.octave,pos.offset));return `<g>\n            ${naturalKeys}\n            ${sharpKeys}\n        </g>`}getCss(){return `\n        \n        :host {\n            --natural-key-color: #FFFFFF; \n            --natural-key-outline-color: #555555;\n            \n            --sharp-key-color: #555555;\n            --sharp-key-outline-color: #555555;\n            \n            --depressed-key-color: #808080;\n            --depressed-key-transform: scale(1, 0.95);\n        }\n        \n        :host {\n          display: block;\n        }\n        \n        .natural-note {\n          stroke: var(--natural-key-outline-color);\n          fill: var(--natural-key-color);\n          width: ${NaturalWidth}px;\n          height: 50px;\n        }\n        \n        .sharp-note {\n          stroke: var(--sharp-key-outline-color);\n          fill: var(--sharp-key-color);\n          width: ${SharpWidth}px;\n          height: 30px;\n        }\n        \n        .depressed {\n          fill: var(--depressed-key-color);\n          transform: var(--depressed-key-transform);\n        }\n        `}}const keySelector=(note,octave)=>`[data-note="${note}"][data-octave="${octave}"]`;customElements.define("piano-keys",Piano);}));

const template$5 = (scope) => {
    if (scope.started && !scope.transition) {
        return $`
            <div class="question-ui" id="play-controls">
                <div class="stats-container" id="question-container">
                    <span>Play the following chord:</span>
                    <h1>${scope.currentQuestion.questionText}</h1>
                </div>
                <div class="stats-container" id="clock-container">
                    <span>Timer:</span>
                    <h1 id="clock">${scope.transition ? '00:00' : scope.timer.elapsedQuestionTime}</h1>
                </div>
            </div>`;
    } else if (scope.transition) {
        return $`
            <div id="transition-container">
                <div id="progress-bar"></div>
                <div id="transition-messaging">${scope.currentQuestion ? scope.currentQuestion.answerText : 'Let\'s get started...'}</div>
            </div>`;
    } else {
        return $`<span class="question-ui">Click start to begin practicing</span>`;
    }
};

const styles$6 = r$2`
  :host {
    width: 100%;
    height: 100px;
    display: flex;
  }
  
  :host([transition]) .question-ui {
    display: none !important;
  }

  :host(:not([transition])) #progress-bar {
    display: none !important;
  }

  :host .question-ui {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host span.question-ui {
    font-weight: bolder;
  }
  
  #progress-bar {
    background-color: #999999;
    width: 100%;
    height: 100%;
    animation: progressBar 3.5s ease-in-out;
    animation-fill-mode: both;
  }
  
  #transition-container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  #transition-container * {
    position: absolute;
  }

  #transition-messaging {
    font-size: 24px;
    font-weight: bolder;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3a3a3a;
    width: 100%;
    height: 100%;
  }

  @keyframes progressBar {
    0% { width: 100%; }
    100% { width: 0; }
  }
  
  button {
    height: 80px;
    width: 80px;
  }
  
  .stats-container {
    flex: 1;
    margin-left: 15px;
  }

  .stats-container span {
    font-size: 11px;
  }
  
  h1 {
    margin-top: 0;
    margin-bottom: 0;
  }

  #play-controls {
    display: flex;
  }
`;

/**
 * Chord Notation Enumerators
 * @constructor
 */
const ChordConstants = {
    /**
     * major triad
     * @const
     * @static
     * @type {string}
     **/
    MAJOR_TRIAD: "maj",

    /**
     * minor triad
     * @const
     * @static
     * @type {string}
     **/
    MINOR_TRIAD: "m",

    /**
     * seventh
     * @const
     * @static
     * @type {string}
     **/
    SEVENTH: "7",

    /**
     * minor seventh
     * @const
     * @static
     * @type {string}
     **/
    MINOR_SEVENTH: "m7",

    /**
     * major seventh
     * @const
     * @static
     * @type {string}
     **/
    MAJOR_SEVENTH: "maj7",

    /**
     * ninth
     * @const
     * @static
     * @type {string}
     **/
    NINTH: "9",

    /**
     * minor ninth
     * @const
     * @static
     * @type {string}
     **/
    MINOR_NINTH: "m9",

    /**
     * major ninth
     * @const
     * @static
     * @type {string}
     **/
    MAJOR_NINTH: "maj9",

    /**
     * eleventh
     * @const
     * @static
     * @type {string}
     **/
    ELEVENTH: "11",

    /**
     * thirteenth
     * @const
     * @static
     * @type {string}
     **/
    THIRTEENTH: "13",

    /**
     * sixth
     * @const
     * @static
     * @type {string}
     **/
    SIXTH: "6",

    /**
     * minor sixth
     * @const
     * @static
     * @type {string}
     **/
    MINOR_SIXTH: "m6",

    /**
     * sustain
     * @const
     * @static
     * @type {string}
     **/
    SUSTAIN: "sus",

    /**
     * augmented
     * @const
     * @static
     * @type {string}
     **/
    AUGMENTED: "aug",

    /**
     * diminished
     * @const
     * @static
     * @type {string}
     **/
    DIMINISHED: "dim"
};

/**
 * Note static class
 * @constructor
 */
const Note = {
    /** cached keysignature lookup table */
    keys: {},

    /**
     * incremental tones as sharp notation
     * @const
     * @static
     * @type {Array.<string>}
     **/
    sharpNotations: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],

    /**
     * incremental tones as flat notation
     * @const
     * @static
     * @type {Array.<string>}
     **/
    flatNotations: ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],

    /**
     * get notation index when notation is either flat or sharp
     * @param notation
     */
    indexOfNotation(notation) {
        var index = this.sharpNotations.indexOf(notation);
        if (index === -1) {
            index = this.flatNotations.indexOf(notation);
        }
        return index;
    },

    /**
     * get notation given an index
     * @param index
     */
    notationAtIndex(index, preferFlat) {
        if (index >= this.sharpNotations.length) {
            index = index % this.sharpNotations.length;
        }

        if (preferFlat) {
            return this.flatNotations[index];
        } else {
            return this.sharpNotations[index];
        }
    },

    /**
     * odd notations
     * @const
     * @static
     * @type {Array.<string>}
     **/
    oddNotations: ["B#", "Cb", "E#", "Fb"],

    /**
     * corrected notations
     * @const
     * @static
     * @type {Array.<string>}
     **/
    correctedNotations: ["C", "C", "F", "F"],

    /**
     * translate index from MIDI to notation
     * @param index
     * @constructor
     */
    MIDItoNotation(index) {
        var position = index % this.sharpNotations.length;
        return this.sharpNotations[position];
    },

    /**
     * translate notation and octave to MIDI index
     * @param notation
     */
    notationToMIDI(notation) {
        var ntObj = this.parseNotation(notation);
        var ntindx = this.sharpNotations.indexOf(ntObj.notation);
        if (ntindx === -1) {
            ntindx = this.flatNotations.indexOf(ntObj.notation);
        }
        return ntObj.octave * this.sharpNotations.length + ntindx;
    },

    /**
     * parse notation to notation and octave
     * @param notation
     */
    parseNotation(notation) {
        var note = {};
        // only supports one digit octaves (if thats even a real issue)
        var octave = notation.charAt(notation.length-1);
        if (parseInt(octave) == octave) {
            note.octave = octave;
            if (notation.length === 3) {
                note.notation = notation.charAt(0) + notation.charAt(1);
            } else {
                note.notation = notation.charAt(0);
            }

        } else {
            note.octave = 4; // default
            note.notation = notation;
        }

        return note;
    },

    /**
     * turn a notation into a frequency
     * @static
     * @param {string} notation
     * @return {string} frequency
     */
    getFrequencyForNotation(nt) {
        var octave = 4;

        // does notation include the octave?
        if ( !isNaN( parseInt(nt.charAt(nt.length -1)) )) {
            octave = parseInt(nt.charAt(nt.length -1));
            nt = nt.substr(0, nt.length-1);
        }

        // correct any flat/sharps that resolve to a natural
        if (this.oddNotations.indexOf(nt) != -1) {
            nt = this.correctedNotations[this.oddNotations.indexOf(nt)];
        }

        var freq;
        var indx = this.sharpNotations.indexOf(nt);

        if (indx == -1) {
            indx = this.flatNotations.indexOf(nt);
        }

        if (indx != -1) {
            indx += (octave-4) * this.sharpNotations.length;
            freq = 440 * (Math.pow(2, indx/12));
        }
        return freq;
    },

    /**
     * get notes in a specific key signature
     *
     * @static
     * @param {string} key (root note)
     * @param {boolean} if major key signature
     * @param {number} octave to use (optional)
     * @return {Array.<string>} keys in key signature
     */
    notesInKeySignature(key, major, octave) {
        var notesToIndex;
        var notesInKey = [];
        var startPos;
        key = key.toUpperCase();

        // correct any flat/sharps that resolve to a natural
        if (this.oddNotations.indexOf(key) != -1) {
            key = this.correctedNotations[this.oddNotations.indexOf(key)];
        }

        // find the correct note and notation
        if (this.sharpNotations.indexOf(key) != -1) {
            notesToIndex = this.sharpNotations.slice();
            startPos = this.sharpNotations.indexOf(key);
        } else {
            notesToIndex = this.flatNotations.slice();
            startPos = this.flatNotations.indexOf(key);
        }

        // double the array length
        var len = notesToIndex.length;
        for (let c = 0; c < len; c++ ) {
            if (octave) {
                notesToIndex.push(notesToIndex[c] + (octave+1));
            } else {
                notesToIndex.push(notesToIndex[c]);
            }
        }

        // add octave notation to the first half of the array
        if (octave) {
            for (let c = 0; c < this.flatNotations.length; c++) {
                notesToIndex[c] += octave;
            }
        }
        // chop off the front of the array to start at the root key in the key signature
        notesToIndex.splice(0, startPos);

        // build the key signature
        if (major) {
            // MAJOR From root: whole step, whole step, half step, whole step, whole step, whole step, half step
            notesInKey.push( notesToIndex[0] );
            notesInKey.push( notesToIndex[2] );
            notesInKey.push( notesToIndex[4] );
            notesInKey.push( notesToIndex[5] );
            notesInKey.push( notesToIndex[7] );
            notesInKey.push( notesToIndex[9] );
            notesInKey.push( notesToIndex[11] );
        } else {
            // MINOR From root: whole step, half step, whole step, whole step, half step, whole step, whole step
            notesInKey.push( notesToIndex[0] );
            notesInKey.push( notesToIndex[2] );
            notesInKey.push( notesToIndex[3] );
            notesInKey.push( notesToIndex[5] );
            notesInKey.push( notesToIndex[7] );
            notesInKey.push( notesToIndex[8] );
            notesInKey.push( notesToIndex[10] );
        }
        return notesInKey;
    },

    /**
     * pregenerate a key signature lookup table for every note
     */
    generateKeySignatureLookup() {
        var kys = this.sharpNotations;
        for (var c = 0; c < kys.length; c++) {
            this.keys[kys[c]] = this.notesInKeySignature(kys[c], true);
            this.keys[kys[c] + 'm'] = this.notesInKeySignature(kys[c], false);
        }
    }

};

/**
 * chord constructor
 * @constructor
 * @param {number} sampleRate
 * @param {string} notation
 */
class Chord {
    constructor(notation, octave) {
        /** @type {string} root note of chord */
        this._root = "C";

        /** octave of root */
        if (octave) {
            this._rootOctave = octave;
        } else {
            this._rootOctave = null;
        }

        /** @type {string} chord notation */
        this._notation = notation ? notation : "Cmaj";

        /** @type {Array.<string>} notes in built chord */
        this._notes = [];
        this.buildChord();
        this._root = this._notes[0];
    }

    /**
     * get chord inversion
     * @param inversion
     *
     * @return {Array.<string>} notes
     */
    inversion(num) {
        const possibleOctave = this._notes[0].charAt(this._notes.length - 2);
        const rootOctave = possibleOctave == Number(possibleOctave) ? possibleOctave : undefined;

        // strip octaves if present
        const inversion = rootOctave ? this.notes.slice().map(note => note.substr(0, note.length - 1)) : this.notes.slice();

        for (let c = 0; c < num; c ++) {
            const result = inversion.shift();
            inversion.push(result);
        }

        let positionInScale;
        let octave = rootOctave;
        if (rootOctave) {
            inversion.forEach((note, index) => {
                if (!positionInScale) {
                    positionInScale = Note.sharpNotations.indexOf(inversion[index]);
                } else {
                    if (positionInScale > Note.sharpNotations.indexOf(inversion[index])) {
                        octave ++;
                    }
                    positionInScale = Note.sharpNotations.indexOf(inversion[index]);
                }
                inversion[index] += octave;
            });
        }
        return inversion;
    }

    /**
     * get notes from built chords
     *
     * @return {Array.<string>} notes
     */
    get notes() {
        return this._notes;
    }

    /**
     * notation getter
     * @return {string|*}
     */
    get notation() {
        return this._notation;
    }

    /**
     * chord notation setter
     *
     * @param {string} notation
     */
    set notation(value) {
        this._notation = value;
        this.buildChord();
    }

    /**
     * root note setter
     *
     * @param {string} root
     */
    set root(value) {
        this._root = value;
        this.buildChord();
    }

    /**
     * root note getter
     *
     * @return {string} root note
     */
    get root() {
        return this._root;
    }

    /**
     * root octave setter
     *
     * @param {number} octave
     */
    set rootOctave(value) {
        this._rootOctave = value;
        this.buildChord();
    }

    /**
     * root octave getter
     *
     * @return {number} root octave
     */
    get rootOctave() {
        return this._rootOctave;
    }

    /**
     * get notes in major triad
     *
     * @param {string} major triad root note
     * @param {number} major triad root octave
     * @return {Array.<string>} notes
     */
    majorTriad(root, rootOctave) {
        return this.getStandardNotesInChordMakeup(root, true, false, rootOctave).slice(0,3);
    }

    /**
     * get notes in minor triad
     *
     * @param {string} minor triad root note
     * @param {number} minor triad root octave
     * @return {Array.<string>} notes
     */
    minorTriad(root, rootOctave) {
        return this.getStandardNotesInChordMakeup(root, false, false, rootOctave).slice(0,3);
    }

    /**
     * get notes in seventh chord
     *
     * @param {string} seventh chord root note
     * @param {number} seventh chord root octave
     * @return {Array.<string>} notes
     */
    seventh(root, rootOctave) {
        return this.getStandardNotesInChordMakeup(root, true, false, rootOctave).slice(0,4);
    }

    /**
     * get notes in major seventh chord
     *
     * @param {string} major seventh chord root note
     * @param {number} major seventh chord root octave
     * @return {Array.<string>} notes
     */
    majorSeventh(root, rootOctave) {
        return this.getStandardNotesInChordMakeup(root, true, true, rootOctave).slice(0,4);
    }

    /**
     * get notes in minor seventh chord
     *
     * @param {string} minor seventh chord root note
     * @param {number} minor seventh chord root octave
     * @return {Array.<string>} notes
     */
    minorSeventh(root, rootOctave) {
        return this.getStandardNotesInChordMakeup(root, false, false, rootOctave).slice(0,4);
    }

    /**
     * get notes in ninth chord
     *
     * @param {string} ninth chord root note
     * @param {number} ninth chord root octave
     * @return {Array.<string>} notes
     */
    ninth(root, rootOctave) {
        return this.getStandardNotesInChordMakeup(root, true, false, rootOctave).slice(0,5);
    }

    /**
     * get notes in major ninth chord
     *
     * @param {string} major ninth chord root note
     * @param {number} major ninth chord root octave
     * @return {Array.<string>} notes
     */
    majorNinth(root, rootOctave) {
        return this.getStandardNotesInChordMakeup(root, true, false, rootOctave).slice(0,5);
    }

    /**
     * get notes in minor ninth chord
     *
     * @param {string} minor ninth chord root note
     * @param {number} minor ninth chord root octave
     * @return {Array.<string>} notes
     */
    minorNinth(root, rootOctave) {
        return this.getStandardNotesInChordMakeup(root, false, false, rootOctave).slice(0,5);
    }

    /**
     * get notes in eleventh chord
     *
     * @param {string} eleventh chord root note
     * @param {number} eleventh chord root octave
     * @return {Array.<string>} notes
     */
    eleventh(root, rootOctave) {
        return this.getStandardNotesInChordMakeup(root, true, false, rootOctave).slice(0,6);
    }

    /**
     * get notes in major eleventh chord
     *
     * @param {string} major eleventh chord root note
     * @param {number} major eleventh chord root octave
     * @return {Array.<string>} notes
     */
    majorEleventh(root, rootOctave) {
        return this.getStandardNotesInChordMakeup(root, true, false, rootOctave).slice(0,6);
    }

    /**
     * get notes in minor eleventh chord
     *
     * @param {string} minor eleventh chord root note
     * @param {number} minor eleventh chord root octave
     * @return {Array.<string>} notes
     */
    minorEleventh(root, rootOctave) {
        return this.getStandardNotesInChordMakeup(root, false, false, rootOctave).slice(0,6);
    }

    /**
     * get notes in thirteenth chord
     *
     * @param {string} thirteenth chord root note
     * @param {number} thirteenth chord root octave
     * @return {Array.<string>} notes
     */
    thirteenth(root, rootOctave) {
        return this.getStandardNotesInChordMakeup(root, true, false, rootOctave).slice(0,7);
    }

    /**
     * get notes in major thirteenth chord
     *
     * @param {string} major thirteenth chord root note
     * @param {number} major thirteenth chord root octave
     * @return {Array.<string>} notes
     */
    majorThirteenth(root, rootOctave) {
        return this.getStandardNotesInChordMakeup(root, true, false, rootOctave).slice(0,7);
    }

    /**
     * get notes in minor thirteenth chord
     *
     * @param {string} minor thirteenth chord root note
     * @param {number} minor thirteenth chord root octave
     * @return {Array.<string>} notes
     */
    minorThirteenth(root, rootOctave) {
        return this.getStandardNotesInChordMakeup(root, false, false, rootOctave).slice(0,7);
    }


    /**
     * get notes in sixth chord
     *
     * @param {string} sixth chord root note
     * @param {number} sixth chord root octave
     * @return {Array.<string>} notes
     */
    sixth(root, rootOctave) {
        var keySig = Note.notesInKeySignature(root, true, rootOctave);
        var keys = [];
        keys.push(keySig[0], keySig[2], keySig[4], keySig[5]);
        return keys;
    }

    /**
     * get notes in minor sixth chord
     *
     * @param {string} minor sixth chord root note
     * @param {number} minor sixth chord root octave
     * @return {Array.<string>} notes
     */
    minorSixth(root, rootOctave) {
        var keySig = Note.notesInKeySignature(root, false, rootOctave);
        var keys = [];
        keys.push(keySig[0], keySig[2], keySig[4], keySig[5]);
        return keys;
    }

    /**
     * sustain chord
     *
     * @param {string} sustain root note
     * @param {string} direction to sustain
     * @return {Array.<string>} notes
     */
    sustain(notes, sus) {
        sus = (sus == undefined) ? 4 : sus;
        // grab the third in the chord
        var third = notes[1];
        var notations = Note.sharpNotations;
        var thirdIndex = Note.sharpNotations.indexOf(third);
        if (thirdIndex == -1) {
            notations = Note.flatNotations;
            thirdIndex = Note.flatNotations.indexOf(third);
        }

        if (sus==2) {
            // lower the third one half step
            if (thirdIndex-1 < 0) {
                notes[1] = notations[notations.length-1];
            } else {
                notes[1] = notations[thirdIndex-1];
            }
        } else { // assume sus == 4
            // raise the third one half step
            if (thirdIndex+1 >= notations.length) {
                notes[1] = notations[0];
            } else {
                notes[1] = notations[thirdIndex+1];
            }
        }
        return notes;
    }

    /**
     * augment chord
     *
     * @param {Array.<string>} notes
     * @return {Array.<string>} notes
     */
    augment(notes) {
        // grab the fifth in the chord
        var fifth = notes[2];
        var notations = Note.sharpNotations;
        var fifthIndex = Note.sharpNotations.indexOf(fifth);
        if (fifthIndex == -1) {
            notations = Note.flatNotations;
            fifthIndex = Note.flatNotations.indexOf(fifth);
        }

        // raise the fifth one half step
        if (fifthIndex+1 >= notations.length) {
            notes[2] = notations[0];
        } else {
            notes[2] = notations[fifthIndex+1];
        }
        return notes;
    }

    /**
     * get all standard notes in a chord, from triad to thirteenth
     *
     * @param {string} root note
     * @param {boolean} major key (true/false)
     * @param {boolean} major chord (true/false)
     * @param {number} root octave
     * @return {Array.<string>} notes array
     */
    getStandardNotesInChordMakeup(root, majorKey, majorChord, octave) {
        majorKey = (majorKey == undefined) ? true : majorKey;
        majorChord = (majorChord == undefined) ? false : majorChord;

        var majKeySig = Note.notesInKeySignature(root, true, octave);
        var minKeySig = Note.notesInKeySignature(root, false, octave);

        // grab the next octave if we need it
        var majKeySig2 = Note.notesInKeySignature(root, true, octave+1);
        var minKeySig2 = Note.notesInKeySignature(root, false, octave+1);
        var notes;
        if (majorKey && majorChord) {
            // C Major Seventh for example
            notes = [ majKeySig[0], majKeySig[2], majKeySig[4], majKeySig[6], majKeySig2[1], majKeySig2[3] ];
        } else if (!majorKey && majorChord) {
            // C Minor Seventh for example
            notes = [ minKeySig[0], minKeySig[2], minKeySig[4], minKeySig[6], minKeySig2[1], minKeySig2[3] ];
        } else if (majorKey && !majorChord) {
            // C Seventh for example
            notes = [ majKeySig[0], majKeySig[2], majKeySig[4], minKeySig[6], majKeySig2[1], minKeySig2[3] ];
        } else if (!majorKey && !majorChord) {
            // C Seventh for example
            notes = [ majKeySig[0], minKeySig[2], majKeySig[4], minKeySig[6], majKeySig2[1], minKeySig2[3] ];
        }
        return notes;
    }

    /**
     * convert notation to note list
     *
     * @param {string} notation
     * @param {boolean} use the octave in the notation
     * @return {Array.<string>} note list
     */
    notesFromChordNotation(notation, octave) {
        var root;
        var major = 0;
        var chordType;

        // find root
        if (notation.charAt(1) == "#" || notation.charAt(1) == "b") {
            root = notation.substring(0, 2);
            notation = notation.substring(2);
        } else {
            root = notation.substring(0, 1);
            notation = notation.substring(1);
        }

        // major or minor? (3 states - 1 is on, -1 is off, 0 is unspecified)
        if ( notation.substr(0, 3) == "maj") {
            major = 1;
            notation = notation.substring(3);
        } else if (notation.substr(0, 1) == "m") {
            major = -1;
            notation = notation.substring(1);
        }

        // set chord type
        if ( notation.charAt(0) == "6" ) {
            if (major == -1) {
                chordType = ChordConstants.MINOR_SIXTH;
            } else {
                chordType = ChordConstants.SIXTH;
            }
            notation = notation.substring(2);
        } else if ( notation.charAt(0) == "7" ) {
            if (major == 0) {
                chordType = ChordConstants.SEVENTH;
            } else if (major == 1) {
                chordType = ChordConstants.MAJOR_SEVENTH;
            } else if (major == -1) {
                chordType = ChordConstants.MINOR_SEVENTH;
            }
            notation = notation.substring(1);
        } else if ( notation.charAt(0) == "9" ) {
            if (major == 0) {
                chordType = ChordConstants.NINTH;
            } else if (major == 1) {
                chordType = ChordConstants.MAJOR_NINTH;
            } else if (major == -1) {
                chordType = ChordConstants.MINOR_NINTH;
            }
            notation = notation.substring(1);
        } else if ( notation.substr(0,2) == "11" ) {
            chordType = ChordConstants.ELEVENTH;
            notation = notation.substring(2);
        } else if ( notation.substr(0,2) == "13" ) {
            chordType = ChordConstants.THIRTEENTH;
            notation = notation.substring(2);
        } else {
            if (major == 1 || major == 0) {
                chordType = ChordConstants.MAJOR_TRIAD;
            } else {
                chordType = ChordConstants.MINOR_TRIAD;
            }
        }
        var notes = this.notesFromChordType(chordType, root, octave);

        // modify note set if needed
        var mod = notation;
        switch ( mod.substr(0,3) ) {
            case ChordConstants.AUGMENTED:
                notes = augment(notes);
                break;

            case ChordConstants.DIMINISHED:
                // to do
                break;

            case ChordConstants.SUSTAIN:
                var param = parseInt(mod.charAt(3));
                notes = sustain(notes, param);
                break;
        }

        return notes;
    }

    /**
     * get notes from chord types
     *
     * @param {string} type
     * @param {string} chord root
     * @return {Array.<string>} notes
     */
    notesFromChordType(type, root, rootOctave) {
        switch ( type ) {
            case ChordConstants.SIXTH:
                return this.sixth(root, rootOctave);

            case ChordConstants.MINOR_SIXTH:
                return this.minorSixth(root, rootOctave);

            case ChordConstants.SEVENTH:
                return this.seventh(root, rootOctave);

            case ChordConstants.MINOR_SEVENTH:
                return this.minorSeventh(root, rootOctave);

            case ChordConstants.MAJOR_SEVENTH:
                return this.majorSeventh(root, rootOctave);

            case ChordConstants.NINTH:
                return this.ninth(root, rootOctave);

            case ChordConstants.MINOR_NINTH:
                return this.minorNinth(root, rootOctave);

            case ChordConstants.MAJOR_NINTH:
                return this.majorNinth(root, rootOctave);

            case ChordConstants.ELEVENTH:
                return this.eleventh(root, rootOctave);

            case ChordConstants.THIRTEENTH:
                return this.thirteenth(root, rootOctave);

            case ChordConstants.MAJOR_TRIAD:
                return this.majorTriad(root, rootOctave);

            case ChordConstants.MINOR_TRIAD:
                return this.minorTriad(root, rootOctave);

            default:
                return this.majorTriad(root, rootOctave);
        }
    }

    /**
     * build the chord given the parameters set in this class
     */
    buildChord() {
        this._notes = [];
        var notations = this.notesFromChordNotation(this._notation, this._rootOctave);
        for (var c = 0; c < notations.length; c++) {
            this._notes.push(notations[c]);
        }
    }
}

window.Chord = Chord;

class Question {
    /** chord for question */
    chord = undefined;

    /** answer notes (with potential inversion) */
    notes = [];

    /** answer notes (with potential inversion) */
    lastAttempt = [];

    /** boolean to indicate if order of notes is important */
    enforceOrder = false;

    /** inversion of answer */
    inversion = 0;

    /** question display message */
    questionText = '';

    /** answer display message */
    answerText = '';

    /** inversion label for the user to know what order to play */
    inversionLabel = 'any';

    constructor(chordnotation, possibleinversions) {
        this.chord = new Chord(chordnotation);
        this.notes = this._getNotesWithInversion(this.chord, possibleinversions);
        if (possibleinversions.length > 0) {
            this.enforceOrder = true;
        }
        this.questionText = `${chordnotation} in ${this.inversionLabel} position`;
    }

    isCorrect(inputnotes) {
        this.lastAttempt = inputnotes;
        if (inputnotes.length < inputnotes.length) {
            return undefined;
        }

        if (this.enforceOrder) {
            const correct = this.notes.join(',') === inputnotes.join(',');
            this.answerText = correct ? 'Correct!' : `Sorry, you played ${inputnotes.join(', ')}. The correct answer is ${this.notes.join(', ')}`;
            return correct;
        } else {
            for (let c = 0; c < inputnotes.length; c++) {
                if (this.notes.indexOf(inputnotes[c]) === -1) {
                    this.answerText = `Sorry, you played ${this.lastAttempt.join(', ')}. The correct answer is ${this.notes.join(', ')}`;
                    return false;
                }
            }
            this.answerText = 'Correct!';
            return true;
        }
    }

    _getNotesWithInversion(chord, possibleInversions) {
        if (possibleInversions.length > 0) {
            const randominversion = possibleInversions[Math.floor(Math.random() * possibleInversions.length)];
            this.inversionLabel = `the ${randominversion}`;
            switch (randominversion) {
                case 'root':
                    this.inversion = 0;
                    return chord.inversion(0);

                case 'first':
                    this.inversion = 1;
                    return chord.inversion(1);

                case 'second':
                    this.inversion = 2;
                    return chord.inversion(2);

                case 'third':
                    this.inversion = 3;
                    if (chord.notes.length < 4) {
                        this.inversionLabel = 'the root';
                    }
                    return chord.getInversion(3);
            }
        } else {
            return chord.notes;
        }
    }

}

class PracticeSetsController {
    static hosts = [];

    static options = {
        chords: {
            label: 'Chords to Allow',
            section: true,
            options: {
                naturals: {label: 'Naturals', value: true, refreshSet: true },
                sharps: {label: 'Flats/Sharps', value: false, refreshSet: true },
                minors: {label: 'Minors', value: false, refreshSet: true },
                sevenths: {label: 'Sevenths', value: false, refreshSet: true },
                minorsevenths: {label: 'Minor Sevenths', value: false, refreshSet: true },
                majorsevenths: {label: 'Major Sevenths', value: false, refreshSet: true },
                ninths: {label: 'Ninths', value: false, refreshSet: true },
            }
        },
        inversions: {
            label: 'Enforce Note Order',
            section: true,
            options: {
                root: { label: 'Root position', value: false },
                first: {label: 'First', value: false },
                second: {label: 'Second', value: false },
                third: {label: 'Third (for 7ths)', value: false },
            }
        }
    };

    static currentSet = [];

    constructor(host) {
        if (host) {
            (this.host = host).addController(this);
            PracticeSetsController.hosts.push(host);
        }
    }

    get options() {
        return PracticeSetsController.options;
    }

    get activeInversions() {
        const keys = Object.keys(this.options.inversions.options);
        return keys.filter(key => this.options.inversions.options[key].value);
    }

    get next() {
        if (PracticeSetsController.currentSet.length === 0) {
            this.refreshPracticeSet();
        }

        return new Question(PracticeSetsController.currentSet.pop(), this.activeInversions);
    }


    refreshPracticeSet() {
        const pset = [];
        if (this.options.chords.options['naturals'].value) {
            pset.push(...Note.sharpNotations.filter(note => note.indexOf('#') === -1));
        }
        if (this.options.chords.options['sharps'].value) {
            pset.push(...Note.sharpNotations.filter(note => note.indexOf('#') !== -1));
        }

        const notes = pset.slice();
        if (this.options.chords.options['minors'].value) {
            pset.push( ...notes.map(note => note + 'm'));
        }
        if (this.options.chords.options['sevenths'].value) {
            pset.push( ...notes.map(note => note + '7'));
        }
        if (this.options.chords.options['minorsevenths'].value) {
            pset.push( ...notes.map(note => note + 'm7'));
        }
        if (this.options.chords.options['majorsevenths'].value) {
            pset.push( ...notes.map(note => note + 'maj7'));
        }
        if (this.options.chords.options['ninths'].value) {
            pset.push( ...notes.map(note => note + '9'));
        }

        PracticeSetsController.currentSet = pset.sort((a, b) => 0.5 - Math.random());
        PracticeSetsController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    hostConnected() {
        this.host.requestUpdate();
    }
}
window.PracticeSet = PracticeSetsController;

class ScoreModelController {
    static hosts = [];

    static correctAnswers = 0;

    static incorrectAnswers = 0;

    host;

    constructor(host) {
        (this.host = host).addController(this);
        ScoreModelController.hosts.push(host);
    }

    get correct() {
        return ScoreModelController.correctAnswers;
    }

    get incorrect() {
        return ScoreModelController.incorrectAnswers;
    }

    get total() {
        return this.incorrect + this.correct;
    }

    incrementCorrect() {
        ScoreModelController.correctAnswers ++;
        ScoreModelController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    incrementIncorrect() {
        ScoreModelController.incorrectAnswers ++;
        ScoreModelController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    hostConnected() {
        ScoreModelController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }
}

class TimerController {
    static hosts = [];

    static questionTimer = '00:00';

    static sessionTimer = '00:00';

    static questionStartTime = 0;

    static sessionStartTime = 0;

    static timer = -1;

    host;

    constructor(host) {
        (this.host = host).addController(this);
        TimerController.hosts.push(host);
    }

    start() {
        this.resetSessionTimer();
        this.resetQuestionTimer();
        TimerController.timer = setInterval( () => {
            this.refreshTime();
        }, 1000);
    }

    refreshTime() {
        const elapsedQuestionTime = Date.now() - TimerController.questionStartTime;
        const elapsedSessionTime = Date.now() - TimerController.sessionStartTime;
        TimerController.questionTimer = this.formatTime(elapsedQuestionTime);
        TimerController.sessionTimer = this.formatTime(elapsedSessionTime);
        TimerController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }

    resetQuestionTimer() {
        TimerController.questionStartTime = Date.now();
        this.refreshTime();
    }

    resetSessionTimer() {
        TimerController.sessionStartTime = Date.now();
        this.refreshTime();
    }

    stop() {
        clearInterval(TimerController.timer);
    }

    formatTime(ms) {
        const ttlSeconds = ms / 1000;
        const seconds = Math.floor(ttlSeconds % 60);
        const secondsAsString = seconds < 10 ? '0' + seconds : seconds;
        const minutes = Math.floor(ms / 1000 / 60);
        const minutesAsString = minutes < 10 ? '0' + minutes : minutes;
        return `${minutesAsString}:${secondsAsString}`;
    }

    get elapsedQuestionTime() {
        return TimerController.questionTimer;
    }

    get elapsedSessionTime() {
        return TimerController.sessionTimer;
    }

    hostConnected() {
        this.host.requestUpdate();
    }
}

class MidiController {
    static hosts = [];

    static midi = undefined;

    static noteListeners = [];

    static inputs = [];

    static notes = [];

    constructor(host) {
        host.addController(this);
        MidiController.hosts.push(host);
        if (!MidiController.midi) {
            this.refreshConnection();
        }
    }

    refreshConnection() {
        navigator.requestMIDIAccess().then( midi => {
            MidiController.midi = midi;

            MidiController.inputs = [];
            MidiController.inputs = Array.from(midi.inputs.values());
            MidiController.hosts.forEach(host => {
                host.requestUpdate();
            });
        }, (errmsg) => {
            console.warn('Failed to get MIDI access - ' + errmsg );
        } );
    }

    get inputs() {
        if (MidiController.midi) {
            return MidiController.inputs;
        }
        return [];
    }

    addListener(callback) {
        MidiController.noteListeners.push(callback);
    }

    static addListener(callback) {
        MidiController.noteListeners.push(callback);
    }

    chooseInput(id) {
        if (MidiController.midi) {
            MidiController.midi.inputs.forEach(item => {
                if (item.id === id) {
                    item.onmidimessage = (event) => {
                        const data = event.data;
                        const type = data[0] & 0xf0;
                        const note = data[1];
                        const notation = [ ...Note.sharpNotations, ...Note.sharpNotations][(note % Note.sharpNotations.length)];
                        const octave = Math.floor(note / Note.sharpNotations.length) - 1;
                        const velocity = data[2];

                        const notedata = { note: notation, octave, velocity };
                        const indx = MidiController.notes.indexOf(notation + octave);
                        switch (type) {
                            case 144: // noteOn message
                                notedata.type = 'on';
                                if (indx === -1) {
                                    MidiController.notes.push(notation + octave);
                                }
                                break;
                            case 128: // noteOff message
                                notedata.type = 'off';
                                if (indx !== -1) {
                                    MidiController.notes.splice(indx, 1);
                                }
                                break;
                        }

                        if (notedata.type) {
                            MidiController.noteListeners.forEach(cb => cb(notedata));
                        }
                    };

                    // put a bit of a delay so the input object has a chance to say
                    // it's connected before we refresh the components
                    requestAnimationFrame( () => {
                        MidiController.hosts.forEach(host => {
                            host.requestUpdate();
                        });
                    });
                }
            });

            MidiController.hosts.forEach(host => {
                host.requestUpdate();
            });
        }
    }

    hostConnected() {
        MidiController.hosts.forEach(host => {
            host.requestUpdate();
        });
    }
}

class PlayModeEvent extends Event {
    static get eventType() { return 'playModeChange'; }

    constructor(opts) {
        super(PlayModeEvent.eventType, opts);
        this.question = opts.question;
        this.playing = opts.playing;
    }
}

class FlashCard extends s {
    static get styles() { return [ styles$6 ] }

    static properties = {
        currentQuestion: { type: String },
        started: { type: Boolean },
        transition: { type: Boolean, reflect: true },
    };

    constructor() {
        super();
        this.transition = false;
        this.started = false;
        this.currentQuestion = undefined;
    }

    score = new ScoreModelController(this);
    timer = new TimerController(this);
    practiceset = new PracticeSetsController(this);
    midi = new MidiController(this);

    willUpdate(_changedProperties) {
        super.willUpdate(_changedProperties);

        if (_changedProperties.has('started') && _changedProperties.get('started') === false) {
            this.timer.start();
            this.transitionToNextQuestion();
        }

        if (_changedProperties.has('transition')) {
            this.dispatchEvent(new PlayModeEvent({
                playing: _changedProperties.get('transition'),
                question: this.currentQuestion ? this.currentQuestion : undefined }));
        }
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        MidiController.addListener( (data) => {
            if (this.currentQuestion && !this.transition) {
                const nooctave = MidiController.notes.map(note => note.substr(0, note.length - 1));
                const uniquenooctave = nooctave.filter((v, i, a) => a.indexOf(v) === i);
                const correct = this.currentQuestion.isCorrect(uniquenooctave);
                if (correct === true) {
                    this.onCorrect();
                } else if (correct === false) {
                    this.onIncorrect();
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'c') {
                this.currentQuestion.isCorrect(this.currentQuestion.notes);
                this.onCorrect();
            }
            if (e.key === 'w') {
                this.currentQuestion.isCorrect(['A#', 'B', 'C']);
                this.onIncorrect();
            }
        });
    }

    onCorrect() {
        this.score.incrementCorrect();
        this.transitionToNextQuestion();
    }

    onIncorrect() {
        this.score.incrementIncorrect();
        this.transitionToNextQuestion();
    }

    transitionToNextQuestion() {
        this.transition = true;
        setTimeout(() => {
            this.currentQuestion = undefined;
            this.timer.resetQuestionTimer();
            this.nextQuestion();
            this.transition = false;
        }, 3500);
    }

    nextQuestion() {
        this.timer.resetQuestionTimer();
        this.currentQuestion = this.practiceset.next;
    }

    render() {
        return template$5(this);
    }
}

customElements.define('krill-flashcard', FlashCard);

const template$4 = (scope) => {
    return $`
        <div class="stats-container">
            <span>Total Questions</span>
            <h1>${scope.score.total}</h1>
        </div>
        
        <div class="stats-container">
            <span>Correct</span>
            <h1>${scope.score.correct}</h1>
        </div>

        <div class="stats-container">
            <span>Incorrect</span>
            <h1>${scope.score.incorrect}</h1>
        </div>
        
        <div class="stats-container">
            <span>Elapsed Time:</span>
            <h1 id="clock">${scope.timer.elapsedSessionTime}</h1>
        </div>`;
};

const styles$5 = r$2`
  :host {
    width: calc(100% - 30px);
    padding: 15px;
    display: flex;
    background-color: #9a9a9a;
    color: white;
  }
  
  .stats-container {
    flex: 1;
    margin-left: 15px;
  }

  .stats-container span {
    font-size: 11px;
  }
  
  h1 {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

class Score extends s {
    static get styles() { return [ styles$5 ] }

    score = new ScoreModelController(this);
    timer = new TimerController(this);

    render() {
        return template$4(this);
    }
}

customElements.define('krill-score', Score);

const template$3 = (scope) => {
    if (scope.midi.inputs.length === 0) {
        return $`<span>Please connect a midi device</span>
        <button @click=${scope.handleMidiRefresh}>refresh</button>`;
    }

    return $`<ul>${scope.midi.inputs.map(input => 
        $`<li @click=${scope.handleInputClick} data-id=${input.id} class=${input.connection}>${input.name}</li>`)}
        </ul>
    <button @click=${scope.handleMidiRefresh}>refresh</button>`;
};

const styles$4 = r$2`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ul {
    list-style: none;
    padding: 0;
    width: 100%;
  }

  span, ul {
    margin-bottom: auto;
  }

  li {
    cursor: pointer;
    padding: 8px;
    border-style: solid;
    border-color: #9a9a9a;
    border-width: 1px;
  }

  li.open {
    background-color: rgb(220 255 220);
    color: rgb(61, 145, 61);
  }

  span {
    font-size: 11px;
    width: 100%;
    display: inline-block;
    text-align: center;
  }

  button {
    width: 50%;
  }
`;

const styles$3 = r$2`
  button {
    cursor: pointer;
    font-weight: bold;
    color: #eaeaea;
    border: none;
    padding: 5px;
    background: #8a8a8a;
    outline: none;
  }

  button:hover {
    background: #696969;
  }

  button:active {
    background: #d3d3d3;
    color: #868686;
  }
`;

class MidiSetup extends s {
    static get styles() { return [ styles$4, styles$3 ] }

    midi = new MidiController(this);

    render() {
        return template$3(this);
    }

    handleMidiRefresh() {
        this.midi.refreshConnection();
    }

    handleInputClick(event) {
        this.midi.chooseInput(event.target.dataset.id);
    }
}

customElements.define('krill-midisetup', MidiSetup);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=e(class extends i{constructor(t$1){var i;if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||(null===(i=t$1.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.et){this.et=new Set,void 0!==i.strings&&(this.st=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.st)||void 0===r?void 0:r.has(t))&&this.et.add(t);return this.render(s)}const e=i.element.classList;this.et.forEach((t=>{t in s||(e.remove(t),this.et.delete(t));}));for(const t in s){const i=!!s[t];i===this.et.has(t)||(null===(o=this.st)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.et.add(t)):(e.remove(t),this.et.delete(t)));}return b}});

const template$2 = (scope) => {
    return $`
        ${renderOptions(scope, scope.sets.options)}`;
};

const renderOptions = (scope, opts, nested) => {
    return $`${Object.entries(opts).map( (entry) => {
        const classes = { section: entry[1].section };
        return $`
            <div class=${o(classes)}>
                ${entry[1].section ? undefined : $`
                <input type="checkbox" 
                       @change=${(event) => {
                           entry[1].value = event.target.checked;
                           if (entry[1].refreshSet) {
                               scope.sets.refreshPracticeSet();
                           }
                       }} 
                       ?checked=${entry[1].value} />`}
                <label>${entry[1].label}</label>

                ${entry[1].options ? renderOptions(scope, entry[1].options) : undefined}
            </div>
        `;
    })}`;
};

const styles$2 = r$2`
    :host {
      font-family: Sans, Arial;
      font-size: 12px;
      display: flex;
      flex-direction: column;
    }
  
    div.section > label {
      text-transform: uppercase;
      font-weight: bolder;
      color: #bababa;
      font-size: 10px;
      margin-bottom: 5px;
      margin-top: 15px;
      display: inline-block;
    }
`;

class TheoryOptions extends s {
    static get styles() { return [ styles$2 ] }

    sets = new PracticeSetsController(this);

    render() {
        return template$2(this);
    }
}

customElements.define('krill-theoryoptions', TheoryOptions);

const template$1 = (scope) => {
    return $`
        <button @click=${scope.handleStartClick}>${scope.started ? 'Stop' : 'Start'}</button>
        <krill-midisetup class="section"></krill-midisetup>
        <krill-theoryoptions class="section"></krill-theoryoptions>`;
};

const styles$1 = r$2`
  :host {
    padding: 15px;
  }
  
  .section {
    background-color: #fafafa;
    min-height: 150px;
    padding: 8px;
    width: calc(100% - 16px);
  }
  
  button {
    font-size: 24px;
    height: 50px;
    width: 100%;
  }
  
  .section, button {
    margin-bottom: 8px;
  }
`;

class SidePanel extends s {
    static get styles() { return [ styles$1, styles$3 ] }

    static properties = {
        started: { type: Boolean }
    };

    render() {
        return template$1(this);
    }

    handleStartClick() {
        if (this.started) {
            this.dispatchEvent(new Event(STOP_EVENT, { bubbles: true, composed: true }));
        } else {
            this.dispatchEvent(new Event(START_EVENT, { bubbles: true, composed: true }));
        }
    }
}

customElements.define('krill-sidepanel', SidePanel);

const START_EVENT = 'start';
const STOP_EVENT = 'stop';

const template = (scope) => {
    return $`
        <krill-sidepanel 
                ?started=${scope.started} 
                @start=${scope.handleStartClick}
                @stop=${scope.handleStopClick}
        ></krill-sidepanel>
        <div>
            <krill-flashcard ?started=${scope.started} @playModeChange=${scope.handlePlayModeChange}></krill-flashcard>
            <piano-keys layout="C" keys=61></piano-keys>
            <krill-score></krill-score>
        </div>`;
};

const styles = r$2`
  :host {
    display: flex;
    height: 100%;
  }
  
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  
  krill-flashcard {
    margin-bottom: 20px;
  }
  
  krill-score {
    margin-top: auto;
  }  
  
  krill-sidepanel {
    width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #eaeaea;
  }
`;

class App extends s {
    static get styles() { return [ styles ] }

    static properties = {
        started: { type: Boolean }
    };

    constructor() {
        super();
        this.started = false;
        this.disableMIDI = false;
        this.notes = [];
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this._pianoEl = this.shadowRoot.querySelector('piano-keys');
        MidiController.addListener(data => this.handleMidi(data));
    }

    handleStartClick() {
        this.started = true;
    }

    handleStopClick() {
        this.started = false;
        this.clearNotes();
    }

    handleMidi(data) {
        if (this.disableMIDI) {
            return;
        }

        if (data.type === 'on') {
            this._pianoEl.setNoteDown(data.note, data.octave);
        } else if (data.type === 'off') {
            this._pianoEl.setNoteUp(data.note, data.octave);
        }
        this.notes = MidiController.notes;
    }

    handlePlayModeChange(e) {
        this.disableMIDI = !e.playing;
        this.clearNotes();

        if (!e.playing && e.question) {
            const answerWithSampleOctave = new Chord(e.question.chord.notation, 4).inversion(e.question.inversion);
            console.log(answerWithSampleOctave);
            answerWithSampleOctave.forEach(note => {
                this._pianoEl.setNoteDown(note.substr(0, note.length-1), note.charAt(note.length-1));
            });
            this.notes = answerWithSampleOctave;
        }
    }

    clearNotes() {
        this.notes.forEach(note => {
            this._pianoEl.setNoteUp(note.substr(0, note.length-1), note.charAt(note.length-1));
        });
        this.notes = [];
    }

    render() {
        return template(this);
    }
}

customElements.define('krill-app', App);

export { App };
//# sourceMappingURL=index.js.map
