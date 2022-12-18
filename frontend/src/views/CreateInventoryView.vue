<template>
  <div id="view--create-inventory">
    <PageTitle> Create Inventory </PageTitle>

    <CreateInventoryForm
      :currentRestaurantId="currentRestaurant.id"
      :disabled="apiIsLoading"
      @submit="createInventory"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { RestaurantEntity } from '@/api/types/RestaurantEntity'
import PageTitle from '@/components/common/PageTitle.vue'
import CreateInventoryForm from '@/components/CreateInventoryForm.vue'
import { ROUTE_NAME_INVENTORY } from '@/router/constants'
import { actionTypes } from '@/store/actions'
import { CreateInventoryModel } from '@/types/CreateInventoryModel'

export default Vue.extend({
  components: { CreateInventoryForm, PageTitle },
  computed: {
    apiIsLoading(): boolean {
      return this.$store.state.createReservation.isLoading
    },
    currentRestaurant(): RestaurantEntity {
      return this.$store.state.currentRestaurant.data
    }
  },
  methods: {
    async createInventory(model: CreateInventoryModel): Promise<void> {
      await this.$store.dispatch(actionTypes.createInventory, model)
      if (!this.$store.state.createReservation.error) {
        await this.$router.push({
          name: ROUTE_NAME_INVENTORY,
          query: { createSuccess: '1' }
        })
      }
    }
  }
})
</script>
