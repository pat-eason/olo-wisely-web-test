<template>
  <h1 class="text-3xl font-semibold border-b text-slate-600 mb-2 pb-2">
    <font-awesome-icon v-if="icon" :icon="icon" class="pr-4" />
    <slot />
  </h1>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    icon: { type: String, default: '' }
  }
})
</script>
