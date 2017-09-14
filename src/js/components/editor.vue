<template>
  <div class="editor-container" :style="[container_styles]">
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
      content: this.value || '',
      custom_editor_height: false
    }
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
    }
  },
  async mounted() {
    this.initEditor()
    if (this.data.path) {
      await this.fetch()
    }
  },
  beforeDestroy() {
    console.log('destroy')
    this.editor.destroy()
    window.removeEventListener('resize-editors', this.resize)
  },
  watch: {
    async editor_height(value) {
      await sleep(2)
      this.resize()
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
        this.content = content
        this.emitChange()
      })
      window.addEventListener('resize-editors', this.resize)
    },
    setValue(value) {
      if (typeof value === 'object') value = JSON.stringify(value, null, '\t')
      this.content = value
      this.editor.setValue(this.content)
      this.editor.clearSelection()
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
      console.log('saved successfully')
    },
    resize() {
      this.editor.resize()
    },
    resetSize() {
      this.custom_editor_height = false
    },
    close() {
      this.$emit('close', this.data.path)
      // this.$destroy()
    },
    dragging(e) {
      const offset = this.$el.getBoundingClientRect().top
      const percentage = ((e.clientY - offset) / window.innerHeight) * 100
      const next_editor_height = this.next_editor.editor_height
      const total_height = this.editor_height + next_editor_height
      this.custom_editor_height = percentage
      const new_next_height = total_height - percentage
      this.next_editor.custom_editor_height = new_next_height
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
  // overflow: hidden;

  .editor {
    height: calc(100% - #{$header-height});
    overflow: hidden;
    // padding-bottom: 10px;
  }

  .header {
    position: relative;
    height: $header-height;
    color: $header-color;
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
  // background: white;
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
