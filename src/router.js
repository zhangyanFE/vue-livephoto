import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home/index.vue"),
      meta: {
        keepAlive: true,
        title: "图片直播"
      }
    },
    {
      path: "/my",
      name: "my",
      component: () => import("./views/my/index.vue"),
      meta: {
        keepAlive: true,
        title: "我的"
      }
    },
    {
      path: "/my/collection",
      name: "collection",
      component: () => import("./views/my/collection/index.vue"),
      meta: {
        keepAlive: true,
        title: "相册收藏"
      }
    },
    {
      path: "/my/about",
      name: "about",
      component: () => import("./views/my/about/index.vue"),
      meta: {
        keepAlive: true,
        title: "关于我们"
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login/index.vue"),
      meta: {
        keepAlive: true,
        title: "登录"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面 title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
