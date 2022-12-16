<template>
  <div id="layout--core" class="h-screen w-screen flex">
    <div class="w-64">
      <div class="fixed w-64">
        <LayoutSidebar />
      </div>
    </div>
    <main class="flex-1">
      <div class="container mx-auto">
        <div class="p-6">
          <slot />
        </div>
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
