<template>
  <main>
    <tree-view />
    
    <div class="editor-content-container" :style="[editor_content_styles]">
      <editor-group @input="render" v-model="data" />

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
      content: ''
    }
  },
  computed: {
    editor_content_styles() {
      return {
        width: `calc(100% - ${this.sidebar_width}px)`
      }
    },
    ...mapGetters([
      'renderer_html',
      'sidebar_width'
    ])
  },
  watch: {
    renderer_html(value) {
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
        this.$store.dispatch('set_renderer_html', response.data)
      })
      .catch(error => {
        const message = _.get(error, 'response.data') || 'Could not connect with the server'
        this.content = message
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
