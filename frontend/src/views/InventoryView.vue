<template>
  <div id="view--inventory">
    <PageTitle :icon="titleIcon"> Inventory </PageTitle>

    <LoadingIndicator v-if="apiLoading" />
    <InventoryTable :inventory="apiRecords" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { InventoryEntity } from '@/api/types/InventoryEntity'
import LoadingIndicator from '@/components/common/LoadingIndicator.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import InventoryTable from '@/components/InventoryTable.vue'
import { ROUTE_ICON_INVENTORY } from '@/router/constants'
import { actionTypes } from '@/store/actions'

export default Vue.extend({
  components: {
    InventoryTable,
    LoadingIndicator,
    PageTitle
  },
  computed: {
    apiLoading(): boolean {
      return this.$store.state.inventory.isLoading
    },
    apiError(): Error | null {
      return this.$store.state.inventory.error
    },
    apiRecords(): InventoryEntity[] {
      return this.$store.state.inventory.data
    },
    titleIcon(): string {
      return ROUTE_ICON_INVENTORY
    }
  },
  async mounted(): Promise<void> {
    await this.retrieveInventory()
  },
  methods: {
    async retrieveInventory(): Promise<void> {
      await this.$store.dispatch(actionTypes.getInventory)
    }
  }
})
</script>
