<template>
  <div :class="['tree-item-container', class_name]">
    <div :class="['tree-item', file_class_name]" @click.self="toggle">
      <div class="leader">
        <div v-if="file.type === 'folder'" class="caret"></div>
      </div>
      <div class="leader icon">
        <img :src="icon_src" alt="css">
      </div>
      <span class="name">
        {{ file.name }}
      </span>
      <div class="actions">
        <button @click="remove">-</button>
      </div>
    </div>

    <div v-if="open">
      <div v-for="(child, index) in children" :key="index" class="tree-item-children">
        <tree-item
          :data="child"
          :level="next_level"
          :template="file.name" />
        <div v-if="child.type === 'folder'" class="actions">
          <button @click="edit(child)">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'tree-item-partial',
  props: {
    data: Object,
    level: Number,
    open: Boolean
  },
  data() {
    return {
      icon_src: '/static/svg/folder.svg'
    }
  },
  computed: {
    next_level() {
      return this.level + 1
    },
    file() {
      return this.data
    },
    children() {
      return this.file.data
    },
    class_name() {
      return this.open
        ? 'folder open'
        : 'folder closed'
    },
    file_class_name() {
      return this.file.type
    },
    ...mapGetters([
      'active_editor_group'
    ])
  },
  methods: {
    toggle() {
      if (!this.open) {
        this.$parent.setOpenFolder(this.file.name)
      } else {
        this.$parent.clearOpenFolder()
      }
    },
    async remove() {
      const path = this.file.path
      const accepted = confirm(`Are you sure you want to delete "${path}"?`)
      if (accepted) {
        await this.$store.dispatch('remove_file', path)
        this.$store.dispatch('get_files')
      }
    },
    edit(file) {
      let conf = true
      if (this.active_editor_group) {
        conf = confirm('This will close the current group. Are you sure?')
      }
      if (conf) {
        this.$store.dispatch('set_editor_group', {
          type: file.name,
          path: file.path
        })
      }
    }
  }
}
</script>
