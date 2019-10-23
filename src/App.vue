<template>
  <div id="app">
    <transition>
      <keep-alive>
         <router-view  v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition>
    <router-view  v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
}
</script>

<style lang="scss">
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
