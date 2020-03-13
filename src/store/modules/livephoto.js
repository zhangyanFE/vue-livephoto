// initial state
const state = {
  i18n: {
    // 国际化
    locales: "zh-CN" // ["zh-CN", "en-US"]
  },
  puzzleState: false,
  pictureLayoutStyle: "column-2", // 默认照片列表展示两列
  qrcodeState: false // 是否显示会场二维码
};

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
  },
  changePictureLayout(state, pictureLayoutStyle) {
    state.pictureLayoutStyle = pictureLayoutStyle;
  },
  changeQrcodeState(state, qrcodeState) {
    state.qrcodeState = qrcodeState;
  },
  changeLanguageState(state, locales) {
    console.log(locales);
    state.i18n.locales = locales;
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
