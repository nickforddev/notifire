import Vue from 'vue'
import App from './app'
import router from './router'
import store from '@/store'
import VueShortkey from 'vue-shortkey'

import Loading from '@/components/loading'

import TreeView from '@/components/tree/tree-view'
import TreeGroup from '@/components/tree/tree-group'
import TreeItem from '@/components/tree/tree-item'
import TreeItemFile from '@/components/tree/tree-item-file'
import TreeItemFolder from '@/components/tree/tree-item-folder'
import TreeItemTemplate from '@/components/tree/tree-item-template'

import ContentView from '@/components/content-view'
import Renderer from '@/components/renderer'

import Phone from '@/components/phone'

import '../scss/styles.scss'

const components = [
  Loading,
  TreeView,
  TreeGroup,
  TreeItem,
  TreeItemFile,
  TreeItemFolder,
  TreeItemTemplate,
  ContentView,
  Renderer,
  Phone
]

const install = (Vue) => {
  // inject components
  components.map(component => {
    Vue.component(component.name, component)
  })

  Vue.use(VueShortkey)
}

install(Vue)

const app = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

export default app
