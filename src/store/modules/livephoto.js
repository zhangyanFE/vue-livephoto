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

};

// mutations
const mutations = {
  //存储小视频列表数据
  set_listItem_data(state, val) {
    state.ugcListItem = val;
  },
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
