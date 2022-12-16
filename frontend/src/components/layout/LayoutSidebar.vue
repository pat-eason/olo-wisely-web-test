<template>
  <section id="layout--sidebar" class="py-2 h-screen flex flex-col">
    <div class="flex-none text-center w-full">
      <img
        :src="require('@/assets/img/wisely-logo.png')"
        alt="Wisely logo"
        class="inline h-12 m-2"
      />
    </div>
    <div
      class="bg-sky-50 h-full w-full rounded-tr-xl rounded-br-xl flex-1 flex flex-col overflow-hidden"
    >
      <div class="flex-1 py-4">
        <LayoutNavigation />
      </div>
      <div
        v-if="restaurantName || restaurantAddress"
        class="flex-none bg-sky-200 text-center p-4"
      >
        <p class="text-sm text-sky-800">
          {{ restaurantName }}
          <span class="block text-xs text-sky-700">
            {{ restaurantAddress }}
          </span>
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import LayoutNavigation from '@/components/layout/LayoutNavigation.vue'
import { RestaurantEntity } from '@/api/types/RestaurantEntity'

export default Vue.extend({
  components: {
    LayoutNavigation
  },
  computed: {
    currentRestaurantRecord(): RestaurantEntity | null {
      return this.$store.state.currentRestaurant.data
    },
    restaurantName(): string {
      return this.currentRestaurantRecord?.name ?? ''
    },
    restaurantAddress(): string {
      return this.currentRestaurantRecord?.address ?? ''
    }
  }
})
</script>
