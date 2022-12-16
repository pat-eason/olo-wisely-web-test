<template>
  <div id="view--reservations">
    <PageTitle :icon="titleIcon"> Reservations </PageTitle>

    <div class="py-4">
      <LoadingIndicator v-if="apiLoading" />
      <div class="text-right">
        <LabelButton color="emerald"> Create </LabelButton>
      </div>
      <template v-if="hasApiRecords">
        <DataTable :config="datatableConfig" :items="apiRecords">
          <template #item-email="{ item }">
            <a :href="`mailto:${item.email}`" class="underline text-sky-600">
              {{ item.email }}
            </a>
          </template>
          <template #item-actions="{ item }">
            <div class="text-right">
              <LabelButton> Edit {{ item.id }} </LabelButton>
            </div>
          </template>
        </DataTable>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ReservationEntity } from '@/api/types/ReservationEntity'
import LabelButton from '@/components/common/LabelButton.vue'
import LoadingIndicator from '@/components/common/LoadingIndicator.vue'
import DataTable from '@/components/common/DataTable.vue'
import { DatatableConfig } from '@/components/common/datatable/types/DatatableConfig'
import PageTitle from '@/components/common/PageTitle.vue'
import { ROUTE_ICON_RESERVATIONS } from '@/router/constants'
import { actionTypes } from '@/store/actions'

export default Vue.extend({
  components: {
    DataTable,
    LabelButton,
    LoadingIndicator,
    PageTitle
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
    datatableConfig(): DatatableConfig {
      return {
        headers: [
          {
            key: 'id',
            label: 'ID',
            sortable: true
          },
          {
            key: 'name',
            label: 'Name',
            searchable: true
          },
          {
            key: 'email',
            label: 'Email',
            searchable: true
          },
          {
            key: 'partySize',
            label: 'Party Size',
            searchable: true
          },
          {
            key: 'date',
            label: 'Date & Time',
            searchable: true
          },
          {
            key: 'actions',
            label: 'Actions'
          }
        ],
        searchable: true
      }
    },
    hasApiRecords(): boolean {
      return this.apiRecords.length > 0
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
