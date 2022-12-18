<template>
  <DataTable :config="datatableConfig" :items="reservations">
    <template #item-email="{ item }">
      <a :href="`mailto:${item.email}`" class="underline text-sky-600">
        {{ item.email }}
      </a>
    </template>
    <template #item-reservationDate="{ item }">
      {{ item.reservationDate }} @ {{ formatTimeString(item.reservationTime) }}
    </template>
    <template #item-actions="{ item }">
      <div class="text-right">
        <LabelButton> Edit {{ item.id }} </LabelButton>
      </div>
    </template>
  </DataTable>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import DataTable from '@/components/common/DataTable.vue'
import LabelButton from '@/components/common/LabelButton.vue'
import { ReservationEntity } from '@/api/types/ReservationEntity'
import { DatatableConfig } from '@/components/common/datatable/types/DatatableConfig'
import { formatTime } from '@/utils/date-utils'

export default Vue.extend({
  components: {
    DataTable,
    LabelButton
  },
  props: {
    reservations: {
      type: Array as PropType<ReservationEntity[]>,
      default: () => []
    }
  },
  computed: {
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
            key: 'reservationDate',
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
    }
  },
  methods: {
    formatTimeString(time: number): string {
      return formatTime(time)
    }
  }
})
</script>
