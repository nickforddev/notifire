<template>
  <div class="editor-container" :style="[container_styles]" :class="[container_class]">
    <!-- {{ custom_editor_height }} -->
    <loading v-if="loading" />
    <div class="header">
      <div class="title">
        <div class="icon">
          <img :src="icon_src" />
        </div>
        {{ this.data.title }}
      </div>
      <div class="actions">
        <button @click="close">Close</button>
        <button @click="save">Save</button>
      </div>
    </div>
    <div class="editor"></div>
    <div v-if="resizable" class="divider horizontal" @mousedown.self.prevent="dragStart" />
  </div>
</template>

<!-- /////////////////////////////////////////////////////////////////////// -->

<script>
import _ from 'lodash'
import ace from 'brace'
import { mapGetters } from 'vuex'
import { Request, sleep, pathToData } from '@/utils'

const theme = 'monokai'

export default {
  props: {
    data: Object
  },
  data() {
    return {
      loading: true,
      editor: null,
      focused: false,
      custom_editor_height: false
    }
  },
  async mounted() {
    this.initEditor()
    if (this.data.path) {
      await this.fetch()
    }
  },
  beforeDestroy() {
    this.editor.destroy()
    window.removeEventListener('resize-editors', this.resize)
  },
  computed: {
    icon_src() {
      const file = pathToData(this.data.path, this.$parent.files)
      const type = file.ext
      return `/static/svg/${type}.svg`
    },
    resizable() {
      const length = this.$parent.active_files.length
      const index = this.$parent.active_files.indexOf(this.data.path)
      let output = false
      if (index < (length - 1)) {
        output = true
      }
      return output
    },
    editor_height() {
      if (this.custom_editor_height) {
        return this.custom_editor_height
      } else {
        const editors = this.$parent.active_files.length
        return 100 / editors
      }
    },
    editor_index() {
      return this.$parent.active_files.indexOf(this.data.path)
    },
    offset_top() {
      return this.$el.getBoundingClientRect().top
    },
    next_editor() {
      const next_index = this.editor_index + 1
      const next_path = this.$parent.active_files[next_index]
      const next_editor = this.$parent.$refs[next_path]
      return next_editor[0]
    },
    container_styles() {
      return {
        height: `${this.editor_height}%`
      }
    },
    container_class() {
      if (this.focused) {
        return 'focused'
      }
    },
    content() {
      return this.editor_content[this.data.path] || ''
    },
    ...mapGetters([
      'editor_content'
    ])
  },
  watch: {
    async editor_height(value) {
      await sleep(2)
      this.resize()
    },
    content(content) {
      this.setValue(content)
      this.editor.session.setOptions({
        mode: `ace/mode/${this.data.mode}`
      })
    }
  },
  methods: {
    emitChange: _.debounce(function() {
      this.$emit('input', this.content)
      this.save()
    }, 900),
    initEditor() {
      require(`brace/mode/${this.data.mode}`)
      require(`brace/theme/${theme}`)
      this.editor = ace.edit(this.$el.querySelector('.editor'))
      this.editor.setWrapBehavioursEnabled(false)
      if (this.data.mode) {
        this.editor.session.setOptions({
          mode: `ace/mode/${this.data.mode}`,
          tabSize: 2,
          useSoftTabs: true
        })
      }
      this.editor.setOption('fontSize', '11px')
      this.editor.setOption('fontFamily', 'Menlo, Monaco, "Courier New", monospace')
      this.editor.setTheme(`ace/theme/${theme}`)
      this.editor.$blockScrolling = Infinity
      this.editor.setValue(this.content)
      this.editor.clearSelection()

      this.$emit('init')
      this.$emit('input', this.content)

      this.initEventListeners()
    },
    initEventListeners(editor) {
      this.editor.on('change', () => {
        const content = this.editor.getValue()
        const data = {
          path: this.data.path,
          content
        }
        this.$store.dispatch('set_editor_content', data)
        this.emitChange()
      })
      this.editor.on('focus', () => {
        this.focused = true
      })
      this.editor.on('blur', () => {
        this.focused = false
      })
      window.addEventListener('resize-editors', this.resize)
    },
    setValue(content) {
      if (typeof content === 'object') {
        content = JSON.stringify(content, null, '\t') // fix for json content
      }
      const data = {
        path: this.data.path,
        content
      }
      var cursor = this.editor.getCursorPosition()
      console.log({cursor})
      this.$store.dispatch('set_editor_content', data)
      this.editor.setValue(this.content)
      this.editor.clearSelection()
      this.editor.moveCursorToPosition(cursor)
    },
    async fetch() {
      const { data } = await Request(this.data.path)
      this.setValue(data)
      this.loading = false
    },
    async save() {
      await Request(this.data.path, {
        method: 'put',
        data: {
          content: this.content
        }
      })
      this.showSuccess()
    },
    resize() {
      this.editor.resize()
    },
    resetSize() {
      this.custom_editor_height = false
    },
    close() {
      this.$emit('close', this.data.path)
    },
    showSuccess() {
      console.log('success')
    },
    dragging(e) {
      const offset = this.offset_top
      const height = e.clientY - offset
      if (height > 30) {
        const percentage = (height / window.innerHeight) * 100
        const next_editor_height = this.next_editor.editor_height
        const total_height = this.editor_height + next_editor_height
        this.custom_editor_height = percentage
        const new_next_height = total_height - percentage
        this.next_editor.custom_editor_height = new_next_height
      }
    },
    dragStart(e) {
      window.addEventListener('mousemove', this.dragging)
      window.addEventListener('mouseup', this.dragStop)
    },
    dragStop() {
      window.removeEventListener('mousemove', this.dragging)
    }
  }
}
</script>

<!-- /////////////////////////////////////////////////////////////////////// -->

<style lang="scss">
@import '~%/modules/syntax';
</style>

<style scoped lang="scss">
$header-height: 30px;
$header-color: white;
$header-background: #21252b;
$header-highlight-color: rgba(255,255,255, 0.1);
$header-shade-color: rgba(0,0,0, 0.4);

.editor-container {
  position: relative;
  height: 100%;

  &.focused {
    .header {
      font-weight: bold;
      color: $header-color;
    }
  }

  .editor {
    height: calc(100% - #{$header-height});
    overflow: hidden;
  }

  .header {
    position: relative;
    height: $header-height;
    color: darken($header-color, 30%);
    background: $header-background;
    border-top: 1px solid $header-highlight-color;
    border-bottom: 1px solid $header-shade-color;
    box-shadow: 1px 0 3px rgba(0,0,0, 0.6);
    font-family: Menlo, Monaco, "Courier New", monospace;
    font-size: 0.7em;
    text-align: left;
    user-select: none;

    .title {
      display: inline-block;
      background: #2c313a;
      padding: 8px 10px;
      border-right: 1px solid $header-shade-color;
    }

    .icon {
      display: inline-block;
      width: 14px;
    }

    .actions {
      position: absolute;
      right: 10px;
      top: 4px;
    }
  }
}
.ace_editor {
  height: 100%;
  width: 100%;
  -webkit-font-smoothing: subpixel-antialiased;
}

.divider {
  position: absolute;
  bottom: -7px;
  height: 14px;
  width: 100%;
  z-index: 999;
  opacity: 0;

  &:hover {
    cursor: row-resize;
  }
}
</style>
