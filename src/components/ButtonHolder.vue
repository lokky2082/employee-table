<template>
 <div class="button-holder">
    <button>
      <slot></slot>
    </button>
 </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardLayer',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style scoped>
  button {
    border: none;
    padding: 12px 15px;
    color: var(--light-text);
    background: var(--accent-color);
    border-radius: 8px;
    font-size: 0.9rem;
    cursor: pointer;
  }
</style>