<template>
  <div>
    <div v-for="(file, index) in files.styles" :key="index" class="tree-item-children">
      <tree-item
        :key="file.name"
        :data="file"
        :level="0"
      />
      <div class="actions">
        <button @click="remove(file)">Delete</button>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import { Request } from '@/utils'

export default {
  name: 'styles',
  computed: {
    ...mapGetters([
      'files'
    ])
  },
  methods: {
    async remove(file) {
      console.log('remove', file.path)
      const conf = confirm(`Are you sure you want to delete ${file.name}?`)
      if (conf) {
        await Request(file.path, {
          method: 'delete'
        })
        this.$store.dispatch('get_files')
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.tree-item-children {
  position: relative;

  .actions {
    position: absolute;
    top: 3px;
    right: 4px;
  }
}
</style>