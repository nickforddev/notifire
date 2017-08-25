<template>
  <div class="tree-view">
    <tree-item v-for="file in files" :key="file.name" :data="file" @loadFile="emitLoad" />
  </div>
</template>

<script>
export default {
  name: 'tree-view',
  props: {
    data: Object
  },
  computed: {
    files() {
      return this.processFolder(this.data)
    }
  },
  methods: {
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
    emitLoad(file_path) {
      this.$emit('loadFile', file_path)
    }
  }
}
</script>

<style scoped lang="scss">
  .tree-view {
    text-align: left;
    height: 100vh;
    width: 300px;
    float: left;
  }
</style>
