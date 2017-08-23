<template>
  <div class="hello">
    <div class="editors">
      <div class="editor template">
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
      <div class="editor styles">
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
      <iframe v-html="content" />
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
      content: ''
    }
  },
  async created() {
    // await this.fetch()
    // await this.render()
  },
  components: {
    editor
  },
  methods: {
    // fetch() {
      // const template_xhr = axios.get('http://localhost:3636/templates/example/body.html')
      // template_xhr.then(response => {
      //   this.html = response.data
      // })
      // const styles_xhr = axios.get('http://localhost:3636/templates/example/body.scss')
      // styles_xhr.then(response => {
      //   this.css = response.data
      // })
      // const promises = [
      //   template_xhr,
      //   styles_xhr
      // ]
      // return Promise.all(promises)
    // },
    render() {
      return axios.post('http://localhost:3636', {
        template: this.html,
        css: this.css
      })
      .then(response => {
        this.content = response.data
      })
      .catch(error => {
        const message = _.get(error, 'response.data')
        console.log(message)
      })
    },
    debounceInput: _.debounce(function() {
      this.render()
    }, 900)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .editors {
    position: relative;
    width: 50%;
    float: left;

    .editor {
      height: 50vh;
    }
  }
  .content {
    position: relative;
    width: 50%;
    float: left;
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
