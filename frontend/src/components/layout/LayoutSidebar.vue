<template>
  <section id="layout--sidebar" class="py-2 h-screen">
    <div class="text-center w-full">
      <img
        :src="require('@/assets/img/wisely-logo.png')"
        alt="Wisely logo"
        class="inline h-12 m-2"
      />
    </div>
    <div class="bg-sky-50 h-full w-full rounded-tr-xl rounded-br-xl">
      <div class="py-4">
        <LayoutNavigation />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import LayoutNavigation from '@/components/layout/LayoutNavigation.vue'

export default Vue.extend({
  components: {
    LayoutNavigation
  }
})
</script>
