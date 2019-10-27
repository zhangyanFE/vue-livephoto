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
    <tab-nav :navList="navList" />
    <div class="content-box">
      <screen />
      <picture-list :pictureList="pictureList" />
    </div>
  </div>
</template>
<script>
import Banner from "./components/banner";
import TabNav from "./components/tabNav";
import Screen from "./components/screen";
import PictureList from "./components/pictureList";

export default {
  data() {
    return {
      navList: [
        "上海站上海站",
        "天津站",
        "广州站",
        "郑州站",
        "杭州站",
        "广州站",
        "郑州站",
        "杭州站"
      ],
      pictureList: [{
        img: '//img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: '//img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: '//img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: '//img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: '//img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: '//img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: '//img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: '//img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: '//img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      },{
        img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/46168/22/12083/249041/5d8f4456E9f07f77e/fecfd7427264acb8.jpg!q70.dpg.webp'
      }]
    };
  },
  components: {
    TabNav,
    Banner,
    Screen,
    PictureList
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.wrapper {
  .content-box {
    margin: 0 conver(15) conver(50) conver(15);
  }
}
</style>