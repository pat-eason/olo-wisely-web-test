<template>
  <button
    class="px-5 py-2 rounded-lg text-white transition duration-200 hover:shadow bg-sky-500"
    :class="{
      'bg-sky-500': color === 'sky',
      'bg-slate-500': color === 'slate',
      'bg-rose-500': color === 'rose',
      'bg-amber-500': color === 'amber',
      'bg-emerald-500': color === 'emerald'
    }"
    :type="type"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export type ButtonType = 'button' | 'submit'

export type ButtonColor = 'sky' | 'slate' | 'rose' | 'amber' | 'emerald'

export default Vue.extend({
  name: 'flare-button',
  props: {
    block: { type: Boolean, default: false },
    color: { type: String as PropType<ButtonColor>, default: 'sky' },
    type: { type: String as PropType<ButtonType>, default: 'button' }
  }
})
</script>
