<template>
  <div class="play-tip">
    <i></i>
    <span>即将播放下一条</span>
  </div>
</template>
<style lang="scss" scoped>
$timeIcon: "../assets/images/time-icon.png";

$rem: 75;
@function conver($n) {
  @return $n / $rem + unquote("rem");
}

.play-tip {
  display: none;
  position: fixed;
  bottom: conver(167);
  right: conver(30);
  z-index: 4;
  i {
    width: conver(24);
    height: conver(24);
    display: inline-block;
    background: url($timeIcon) no-repeat;
    background-size: conver(24) auto;
    vertical-align: middle;
  }
  span {
    font-size: conver(24);
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: #ffffff;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    vertical-align: middle;
    padding-left: conver(6);
  }
}
</style>