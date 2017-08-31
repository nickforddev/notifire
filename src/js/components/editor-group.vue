<template>
  <div class="editor-group">
    <editor
      v-for="editor in editors"
      v-model="data[editor.model]"
      :key="editor.title"
      :title="editor.title"
      :mode="editor.mode"
      :path="editor.path"
      @input="debounceInput"
      @close="closeEditor"
    />
    <div class="clear"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import editor from '@/components/editor'
import { sleep, pathToData } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'editor-group',
  data () {
    return {
      data: {}
    }
  },
  computed: {
    editors() {
      return this.active_files.map(path => {
        return this.getDefaults(path)
      })
    },
    ...mapGetters([
      'files',
      'active_files'
    ])
  },
  async mounted() {
    this.setHeights()
  },
  watch: {
    editors(val) {
      this.setHeights()
    }
  },
  methods: {
    debounceInput: _.debounce(function() {
      this.$emit('input', this.data)
    }, 900),
    getDefaults(path) {
      const data = pathToData(path, this.files)
      const mode = data.ext === 'html'
        ? 'handlebars'
        : data.ext
      return {
        title: data.name,
        model: data.ext,
        mode,
        path
      }
    },
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
    closeEditor(editor) {
      this.$store.dispatch('close_editor', editor)
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
