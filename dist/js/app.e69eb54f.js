(function(e){function t(t){for(var r,i,o=t[0],s=t[1],u=t[2],d=0,p=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&p.push(a[i][0]),a[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);l&&l(t);while(p.length)p.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,i=1;i<n.length;i++){var o=n[i];0!==a[o]&&(r=!1)}r&&(c.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},i={app:0},a={app:0},c=[];function o(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-be2def98":"50cdab84"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-be2def98":1};i[e]?t.push(i[e]):0!==i[e]&&n[e]&&t.push(i[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-be2def98":"eb347a4c"}[e]+".css",a=s.p+r,c=document.getElementsByTagName("link"),o=0;o<c.length;o++){var u=c[o],d=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(d===r||d===a))return t()}var p=document.getElementsByTagName("style");for(o=0;o<p.length;o++){u=p[o],d=u.getAttribute("data-href");if(d===r||d===a)return t()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=t,l.onerror=function(t){var r=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete i[e],l.parentNode.removeChild(l),n(c)},l.href=a;var f=document.getElementsByTagName("head")[0];f.appendChild(l)})).then((function(){i[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=c);var u,d=document.createElement("script");d.charset="utf-8",d.timeout=120,s.nc&&d.setAttribute("nonce",s.nc),d.src=o(e);var p=new Error;u=function(t){d.onerror=d.onload=null,clearTimeout(l);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;p.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",p.name="ChunkLoadError",p.type=r,p.request=i,n[1](p)}a[e]=void 0}};var l=setTimeout((function(){u({type:"timeout",target:d})}),12e4);d.onerror=d.onload=u,document.head.appendChild(d)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="https://static.yladm.com/Transformers/Bruticus/prod/0.0.3/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],d=u.push.bind(u);u.push=t,u=u.slice();for(var p=0;p<u.length;p++)t(u[p]);var l=d;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"2a8c":function(e,t,n){},"2e6d":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("96dd"),n("a60a"),n("e783"),n("8b1f");var r=n("6e6d"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("transition",[n("keep-alive",[e.$route.meta.keepAlive?n("router-view"):e._e()],1)],1),e.$route.meta.keepAlive?e._e():n("router-view")],1)},a=[],c=(n("e6d1"),{name:"",data:function(){return{transitionName:"slide-left"}},watch:{$route:function(e,t){var n=e.path.split("/").length,r=t.path.split("/").length;this.transitionName=n<r?"slide-right":"slide-left"}}}),o=c,s=(n("5c0b"),n("6691")),u=Object(s["a"])(o,i,a,!1,null,null,null),d=u.exports,p=n("c478");r["a"].use(p["a"]);var l=new p["a"]({routes:[{path:"/",name:"themeplay",component:function(){return n.e("chunk-be2def98").then(n.bind(null,"c2e5"))},meta:{keepAlive:!1}}]}),f=n("591a"),m=(n("63ff"),n("f8f9")),g=n("f96b"),y=n("f1ed"),h={prePlaySrcData:{}},v=0,b={},A={get_listItem_data:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.commit,t.state,this.accessKey=Object(y["g"])("access_key"),this.id=Object(y["g"])("id"),n={id:this.id,access_key:this.accessKey,size:3},e.next=6,g["a"].getUgcFeedApi(n);case 6:return r=e.sent,e.abrupt("return",r);case 8:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),get_list_data:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.commit,t.state,v+=1,this.accessKey=Object(y["g"])("access_key"),this.id=Object(y["g"])("id"),n={access_key:this.accessKey,page:v,size:3,day:Object(y["g"])("day")},e.next=7,g["a"].getList(n);case 7:return r=e.sent,e.abrupt("return",r);case 9:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),get_prePlay_data:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(t,n){var r,i,a,c,o,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,t.state,this.accessKey=Object(y["g"])("access_key"),a={access_key:this.accessKey,id:n},e.next=5,g["a"].prePlayVideoApi(a);case 5:c=e.sent,o=c.data,s=Object(y["b"])(o),i=JSON.parse(s).bitrates[0].uri,r("set_prePlaySrcData_data",{res:i,videoId:n});case 10:case"end":return e.stop()}}),e,this)})));function t(t,n){return e.apply(this,arguments)}return t}(),get_playVideo_data:function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(t,n){var r,i,a,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.commit,t.state,this.accessKey=Object(y["g"])("access_key"),i={access_key:this.accessKey,id:n},e.next=5,g["a"].playVideoApi(i);case 5:if(a=e.sent,c=a.bitrates,!c[0]){e.next=10;break}return r=c[0].uri,e.abrupt("return",r);case 10:case"end":return e.stop()}}),e,this)})));function t(t,n){return e.apply(this,arguments)}return t}(),set_animateDoing_data:function(e){var t=e.commit;t("set_animateDoing_data")}},w={set_listItem_data:function(e,t){e.ugcListItem=t},set_animateDoing_data:function(e,t){e.animateDoing=t},set_prePlaySrcData_data:function(e,t){e.prePlaySrcData[t.videoId]=t.res,e.prePlaySrcData=JSON.parse(JSON.stringify(e.prePlaySrcData))}},k={namespaced:!0,state:h,getters:b,actions:A,mutations:w};r["a"].use(f["a"]);var O=new f["a"].Store({modules:{themeplay:k}}),E=n("816c"),_=n.n(E),B=n("697a"),j=n("40ca"),C=n.n(j),S=n("e12b"),P=n.n(S),Q=n("8536"),R=n.n(Q);n("2a8c"),n("dfbe");r["a"].config.productionTip=!1,r["a"].prototype.Hammerjs=R.a,r["a"].use(P.a),_.a.attach(document.body),r["a"].use(C.a),r["a"].use(B["a"],{preLoad:1.3,error:n("cfcf"),loading:n("cfcf"),attempt:1}),new r["a"]({store:O,router:l,render:function(e){return e(d)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("2e6d"),i=n.n(r);i.a},cfcf:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAACKCAYAAACglQYpAAAABGdBTUEAALGPC/xhBQAACvxJREFUeAHtnel2mzoURp02aaa27/+M+d0hHXPv53uPIxMG6SAdZHuzVgsGTWyxfYQgydXT09PLjgUCEOiSwLsuW0WjIACBPQEE5UKAQMcEELTjzqFpEEBQrgEIdEwAQTvuHJoGAQTlGoBAxwQQtOPOoWkQQFCuAQh0TABBO+4cmgYBBOUagEDHBBC0486haRBAUK4BCHRMAEE77hyaBgEE5RqAQMcEELTjzqFpEEBQrgEIdEwAQTvuHJoGAQTlGoBAxwQQtOPOoWkQQFCuAQh0TABBO+4cmgYBBOUagEDHBBC0486haRBAUK4BCHRMAEE77hyaBgEE5RqAQMcEELTjzqFpEEBQrgEIdEwAQTvuHJoGAQTlGnhD4Orqavfu3bud1izbErjetnpq743A9fX17vb2dqf18/Pz7ufPn7uXF/5C5Vb9hKBbke+s3pubm93d3d3u/fv3h5bd39/v933//n0v6uEAG2EEEDQMdb8VSURFzbFFw9yHh4d9FP3169dYEvY1JMA9aEO4p1C05JuSM22/0nFPmhKJ2UbQGM5d1qLI+eHDh6y2Sc4ckbMKI1E2AQTNRnVeCSVmqXC5Mp8XqW3PBkG35b9J7XqEouhZuiifZndZ4gggaBzrbmqSnN77yXSWt5sTOuOGIOgZd+7YqSkC6pGKd0FQLzlfPgT1cTvZXHrWuWbRMJcljgC041hvXpOi59p7SO/QePOTP9EGIOiJdpyn2Wujp+pEUA95fx4E9bM7qZy6d1wbPU/qhM+ksQh6Jh25dBq1nmHy4vwS6brHEbQuz25LWzNzm54UgqY02m8jaHvGm9cgOWvNviJobHciaCzvTWqrFT3V+L9//25yDpdaKYJu3POaFdUETsvZ0ZqTQwgae8HwYmUs76Pa9CNcim6SU0NH/bylfji65jBSctYa3qrxCHrUhc0/EEGbIx6vQHJqZtUip9b6/OnTp6PfajCeO39vzeipWv/8+ZNfOSlXE0DQ1QjLC5A0U489FO0eHx+rRb2agip6EkHL+3tNDgRdQ8+Zd+nnME1SZ/GHbIrKNV9uJ3oe0IZtIGgY6teKcqRRmrWv5tWefPr9+/frSbAVQgBBQzC/VqLomDtpI0Fz077W8LpVc3irUomgr2yjthA0ivT/9ZQKtyaK5kTq3NPXzDIRNJdWvXQIWo9lVkk2a5uV+N9EmkwqldrKrikochrV2DWCxvJ21TY14ztXmKT2ij1WLr8Td4xK+30I2p7xUQ2elxC8gh5VvPIDEXQlQGd2BHWC82bzCKpIWDrhU3t4y/NPb4+vy4eg6/gV59aF7pG0NIoyvC3umi4zIGhwt0hOj6BbRVC1lfvP4IskqQ5BExhRm57niYqIJcPWWhFU954Mb6OujLf1IOhbJs33eARVo3KjqB7llD7OmTpp/X1Qlu0IIOgG7L0zotGCKnIyvN3gAkmqRNAERtSmIqjnPjR3iFtreIucUVfEdD0IOs2m2RHJ6RnmSrwc+WoNb3/8+NGMAQXnEUDQPE7VU3mjU04UzZF46YSYHFoiFHMcQWM4v6nFK2iOfDUiKNHzTZdtsgNBN8H+3+/28QxzIyKo2uX9AtkI59lWi6Abdq3nEUZEBCV6bnhRDKpG0AGQyI+KUqWzua0F5dFK5BWwXBeCLjNqlkIylD4TzXkJYc09qKJn6ZdGM0AUvEPQjS+C0uFkjqDeU5KYnmG3tz7yLRNA0GVGTVMogpZOFi1FyKXjUydE9Jwis91+BN2O/aHm0qiVcx96KDxzQ9GzNJpnFk2yFQQQdAW8WlklaMl9nzdCzrX3+fm5qA1zZXGsHgEErcfSXVJp9KotqCarSqO4+2TJWEQAQYtwtUtccv9XW1CiZ7t+XVsygq4lWCl/aRStVO1+goroWYtm/XIQtD5Td4klUdRdySCj/twhS78EELSjvsmNoktD3NwJJ0XO0hclOsJ1EU1B0M66WVFUkzZzy5KAS8dVttLo3pOlbwII2ln/1BAnR1DJufRF0Bmai2wOgnbY7UtDzyUBl45rWMtLCR12/EiTEHQESg+75iZvlgSci4zK++3btx5OkTZkEEDQDEhbJNH7uVP3iEuCzr3bK/HnBN7iXKlzmgCCTrPZ/IgEHZtlXRJsSlANnXnmuXm3FjUAQYtwxSfWcDQVUtFzSkBrndIP0+iHwxnaGqHTWSNo530l2b5+/XqQNDcCpvewyqMyWE6PwNXT09PL6TX78lqslxP0m+VLfpmXfixN+YbR9PLone4ZX59u0y+r5RralsgpOunQ+LJonc/ZIugJ96V+Baf+KVLavami5dIs7wmf8sU1HUEDu1xD1IeHh/2Qc+qe8P7+fndzc7N/xDJ1v6ly7u7uRv/amaKmXkKYehFBMj8+Pu4l/vLly9HZS3a1T8Ni3cMOI7aOqe6xY0cF8aEaASaJqqGcL0gXvcSQIBJw7BdQK43+krbSTP1Fbe3/+PHjqJxqgfJKctU1tkgw1a21/qWLpLeIrO10sTZpPTyWpmO7LgEErctztjQJaEu6bfvS9dhxia0oZouGs3pWqmisRyhpxBumTfPYdiqo6ks/m6iWNv1CmXqBwtKyrkfg+Cu0XrmUtJLA2H2kIqMtGsKmj1K0X0NiE1PCKdpK2lRcSa1hsCLhUMjhl4KO2zA7TcussPVC+zURtD3j0RrGBBzbZ5lt6KvPertoKKelk4zpsdvbWzt0WJtgaVQ0AXXM3l6S7LbYccnN7LBRab8mgrZnPFqDhBte6IpgwyhmmU0QfV4aYirq6T5RUVISqsxUfgko+bRfxyWlla9j9tkEVjqVpcXk3X/gv+YEELQ54vEKxiLbeMr/9pogEs0i4Fx6iaQvAZMrzZNKJgn1RWEymqAq2wTXtsrRkubd7+C/pgQQtCne6cIlRRrVLKWJYp9brK1ui6D6rG21RwJqrX0S1CKrtQNBjUTMGkFjOL+pRbOuw4tdknz+/PkQrdJMEkaLSTXMm6bVtolusqXHtc+GsRJQZWrRPh3TovIVgVNB1QZrxz4R/zUnwCRRc8R1KkiFXBoe6/7SBE2lS1ti5SmdTQbZPqWzmV8JapKmx9Oy2G5HAEHbsa1asoSx6CWh0kcuaUWSKX1WOvVGUSqbRdB0n92z6tjY8bROttsRYIjbju2qkk0KK0RDTz0+sTeEFEUlo2ZsJZPSS1wNS22R1BYJbZ+tLbJaPTbsteP6MlAai8Tab9JaGtbtCSBoe8aHGiRBKsThwMiG3QumhySbJLXoKXlsO02nbUXDuR/QNiHT4euwTtVngpqww3r43JYAQ9y2fA+l6+K3H7yWPGPRSGkUEW19yJxsaMiql9zH8iuZ8uo5qdJoe25ROomnf2PPVi06W5lzZXGsDQF+YLsN15BSFd0UATWslbCpUCENoJLmBBjiNkfcrgJJqX9TE0HtaqbkKAIMcaNIUw8EHAQQ1AGNLBCIIoCgUaSpBwIOAgjqgEYWCEQRQNAo0tQDAQcBBHVAIwsEogggaBRp6oGAgwCCOqCRBQJRBBA0ijT1QMBBAEEd0MgCgSgCCBpFmnog4CCAoA5oZIFAFAEEjSJNPRBwEEBQBzSyQCCKAIJGkaYeCDgIIKgDGlkgEEUAQaNIUw8EHAQQ1AGNLBCIIoCgUaSpBwIOAgjqgEYWCEQRQNAo0tQDAQcBBHVAIwsEogggaBRp6oGAgwCCOqCRBQJRBBA0ijT1QMBBAEEd0MgCgSgCCBpFmnog4CCAoA5oZIFAFAEEjSJNPRBwEPgHGkXFhlByr/MAAAAASUVORK5CYII="},f1ed:function(e,t,n){"use strict";n("efce"),n("4634"),n("ed8b");var r=n("97a3");n("cc1d"),n("7cfd"),n("e6d1"),n("d479"),n("c041"),n("ebec");function i(){this.init.apply(this,arguments)}i.prototype={isApp:window.BrBridge&&window.BrBridge.env.isApp,init:function(e){return this.url=e||window.location.href,this.host=this.strip(),this},query:function(e){var t=e||this.url;if(-1!=t.indexOf("?")){var n={},r=t.split("?")[1];if(r){r=r.replace(/#\//g,"");for(var i=r.split("&"),a=0;a<i.length;a++){var c=i[a].indexOf("=");n[i[a].substring(0,c)]=i[a].substr(c+1)}}return n}return null},strip:function(){return-1!=this.url.indexOf("?")?this.url.split("?")[0]:this.url},get:function(e){var t=this.query(this.url);return t&&t[e]||null},go:function(e,t,n){var r=arguments,i={};"string"!=typeof r[0]?(i=r[0],t=i.type,n=1==i.isRefresh&&i.isRefresh,e=BrSPM?this.formatUrlBySPM(i.url):i.url):(e=BrSPM?this.formatUrlBySPM(r[0]):r[0],t=r[1]||"openWindow",n=!(!r[2]||1!=r[2])&&r[2]),this.isApp?window.BrBridge.call("Common",t,{url:e,refresh:n},(function(){}),(function(){})):window.location.href=e},closeWindow:function(){this.isApp?window.BrBridge.call("Common","closeWindow",{},(function(e){console.log("closeWindow")}),(function(e){console.log(e)})):window.history.back()},formatUrlBySPM:function(e){var t=window.BrSPM||t;if(t||-1==e.indexOf("spm=")){var n=-1!=e.indexOf("?")?"&":"?";return e+n+"spm="+t.SPM_ID+".0.0"}return e}};var a=i;function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(n,!0).forEach((function(t){Object(r["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}n.d(t,"d",(function(){return l})),n.d(t,"f",(function(){return f})),n.d(t,"e",(function(){return m})),n.d(t,"k",(function(){return v})),n.d(t,"c",(function(){return b})),n.d(t,"b",(function(){return A})),n.d(t,"a",(function(){return w})),n.d(t,"h",(function(){return k})),n.d(t,"j",(function(){return O})),n.d(t,"g",(function(){return E})),n.d(t,"i",(function(){return _}));var s=new a;function u(){var e=navigator.userAgent;return e.indexOf("Android")>-1||e.indexOf("Adr")>-1}function d(){var e=navigator.userAgent;return!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)}function p(){var e=d(),t=u();return e?"iPhone":t?"Android":"PC"}function l(e){var t,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return t=document.cookie.match(n),t?t[2]:null}var f=function(){var e=y("uid")||"";if(e=e.split("/")[0],!e&&(e=y("c_uid"),!e&&(e=y("suid"),!e))){var t=l("yl_uid");e=t||""}return e=e.substring(0,64),v("yl_uid",e),e},m=function(){var e=y("udid")||"";if(e=e.split("/")[0],!e&&(e=y("c_udid"),!e&&(e=y("sudid"),!e))){var t=l("yl_udid");e=t||b(40)}return v("yl_udid",e),e},g=function(){var e=y("prid")||"";if(e=e.split("/")[0],!e&&(e=y("sprid"),!e)){var t=l("yl_prid");e=t||""}return v("yl_prid",e),parseInt(e)};var y=function(e){var t=h(window.location.href);return t&&t[e]||null},h=function(e){var t=e||this.url;if(-1!=t.indexOf("?")){var n={},r=t.split("?")[1];if(r){r=r.replace(/#/g,"");for(var i=r.split("&"),a=0;a<i.length;a++){var c=i[a].indexOf("=");n[i[a].substring(0,c)]=i[a].substr(c+1)}}return n}return null};function v(e,t){var n=300,r=new Date;r.setTime(r.getTime()+24*n*60*60*1e3),document.cookie=e+"="+escape(t)+";expires="+r.toGMTString()}function b(e){for(var t=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],n=["0","1","2","3","4","5","6","7","8","9"],r=n.concat(t).concat(t.map((function(e){return e.toLowerCase()}))),i="",a=0;a<e;a++){var c=Math.ceil(61*Math.random());i+=r[c]}return i}function A(e){var t="1234123412ABCDEF",n={iv:CryptoJS.enc.Utf8.parse(t),mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7},r=CryptoJS.enc.Utf8.parse(t),i=CryptoJS.AES.decrypt(e,r,n);return CryptoJS.enc.Utf8.stringify(i).toString()}function w(e){return e>1e4?Math.floor(e/100)/100+"w":e}function k(e){window.YLSPM_JPUSH.RecordEvent(o({},e))}function O(e){var t=e.spmID,n=e.type,r=e.videoid,i=void 0===r?"":r,a=e.eventName,c=void 0===a?"":a,s=e.data;window.YLSPM&&window.YLSPM.RecordEvent(t,o({type:n,videoid:i,prid:g()||"5"},s),c)}function E(e){return s.get(e)&&s.get(e).split("/")[0]||""}function _(){return"iPhone"==p()?"iOS":"Android"==p()?"Android":"PC"}},f96b:function(e,t,n){"use strict";var r=n("f753"),i=n.n(r);function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"post",r=i.a.create({baseURL:Object({NODE_ENV:"production",BASE_URL:"https://static.yladm.com/Transformers/Bruticus/prod/0.0.3/"}).API_ROOT,headers:{"Content-Type":"get"===n.toLowerCase()?"application/x-www-form-urlencoded;charset=utf-8":"multipart/form-data"}});return new Promise((function(i,a){var c={url:e,method:n};"get"===n.toLowerCase()?c.params=t:c.data=t,r(c).then((function(e){200==e.data.retcode&&i(e.data)})).catch((function(e){a(e),console.error(e)}))}))}n("4634"),n("ed8b"),n("de90");var c=n("897d"),o=n.n(c),s="Cx2LBrnRAqRsJOhrMMieBu07jvJu3a91";function u(e){for(var t=Object.keys(e).sort(),n={},r=0;r<t.length;r++)n[t[r]]=e[t[r]];return n}function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"access_token",n="";if(!e||!s)return n;var r=u(e);for(var i in r[t]="MARexyHggm5YDfbc3fCbqnXTziXSYFbL",r)n+=i+"="+r[i]+"&";return n=n.substr(0,n.length-1),o()(n)}var p=n("f1ed"),l="".concat(window.location.protocol),f=("".concat(l,"//comm.yladm.com"),"");f=1==Object(p["g"])("requestRefer")?"".concat(l,"//openapis.qianpailive.cn"):"https://sv.1lan.tv"===window.location.origin||"http://sv.1lan.tv"===window.location.origin||"https://h5.1lan.tv"===window.location.origin||"http://h5.1lan.tv"===window.location.origin?"".concat(l,"//openapis.1lan.tv"):"".concat(l,"//openapis.yladm.com");var m="".concat(l,"//openapiv2.yladm.com"),g="".concat(l,"//openapis.qianpailive.cn/partner/jpush");function y(){return""!==Object(p["g"])("udid")?Object(p["g"])("udid"):Object(p["e"])()}var h={jpushApi:function(e){var t=e,n=(new Date,e.content),r=e.app_key;return t.app_key=r,t.client_id=y(),t.content=n,a("https://morning.jpush.cn/h5/morning",t,"post")},videoListApi:function(e){var t=e,n=1*new Date,r=e.access_key,i={access_key:r,timestamp:n,udid:y(),x_yl_h5:n},c=d(i);return t.sign=c,t.timestamp=n,t.x_yl_h5=n,t.platform="h5",t.prid="13",t.udid=y(),a("".concat(m,"/plat/ugcfeed"),t,"get")},zhuanjiListApi:function(e){var t=e,n=1*new Date,r=e.access_key,i={access_key:r,timestamp:n,udid:y(),x_yl_h5:n},c=d(i);return t.sign=c,t.timestamp=n,t.udid=y(),t.x_yl_h5=n,a("".concat(l,"//openapis.qianpailive.cn/partner/jpush/topic"),t,"get")},recommendListApi:function(e){var t=e,n=1*new Date,r=e.access_key,i=e.page,c=e.size,o=e.block_id,s=e.day,u=e.edition,p=void 0===u?"":u,l={access_key:r,block_id:o,timestamp:n,udid:y(),size:c,page:i,day:s,x_yl_h5:n,appkey:"yilan",pkg_name:"yilan.com"},f=d(l);return t.sign=f,t.timestamp=n,t.udid=y(),t.appkey="yilan",t.pkg_name="yilan.com",t.x_yl_h5=n,t.day=s,t.edition=p,a("".concat(g,"/blockvideo"),t,"get")},morningListApi:function(e){var t=e,n=1*new Date,r=e.access_key,i=e.day,c=e.edition,o=void 0===c?"":c,s={access_key:r,timestamp:n,day:i,x_yl_h5:n,udid:y(),appkey:"yilan",pkg_name:"yilan.com"},u=d(s);return t.sign=u,t.timestamp=n,t.udid=y(),t.appkey="yilan",t.pkg_name="yilan.com",t.x_yl_h5=n,t.day=i,t.edition=o,a("".concat(g,"/homerecommend"),t,"get")},homeWeatherApi:function(e){var t=e,n=1*new Date,r=e.access_key,i=e.day,c=e.location,o={access_key:r,timestamp:n,day:i,udid:y(),appkey:"yilan",pkg_name:"yilan.com",location:c},s=d(o);return t.sign=s,t.timestamp=n,t.udid=y(),t.appkey="yilan",t.pkg_name="yilan.com",t.x_yl_h5=n,t.day=i,t.location=c,a("".concat(g,"/homeweather"),t,"get")},playVideoApi:function(e){var t=e,n=1*new Date,r=e.access_key,i=e.id,c={access_key:r,id:i,timestamp:n,udid:y(),uid:Object(p["f"])()},o=d(c);return t.sign=o,t.timestamp=n,t.udid=y(),t.uid=Object(p["f"])(),1==Object(p["g"])("requestRefer")&&(t.os=Object(p["i"])()),a("".concat(f,"/plat/play"),t,"get")},prePlayVideoApi:function(e){var t=e,n=1*new Date,r=e.access_key,i=e.id,c={access_key:r,id:i,timestamp:n,udid:Object(p["e"])(),uid:Object(p["f"])()},o=d(c);return t.sign=o,t.timestamp=n,t.udid=Object(p["e"])(),t.uid=Object(p["f"])(),a("".concat(f,"/plat/preplay"),t,"get")},getUgcVideoApi:function(e){var t=e,n=1*new Date,r=e.access_key,i=e.id,c={access_key:r,id:i,timestamp:n,udid:Object(p["e"])(),uid:Object(p["f"])(),platform:"h5",x_yl_h5:n,prid:"13"},o=d(c);return t.sign=o,t.access_key=c.access_key,t.platform="h5",t.timestamp=n,t.x_yl_h5=t.timestamp,t.udid=c.udid,t.uid=c.uid,t.prid="13",a("".concat(f,"/plat/ugcvideos"),t,"get")},getList:function(e){var t=e,n=1*new Date,r=e.access_key,i=e.page,c=e.size,o=e.day,s={access_key:r,timestamp:n,x_yl_h5:n,udid:Object(p["e"])(),appkey:Object(p["g"])("appkey"),pkg_name:Object(p["g"])("pkg_name"),page:i,size:c},u=d(s);return t.sign=u,t.access_key=r,t.timestamp=n,t.x_yl_h5=n,t.udid=s.udid,t.page=i,t.size=c,t.day=o,t.appkey=s.appkey,t.pkg_name=s.pkg_name,a("".concat(g,"/appvideos"),t,"get")},getUgcFeedApi:function(e){var t=e,n=1*new Date,r=e.access_key,i=e.id,c={access_key:r,id:i,timestamp:n,udid:Object(p["e"])(),uid:Object(p["f"])(),platform:"h5",x_yl_h5:n,prid:"13"},o=d(c);return t.sign=o,t.access_key=c.access_key,t.platform="h5",t.timestamp=n,t.x_yl_h5=t.timestamp,t.udid=c.udid,t.uid=c.uid,t.prid="13",a("".concat(f,"/plat/ugcfeed"),t,"get")},getAlphaUgcFeedApi:function(e){var t=e,n=1*new Date,r=e.access_key,i=e.id,c=e.pg,o=e.sz,s=e.cate_id,u={access_key:r,id:i,pg:c,sz:o,cate_id:s,timestamp:n,udid:Object(p["e"])(),uid:Object(p["f"])(),platform:"h5",x_yl_h5:n,prid:"13"},l=d(u);return t.sign=l,t.access_key=u.access_key,t.platform="h5",t.id=e.id,t.timestamp=n,t.x_yl_h5=t.timestamp,t.udid=u.udid,t.uid=u.uid,t.prid="13",a("".concat(f,"/plat/ugccatevideo"),t,"get")}};t["a"]=h}});
//# sourceMappingURL=app.e69eb54f.js.map