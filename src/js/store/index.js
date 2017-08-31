import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '@/config'
import { sleep } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar_width: 300,
    files: {},
    active_editor_group: false,
    active_files: [],
    renderer_html: ''
  },
  getters: {
    sidebar_width: state => {
      return state.sidebar_width
    },
    files: state => {
      return state.files
    },
    active_editor_group: state => {
      return state.active_editor_group
    },
    active_files: state => {
      return state.active_files
    },
    renderer_html: state => {
      return state.renderer_html
    }
  },
  mutations: {
    SET_SIDEBAR_WIDTH(state, value) {
      state.sidebar_width = value
    },
    SET_FILES(state, files) {
      state.files = files
    },
    SET_RENDERER_HTML(state, html) {
      state.renderer_html = html
    },
    SET_EDITOR_GROUP(state, path) {
      state.active_editor_group = path
    },
    CLEAR_EDITOR_GROUP(state, options) {
      state.active_editor_group = false
      state.active_files = []
    },
    ADD_EDITOR(state, path) {
      if (!(path in state.active_files)) {
        state.active_files.push(path)
      }
    }
  },
  actions: {
    set_sidebar_width({ commit }, value) {
      commit('SET_SIDEBAR_WIDTH', value)
    },
    set_renderer_html({ commit }, html) {
      commit('SET_RENDERER_HTML', html)
    },
    clear_editor_group({ commit }) {
      commit('CLEAR_EDITOR_GROUP')
    },
    add_editor({ commit }, file) {
      commit('ADD_EDITOR', file)
    },
    async get_files({ commit }) {
      try {
        const response = await axios.get(config.api)
        const files = response.data[0].data
        commit('SET_FILES', files)
      } catch (error) {
        console.warn(error)
      }
    },
    async set_editor_group({ commit, dispatch }, options) {
      dispatch('clear_editor_group')
      commit('SET_EDITOR_GROUP', options.path)
      if (options.type === 'email') {
        await sleep(1)
        const files = [
          `${options.path}/index.html`,
          `${options.path}/style.scss`,
          `${options.path}/subject.html`
        ]
        for (let file of files) {
          dispatch('add_editor', file)
        }
      }
    }
  }
})
