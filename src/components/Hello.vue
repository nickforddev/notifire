<template>
  <div class="hello">
    <div class="editor">
      <editor></editor>
    </div>
    <!-- <editor v-model="content" @init="editorInit()" lang="html" theme="chrome" width="500" height="100"></editor> -->
  </div>
</template>

<script>
import editor from './editor'
export default {
  name: 'hello',
  data () {
    return {
    }
  },
  components: {
    editor
    // editor: require('vue2-ace-editor')
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .editor {
    width: 50%;
  }
</style>
