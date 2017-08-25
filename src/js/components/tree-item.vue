<template>
  <div class="tree-item-container">
    <div :class="['tree-item', className]" @click="clickAction">
      {{ file.name }}
      <button v-if="file.type ==='folder'">{{ button_label }}</button>
    </div>
    <div v-if="open">
      <tree-item v-for="(model, index) in file.data" :key="index" :data="model" @loadFile="emitLoad"></tree-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-item',
  props: {
    data: Object
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
    button_label() {
      return this.open
        ? '-'
        : '+'
    },
    className() {
      return this.file.type
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
.tree-item-container {
  padding-left: 20px;

  &:hover {
    cursor: pointer;
  }
}
.tree-item {
  padding: 6px;
  margin: 0;
  font-size: 12px;

  &:hover {
    background: #efefef;
  }
}
</style>
