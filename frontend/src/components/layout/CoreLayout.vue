<template>
  <div id="layout--core" class="h-screen w-screen flex flex-col md:flex-row">
    <div class="md:w-64">
      <div class="md:fixed md:w-64">
        <LayoutSidebar />
      </div>
    </div>
    <main class="flex flex-col flex-1">
      <div class="flex-1 container mx-auto">
        <div class="p-6">
          <slot />
        </div>
      </div>
      <footer class="flex-none border-t mx-4 p-4 text-right">
        <p class="text-slate-500 text-sm">Made for 🦉 by Pat Eason</p>
      </footer>
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
