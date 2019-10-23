<template>
  <div :class="['guide', !showGuide && 'guide-hide']">
    <div class="handle-icon">
      <i></i>
      <span>左滑看下一条</span>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    showGuide: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
$guideIcon: "../assets/images/left-slide-icon.png";

$rem: 75;
@function conver($n) {
  @return $n / $rem + unquote("rem");
}

.guide {
  position: fixed;
  top: conver(53);
  right: conver(30);
  z-index: 4;
  opacity: 1;
  transition: opacity 1s;
  animation: move 1.5s linear infinite 0s alternate;
  &.guide-hide{
    opacity: 0;
  }
  .handle-icon {
    i {
      width: conver(64);
      height: conver(82);
      display: inline-block;
      background: url($guideIcon) no-repeat;
      background-size: conver(64) auto;
      vertical-align: middle;
    }
    span {
      font-size: conver(34);
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: #ffffff;
      text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
      vertical-align: middle;
      padding-left: conver(18);
    }
  }
  @keyframes move {
      0%{
          transform: translateX(-60px);
      }
      100%{
          transform: translateX(0);
      }
  }

  @keyframes moveImg {
    0% {
      transform: translate(-100, 100);
    }
    100% {
      transform: translate(100);
    }
  }
}
</style>