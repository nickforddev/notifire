<template>
  <div :class="['tree-item-container', class_name]">
    <div :class="['tree-item', file_class_name]" @click.self="toggle">
      <div class="leader">
        <!-- <div v-if="file.type === 'folder'" class="caret"></div> -->
      </div>
      <div class="leader icon">
        <img :src="icon_src" alt="css">
      </div>
      {{ file.name }}
      <div class="actions">
        <button @click="remove">Delete</button>
      </div>
    </div>

    <div v-if="open">
      <tree-item
        v-for="(model, index) in files"
        :key="index"
        :data="model"
        :level="next_level"
        :template="file.name"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-item-template',
  props: {
    data: Object,
    level: Number,
    open: Boolean
  },
  data() {
    return {
      icon_src: '/static/svg/folder.svg'
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
      return this.file.data
    },
    class_name() {
      return this.open
        ? 'folder open'
        : 'folder closed'
    },
    file_class_name() {
      return this.file.type
    }
  },
  methods: {
    toggle() {
      this.$parent.setOpenFolder(this.file.name)
    },
    async remove() {
      const path = this.file.path
      const accepted = confirm(`Are you sure you want to delete "${path}"?`)
      if (accepted) {
        await this.$store.dispatch('remove_file', path)
        this.$store.dispatch('get_files')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~%/modules/colors';

$color-sidebar-templates-folder: #424952;
$font-size: 10px;

.tree-item {
  padding: 4px 4px 4px 10px;
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
