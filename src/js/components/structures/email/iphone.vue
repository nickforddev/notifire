<template>
  <div class="container">
    <iphone>
      <div class="header">
        <div class="sender">{{ globals.app_name }}</div>
        <div class="receiver">To: <span>{{ globals.receiver_name }}</span></div>

        <div class="divider"></div>

        <div class="subject">{{ data.subject }}</div>
        <div class="time">{{ received }}</div>

        <div class="divider"></div>
        
      </div>
      <iframe ref="iframe" />
    </iphone>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
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
    received() {
      return moment.utc().format('dddd, MMMM d, h:mma')
    },
    ...mapGetters([
      'globals'
    ])
  },
  methods: {
    render(html) {
      const iframe = this.$refs.iframe
      const doc = iframe.contentDocument || iframe.contentWindow.document
      doc.body.innerHTML = html
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/modules/mixins';
@import '~%/modules/colors';

$header-height: 124px;

.container {
  height: 100%;
  // height: calc(100% - #{$header-height});
  background: $color-renderer-background;
}
.header {
  display: block;
  height: $header-height;
  text-align: left;
  padding: 10px;
  // border-bottom: 1px solid grey;
  background: white;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: 0.8em;

  .sender, .subject {
    margin-top: 0;
    margin-bottom: 3px;
    font-weight: bold;
    font-size: 1.1em;
  }

  .receiver {
    font-size: .9em;

    span {
      color: grey;
    }
  }

  .time {
    color: grey;
  }

  .divider {
    border-top: 1px solid #cdcdcd;
    margin: 14px 0;
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