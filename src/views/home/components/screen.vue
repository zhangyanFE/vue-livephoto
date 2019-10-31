<template>
  <div class="screen-box">
    <div class="screen-tab">
      <div class="screen-tab-left">
        <span>1000人已审阅</span>
      </div>
      <div class="screen-tab-right">
        <span class="screen--tab-right--puzzle" @click="handlePuzzleClick">拼图</span>
        <em></em>
        <span class="screen--tab-right--screen" @click="handleScreenClick">筛选</span>
      </div>
    </div>
    <!-- 筛选弹窗组件 -->
    <van-popup v-model="showPopup" closeable :close-icon="setCloseIcon">
      <div class="popup-box">
        <!-- popup-item-every -->
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
import { mapMutations, mapState } from "vuex";
import { closeIconImg } from "../images/img";
export default {
  data() {
    return {
      showPopup: false,
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
    }
  },
  methods: {
    ...mapMutations("livephoto", ["changePuzzleState"]),
    handlePuzzleClick() {
      // 设置拼图模式
      if (this.puzzleState) {
        this.changePuzzleState(false);
      } else {
        this.changePuzzleState(true);
      }
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