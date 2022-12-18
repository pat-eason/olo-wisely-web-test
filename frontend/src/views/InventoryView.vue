<template>
  <div id="view--inventory">
    <PageTitle :icon="titleIcon"> Inventory </PageTitle>

    <div v-if="showCreateSuccessNotice" class="py-2">
      <AlertNotice type="success">
        Inventory successfully created!
      </AlertNotice>
    </div>

    <LoadingIndicator v-if="apiLoading" />
    <div class="py-4 text-right">
      <router-link
        :to="{ name: createInventoryRouteName }"
        class="rounded-lg bg-emerald-500 px-4 py-3 text-white text-sm"
      >
        New Inventory
      </router-link>
    </div>
    <InventoryTable :inventory="apiRecords" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { InventoryEntity } from '@/api/types/InventoryEntity'
import AlertNotice from '@/components/common/AlertNotice.vue'
import LoadingIndicator from '@/components/common/LoadingIndicator.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import InventoryTable from '@/components/InventoryTable.vue'
import {
  ROUTE_ICON_INVENTORY,
  ROUTE_NAME_CREATE_INVENTORY
} from '@/router/constants'
import { actionTypes } from '@/store/actions'

export default Vue.extend({
  components: {
    AlertNotice,
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
    createInventoryRouteName(): string {
      return ROUTE_NAME_CREATE_INVENTORY
    },
    showCreateSuccessNotice(): boolean {
      return !!this.$route.query['createSuccess']
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
