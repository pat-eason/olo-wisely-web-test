<template>
  <div id="view--inventory">
    <PageTitle :icon="titleIcon"> Inventory </PageTitle>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import PageTitle from '@/components/common/PageTitle.vue'
import { ROUTE_ICON_INVENTORY } from '@/router/constants'

export default Vue.extend({
  components: {
    PageTitle
  },
  computed: {
    titleIcon(): string {
      return ROUTE_ICON_INVENTORY
    }
  }
})
</script>
