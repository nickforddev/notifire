<template>
  <div class="editor-container">
    <div class="header">
      <div class="title">{{ this.title }}</div>
      <div class="actions">
        <button @click="save" v-shortkey="['ctrl', 's']" @shortkey="save()">Save</button>
      </div>
    </div>
    <div class="editor"></div>
  </div>
</template>

<script>
import axios from 'axios'
import ace from 'brace'
// import 'brace/ext/emmet'

const theme = 'monokai'

export default {
  props: {
    value: String,
    mode: String,
    title: String,
    remote: String
  },
  data() {
    return {
      content: this.value || '',
      interval: null,
      editor: null
    }
  },
  async mounted() {
    this.initEditor()
    if (this.remote) {
      await this.fetch()
    }
  },
  methods: {
    initEditor() {
      require(`brace/mode/${this.mode}`)
      require(`brace/theme/${theme}`)
      this.editor = ace.edit(this.$el.querySelector('.editor'))
      this.editor.setWrapBehavioursEnabled(false)
      if (this.mode) {
        this.editor.session.setOptions({
          mode: `ace/mode/${this.mode}`,
          tabSize: 2,
          useSoftTabs: true
          // enableEmmet: true
        })
      }
      this.editor.setOption('fontSize', '13px')
      // this.editor.setOption('enableEmmet', true)
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
        this.$emit('input', content)
        this.content = content
        // this.contentBackup = content
      })
    },
    setValue(value) {
      this.content = value
      this.editor.setValue(this.content)
      this.editor.clearSelection()
    },
    fetch() {
      return axios.get(this.remote)
        .then(response => {
          this.setValue(response.data)
        })
    },
    save() {
      console.log('save')
      return axios.put(this.remote, {
        content: this.content
      }).then(() => {
        alert(`${this.title} saved successfully`)
      })
    }
  }
}
</script>

<style scoped lang="scss">
$header-height: 30px;
$header-color: white;
$header-background: #3d3d3d;

.editor-container {
  height: 100%;

  .editor {
    height: calc(100% - #{$header-height});
  }

  .header {
    position: relative;
    height: $header-height;
    color: $header-color;
    background: $header-background;

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
}
</style>
