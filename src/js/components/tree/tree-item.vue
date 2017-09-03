<template>
  <component
    :data="data"
    :level="level"
    :is="vc_name" />
</template>

<script>
export default {
  name: 'tree-item',
  props: {
    data: [Object, Array],
    level: Number,
    template: String,
    type: String
  },
  computed: {
    // handleEvent(event, ...args) {
    //   this.$emit('event', event, ...args)
    // },
    vc_name() {
      return this.data.type === 'file'
        ? 'tree-item-file'
        : 'tree-item-folder'
    }
  }
}
</script>
