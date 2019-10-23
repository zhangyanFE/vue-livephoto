import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home.vue"),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    }
  ]
});
