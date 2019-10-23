<template>
    <scroll @scrollerFn="getList" :list="list">
        <div class="list-wrapper">
            <common-title :title="$route.query.title" @goBack="handleGoBack" />
            <list :title="$route.query.title" :list="list" :logId="logId" />
        </div>
    </scroll>
</template>
<script>
import API from "@/http/api";
import { getUrlParams, sendSpm } from "@/lib/util";
import Scroll from "@/components/Scroll";
import CommonTitle from "@/components/CommonTitle";
import List from "@/components/RecommendList"

export default {
    name: 'listPage',
    components: {
        CommonTitle,
        List,
        Scroll
    },
    data() {
        return {
            list: [],
            page: 1,
            logId: 0,
            curDate: '',
            day: '',
            errorFlag: false
        }
    },
    destroyed() {
        this.page = 1;
        this.backTop();
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.curDate = this.$moment(new Date()).format('YYYY-MM-DD');
            this.day = getUrlParams('day').indexOf('list') > 0 ? getUrlParams('day').replace(/list/g, '') :  getUrlParams('day') || this.curDate;
            this.edition = getUrlParams('edition').indexOf('list') > 0 ? getUrlParams('edition').replace(/list/g, '') : getUrlParams('edition') || '';
            this.accessKey = getUrlParams('access_key').indexOf('list') > 0 ? getUrlParams('access_key').replace(/list/g, '') : getUrlParams('access_key') || 'yluyh22n5kdq';
            this.blockId = this.$route.query.blockid;
        },
        backTop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        handleGoBack() {
            this.$router.go(-1);
        },
        async getList(Scene) {
            try {
                const params = {
                    access_key: this.accessKey,
                    block_id: this.blockId,
                    page: this.page++,
                    size: 10,
                    day: this.day,
                    edition: this.edition
                }
                const { data, retcode, logid } = await API.recommendListApi(params);
                if(retcode == 200 && data && data.length) {
                    // 上报页面有效加载时间点(请求成功)
                    sendSpm({
                        spmID: "10002",
                        type: 1
                    });
                    this.list = this.list.concat(data);
                    this.logId = logid;
                    Scene.update();
                } else {
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('J_noData').innerHTML = '已经到底了~';
                    document.getElementById('J_noData').style.display = 'block';
                    Scene.destroy(true);
                }
            } catch (error) {
                this.errorFlag = true;
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
        }
    }
}
</script>
<style lang="scss">
.page-error{
    text-align: center;
    padding-top: 2rem;
    color: #999;
    font-size: 0.4rem;
}
</style>

