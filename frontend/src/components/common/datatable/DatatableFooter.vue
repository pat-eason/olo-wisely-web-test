<template>
  <div class="datatable--footer">
    <div
      class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
    >
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">
              {{ pageFrom }}
            </span>
            to
            <span class="font-medium">
              {{ pageTo }}
            </span>
            of
            <span class="font-medium">
              {{ total }}
            </span>
            results
          </p>
        </div>

        <div>
          <div class="inline-block pr-2">
            <TextSelect
              v-model="perPageModel"
              :items="{
                5: 5,
                10: 10,
                25: 25,
                50: 50,
                100: 100
              }"
              disable-default
              label="Per Page"
            />
          </div>

          <nav
            class="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              :class="{
                'cursor-disabled text-gray-400': !hasPreviousPage,
                'cursor-pointer text-gray-600': hasPreviousPage
              }"
              class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-1 py-1 text-sm font-medium hover:bg-gray-50 focus:z-20"
              @click="handlePreviousPage"
            >
              <span class="sr-only">Previous</span>
              <i class="fas fa-chevron-left p-2" />
            </a>

            <a
              :class="{
                'cursor-disabled text-gray-400': !hasNextPage,
                'cursor-pointer text-gray-600': hasNextPage
              }"
              class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-1 py-1 text-sm font-medium hover:bg-gray-50 focus:z-20"
              @click="handleNextPage"
            >
              <span class="sr-only">Next</span>
              <i class="fas fa-chevron-right p-2" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TextSelect from '@/components/common/TextSelect.vue'

export default Vue.extend({
  components: { TextSelect },
  props: {
    currentPage: { type: Number, required: true },
    pageFrom: { type: Number, required: true },
    pageTo: { type: Number, required: true },
    perPage: { type: Number, required: true },
    total: { type: Number, required: true }
  },
  computed: {
    hasNextPage(): boolean {
      const totalPages = Math.ceil(this.total / this.perPage)
      return this.currentPage < totalPages
    },
    hasPreviousPage(): boolean {
      return this.currentPage > 1
    },
    perPageModel: {
      get(): string {
        return this.perPage.toString()
      },
      set(newVal: number): void {
        this.$emit('updatePerPage', newVal)
      }
    }
  },
  methods: {
    handleNextPage() {
      if (!this.hasNextPage) {
        return
      }
      this.$emit('nextPage', this.currentPage + 1)
    },
    handlePageSelect(pageIndex: number): void {
      this.$emit('selectPage', pageIndex)
    },
    handlePreviousPage() {
      if (!this.hasPreviousPage) {
        return
      }
      this.$emit('previousPage', this.currentPage - 1)
    }
  }
})
</script>
