<template>
  <div class="wrapper">
    <div class="user-bg"></div>
    <div class="user-box">
      <div class="user-info">
        <!-- <img src alt="icon" /> -->
        <i></i>
        <span>轻语素纱月初凉</span>
      </div>
      <div class="my-list">
        <div class="list-item" v-for="(item, index) in list" :key="index">
          <router-link tag="div" :to="item.path">
            <i :class="`icon-${item.index}`"></i>
            <span>{{item.title}}</span>
            <i class="arrow-icon"></i>
          </router-link>
        </div>
      </div>
    </div>
    <tab-bottom-bar />
    <router-view></router-view>
  </div>
</template>
<script>
import TabBottomBar from "@/components/TabBottomBar";

export default {
  components: {
    TabBottomBar
  },
  data() {
    return {
      list: [
        {
          title: "相册收藏",
          index: 1,
          path: '/my/collection'
        },
        {
          title: "人脸识别",
          index: 2,
          path: '/my/face'
        },
        {
          title: "我收藏的照片",
          index: 3,
          path: '/my/album'
        },
        {
          title: "数据分析",
          index: 4,
          path: '/my/data'
        },
        {
          title: "预约云摄影服务",
          index: 5,
          path: '/my/appointment'
        },
        {
          title: "关于我们",
          index: 6,
          path: '/my/about'
        }
      ]
    };
  },
  mounted() {},
  activated() {
    console.log("我的");
  },
  deactivated() {
    console.log("离开我的");
  }
};
</script>

<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.wrapper {
  position: relative;
  height: 100%;
  background: #f9f9f9;
  .user-bg {
    width: 100%;
    height: conver(140);
    background: url("./images/bg.png") no-repeat;
    background-size: 100% auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .user-box {
    position: relative;
    z-index: 2;
    padding: conver(48) conver(15) 0 conver(15);

    .user-info {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      height: conver(125);
      background: #fff;
      box-shadow: 0 conver(-2) conver(4) 0 rgba(127, 127, 127, 0.08);
      border-radius: conver(10);
      padding-left: conver(20);
      margin-bottom: conver(22);

      img,
      i {
        display: block;
        width: conver(80);
        height: conver(80);
        background: #3399cc;
        border: conver(4) solid rgba(51, 153, 204, 0.55);
        border-radius: 50%;
      }
      span {
        padding-left: conver(20);
        font-size: conver(15);
        font-family: SourceHanSansCN;
        font-weight: 500;
        color: #000;
      }
    }
    .my-list {
      .list-item {
        position: relative;
        height: conver(45);
        line-height: conver(45);
        background: #fff;
        border-radius: conver(10);
        &:not(:last-child) {
          margin-bottom: conver(9);
        }
        i,
        span {
          display: inline-block;
        }
        i {
          width: conver(18);
          height: conver(18);
          vertical-align: middle;
          margin-right: conver(11);
          margin-left: conver(17);
          &.icon-1 {
            background: url("./images/icon-1.png") no-repeat;
            background-size: conver(18) auto;
          }
          &.icon-2 {
            background: url("./images/icon-2.png") no-repeat;
            background-size: conver(18) auto;
          }
          &.icon-3 {
            background: url("./images/icon-3.png") no-repeat;
            background-size: conver(18) auto;
          }

          &.icon-4 {
            background: url("./images/icon-4.png") no-repeat;
            background-size: conver(18) auto;
          }
          &.icon-5 {
            background: url("./images/icon-5.png") no-repeat;
            background-size: conver(18) auto;
          }
          &.icon-6 {
            background: url("./images/icon-6.png") no-repeat;
            background-size: conver(18) auto;
          }
        }
        .arrow-icon {
          width: conver(9);
          height: conver(16);
          background: url("./images/arrow-icon.png") no-repeat;
          background-size: conver(9) auto;
          position: absolute;
          right: conver(10);
          top: conver(15);
        }
        span {
          color: #000;
          font-size: conver(14);
          font-family: SourceHanSansCN;
          font-weight: 400;
        }
      }
    }
  }
}
</style>