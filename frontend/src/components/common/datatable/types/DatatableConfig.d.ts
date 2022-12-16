import { DatatableHeadItem } from './DatatableHeadItem'

export interface DatatableConfig {
  headers: DatatableHeadItem[]
  perPage?: number
  searchable?: boolean
  /**
   * Acts as an injection for the table's search mechanism.
   * This must be tracked separately to the datatable's internal
   * state and will override the existing search state.
   */
  searchKey?: string
}
