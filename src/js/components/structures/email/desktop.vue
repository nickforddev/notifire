<template>
  <div class="container">
    <div class="header">
      <div class="sender">{{ globals.app_name }}</div>
      <div class="subject">{{ data.subject }}</div>
    </div>
    <iframe ref="iframe" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    data: [Object, String]
  },
  mounted() {
    this.render(this.data.html)
  },
  watch: {
    data(value) {
      this.render(value.html)
    }
  },
  computed: {
    ...mapGetters([
      'globals'
    ])
  },
  methods: {
    render(html) {
      const iframe = this.$refs.iframe
      const doc = iframe.contentDocument || iframe.contentWindow.document
      doc.body.innerHTML = html || ''
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/modules/mixins';

$header-height: 32px;
.container {
  height: 100%;
}
.header {
  display: block;
  height: $header-height;
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid grey;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 0.8em;
  text-align: left;
  
  .sender {
    margin-top: 0;
    margin-bottom: 3px;
    font-weight: bold;
  }
}
iframe {
  width: 100%;
  height: calc(100% - #{$header-height});
  border-width: 0;
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
</style>