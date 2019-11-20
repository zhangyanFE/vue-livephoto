<template>
  <div class="screen-box">
    <div class="screen-tab">
      <div class="screen-tab-left">
        <span>1000 {{ $t("customName.screen.peopleText") }}</span>
      </div>
      <div class="screen-tab-right" v-if="!puzzleState">
        <span class="screen-tab-right--puzzle" @click="handlePuzzleClick">{{
          $t("customName.screen.puzzleBtnText")
        }}</span>
        <em></em>
        <span class="screen-tab-right--screen" @click="handleScreenClick">{{
          $t("customName.screen.screenBtnText")
        }}</span>
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
        <p class="puzzle-type-title">
          {{ $t("customName.screen.puzzlePopup.puzzleTitle") }}
        </p>
        <ul>
          <li @click="handleCheckLongPuzzle">
            <div class="col-all-center long">
              <img :src="puzzelLongImg" alt="长图" />
            </div>
            <span>{{ $t("customName.screen.puzzlePopup.puzzelLongGraph") }}</span>
          </li>
          <li @click="handleCheckGridPuzzle">
            <div class="col-all-center ninegrid">
              <img :src="puzzleGridImg" alt="九宫格" />
            </div>
            <span>{{ $t("customName.screen.puzzlePopup.puzzleGridGraph") }}</span>
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
        <div
          class="popup-item-box"
          v-for="(item, index) in screenList"
          :key="index"
        >
          <div class="popup-item-title">{{ item.title }}</div>
          <div class="popup-item">
            <span
              :class="[
                index == 0 && curIndex0 == key && 'active',
                index == 1 && curIndex1 == key && 'active',
                index == 2 && curIndex2 == key && 'active'
              ]"
              v-for="(subItem, key) in item.list"
              :key="key"
              @click="handleItemClick(item.list, key, index)"
              >{{ subItem.title }}</span
            >
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
      parentIndex: -1,
      curIndex0: 0, // 排序
      curIndex1: 0, // 类别
      curIndex2: 0, // 展示
      screenList: [
        {
          title: this.$t('customName.screen.screenPopup.sort.title'),
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
              curIndex: 2,
              isSelected: false
            },
            {
              title: "三列",
              curIndex: 3,
              isSelected: false
            },
            {
              title: "四列",
              curIndex: 4,
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
    },
    lang() {

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
      // this.toast("九宫格拼图敬请期待~");
      this.showPuzzlePopup = false;
      this.$emit("checkPuzzle");
    },
    handlePuzzleClick() {
      this.showPuzzlePopup = true;
    },
    handleScreenClick() {
      this.showPopup = true;
    },
    handleItemClick(item, key, index) {
      // if (this.screenList[index].list[key].isSelected) {
      //   this.screenList[index].list[key].isSelected = false;
      // } else {
      //   this.screenList[index].list[key].isSelected = true;
      // }
      switch (index) {
        case 0:
          this.curIndex0 = key;
          break;
        case 1:
          this.curIndex1 = key;
          break;
        case 2:
          this.curIndex2 = key;
          break;
        default:
          break;
      }
      this.$emit("pictureListLayout", { item, key, index });
      this.showPopup = false;
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
</script>
>
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
      font-size: conver(16);
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: #000;
      text-align: center;
      padding-top: conver(30);
    }
    ul {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-top: conver(25);
      li {
        width: conver(120);
        height: conver(120);
        display: flex;
        flex-direction: column;
        align-items: center;
        div {
          height: conver(100);
          &.col-all-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        }
        img {
          width: conver(50);
          display: block;
        }
        span {
          font-size: conver(16);
          color: #000;
          font-weight: 600;
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
