<template>
 <div class="card-layer" :class="{'card-layer__active': active}">
   <slot></slot>
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
  .card-layer {
    padding: 15px;
    background: var(--light-bg);
    border-radius: 6px;
    box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.1);
  }
  .card-layer__active {
    cursor: pointer;
  }
  .card-layer__active:hover {
    box-shadow: 0px 0px 8px 4px rgba(34, 60, 80, 0.1);
  }
</style>