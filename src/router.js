import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home/index.vue"),
      meta: {
        keepAlive: true // 不需要被缓存
      }
    },
    {
      path: "/my",
      name: "my",
      component: () => import("./views/my/index.vue"),
      meta: {
        keepAlive: true // 不需要被缓存
      }
    }
  ]
});
