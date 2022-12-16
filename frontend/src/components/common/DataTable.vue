<template>
  <div class="data-table overflow-x-auto relative">
    <div v-if="title" class="data-table--title pb-2">
      <p class="font-display text-gray-600 text">{{ title }}</p>
    </div>

    <div v-if="showSearchBar" class="data-table--controls pb-2">
      <TextInput
        v-model="searchModel"
        :disabled="disableSearchBar"
        placeholder="Search"
      />
    </div>

    <template v-if="hasItems">
      <table class="w-full text-sm text-left text-gray-600 dark:text-gray-400">
        <DatatableHead
          :items="config.headers"
          :sort-direction="sortDirection"
          :sort-key="sortKey"
          @sortColumn="setSort"
        />

        <DatatableBody :headers="config.headers" :items="renderPage">
          <template
            v-for="(_, name) in $scopedSlots"
            :slot="name"
            slot-scope="item"
          >
            <slot :name="name" v-bind="item" />
          </template>
        </DatatableBody>
      </table>
      <DatatableFooter
        :current-page="currentPage"
        :page-from="paginationFrom"
        :page-to="paginationTo"
        :per-page="paginationPerPage"
        :total="paginationTotal"
        @nextPage="handleNextPage"
        @previousPage="handlePreviousPage"
        @updatePerPage="handleUpdatePerPage"
      />
    </template>

    <div v-else>No Items found</div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import DatatableFooter from './datatable/DatatableFooter.vue'
import DatatableHead from './datatable/DatatableHead.vue'
import DatatableBody from './datatable/DatatableBody.vue'

import { DatatableConfig } from './datatable/types/DatatableConfig'
import { DatatableHeadItem } from './datatable/types/DatatableHeadItem'
import { DatatableRowItem } from './datatable/types/DatatableRowItem'
import TextInput from './TextInput.vue'

type SortDirection = '' | 'asc' | 'desc'

export interface DatatableState {
  currentPage: number
  perPage: number
  searchKey: string
  sortDirection: SortDirection
  sortKey: string
}

export default Vue.extend({
  components: {
    DatatableBody,
    DatatableFooter,
    DatatableHead,
    TextInput
  },
  props: {
    config: { type: Object as PropType<DatatableConfig>, required: true },
    items: { type: Array as PropType<DatatableRowItem[]>, required: true },
    title: { type: String, default: '' }
  },
  data() {
    const state: DatatableState = {
      currentPage: 1,
      perPage: this.config.perPage ?? 10,
      searchKey: this.config.searchKey ?? '',
      sortDirection: '',
      sortKey: ''
    }
    return state
  },
  computed: {
    disableSearchBar(): boolean {
      return !!this.config.searchKey
    },
    hasItems(): boolean {
      return this.items && this.items.length > 0
    },
    paginationFrom(): number {
      return this.currentPage * this.perPage + 1 - this.perPage
    },
    paginationPerPage(): number {
      return this.perPage
    },
    paginationTo(): number {
      const output = this.currentPage * this.perPage
      return output <= this.renderItems.length
        ? output
        : this.renderItems.length
    },
    paginationTotal(): number {
      return this.renderItems.length
    },
    renderItems(): DatatableRowItem[] {
      const sanitizedSearchKey = this.searchKey.toLowerCase()

      const filterColumns = this.searchableColumns.filter(x => x.filterKey)
      const searchColumns = this.searchableColumns.filter(x => x.searchable)

      const tightValidationLimit = filterColumns.length
      const renderItems = this.items.filter(x => {
        // validate tight search
        let tightValidationPoints = 0
        for (const column of filterColumns) {
          const value = x[column.key] ?? ''
          const hasFilterKey = value
            .toString()
            .toLowerCase()
            .includes(column.filterKey?.toLowerCase() ?? '')
          if (hasFilterKey) {
            tightValidationPoints++
          }
        }
        if (tightValidationPoints !== tightValidationLimit) {
          return false
        }

        // validate loose search
        if (!sanitizedSearchKey) {
          return true
        }
        for (const column of searchColumns) {
          const value = x[column.key] ?? ''
          if (value.toString().toLowerCase().includes(sanitizedSearchKey)) {
            return true
          }
        }

        // return response
        return false
      })

      if (
        this.sortableColumns.length === 0 ||
        !this.sortKey ||
        !this.sortDirection ||
        !this.sortableColumns.map(x => x.key).includes(this.sortKey)
      ) {
        return renderItems
      }

      return renderItems.sort((a, b) => {
        if (a[this.sortKey] < b[this.sortKey]) {
          return this.sortDirection === 'asc' ? -1 : 1
        }
        if (a[this.sortKey] > b[this.sortKey]) {
          return this.sortDirection === 'asc' ? 1 : -1
        }
        return 0
      })
    },
    renderPage(): DatatableRowItem[] {
      const startIndex = this.currentPage * this.perPage - this.perPage
      const endIndex = this.perPage * this.currentPage
      return this.renderItems.slice(startIndex, endIndex)
    },
    searchableColumns(): DatatableHeadItem[] {
      return this.config.headers.filter(x => x.searchable || !!x.filterKey)
    },
    showSearchBar(): boolean {
      return !!(
        this.config.searchable &&
        this.searchableColumns.length > 0 &&
        this.hasItems
      )
    },
    searchModel: {
      get(): string {
        return this.searchKey
      },
      set(newVal: string): void {
        this.currentPage = 1
        this.searchKey = newVal
      }
    },
    sortableColumns(): DatatableHeadItem[] {
      return this.config.headers.filter(x => x.sortable)
    }
  },
  methods: {
    handleNextPage(pageIndex: number) {
      this.currentPage = pageIndex
    },
    handlePreviousPage(pageIndex: number) {
      if (pageIndex < 1) {
        return
      }
      this.currentPage = pageIndex
    },
    handleUpdatePerPage(perPage: number) {
      this.perPage = perPage
    },
    resetSort(): void {
      this.sortDirection = ''
      this.sortKey = ''
    },
    setSort(sortItem: DatatableHeadItem): void {
      // sort in order: asc -> desc -> reset
      const isNewSortColumn = this.sortKey !== sortItem.key
      const isResetSort = !isNewSortColumn && this.sortDirection === 'desc'

      if (isNewSortColumn) {
        this.sortDirection = 'asc'
        this.sortKey = sortItem.key
        return
      }

      if (isResetSort) {
        this.sortDirection = ''
        this.sortKey = ''
      }

      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    }
  },
  watch: {
    'config.searchKey'(newVal: string): void {
      this.currentPage = 1
      this.searchKey = newVal
    }
  }
})
</script>
