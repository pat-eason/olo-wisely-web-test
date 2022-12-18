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
      :max="max"
      :min="min"
      :placeholder="placeholder"
      :type="type"
      class="h-10 shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      @change="handleChange"
    />
  </label>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

type inputType = 'email' | 'number' | 'tel' | 'text'

export default Vue.extend({
  props: {
    disabled: { type: Boolean, default: false },
    label: { type: String, default: '' },
    max: { type: Number },
    min: { type: Number, default: 1 },
    placeholder: { type: String, default: '' },
    type: { type: String as PropType<inputType>, default: 'text' },
    value: { type: [String, Number], default: null }
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
