if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise(async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()})),r.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},r=(r,i)=>{Promise.all(r.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(r)};self.define=(r,o,s)=>{i[r]||(i[r]=Promise.resolve().then(()=>{let i={};const n={uri:location.origin+r.slice(1)};return Promise.all(o.map(r=>{switch(r){case"exports":return i;case"module":return n;default:return e(r)}})).then(e=>{const r=s(...e);return i.default||(i.default=r),i})}))}}define("./sw.js",["./workbox-edf56249"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"config_v2.json",revision:"69c6e5a51bbb62543f3eba3ba5efb7c2"},{url:"favicon.ico",revision:"6e1267d9d946b0236cdf6ffd02890894"},{url:"index.html",revision:"9fd67e135d40225e596a6e144d1daf38"},{url:"logo192.png",revision:"33dbdd0177549353eeeb785d02c294af"},{url:"logo512.png",revision:"917515db74ea8d1aee6a246cfbcc0b45"},{url:"manifest.json",revision:"89be60895176466398d53bd4a693d9f6"},{url:"robots.txt",revision:"61c27d2cd39a713f7829422c3d9edcc7"}],{})}));
//# sourceMappingURL=sw.js.map
