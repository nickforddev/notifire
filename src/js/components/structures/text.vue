<template>
  <div class="container">
    <phone>
      <lock-screen :data="text_data" />>
    </phone>
  </div>
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
.container {
  height: 100%;
  background: #1e1e1e;
}
</style>
