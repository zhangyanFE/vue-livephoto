<template>
  <div class="screen-box">
    <div class="screen-tab">
      <div class="screen-tab-left">
        <span>1000人已审阅</span>
      </div>
      <div class="screen-tab-right">
        <span class="screen--tab-right--puzzle">拼图</span>
        <em></em>
        <span class="screen--tab-right--screen">筛选</span>
      </div>
    </div>
  </div>
</template>
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
        background: #D2D2D2;
        margin: 0 conver(8);
        vertical-align: bottom;
      }
    }
  }
}
</style>