import API from "@/http/api";
import { getUrlParams, decrypt } from "@/lib/util";

// initial state
const state = {
  puzzleState: false
};

let pageNum = 0; // 分页页数

// getters
const getters = {};

// actions
const actions = {
  changePuzzleState({ commit }) {
    commit("changePuzzleState", changePuzzleState);
  }
};

// mutations
const mutations = {
  changePuzzleState(state, puzzleState) {
    state.puzzleState = puzzleState;
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
