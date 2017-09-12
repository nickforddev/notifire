<template>
  <div class="modal-container">
    <div class="modal">
      <loading v-if="loading" />
      <div class="header">
        <slot name="header">
          <h1>Please confirm</h1>
        </slot>
      </div>
      <div class="content">
        <slot name="body">
          body goes here
        </slot>
      </div>
      <div class="footer">
        <div class="actions">
          <button @click="cancel">{{ cancel_label }}</button>
          <button @click="validate" v-if="confirm">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'modal',
  props: {
    confirm: Function
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    has_confirm() {
      return 'confirm' in this
    },
    cancel_label() {
      return this.has_confirm
        ? 'Cancel'
        : 'OK'
    },
    confirm_label() {
      return 'OK'
    }
  },
  methods: {
    async validate(e) {
      this.loading = true
      try {
        if (this.confirm) {
          await this.confirm()
          this.close()
        }
      } catch (err) {
        console.warn(err)
      } finally {
        this.$emit('complete')
        this.loading = false
      }
    },
    cancel() {
      this.close()
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/modules/mixins';
.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0, 0.6);
  z-index: 99999;

  .modal {
    @include absolute_center;
    width: 600px;
    max-width: 100%;
    background: white;
    border-radius: 5px;
    text-align: left;
  }

  .header {
    padding: 0 20px;
    border-bottom: 1px solid grey;

    h1 {
      font-size: 1.1em;
    }
  }

  .footer {
    padding: 10px 20px;
    border-top: 1px solid grey;
    text-align: right;

    .actions {
      display: inline-block;
    }
  }

  .content {
    padding: 20px;
  }
}
</style>