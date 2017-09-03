<template>
  <div class="tree-group">
    <h3>{{ type }}
      <button v-if="add" @click="addFile">+</button>
    </h3>

    <component :is="type" />

    <!-- <tree-item
      v-for="file in files"
      :key="file.name"
      :data="file"
      :level="0"
      @event="handleEvent"
    /> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Templates from './types/templates'
import Partials from './types/partials'
import Globals from './types/globals'
import Styles from './types/styles'

export default {
  name: 'tree-group',
  props: {
    // data: Array,
    type: String,
    add: Boolean
  },
  computed: {
    files() {
      return this.data
    }
  },
  methods: {
    // refresh() {
    //   this.$store.dispatch('get_files')
    // },
    handleEvent(event, ...args) {
      this[event](...args)
    },
    addFile() {
      console.log(this.type)
    },
    loadFile(type, file_path) {
      this.$store.dispatch('add_editor', type, file_path)
    },
    async removeFile(path) {
      const accepted = confirm(`Are you sure you want to delete "${path}"?`)
      if (accepted) {
        await new Request(path, {
          method: 'delete'
        })
        this.getFiles()
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