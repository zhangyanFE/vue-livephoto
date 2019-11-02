<template>
  <div class="screen-box">
    <div class="screen-tab">
      <div class="screen-tab-left">
        <span>1000人已审阅</span>
      </div>
      <div class="screen-tab-right" v-if="!puzzleState">
        <span class="screen-tab-right--puzzle" @click="handlePuzzleClick">拼图</span>
        <em></em>
        <span class="screen-tab-right--screen" @click="handleScreenClick">筛选</span>
      </div>
    </div>

    <!-- 选择拼图类型弹窗组件 -->
    <van-popup
      v-model="showPuzzlePopup"
      closeable
      :close-icon="setCloseIcon"
      :close-on-click-overlay="closeClickOverlay"
      @open="handleOpen"
      @close="handleClose"
    >
      <div class="puzzle-popup">
        <p class="puzzle-type-title">请选择拼图样式</p>
        <ul>
          <li @click="handleCheckLongPuzzle">
            <div class="col-all-center long">
              <img :src="puzzelLongImg" alt="长图" />
            </div>
            <span>长图</span>
          </li>
          <li @click="handleCheckGridPuzzle">
            <div class="col-all-center ninegrid">
              <img :src="puzzleGridImg" alt="九宫格" />
            </div>
            <span>九宫格</span>
          </li>
        </ul>
      </div>
    </van-popup>

    <!-- 筛选弹窗组件 -->
    <van-popup
      v-model="showPopup"
      closeable
      :close-on-click-overlay="closeClickOverlay"
      :close-icon="setCloseIcon"
    >
      <div class="popup-box">
        <div class="popup-item-box" v-for="(item, index) in screenList" :key="index">
          <div class="popup-item-title">{{item.title}}</div>
          <div class="popup-item">
            <span
              :class="[subItem.isSelected && 'active']"
              v-for="(subItem, key) in item.list"
              :key="key"
              @click="handleItemClick(item.list, key)"
            >{{subItem.title}}</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { closeIconImg, puzzelLong, puzzleGrid } from "@/assets/images/img";
export default {
  data() {
    return {
      showPopup: false,
      showPuzzlePopup: false,
      closeClickOverlay: false,
      curIndex: 0,
      screenList: [
        {
          title: "排序",
          list: [
            {
              title: "时间轴",
              isSelected: false
            },
            {
              title: "倒序",
              isSelected: false
            }
          ]
        },
        {
          title: "类别",
          list: [
            {
              title: "全部",
              isSelected: false
            },
            {
              title: "热度",
              isSelected: false
            },
            {
              title: "人像",
              isSelected: false
            },
            {
              title: "物景",
              isSelected: false
            }
          ]
        },
        {
          title: "展示",
          list: [
            {
              title: "两列",
              isSelected: false
            },
            {
              title: "三列",
              isSelected: false
            },
            {
              title: "撕裂",
              isSelected: false
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState({
      puzzleState: state => state.livephoto.puzzleState
    }),
    setCloseIcon() {
      return closeIconImg;
    },
    puzzelLongImg() {
      return puzzelLong;
    },
    puzzleGridImg() {
      return puzzleGrid;
    }
  },
  methods: {
    handleOpen() {
      this.$emit("popupOpen");
    },
    handleClose() {
      this.$emit("popupClose");
    },
    handleCheckLongPuzzle() {
      this.showPuzzlePopup = false;
      this.$emit("checkPuzzle");
    },
    handleCheckGridPuzzle() {
      this.$toast("九宫格拼图敬请期待~");
    },
    handlePuzzleClick() {
      this.showPuzzlePopup = true;
    },
    handleScreenClick() {
      this.showPopup = true;
    },
    handleItemClick(item, index) {
      if (item[index].isSelected) {
        item[index].isSelected = false;
      } else {
        item[index].isSelected = true;
      }
      this.showPopup = false;
    }
  }
};
</script>>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.screen-box {
  margin: conver(11) 0 conver(22) 0;
  .screen-tab {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: 400;
    font-family: SourceHanSansCN;
    color: #666;
    &-left {
      font-size: conver(13);
    }
    &-right {
      font-size: conver(12);
      em {
        display: inline-block;
        width: conver(1);
        height: conver(13);
        background: #d2d2d2;
        margin: 0 conver(8);
        vertical-align: bottom;
      }
    }
  }
  /* 选择拼图弹窗 */
  .puzzle-popup {
    width: conver(280);
    height: conver(250);
    .puzzle-type-title {
      font-size: conver(14);
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #000;
      text-align: center;
      padding: conver(20) 0;
    }
    ul {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      li {
        width: conver(120);
        height: conver(120);
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .col-all-center {
          &.long {
            height: conver(200);
          }
          &.ninegrid {
            /* height: conver(240); */
          }
        }
        span {
          color: #000;
          font-weight: 600;
          font-size: 0.28rem;
          margin: 0.2rem 0 0;
        }
        img {
          width: 1.9rem;
        }
      }
    }
  }
  /* 筛选弹窗 */
  .popup-box {
    width: conver(280);
    height: conver(355);
    margin-left: conver(22);
    margin-top: conver(32);
    .popup-item-box {
      font-size: conver(13);
      font-family: SourceHanSansCN;
      font-weight: 400;
      &:not(:last-child) {
        margin-bottom: conver(25);
      }
      .popup-item-title {
        color: #666666;
        padding-bottom: conver(12);
      }
      .popup-item {
        span {
          display: inline-block;
          width: conver(66);
          height: conver(35);
          line-height: conver(35);
          color: #333333;
          background: #f5f5f5;
          margin-right: conver(15);
          text-align: center;
          border-radius: conver(4);
          margin-bottom: conver(12);
          &.active {
            color: #0066ff;
            background: #ddeaff;
          }
          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>