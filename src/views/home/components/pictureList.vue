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
        <div>{{puzzleState}}</div>

        <div class="picture-list">
          <div
            class="picture-list-item"
            v-for="(item, index) in pictureList"
            :key="index"
            :type="item.w"
            @click="handleClick(item, index)"
          >
            <div class="picture-img" v-lazy="item.src" :style="`backgroundImage:url(${item.src})`">
              <div class="picture-select" v-if="puzzleState">
                <div :class="['picture-select-tag', item.selected && 'selected']">
                  <!-- <span>{{selectedNum}}</span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </list>
      <van-image-preview
        v-model="show"
        :start-position="curIndex"
        :show-index="showIndex"
        :loop="loop"
        :async-close="asyncClose"
        :images="previewImgList"
        @change="onChange"
        @close="onClose"
      >
        <template v-slot:cover>
          <div class="cover-info">
            <div class="cover-info-left">
              <span class="collection" :type="pictureList[index].w">
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
import { mapState } from "vuex";
import { List, ImagePreview } from "vant";
export default {
  props: {
    previewImgList: {
      type: Array,
      default: () => {
        return [];
      }
    },
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
    ...mapState({
      puzzleState: state => state.livephoto.puzzleState
    }),
    pictureListLen() {
      return this.pictureList.length;
    }
  },
  watch: {
    selected(newData) {
      this.selected = newData;
    }
  },
  data() {
    return {
      show: false,
      loop: false,
      lazyLoad: true,
      showIndex: false,
      asyncClose: false,
      selected: false, // 当前选中的项
      selectedNum: 1, // 选中图片个数
      index: 0,
      curIndex: 0,
      selectedList: []
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
      if (!this.puzzleState) {
        this.show = true;
        this.curIndex = this.index = index;
      } else {
        if (
          this.pictureList[index].selected &&
          this.selectedList.indexOf(item.size) != -1
        ) {
          this.pictureList[index].selected = false;
          this.selectedList.splice(this.selectedList.indexOf(item.size), 1);
        } else {
          if (this.selectedList.length > 9) {
            this.toast("拼图照片不能超过10張");
            return;
          }
          this.pictureList[index].selected = true;
          this.selectedList.push(item.size);
        }
        this.$emit("pictureSelected", this.selectedList);
      }
    },
    toast(message) {
      this.$toast({
        message,
        forbidClick: true,
        duration: 1500
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
      margin-bottom: conver(9);
      &:not(:nth-child(3n)) {
        margin-right: conver(7);
      }
      .picture-img {
        position: relative;
        width: 100%;
        padding-top: 100%;
        background-color: #f2f2f2;
        box-sizing: border-box;
        background-repeat: no-repeat;
        background-position: 50% 30%;
        background-size: cover;
        border-radius: conver(4);
        animation: imgBox-in 0.5s;
        animation-fill-mode: forwards;
        @keyframes imgBox-in {
          0% {
            opacity: 0;
            -webkit-transform: scale3D(0.8, 0.8, 1);
            transform: scale3D(0.8, 0.8, 1);
          }

          to {
            opacity: 1;
            -webkit-transform: scaleX(1);
            transform: scaleX(1);
          }
        }
        .picture-select {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          font-size: conver(14);
          font-family: SourceHanSansCN;
          font-weight: bold;
          text-align: center;
          line-height: conver(20);
          &-tag {
            position: absolute;
            top: conver(8);
            right: conver(8);
            width: conver(21);
            height: conver(21);
            background: url("../images/select-icon.png") no-repeat;
            background-size: conver(21) auto;
            span {
              position: relative;
              z-index: -1;
            }
            &.selected {
              background: url("../images/selected-icon.png") no-repeat;
              background-size: conver(21) auto;
              /* z-index: 1;
              color: #2a76fd;
              background: #fff;
              border-radius: 50%; */
            }
          }
        }
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
      font-size: conver(12);
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
      font-size: conver(13);
    }
    &-right {
      padding-left: conver(85);
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