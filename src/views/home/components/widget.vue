<template>
  <div class="widget-box">
    <div class="widget widget-seek">
      <i></i>
      <span>{{ $t("customName.widget.seek") }}</span>
    </div>
    <router-link class="widget widget-order" tag="div" to="/my/appointment">
      <i></i>
      <span>{{ $t("customName.widget.appointment") }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: "zh-CN"
    };
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
/* iphonex iphoneXS */
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .widget-box {
    bottom: conver(80) !important;
  }
}

/* iphoneXSMax iphoneXR */
@media only screen and (device-width: 414px) and (device-height: 896px) {
  .widget-box {
    bottom: conver(80) !important;
  }
}

.widget-box {
  position: fixed;
  bottom: conver(40);
  right: conver(15);
  z-index: 2;
  .widget {
    width: conver(50);
    height: conver(50);
    background: #fff;
    border-radius: 50%;
    margin-bottom: conver(17);
    box-shadow: 0px -2px 4px 0px rgba(83, 83, 83, 0.33);
    i {
      display: inline-block;
      width: conver(18);
      height: conver(18);
      margin-top: conver(8);
      margin-left: conver(15);
      margin-bottom: conver(-2);
    }
    span {
      display: block;
      color: #666;
      font-size: conver(11);
      font-weight: 500;
      font-family: PingFang;
      text-align: center;
    }
    &.widget-seek {
      i {
        background: url("../images/seek-icon.png") no-repeat;
        background-size: conver(18) auto;
      }
    }
    &.widget-order {
      i {
        background: url("../images/camera-icon.png") no-repeat;
        background-size: conver(18) auto;
      }
    }
  }
}
</style>
