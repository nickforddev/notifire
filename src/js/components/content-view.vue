<template>
  <div
    class="editor-content-container"
    :style="[editor_content_styles]">
    <editor-group />
    <renderer />
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
    ...mapGetters([
      'sidebar_width'
    ])
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
  float: left;
  @include clear;
}
</style>
