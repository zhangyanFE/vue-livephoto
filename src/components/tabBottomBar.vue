<template>
  <div class="tab-bar-box">
    <div
      v-for="(item, index) in tabBarList"
      :class="['tab-bar-item', item.className]"
      :key="index"
      @click="handleQrcodeClick(index)"
    >
      <span v-if="item.className == 'qrcode'">
        <i></i>
        <em>{{ $t('customName.tabBottomBar.qrcode') }}</em>
      </span>
      <router-link tag="span" :to="item.path" v-else>
        <i></i>
        <em v-if="index==0">{{ $t('customName.tabBottomBar.home') }}</em>
        <em v-if="index==2">{{ $t('customName.tabBottomBar.my') }}</em>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabBarList: [
        {
          className: "home",
          path: "/",
        },
        {
          className: "qrcode",
          path: "",
        },
        {
          className: "my",
          path: "/my/info",
        }
      ]
    };
  },
  methods: {
    handleQrcodeClick(index) {
      index == 1 && this.$emit("qrcodeState");
    }
  }
};
</script>
>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}

/* iphonex iphoneXS */
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .tab-bar-box {
    /* background-color: #fff; */
    padding-bottom: 34px;
  }
}

/* iphoneXSMax iphoneXR */
@media only screen and (device-width: 414px) and (device-height: 896px) {
  .tab-bar-box {
    /* background-color: #fff; */
    padding-bottom: 34px;
  }
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
    width: 33.3%;
    text-align: center;
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
