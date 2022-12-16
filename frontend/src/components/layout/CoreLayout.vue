<template>
  <div id="layout--core" class="h-screen w-screen flex">
    <div class="w-1/5">
      <div class="fixed w-1/5">
        <LayoutSidebar />
      </div>
    </div>
    <main class="flex-1">
      <div class="p-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import LayoutSidebar from '@/components/layout/LayoutSidebar.vue'

export default Vue.extend({
  components: {
    LayoutSidebar
  }
})
</script>
