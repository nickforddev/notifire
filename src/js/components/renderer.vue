<template>
  <div class="content">
    <component :is="`${active_editor_group_type}_view`" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import email_view from '@/components/structures/email'
import push_view from '@/components/structures/push'
import text_view from '@/components/structures/text'

export default {
  name: 'renderer',
  computed: {
    ...mapGetters([
      'active_editor_group_type'
    ])
  },
  components: {
    email_view,
    push_view,
    text_view
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