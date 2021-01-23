import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import fastClick from "fastclick";
import VueLazyload from "vue-lazyload";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueMoment from "vue-moment";
import Hammerjs from "hammerjs";
import i18n from "@/lib/locale/i18n";

// 公共样式
import "styles/common.less";
import "swiper/dist/css/swiper.css";

import { Lazyload, ImagePreview, Popup, Toast, Icon, Uploader } from "vant";
Vue.use(Lazyload)
  .use(ImagePreview)
  .use(Popup)
  .use(Toast)
  .use(Icon)
  .use(Uploader);

Vue.config.productionTip = false;

Vue.prototype.Hammerjs = Hammerjs;

// 国际化语言注册全局对象
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
