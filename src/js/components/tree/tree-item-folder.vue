<template>
  <div :class="['tree-item-container folder', is_active]">
    <div
      :class="['tree-item', class_name]"
      @click="toggle"
      :style="styles">
      <div class="leader">
        <div class="caret" />
      </div>
      <div class="leader icon">
        <img :src="icon_src" :alt="file.type" />
      </div>

      {{ file.name }}

    </div>

    <div v-if="open">
      <tree-item
        v-for="(model, index) in children"
        :key="index"
        :data="model"
        :level="next_level" />
    </div>

  </div>
</template>

<script>
// import axios from 'axios'
// import config from '@/config'
import { mapGetters } from 'vuex'

export default {
  name: 'tree-item-folder',
  props: {
    data: [Object, Array],
    level: Number,
    template: String,
    type: String
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    file() {
      return this.data
    },
    children() {
      return this.file.data
    },
    next_level() {
      return this.level + 1
    },
    class_name() {
      return this.open
          ? 'open'
          : 'closed'
    },
    icon_src() {
      return this.open
        ? '/static/svg/folder-open.svg'
        : '/static/svg/folder.svg'
    },
    is_active() {
      if (this.active_editor_group === this.file.path) {
        return 'active'
      }
    },
    styles() {
      return {
        'paddingLeft': this.next_level * 10 + 'px'
      }
    },
    ...mapGetters([
      'active_editor_group',
      'active_editor_group_type'
    ])
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    clickAction() {
      this.file.type === 'folder'
        ? this.toggle()
        : this.loadFile()
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

  .active > & {
    background: $color-sidebar-selected;
  }
}
.caret {
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 5px 5px;
  border-color: transparent transparent $color-sidebar-caret transparent;

  .closed & {
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
// .templates-folder {
//   padding: 6px 6px 10px;
//   background: $color-sidebar-templates-folder;
//   margin-top: 6px;
//   border-top: 1px solid lighten($color-sidebar-templates-folder, 10%);
//   border-bottom: 1px solid darken($color-sidebar-templates-folder, 10%);

//   &:hover {
//     background: lighten($color-sidebar-templates-folder, 10%);
//   }
// }
</style>
