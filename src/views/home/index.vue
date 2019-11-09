<template>
  <div class="wrapper">
    <banner />
    <tab-nav @changeTabNav="handleChangeTabNav" :navList="navList" />
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

    <!-- 拼图结果弹窗 -->
    <van-popup
      v-model="showPuzzleResultPopup"
      closeable
      class="puzzle-result"
      :overlay="overlayMask"
      :close-on-click-overlay="closeClickOverlay"
      :close-icon="setCloseIcon"
    >
      <div class="puzzle-result-box">拼图结果</div>
    </van-popup>

    <!-- 会场二维码弹窗 -->
    <venue-qrcode :showQrcodePopup="showQrcodePopup" />

    <!-- 底部tabBar -->
    <tab-bottom-bar v-if="!puzzleState" @qrcodeState="changeQrcode" />
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { closeIconImg } from "@/assets/images/img";
import data from "@/mock/index";
import TabBottomBar from "@/components/TabBottomBar";
import PuzzleBtn from "@/components/PuzzleBtn";
import VenueQrcode from "@/components/VenueQrcode";
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
      showPuzzleResultPopup: false, // 拼图结果弹窗
      closeClickOverlay: false, // 禁止点击蒙层
      overlayMask: false, // 是否显示遮罩层
      listType: {
        loading: false,
        finished: false,
        error: false
      },
      showQrcodePopup: {
        // 会场二维码弹窗
        popupType: false
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
    Widget,
    VenueQrcode
  },
  watch: {
    pictureList(newData, oldData) {
      this.pictureList = newData;
    }
  },
  computed: {
    ...mapState({
      puzzleState: state => state.livephoto.puzzleState,
    }),
    setCloseIcon() {
      return closeIconImg;
    }
  },
  mounted() {
    // const pc = new Clip(document.getElementById("app"), "./images/seek-icon.png");
    // pc.on("loaded", () => {
    //   // 截图生成base64
    //   const dataURL = pc.clip();
    //   console.log(dataURL)
    // });
  },
  activated() {
    console.log("首页");
  },
  deactivated() {
    console.log("离开首页");
  },
  methods: {
    ...mapMutations("livephoto", [
      "changePuzzleState",
      "changePictureLayout",
      "changeQrcodeState"
    ]),
    onLoad() {
      this.getList();
    },
    changeQrcode() {
      // this.changeQrcodeState(true);
      this.showQrcodePopup.popupType = true;
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
        // setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.pictureList = this.pictureList.concat(data);
        }
        for (let index = 0; index < this.pictureList.length; index++) {
          this.previewImgList.push(this.pictureList[index].src);
        }
        // 加载状态结束
        this.listType.loading = false;
        console.log(this.pictureList);
        // }, 500);

        // 数据全部加载完成
        if (this.pictureList.length >= 200) {
          this.listType.finished = true;
        }
      } catch (error) {
        this.listType.error = true;
      }
    },
    handleChangeTabNav() {
      this.pictureList = [];
      this.previewImgList = [];
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
        this.pictureSelectedListGroup();
        this.changePuzzleState(false);
        // 合成照片成功弹出拼图结果弹窗...
        this.showPuzzleResultPopup = true;
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
  .puzzle-result {
    &.van-popup {
      width: 100%;
      height: 100%;
    }
  }
}
</style>