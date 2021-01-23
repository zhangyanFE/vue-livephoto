import Vue from "vue";
import VueI18n from "vue-i18n";
import En from "@/lib/locale/languages/en-US";
import Zh from "@/lib/locale/languages/zh-CN";

//VUEI18N 国际化语言处理
Vue.use(VueI18n);

//初始化插件变量实例化对象
const i18n = new VueI18n({
  locale: (function() {
    if (localStorage.getItem("lang")) {
      return localStorage.getItem("lang");
    }
    return "zh-CN";
  })(), //当前语言环境
  messages: {
    //语言环境对应语言文件的map集合
    "zh-CN": Zh,
    "en-US": En
  }
});

export default i18n;
