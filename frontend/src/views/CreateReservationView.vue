<template>
  <div id="view--create-reservation">
    <PageTitle> Create Reservation </PageTitle>

    <CreateReservationForm
      :currentRestaurantId="currentRestaurant.id"
      :disabled="apiIsLoading"
      @submit="createReservation"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { RestaurantEntity } from '@/api/types/RestaurantEntity'
import CreateReservationForm from '@/components/CreateReservationForm.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import { CreateReservationModel } from '@/types/CreateReservationModel'
import { actionTypes } from '@/store/actions'
import { ROUTE_NAME_RESERVATIONS } from '@/router/constants'

export default Vue.extend({
  components: { PageTitle, CreateReservationForm },
  computed: {
    apiIsLoading(): boolean {
      return this.$store.state.createReservationLoading
    },
    currentRestaurant(): RestaurantEntity {
      return this.$store.state.currentRestaurant.data
    }
  },
  methods: {
    async createReservation(model: CreateReservationModel): Promise<void> {
      await this.$store.dispatch(actionTypes.createReservation, model)
      if (!this.$store.state.createReservation.error) {
        await this.$router.push({
          name: ROUTE_NAME_RESERVATIONS,
          query: { createSuccess: '1' }
        })
      }
    }
  }
})
</script>
