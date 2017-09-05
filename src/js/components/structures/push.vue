<template>
  <div class="container">
    <phone>
      <lock-screen :data="push_data" />>
    </phone>
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

<style>

</style>
