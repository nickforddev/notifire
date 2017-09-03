<template>
  <div>
    <tree-item-template
      v-for="file in files.templates"
      :key="file.name"
      :data="file"
      :level="0"
      :open="isOpen(file.name)"
      @event="handleEvent"
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
    handleEvent(event, ...args) {
      this.$emit('event', event, ...args)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>