<template>
  <div class="puzzle-operate-box">
    <div class="puzzle-button puzzle-cancel" @click="handleCancelClick">取消</div>
    <div class="puzzle-button puzzle-sure" @click="handleSureClick">开始拼图</div>
  </div>
</template>
<script>
export default {
  name: "puzzle-btn",
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
  }
}
</style>