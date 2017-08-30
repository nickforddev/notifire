import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '@/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar_width: 300,
    files: {},
    active_group: '',
    active_files: []
  },
  getters: {
    sidebar_width: state => {
      return state.sidebar_width
    },
    files: state => {
      return state.files
    }
  },
  mutations: {
    SET_SIDEBAR_WIDTH(state, value) {
      state.sidebar_width = value
    },
    SET_FILES(state, files) {
      state.files = files
    }
  },
  actions: {
    set_sidebar_width({ commit }, value) {
      commit('SET_SIDEBAR_WIDTH', value)
    },
    get_files({ commit }) {
      axios.get(config.api)
        .then(response => {
          const files = response.data[0].data
          commit('SET_FILES', files)
        })
        .catch(err => {
          console.warn(err)
        })
    }
  }
})
