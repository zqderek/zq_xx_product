import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    signed: false,
    userInfo: {},
    alarmMsgCount: 0
};

const mutations = { };

const actions = { };

const getters = {
    getUserInfo(store) {
        return store.userInfo
    }
};



export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    // modules: {
    // }
});