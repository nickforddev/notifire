<template>
  <div>
    <div></div>
  </div>
</template>

<script>
import ace from 'brace'
// import 'brace/mode/handlebars'
// import 'brace/theme/monokai'

export default {
  props: {
    value: String,
    mode: String
  },
  data() {
    return {
      content: this.value || '',
      interval: null,
      editor: null
    }
  },
  mounted() {
    this.initEditor()
  },
  watch: {
    value(value) {
      if (!this.content) {
        this.content = value
        this.editor.setValue(this.content)
        this.editor.clearSelection()
      }
    }
  },
  methods: {
    initEditor() {
      require(`brace/mode/${this.mode}`)
      require(`brace/theme/ambiance`)
      this.editor = ace.edit(this.$el)
      this.editor.setWrapBehavioursEnabled(false)
      if (this.mode) {
        this.editor.session.setOptions({
          mode: `ace/mode/${this.mode}`,
          tabSize: 2,
          useSoftTabs: true
        })
      }
      this.editor.setTheme('ace/theme/ambiance')
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
        this.$emit('input', content)
        this.content = content
        // this.contentBackup = content
      })
    }
  }
}
</script>

<style scoped lang="scss">
.ace_editor {
  height: 100%;
  width: 100%;
}
</style>
