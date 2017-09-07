<template>
  <div :class="['tree-item-container', 'file', is_active]">
    <div
      class="tree-item"
      :style="[styles]"
      @click="load">

      <div class="leader icon">
        <img :src="icon_src" :alt="file.type" />
      </div>

      {{ file.name }}

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
      const filename_split = this.file.name.split('.')
      const type = filename_split[filename_split.length - 1]
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
@import '~%/modules/colors';

$color-sidebar-templates-folder: #424952;
$font-size: 10px;

.tree-item {
  padding: 4px;
  margin: 0;
  font-size: $font-size;
  text-overflow: ellipsis;
  overflow: hidden;
  user-select: none;

  &:hover {
    background: $color-sidebar-hover;
    cursor: pointer;
  }
}

.active > .tree-item {
  background: $color-sidebar-selected;
}
.leader {
  display: inline-block;
  width: 8px;
  margin-left: 14px;
  text-align: center;
  pointer-events: none;
}
.icon {
  position: relative;
  top: 3px;
  width: 14px;
}
.actions {
  display: inline-block;
  position: absolute;
  right: 5px;
}
</style>
