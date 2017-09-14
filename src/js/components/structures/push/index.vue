<template>
  <div class="container">
    <component :is="type" :data="push_data" />
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

import iphone from './iphone'
import android from './android'

export default {
  name: 'push',
  data() {
    return {
      type: 'iphone'
    }
  },
  computed: {
    push_data() {
      return {
        app: 'Rafi Payment',
        message: this.renderer_html.html
      }
    },
    ...mapGetters([
      'renderer_html'
    ])
  },
  components: {
    iphone,
    android
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/modules/colors';

.container {
  height: 100%;
  background: $color-renderer-background;
}

.menu {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
