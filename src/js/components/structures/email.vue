<template>
  <div class="container">
    <div class="subject" v-html="renderer_html.subject"></div>
    <div class="mask"></div>
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
@import '~%/modules/mixins';

$subject-height: 32px;
.container {
  height: calc(100% - #{$subject-height});
}
.subject {
  display: block;
  height: $subject-height;
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid grey;
}
iframe {
  width: 100%;
  height: 100%;
  border-width: 0;
}
.mask {
  @include block_psuedo;
  top: 0;
  bottom: 0;
  width: 150px;
  position: absolute;
  // background: blue;
  margin-left: 12px;
  opacity: 0;
}
</style>