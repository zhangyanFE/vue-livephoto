<template>
  <section class="morning-main">
    <div class="morning-list-box" v-if="list.length">
      <template v-for="(item, index) of list">
        <div class="morning-list-item" v-if="item.template == 'covervideo'" :key="index">
          <div class="list-item-title">
            <h2>
              <i :class="`title-icon-${index+1}`"></i>
              <span>{{ item.block_name }}</span>
            </h2>
          </div>
          <div
            class="video-cover"
            @click="handleClick(item.list[0].title, item.block_name)"
            ref="listItem"
            :name="item.block_name"
            :title="item.list[0].title"
            :videoid="item.list[0].video_id"
          >
            <video-player :list="list" />
          </div>
          <div class="video-first-cover-title">{{ item.list[0].title }}</div>
        </div>
        <div class="morning-list-item" v-if="item.template == 'titlevideo'" :key="index">
          <div class="list-item-title">
            <h2>
              <i :class="`title-icon-${index+1}`"></i>
              <span>{{ item.block_name }}</span>
            </h2>
          </div>
          <div class="hot-title-box">
            <div
              class="video-info-box"
              ref="listItem"
              @click="handleClick(subItem.title, item.block_name)"
              :name="item.block_name"
              :title="subItem.video_id"
              :videoid="subItem.video_id"
              v-for="(subItem, index) of item.list"
              :key="index"
            >
              <a
                class="list-item-hot-title"
                :href="`/Brawn/general.html?id=${item.list[0].video_id}&preid=${item.list[0].video_id}&access_key=${getAccessKey}&top=1&fd=0&requestRefer=1&showTitle=1&channelId=&toplogid=${getLogId}&appkey=${getAppKey}&pkg_name=${getPkgName}`"
                target="_blank"
              >{{ subItem.title }}</a>
            </div>
          </div>
          <div class="list-more" v-if="item.list.length !== item.total">
            <router-link
              :to="`/list?title=${item.block_name}&total=${item.total}&blockid=${item.block_id}&mlist=1`"
              tag="div"
            >
              <div class="checkout-more">
                <span>查看更多{{ item.total }}条视频</span>
              </div>
            </router-link>
          </div>
          <div v-else style="padding: 8px 0"></div>
        </div>
        <div class="morning-list-item" :key="index" v-if="item.template == 'videolist'">
          <div class="list-item-title">
            <h2>
              <i :class="`title-icon-${index+1}`"></i>
              <span>{{ item.block_name }}</span>
            </h2>
          </div>
          <div
            class="video-cover"
            @click="handleClick(item.list[0].title, item.block_name)"
            ref="listItem"
            :name="item.block_name"
            :title="item.list[0].title"
            :videoid="item.list[0].video_id"
          >
            <!-- :href="`/Brawn/general.html?id=${item.list[0].video_id}&preid=${item.list[0].video_id}&access_key=${getAccessKey}&top=1&fd=0&requestRefer=1&showTitle=1&channelId=&toplogid=${getLogId}&appkey=${getAppKey}&pkg_name=${getPkgName}`" -->
            <a :href="`/Brawn/general.html?id=${item.list[0].video_id}&preid=${item.list[0].video_id}&access_key=${getAccessKey}&top=1&fd=0&requestRefer=1&showTitle=1&channelId=&toplogid=${getLogId}&appkey=${getAppKey}&pkg_name=${getPkgName}`" target="_blank">
              <img :src="item.list[0].video_cover" :alt="item.list[0].title" />
              <div class="video-cover-info">
                <div class="video-cover-mask"></div>
                <div class="video-cover-title">{{ item.list[0].title}}</div>
              </div>
              <div class="video-bottom-info">
                <div class="video-bottom-mask"></div>
                <div class="video-play-num">{{ item.list[0].cp_info.cp_name }}</div>
              </div>
              <div class="video-play-icon"></div>
            </a>
          </div>
          <div class="video-list-box" v-if="item.list.length">
            <div
              class="sub-list-item"
              v-for="(subItem, index) of item.list"
              :key="index"
              ref="listItem"
              :name="item.block_name"
              :title="subItem.title"
              :videoid="subItem.video_id"
              @click="handleClick(subItem.title, item.block_name)"
            >
              <!-- `/Brawn/general.html?id=${subItem.video_id}&preid=${subItem.video_id}&access_key=${getAccessKey}&top=1&fd=0&requestRefer=1&showTitle=1&channelId=&toplogid=${getLogId}&appkey=${getAppKey}&pkg_name=${getPkgName}` -->
              <a
                class="sub-list-item"
                v-if="index>0"
                :href="`/Brawn/general.html?id=${subItem.video_id}&preid=${subItem.video_id}&access_key=${getAccessKey}&top=1&fd=0&requestRefer=1&showTitle=1&channelId=&toplogid=${getLogId}&appkey=${getAppKey}&pkg_name=${getPkgName}`"
                target="_blank"
              >
                <div class="sub-list-left">
                  <img :src="subItem.video_cover" :alt="subItem.title" />
                </div>
                <div class="sub-list-right">
                  <div class="sub-list-title">{{ subItem.title }}</div>
                  <div class="sub-list-play-num">{{ subItem.cp_info.cp_name }}</div>
                </div>
              </a>
            </div>
          </div>
          <div class="list-more" v-if="item.list.length !== item.total">
            <router-link
              :to="`/list?title=${item.block_name}&total=${item.total}&blockid=${item.block_id}&mlist=1`"
              tag="div"
            >
              <div class="checkout-more">
                <span>查看更多{{ item.total }}条视频</span>
              </div>
            </router-link>
            <!-- <div class="list-total-num" v-if="item.template == 'videolist'">
                        <router-link :to="`/list?title=${item.block_name}&total=${item.total}&blockid=${item.block_id}`" tag="span">查看更多{{ item.total }}条视频</router-link>
                        <i class="arrow-icon"></i>
            </div>-->
          </div>
        </div>
        <div class="morning-list-item" v-if="item.template == 'motto'" :key="index">
          <div class="list-item-title last-item-title">
            <h2>
              <i class="title-icon-4"></i>
              <span>{{ item.block_name }}</span>
            </h2>
          </div>
          <div class="list-card" v-if="item.list[0]">
            <img :src="item.list[0].cover" alt="给今天的自己" />
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import {
  timestampToDateTimeFull,
  conversionUnit,
  getUrlParams,
  sendSpm,
  jpushWebLog,
  envVariable
} from "@/lib/util";
import VideoPlayer from "./VideoPlayer";

export default {
  name: "MorningList",
  components: {
    VideoPlayer
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    logId: {
      type: null
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
        return getUrlParams("toplogid").replace(/list/g, "") || "";
      } else {
        return getUrlParams("toplogid") || "";
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
    getUnit(num) {
      return conversionUnit(num);
    }
  },
  data() {
    return {
      eleArr: []
    };
  },
  watch: {
    list(newData, oldData) {
      if (newData) {
        this.setWebLog();
      }
    }
  },
  mounted() {
    this.init();
  },
  deactivated() {
    this.eleArr = [];
  },
  methods: {
    init() {
      this.setWebLog();
    },
    getDomainName() {
      return envVariable();
    },
    handleClick(title, blockName) {
      // 极光埋点上报
      jpushWebLog({
        type: "morning_click",
        itime: new Date() * 1,
        block: blockName,
        title,
      });
    },
    setWebLog() {
      setTimeout(() => {
        const listItem = this.$refs.listItem;
        listItem && this.recommendListWebLog(listItem);
        window.addEventListener(
          "scroll",
          () => {
            listItem && this.recommendListWebLog(listItem);
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
        const blockName =  curItem.getAttribute("name");
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
              block: blockName,
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
$videoTipIcon: "../assets/images/video-tip-icon.png";
$playIcon: "../assets/images/video-play-icon.png";
$videoIcon: "../assets/images/bofang-icon.png";
$jingxuanIcon: "../assets/images/jingxuan-icon.png";
$tipIcon: "../assets/images/tip-icon.png";
$dateIcon: "../assets/images/date-icon.png";
$goodMoodIcon: "../assets/images/goodmood-icon.png";
$arrowIcon: "../assets/images/arrow-icon-new.png";
$cardBg: "../assets/images/card.png";
$rem: 75;
@function conver($n) {
  @return $n / $rem + unquote("rem");
}
.morning-main {
  .morning-list-box {
    margin-top: conver(30);
    .morning-list-item {
      border-bottom: conver(0.5) solid #dedede;
      margin-bottom: conver(40);
      &:last-child {
        border-bottom: conver(0.5) solid #fff;
      }
      /* 新版标题 */
      .video-first-cover-title {
        padding: conver(25) 0 conver(35) 0;
        font-size: conver(32);
        font-family: "PingFangSC-Semibold";
        font-weight: 600;
        color: #333333;
      }
      .hot-title-box {
        margin-left: conver(50);
        margin-bottom: conver(-10);
        .video-info-box {
          position: relative;
          &:not(:last-child) {
            border-bottom: conver(0.5) solid #ebebeb;
          }
          .list-item-hot-title {
            width: conver(640);
            /* height: conver(84); */
            font-size: conver(30);
            font-family: "PingFangSC-Semibold";
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: conver(42);
            padding: conver(20) 0;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            &:before {
              content: "";
              position: absolute;
              left: conver(-50);
              top: conver(26.5);
              width: conver(30);
              height: conver(24);
              background: url($videoTipIcon) no-repeat;
              background-size: conver(30) auto;
              vertical-align: middle;
            }
          }
        }
      }
      &:not(:last-child) {
        padding: 0 conver(30);
      }
      .list-item-title {
        margin-bottom: conver(30);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
        &.last-item-title {
          margin-left: conver(30);
          margin-bottom: 0;
        }
        h2 {
          font-size: conver(28);
          color: #333333;
          font-weight: 600;
          font-family: "PingFangSC-Semibold";
          padding-left: conver(50);
          i {
            position: absolute;
            top: conver(-4);
            left: 0;
            width: conver(40);
            height: conver(40);
          }
          .title-icon-1 {
            background: url($dateIcon) no-repeat;
            background-size: conver(40) auto;
          }
          .title-icon-4 {
            background: url($jingxuanIcon) no-repeat;
            background-size: conver(40) auto;
          }
          .title-icon-2 {
            background: url($tipIcon) no-repeat;
            background-size: conver(40) auto;
          }
          .title-icon-3,
          .title-icon-5 {
            background: url($goodMoodIcon) no-repeat;
            background-size: conver(40) auto;
          }
        }
      }
      .video-cover {
        position: relative;
        background: #000;
        width: conver(690);
        height: conver(387);
        /* height: 5.62667rem; */
        overflow: hidden;
        img {
          display: block;
          width: conver(690);
          height: conver(387);
        }
        .video-play-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: conver(88);
          height: conver(88);
          background: url($playIcon) no-repeat;
          background-size: conver(88) auto;
        }
        .video-cover-info {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          .video-cover-mask {
            height: conver(184);
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 1) 0%,
              rgba(255, 255, 255, 0) 100%
            );
            opacity: 0.9;
          }
          .video-cover-title {
            position: absolute;
            top: 0;
            left: 0;
            padding: conver(16) conver(20) 0 conver(20);
            font-size: conver(28);
            font-family: "PingFangSC-Semibold";
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            height: conver(90);
            line-height: conver(40);
            text-shadow: 0 0 conver(2) rgba(0, 0, 0, 0.5);
          }
        }
        .video-bottom-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          .video-bottom-mask {
            height: conver(92);
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0) 100%,
              rgba(0, 0, 0, 1) 0%
            );
            opacity: 0.6035;
          }
          .video-play-num {
            position: absolute;
            bottom: conver(20);
            left: conver(20);
            font-size: conver(20);
            font-family: "PingFangSC-Regular";
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: conver(28);
            text-shadow: 0 0 conver(2) rgba(0, 0, 0, 0.5);
          }
        }
      }
      .video-list-box {
        margin-top: conver(30);
        .sub-list-item {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          margin-bottom: conver(15);
          .sub-list-left {
            width: conver(280);
            height: conver(157);
            overflow: hidden;
            background: #f3f3f3;
            img {
              width: conver(280);
              height: conver(157);
              display: block;
            }
          }
          .sub-list-right {
            margin-left: conver(20);
            .sub-list-title {
              width: conver(379);
              height: conver(82);
              line-height: conver(40);
              overflow: hidden;
              color: #333333;
              font-size: conver(30);
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              font-family: "PingFangSC-Medium;";
              font-weight: 500;
            }
            .sub-list-play-num {
              padding-top: conver(20);
              color: #999999;
              font-size: conver(20);
              font-weight: 400;
              height: conver(34);
              line-height: conver(28);
              font-family: "PingFangSC-Regular";
            }
          }
        }
      }
      .list-card {
        width: 100%;
        height: conver(646);
        img {
          width: 100%;
          height: conver(646);
        }
      }
      .list-more {
        position: relative;
        /* margin-bottom: conver(30); */
        /* margin-top: conver(30); */
        height: conver(100);
        line-height: conver(100);
        /* background: #e9e9e9; */
        text-align: center;
        .list-total-num {
          color: #666666;
          font-size: conver(24);
          margin-right: conver(25);
          position: absolute;
          right: 0;
          top: conver(-50);
          span {
            color: #1591ff;
            font-size: conver(24);
            font-family: "PingFangSC-Regular";
            font-weight: 400;
          }
          .arrow-icon {
            width: conver(22);
            height: conver(22);
            position: absolute;
            top: conver(2);
            right: conver(-25);
            background: url($arrowIcon) no-repeat;
            background-size: conver(22) auto;
          }
        }
        /* 新版查看更多 */
        .checkout-more {
          span {
            padding-left: conver(17);
            font-size: conver(28);
            font-family: "PingFangSC-Regular";
            font-weight: 400;
            color: #5a9cff;
            line-height: conver(33);
            position: relative;
            &:after {
              content: "";
              width: conver(22);
              height: conver(22);
              position: absolute;
              top: conver(7);
              right: conver(-35);
              background: url($arrowIcon) no-repeat;
              background-size: conver(22) auto;
            }
          }
        }
      }
    }
  }
}
</style>