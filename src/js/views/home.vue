<template>
  <main>
    <tree-view />
    <content-view />
  </main>
</template>

<!-- /////////////////////////////////////////////////////////////////////// -->

<script>
export default {
  name: 'home'
}
</script>

<!-- /////////////////////////////////////////////////////////////////////// -->

<style scoped lang="scss">
@import '~%/modules/mixins';

main {
  @include clear;
}
</style>
