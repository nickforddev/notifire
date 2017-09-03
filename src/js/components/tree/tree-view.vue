<template>
  <div class="tree-view" :style="[tree_styles]">
    <h3>Files</h3>

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

    <div
      class="divider vertical"
      @mousedown.prevent="dragStart"
    />
  </div>
</template>

<!-- /////////////////////////////////////////////////////////////////////// -->

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'tree-view',
  data() {
    return {
      mousedown: false
    }
  },
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
    dragging(e) {
      this.$store.dispatch('set_sidebar_width', e.clientX + 5)
    },
    dragStart(e) {
      document.body.addEventListener('mousemove', this.dragging)
      document.body.addEventListener('mouseup', this.dragStop)
    },
    dragStop() {
      document.body.removeEventListener('mousemove', this.dragging)
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

.divider {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 10px;
  z-index: 9;

  &:hover {
    cursor: col-resize;
  }
}
</style>
