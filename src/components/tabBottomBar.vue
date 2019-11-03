<template>
  <div class="tab-bar-box">
    <div class="tab-bar-item home">
      <router-link tag="span" to="/">
        <i></i>
        <em>首页</em>
      </router-link>
    </div>
    <div class="tab-bar-item qrcode" @click="handleQrcodeClick">
      <span>
        <i></i>
        <em>二维码</em>
      </span>
    </div>
    <div class="tab-bar-item my">
      <router-link tag="span" to="/my">
        <i></i>
        <em>我的</em>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleQrcodeClick() {
      this.$emit("qrcodeState");
    }
  }
};
</script>>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.tab-bar-box {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: conver(49);
  background: #fff;
  box-shadow: 0px -2px 4px 0px rgba(127, 127, 127, 0.08);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .tab-bar-item {
    padding-top: conver(5);
    font-size: conver(11);
    font-family: SourceHanSansCN;
    font-weight: 500;
    i {
      display: block;
      width: conver(24);
      height: conver(24);
      margin: 0 auto;
      padding-top: conver(3);
    }
    em {
      color: #666666;
    }
    .router-link-exact-active {
      em {
        color: #000000;
      }
    }
    &.home {
      i {
        background: url("../assets/images/home-icon.png") no-repeat;
        background-size: conver(24) auto;
      }
      .router-link-exact-active {
        i {
          background: url("../assets/images/home-active-icon.png") no-repeat;
          background-size: conver(24) auto;
        }
      }
    }

    &.qrcode {
      i {
        background: url("../assets/images/qrcode-icon.png") no-repeat;
        background-size: conver(22) auto;
      }
    }
    &.my {
      i {
        background: url("../assets/images/my-icon.png") no-repeat;
        background-size: conver(22) auto;
      }
      .router-link-exact-active {
        i {
          background: url("../assets/images/my-active-icon.png") no-repeat;
          background-size: conver(22) auto;
        }
      }
    }
  }
}
</style>