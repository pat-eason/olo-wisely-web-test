<template>
  <thead
    class="data-table--head text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
  >
    <tr>
      <th
        v-for="(item, index) in items"
        :key="`datatable-head_${item.label}_${index}`"
        :class="{ 'text-center': item.centerContent }"
        class="py-3 px-6"
        scope="col"
      >
        <button
          v-if="item.sortable"
          class="font-bold uppercase hover:bg-gray-200 whitespace-no-wrap"
          @click="sortColumn(item)"
        >
          {{ item.label }}

          <i
            v-if="renderSortIcon(item)"
            :class="renderSortIcon(item)"
            class="text-lg ml-1 text-gray-600 align-text-bottom"
          />
        </button>
        <template v-else>
          {{ item.label }}
        </template>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { DatatableHeadItem } from './types/DatatableHeadItem'

export default Vue.extend({
  props: {
    items: { type: Array as PropType<DatatableHeadItem[]>, required: true },
    sortDirection: { type: String, default: '' },
    sortKey: { type: String, default: '' }
  },
  methods: {
    renderSortIcon(item: DatatableHeadItem): string {
      if (!this.sortDirection || !this.sortKey || this.sortKey !== item.key) {
        return ''
      }
      return this.sortDirection === 'asc'
        ? 'fas fa-caret-up'
        : 'fas fa-caret-down'
    },
    sortColumn(item: DatatableHeadItem): void {
      this.$emit('sortColumn', item)
    }
  }
})
</script>
