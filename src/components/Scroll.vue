<template>
    <div class="scroll">
        <slot></slot>
        <div id="loader" class="loading-more" v-show="isLoadMore && list.length>0">
            <img v-if="getParams('loadingstyle') == 0" :src="loadingImgUrl" alt="loading" />
            <div v-else class="loading-circle"></div>
        </div>
        <div id="J_noData" class="no-data" v-show="isLoadMore && list.length>0"></div>
    </div>
</template>
<script>
import { getUrlParams } from '@/lib/util';
import ScrollMagic from "scrollmagic";

export default {
  name: "scroll",
  props: {
      list: {
          type: Array,
          default: () => {
              return []
          }
      },
      loadingImgUrl: {
          type: String,
          default: 'https://static.yladm.com/Transformers/Starscream/images/smallvideo/loading_spinner.gif'
      },
  },
  data() {
    return {
      controller: null,
      scene: null,
      pageNum: 1,
      isFeedList: true,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
      isLoadMore() {
          return getUrlParams('fd') == 1 || getUrlParams('mlist') == 1
      }
  },
  methods: {
    init() {
        this.$nextTick(() => {
            if(getUrlParams('fd') == 1 || getUrlParams('mlist') == 1) {
                this.scrollMagic();
            }
        })
    },
    scrollMagic() {
        this.controller = new ScrollMagic.Controller();
        this.scene = new ScrollMagic.Scene({
            triggerElement: "#loader",
            triggerHook: "onEnter",
            duration: 80, // 场景应该持续100px的滚动距离
            offset: 10, // 滚动50px后启动此场景
            reverse: true
        })
        .addTo(this.controller)
        .on("enter", e => {
            if(e.progress != 0) {
                setTimeout(() => {
                    this.getListData();
                }, 100, 9);
            }
        });
        
    },
    getListData() {
        this.$emit('scrollerFn', this.scene);
    },
    getParams(params) {
        return getUrlParams(params) || '';
    }
  }
};
</script>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}

.loading-more {
  width: conver(40);
  height: conver(40);
  margin: 0 auto;
  padding: conver(10) 0;
  img {
    width: conver(40);
    height: conver(40);
    display: block;
  }
    // loading加载效果
    .loading-circle{
        border: 3px solid rgba(245, 245, 245, 0.2);
        border-top-color: #fc2f70;
        border-radius: 50%;
        width: 1.5em;
        height: 1.5em;
        margin-top: conver(15);
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
}
.no-data{
    display: none;
    text-align: center;
    height: conver(50);
    line-height: conver(50);
    color: #999999;
    font-size: conver(14);
    background: #f9f9f9;
}
</style>
