<template>
  <div class="wrapper">
    <banner />
    <tab-nav @changeNav="handleChangeNav" :navList="navList" />
    <div class="content-box">
      <screen />
      <picture-list
        @onLoad="onLoad"
        :listType="listType"
        :pictureList="pictureList"
      />
      <!-- 小部件 -->
      <widget />
    </div>
    <tab-bottom-bar />
  </div>
</template>
<script>
import TabBottomBar from "@/components/TabBottomBar";
import Banner from "./components/Banner";
import TabNav from "./components/TabNav";
import Screen from "./components/Screen";
import PictureList from "./components/PictureList";
import Widget from "./components/Widget";

export default {
  data() {
    return {
      navList: ["上海站", "天津站", "广州站", "郑州站", "杭州站"],
      pictureList: [],
      listType: {
        loading: false,
        finished: false,
        error: false
      }
    };
  },
  components: {
    TabBottomBar,
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
  mounted() {},
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
                "https://image1.suning.cn/uimg/cms/img/157226502113221969.jpg?format=_is_1242w_610h"
              );
            } else {
              this.pictureList.push(
                "https://oss.suning.com/aps/aps_learning/iwogh/2019/10/28/20/iwoghBannerPicture/88b2e809944940d2ba4a7a81ae82b4bd.png?format=_is_1242w_610h"
              );
            }
          }
          // 加载状态结束
          this.listType.loading = false;

          // 数据全部加载完成
          if (this.pictureList.length >= 100) {
            this.listType.finished = true;
          }
        }, 500);
      } catch (error) {
        this.listType.error = true;
      }
    },
    handleChangeNav() {
      this.pictureList = [];
      this.listType.loading = true;
      this.listType.finished = false;
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