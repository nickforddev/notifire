<template>
  <div class="lock-screen">
    <div class="info">
      <div class="time">{{ time }}</div>
      <div class="date">{{ date_string }}</div>
    </div>
    <div class="push-container">
      <div class="push">
        <div class="header">
          <div class="app-info">
            <div class="icon">
              <img :src="app_icon_path" />
            </div>
            <div class="title">{{ data.app }}</div>
          </div>
          <div class="status">now</div>
        </div>
        <div class="main">
          <div class="sender" v-if="data.sender">{{ data.sender }}</div>
          <div class="message" v-html="data.message"></div>
          <div class="call-to-action">Slide for more</div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { filters } from '@/modules/filters'

export default {
  props: {
    data: Object
  },
  name: 'android-lock-screen',
  created() {
    this.interval = setInterval(() => {
      this.date = moment()
    }, 1000)
  },
  data() {
    return {
      app_name: 'Rafi Payment',
      date: moment(),
      interval: null
    }
  },
  computed: {
    app_icon_path() {
      const path = filters.lowercase(this.data.app)
      return `/static/icons/app-${filters.replace(path, ' ', '-')}.png`
    },
    time() {
      return this.date.format('h:mm')
    },
    date_string() {
      return this.date.format('dddd, MMMM d')
    },
    ...mapGetters([
      'renderer_html'
    ])
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/modules/mixins';

$color-push-meta: #3d7c8c;
$push-border-radius: 10px;

.container {
  height: 100%;
  background: #1e1e1e;
}
.lock-screen {
  color: white;
}
.info {
  position: absolute;
  top: 70px;
  width: 100%;

  .time {
    font-size: 5em;
    font-weight: 100;
  }

  .date {
    font-size: 1.3em;
  }
}
.push-container {
  position: absolute;
  top: 220px;
  width: 100%;

  .push {
    margin: 4px;
    background: rgba(255,255,255, 0.7);
    color: #111;
    border-radius: $push-border-radius;
    text-align: left;
    overflow: hidden;

    .header {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      font-size: 0.8em;
      font-weight: 500;
      background: rgba(255,255,255, 0.2);
      color: $color-push-meta;

      > div {
        margin: 10px;
      }

      .app-info {
        @include clear;
        vertical-align: middle;
      }

      .icon {
        float: left;
        width: 18px;
        height: 18px;
        margin-right: 8px;

        img {
          width: 100%;
        }
      }

      .title {
        float: left;
        margin-top: 2px;
        text-transform: uppercase;
      }
      
      .status {
        display: inline-block;
      }
    }
    .main {
      padding: 14px;
      font-size: 0.9em;
    }
    .sender {
      font-weight: bold;
    }
    .call-to-action {
      margin-top: 2px;
      color: $color-push-meta;
      font-size: 0.8em;
      font-weight: 500;
    }
  }
}
</style>