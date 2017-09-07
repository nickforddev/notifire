<template>
  <main>
    <tree-view />
    <div
      class="divider vertical"
      :style="[divider_styles]"
      @mousedown.prevent="dragStart"
    />
    <content-view />
  </main>
</template>

<!-- /////////////////////////////////////////////////////////////////////// -->

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  computed: {
    divider_styles() {
      return {
        left: `${this.sidebar_width - 7}px`
      }
    },
    ...mapGetters([
      'sidebar_width'
    ])
  },
  methods: {
    dragging(e) {
      this.$store.dispatch('set_sidebar_width', e.clientX + 5)
    },
    dragStart(e) {
      document.body.addEventListener('mousemove', this.dragging)
      document.body.addEventListener('mouseup', this.dragStop)
    },
    dragStop() {
      document.body.removeEventListener('mousemove', this.dragging)
    }
  }
}
</script>

<!-- /////////////////////////////////////////////////////////////////////// -->

<style scoped lang="scss">
@import '~%/modules/mixins';

main {
  @include clear;
}

.divider {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 14px;
  z-index: 9;
  opacity: 0;

  &:hover {
    cursor: col-resize;
  }
}
</style>
