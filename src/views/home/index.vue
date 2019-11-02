<!--
 * @Author: your name
 * @Date: 2019-10-23 18:24:13
 * @LastEditTime: 2019-11-02 11:51:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-livephoto/src/views/home/index.vue
 -->
<template>
  <div class="wrapper">
    <banner />
    <tab-nav @changeNav="handleChangeNav" :navList="navList" />
    <div class="content-box">
      <screen
        @popupOpen="popupOpen"
        @popupClose="popupClose"
        @checkPuzzle="checkPuzzle"
        @pictureListLayout="pictureListLayout"
      />
      <picture-list
        @onLoad="onLoad"
        @pictureSelected="pictureSelected"
        :listType="listType"
        :previewImgList="previewImgList"
        :pictureList="pictureList"
      />
      <!-- 小部件 -->
      <widget v-if="!puzzleState" />
    </div>
    <!-- 拼图操作按钮 -->
    <puzzle-btn
      v-if="puzzleState"
      :selectedCount="selectedCountList"
      @puzzleCancel="puzzleCancel"
      @puzzleSure="puzzleSure"
    />
    <!-- 底部tabBar -->
    <tab-bottom-bar v-if="!puzzleState" />
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
      selectedCountList: [],
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
    ...mapMutations("livephoto", ["changePuzzleState", "changePictureLayout"]),
    onLoad() {
      this.getList();
    },
    pictureSelected(selectedList) {
      this.selectedCountList = selectedList;
    },
    pictureSelectedListGroup() {
      for (let i = 0; i < this.pictureList.length; i++) {
        this.pictureList[i].selected = false;
      }
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
    puzzleCancel() {
      // 取消拼图&选中的照片
      this.clearPuzzleResult();
      this.pictureSelectedListGroup();
      this.changePuzzleState(false);
    },
    puzzleSure() {
      // 1、选择照片数大于1才能拼图
      // 2、选完照片，开始拼图操作
      if (this.selectedCountList.length >= 1) {
        this.toast("拼图中...");
        this.clearPuzzleResult();
        // 合成照片...
      } else {
        this.toast("请选择照片");
      }
    },
    clearPuzzleResult() {
      this.selectedCountList.length = 0;
      this.selectedCountList = [];
    },
    checkPuzzle() {
      // 选择拼图类型
      this.changePuzzleState(true);
    },
    pictureListLayout(result) {
      // console.log(result);
      let { item, key, index } = result;
      switch (index) {
        case 0:
          console.log(item[key]);
          break;
        case 1:
          console.log(item[key]);

          break;
        case 2:
          let curIndex = item[key].curIndex;
          this.changePictureLayout(`column-${curIndex}`);
          break;

        default:
          break;
      }
    },
    popupOpen() {},
    popupClose() {},
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