<template>
  <div class="loader-container">
    <div class="loader" v-if="visible">
      <div class="sk-fading-circle">
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { sleep } from '@/utils'

export default {
  name: 'loading',
  data() {
    return {
      visible: false
    }
  },
  async mounted() {
    await sleep(300)
    this.visible = true
  },
  watch: {
    visible(val) {
      if (val) {
        document.body.classList.add('lock')
      } else {
        document.body.classList.remove('lock')
      }
    }
  },
  beforeDestroy() {
    document.body.classList.remove('lock')
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.loader-container {
  // position: fixed;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;

  .loader {
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    background: rgba(0,0,0, 0.6);
    border-radius: 5px;
    transform: translateX(-50%) translateY(-50%);
  }

  .sk-fading-circle {
    width: 40px;
    height: 40px;
    position: relative;
    margin: 10px;
  }

  .sk-fading-circle .sk-circle {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .sk-fading-circle .sk-circle:before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: #fff;
    border-radius: 100%;
    animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
  }
  .sk-fading-circle .sk-circle2 {
    transform: rotate(30deg);
  }
  .sk-fading-circle .sk-circle3 {
    transform: rotate(60deg);
  }
  .sk-fading-circle .sk-circle4 {
    transform: rotate(90deg);
  }
  .sk-fading-circle .sk-circle5 {
    transform: rotate(120deg);
  }
  .sk-fading-circle .sk-circle6 {
    transform: rotate(150deg);
  }
  .sk-fading-circle .sk-circle7 {
    transform: rotate(180deg);
  }
  .sk-fading-circle .sk-circle8 {
    transform: rotate(210deg);
  }
  .sk-fading-circle .sk-circle9 {
    transform: rotate(240deg);
  }
  .sk-fading-circle .sk-circle10 {
    transform: rotate(270deg);
  }
  .sk-fading-circle .sk-circle11 {
    transform: rotate(300deg);
  }
  .sk-fading-circle .sk-circle12 {
    transform: rotate(330deg);
  }
  .sk-fading-circle .sk-circle2:before {
    animation-delay: -1.1s;
  }
  .sk-fading-circle .sk-circle3:before {
    animation-delay: -1s;
  }
  .sk-fading-circle .sk-circle4:before {
    animation-delay: -0.9s;
  }
  .sk-fading-circle .sk-circle5:before {
    animation-delay: -0.8s;
  }
  .sk-fading-circle .sk-circle6:before {
    animation-delay: -0.7s;
  }
  .sk-fading-circle .sk-circle7:before {
    animation-delay: -0.6s;
  }
  .sk-fading-circle .sk-circle8:before {
    animation-delay: -0.5s;
  }
  .sk-fading-circle .sk-circle9:before {
    animation-delay: -0.4s;
  }
  .sk-fading-circle .sk-circle10:before {
    animation-delay: -0.3s;
  }
  .sk-fading-circle .sk-circle11:before {
    animation-delay: -0.2s;
  }
  .sk-fading-circle .sk-circle12:before {
    animation-delay: -0.1s;
  }

  @-webkit-keyframes sk-circleFadeDelay {
    0%, 39%, 100% { opacity: 0; }
    40% { opacity: 1; }
  }

  @keyframes sk-circleFadeDelay {
    0%, 39%, 100% { opacity: 0; }
    40% { opacity: 1; }
  }
}
</style>
