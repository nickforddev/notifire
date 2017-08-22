<template>
  <div class="hello">
    <div class="editor">
      <editor v-model="html" @input="debounceInput"></editor>
      <div class="actions">
        <button @click="render">Render</button>
      </div>
    </div>
    <div class="content" v-html="content"></div>
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
      html: `
<style>
  h1.header {
    color: blue
  }
  .test h1.header {
    color: red;
  }
</style>
<h1 class="header">{{header}}</h1>

<div class="test">
  <h1 class="header">{{header}}</h1>
</div>

{{#bug}}
{{/bug}}

{{#items}}
  {{#first}}
    <li><strong>{{name}}</strong></li>
  {{/first}}
  {{#link}}
    <li><a href="{{url}}">{{name}}</a></li>
  {{/link}}
{{/items}}

{{#empty}}
  <p>The list is empty.</p>
{{/empty}}
`,
      content: ''
    }
  },
  created() {
    this.render()
  },
  components: {
    editor
  },
  methods: {
    render() {
      axios.post('http://localhost:3636', {
        template: this.html
      })
      .then(response => {
        this.content = response.data
      })
    },
    debounceInput: _.debounce(function() {
      this.render()
    }, 900)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .editor {
    position: relative;
    width: 50%;
    float: left;
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
