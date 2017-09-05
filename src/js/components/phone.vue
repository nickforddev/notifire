<template>
  <div class="phone">
    <div class="outer">
      <div class="strips"/>
      <div class="buttons">
        <div class="sleep"></div>
        <div class="volume"></div>
        <div class="lock"></div>
      </div>
      <div class="inner">
        <div class="top">
          <div class="cam"></div>
          <div class="speaker"></div>
        </div>
        <div class="content">
          <slot />
        </div>
        <div class="bottom">
          <div class="button"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'phone'
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
$color-phone-background: #080808;
$color-phone-edge-background: #464646;
$color-phone-camera-background: #292728;
$color-phone-speaker-background: #292728;
$color-phone-buttons: #464646;
$phone-border-radius: 50px;
$phone-camera-diameter: 14px;
$phone-button-diameter: 60px;
$phone-width: 382px;
$phone-height: 824px;

@mixin absolute_center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}

@mixin absolute_fill {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

@mixin block_psuedo {
  content: '';
  display: block;
}

.phone {
  position: relative;
  top: 30px;
  width: $phone-width;
  margin: 0 auto;
}

.outer {
  position: relative;
  height: $phone-height;
  background: $color-phone-edge-background;
  border-radius: $phone-border-radius + 6px;
  box-shadow: inset 0 0 3px 0 rgba(0,0,0,0.7);

  .strips {
    @include absolute_fill;

    &:before {
      @include block_psuedo;
      position: absolute;
      height: 14px;
      width: 100%;
      background: #212121;
      top: 80px;
    }

    &:after {
      @include block_psuedo;
      position: absolute;
      height: 14px;
      width: 100%;
      background: #212121;
      bottom: 80px;
    }
  }

  .buttons {
    @include absolute_fill;

    div {
      position: absolute;
      background: $color-phone-buttons;
      z-index: 0;
      border-radius: 2px 0px 0px 2px;
    }

    .sleep {
      top: 190px;
      right: -4px;
      width: 4px;
      height: 66px;
      border-radius: 0px 2px 2px 0px;
    }

    .volume {
      @include absolute_fill;
      background: transparent;
      
      &:before {
        @include block_psuedo;
        position: absolute;
        left: -4px;
        top: 188px;
        height: 66px;
        width: 4px;
        background: $color-phone-buttons;
      }

      &:after {
        @include block_psuedo;
        position: absolute;
        left: -4px;
        top: 268px;
        height: 66px;
        width: 4px;
        background: $color-phone-buttons;
      }
    }

    .lock {
      position: absolute;
      left: -3px;
      top: 116px;
      height: 40px;
      width: 2px;
      border-radius: 2px 0px 0px 2px;
      display: block;
    }
  }
}

.inner {
  @include absolute_center;
  width: $phone-width - 14px;
  height: $phone-height - 14px;
  background: $color-phone-background;
  border-radius: $phone-border-radius;

  &:after {
    @include absolute_center;
    @include block_psuedo;
    height: calc(100% - 6px);
    width: calc(100% - 6px);
    border-radius: $phone-border-radius - 4px;
    box-shadow: inset 0 0 3px 0 rgba(0,0,0,0.1), inset 0 0 6px 3px #212121;
  }
}

.content {
  height: 575px;
  padding: 10px;
}

.top {
  position: relative;
  height: 100px;
  border-top-left-radius: $phone-border-radius;
  border-top-right-radius: $phone-border-radius;

  .cam {
    @include absolute_center;
    background: $color-phone-camera-background;
    height: $phone-camera-diameter;
    width: $phone-camera-diameter;
    border-radius: 100%; 
    margin-top: 14px;
    margin-left: -60px;

    &:before {
      @include absolute_center;
      @include block_psuedo;
      height: $phone-camera-diameter / 2;
      width: $phone-camera-diameter / 2;
      background: radial-gradient(#697173, #000000);
      border-radius: 100%;
    }
  }

  .speaker {
    @include absolute_center;
    height: 6px;
    width: 70px;
    border-radius: 8px;
    background: $color-phone-speaker-background;
    margin-top: 14px;
  }
}
.bottom {
  position: relative;
  height: 115px;
  border-bottom-left-radius: $phone-border-radius;
  border-bottom-right-radius: $phone-border-radius;

  .button {
    @include absolute_center;
    border-radius: 100%;
    height: $phone-button-diameter;
    width: $phone-button-diameter;
    background: $color-phone-background;
    background: linear-gradient(135deg, #080808 0%, #464646 50%, #080808 100%);
    margin-top: -10px;

    &:before {
      @include block_psuedo;
      background: $color-phone-background;
      position: absolute;
      border-radius: 100%;
      width: calc(100% - 8px);
      height: calc(100% - 8px);
      top: 4px;
      left: 4px;
    }
  }
}
</style>