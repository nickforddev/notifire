<template>
  <!-- <transition name="fade-in-only"> -->
    <div class="validation container" v-show="errors.has(name)" @click="hide($event, name)">
      <span class="error">
        {{ errors.first(name) }}
      </span>
    </div>
  <!-- </transition> -->
</template>

<script>
export default {
  name: 'validation',
  props: {
    name: String,
    errors: Object
  },
  methods: {
    hide(e, name) {
      this.errors.remove(name)
    }
  },
  beforeCreate() {
    // HACK: vee-validate creates an instance of itself on all nested components
    // so this.errors is conflicting between the prop and the computed property
    delete this.$options.computed.errors
  }
}
</script>

<style scoped lang="scss">
@import '~%/modules/colors';

.container {
  position: absolute;
  display: inline-block;
  top: 100%;
  right: 0;
  text-align: right;
  z-index: 9;
}

span {
  &.error {
    position: relative;
    display: inline-block;
    top: 8px;
    color: $color-text-light;
    background: $color-status-danger;
    padding: 6px 8px;
    font-size: 0.8em;
    border-radius: 4px;
    text-align: center;
    box-shadow: 0 2px 3px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1);

    &:after {
      content: '';
      display: block;
      position: absolute;
      bottom: 100%;
      right: 10px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 8px 8px 8px;
      border-color: transparent transparent $color-status-danger transparent;
    }
  }
}
</style>
