<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-15 16:45:18
 * @LastEditTime: 2019-10-18 08:52:44
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="video-element-info">
    <div :class="['video-like-num', isActive && 'active']" @click.stop="handleLikeClick">
      <i></i>
      <span>{{likeNum | convernUnit}}</span>
    </div>
    <!-- <div class="video-share" @click.stop="handleShareClick">
      <i></i>
    </div> -->
    <div class="video-group" @click.stop="handleGroupClick">
      <i></i>
    </div>
    <popup
      v-model="show"
      position="bottom"
      closeable
      close-icon="cross"
      safe-area-inset-bottom
      :style="{ height: '35%' }"
      @open="handleOpen"
      @close="handleClose"
    >
      <div class="pop-wrap">
        <div class="pop-title">加入社区</div>
        <div class="pop-qrcode"></div>
        <div class="pop-desc">扫码添加管理员微信：meophis，拉你入群</div>
      </div>
    </popup>
  </div>
</template>

<script>
import { Popup, Toast } from "vant";
import { conversionUnit } from "@/lib/util";

export default {
  name: "elementSet",
  props: {
    likeNum: {
      type: null
    }
  },
  data() {
    return {
      show: false,
      isActive: false
    };
  },
  filters: {
    convernUnit(val) {
      return conversionUnit(val);
    }
  },
  components: {
    Popup
  },
  methods: {
    handleLikeClick() {
      !this.isActive && this.$emit("changeLikeNum");
      this.isActive = true;
        if (this.isActive) {
          this.isActive = true;
          Toast("已点赞");
        }
    },
    handleShareClick() {
      Toast("分享");
    },
    handleGroupClick() {
      this.showPopup();
      this.$emit("inhibitionTimer");
    },
    handleOpen() {
      clearTimeout(this.$parent.eleTimer);
    },
    handleClose() {
      this.$parent.hideEleFn();
      clearTimeout(this.$parent.eleTimer);
    },
    showPopup() {
      this.show = true;
    }
  }
};
</script>>

<style lang="scss" scoped>
$likeIcon: "../assets/images/like-icon.png";
$likeActiveIcon: "../assets/images/like-active-icon.png";
$shareIcon: "../assets/images/share-icon.png";
$persionIcon: "../assets/images/persion-icon.png";

$rem: 75;
@function conver($n) {
  @return $n / $rem + unquote("rem");
}

/* 视频元素集合-分享、点赞、加群 */
.video-element-info {
  position: absolute;
  right: conver(40);
  bottom: conver(300);
  z-index: 3;
  text-align: center;
  > div {
    color: #ffffff;
  }
  .video-like-num {
    i {
      width: conver(74);
      height: conver(69);
      background: url($likeIcon) no-repeat;
      background-size: conver(74) auto;
      display: inline-block;
    }
    &.active {
      i {
        background: url($likeActiveIcon) no-repeat;
        background-size: conver(74) auto;
      }
    }

    span {
      display: block;
      height: conver(33);
      font-size: conver(24);
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: conver(33);
      text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    }
  }
  .video-share {
    margin-top: conver(37);
    i {
      width: conver(72);
      height: conver(59);
      background: url($shareIcon) no-repeat;
      background-size: conver(72) auto;
      display: inline-block;
    }
  }
  .video-group {
    margin-top: conver(49);
    i {
      width: conver(74);
      height: conver(56);
      background: url($persionIcon) no-repeat;
      background-size: conver(74) auto;
      display: inline-block;
    }
  }
  .pop-wrap {
    font-size: conver(30);
    .pop-title {
      height: conver(34);
      line-height: conver(34);
      padding-top: conver(60);
      font-family: PingFang-SC-Semibold, PingFang-SC;
      font-weight: 600;
      color: rgb(82, 76, 76);
    }
    .pop-qrcode {
      width: conver(238);
      height: conver(238);
      margin: conver(30) auto;
      background: #999999;
    }
    .pop-desc {
      height: conver(34);
      line-height: conver(34);
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgb(82, 76, 76);
    }
  }
}
</style>