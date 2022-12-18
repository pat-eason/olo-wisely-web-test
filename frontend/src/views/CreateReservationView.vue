<template>
  <div id="view--create-reservation">
    <PageTitle> Create Reservation </PageTitle>

    <ApiErrorContainer v-if="apiError" :error="apiError" />

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
import ApiErrorContainer from '@/components/ApiErrorContainer.vue'
import CreateReservationForm from '@/components/CreateReservationForm.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import { ROUTE_NAME_RESERVATIONS } from '@/router/constants'
import { actionTypes } from '@/store/actions'
import { CreateReservationModel } from '@/types/CreateReservationModel'

export default Vue.extend({
  components: {
    ApiErrorContainer,
    CreateReservationForm,
    PageTitle
  },
  computed: {
    apiError(): Record<string, string> {
      return this.$store.state.createReservation.error
    },
    apiIsLoading(): boolean {
      return this.$store.state.createReservation.isLoading
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
