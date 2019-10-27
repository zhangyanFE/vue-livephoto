<template>
  <div class="wrapper">
    我的
  </div>
</template>
<script>
import { Tab, Tabs } from "vant";
export default {
  components: {
    Tab,
    Tabs,
  }
};
</script>

<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.wrapper {
  .banner {
    width: 100%;
    height: conver(135);
    img {
      display: block;
      width: 100%;
      height: conver(135);
    }
  }
}
</style>