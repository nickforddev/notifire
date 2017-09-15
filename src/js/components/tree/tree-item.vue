<template>
  <component
    :data="data"
    :level="level"
    :is="vc_name">
    <slot />
  </component>
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
    vc_name() {
      return this.data.type === 'file'
        ? 'tree-item-file'
        : 'tree-item-folder'
    }
  }
}
</script>
