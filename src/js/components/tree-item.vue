<template>
  <div :class="['tree-item-container', class_name]">
    <div 
      v-if="isTemplatesFolder(file)"
      :class="['tree-item', 'templates-folder', file_class_name]"
      :style="[styles]"
      @click.self="clickAction">
        <div class="leader">
          <div v-if="file.type === 'folder'" class="caret"></div>
        </div>
        <div class="leader icon">
          <img :src="icon_src" alt="css">
        </div>
        {{ file.name }}
        <div class="actions">
          <button @click="create(file.name)">+</button>
        </div>
    </div>
    <div v-else :class="['tree-item', file_class_name]" :style="[styles]" @click="clickAction">
      <div class="leader">
        <div v-if="file.type === 'folder'" class="caret"></div>
      </div>
      <div class="leader icon">
        <img :src="icon_src" alt="css">
      </div>
      {{ file.name }}
    </div>
    <div v-if="!isTemplatesFolder(file) && open">
      <tree-item
        v-for="(model, index) in files"
        :key="index" :data="model"
        :level="next_level"
        @loadFile="emitLoad"
      />
    </div>
    <div v-else-if="isTemplatesFolder(file) && open">
      <tree-item-template
        v-for="(model, index) in files"
        :key="index" :data="model"
        :level="next_level"
        @loadFile="emitLoad"
        @event="event"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'

export default {
  name: 'tree-item',
  props: {
    data: Object,
    level: Number
  },
  data() {
    return {
      open: true
    }
  },
  computed: {
    next_level() {
      return this.level + 1
    },
    file() {
      return this.data
    },
    files() {
      return this.file.type === 'folder'
        ? this.file.data
        : []
    },
    button_label() {
      return this.open
        ? '-'
        : '+'
    },
    class_name() {
      return this.file.type === 'folder'
        ? this.open
          ? 'folder open'
          : 'folder closed'
        : 'file'
    },
    file_class_name() {
      return this.file.type
    },
    styles() {
      return {
        'paddingLeft': this.next_level * 10 + 'px'
      }
    },
    icon_src() {
      let type
      if (this.file.type === 'file') {
        const filename_split = this.file.name.split('.')
        type = filename_split[filename_split.length - 1]
      } else {
        type = 'folder'
      }
      return `/static/svg/${type}.svg`
    }
  },
  methods: {
    isTemplatesFolder(file) {
      return file.type === 'folder' && ['templates', 'partials', 'scss'].includes(file.name)
    },
    toggle() {
      this.open = !this.open
    },
    clickAction() {
      this.file.type === 'folder'
        ? this.toggle()
        : this.loadFile()
    },
    loadFile() {
      const file_path = this.file.data
      this.$emit('loadFile', file_path)
    },
    emitLoad(file_path) {
      this.$emit('loadFile', file_path)
    },
    event(event, ...args) {
      this.$emit('event', event, ...args)
    },
    create(type) {
      const name = prompt(`Please enter a name for your new ${type}.`)
      axios.post(`${config.api}/templates`, { name })
        .then(() => {
          this.$emit('refresh')
        })
        .catch(error => {
          alert(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~%/modules/colors';

$color-sidebar-templates-folder: #424952;
$font-size: 10px;

.tree-item {
  padding: 4px;
  margin: 0;
  font-size: $font-size;
  text-overflow: ellipsis;
  overflow: hidden;
  user-select: none;

  &:hover {
    background: $color-sidebar-hover;
    cursor: pointer;
  }
}
.caret {
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 5px 5px;
  border-color: transparent transparent $color-sidebar-caret transparent;

  .folder.closed & {
    border-width: 3.5px 0 3.5px 4px;
    border-color: transparent transparent transparent $color-sidebar-caret;
  }
}
.leader {
  display: inline-block;
  width: 8px;
  text-align: center;
  pointer-events: none;
}
.icon {
  position: relative;
  top: 3px;
  width: 14px;
}
.actions {
  display: inline-block;
  position: absolute;
  right: 5px;
}
.templates-folder {
  padding: 6px 6px 10px;
  background: $color-sidebar-templates-folder;
  margin-top: 6px;
  border-top: 1px solid lighten($color-sidebar-templates-folder, 10%);
  border-bottom: 1px solid darken($color-sidebar-templates-folder, 10%);

  &:hover {
    background: lighten($color-sidebar-templates-folder, 10%);
  }
}
</style>
