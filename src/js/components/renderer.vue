<template>
  <div class="content">
    <div class="error-message" v-if="renderer_error">{{ renderer_error }}</div>
    <component :is="`${active_editor_group_type}_view`" v-if="active_editor_group_type" />
    <div v-else class="no-content">
      
      <div class="icon">
        <svg viewBox="0 0 55.475 100">
          <rect y="22.815" width="12.191" height="11.407"></rect>
          <rect y="66.719" width="12.191" height="11.408"></rect>
          <path d="M55.301,0c-6.105,10.64-10.072,18.472-11.9,23.496c-2.761,7.639-4.143,16.466-4.143,26.478
        c0,10.117,1.576,19.362,4.726,27.735c1.945,5.163,5.774,12.593,11.491,22.291h-7.058c-5.678-7.954-9.198-13.03-10.56-15.228
        c-1.361-2.198-2.839-5.18-4.434-8.948c-2.178-5.163-3.694-10.675-4.55-16.535c-0.428-3.036-0.64-5.931-0.64-8.688
        c0-10.326,1.807-19.519,5.423-27.577C35.952,17.896,40.735,10.221,48.008,0H55.301z"></path>
        </svg>
      </div>

      <h2>No content to renderer</h2>
      <div class="description">
        Please select a template to render it
      </div>
    </div>
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
.no-content {
  margin-top: 130px;
}
.icon {
  display: inline-block;
  width: 40px;
}
</style>