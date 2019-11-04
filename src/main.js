import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import fastClick from "fastclick";
import VueLazyload from "vue-lazyload";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueMoment from "vue-moment";
import Hammerjs from "hammerjs";
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
  store,
  router,
  render: h => h(App)
}).$mount("#app");
