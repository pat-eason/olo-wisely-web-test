<template>
  <label class="text-field block my-2">
    <span class="block text-gray-600 text-sm font-semibold mb-2">
      {{ label }}
    </span>
    <input
      v-model="model"
      :class="{
        'cursor-not-allowed': disabled
      }"
      :disabled="disabled"
      :placeholder="placeholder"
      class="h-10 shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      @change="handleChange"
    />
  </label>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    disabled: { type: Boolean, default: false },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    value: { type: String, default: '' }
  },
  computed: {
    model: {
      get(): string {
        return this.value
      },
      set(newValue: string): void {
        this.$emit('input', newValue)
      }
    }
  },
  methods: {
    handleChange(e: Event) {
      this.$emit('change', e)
    }
  }
})
</script>
