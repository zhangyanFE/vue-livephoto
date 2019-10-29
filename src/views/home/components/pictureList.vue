<!--
 * @Author: your name
 * @Date: 2019-10-26 21:08:05
 * @LastEditTime: 2019-10-28 20:47:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-livephoto/src/views/home/components/pictureList.vue
 -->
<template>
  <div class="picture-box">
    <template>
      <list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="picture-list">
          <div
            class="picture-list-item"
            v-for="(item, index) in pictureList"
            :key="index"
            @click="handleClick(item, index)"
          >
            <img v-lazy="item" alt="img" />
          </div>
        </div>
      </list>
      <!-- 图片轮播 -->
      <div class="swiper-box" v-show="showMask" @click.stop="handlePictureMask">
        <swiper
          :options="swiperOption"
          ref="mySwiper"
          class="swiper-picture-box"
        >
          <swiper-slide v-for="(item, index) in pictureList" :key="index">
            <div class="swiper-content">
              <img :src="item" alt style="object-fit:contain" />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </template>
    <!-- <div class="no-data">
      <i></i>
      <p>暂无信息</p>
    </div>-->
  </div>
</template>
<script>
import { List, ImagePreview } from "vant";

export default {
  props: {
    pictureList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  components: {
    List,
    ImagePreview
  },
  data() {
    return {
      loadings: this.loading,
      show: false,
      index: 0,
      initialSlide: 1,
      showMask: false,
      swiperOption: {
        speed: 500,
        loop: false,
        threshold: 8,
        observer: true,
        observeParents: true,
        debugger: true,
        notNextTick: true,
        realIndex: 1,
        onSlideChangeEnd: function(swiper) {
          console.log(swiper.activeIndex)
        }
      }
    };
  },
  methods: {
    onLoad() {
      this.$emit("onLoad", this.loading);
    },
    onChange(index) {
      this.index = index;
    },
    handlePictureMask() {
      this.showMask = false;
    },
    handleClick(item, index) {
      ImagePreview({
        images: this.pictureList,
        startPosition: index,
        lazyLoad: true,
        showIndex: false,
        onChange(i) {
          console.log(i);
        },
        onClose(index) {
          console.log(index);
        }
      });
    }
  }
};
</script>>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.picture-box {
  position: relative;
  .picture-list {
    overflow: hidden;
    &-item {
      float: left;
      width: conver(110);
      height: conver(110);
      box-sizing: border-box;
      margin-right: conver(7);
      margin-bottom: conver(9);
      &:nth-child(3n) {
        margin-right: 0;
      }
      img {
        display: block;
        width: conver(110);
        height: conver(110);
        border-radius: conver(4);
        background: #f9f9f9;
      }
    }
  }
  /* 图片轮播 */
  .swiper-picture-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    transition-duration: 500ms;
    .swiper-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
  /* 无数据 */
  .no-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: conver(142);
    i {
      display: inline-block;
      width: conver(211);
      height: conver(116);
      background: url("../images/no-data-icon.png") no-repeat;
      background-size: conver(211) auto;
    }
    p {
      color: #666666;
      font-size: conver(13);
      font-family: SourceHanSansCN;
      font-weight: 400;
      text-align: center;
      margin-top: conver(6);
    }
  }
}
</style>