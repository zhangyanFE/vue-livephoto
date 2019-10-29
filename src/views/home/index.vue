<!--
 * @Author: your name
 * @Date: 2019-10-23 18:24:13
 * @LastEditTime: 2019-10-26 17:36:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-livephoto/src/views/home/index.vue
 -->
<template>
  <div class="wrapper">
    <banner />
    <tab-nav @changeNav="handleChangeNav" :navList="navList" />
    <div class="content-box">
      <screen />
      <picture-list
        @onLoad="onLoad"
        :loading="loading"
        :finished="finished"
        :error="error"
        :pictureList="pictureList"
      />
      <!-- 小部件 -->
      <widget />
    </div>
  </div>
</template>
<script>
import Banner from "./components/banner";
import TabNav from "./components/tabNav";
import Screen from "./components/screen";
import PictureList from "./components/pictureList";
import Widget from "./components/widget";

export default {
  data() {
    return {
      navList: ["上海站", "天津站", "广州站", "郑州站", "杭州站"],
      pictureList: [],
      loading: false,
      finished: false,
      error: false
    };
  },
  components: {
    TabNav,
    Banner,
    Screen,
    PictureList,
    Widget
  },
  watch: {
    pictureList(newData, oldData) {
      this.pictureList = newData;
    }
  },
  mounted() {

  },
  activated() {
    console.log("首页");
  },
  deactivated() {
    console.log("离开首页");
  },
  methods: {
    onLoad() {
      this.getList();
    },
    getList() {
      // 异步更新数据
      try {
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            if (i % 4 == 0) {
              this.pictureList.push(
                "https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/62035/13/13625/84595/5db1106fE08165017/a82c34c8b6e57f50.jpg!cr_1125x445_0_171!q70.jpg.dpg"
              );
            } else {
              this.pictureList.push(
                "https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp"
              );
            }
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.pictureList.length >= 100) {
            this.finished = true;
          }
        }, 500);
      } catch (error) {
        this.error = true;
      }
    },
    handleChangeNav() {
      this.pictureList = [];
      this.loading = true;
      this.finished = false;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.wrapper {
  .content-box {
    margin: 0 conver(15) conver(49) conver(15);
  }
}
</style>