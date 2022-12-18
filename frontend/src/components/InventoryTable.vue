<template>
  <DataTable :config="datatableConfig" :items="inventory">
    <template #item-startTime="{ item }">
      {{ formatTimeString(item.startTime) }}
      - {{ formatTimeString(item.endTime) }}
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

import { InventoryEntity } from '@/api/types/InventoryEntity'
import DataTable from '@/components/common/DataTable.vue'
import LabelButton from '@/components/common/LabelButton.vue'
import { DatatableConfig } from '@/components/common/datatable/types/DatatableConfig'
import { formatTime } from '@/utils/date-utils'

export default Vue.extend({
  components: {
    DataTable,
    LabelButton
  },
  props: {
    inventory: {
      type: Array as PropType<InventoryEntity[]>,
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
            key: 'label',
            label: 'Label',
            searchable: true,
            sortable: true
          },
          {
            key: 'availableSlots',
            label: 'Slots',
            sortable: true
          },
          {
            key: 'partySize',
            label: 'Party Size',
            sortable: true
          },
          {
            key: 'startTime',
            label: 'Timeframe',
            sortable: true
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
