(function(e){function t(t){for(var r,o,u=t[0],c=t[1],l=t[2],f=0,d=[];f<u.length;f++)o=u[f],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);s&&s(t);while(d.length)d.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==a[u]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},a={app:0},i=[];function u(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-048babd3":"f1b9a344","chunk-1767ca5b":"89fe28c7","chunk-21ec7956":"4edd4cdf","chunk-2d0a3553":"ff44f779","chunk-2d0e2d00":"6f25effb","chunk-2d2102f5":"2e3bb709","chunk-2d22b99c":"60ff4fa5","chunk-49e1f010":"2b2402e2","chunk-8d54fd6a":"8b8c577c"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-048babd3":1,"chunk-1767ca5b":1,"chunk-21ec7956":1,"chunk-49e1f010":1,"chunk-8d54fd6a":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-048babd3":"cc259edb","chunk-1767ca5b":"1a171995","chunk-21ec7956":"c9fb2129","chunk-2d0a3553":"31d6cfe0","chunk-2d0e2d00":"31d6cfe0","chunk-2d2102f5":"31d6cfe0","chunk-2d22b99c":"31d6cfe0","chunk-49e1f010":"cc05db16","chunk-8d54fd6a":"148e510e"}[e]+".css",a=c.p+r,i=document.getElementsByTagName("link"),u=0;u<i.length;u++){var l=i[u],f=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(f===r||f===a))return t()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){l=d[u],f=l.getAttribute("data-href");if(f===r||f===a)return t()}var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.onload=t,s.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],s.parentNode.removeChild(s),n(i)},s.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(s)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=i);var l,f=document.createElement("script");f.charset="utf-8",f.timeout=120,c.nc&&f.setAttribute("nonce",c.nc),f.src=u(e);var d=new Error;l=function(t){f.onerror=f.onload=null,clearTimeout(s);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}a[e]=void 0}};var s=setTimeout((function(){l({type:"timeout",target:f})}),12e4);f.onerror=f.onload=l,document.head.appendChild(f)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/h5/livephoto/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],f=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var s=f;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"2a8c":function(e,t,n){},"2e6d":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("4fb2");var r=n("0f1a"),o=(n("88bb"),n("5e1e")),a=(n("568b"),n("0a30")),i=(n("9f61"),n("98e6")),u=(n("d97c"),n("120b")),c=(n("96dd"),n("a60a"),n("e783"),n("8b1f"),n("6e6d")),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("transition",{attrs:{name:"fade"}},[n("keep-alive",[e.$route.meta.keepAlive?n("router-view"):e._e()],1)],1),e.$route.meta.keepAlive?e._e():n("router-view")],1)},f=[],d=(n("e6d1"),{name:"home",data:function(){return{transitionName:"slide-left",active:0}},components:{},watch:{$route:function(e,t){var n=e.path.split("/").length,r=t.path.split("/").length;this.transitionName=n<r?"slide-right":"slide-left"}}}),s=d,p=(n("5c0b"),n("6691")),h=Object(p["a"])(s,l,f,!1,null,null,null),m=h.exports,b=n("c478");c["a"].use(b["a"]);var v=new b["a"]({routes:[{path:"/",name:"home",component:function(){return n.e("chunk-21ec7956").then(n.bind(null,"7abe"))},meta:{keepAlive:!0,title:"图片直播"}},{path:"/my",name:"my",component:function(){return n.e("chunk-49e1f010").then(n.bind(null,"9639"))},meta:{keepAlive:!0,title:"我的"}},{path:"/my/collection",name:"collection",component:function(){return n.e("chunk-1767ca5b").then(n.bind(null,"ea4e"))},meta:{keepAlive:!0,title:"相册收藏"}},{path:"/my/face",name:"faceRecognition",component:function(){return n.e("chunk-2d0e2d00").then(n.bind(null,"7ffa"))},meta:{keepAlive:!0,title:"人脸识别"}},{path:"/my/about",name:"about",component:function(){return n.e("chunk-2d0a3553").then(n.bind(null,"0272"))},meta:{keepAlive:!0,title:"关于我们"}},{path:"/my/appointment",name:"appointment",component:function(){return n.e("chunk-8d54fd6a").then(n.bind(null,"70c5"))},meta:{keepAlive:!0,title:"预约云摄影服务"}},{path:"/my/data",name:"dataAnalysis",component:function(){return n.e("chunk-2d2102f5").then(n.bind(null,"b78b"))},meta:{keepAlive:!0,title:"数据分析"}},{path:"/my/album",name:"albumCollection",component:function(){return n.e("chunk-2d22b99c").then(n.bind(null,"f051"))},meta:{keepAlive:!0,title:"我收藏的照片"}},{path:"/login",name:"login",component:function(){return n.e("chunk-048babd3").then(n.bind(null,"9ed6"))},meta:{keepAlive:!0,title:"登录"}}]});v.beforeEach((function(e,t,n){e.meta.title&&(document.title=e.meta.title),n()}));var g=v,y=n("591a");n("cc1d"),n("f753");n("4634"),n("ed8b"),n("de90"),n("897d");n("efce"),n("97a3"),n("7cfd"),n("d479"),n("c041"),n("ebec");function k(){this.init.apply(this,arguments)}k.prototype={isApp:window.BrBridge&&window.BrBridge.env.isApp,init:function(e){return this.url=e||window.location.href,this.host=this.strip(),this},query:function(e){var t=e||this.url;if(-1!=t.indexOf("?")){var n={},r=t.split("?")[1];if(r){r=r.replace(/#\//g,"");for(var o=r.split("&"),a=0;a<o.length;a++){var i=o[a].indexOf("=");n[o[a].substring(0,i)]=o[a].substr(i+1)}}return n}return null},strip:function(){return-1!=this.url.indexOf("?")?this.url.split("?")[0]:this.url},get:function(e){var t=this.query(this.url);return t&&t[e]||null},go:function(e,t,n){var r=arguments,o={};"string"!=typeof r[0]?(o=r[0],t=o.type,n=1==o.isRefresh&&o.isRefresh,e=BrSPM?this.formatUrlBySPM(o.url):o.url):(e=BrSPM?this.formatUrlBySPM(r[0]):r[0],t=r[1]||"openWindow",n=!(!r[2]||1!=r[2])&&r[2]),this.isApp?window.BrBridge.call("Common",t,{url:e,refresh:n},(function(){}),(function(){})):window.location.href=e},closeWindow:function(){this.isApp?window.BrBridge.call("Common","closeWindow",{},(function(e){console.log("closeWindow")}),(function(e){console.log(e)})):window.history.back()},formatUrlBySPM:function(e){var t=window.BrSPM||t;if(t||-1==e.indexOf("spm=")){var n=-1!=e.indexOf("?")?"&":"?";return e+n+"spm="+t.SPM_ID+".0.0"}return e}};var w=k;new w;"".concat(window.location.protocol);var S={puzzleState:!1,pictureLayoutStyle:"column-2",qrcodeState:!1},A={},P={changePuzzleState:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){var t=e.commit;t("changePuzzleState",changePuzzleState)}))},O={changePuzzleState:function(e,t){e.puzzleState=t},changePictureLayout:function(e,t){e.pictureLayoutStyle=t},changeQrcodeState:function(e,t){e.qrcodeState=t}},B={namespaced:!0,state:S,getters:A,actions:P,mutations:O};c["a"].use(y["a"]);var _=new y["a"].Store({modules:{livephoto:B}}),j=n("816c"),x=n.n(j),z=(n("697a"),n("40ca")),E=n.n(z),M=n("e12b"),C=n.n(M),L=n("8536"),T=n.n(L);n("2a8c"),n("dfbe");c["a"].use(r["a"]).use(o["a"]).use(a["a"]).use(i["a"]).use(u["a"]),c["a"].config.productionTip=!1,c["a"].prototype.Hammerjs=T.a,c["a"].use(C.a),x.a.attach(document.body),c["a"].use(E.a),new c["a"]({store:_,router:g,render:function(e){return e(m)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("2e6d"),o=n.n(r);o.a}});
//# sourceMappingURL=app.bc815309.js.map