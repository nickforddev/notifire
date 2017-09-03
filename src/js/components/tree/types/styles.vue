<template>
  <div>
    <tree-item
      v-for="file in files.styles"
      :key="file.name"
      :data="file"
      :level="0"
      @event="handleEvent"
    />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'styles',
  computed: {
    ...mapGetters([
      'files'
    ])
  },
  methods: {
    handleEvent() {

    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>