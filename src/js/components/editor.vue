<template>
  <div class="editor-container">
    <loading v-if="loading" />
    <div class="header">
      <div class="title">{{ this.title }}</div>
      <div class="actions">
        <button @click="close">Close</button>
        <button @click="save" v-shortkey="['ctrl', 's']" @shortkey="save">Save</button>
      </div>
    </div>
    <div class="editor"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import config from '@/config'
import axios from 'axios'
import ace from 'brace'

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
      loading: true,
      content: this.value || '',
      editor: null
    }
  },
  computed: {
    url() {
      return `${config.api}/${this.remote}`
    }
  },
  async mounted() {
    console.log(this.content)
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
        this.content = content
        this.emitChange()
        // this.contentBackup = content
      })
    },
    emitChange: _.debounce(function() {
      this.$emit('input', this.content)
      this.save()
    }, 900),
    setValue(value) {
      if (typeof value === 'object') value = JSON.stringify(value, null, '\t')
      this.content = value
      this.editor.setValue(this.content)
      this.editor.clearSelection()
    },
    async fetch() {
      const { data } = await axios.get(this.url)
      this.setValue(data)
      this.loading = false
    },
    save() {
      return axios.put(this.url, {
        content: this.content
      }).then(() => {
        console.log(`${this.title} saved successfully`)
        // alert(`${this.title} saved successfully`)
      })
    },
    close() {
      // console.log('close', this)
      this.$emit('close', this)
      this.$destroy()
    }
  }
}
</script>

<style scoped lang="scss">
$header-height: 30px;
$header-color: white;
$header-background: #3d3d3d;

.editor-container {
  position: relative;
  height: 100%;

  .editor {
    height: calc(100% - #{$header-height});
    overflow: hidden;
    // overflow: scroll;
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
