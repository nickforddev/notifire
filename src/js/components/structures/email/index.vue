<template>
  <div class="container">
    <div class="mask" />
    <component :is="type" :data="renderer_html"/>
    <div class="menu">
      <select v-model="type">
        <option value="desktop">Desktop</option>
        <option value="iphone">iPhone</option>
        <option value="android">Android</option>
      </select>
      <div class="sender">
        <button @click="toggleModal">Send Test</button>
        <modal v-if="modal_visible" @close="closeModal" :confirm="confirmModal">
          <h1 slot="header">Send a test email</h1>
          <div slot="body">
            <div class="field-group">
              <legend>From</legend>
              <input type="text" v-model="from" v-validate="'required|email'" name="from">
              <validation name="from" :errors="errors" />
            </div>
            <div class="field-group">
              <legend>To</legend>
              <input type="text" v-model="to" v-validate="'required|email'" name="to">
              <validation name="to" :errors="errors" />
            </div>
          </div>
        </modal>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { mapGetters } from 'vuex'
import { Request } from '@/utils'

import desktop from './desktop'
import iphone from './iphone'
import android from './android'

export default {
  name: 'email',
  data() {
    return {
      type: 'desktop',
      modal_visible: false,
      to: 'nford@rafiproperties.com',
      from: 'test@rafiproperties.com'
    }
  },
  computed: {
    ...mapGetters([
      'renderer_html'
    ])
  },
  methods: {
    toggleModal() {
      this.modal_visible = !this.modal_visible
    },
    closeModal() {
      this.toggleModal()
    },
    async confirmModal() {
      const pass = await this.$validator.validateAll()
      if (pass) {
        await this.sendEmail()
        return Promise.resolve()
      } else {
        return Promise.reject()
      }
    },
    async sendEmail() {
      const data = this.renderer_html
      const subject = data.subject
      const body = data.html
      const to = this.to
      const from = this.from

      await Request('send', {
        method: 'post',
        data: {
          to,
          from,
          subject,
          body
        }
      })
      alert(`Successfully sent email to ${to}`)
    }
  },
  components: {
    desktop,
    iphone,
    android
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/modules/mixins';

$subject-height: 32px;
.container {
  height: 100%;
}
.mask {
  @include block_psuedo;
  top: 0;
  bottom: 0;
  width: 150px;
  position: absolute;
  margin-left: 12px;
  opacity: 0;
}
.menu {
  position: absolute;
  top: 10px;
  right: 10px;
}
.sender {
  margin-top: 6px;
}
</style>