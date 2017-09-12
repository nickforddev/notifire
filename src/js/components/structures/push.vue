<template>
  <div class="container">
    <iphone>
      <iphone-lock-screen :data="push_data" />
    </iphone>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'push',
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
