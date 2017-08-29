import Vue from 'vue'
import App from './app'
import router from './router'
import store from '@/store'
import VueShortkey from 'vue-shortkey'
import Loading from '@/components/loading'
import TreeItem from '@/components/tree-item'
import TreeItemTemplate from '@/components/tree-item-template'

import '../scss/styles.scss'

const components = [
  Loading,
  TreeItem,
  TreeItemTemplate
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
