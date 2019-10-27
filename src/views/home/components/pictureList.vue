<template>
  <div class="picture-box">
    <div class="picture-list">
      <div class="picture-list-item" v-for="(item, index) in pictureList" :key="index">
        <router-link tag="span" to="/my">
          <img :src="item.img" alt="img" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pictureList: {
      type: Array,
      default: () => {
        return [];
      }
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
}
</style>