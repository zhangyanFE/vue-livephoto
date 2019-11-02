<!--
 * @Author: your name
 * @Date: 2019-10-31 16:08:09
 * @LastEditTime: 2019-11-02 12:00:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-livephoto/src/components/PuzzleBtn.vue
 -->
<template>
  <div class="puzzle-operate-box">
    <div class="puzzle-button puzzle-cancel" @click="handleCancelClick">取消</div>
    <div class="puzzle-button puzzle-sure" @click="handleSureClick">
      开始拼图
      <span class="puzzle-selected-count" v-if="selectedCount.length">{{selectedCount.length}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "puzzle-btn",
  props: {
    selectedCount: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    handleCancelClick() {
      this.$emit("puzzleCancel");
    },
    handleSureClick() {
      this.$emit("puzzleSure");
    }
  }
};
</script>>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.puzzle-operate-box {
  width: 100%;
  height: conver(60);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 3;
  background: #f5f5f5;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  .puzzle-button {
    height: conver(44);
    line-height: conver(44);
    text-align: center;
    font-size: conver(17);
    font-family: PingFang;
    font-weight: 500;
    color: #363a43;
  }
  .puzzle-cancel {
    width: conver(135);
    color: #363a43;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 8px 0px rgba(57, 60, 77, 0.08);
    border-radius: conver(22);
  }
  .puzzle-sure {
    position: relative;
    width: conver(200);
    color: #fff;
    background: linear-gradient(
      -83deg,
      rgba(72, 174, 255, 1),
      rgba(72, 174, 255, 1),
      rgba(57, 133, 253, 1),
      rgba(76, 168, 241, 1)
    );
    box-shadow: 0px 1px 9px 0px rgba(89, 153, 225, 0.56);
    border-radius: conver(22);
    .puzzle-selected-count {
      position: absolute;
      top: conver(10);
      margin-left: conver(10);
      display: inline-block;
      width: conver(21);
      height: conver(21);
      line-height: conver(21);
      text-align: center;
      background: #fff;
      border-radius: 50%;
      color: #2a76fd;
      font-size: conver(12);
      font-family: "微软雅黑";
    }
  }
}
</style>