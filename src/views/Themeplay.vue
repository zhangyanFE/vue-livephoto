<!--
 * @Author: your name
 * @Date: 2019-10-18 16:49:48
 * @LastEditTime: 2019-10-21 14:01:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Bruticus/vue-page/src/views/Themeplay.vue
 -->
<template>
  <div :class="['container', hideEle ? 'element-hide' : 'element-show']">
    <div :class="['loading-box', show && 'loading-hide']">
      <div class="loading"></div>
      <div class="loading-precent"></div>
    </div>
    <div class="content" v-show="show" @touchmove.prevent="handleTouchMove">
      <video
        id="videoDom"
        ref="video"
        :poster="curVideoPoster"
        webkit-playsinline="true"
        x-webkit-airplay="true"
        autoplay
        playsinline="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="false"
        :src="curVideoSrc"
        :class="['video-dom', videoShow ? 'video-show' : 'video-hide']"
        @play="handlePlayEvent"
        @pause="handlePauseEvent"
        @ended="handleEndEvent"
        @timeupdate="handleTimeUpdateEvent"
        @durationchange="handleDurationChangeEvent"
        @loadedmetadata="handleLoadedMetadataEvent"
        @loadstart="handleLoadStart"
      ></video>
      <div class="ylplayer-controller" v-show="hideEle">
        <div class="player-bar-wrap">
          <div class="player-bar">
            <div class="player-loaded"></div>
            <div class="player-played">
              <span class="player-thumb"></span>
            </div>
            <div class="player-time">
              <span class="player-ptime">00:00</span>
              <span class="player-dtime">00:00</span>
            </div>
          </div>
        </div>
        <div class="player-loading-icon">
          <svg
            version="1.1"
            id="L9"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            xml:space="preserve"
          >
            <path
              fill="#fff"
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              transform="rotate(174.275 50 50)"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                dur="1s"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
        <div
          :class="['player-icon', videoPlayIcon ? 'player-pause-icon' : 'player-play-icon']"
          @click.stop="handleVideoClick"
        >
          <i></i>
        </div>
      </div>
      <ul class="list-box">
        <li
          ref="videoListItem"
          :class="['list-item', {curVideo: index == currentVideo, preVideo: index !== currentVideo}]"
          v-for="(item, index) of list"
          :key="index"
          :videoid="item.video_id"
          :videosrc="`${prePlaySrcData[item.video_id]}`"
          @click.stop="handleListItemClick"
        >
          <div
            class="video-cover"
            v-show="videoCoverShow"
            :style="`backgroundImage: url(${item.video_cover})`"
          ></div>
          <div
            :class="['play-icon', videoPlayIcon && 'play-animation']"
            @click.stop="handleVideoClick"
          ></div>
          <video-element-set :likeNum="item.like_num" @changeLikeNum="item.like_num++" />
          <div class="video-indicator">
            <div class="video-theme-box">
              <span class="video-theme">
                <i class="video-theme-symbol">#</i>
                <span class="video-theme-title">{{listInfo.block_name}}</span>
                <span class="video-theme-indicator">{{ index + 1 }}/{{listInfo.total}}</span>
              </span>
              <div class="video-title">{{item.title}}</div>
            </div>
          </div>
        </li>
      </ul>
      <!-- 用户指引-左滑 -->
      <guide :showGuide="showGuide" />
      <!-- 自动播放下一个提示 -->
      <play-tip />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import {
  getUrlParams,
  generateSession,
  getCookie,
  setCookie,
  sendSpm,
  jpushWebLog
} from "@/lib/util";
import utils from "@/lib/utils";
import { Toast } from "vant";
import dataList from "@/mock/index";
import Guide from "@/components/SliderLeft";
import PlayTip from "@/components/PlayTip";
import VideoElementSet from "@/components/VideoElementSet";
import VideoPlayer from "@/components/Video";

export default {
  name: "themeplay",
  data() {
    return {
      currentVideo: 0, // 控制是否显示当前视频，-1为不显示当前视频
      currentTitle: "", // 当前标题
      list: [], // 视频列表数据
      show: false, // 是否显示页面
      videoIndex: 0, // 当前video索引
      curVideoSrc: "", // 当前视频地址
      curVideoPoster: "", // 当前视频封面
      curVideoId: "", // 当前视频id
      curVideoTitle: "", // 当前视频title
      curVideoModuleTitle: "", // 当前主题标题
      videoPlayIcon: false, // 视频中间大播放按钮控制变量
      videoShow: false, // 是否显示video元素
      videoCoverShow: true, //播放视频时隐藏当前视频封面图
      hideEle: false, // 隐藏&显示视频交互操作按钮和视频信息
      eleTimer: null, // 浮窗定时器变量
      videoEle: null, // video元素
      hideTime: 3000, //控制视频信息&左侧浮窗隐藏时间
      videoTimeUpdateFlag: true, // 视频已加载并且播放状态标识
      showGuide: true, // 是否显示用户指引
      guideCount: 0, // 用户指引提示次数
      elements: {},
      listInfo: {},
      // ---以下是极光和一览上报所需要的参数---
      firstVideoPlay: true, // videoplay 是否是第一次上报 true:第一次
      referpage: "",
      taskId: "",
      setTimer: null, // 5秒有效上报定时器
      setYlTimer: null, // 一览上报定时器
      setJgTimer: null, // 极光上报定时器
      jgCount: 5, // 极光上报计数器
      pretime: "",
      curtime: "",
      timeupdateTime: "",
      bufferStartTime: 0,
      bufferEndTime: 0,
      bufferSuccess: 1,
      videoShowArr: [],
      videoLogId: ""
    };
  },
  computed: {
    ...mapState({
      prePlaySrcData: state => state.themeplay.prePlaySrcData
    }),
    listLen() {
      return this.list.length;
    }
  },
  watch: {
    prePlaySrcData(newData, oldData) {
      if (this.curVideoSrc == "") {
        this.curVideoSrc = newData[this.curVideoId];
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations("themeplay", ["set_prePlaySrcData_data"]),
    ...mapActions("themeplay", [
      "get_list_data",
      "get_prePlay_data",
      "get_playVideo_data"
    ]),
    init() {
      setTimeout(() => {
        this.show = true;
        this.setVideoTypeStyle();
        // this.videoEle.muted = true;
        this.videoEle.play();
      }, 3000);

      // 当前日期
      this.curDate = this.$moment(new Date()).format("YYYY-MM-DD");
      this.day = getUrlParams("day") ? getUrlParams("day") : this.curDate;

      // 来源标识
      this.referpage = getUrlParams("referpage") || "vplaypage";

      // 极光上报参数标识
      this.jgParams = getUrlParams("appkey") || "";

      // taskid
      this.getTaskId();

      // 视频列表
      this.getListItem();

      // 创建手势操作
      this.createHammer();

      // 获取DOM元素
      this.getElement();

      // 视频进度条初始化
      this.initPlayedBar();

      // css3动画
      this.requestAnimationFrame();

      // loading 缓冲
      this.initloadingChecker();

      if (getCookie("guideCount") >= 3) {
        this.showGuide = false;
      }
    },
    getTaskId() {
      this.taskId = getCookie("taskid") || "";
      if (!this.taskId) {
        this.taskId = generateSession(50);
        setCookie("taskid", this.taskId);
      }
      if (this.taskId == "undefined") {
        this.taskId = generateSession(50);
        setCookie("taskid", this.taskId);
      }
    },
    getElement() {
      this.videoEle = this.$refs.video;
      this.videoDom = document.querySelector(".video-dom");
      this.playedBarWrap = document.querySelector(".player-bar-wrap");
      this.playedNode = document.querySelector(".player-played");
      this.ptimeNode = document.querySelector(".player-ptime");
      this.dtimeNode = document.querySelector(".player-dtime");
      this.elements.played = document.querySelector(".player-played");
      this.elements.loaded = document.querySelector(".player-loaded");
      this.playerLoading = document.querySelector(".player-loading-icon");
      this.playTip = document.querySelector(".play-tip");
    },
    setVideoTypeStyle() {
      // 根据数据接口的type字段匹配修改video的样式
      if (this.list.length && this.list[this.videoIndex].type === "ugc") {
        this.videoDom.style.objectFit = "cover";
      }
    },
    createHammer() {
      let hammerJs = this.Hammerjs(document.getElementById("app"));
      hammerJs.on("swipeleft swiperight doubletap", ev => {
        switch (ev.type) {
          case "swipeleft":
            // 左滑动函数
            this.leftSlideFn();
            break;
          case "swiperight":
            // 右滑动函数
            this.rightSlideFn();
            break;
          case "doubletap":
          // 点击事件函数
          // this.doubletapClickFn();
          default:
            break;
        }
      });
    },
    async getListItem() {
      const listData = await this.get_list_data();
      this.videoLogId = listData.logid;
      this.listInfo = listData.data;
      this.curVideoModuleTitle = this.listInfo.block_name;
      this.list.push(...listData.data.list);

      //预请求所有的视频地址
      for (let i = 0; i < this.list.length; i++) {
        let element = this.list[i].video_id;
        this.get_prePlay_data(element);
      }

      setTimeout(() => {
        if (this.videoIndex == 0) {
          this.getVideoInfo();
        }
      }, 500);
    },
    getVideoInfo() {
      // 获取当前videoSrc
      this.curVideoSrc = this.$refs.videoListItem[this.videoIndex].getAttribute(
        "videosrc"
      );
      // 获取当前videiId
      this.curVideoId = this.$refs.videoListItem[this.videoIndex].getAttribute(
        "videoid"
      );
      // 获取当前video封面图
      this.curVideoPoster = this.list[this.videoIndex].image;

      // 获取当前video标题
      this.curVideoTitle = this.list[this.videoIndex].title;

      // videoshow 上报
      this.videoShowLog();
    },
    videoShowLog() {
      if (this.videoShowArr.indexOf(this.curVideoId) == -1) {
        this.videoShowArr.push(this.curVideoId);
        // 一览展现埋点上报
        this.reportLog("videoshow");
        // 极光展现埋点上报
        this.reportLog("morning_expose");
      }
    },
    leftSlideFn() {
      if (this.videoIndex < this.listLen - 1) {
        this.videoIndex++;
        this.guideCount++;
        this.currentVideo = this.videoIndex;
        this.videoPlayIcon = false;
        this.hideEle = false;
        this.videoCoverShow = true;
        // 获取视频信息
        this.getVideoInfo();

        // 右滑下一个视频把 firstVideoPlay 重置为true，重新上报videoplay
        this.firstVideoPlay = true;

        // 左滑下一个视频重置taskid
        this.taskId = generateSession(50);

        // 清除定时器操作
        this.handleClearTimer();

        // 判断视频类型对video样式修改
        this.setVideoTypeStyle();

        //每次列表还剩余一个的时候，请求下一批视频列表
        if (this.videoIndex == this.list.length - 2) {
          this.getListItem();
        }

        // 向左滑三次隐藏指引提示
        setCookie("guideCount", this.guideCount);
        if (getCookie("guideCount") >= 3) {
          this.showGuide = false;
        }
      } else {
        Toast("没有更多了~");
      }
    },
    rightSlideFn() {
      if (this.videoIndex > 0) {
        this.videoIndex--;
        this.currentVideo = this.videoIndex;
        this.videoPlayIcon = false;
        this.hideEle = false;
        this.videoCoverShow = true;

        // 获取视频信息
        this.getVideoInfo();

        // 右滑下一个视频重置taskid
        this.taskId = generateSession(50);

        // 清除定时器操作
        this.handleClearTimer();

        // 判断视频类型对video样式修改
        this.setVideoTypeStyle();

        // 右滑下一个视频把 firstVideoPlay 重置为true，重新上报videoplay
        this.firstVideoPlay = true;
      } else {
        Toast("已经是第一条了~");
      }
    },
    doubletapClickFn() {
      this.handleVideoClick();
    },
    handleListItemClick() {
      if (this.hideEle) {
        this.hideEle = false;
      } else {
        this.hideEle = true;
      }
      this.hideEleFn();
      // 极光点击埋点上报
      this.reportLog("morning_click");
    },
    handleVideoClick() {
      if (this.videoEle.paused) {
        this.videoEle
          .play()
          .then(() => {
            console.warn("播放成功");
          })
          .catch(e => {
            console.warn(`错误：${e}`);
          });
        // 显示视频缓冲loading
        this.enable("loading");
        this.videoPlayIcon = true;
      } else {
        this.videoEle.pause();
        // 显示视频缓冲loading
        this.disable("loading");
        this.videoPlayIcon = false;
      }
    },
    handlePlayEvent() {
      this.videoPlayIcon = true;
      this.videoShow = true;
      this.hideEleFn(); // 播放成功三秒之后隐藏元素
      if (this.curVideoSrc) {
        //这条保证数据对play接口统计
        this.get_playVideo_data(this.curVideoId);
      }

      // videoplay上报
      if (this.firstVideoPlay) {
        this.firstVideoPlay = false;
        this.reportLog("videoplay");
        // 首次缓冲播放成功，5秒后上报有效播放
        this.reportLog("videoeffective");
      }
      // 一览定时埋点上报
      this.reportLog("videoplaytm");
      // 极光定时埋点上报
      this.reportLog("morning_browser_duration");
    },
    handlePauseEvent() {
      clearTimeout(this.eleTimer);
      // 清除定时器操作
      this.handleClearTimer();
      this.videoPlayIcon = false;
      // this.hideEle = false;
      this.videoCoverShow = false;
    },
    handleEndEvent() {
      this.leftSlideFn();
    },
    handleDurationChangeEvent() {
      if (this.videoEle.duration !== 1 && this.videoEle.duration !== Infinity) {
        this.dtimeNode.innerHTML = utils.secondToTime(this.videoEle.duration);
      }
    },
    handleTimeUpdateEvent() {
      this.setBar();
    },
    handleLoadedMetadataEvent() {
      this.reportLog("videobuffer");
    },
    handleLoadStart() {
      this.bufferStartTime = new Date() * 1;
    },
    handleClearTimer() {
      if (
        parseInt(this.videoEle.currentTime) < parseInt(this.videoEle.duration)
      ) {
        // 清除一览上报定时器
        clearInterval(this.setYlTimer);
        // 清除极光上报定时器
        clearInterval(this.setJgTimer);
      }
    },
    setBar() {
      let durationTime = this.videoEle.duration; // 获取视频总时间
      let current = this.videoEle.currentTime; // 获取视频当前播放时间
      let percent = current / durationTime; // 计算百分比
      let currentTime = utils.secondToTime(current);

      this.setVideoBar("played", current / durationTime, "width");

      if (this.videoEle.currentTime > 0) {
        this.videoCoverShow = false;
      }

      if (this.ptimeNode.innerHTML !== currentTime) {
        this.ptimeNode.innerHTML = currentTime;
      }
    },
    hideEleFn() {
      clearTimeout(this.eleTimer);
      this.eleTimer = setTimeout(() => {
        this.hideEle = true;
        // document.querySelector(".video-element-info").style.opacity = "0.6";
        // document.querySelector(".video-indicator").style.opacity = "0.6";
        // setTimeout(()  => {
        //   this.hideEle = true;
        // }, 3000)
      }, this.hideTime);
    },
    showAutoNextTip(flagMax) {
      let percentMax = "92%";
      if (flagMax > percentMax) {
        this.playTip.style.display = "block";
      } else {
        this.playTip.style.display = "none";
      }
    },
    initPlayedBar() {
      const thumbMove = e => {
        let percentage =
          ((e.clientX || e.changedTouches[0].clientX) -
            utils.getBoundingClientRectViewLeft(this.playedBarWrap)) /
          this.playedBarWrap.clientWidth;
        percentage = Math.max(percentage, 0);
        percentage = Math.min(percentage, 1);
        this.setVideoBar("played", percentage, "width");
        this.ptimeNode.innerHTML = utils.secondToTime(
          percentage * this.videoEle.duration
        );
      };

      const thumbUp = e => {
        document.removeEventListener(utils.eventMap.dragMove, thumbMove);
        document.removeEventListener(utils.eventMap.dragEnd, thumbUp);
        let percentage =
          ((e.clientX || e.changedTouches[0].clientX) -
            utils.getBoundingClientRectViewLeft(this.playedBarWrap)) /
          this.playedBarWrap.clientWidth;
        percentage = Math.max(percentage, 0);
        percentage = Math.min(percentage, 1);
        this.setVideoBar("played", percentage, "width");
        this.seek(this.getVideoBar("played") * this.videoEle.duration);
      };

      // touchstart
      this.playedBarWrap.addEventListener(utils.eventMap.dragStart, e => {
        document.addEventListener(utils.eventMap.dragMove, thumbMove);
        document.addEventListener(utils.eventMap.dragEnd, thumbUp);
      });

      // touchmove
      this.playedBarWrap.addEventListener(utils.eventMap.dragMove, e => {
        // e.preventDefault();
        // e.stopPropagation();
        if (this.videoEle.duration) {
          const px = utils.cumulativeOffset(this.playedBarWrap).left;
          const tx = (e.clientX || e.changedTouches[0].clientX) - px;

          if (tx < 0 || tx > this.playedBarWrap.offsetWidth) return;
          const time =
            this.videoEle.duration * (tx / this.playedBarWrap.offsetWidth);

          // 拖动进度条时暂停播放
          this.videoEle.pause();
        }
      });

      // touchend
      this.playedBarWrap.addEventListener(utils.eventMap.dragEnd, e => {
        // 拖动进度条后进行播放
        this.videoEle.play();
      });
    },
    seek(time) {
      time = Math.max(time, 0);
      if (this.videoEle.duration) {
        time = Math.min(time, this.videoEle.duration);
      }

      if (this.videoEle.currentTime > 0) {
        this.videoEle.currentTime = time;
      }

      this.setVideoBar("played", time / this.videoEle.duration, "width");
      this.ptimeNode.innerHTML = utils.secondToTime(time);
    },
    setVideoBar(type, percentage, direction) {
      percentage = Math.max(percentage, 0);
      percentage = Math.min(percentage, 1);
      if (this.elements[type]) {
        this.elements[type].style[direction] = percentage * 100 + "%";
        // 自动播放下一个提示
        this.showAutoNextTip(this.elements[type].style[direction]);
      }
    },
    getVideoBar(type) {
      return parseFloat(this.elements[type].style.width) / 100;
    },
    initloadingChecker() {
      let lastPlayPos = 0;
      let currentPlayPos = 0;
      let bufferingDetected = false;
      this.loadingChecker = setInterval(() => {
        if (this.enableloadingChecker) {
          // whether the video is buffering
          currentPlayPos = this.videoEle.currentTime;
          // console.log(currentPlayPos, lastPlayPos)
          if (
            !bufferingDetected &&
            currentPlayPos === lastPlayPos &&
            !this.videoEle.paused
          ) {
            this.playerLoading.classList.add("show-loading");
            bufferingDetected = true;
          }
          if (
            bufferingDetected &&
            currentPlayPos > lastPlayPos &&
            !this.videoEle.paused
          ) {
            this.playerLoading.classList.remove("show-loading");
            bufferingDetected = false;
          }
          lastPlayPos = currentPlayPos;
        }
      }, 100);
    },
    enable(type) {
      this[`enable${type}Checker`] = true;
    },
    disable(type) {
      this[`enable${type}Checker`] = false;
    },
    requestAnimationFrame() {
      window.requestAnimationFrame = (() =>
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        })();
    },
    reportLog(logType) {
      // 上报log
      switch (logType) {
        case "videoplay":
          sendSpm({
            spmID: "10014",
            type: 1,
            eventName: "videoplay",
            data: {
              videoid: this.curVideoId,
              logid: this.videoLogId,
              referpage: this.referpage,
              taskid: this.taskId
            }
          });
          break;
        case "videobuffer":
          // 视频首次缓存操作
          this.bufferEndTime = new Date() * 1;
          let diffTime = this.bufferEndTime - this.bufferStartTime;

          if (diffTime > 0) {
            this.bufferSuccess = 0;
          }
          sendSpm({
            spmID: "10029",
            type: 1,
            eventName: "videobuffer",
            data: {
              videoid: this.curVideoId,
              buffer: this.bufferSuccess,
              taskid: this.taskId,
              btm: diffTime
            }
          });
          this.bufferEndTime = 0;
          this.bufferStartTime = 0;
          break;
        case "videoeffective":
          // 如果首次缓冲播放成功，5秒后上报有效播放
          this.setTimer = setTimeout(() => {
            let bufferCurTime = this.videoEle.currentTime;
            if (this.bufferSuccess == 0) {
              sendSpm({
                spmID: "10030",
                type: 1,
                eventName: "videoeffective",
                data: {
                  videoid: this.curVideoId,
                  taskid: this.taskId,
                  pos: parseInt(bufferCurTime)
                }
              });
            }
          }, 5000);
          break;
        case "videoplaytm":
          clearInterval(this.setYlTimer);
          this.setYlTimer = setInterval(() => {
            // 新的埋点上报方式
            let curEt = parseInt(this.videoEle.currentTime);
            let curBt = curEt >= 0 ? (curEt - 10 <= 0 ? 0 : curEt - 10) : 0;

            sendSpm({
              spmID: "10015",
              type: 1,
              eventName: "videoplaytm",
              data: {
                videoid: this.curVideoId,
                rt: 0,
                bt: curBt, // 开始
                et: curEt, // 结束
                taskid: this.taskId
              }
            });
          }, 10000);
          break;
        case "videoshow":
          sendSpm({
            spmID: "10026",
            type: 1,
            eventName: "videoshow",
            data: {
              videoid: this.curVideoId,
              logid: this.videoLogId,
              referpage: "jpush",
              pos: parseInt(this.videoIndex + 1)
            }
          });
          break;
        case "morning_expose": // 极光展现埋点上报
          jpushWebLog({
            type: "morning_expose",
            itime: new Date() * 1,
            block: this.curVideoModuleTitle,
            title: this.curVideoTitle
          });
          break;
        case "morning_browser_duration": // 极光浏览时长(播放时长埋点上报)
          clearInterval(this.setJgTimer);
          this.setJgTimer = setInterval(() => {
            // 极光埋点上报
            jpushWebLog({
              type: "morning_browser_duration",
              itime: new Date() * 1,
              duration: this.jgCount,
              block: this.curVideoModuleTitle,
              title: this.curVideoTitle
            });
          }, 5000);
        case "morning_click": // 极光点击埋点上报
          jpushWebLog({
            type: "morning_click",
            itime: new Date() * 1,
            block: this.curVideoModuleTitle,
            title: this.curVideoTitle
          });
        default:
          break;
      }
    },
    handleTouchStart(event) {},
    handleTouchMove(event) {},
    handleTouchEnd(event) {}
  },
  components: {
    Guide,
    PlayTip,
    VideoElementSet,
    VideoPlayer
  }
};
</script>
<style lang="scss" scoped>
$loading: "../assets/images/loading.gif";
$loadingPrecent: "../assets/images/precent.gif";
$playerIcon: "../assets/images/player-icon.png";
$playIcon: "../assets/images/play-icon.png";
$pauseIcon: "../assets/images/pause-icon.png";
$thumbIcon: "../assets/images/thumb-icon.png";

$rem: 75;
@function conver($n) {
  @return $n / $rem + unquote("rem");
}

/* loading加载动画 */
.loading-box {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #ffffff;
  /* opacity: 1; */
  transition: opacity 0.5s;
  &.loading-hide {
    /* opacity: 0; */
    display: none;
  }
  .loading {
    position: absolute;
    top: 40%;
    left: 50%;
    margin-left: conver(-180);
    margin-top: conver(-180);
    width: conver(360);
    height: conver(360);
    background: url($loading) no-repeat;
    background-size: conver(360) auto;
  }
  .loading-precent {
    position: absolute;
    top: 57%;
    left: 50%;
    /* margin-left: conver(-434);
    margin-top: conver(-42); */
    transform: translate(-50%, -50%);
    width: conver(434);
    height: conver(42);
    background: url($loadingPrecent) no-repeat;
    background-size: conver(434) auto;
  }
  @keyframes spin-stretch {
    50% {
      transform: rotate(360deg) scale(0.4, 0.33);
      border-width: 8px;
    }
    100% {
      transform: rotate(720deg) scale(1, 1);
      border-width: 3px;
    }
  }
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  &.element-hide {
    .video-element-info,
    .video-indicator {
      /* opacity: 0; */
      display: none;
      transition: all 0.5s;
    }
  }
  &.element-show {
    .video-element-info,
    .video-indicator {
      opacity: 1;
      transition: all 0.5s;
    }
  }
  .content {
    background-color: #000000;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .list-box {
      position: relative;
      height: 100%;
      z-index: 2;
      .list-item {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        bottom: 0;
        transform: translate3d(100%, 0, 0);
        transition: all 0.3s;
        overflow: hidden;
        background-color: transparent;
        z-index: 2;
        .video-cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-position: 50%;
          background-size: cover;
        }
        .play-icon {
          width: conver(100);
          height: conver(100);
          background: url($playerIcon) no-repeat;
          background-size: contain;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: conver(-50);
          margin-top: conver(-50);
          opacity: 1;
          transform: scale(1);
          z-index: 100;
          transition: opacity 0.3s, transform 0.3s;
          &.play-animation {
            opacity: 0;
            transform: scale(2);
            /* animation: playicon-show 0.08s linear forwards; */
          }
          @keyframes playicon-show {
            0% {
              transform: scale(2);
              opacity: 0;
            }

            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        }
      }
    }
    /* 视频信息 */
    .video-indicator {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-bottom: conver(40);
      /* z-index: 20; */
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.6) 100%
      );
      .video-theme-box {
        padding: 0 conver(30);
        .video-theme {
          display: inline-block;
          margin-bottom: conver(20);
          /* font-size: conver(22); */
          font-family: PingFangSC-Semibold, PingFangSC;
          font-weight: 600;
          color: #fff;
          background-color: rgba(77, 77, 77, 0.5);
          border-radius: 2px;
          padding: conver(8) conver(10) conver(8) conver(14);
          .video-theme-symbol {
            color: #ff8500;
            padding-right: conver(10);
            font-style: normal;
          }
          .video-theme-indicator {
            font-size: conver(20);
            font-family: PingFang-SC-Semibold, PingFang-SC;
            font-weight: 600;
            color: #fff;
            padding-left: conver(20);
            padding-top: conver(10);
          }
        }
      }
      .video-title {
        height: conver(96);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: conver(34);
        font-family: PingFang-SC-Semibold, PingFang-SC;
        font-weight: 600;
        color: #fff;
        line-height: conver(48);
      }
    }
  }
}

.video-dom {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50%;
  z-index: 2;
  /* object-fit: cover; */
  /* margin: auto; */
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &.video-show {
    display: block;
  }
  &.video-hide {
    display: none;
  }
}

/* 进度条样式 */
.ylplayer-controller {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 3;
  user-select: none;
  transition: all 0.5s ease;
  .player-bar-wrap {
    width: calc(100% - 4.8rem);
    height: conver(4);
    margin: 0 conver(220);
    position: absolute;
    bottom: conver(80);
    left: 0;
    right: 0;
    .player-bar {
      position: relative;
      width: 100%;
      height: conver(4);
      background: hsla(0, 0%, 100%, 0.2);
      /* 缓冲 */
      .player-loaded {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        background: hsla(0, 0%, 100%, 0.4);
        height: conver(4);
        transition: all 0.5s ease;
        will-change: width;
      }
      /* 已加载 */
      .player-played {
        /* 动态设置宽度 */
        /* width: 0%; */
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        height: conver(4);
        will-change: width;
        background: #5a9cff;
        .player-thumb {
          position: absolute;
          top: 0;
          right: conver(10);
          background: url($thumbIcon) no-repeat;
          background-size: conver(30) auto;
          margin-top: conver(-12);
          margin-right: conver(-20);
          width: conver(30);
          height: conver(30);
          /* background: #fff;
          border-radius: 50%; */
          transition: all 0.3s ease-in-out;
          transform: scale(1);
        }
      }
      /* 时间 */
      .player-time {
        color: #fff;
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        vertical-align: middle;
        font-size: conver(22);
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        .player-ptime,
        .player-dtime {
          position: absolute;
          top: conver(-12);
        }
        .player-ptime {
          left: conver(-90);
        }
        .player-dtime {
          right: conver(-90);
        }
      }
    }
  }
  /* 缓冲 loading svg */
  .player-loading-icon {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    margin: conver(-80) 0 0 conver(-80);
    width: conver(160);
    height: conver(160);
    &.show-loading {
      display: block;
    }
    svg {
      transform-origin: center;
      /* animation: rotate 2s linear infinite; */
    }

    circle {
      fill: none;
      stroke: #f9f9f9;
      stroke-width: 2;
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      stroke-linecap: round;
      /* animation: dash 1.5s ease-in-out infinite; */
    }
  }
  /* 播放、暂停按钮 */
  .player-icon {
    margin-top: conver(-108);
    margin-left: conver(50);
    width: conver(52);
    height: conver(52);
    i {
      display: inline-block;
      width: conver(52);
      height: conver(52);
    }
    &.player-play-icon {
      i {
        background: url($playIcon) no-repeat;
        background-size: cover;
      }
    }
    &.player-pause-icon {
      i {
        background: url($pauseIcon) no-repeat;
        background-size: cover;
      }
    }
  }
}
.preVideo {
  transform: translate3d(100%, 0, 0) !important;
}
.curVideo {
  transform: translate3d(0, 0, 0) !important;
}
</style>