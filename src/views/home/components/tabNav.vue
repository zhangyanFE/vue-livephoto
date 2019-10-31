<template>
  <div class="tab-nav-box">
    <div class="tab-nav">
      <div
        :class="['tab-nav-item', index == active && 'active']"
        v-for="(item, index) in navList"
        :key="index"
        @click="handleNavListItem(item, index)"
      >{{item}}</div>
      <div class="tab-more">
        <!-- <i class="iconfont">&#xe612;</i> -->
        <van-icon name="arrow-down" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        navList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            active: 0
        }
    },
    methods: {
        handleNavListItem(item, index) {
            this.active = index;
            this.$emit('changeNav')
        }
    }
}
</script>>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}

.tab-nav-box {
  position: relative;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(127, 127, 127, 0.09);
  .tab-nav {
    display: -webkit-box;
    height: conver(40);
    line-height: conver(40);
    /* display: flex;
      flex-direction: row;
      justify-content: space-between; */
    overflow: hidden;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin-right: conver(40);
    .tab-nav-item {
      padding: 0 4%;
      text-align: center;
      position: relative;
      font-family: SourceHanSansCN;
      font-weight: 400;
      font-size: conver(14);
      color: #010101;
      &.active {
        font-weight: bold;
        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          margin-top: conver(18);
          padding: 0 conver(20);
          height: conver(3);
          z-index: 3;
          border-radius: conver(4);
          background: linear-gradient(
            90deg,
            rgba(19, 184, 204, 1),
            rgba(76, 90, 247, 1)
          );
        }
      }
    }
    .tab-more {
      position: absolute;
      top: 0;
      right: 0;
      width: conver(40);
      height: conver(40);
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 4px 0px rgba(127, 127, 127, 0.09);
      i {
        padding-left: conver(8);
        padding-top: conver(8);
        font-size: conver(25);
      }
    }
  }
}
</style>