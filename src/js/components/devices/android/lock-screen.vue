<template>
  <div class="lock-screen">
    <div class="info">
      <div class="time">
        <div class="hours">{{ time_hours }}</div>
        <div class="minutes">{{ time_minutes }}</div>
      </div>
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
            <div class="status">08:02</div>
          </div>
        </div>
        <div class="main">
          <div class="sender" v-if="data.sender">{{ data.sender }}</div>
          <div class="message" v-html="data.message"></div>
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
    time_hours() {
      return this.date.format('hh')
    },
    time_minutes() {
      return this.date.format('mm')
    },
    date_string() {
      return this.date.format('ddd d MMM, YYYY')
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
$push-border-radius: 2px;

// .container {
//   height: 100%;
//   background: #1e1e1e;
//   font-family: 's8clock';
// }
.lock-screen {
  color: white;
}
.info {
  position: absolute;
  top: 50px;
  width: 100%;

  .time {
    font-family: 's8clock';
    font-size: 5em;
    font-weight: 100;
  }

  .date {
    font-size: 1.3em;
  }
}
.push-container {
  position: absolute;
  top: 280px;
  width: 100%;

  .push {
    margin: 4px;
    background: rgba(255,255,255, 1);
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
      // background: rgba(255,255,255, 0.2);
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
        margin-right: 8px;
        color: #333;
        // text-transform: uppercase;
      }
      
      .status {
        margin-top: 2px;
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
    // .call-to-action {
    //   margin-top: 2px;
    //   color: $color-push-meta;
    //   font-size: 0.8em;
    //   font-weight: 500;
    // }
  }
}
</style>