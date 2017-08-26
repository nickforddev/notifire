<template>
  <main>
    <tree-view @loadFile="loadFile" />
    
    <div class="editor-content-container">
      <editor-group :editors="editors" @input="render" v-model="data" />

      <div class="content">
        <iframe
          ref="iframe"
          frameborder="0" />
      </div>
      <div class="clear"></div>
    </div>
    <div class="clear"></div>
  </main>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import treeView from '@/components/tree-view'
import editorGroup from '@/components/editor-group'

export default {
  name: 'home',
  data () {
    return {
      data: {},
      tree: {},
      content: '',
      editors: [
        {
          model: 'html',
          title: 'template',
          mode: 'handlebars',
          remote: '/templates/example/body.html'
        },
        {
          model: 'css',
          title: 'styles',
          mode: 'scss',
          remote: '/templates/example/body.scss'
        }
      ]
    }
  },
  watch: {
    content(value) {
      const iframe = this.$refs.iframe
      const doc = iframe.contentDocument || iframe.contentWindow.document
      doc.body.innerHTML = value
    },
    data(value) {
      console.log({value})
    }
  },
  methods: {
    render() {
      return axios.post('http://localhost:3636', {
        template: this.data.html,
        css: this.data.css
      })
      .then(response => {
        this.content = response.data
      })
      .catch(error => {
        const message = _.get(error, 'response.data') || 'Could not connect with the server'
        this.content = message
      })
    },
    loadFile(file_path) {
      const path_split = file_path.split('/')
      const path = path_split.slice(1).join('/')
      const file_name = path_split[path_split.length - 1]
      const file_name_split = file_name.split('.')
      const file_type = file_name_split[file_name_split.length - 1]
      this.editors.push({
        title: file_name,
        mode: file_type,
        model: file_type,
        remote: `/${path}`
      })
    }
  },
  components: {
    treeView,
    editorGroup
  }
}
</script>

<style scoped lang="scss">
.editor-content-container {
  width: calc(100% - 300px);
  float: left;
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
