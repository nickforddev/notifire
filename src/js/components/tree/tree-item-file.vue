<template>
  <div :class="['tree-item-container', 'file', is_active]">
    <div
      class="tree-item"
      :style="[styles]"
      @click="load">

      <div class="leader icon">
        <img :src="icon_src" :alt="file.type" />
      </div>

      <div class="name">
        {{ file.name }}
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'tree-item-file',
  props: {
    data: [Object, Array],
    level: Number,
    template: String,
    type: String
  },
  computed: {
    file() {
      return this.data
    },
    is_active() {
      if (this.active_files.includes(this.file.path)) {
        return 'active'
      }
    },
    styles() {
      return {
        'paddingLeft': (this.level + 1) * 10 + 'px'
      }
    },
    icon_src() {
      const type = this.file.ext
      return `/static/svg/${type}.svg`
    },
    ...mapGetters([
      'active_files'
    ])
  },
  methods: {
    load() {
      if (!this.active_files.includes(this.file.path)) {
        this.$store.dispatch('add_editor', this.file.path)
      } else {
        window.dispatchEvent(new CustomEvent('focus-editor', {
          detail: this.file.path
        }))
      }
    }
  }
}
</script>

<style scoped lang="scss">
.leader {
  margin-left: 14px;
}
</style>
