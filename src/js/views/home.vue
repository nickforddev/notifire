<template>
  <main>
    <tree-view :data="tree" />
    <editor-group>
      <editor
        v-model="html"
        title="template"
        mode="handlebars"
        remote="http://localhost:3636/templates/example/body.html"
        @input="debounceInput"
      />
      <editor
        v-model="css"
        title="styles"
        mode="scss"
        remote="http://localhost:3636/templates/example/body.scss"
        @input="debounceInput"
      />
    </editor-group>

    <div class="content">
      <iframe
        ref="iframe"
        frameborder="0" />
    </div>
    <div class="clear"></div>
  </main>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import treeView from '@/components/tree-view'
import editor from '@/components/editor'
import editorGroup from '@/components/editor-group'

export default {
  name: 'hello',
  data () {
    return {
      css: '',
      html: '',
      content: '',
      loaded: false,
      tree: {}
    }
  },
  watch: {
    content(value) {
      const iframe = this.$refs.iframe
      const doc = iframe.contentDocument || iframe.contentWindow.document
      doc.body.innerHTML = value
    }
  },
  methods: {
    render() {
      this.getFiles()
      return axios.post('http://localhost:3636', {
        template: this.html,
        css: this.css
      })
      .then(response => {
        this.content = response.data
      })
      .catch(error => {
        const message = _.get(error, 'response.data') || 'Could not connect with the server'
        this.content = message
      })
    },
    debounceInput: _.debounce(function() {
      this.render()
    }, 900),
    getFiles() {
      console.log('getFiles')
      return axios.get('http://localhost:3636')
        .then(response => {
          this.tree = response.data
        })
        .catch(err => {
          console.warn(err)
        })
    }
  },
  components: {
    treeView,
    editor,
    editorGroup
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$divider-height: 20px;
$divider-background: #333;

.editors {
  position: relative;
  width: 50%;
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
.content {
  position: relative;
  width: 50%;
  height: 100vh;
  float: left;

  iframe {
    width: 100%;
    height: 100%;
  }
}
.actions {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9;
}
.clear {
  clear: both;
}
</style>
