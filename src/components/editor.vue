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
  data() {
    return {
      html: `{{#bug}}
{{/bug}}

{{#items}}
  {{#first}}
    <li><strong>{{name}}</strong></li>
  {{/first}}
  {{#link}}
    <li><a href="{{url}}">{{name}}</a></li>
  {{/link}}
{{/items}}

{{#empty}}
  <p>The list is empty.</p>
{{/empty}}
`
    }
  },
  mounted() {
    console.log('created')
    editor = ace.edit(this.$el)
    editor.getSession().setMode('ace/mode/handlebars')
    editor.setTheme('ace/theme/monokai')
    editor.$blockScrolling = Infinity
    editor.setValue(this.html)
    this.$emit('init', editor)
    editor.on('change', () => {
      const content = editor.getValue()
      this.$emit('input', content)
      // this.contentBackup = content
    })
  }
}
</script>

<style scoped lang="scss">
.ace_editor {
  height: 100vh;
  width: 100%;
}
</style>
