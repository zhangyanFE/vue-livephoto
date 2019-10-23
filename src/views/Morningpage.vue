<template>
  <div class="morning-wrapper">
    <!-- <div>{{ new Date() | moment('YYYY-MM-DD') }}</div> -->
    <!-- <div>{{ new Date() | moment("calendar")}}</div> -->
    <header-top :headerTopObj="headerTopObj" :title="title" />
    <morning-list :list="morningList" :logId="logId" />
    <!-- <div class="howtu-logo" v-if="morningList.length"></div> -->
  </div>
</template>
<script>
import API from "@/http/api";
import { getUrlParams, sendSpm } from "@/lib/util";
import HeaderTop from "@/components/HeaderTop";
import MorningList from "@/components/MorningList";

export default {
  name: 'morningpage',
  components: {
    HeaderTop,
    MorningList
  },
  data() {
    return {
      headerTopObj: {

      },
      morningList: [],
      day: '',
      location: '',
      curDate: '',
      logId: 0,
      title: '',
      pkgName: '',
      appKey: '',
      time: ''
    }
  },
  deactivated() {
      this.backTop();
  },
  activated() {
      this.init();
  },
  methods: {
    init() {
      this.time = new Date() * 1;
      this.curDate = this.$moment(new Date()).format('YYYY-MM-DD');
      this.day = getUrlParams('day').indexOf('list') > 0 ? getUrlParams('day').replace(/list/g, '') : getUrlParams('day') || this.curDate;
      this.edition = getUrlParams('edition').indexOf('list') > 0 ? getUrlParams('edition').replace(/list/g, '') : getUrlParams('edition') || '';
      this.accessKey = getUrlParams('access_key').indexOf('list') > 0 ? getUrlParams('access_key').replace(/list/g, '') : getUrlParams('access_key') || 'yluyh22n5kdq';
      this.location = getUrlParams('location').indexOf('list') > 0 ? getUrlParams('location').replace(/list/g, '') : getUrlParams('location') || '';
      this.appKey = getUrlParams('appkey').indexOf('list') > 0 ? getUrlParams('appkey').replace(/list/g, '') : getUrlParams('appkey') || '';
      this.pkgName = getUrlParams('pkg_name').indexOf('list') > 0 ? getUrlParams('pkg_name').replace(/list/g, '') : getUrlParams('pkg_name') || '';
      this.getMorningList();
      this.getHomeWeather();
      this.backTop();
    },
    backTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
    // async jpushApi() {
    //   try {
    //     const params = {
    //       app_key: this.appKey,
    //       pkg_name: this.pkgName,
    //       content: {
    //         type: 'morning_expose',
    //         itime: this.time,
    //         block: '编辑',
    //         duration: ''
    //       }
    //     }
    //     const result = await API.jpushApi(params);
    //     console.log(result)
    //   } catch (error) {
        
    //   }
    // },
    async getMorningList() {
      try {
          const params = {
              access_key: this.accessKey,
              day: this.day,
              edition: this.edition,
          }
          const { data, retcode, logid } = await API.morningListApi(params);
          if(retcode == 200 && data) {
            // 上报页面有效加载时间点(请求成功)
            sendSpm({
              spmID: "10002",
              type: 1
            });
            this.morningList = data;
            this.logId = logid;
          } else {
            console.log('失败')
          }
      } catch (error) {
          console.log(error);
          // 上报页面有效加载时间点(请求失败)
          sendSpm({
            spmID: "10002",
            type: 0,
            data: {
              error
            }
          });
      }
    },
    async getHomeWeather() {
      try {
        const params = {
          // this.accessKey
            access_key: 'ylx7wyo7pd14',
            day: this.day,
            location: this.location
        }
         const { data, hello, retcode } = await API.homeWeatherApi(params);
         if(retcode == 200 && data && data.weather && data.huangli) {
           this.headerTopObj = data;
           this.title = hello;
         }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$howtuLogo: "//static.yladm.com/Transformers/Brawn/images/jpush/howtu-logo.png";

$rem: 75;
@function conver($n) {
  @return $n / $rem + unquote("rem");
}

.morning-wrapper{
  background: #ffffff;
  .howtu-logo{
    width: conver(210);
    height: conver(62);
    background: url($howtuLogo) no-repeat;
    background-size: conver(210) auto;
    margin: conver(40) auto;
  }
}

</style>
