<template>
  <div
    class="editor-content-container"
    :style="[editor_content_styles]">
    <editor-group :style="[editor_group_styles]" />
    <div class="divider vertical" @mousedown.self.prevent="dragStart" :style="[divider_styles]" />
    <renderer :style="[renderer_styles]" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import editorGroup from '@/components/editor-group'
import renderer from '@/components/renderer'

export default {
  name: 'content-view',
  computed: {
    editor_content_styles() {
      return {
        width: `calc(100% - ${this.sidebar_width}px)`
      }
    },
    editor_group_styles() {
      return {
        width: `${this.editor_width}%`
      }
    },
    renderer_styles() {
      return {
        width: `${100 - this.editor_width}%`
      }
    },
    divider_styles() {
      return {
        left: `${this.editor_width}%`
      }
    },
    ...mapGetters([
      'sidebar_width',
      'editor_width'
    ])
  },
  methods: {
    dragging(e) {
      const percentage = (e.clientX - this.sidebar_width) / this.$el.offsetWidth * 100
      this.$store.dispatch('set_editor_width', percentage)
    },
    dragStart(e) {
      window.addEventListener('mousemove', this.dragging)
      window.addEventListener('mouseup', this.dragStop)
    },
    dragStop() {
      window.removeEventListener('mousemove', this.dragging)
      window.dispatchEvent(new Event('resize-editors'))
    }
  },
  components: {
    editorGroup,
    renderer
  }
}
</script>

<style scoped lang="scss">
@import '~%/modules/mixins';

.editor-content-container {
  position: relative;
  float: left;
  @include clear;
}
.divider {
  position: absolute;
  top: 0;
  right: 50%;
  bottom: 0;
  width: 14px;
  margin-left: -7px;
  transform: translateX(5px);
  z-index: 99;
  opacity: 0;
  // background: red;

  &:hover {
    cursor: col-resize;
  }
}
</style>
