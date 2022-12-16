<template>
  <div id="view--reservations">
    <PageTitle :icon="titleIcon"> Reservations </PageTitle>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue'

import PageTitle from '@/components/common/PageTitle.vue'
import { ROUTE_ICON_RESERVATIONS } from '@/router/constants'

export default Vue.extend({
  components: {
    PageTitle
  },
  computed: {
    titleIcon(): string {
      return ROUTE_ICON_RESERVATIONS
    }
  },
  async mounted() {
    try {
      await axios.get('http://localhost:9090/test')
    } catch (error) {
      console.error(error)
    }
  }
})
</script>
