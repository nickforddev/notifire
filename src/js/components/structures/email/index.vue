<template>
  <div class="container">
    <div class="mask" />
    <component :is="type" :data="renderer_html"/>
    <div class="menu">
      <select v-model="type">
        <option value="desktop">Desktop</option>
        <option value="iphone">iPhone</option>
        <option value="android">Android</option>
      </select>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import desktop from './desktop'
import iphone from './iphone'

export default {
  name: 'email',
  data() {
    return {
      type: 'desktop',
      menu_visible: false
    }
  },
  computed: {
    ...mapGetters([
      'renderer_html'
    ])
  },
  methods: {
    toggleMenu() {
      this.menu_visible = !this.menu_visible
    }
  },
  components: {
    desktop,
    iphone
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/modules/mixins';

$subject-height: 32px;
.container {
  height: 100%;
}
.mask {
  @include block_psuedo;
  top: 0;
  bottom: 0;
  width: 150px;
  position: absolute;
  margin-left: 12px;
  opacity: 0;
}
.menu {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>