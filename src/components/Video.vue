<template>
  <div class="ylplayer-container">
    <div id="J_ylplayer"></div>
  </div>
</template>
<script>
import API from "@/http/api";
import { sendSpm, getUrlParams } from "@/lib/util";

export default {
  name: "ylPlayer",
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    options: {
      type: Object,
      default: () => ({
        autoplay: true,
        preload: "auto",
        loop: false,
        trackLogParams: {
          videoId: ""
        },
        video: {
          pic: "//static.yladm.com/Transformers/Brawn/videotest/test.jpg",
          url: "//static.yladm.com/Transformers/Brawn/videotest/test.mp4"
        }
      })
    }
  },
  data() {
    return {
      accessKey: "",
      videoSourceUrl: "",
      videoCover: "",
      ylplayer: ""
    };
  },
  mounted() {
    this.init();
  },
  deactivated() {
    // console.log('销毁播放器');
    this.ylplayer.pause();
    // this.ylplayer && this.ylplayer.destroy();
  },
  methods: {
    init() {
      this.videoCover = this.list && this.list[0].image;
      this.videoId = this.list && this.list[0].video_id;
      this.accessKey = getUrlParams("access_key") || "yluyh22n5kdq";
      this.getPlayer();
      this.getVideoSource();
    },
    async getVideoSource() {
      let params = {
        access_key: this.accessKey,
        id: this.videoId
      };
      const { bitrates } = await API.playVideoApi(params);

      this.videoSourceUrl = bitrates[2].uri;

      document
        .querySelector(".ylplayer-video")
        .setAttribute("src", this.videoSourceUrl);
      document
        .querySelector(".ylplayer-video")
        .setAttribute("poster", this.videoCover);
    },
    getPlayer() {
      this.ylplayer = new YLPlayer({
        container: document.getElementById("J_ylplayer"),
        preload: "auto",
        trackLogParams: {
          videoId: this.videoId
        },
        video: {
          url: this.videoSourceUrl,
          pic: this.videoCover
        },
        autoplay: true,
        trackLog: true
      });
      this.ylplayer.on("canplay", () => {
        console.log("canplay");
        // this.ylplayer.play();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n / $rem + unquote("rem");
}
</style>

