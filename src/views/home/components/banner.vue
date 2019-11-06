<template>
  <div class="banner-box" id="J_banner">
    <img :src="setBanner" alt="banner" />
  </div>
</template>
<script>
import { banner } from "@/assets/images/img";

export default {
  computed: {
    setBanner() {
      return banner;
    }
  }
};
</script>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.banner-box {
  width: 100%;
  height: conver(135);
  line-height: conver(135);
  text-align: center;
  color: #000;
  background: #f3f3f3;
  img {
    display: block;
    width: 100%;
    height: conver(135);
  }
}
</style>