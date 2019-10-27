<template>
  <div class="banner">
    <img
      src="http://m.360buyimg.com/mobilecms/s700x280_jfs/t1/75964/2/13749/86827/5db14d08Ecab1f68f/6e4b81003e1e904f.jpg!cr_1125x445_0_171!q70.jpg.dpg"
      alt
    />
  </div>
</template>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.banner {
  width: 100%;
  height: conver(135);
  img {
    display: block;
    width: 100%;
    height: conver(135);
  }
}
</style>