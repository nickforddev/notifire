<template>
  <div class="editor-group">
    <editor
      v-for="editor in editors"
      v-model="data[editor.model]"
      :key="editor.title"
      :title="editor.title"
      :mode="editor.mode"
      :remote="editor.remote"
      @input="debounceInput"
      @close="closeEditor"
    />
    <div class="clear"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import editor from '@/components/editor'
import { sleep } from '@/utils'

export default {
  name: 'hello',
  props: {
    editors: Array
  },
  data () {
    return {
      data: {}
    }
  },
  async mounted() {
    this.setHeights()
  },
  watch: {
    editors() {
      this.setHeights()
    }
  },
  methods: {
    debounceInput: _.debounce(function() {
      this.$emit('input', this.data)
    }, 900),
    async setHeights() {
      await sleep(10)

      const editor_count = this.$el.querySelectorAll('.editor').length
      const height = 100 / editor_count
      const $editors = this.$el.querySelectorAll('.editor-container')
      _.each($editors, ($editor) => {
        $editor.style.height = `${height}%`
      })
      window.dispatchEvent(new Event('resize'))
    },
    closeEditor(_editor) {
      this.editors.map((editor, index) => {
        if (editor.remote === _editor.remote) {
          this.editors.splice(index, 1)
        }
      })
    },
    removeAllEditors() {
      this.editors = []
    }
  },
  components: {
    editor
  }
}
</script>

<style scoped lang="scss">
@import '~%/modules/colors';

$divider-height: 20px;
$divider-background: #333;

.editor-group {
  position: relative;
  width: 50%;
  height: 100vh;
  background-color: $color-page-background;
  float: left;

  .editor-panel {
    height: 50vh;
  }
}
.divider {
  height: $divider-height;
  background: $divider-background;

  &:hover {
    cursor: row-resize;
  }
}
.clear {
  clear: both;
}
</style>
