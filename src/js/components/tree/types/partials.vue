<template>
  <div>
    <tree-item-partial
      v-for="file in files.partials"
      :key="file.name"
      :data="file"
      :level="0"
      :open="isOpen(file.name)"
    />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'globals',
  data() {
    return {
      open_folder: ''
    }
  },
  computed: {
    ...mapGetters([
      'files'
    ])
  },
  methods: {
    isOpen(name) {
      return name === this.open_folder
    },
    setOpenFolder(name) {
      this.open_folder = name
    },
    clearOpenFolder() {
      this.open_folder = null
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>