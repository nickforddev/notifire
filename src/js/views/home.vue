<template>
  <div class="hello">
    <div class="editors">
      <div class="editor-panel template">
        <editor
          v-model="html"
          title="template"
          mode="handlebars"
          remote="http://localhost:3636/templates/example/body.html"
          @input="debounceInput"
        />
        <!-- <div class="actions">
          <button @click="render">Render</button>
        </div> -->
      </div>
      <div class="divider" @mousedown.prevent="dragStart" @mouseup="dragEnd"></div>
      <div class="editor-panel styles">
        <editor
          v-model="css"
          title="styles"
          mode="ruby"
          remote="http://localhost:3636/templates/example/body.scss"
          @input="debounceInput"
        />
        <!-- <div class="actions">
          <button @click="render">Render</button>
        </div> -->
      </div>
    </div>
    <div class="content">
      <iframe
        ref="iframe"
        frameborder="0" />
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import editor from '@/components/editor'

export default {
  name: 'hello',
  data () {
    return {
      css: '',
      html: '',
      content: '',
      loaded: false
    }
  },
  components: {
    editor
  },
  mounted() {
    console.log(this.$el.querySelectorAll('.editor').length)
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
    dragStart() {
      console.log('dragstart')
    },
    dragEnd() {
      console.log('dragend')
    }
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
