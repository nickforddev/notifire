<template>
  <div class="editor-container">
    <loading v-if="loading" />
    <div class="header">
      <div class="title">
        <div class="icon">
          <img :src="icon_src" />
        </div>
        {{ this.title }}
      </div>
      <div class="actions">
        <button @click="close">Close</button>
        <button @click="save">Save</button>
      </div>
    </div>
    <div class="editor"></div>
  </div>
</template>

<!-- /////////////////////////////////////////////////////////////////////// -->

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
    path: String
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
      return `${config.api}/${this.path}`
    },
    icon_src() {
      const filename = this.path.split('/').slice(-1)[0]
      const filename_split = filename.split('.')
      const type = filename_split[filename_split.length - 1]
      return `/static/svg/${type}.svg`
    }
  },
  async mounted() {
    this.initEditor()
    if (this.path) {
      await this.fetch()
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize-editors', this.resize)
    this.editor.destroy()
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
    resize() {
      this.editor.resize()
    },
    save() {
      return axios.put(this.url, {
        content: this.content
      }).then(() => {
        console.log(`${this.title} saved successfully`)
      })
    },
    close() {
      this.$emit('close', this.path)
      this.$destroy()
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
  overflow: hidden;

  .editor {
    height: calc(100% - #{$header-height});
    overflow: hidden;
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
</style>
