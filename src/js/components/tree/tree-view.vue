<template>
  <div class="tree-view" :style="[tree_styles]">
    <h3>Files <button @click="build">Build</button></h3>

    <tree-group
      type="globals"
      :add="false"
    />

    <tree-group
      type="styles"
      :add="true"
      :data="files.styles"
    />

    <tree-group
      type="templates"
      :add="true"
      :data="files.templates"
    />

    <tree-group
      type="partials"
      :add="true"
      :data="files.partials"
    />

  </div>
</template>

<!-- /////////////////////////////////////////////////////////////////////// -->

<script>
import { mapGetters } from 'vuex'
import { Request } from '@/utils'

export default {
  name: 'tree-view',
  mounted() {
    this.getFiles()
  },
  computed: {
    tree_styles() {
      return {
        width: this.sidebar_width + 'px'
      }
    },
    ...mapGetters([
      'files',
      'sidebar_width'
    ])
  },
  methods: {
    getFiles() {
      this.$store.dispatch('get_files')
    },
    async build() {
      const { data } = await Request('build', {
        method: 'post'
      })
      alert(data)
    }
  }
}
</script>

<!-- /////////////////////////////////////////////////////////////////////// -->

<style scoped lang="scss">
@import '~%/modules/colors';

.tree-view {
  position: relative;
  text-align: left;
  height: 100vh;
  width: 300px;
  float: left;
  background: $color-sidebar-background;
  color: $color-sidebar-color;
  white-space: nowrap;
  overflow-y: scroll;
  overflow-x: hidden;

  h3 {
    padding-left: 15px;
  }
}
</style>
