<template>
  <div id="view--reservations">
    <PageTitle :icon="titleIcon"> Reservations </PageTitle>

    <div v-if="showCreateSuccessNotice" class="py-2">
      <AlertNotice type="success">
        Reservation successfully created!
      </AlertNotice>
    </div>

    <LoadingIndicator v-if="apiLoading" />
    <div class="py-4 text-right">
      <router-link
        :to="{ name: createReservationRouteName }"
        aria-label="Create new Reservation"
        class="rounded-lg bg-emerald-500 px-4 py-3 text-white text-sm"
      >
        Reservation
        <font-awesome-icon class="pl-1" icon="fas fa-plus" />
      </router-link>
    </div>
    <ReservationsTable :reservations="apiRecords" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ReservationEntity } from '@/api/types/ReservationEntity'
import AlertNotice from '@/components/common/AlertNotice.vue'
import LoadingIndicator from '@/components/common/LoadingIndicator.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ReservationsTable from '@/components/ReservationsTable.vue'
import {
  ROUTE_NAME_CREATE_RESERVATION,
  ROUTE_ICON_RESERVATIONS
} from '@/router/constants'
import { actionTypes } from '@/store/actions'

export default Vue.extend({
  components: {
    AlertNotice,
    LoadingIndicator,
    PageTitle,
    ReservationsTable
  },
  computed: {
    apiLoading(): boolean {
      return this.$store.state.reservations.isLoading
    },
    apiError(): Error | null {
      return this.$store.state.reservations.error
    },
    apiRecords(): ReservationEntity[] {
      return this.$store.state.reservations.data
    },
    createReservationRouteName(): string {
      return ROUTE_NAME_CREATE_RESERVATION
    },
    showCreateSuccessNotice(): boolean {
      return !!this.$route.query['createSuccess']
    },
    titleIcon(): string {
      return ROUTE_ICON_RESERVATIONS
    }
  },
  async mounted(): Promise<void> {
    await this.retrieveReservations()
  },
  methods: {
    async retrieveReservations(): Promise<void> {
      await this.$store.dispatch(actionTypes.getReservations)
    }
  }
})
</script>
