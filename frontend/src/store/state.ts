import { RestaurantEntity } from '@/api/types/RestaurantEntity'
import { ReservationEntity } from '@/api/types/ReservationEntity'

export interface ApiTransactionState<T = never> {
  data?: T | null
  error: Error | null
  isLoading: boolean
}

export interface StoreState {
  createReservation: ApiTransactionState<void>
  currentRestaurant: ApiTransactionState<RestaurantEntity>
  reservations: ApiTransactionState<ReservationEntity[]>
}

export const defaultState: StoreState = {
  createReservation: {
    error: null,
    isLoading: false
  },
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
