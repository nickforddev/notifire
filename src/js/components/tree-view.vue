<template>
  <div class="tree-view" :style="[tree_styles]">
    <h3>Files</h3>
    <tree-item
      v-for="file in files"
      :key="file.name"
      :data="file"
      :level="0"
      @event="handleEvent"
    />
    <div
      class="divider vertical"
      @mousedown.prevent="dragStart"
    />
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import app from '@/main'
import { mapGetters } from 'vuex'

console.log(app)

export default {
  name: 'tree-view',
  data() {
    return {
      mousedown: false,
      data: {}
    }
  },
  mounted() {
    this.getFiles()
  },
  computed: {
    files() {
      return this.processFolder(this.data)
    },
    tree_styles() {
      return {
        width: this.sidebar_width + 'px'
      }
    },
    ...mapGetters([
      'sidebar_width'
    ])
  },
  methods: {
    getFiles() {
      return axios.get(config.api)
        .then(response => {
          this.data = response.data.data
        })
        .catch(err => {
          console.warn(err)
        })
    },
    processFolder(object) {
      let output = []
      for (let key in object) {
        let file = {}
        file.name = key
        if (typeof object[key] === 'string') {
          file.type = 'file'
          file.data = object[key]
        } else {
          file.type = 'folder'
          file.data = this.processFolder(object[key])
        }
        output.push(file)
      }
      return output
    },
    loadFile(file_path) {
      this.$emit('loadFile', file_path)
    },
    handleEvent(event, ...args) {
      this[event](...args)
    },
    refresh() {
      this.getFiles()
    },
    remove(path) {
      const accepted = confirm(`Are you sure you want to delete "${path}"?`)
      if (accepted) {
        axios.delete(`${config.api}/${path}`)
          .then(() => {
            this.getFiles()
          })
      }
    },
    dragging(e) {
      app.$store.dispatch('set_sidebar_width', e.clientX + 5)
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
  // background: $color-divider-background;
  z-index: 9;

  &:hover {
    cursor: col-resize;
  }
}
</style>
