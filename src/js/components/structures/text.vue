<template>
  <div class="container">
    <phone>
      <iframe ref="iframe" />
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
    ...mapGetters([
      'renderer_html'
    ])
  },
  watch: {
    renderer_html(value) {
      const iframe = this.$refs.iframe
      const doc = iframe.contentDocument || iframe.contentWindow.document
      doc.body.innerHTML = anchorme(value.html)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.container {
  height: 100%;
  background: #1e1e1e;
}
iframe {
  width: 100%;
  height: 100%;
  border-width: 0;
  background: red;
}
</style>