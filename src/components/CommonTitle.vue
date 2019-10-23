<template>
    <div :class="['morning-top', !isHideBackbtn && 'text-center']">
        <i v-if="isHideBackbtn"
           :class="['back-btn', $route.name == 'list' ? 'back-black-icon' : 'back-white-icon']"
           @click="handleBackBtn"></i>
        <span :class="[$route.name == 'list' ? 'black-color' : 'white-color']">{{ title }} :)</span>
    </div>
</template>
<script>
export default {
  name: "commonTitle",
  props: {
    isHideBackbtn: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    titleColor: {
      type: Object,
      default: () => {
        return {
          color: "#333333"
        };
      }
    }
  },
  methods: {
    handleBackBtn() {
      this.$emit("goBack");
    }
  }
};
</script>
<style lang="scss" scoped>
$backBlackIcon: "../assets/images/back-black-icon.png";
$backWhiteIcon: "../assets/images/back-white-icon.png";

$rem: 75;
@function conver($n) {
  @return $n / $rem + unquote("rem");
}

.morning-top {
  position: relative;
  padding-left: conver(250);
  padding-top: conver(30);
  padding-bottom: conver(20);
  font-size: conver(34);
  font-weight: 600;
  -webkit-background-clip: text;
  z-index: 100;
  /* -webkit-text-fill-color:transparent; */
  &.text-center{
    text-align: center;
    padding-left: 0;
  }
  span {
    &.white-color {
      color: #ffffff;
    }
    &.black-color {
      color: #333333;
    }
  }
  .back-btn {
    display: inline-block;
    width: conver(42);
    height: conver(42);
    &.back-black-icon {
      &:before {
        content: "";
        position: absolute;
        top: conver(33);
        left: conver(30);
        width: conver(42);
        height: conver(42);
        background: url($backBlackIcon) no-repeat;
        background-size: conver(42) auto;
      }
    }
    &.back-white-icon {
      &:before {
        content: "";
        position: absolute;
        top: conver(100);
        left: conver(30);
        width: conver(42);
        height: conver(42);
        background: url($backWhiteIcon) no-repeat;
        background-size: conver(42) auto;
      }
    }
  }
}
</style>


