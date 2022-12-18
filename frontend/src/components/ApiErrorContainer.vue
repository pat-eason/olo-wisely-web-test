<template>
  <AlertNotice type="danger">
    <ul class="list-disc list-inside">
      <li v-for="(err, i) in error" :key="`error_${i}_${err}`" class="p-1">
        {{ err }}
      </li>
    </ul>
  </AlertNotice>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import AlertNotice from '@/components/common/AlertNotice.vue'
import { ResponseEnvelope } from '@/api/types/ResponseEnvelope'

export default Vue.extend({
  components: {
    AlertNotice
  },
  props: {
    error: {
      type: Object as PropType<ResponseEnvelope['error']>,
      required: true
    }
  }
})
</script>
