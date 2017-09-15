<template>
  <div :class="['tree-item-container folder', is_active]">
    <div
      :class="['tree-item', class_name]"
      @click="toggle"
      :style="styles">
      <div class="leader">
        <div class="caret" />
      </div>
      <div class="leader icon">
        <img :src="icon_src" :alt="file.type" />
      </div>

      <span class="name">{{ file.name }}</span>

      <slot></slot>
    </div>

    <div v-if="open">
      <tree-item
        v-for="(model, index) in children"
        :key="index"
        :data="model"
        :level="next_level" />
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'tree-item-folder',
  props: {
    data: [Object, Array],
    level: Number,
    template: String,
    type: String
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    file() {
      return this.data
    },
    children() {
      return this.file.data
    },
    next_level() {
      return this.level + 1
    },
    class_name() {
      return this.open
          ? 'open'
          : 'closed'
    },
    icon_src() {
      return this.open
        ? '/static/svg/folder-open.svg'
        : '/static/svg/folder.svg'
    },
    is_active() {
      if (this.active_editor_group === this.file.path) {
        return 'active'
      }
    },
    styles() {
      return {
        'paddingLeft': this.next_level * 10 + 'px'
      }
    },
    ...mapGetters([
      'active_editor_group',
      'active_editor_group_type'
    ])
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    clickAction() {
      this.file.type === 'folder'
        ? this.toggle()
        : this.loadFile()
    }
  }
}
</script>
