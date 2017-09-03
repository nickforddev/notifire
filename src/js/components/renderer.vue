<template>
  <div class="content">
    <component :is="renderer_type" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import email from '@/components/structures/email'

export default {
  name: 'renderer',
  computed: {
    ...mapGetters([
      'renderer_type'
    ])
  },
  components: {
    email
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.content {
  position: relative;
  width: 50%;
  height: 100vh;
  float: left;
}
</style>