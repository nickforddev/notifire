import Vue from 'vue'
import Vuex from 'vuex'
import { sleep, Request } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebar_width: 300,
    globals: {},
    files: {},
    active_files: [],
    active_editor_group: false,
    active_editor_group_type: false,
    editor_width: '50%',
    editor_content: {},
    renderer_html: '',
    renderer_error: '',
    renderer_loading: false
  },
  getters: {
    sidebar_width: state => {
      return state.sidebar_width
    },
    globals: state => {
      return state.globals
    },
    files: state => {
      return state.files
    },
    active_files: state => {
      return state.active_files
    },
    active_editor_group: state => {
      return state.active_editor_group
    },
    active_editor_group_type: state => {
      return state.active_editor_group_type
    },
    renderer_html: state => {
      return state.renderer_html
    },
    renderer_error: state => {
      return state.renderer_error
    },
    renderer_loading: state => {
      return state.renderer_loading
    },
    editor_width: state => {
      return state.editor_width
    },
    editor_content: state => {
      return state.editor_content
    }
  },
  mutations: {
    SET_SIDEBAR_WIDTH(state, value) {
      state.sidebar_width = value
    },
    SET_GLOBALS(state, data) {
      state.globals = data
    },
    SET_FILES(state, files) {
      state.files = files
    },
    SET_RENDERER_HTML(state, html) {
      state.renderer_error = ''
      state.renderer_html = html
    },
    SET_RENDERER_ERROR(state, error) {
      state.renderer_error = error
    },
    SET_EDITOR_WIDTH(state, width) {
      state.editor_width = width
    },
    SET_EDITOR_GROUP(state, options) {
      state.active_editor_group = options.path
      state.active_editor_group_type = options.type
    },
    CLEAR_EDITOR_GROUP(state, options) {
      state.active_editor_group = false
      state.active_files = []
      state.renderer_html = ''
    },
    ADD_EDITOR(state, path) {
      if (!(path in state.active_files)) {
        state.active_files.push(path)
      }
    },
    RENDERER_LOADING(state, value) {
      state.renderer_loading = value
    },
    CLOSE_EDITOR(state, path) {
      // state.active_files = state.active_files.filter((file, index) => {
      //   return file !== path
      // })
      const index = state.active_files.indexOf(path)
      Vue.delete(state.active_files, index)
    },
    SET_EDITOR_CONTENT(state, data) {
      // state.editor_content[data.path] = data.content
      Vue.set(state.editor_content, data.path, data.content)
    },
    REMOVE_EDITOR_CONTENT(state, path) {
      delete state.editor_content[path]
    }
  },
  actions: {
    renderer_loading({ commit }, value) {
      commit('RENDERER_LOADING', value)
    },
    set_sidebar_width({ commit }, value) {
      commit('SET_SIDEBAR_WIDTH', value)
    },
    set_editor_width({ commit }, value) {
      commit('SET_EDITOR_WIDTH', value)
    },
    set_renderer_html({ commit }, html) {
      commit('SET_RENDERER_HTML', html)
    },
    set_renderer_error({ commit }, error) {
      commit('SET_RENDERER_ERROR', error)
    },
    clear_editor_group({ commit }) {
      commit('CLEAR_EDITOR_GROUP')
    },
    add_editor({ commit }, path) {
      commit('ADD_EDITOR', path)
    },
    close_editor({ commit }, path) {
      commit('CLOSE_EDITOR', path)
      commit('REMOVE_EDITOR_CONTENT', path)
    },
    remove_file({ commit }, path) {
      return new Request(path, {
        method: 'delete'
      })
    },
    async get_globals({ commit }) {
      try {
        const response = await new Request('globals/globals.json')
        const data = response.data
        commit('SET_GLOBALS', data)
      } catch (error) {
        console.warn(error)
      }
    },
    async get_files({ commit }) {
      try {
        const response = await new Request('data')
        const data = response.data
        commit('SET_FILES', data)
      } catch (error) {
        console.warn(error)
      }
    },
    async set_editor_group({ commit, dispatch }, options) {
      dispatch('renderer_loading', true)
      dispatch('clear_editor_group')
      commit('SET_EDITOR_GROUP', options)
      let parent_path = options.path.split('/')
      parent_path.splice(-1)
      parent_path = parent_path.join('/')
      let files
      if (options.type === 'email') {
        await sleep(1)
        files = [
          `${options.path}/index.html`,
          `${options.path}/style.scss`,
          `${options.path}/subject.html`
        ]
      } else if (options.type === 'push') {
        await sleep(1)
        files = [
          `${options.path}/index.html`,
          `${parent_path}/data.json`
        ]
      } else if (options.type === 'text') {
        await sleep(1)
        files = [
          `${options.path}/index.html`,
          `${parent_path}/data.json`
        ]
      }

      for (let file of files) {
        dispatch('add_editor', file)
      }
    },
    set_editor_content({ commit }, data) {
      commit('SET_EDITOR_CONTENT', data)
    }
  }
})
