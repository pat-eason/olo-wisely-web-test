export interface DatatableHeadItem {
  /**
   * Key of render value in object record
   */
  key: string
  label: string
  centerContent?: boolean
  filterKey?: string
  noWrap?: boolean
  searchable?: boolean
  sortable?: boolean
}
