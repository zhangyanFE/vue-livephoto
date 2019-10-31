<template>
  <div class="wrapper">
    <banner />
    <tab-nav @changeNav="handleChangeNav" :navList="navList" />
    <div class="content-box">
      <screen @popupOpen="popupOpen" @popupClose="popupClose" @checkPuzzle="checkPuzzle" />
      <picture-list
        @onLoad="onLoad"
        :listType="listType"
        :previewImgList="previewImgList"
        :pictureList="pictureList"
      />
      <!-- 小部件 -->
      <widget v-show="!puzzleState" />
    </div>
    <!-- 拼图操作按钮 -->
    <puzzle-btn v-show="puzzleState" @puzzleCancel="puzzleCancel" @puzzleSure="puzzleSure" />
    <!-- 底部tabBar -->
    <tab-bottom-bar v-show="!puzzleState" />
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import data from "@/mock/index";
import TabBottomBar from "@/components/TabBottomBar";
import PuzzleBtn from "@/components/PuzzleBtn";
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
      previewImgList: [],
      listType: {
        loading: false,
        finished: false,
        error: false
      }
    };
  },
  components: {
    TabBottomBar,
    PuzzleBtn,
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
  computed: {
    ...mapState({
      puzzleState: state => state.livephoto.puzzleState
    })
  },
  mounted() {},
  activated() {
    console.log("首页");
  },
  deactivated() {
    console.log("离开首页");
  },
  methods: {
    ...mapMutations("livephoto", ["changePuzzleState"]),
    onLoad() {
      this.getList();
    },
    getList() {
      // 异步更新数据
      try {
        this.pictureList = data;
        for (let index = 0; index < this.pictureList.length; index++) {
          this.previewImgList.push(this.pictureList[index].src);
        }
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            // if (i % 4 == 0) {
            //   this.pictureList.push(
            //     "https://s.plusx.cn/plus/immediate/52470349/20190803151500688/AM_06909.JPG?imageView2/0/w/1600/h/3000/q/85&sign=b98b48e2e9d73e2b8fae91c9875fae6f&t=5db96a0c"
            //   );
            // } else {
            //   this.pictureList.push(
            //     "https://s.plusx.cn/plus/immediate/52470349/20190803140709603/AM_06901.JPG?imageView2/0/w/1600/h/3000/q/85&sign=99a3b26667efb1682097ac8fd9bd96ab&t=5db96a0c"
            //   );
            // }
          }
          // 加载状态结束
          // this.listType.loading = false;

          // 数据全部加载完成
          // if (this.pictureList.length >= 200) {
          //   this.listType.finished = true;
          // }
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
    },
    // puzzleItemClick() {
    //   if (this.puzzleState) {
    //     this.changePuzzleState(false);
    //   } else {
    //     this.changePuzzleState(true);
    //   }
    // },
    puzzleCancel() {
      // 取消拼图
      this.changePuzzleState(false);
    },
    puzzleSure() {
      // 选完图片，开始拼图操作
      this.$toast({
        message: "拼图中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 1000,
      });
      console.log("拼图中...");
    },
    checkPuzzle() {
      // 选择拼图类型
      this.changePuzzleState(true);
    },
    popupOpen() {},
    popupClose() {}
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