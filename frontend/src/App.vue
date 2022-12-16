<template>
  <CoreLayout>
    <router-view v-if="!apiIsLoading" />
  </CoreLayout>
</template>

<script lang="ts">
import Vue from 'vue'

import CoreLayout from '@/components/layout/CoreLayout.vue'
import { actionTypes } from '@/store/actions'

export default Vue.extend({
  components: {
    CoreLayout
  },
  computed: {
    apiIsLoading(): boolean {
      return this.$store.state.currentRestaurant.isLoading
    }
  },
  async mounted(): Promise<void> {
    await this.initialHydration()
  },
  methods: {
    async initialHydration(): Promise<void> {
      await this.$store.dispatch(actionTypes.getCurrentRestaurant)
    }
  }
})
</script>
