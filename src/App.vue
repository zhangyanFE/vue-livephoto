<template>
  <div id="app">
    <transition>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition>
    <router-view v-if="!$route.meta.keepAlive" />
    <div class>
      <!-- <Tabbar v-model="active">
        <TabbarItem icon="home-o">
          <span>首页</span>
          <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.normal" />
        </TabbarItem>
        <TabbarItem icon="search">
          <router-link to="/" tag="span">首页</router-link>
        </TabbarItem>
        <TabbarItem icon="setting-o">
          <router-link to="/my" tag="span">我的</router-link>
        </TabbarItem>
      </Tabbar>-->
    </div>
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
#app {
  width: 100%;
  height: 100%;
}
</style>
