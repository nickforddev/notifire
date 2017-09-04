<template>
  <div class="tree-group">
    <h3>{{ type }}
      <button v-if="add" @click="addItem">+</button>
    </h3>

    <component :is="type" />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Templates from './types/templates'
import Partials from './types/partials'
import Globals from './types/globals'
import Styles from './types/styles'

import { Request } from '@/utils'

export default {
  name: 'tree-group',
  props: {
    type: String,
    add: Boolean
  },
  computed: {
    files() {
      return this.data
    }
  },
  methods: {
    addItem() {
      this[`add_${this.type}`]()
    },
    async add_templates() {
      this.create_item('template')
    },
    async add_partials() {
      this.create_item('partial')
    },
    async add_styles() {
      this.create_item('stylesheet', 'scss')
    },
    async create_item(type = '', path = `${type}s`) {
      const name = prompt(`Please enter a name for your new ${type}`)
      if (name) {
        await new Request(path, {
          method: 'post',
          data: {
            name
          }
        })
        this.$store.dispatch('get_files')
      }
    }
  },
  components: {
    Templates,
    Partials,
    Globals,
    Styles
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  h3 {
    padding-left: 13px;
    text-transform: capitalize;
  }
</style>