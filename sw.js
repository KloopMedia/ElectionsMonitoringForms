if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise(async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()})),s.then(()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]})},s=(s,r)=>{Promise.all(s.map(e)).then(e=>r(1===e.length?e[0]:e))},r={require:Promise.resolve(s)};self.define=(s,i,a)=>{r[s]||(r[s]=Promise.resolve().then(()=>{let r={};const c={uri:location.origin+s.slice(1)};return Promise.all(i.map(s=>{switch(s){case"exports":return r;case"module":return c;default:return e(s)}})).then(e=>{const s=a(...e);return r.default||(r.default=s),r})}))}}define("./sw.js",["./workbox-f873b976"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"asset-manifest.json",revision:"bdba0f024804499b1793cfdff1e6f72e"},{url:"config_v2.json",revision:"69c6e5a51bbb62543f3eba3ba5efb7c2"},{url:"favicon.ico",revision:"6e1267d9d946b0236cdf6ffd02890894"},{url:"index.html",revision:"65258408567b362bf5b4a5f633aaa648"},{url:"logo192.png",revision:"33dbdd0177549353eeeb785d02c294af"},{url:"logo512.png",revision:"917515db74ea8d1aee6a246cfbcc0b45"},{url:"manifest.json",revision:"89be60895176466398d53bd4a693d9f6"},{url:"precache-manifest.385eec2920b4dda51b4a90de504f686a.js",revision:"385eec2920b4dda51b4a90de504f686a"},{url:"robots.txt",revision:"61c27d2cd39a713f7829422c3d9edcc7"},{url:"service-worker.js",revision:"12a684675ddf649fd8283d0331fa0710"},{url:"static/css/main.8eb32c48.chunk.css",revision:"7a7f284eeb25ad689caeacdb6e8fa329"},{url:"static/js/2.76618857.chunk.js",revision:"5b7477b81bd948b1d0a262352c39cef6"},{url:"static/js/2.76618857.chunk.js.LICENSE.txt",revision:"68474a25a781230a9a35ecc384abd146"},{url:"static/js/main.d4128672.chunk.js",revision:"397b8140bd85f5c7b89d4a5ca31e52d2"},{url:"static/js/runtime-main.f10c6baa.js",revision:"53a917fe169eeebc0d12800b218a4072"}],{})}));
//# sourceMappingURL=sw.js.map
