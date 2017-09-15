<template>
  <galaxy>
    <android-lock-screen :data="text_data" />
  </galaxy>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import anchorme from 'anchorme'
import { mapGetters } from 'vuex'

export default {
  name: 'text',
  computed: {
    text_data() {
      return {
        app: 'Messages',
        sender: 'Rafi Payment',
        message: this.anchored
      }
    },
    anchored() {
      const data = this.renderer_html.html
      if (data) {
        return anchorme(this.renderer_html.html)
      }
    },
    ...mapGetters([
      'renderer_html'
    ])
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
</style>
