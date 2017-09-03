<template>
  <div>
    <tree-item
      v-for="file in files.globals"
      :key="file.name"
      :data="file"
      :level="0"
    />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'globals',
  computed: {
    ...mapGetters([
      'files'
    ])
  }
  // methods: {
    // handleEvent(event, ...args) {
    //   this.$emit('event', event, ...args)
    // }
  // }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>