import Vue from 'vue'
import VeeValidate from 'vee-validate'

import App from './app'
import router from './router'
import store from '@/store'
import { filters } from '@/modules/filters'
// import VueShortkey from 'vue-shortkey'

import Loading from '@/components/loading'
import Logo from '@/components/logo'
import Modal from '@/components/modal'
import Validation from '@/components/validation'

import TreeView from '@/components/tree/tree-view'
import TreeGroup from '@/components/tree/tree-group'
import TreeItem from '@/components/tree/tree-item'
import TreeItemFile from '@/components/tree/tree-item-file'
import TreeItemFolder from '@/components/tree/tree-item-folder'
import TreeItemPartial from '@/components/tree/tree-item-partial'
import TreeItemTemplate from '@/components/tree/tree-item-template'

import ContentView from '@/components/content-view'
import Renderer from '@/components/renderer'

import iPhone from '@/components/devices/iphone'
import iPhoneLockScreen from '@/components/devices/iphone/lock-screen'

import Android from '@/components/devices/android'
import AndroidLockScreen from '@/components/devices/android/lock-screen'

import '../scss/styles.scss'

const components = [
  Loading,
  Logo,
  Modal,
  Validation,
  TreeView,
  TreeGroup,
  TreeItem,
  TreeItemFile,
  TreeItemFolder,
  TreeItemPartial,
  TreeItemTemplate,
  ContentView,
  Renderer,
  iPhone,
  iPhoneLockScreen,
  Android,
  AndroidLockScreen
]

const install = (Vue) => {
  // inject filters
  for (let key in filters) {
    Vue.filter(key, filters[key])
  }
  // inject components
  components.map(component => {
    Vue.component(component.name, component)
  })

  Vue.use(VeeValidate)
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
