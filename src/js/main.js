// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import router from './router'
import VueShortkey from 'vue-shortkey'
import TreeItem from '@/components/tree-item'

const components = [
  TreeItem
]

const install = (Vue) => {
  // inject components
  components.map(component => {
    Vue.component(component.name, component)
  })

  Vue.use(VueShortkey)
}

install(Vue)

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
