<template>
  <div class="container">
    <div class="subject" v-html="renderer_html.subject"></div>
    <iframe ref="iframe" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'email',
  computed: {
    ...mapGetters([
      'renderer_html'
    ])
  },
  watch: {
    renderer_html(value) {
      const iframe = this.$refs.iframe
      const doc = iframe.contentDocument || iframe.contentWindow.document
      doc.body.innerHTML = value.html
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.container {
  height: 100%;
}
iframe {
  width: 100%;
  height: 100%;
  border-width: 0;
}
</style>