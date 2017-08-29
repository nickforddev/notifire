<template>
  <main>
    <tree-view @loadFile="loadFile" />
    
    <div class="editor-content-container" :style="[editor_content_styles]">
      <editor-group :editors="editors" @input="render" v-model="data" />

      <div class="content">
        <iframe ref="iframe" />
      </div>
      <div class="clear"></div>
    </div>
    <div class="clear"></div>
  </main>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import { mapGetters } from 'vuex'
import config from '@/config'
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
          remote: '/templates/example/email/index.html'
        },
        {
          model: 'css',
          title: 'styles',
          mode: 'scss',
          remote: '/templates/example/email/style.scss'
        }
      ]
    }
  },
  computed: {
    editor_content_styles() {
      return {
        width: `calc(100% - ${this.sidebar_width}px)`
      }
    },
    ...mapGetters([
      'sidebar_width'
    ])
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
      return axios.post(`${config.api}/render/template`, {
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

      const match = this.editors.find(editor => {
        return editor.remote === `/${path}`
      })

      // console.log(match)
      if (match) return

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
  // width: calc(100% - 300px);
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
    border-width: 0;
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
