<template>
  <div class="tree-view">
    <slot>
      No files
    </slot>
  </div>
</template>

<script>
// import _ from 'lodash'
// import axios from 'axios'

export default {
  name: 'tree-view',
  data () {
    return {
      data: {}
    }
  }
}
</script>

<style scoped lang="scss">

</style>
