import Vue from 'vue';
import Vuex from 'vuex';
import themeplay from './modules/themeplay';

Vue.use(Vuex);

export default new Vuex.Store({
    // Module：使用单一状态树，应用的所有状态会集中到一个比较大的对象
    // 当应用变得非常复杂时，store 对象会变得臃肿
    // Vuex 允许将 store 分割成模块（module）
    // 每个模块有自己的 state、mutation、action、getter
    // 假如我要获取city：store.state.city  -> 获取city的状态
    modules: {
        themeplay,
    },
});