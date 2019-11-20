<template>
  <div class="banner-box" id="J_banner">
    <img :src="setBanner" alt="banner" />
    <div class="language-check">
      <div class="language-check-name" @click="changeLanguage">
        {{ curLanguageName }}
      </div>
      <!-- <div class="language-check-select-box" v-if="showSelect">
        <span
          v-for="(item, index) in languageList"
          :key="index"
          @click="changeLanguage(item, index)"
          >{{ item.title }}</span
        >
      </div> -->
    </div>
  </div>
</template>
<script>
import { banner } from "@/assets/images/img";

export default {
  data() {
    return {
      locale: "zh-CN",
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
  watch: {
    locale(val) {
      console.log(`当前语言：${val}`);
      this.$i18n.locale = val;
    },
    curLanguageName(val) {
      this.curLanguageName = val;
    }
  },
  computed: {
    setBanner() {
      return banner;
    }
  },
  mounted() {
    if (localStorage.getItem("langName")) {
      this.curLanguageName = localStorage.getItem("langName");
    }
  },
  methods: {
    handleSelectClick() {
      if (this.showSelect) {
        this.showSelect = false;
      } else {
        this.showSelect = true;
      }
    },
    changeLanguage() {
      if (this.$i18n.locale == "zh-CN") {
        this.curLanguageName = "英文";
        this.$i18n.locale = "en-US";
        localStorage.setItem("lang", "en-US");
        localStorage.setItem("langName", "英文");
      } else {
        this.curLanguageName = "中文";
        this.$i18n.locale = "zh-CN";
        localStorage.setItem("lang", "zh-CN");
        localStorage.setItem("langName", "中文");
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
