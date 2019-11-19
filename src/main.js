import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import fastClick from "fastclick";
import VueLazyload from "vue-lazyload";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueMoment from "vue-moment";
import Hammerjs from "hammerjs";
import VueI18n from "vue-i18n";
import En from "@/lib/locale/languages/en-US";
import Zh from "@/lib/locale/languages/zh-CN";
// import ImageClip from "clip-js";

// 公共样式
import "styles/common.less";
import "swiper/dist/css/swiper.css";

import { Lazyload, ImagePreview, Popup, Toast, Icon } from "vant";

// options 为可选参数，无则不传
Vue.use(Lazyload)
  .use(ImagePreview)
  .use(Popup)
  .use(Toast)
  .use(Icon);

Vue.config.productionTip = false;

Vue.prototype.Hammerjs = Hammerjs;

//VUEI18N 国际化语言处理
Vue.use(VueI18n);

//初始化插件变量
const i18n = new VueI18n({
  locale: (function() {
    if (localStorage.getItem("lang")) {
      return localStorage.getItem("lang");
    }
    return 'zh-CN'
  })(), //当前语言环境
  messages: {
    //语言环境对应语言文件的map集合
    "zh-CN": Zh,
    "en-US": En
    // en: {}
  }
});
window.i18n = i18n;
// 时间格式化插件
Vue.use(VueMoment);

// 事件处理
fastClick.attach(document.body);

/* 轮播图 */
Vue.use(VueAwesomeSwiper);

/*图片懒加载*/
// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: require('@/assets/images/loading.png'),
//   loading: require('@/assets/images/loading.png'),
//   attempt: 1
// });

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount("#app");
