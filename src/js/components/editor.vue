<template>
  <div>
    <div></div>
  </div>
</template>

<script>
import ace from 'brace'
import 'brace/mode/handlebars'
import 'brace/theme/monokai'

let editor

export default {
  props: {
    value: String
  },
  data() {
    return {
      html: this.value || '',
      interval: null
    }
  },
  mounted() {
    this.initEditor()
  },
  methods: {
    initEditor() {
      editor = ace.edit(this.$el)
      editor.getSession().setMode('ace/mode/handlebars')
      editor.setTheme('ace/theme/monokai')
      editor.$blockScrolling = Infinity
      editor.setValue(this.html)

      this.$emit('init', editor)
      this.$emit('input', this.html)

      this.initEventListeners(editor)
    },
    initEventListeners(editor) {
      editor.on('change', () => {
        const content = editor.getValue()
        this.$emit('input', content)
        this.html = content
        // this.contentBackup = content
      })
    }
  }
}
</script>

<style scoped lang="scss">
.ace_editor {
  height: 100vh;
  width: 100%;
}
</style>
