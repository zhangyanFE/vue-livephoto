<template>
  <div class="picture-box">
    <template>
      <list
        v-model="listType.loading"
        :finished="listType.finished"
        :error="listType.error"
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
      <van-image-preview
        v-model="show"
        :start-position="curIndex"
        :show-index="showIndex"
        :loop="loop"
        :lazy-load="lazyLoad"
        :async-close="asyncClose"
        :images="pictureList"
        @change="onChange"
        @close="onClose"
      >
        <template v-slot:cover>
          <div class="cover-info">
            <div class="cover-info-left">
              <span class="collection">
                <i class="iconfont">&#xe61d;</i>
                <em>收藏</em>
              </span>
              <span class="share">
                <i class="iconfont">&#xe739;</i>
                <em>分享</em>
              </span>
            </div>
            <div class="cover-info-center">
              <p>可长按保存图片</p>
            </div>
            <div class="cover-info-right">
              <i @click.stop="handleCloseClick"></i>
            </div>
          </div>
        </template>
      </van-image-preview>
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
    listType: {
      type: Object,
      default: () => {
        return {
          loading: false,
          finished: false,
          error: false
        };
      }
    }
  },
  components: {
    List,
    ImagePreview
  },
  computed: {
    pictureListLen() {
      return this.pictureList.length;
    }
  },
  data() {
    return {
      show: false,
      loop: false,
      lazyLoad: true,
      showIndex: false,
      asyncClose: false,
      index: 0,
      curIndex: 0
    };
  },
  methods: {
    onLoad() {
      this.$emit("onLoad");
    },
    onChange(index) {
      this.index = index;
    },
    onClose(item) {
      console.log(item);
    },
    handleCloseClick() {
      this.show = false;
    },
    handleClick(item, index) {
      this.show = true;
      this.curIndex = index;
      // ImagePreview({
      //   images: this.pictureList,
      //   startPosition: index,
      //   lazyLoad: true,
      //   showIndex: false,
      //   onChange(i) {
      //     console.log(i);
      //   },
      //   onClose(index) {
      //     console.log(index);
      //   }
      // });
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
  /* 图片预览上方信息 */
  .cover-info {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    font-family: SourceHanSansCN;
    font-weight: 400;
    margin-top: conver(15);
    &-left {
      padding-left: conver(17);
      span {
        display: inline-block;
        &:not(:last-child) {
          padding-right: conver(26);
        }
        i {
          display: block;
          font-size: conver(28);
          text-align: center;
        }
      }
    }
    &-center {
      padding-left: conver(50);
    }
    &-right {
      padding-left: conver(55);
      i {
        display: inline-block;
        width: conver(28);
        height: conver(28);
        background: url("../images/close-icon.png") no-repeat;
        background-size: conver(28);
        vertical-align: middle;
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