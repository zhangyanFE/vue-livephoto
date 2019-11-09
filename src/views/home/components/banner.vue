<template>
  <div class="banner-box" id="J_banner">
    <img :src="setBanner" alt="banner" />
    <div class="language-check">
      <div class="language-check-name" @click="handleSelectClick">{{curLanguageName}}</div>
      <div class="language-check-select-box" v-if="showSelect">
        <span
          v-for="(item, index) in languageList"
          :key="index"
          @click="changeLanguage(item, index)"
        >{{item.title}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { banner } from "@/assets/images/img";

export default {
  data() {
    return {
      curLanguageName: "中文",
      showSelect: false,
      languageList: [
        {
          title: "中文",
          selected: true
        },
        {
          title: "英文",
          selected: false
        }
      ]
    };
  },
  computed: {
    setBanner() {
      return banner;
    }
  },
  methods: {
    ...mapMutations("livephoto", ["changeLanguageState"]),
    handleSelectClick() {
      if (this.showSelect) {
        this.showSelect = false;
      } else {
        this.showSelect = true;
      }
    },
    changeLanguage(item, index) {
      this.curLanguageName = item.title;
      this.showSelect = false;
      if (this.curLanguageName == "中文") {
        this.changeLanguageState("zh-CN");
      } else {
        this.changeLanguageState("en-US");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.banner-box {
  position: relative;
  width: 100%;
  height: conver(135);
  line-height: conver(135);
  text-align: center;
  color: #000;
  background: #f3f3f3;
  img {
    display: block;
    width: 100%;
    height: conver(135);
  }
  .language-check {
    position: absolute;
    top: conver(10);
    right: conver(15);
    width: conver(55);
    height: conver(25);
    line-height: conver(25);
    background: rgba(255, 255, 255, 0.6);
    color: #000;
    &-select-box {
      width: conver(55);
      position: absolute;
      top: conver(28);
      right: 0;
      background: rgba(255, 255, 255, 0.6);
      span {
        display: block;
      }
    }
  }
}
</style>