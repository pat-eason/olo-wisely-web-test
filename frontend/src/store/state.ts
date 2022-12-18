import { RestaurantEntity } from '@/api/types/RestaurantEntity'
import { ReservationEntity } from '@/api/types/ReservationEntity'
import { InventoryEntity } from '@/api/types/InventoryEntity'

export interface ApiTransactionState<T = never> {
  data?: T | null
  error: Error | null
  isLoading: boolean
}

export interface StoreState {
  createInventory: ApiTransactionState<void>
  createReservation: ApiTransactionState<void>
  currentRestaurant: ApiTransactionState<RestaurantEntity>
  inventory: ApiTransactionState<InventoryEntity[]>
  reservations: ApiTransactionState<ReservationEntity[]>
}

const generateDefaultTransactionState = <T>(
  defaultValue: T = null
): ApiTransactionState<T> => ({
  data: defaultValue,
  error: null,
  isLoading: false
})

export const defaultState: StoreState = {
  createInventory: generateDefaultTransactionState(),
  createReservation: generateDefaultTransactionState(),
  currentRestaurant: generateDefaultTransactionState(),
  inventory: generateDefaultTransactionState([]),
  reservations: generateDefaultTransactionState([])
}

export const state = { ...defaultState }
