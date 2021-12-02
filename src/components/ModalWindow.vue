<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ModalComp',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'update:modelValue'],
  methods: {
    close () {
      this.$emit('update:modelValue', false)
      this.$emit('close')
    }
  }
})
</script>

<template>
  <transition name="modal-fade">
    <div
      class="modal-backdrop"
      @click="close"
    >
      <div
        class="modal"
        @click.stop
      >
        <div class="modal-close"  @click="close">X</div>
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<style  scoped>
@import '../design/index.css';
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.modal {
  background: var(--light-bg);
  padding: 30px ;
  position: relative;
  border-radius: 8px;
}
.modal-fade-enter,
.modal-fade-leave-to {
  transition: opacity .5s ease;
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
.modal-close {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
