<template>
  <div class="editor-group-container">
    <div class="editor-group" v-if="editors.length">
      <editor
        v-for="(editor, index) in editors"
        :key="index"
        :data="editor"
        :ref="editor.path"
        @input="debounceInput"
        @close="closeEditor"
      />
    </div>
    <div v-else class="editor-group empty">
      <div class="container">
        <logo />
        <div class="tagline">
          Design next level notifications
        </div>
        <div class="getting-started">
          <h3>Getting Started</h3>
          <p>Create a new template or select an existing one, then click edit. This will open the relevant files in the editor, and render the template.</p>

          <h3>Templates</h3>
          <p>
            Templates are a group that represent a single notification, each containing an email, a push notification, and a text message.
            <a href="http://handlebarsjs.com/expressions.html" target="_blank">More info</a>
          </p>

          <h3>Partials</h3>
          <p>
            Partials allow you to reuse components within your templates. 
            <a href="http://handlebarsjs.com/partials.html" target="_blank">More info</a>
          </p>

          <h3>Globals</h3>
          <p>
            Globals are elements that are shared between all templates. Your global template will wrap every email template, global json will be available to every template, global styles will be applied to every template.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- /////////////////////////////////////////////////////////////////////// -->

<script>
import _ from 'lodash'
import editor from '@/components/editor'
import { pathToData, Request } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'editor-group',
  computed: {
    editors() {
      return this.active_files.map(path => {
        return this.getDefaults(path)
      })
    },
    ...mapGetters([
      'files',
      'active_files',
      'active_editor_group',
      'active_editor_group_type'
    ])
  },
  watch: {
    editors() {
      // console.log('editors', this.editors)
      // console.log('refs', this.$refs)
      this.all('resetSize')
    }
  },
  async mounted() {
    window.addEventListener('focus-editor', this.editorFocus)
  },
  methods: {
    debounceInput: _.debounce(function() {
      this.render()
    }, 900),
    getDefaults(path) {
      const data = pathToData(path, this.files)
      const mode = data.ext === 'html'
        ? 'handlebars'
        : data.ext
      return {
        title: data.name,
        mode,
        path
      }
    },
    closeEditor(editor) {
      this.$store.dispatch('close_editor', editor)
    },
    removeAllEditors() {
      this.editors = []
    },
    render() {
      this.$store.dispatch('renderer_loading', true)
      const type = this.active_editor_group_type
      return new Request(`render/${type}`, {
        method: 'post',
        data: {
          path: this.active_editor_group
        }
      })
      .then(response => {
        this.$store.dispatch('set_renderer_html', response.data)
      })
      .catch(error => {
        const message = _.get(error, 'response.data') || 'Could not connect with the server'
        this.$store.dispatch('set_renderer_error', message)
      })
      .then(() => {
        this.$store.dispatch('renderer_loading', false)
      })
    },
    editorFocus(e) {
      const $editor = this.$refs[e.detail]
      $editor[0].editor.focus()
    },
    all(method_name, ...args) {
      for (let key in this.$refs) {
        const vm = this.$refs[key][0]
        if (vm) {
          this.$refs[key][0][method_name](...args)
        }
      }
    }
  },
  components: {
    editor
  }
}
</script>

<!-- /////////////////////////////////////////////////////////////////////// -->

<style scoped lang="scss">
@import '~%/modules/colors';

$divider-height: 20px;
$divider-background: #333;

.editor-group-container {
  width: 50%;
}
.editor-group {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: $color-page-background;
  color: $color-text-light;
  float: left;
  overflow: hidden;
  
  &.empty {
    overflow: scroll;
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
.container {
  max-width: 90%;
  width: 300px;
  margin: 10vh auto 0;

  .logo {
    width: 200px;
  }
}
.tagline {
  color: $color-highlight;
}

.getting-started {
  margin-top: 30px;
  text-align: left;
  font-size: 12px;
}
</style>
