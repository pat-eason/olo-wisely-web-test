<template>
  <tbody>
    <tr
      v-for="(item, rowIndex) in items"
      :key="`datatable-row_${rowIndex}`"
      class="bg-white border-b text-xs dark:bg-gray-800 dark:border-gray-700"
    >
      <td
        v-for="(header, headerIndex) in headers"
        :key="`datatable-cell_${rowIndex}:${headerIndex}`"
        :class="{
          'text-center': header.centerContent,
          'whitespace-no-wrap': header.noWrap
        }"
        class="py-2 px-4"
      >
        <slot
          v-if="hasScopedItemSlot(header.key)"
          :name="`item-${header.key}`"
          :item="item"
        />
        <template v-else>
          {{ item[header.key] }}
        </template>
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { DatatableHeadItem } from './types/DatatableHeadItem'
import { DatatableRowItem } from './types/DatatableRowItem'

export default Vue.extend({
  props: {
    headers: { type: Array as PropType<DatatableHeadItem[]>, required: true },
    items: { type: Array as PropType<DatatableRowItem[]>, required: true }
  },
  methods: {
    hasScopedItemSlot(itemKey: string): boolean {
      return Object.keys(this.$scopedSlots)
        .filter((x: string) => x.startsWith('item-'))
        .map((x: string) => x.replace('item-', ''))
        .includes(itemKey)
    }
  }
})
</script>
