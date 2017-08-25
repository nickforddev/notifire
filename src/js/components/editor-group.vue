<template>
  <div class="editor-group">
    <slot>
      No editors in slot
    </slot>
    <div class="clear"></div>
  </div>
</template>

<script>
import _ from 'lodash'
// import axios from 'axios'

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
  mounted() {
    this.setHeights()
  },
  watch: {
    content(value) {
      const iframe = this.$refs.iframe
      const doc = iframe.contentDocument || iframe.contentWindow.document
      doc.body.innerHTML = value
    }
  },
  methods: {
    // render() {
    //   this.getFiles()
    //   return axios.post('http://localhost:3636', {
    //     template: this.html,
    //     css: this.css
    //   })
    //   .then(response => {
    //     this.content = response.data
    //   })
    //   .catch(error => {
    //     const message = _.get(error, 'response.data') || 'Could not connect with the server'
    //     this.content = message
    //   })
    // },
    setHeights() {
      const editor_count = this.$el.querySelectorAll('.editor').length
      const height = 100 / editor_count
      const $editors = this.$el.querySelectorAll('.editor-container')
      _.each($editors, ($editor) => {
        $editor.style.height = `${height}vh`
      })
    }
    // debounceInput: _.debounce(function() {
    //   this.render()
    // }, 900),
    // dragStart() {
    //   console.log('dragstart')
    // },
    // dragEnd() {
    //   console.log('dragend')
    // },
    // getFiles() {
    //   console.log('getFiles')
    //   return axios.get('http://localhost:3636')
    //     .then(response => {
    //       this.tree = response.data
    //     })
    //     .catch(err => {
    //       console.warn(err)
    //     })
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$divider-height: 20px;
$divider-background: #333;

.editor-group {
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
.clear {
  clear: both;
}
</style>
