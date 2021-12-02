<template>
  <div class="input-comp">
    <label
      v-if="label && label !== ''"
      :id="uuid"
    >{{ label }}</label>
    <div
      class="input-comp__line"
    >
      <input
        v-bind="$attrs"
        :id="uuid"
        :value="modelValue"
        @input="onInput"
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import addUUID from '../features/addUUID'
export default defineComponent({
  name: 'InputComp',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup (props) {
    const { uuid } = addUUID()
    return {
      uuid
    }
  },
  data () {
    return {
      isFocused: false,
      innerValue: this.modelValue
    }
  },
  methods: {
    onInput (ev:InputEvent) {
      const target = ev.target as HTMLInputElement
      if (target) {
        this.$emit('update:modelValue', target.value)
      }
    }
  }
})
</script>

<style scoped>
@import '../design/index.css';
@import '../design/inputvars.css';

.input-comp {
  width: 100%;
  margin-bottom: var(--input-margin-bottom);
}
.input-comp label {
  font-size: 0.9rem;
  line-height: 1;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 8px;
  display: inline-block;
  position: relative;
  color: var(--sub-text-color);
}
.input-comp__line {
  height: var(--input-height);
  box-sizing: border-box;
  border: var(--input-border);
  border-radius: var(--input-radius);
  transition: all 0.3s linear;
  display: flex;
  align-items: center;
  padding: 1px 15px;
  position: relative;
  width: 100%;
  line-height: 0;
}

.input-comp__line input {
  outline: none;
  border: none;
  width: 100%;
  background: none;
  padding: 0;
}

.input-comp__line-focus {
  border-color: var(--input-focus-border);
}
.input-comp__line input::placeholder,
{
  color: var(--input-placeholder-color);
}
</style>
