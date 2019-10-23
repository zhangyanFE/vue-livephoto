<template>
    <header class="morning-header">
      <common-title :isHideBackbtn="false" @goBack="handleGoBack" :title="title" />
      <img v-if="headerTopObj.weather" :src="headerTopObj.weather.bg" alt="top_bg">
      <div class="calendar-box" v-if="headerTopObj.huangli || headerTopObj.weather">
        <div class="calendar-info">
          <div class="calendar-info-left">
            <div class="calendar-info-date">
              {{ headerTopObj.huangli.month }}
            </div>
            <div class="calendar-info-day">{{ headerTopObj.huangli.day }}</div>
            <div class="left-line"></div>
          </div>
          <div class="calendar-info-right">
            <div class="calendar-info-nongli">{{ headerTopObj.huangli.yinli }}</div>
            <div class="calendar-huangli-disc">
              <div class="calendar-huangli-yi">
                <i class="huangli-yi-icon"></i>
                <span class="huangli-yi">
                  {{ headerTopObj.huangli.yi.split(' ').slice(0, 3).join(' ') }}
                </span>
              </div>
              <div class="calendar-huangli-ji">
                <i class="huangli-ji-icon"></i>
                <span class="huangli-ji">
                  {{ headerTopObj.huangli.ji.split(' ').slice(0, 3).join(' ') }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="weather-box">
          <div class="weather-icon">
            <span :class="[getWeatherIconImg]"></span>
          </div>
          <div class="weather-deg">
            <div class="weather-deg-num">
              <span>{{ headerTopObj.weather.temperature }}</span>
              <!-- <i class="weather-deg-symbol"></i> -->
            </div>
            <div class="weather-deg-desc">{{ headerTopObj.weather.info}}/{{ headerTopObj.weather.direct }}/{{ headerTopObj.weather.power }}</div>
          </div>
        </div>
      </div>
    </header>
</template>
<script>
import CommonTitle from "./CommonTitle";

export default {
  name: "Header",
  components: {
    CommonTitle
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    headerTopObj: {
      type: Object,
      default: () => {
        return {
          huangli: {
            ji: "开市 安葬", // 忌
            yi: "订盟 纳采 出行 祭祀 祈福 修造 动土 移徙 入宅", // 宜
            yangli: "2019年07月", // 阳历
            yinli: "己亥(猪)年五月廿九" // 农历(阴历)
          },
          weather: {
            humidity: "20", // 湿度
            temperature: "31", // 湿度
            info: "晴", // 天气情况
            direct: "北风", // 风向
            power: "3级", // 风力
            wid: "00" // 天气标识ID
          }
        };
      }
    }
  },
  computed: {
    getHungliJi() {
      let arr = [];
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.headerTopObj.huangli) {
            arr = this.headerTopObj.huangli.yi;
            arr = arr
              .split(" ")
              .slice(0, 3)
              .join(" ");
          }
          return arr;
        }, 300);
      });
    },
    getWeatherIconImg() {
      let weatherId = [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "53"
      ];
      for (let i = 0; i < weatherId.length; i++) {
        // console.log(weatherId[i])
      }
      //天气图标匹配
      switch (this.headerTopObj.weather && this.headerTopObj.weather.wid) {
        case "00":
          return "weather-qing-icon";
          break;
        case "01":
          return "weather-yin-icon";
          break;
        case "02":
          return "weather-yin-icon";
          break;
        case "03":
          return "weather-yu-icon";
          break;
        case "04":
          return "weather-yu-icon";
          break;
        case "05":
          return "weather-yu-icon";
          break;
        case "06":
          return "weather-xue-icon";
          break;
        case "07":
          return "weather-yu-icon";
          break;
        case "08":
          return "weather-yu-icon";
          break;
        case "09":
          return "weather-yu-icon";
          break;
        case "10":
          return "weather-yu-icon";
          break;
        case "11":
          return "weather-yu-icon";
          break;
        case "12":
          return "weather-yu-icon";
          break;
        case "13":
          return "weather-xue-icon";
          break;
        case "14":
          return "weather-xue-icon";
          break;
        case "15":
          return "weather-xue-icon";
          break;
        case "16":
          return "weather-xue-icon";
          break;
        case "17":
          return "weather-xue-icon";
          break;
        case "18":
          return "weather-wumai-icon";
          break;
        case "19":
          return "weather-yu-icon";
          break;
        case "20":
          return "weather-yangsha-icon";
          break;
        case "21":
          return "weather-yu-icon";
          break;
        case "22":
          return "weather-yu-icon";
          break;
        case "23":
          return "weather-yu-icon";
          break;
        case "24":
          return "weather-yu-icon";
          break;
        case "25":
          return "weather-yu-icon";
          break;
        case "30":
          return "weather-yangsha-icon";
          break;
        case "31":
          return "weather-yangsha-icon";
          break;
        case "53":
          return "weather-wumai-icon";
          break;
        default:
          break;
      }
    },
    getWeatherBgImg() {
      // 天气背景图匹配
      switch (this.headerTopObj.weather && this.headerTopObj.weather.wid) {
        case "00":
          return "weather-qing-bg";
          break;
        case "01":
          return "weather-yin-bg";
          break;
        case "02":
          return "weather-yin-bg";
          break;
        case "03":
          return "weather-yu-bg";
          break;
        case "04":
          return "weather-yu-bg";
          break;
        case "05":
          return "weather-yu-bg";
          break;
        case "06":
          return "weather-xue-bg";
          break;
        case "07":
          return "weather-yu-bg";
          break;
        case "08":
          return "weather-yu-bg";
          break;
        case "09":
          return "weather-yu-bg";
          break;
        case "10":
          return "weather-yu-bg";
          break;
        case "11":
          return "weather-yu-bg";
          break;
        case "12":
          return "weather-yu-bg";
          break;
        case "13":
          return "weather-xue-bg";
          break;
        case "14":
          return "weather-xue-bg";
          break;
        case "15":
          return "weather-xue-bg";
          break;
        case "16":
          return "weather-xue-bg";
          break;
        case "17":
          return "weather-xue-bg";
          break;
        case "18":
          return "weather-wumai-bg";
          break;
        case "19":
          return "weather-yu-bg";
          break;
        case "20":
          return "weather-yangsha-bg";
          break;
        case "21":
          return "weather-yu-bg";
          break;
        case "22":
          return "weather-yu-bg";
          break;
        case "23":
          return "weather-yu-bg";
          break;
        case "24":
          return "weather-yu-bg";
          break;
        case "25":
          return "weather-yu-bg";
          break;
        case "30":
          return "weather-yangsha-bg";
          break;
        case "31":
          return "weather-yangsha-bg";
          break;
        case "53":
          return "weather-wumai-bg";
          break;
        default:
          break;
      }
    }
  },
  activated() {

  },
  methods: {
    handleGoBack() {
      console.log(1)
      // window.history.go(-1);
      if(window.YlJsBridge) {
          window.YlJsBridge.onBack();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// 黄历图标
$huangliJiIcon: "../assets/images/huangli-ji-icon.png";
$huangliYiIcon: "../assets/images/huangli-yi-icon.png";

// 天气图标
$weatherQingIcon: "//static.yladm.com/Transformers/Brawn/images/jpush/qing-icon.png";
$weatherYinIcon: "//static.yladm.com/Transformers/Brawn/images/jpush/yin-icon.png";
$weatherYuIcon: "//static.yladm.com/Transformers/Brawn/images/jpush/yu-icon.png";
$weatherXueIcon: "//static.yladm.com/Transformers/Brawn/images/jpush/xue-icon.png";
$weatherWumaiIcon: "//static.yladm.com/Transformers/Brawn/images/jpush/wumai-icon.png";
$weatherYangShaIcon: "//static.yladm.com/Transformers/Brawn/images/jpush/yangsha-icon.png";

// 天气背景图
$weatherQingBg: "//static.yladm.com/Transformers/Brawn/images/jpush/qing-bg.png";
$weatherYinBg: "//static.yladm.com/Transformers/Brawn/images/jpush/yin-bg.png";
$weatherYuBg: "//static.yladm.com/Transformers/Brawn/images/jpush/yu-bg.png";
$weatherXueBg: "//static.yladm.com/Transformers/Brawn/images/jpush/xue-bg.png";
$weatherWumaiBg: "//static.yladm.com/Transformers/Brawn/images/jpush/wumai-bg.png";
$weatherYangShaBg: "//static.yladm.com/Transformers/Brawn/images/jpush/yangsha-bg.png";

$rem: 75;
@function conver($n) {
  @return $n / $rem + unquote("rem");
}

.morning-header {
  width: 100%;
  height: conver(244);
  background: #f9f9f9;
  position: relative;
  img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: conver(244);
    display: block;
  }
  &.top-bg {
    background: url('https://static.yladm.com/Transformers/Brawn/images/jpush/top-banner.png') no-repeat;
    background-size: 100% auto;
  }
  &.weather-qing-bg {
    background: url($weatherQingBg) no-repeat;
    background-size: 100% auto;
  }
  &.weather-yin-bg {
    background: url($weatherYinBg) no-repeat;
    background-size: 100% auto;
  }
  &.weather-yu-bg {
    background: url($weatherYuBg) no-repeat;
    background-size: 100% auto;
  }
  &.weather-xue-bg {
    background: url($weatherXueBg) no-repeat;
    background-size: 100% auto;
  }
  &.weather-wumai-bg {
    background: url($weatherWumaiBg) no-repeat;
    background-size: 100% auto;
  }
  &.weather-yangsha-bg {
    background: url($weatherYangShaBg) no-repeat;
    background-size: 100% auto;
  }
  .calendar-box {
    color: #ffffff;
    margin-left: conver(30);
    /* margin-top: conver(70); */
    position: relative;
    .calendar-info {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      .calendar-info-left {
        position: relative;
        padding-right: conver(20);
        .calendar-info-date {
          font-size: conver(22);
          font-family: "PingFangSC-Semibold";
          font-weight: 600;
          height: conver(30);
          line-height: conver(30);
        }
        .calendar-info-day {
          width: conver(113);
          height: conver(119);
          font-size: conver(100);
          font-family: "Helvetica";
          line-height: conver(120);
        }
        .left-line {
          position: absolute;
          right: 0;
          bottom: conver(24);
          width: conver(4);
          height: conver(120);
          background: #ffffff;
        }
      }
      .calendar-info-right {
        padding-left: conver(20);
        .calendar-info-nongli {
          /* width: conver(155); */
          height: conver(30);
          font-size: conver(22);
          font-family: "PingFangSC-Semibold";
          font-weight: 600;
          line-height: conver(30);
          padding-bottom: conver(7);
          border-bottom: conver(0.5) solid #ffffff;
          margin-bottom: conver(11);
        }
        .calendar-huangli-disc {
          div {
            font-size: conver(20);
            font-family: "PingFangSC-Regular";
            font-weight: 400;
            line-height: conver(28);
            padding-bottom: conver(13);
          }
          .calendar-huangli-yi,
          .calendar-huangli-ji {
            i {
              display: inline-block;
              width: conver(28);
              height: conver(28);
              position: relative;
              top: conver(7);
              &.huangli-yi-icon {
                background: url($huangliYiIcon) no-repeat;
                background-size: conver(28) auto;
              }
              &.huangli-ji-icon {
                background: url($huangliJiIcon) no-repeat;
                background-size: conver(28) auto;
              }
            }
          }
        }
      }
    }
    .weather-box {
      position: absolute;
      bottom: conver(40);
      right: conver(55);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      .weather-icon {
        width: conver(100);
        height: conver(100);
        /* background: #f9f9f9; */
        /* margin-right: conver(20); */
        span {
          display: block;
          width: conver(72);
          height: conver(72);
          margin: conver(15);
          &.weather-qing-icon {
            background: url($weatherQingIcon) no-repeat;
            background-size: conver(72) auto;
          }
          &.weather-yin-icon {
            background: url($weatherYinIcon) no-repeat;
            background-size: conver(72) auto;
          }
          &.weather-yu-icon {
            background: url($weatherYuIcon) no-repeat;
            background-size: conver(72) auto;
          }
          &.weather-xue-icon {
            background: url($weatherXueIcon) no-repeat;
            background-size: conver(72) auto;
          }
          &.weather-wumai-icon {
            background: url($weatherWumaiIcon) no-repeat;
            background-size: conver(72) auto;
          }
          &.weather-yangsha-icon {
            background: url($weatherYangShaIcon) no-repeat;
            background-size: conver(72) auto;
          }
        }
      }
      .weather-deg-num {
        position: relative;
        height: conver(62);
        font-size: conver(44);
        font-family: "PingFangSC-Semibold";
        font-weight: 600;
        line-height: conver(62);
        .weather-deg-symbol {
          position: absolute;
          top: conver(5);
          right: conver(-20);
          width: conver(10);
          height: conver(10);
          border: conver(4) solid #333333;
          border-radius: 50%;
        }
      }
      .weather-deg-desc {
        height: conver(28);
        font-size: conver(20);
        font-family: "PingFangSC-Regular";
        font-weight: 400;
        line-height: conver(28);
      }
    }
  }
}
</style>

