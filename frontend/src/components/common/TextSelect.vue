<template>
  <label class="text--select block my-2">
    <span class="block text-gray-600 text-sm font-semibold mb-2">
      {{ label }}
    </span>
    <select
      v-model="model"
      :class="{
        'cursor-not-allowed': disabled
      }"
      :disabled="disabled"
      class="h-10 shadow border rounded w-full pl-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
      @change="handleChange"
    >
      <option
        v-for="(item, i) in items"
        :key="`select-item_${key}_${i ?? item}`"
        :selected="item === model"
        :value="item"
      >
        {{ i ?? item }}
      </option>
    </select>
  </label>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  data: () => ({
    key: Math.random().toString(36).slice(2)
  }),
  props: {
    disabled: { type: Boolean, default: false },
    items: {
      type: Object as PropType<Record<string, string | number>>,
      required: true
    },
    label: { type: String, default: '' },
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

<style lang="scss">
.text--select {
  select {
    text-overflow: ellipsis;
  }
}
</style>
