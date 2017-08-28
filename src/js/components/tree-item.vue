<template>
  <div :class="['tree-item-container', class_name]">
    <div :class="['tree-item', file_class_name]" @click="clickAction" :style="[styles]">
      <div v-if="file.type === 'folder'" class="caret"></div>
      <div v-else class="icon">
        <img :src="icon_src" alt="css">
      </div>
      {{ file.name }}
    </div>
    <div v-if="open">
      <tree-item
        v-for="(model, index) in files"
        :key="index" :data="model"
        :level="next_level"
        @loadFile="emitLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-item',
  props: {
    data: Object,
    level: Number
  },
  data() {
    return {
      open: true
    }
  },
  computed: {
    next_level() {
      return this.level + 1
    },
    file() {
      return this.data
    },
    files() {
      return this.file.type === 'folder'
        ? this.file.data
        : []
    },
    button_label() {
      return this.open
        ? '-'
        : '+'
    },
    class_name() {
      return this.file.type === 'folder'
        ? this.open
          ? 'folder open'
          : 'folder closed'
        : 'file'
    },
    file_class_name() {
      return this.file.type
    },
    styles() {
      return {
        'paddingLeft': this.next_level * 15 + 'px'
      }
    },
    icon_src() {
      const filename_split = this.file.name.split('.')
      const type = filename_split[filename_split.length - 1]
      return `/static/svg/${type}.svg`
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    clickAction() {
      this.file.type === 'folder'
        ? this.toggle()
        : this.loadFile()
    },
    loadFile() {
      const file_path = this.file.data
      this.$emit('loadFile', file_path)
    },
    emitLoad(file_path) {
      this.$emit('loadFile', file_path)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~%/modules/colors';

.tree-item-container {
  // padding-left: 20px;

  &:hover {
    cursor: pointer;
  }
}
.caret {
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 5px 5px;
  border-color: transparent transparent #ffffff transparent;

  .folder.closed & {
    // width: 0;
    // height: 0;
    // border-style: solid;
    border-width: 3.5px 0 3.5px 4px;
    border-color: transparent transparent transparent #ffffff;
  }
}
.tree-item {
  padding: 6px;
  margin: 0;
  font-size: 12px;

  &:hover {
    background: $color-sidebar-hover;
  }
}
.icon {
  // height: 25px;
  width: 14px;
  display: inline-block;
}
</style>
