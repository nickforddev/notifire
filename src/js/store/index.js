import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar_width: 300
  },
  getters: {
    sidebar_width: state => {
      return state.sidebar_width
    }
  },
  mutations: {
    SET_SIDEBAR_WIDTH(state, value) {
      state.sidebar_width = value
    }
  },
  actions: {
    set_sidebar_width({ commit }, value) {
      commit('SET_SIDEBAR_WIDTH', value)
    }
  }
})
