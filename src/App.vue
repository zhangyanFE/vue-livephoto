<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view class="view" v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      transitionName: "slide-left",
      active: 0
    };
  },
  components: {},
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  }
};
</script>

<style lang="scss">
@function conver($n) {
  @return $n * 2 / 75 + unquote("rem");
}

#app {
  width: 100%;
  height: 100%;
  .van-image {
    font-size: conver(25);
  }
}
.view {
  transition: all 0.3s ease-in-out;
  &.fade-enter-active,
  &.fade-leave-active {
    opacity: 0.01;
  }
  &.fade-enter,
  &.fade-leave {
    transition: opacity 0.3s;
  }
}
</style>
