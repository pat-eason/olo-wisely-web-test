import { RestaurantEntity } from '@/api/types/RestaurantEntity'
import { ReservationEntity } from '@/api/types/ReservationEntity'

export interface ApiTransactionState<T = never> {
  data: T | null
  error: Error | null
  isLoading: boolean
}

export interface StoreState {
  currentRestaurant: ApiTransactionState<RestaurantEntity>
  reservations: ApiTransactionState<ReservationEntity[]>
}

export const defaultState: StoreState = {
  currentRestaurant: {
    data: null,
    error: null,
    isLoading: false
  },
  reservations: {
    data: [],
    error: null,
    isLoading: false
  }
}

export const state = { ...defaultState }
