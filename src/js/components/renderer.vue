<template>
  <div class="content">
    <div class="error-message" v-if="renderer_error">{{ renderer_error }}</div>
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
      'renderer_error',
      'active_editor_group_type'
    ])
  },
  components: {
    email_view,
    push_view,
    text_view
  },
  mounted() {
    this.$store.dispatch('get_globals')
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/modules/mixins';

.content {
  position: relative;
  width: 50%;
  height: 100vh;
  float: left;
}
.error-message {
  @include absolute_fill;
  padding: 30px;
  background: rgba(0,0,0, 0.75);
  color: white;
}
</style>