<template>
  <div class="list-container">
    <div
      class="list-feed-item"
      v-for="(item, index) of list"
      :key="index"
      ref="listItem"
      :videoid="item.video_id"
      :title="item.title"
      @click="handleClick(item)"
    >
      <!-- `/Brawn/general.html?id=${item.video_id}&preid=${item.video_id}&access_key=${getAccessKey}&top=1&fd=0&requestRefer=1&showTitle=1&channelId=&toplogid=${getLogId}` -->
      <a :href="`/Brawn/general.html?id=${item.video_id}&preid=${item.video_id}&access_key=${getAccessKey}&top=1&fd=0&requestRefer=1&showTitle=1&channelId=&toplogid=${getLogId}&appkey=${getAppKey}&pkg_name=${getPkgName}`" target="_blank">
        <div class="video-cover">
          <img :src="item.video_cover" :alt="item.title" />
          <div class="video-cover-info">
            <div class="video-cover-mask"></div>
            <div class="video-cover-title">{{ item.title }}</div>
          </div>
          <div class="video-bottom-info">
            <div class="video-user-avatar">
              <img :src="item.cp_info.cp_head" :alt="item.cp_info.name" />
            </div>
            <p class="video-user-name">{{ item.cp_info.cp_name }}</p>
            <div class="video-duration-time">{{ item.duration | timeConversion }}</div>
          </div>
          <div class="video-play-icon"></div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import {
  timestampToDateTimeFull,
  getUrlParams,
  sendSpm,
  jpushWebLog,
  envVariable
} from "@/lib/util";

export default {
  name: "recommendList",
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    logId: {
      type: null
    },
    title: {
        type: String,
        default: ''
    }
  },
  computed: {
    getAccessKey() {
      if (getUrlParams("access_key").indexOf("list") > 0) {
        return (
          getUrlParams("access_key").replace(/list/g, "") || "yluyh22n5kdq"
        );
      } else {
        return getUrlParams("access_key") || "yluyh22n5kdq";
      }
    },
    getLogId() {
      if (getUrlParams("toplogid").indexOf("list") > 0) {
        return getUrlParams("toplogid").replace(/list/g, "");
      } else {
        return getUrlParams("toplogid");
      }
    },
    getAppKey() {
      if (getUrlParams("appkey").indexOf("list") > 0) {
        return getUrlParams("appkey").replace(/list/g, "");
      } else {
        return getUrlParams("appkey");
      }
    },
    getPkgName() {
      if (getUrlParams("pkg_name").indexOf("list") > 0) {
        return getUrlParams("pkg_name").replace(/list/g, "");
      } else {
        return getUrlParams("pkg_name");
      }
    }
  },
  filters: {
    timeConversion(time) {
      return timestampToDateTimeFull(time);
    }
  },
  data() {
    return {
      eleArr: []
    };
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.eleArr = [];
  },
  methods: {
    init() {
      this.setWebLog();
    },
    getDomainName() {
      return envVariable();
    },
    handleClick(item) {
      // 极光埋点上报
      jpushWebLog({
        type: "morning_click",
        itime: new Date() * 1,
        block: this.title,
        title: item.title
      });
    },
    setWebLog() {
      setTimeout(() => {
        const listItem = this.$refs.listItem;
        listItem && this.recommendListWebLog(listItem);
        window.addEventListener(
          "scroll",
          () => {
            this.recommendListWebLog(listItem);
          },
          true
        );
      }, 800);
    },
    recommendListWebLog(listItem) {
      // 精彩推荐展现埋点上报
      const windowH =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight; // 浏览器高度兼容写法
      for (let i = 0; i < listItem.length; i++) {
        const curItem = listItem[i];
        const pos = curItem.getBoundingClientRect();
        const videoId = curItem.getAttribute("videoid");
        const videoTitle = curItem.getAttribute("title");
        const obj_ = {
          top: pos.top,
          bottom: pos.bottom,
          left: pos.left,
          right: pos.right
        };
        if (
          obj_.top >= 0 &&
          obj_.top < windowH &&
          obj_.bottom >= 0 &&
          obj_.bottom <= windowH
        ) {
          let isIn = this.eleArr.indexOf(i);
          if (isIn == -1) {
            sendSpm({
              spmID: "10026",
              type: 1,
              eventName: "videoshow",
              data: {
                videoid: videoId,
                logid: this.logId,
                referpage: "jpush",
                pos: parseInt(i + 1)
              }
            });
            // 极光埋点上报
            jpushWebLog({
              type: "morning_expose",
              itime: new Date() * 1,
              block: this.title,
              title: videoTitle
            });
          }
          this.eleArr.push(i);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$videoIcon: "../assets/images/video-icon.png";

$rem: 75;
@function conver($n) {
  @return $n / $rem + unquote("rem");
}

.list-container {
  .list-feed-item {
    width: conver(750);
    height: conver(508);
    overflow: hidden;
    position: relative;
    .video-cover {
      background: #f3f3f3;
      height: conver(422);
      overflow: hidden;
      img {
        width: conver(750);
        height: conver(422);
        display: block;
      }
      .video-cover-info {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        .video-cover-mask {
          height: conver(159);
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        }
        .video-cover-title {
          position: absolute;
          top: 0;
          left: 0;
          padding: conver(16) conver(20) 0 conver(20);
          font-size: conver(34);
          /* font-family: 'PingFangSC-Medium'; */
          font-family: "PingFangSC-Semibold";
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          height: conver(106);
          line-height: conver(53);
          text-shadow: 0 conver(2) conver(4) rgba(0, 0, 0, 0.5);
        }
      }
      .video-bottom-info {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        /* display: flex;
                flex-direction: row;
                justify-content: space-between; */
        .video-user-avatar {
          width: conver(78);
          height: conver(78);
          background: #d8d8d8;
          box-shadow: 0 conver(4) conver(8) 0 rgba(0, 0, 0, 0.25);
          border: conver(2) solid #ffffff;
          border-radius: 50%;
          position: relative;
          bottom: conver(8);
          left: conver(32);
          img {
            display: block;
            width: conver(78);
            height: conver(78);
            border-radius: 50%;
          }
        }
        .video-user-name {
          padding-left: conver(31);
          padding-bottom: conver(26);
          height: conver(33);
          font-size: conver(24);
          font-family: "PingFangSC-Medium";
          font-weight: 500;
          color: #000;
          line-height: conver(33);
        }
        .video-duration-time {
          position: absolute;
          right: conver(20);
          top: conver(80);
          color: #999999;
          font-size: conver(24);
          font-family: "PingFangSC-Regular";
          font-weight: 400;
          line-height: conver(33);
        }
      }
      .video-play-icon {
        width: conver(101);
        height: conver(101);
        background: url($videoIcon) no-repeat;
        background-size: conver(101) auto;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
