<template>
 <div class="tabs-list">
   <div :class="{'tab-item':true,  active: tab.id === activeId}" 
        v-for="(tab, i) in list" 
        :key="i+'tab'" 
        @click="setTab(tab)">
     {{tab.label}}
   </div>
 </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export type Tab = {
  label: string;
  id: string;
  alias: string;
}
export default defineComponent({
  name: 'TabsList',
  props: {
    list: {
      type: Array as PropType<Tab[]>,
      default: () => []
    },
    active: {
      type: String,
      default: ''
    }
  },
  emits: ['change'],
  data () {
    return {
      activeId: this.list[0].id
    }
  },
  watch: {
    active(val) {
      this.activeId = val
    }
  },
  methods: {
    setTab (val:Tab) {
      this.activeId = val.id
      this.$emit('change', val)
    }
  }
});
</script>

<style scoped>
.tabs-list {
  --border-width: 2px;
  width: 100%;
  display: flex;
  border-bottom: var(--border-width) solid var(--border-color);
  font-size: 1.2rem;
} 
.tab-item {
  --af-width: 0;
  margin-right: 30px;
  padding: 15px 10px;
  position: relative;
  cursor: pointer;
  color: var(--sub-text-color);
  font-weight: 600;
}
.tab-item.active {
  --af-width: 100%;
}
.tab-item::after {
  content: '';
  position: absolute;
  bottom: calc( -1 * var(--border-width));
  left: 0;
  width: var(--af-width);
  height: 2px;
  background: var(--accent-color);
  transition: width 0.5s ease;
}
</style>