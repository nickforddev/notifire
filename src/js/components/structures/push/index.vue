<template>
  <div class="container">
    <component :is="type" :data="push_data" :style="[device_styles]" />
    <div class="menu">
      <select v-model="type">
        <option value="iphone">iPhone</option>
        <option value="android">Android</option>
      </select>
    </div>
    <div class="scale">
      <input type="range" orient="vertical" v-model="size" min="20" />
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
      type: 'iphone',
      size: 100
    }
  },
  computed: {
    push_data() {
      return {
        app: 'Rafi Payment',
        message: this.renderer_html.html
      }
    },
    device_styles() {
      return {
        transform: `scale(${this.size / 100})`
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

.scale {
  position: absolute;
  top: 10px;
  left: 10px;

  input {
    height: 100px;
    width: 10px;
    writing-mode: bt-lr;
    -webkit-appearance: slider-vertical;
  }
}
</style>
