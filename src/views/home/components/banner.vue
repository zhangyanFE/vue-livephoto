<template>
  <div class="banner-box" id="J_banner">
    banner
    <!-- <img
      src="http://oss.suning.com/aps/aps_learning/iwogh/2019/10/25/16/iwoghBannerPicture/c7e375d0c4884550b5cb2c7089a45c68.png?format=_is_1242w_610h"
      alt
    /> -->
  </div>
</template>
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