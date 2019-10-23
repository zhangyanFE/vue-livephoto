import API from "@/http/api";
import { getUrlParams, decrypt } from "@/lib/util";

// initial state
const state = {
  prePlaySrcData: {} //预缓存视频地址
};
let pageNum = 0; // 分页页数
// getters
const getters = {};

// actions
const actions = {
  // 获取小视频列表数据
  async get_listItem_data({ commit, state }) {
    this.accessKey = getUrlParams("access_key"); //渠道key
    this.id = getUrlParams("id"); //地址栏视频id
    let params = {
      id: this.id,
      access_key: this.accessKey,
      size: 3
    };

    const res = await API.getUgcFeedApi(params);
    return res;
  },

  async get_list_data({ commit, state }) {
    pageNum += 1;
    this.accessKey = getUrlParams("access_key"); //渠道key
    this.id = getUrlParams("id"); //地址栏视频id
    let params = {
      // id: this.id,
      access_key: this.accessKey,
      page: pageNum,
      size: 3,
      day: getUrlParams('day')
    };

    const res = await API.getList(params);
    return res;
  },

  //获取小视频预加载地址
  async get_prePlay_data({ commit, state }, videoId) {
    let res;
    this.accessKey = getUrlParams("access_key"); //渠道key
    let params = {
      access_key: this.accessKey,
      id: videoId
    };
    const { data } = await API.prePlayVideoApi(params);
    var resData = decrypt(data);
    res = JSON.parse(resData).bitrates[0].uri;
    commit("set_prePlaySrcData_data", { res, videoId });
    // return res
  },
  //获取视频地址
  async get_playVideo_data({ commit, state }, videoId) {
    let res;
    this.accessKey = getUrlParams("access_key"); //渠道key
    let params = {
      access_key: this.accessKey,
      id: videoId
    };
    const { bitrates } = await API.playVideoApi(params);
    if (bitrates[0]) {
      res = bitrates[0].uri;
      return res;
    }
  },
  set_animateDoing_data({ commit }) {
    commit("set_animateDoing_data");
  }
};

// mutations
const mutations = {
  //存储小视频列表数据
  set_listItem_data(state, val) {
    state.ugcListItem = val;
  },
  //存储小视频列表数据
  set_animateDoing_data(state, val) {
    state.animateDoing = val;
  },
  //存储小视频播放地址缓存数据
  set_prePlaySrcData_data(state, obj) {
    state.prePlaySrcData[obj.videoId] = obj.res;
    state.prePlaySrcData = JSON.parse(JSON.stringify(state.prePlaySrcData));
  }
};

// 命名空间：默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样
// 使得多个模块能够对同一 mutation 或 action 作出响应
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
