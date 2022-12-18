import { ApiTransactionState, StoreState } from '@/store/state'
import { RestaurantEntity } from '@/api/types/RestaurantEntity'
import { ReservationEntity } from '@/api/types/ReservationEntity'
import { InventoryEntity } from '@/api/types/InventoryEntity'

export const mutationTypes = {
  setCreateInventoryError: 'SET_CREATE_INVENTORY_ERROR',
  setCreateInventoryLoading: 'SET_CREATE_INVENTORY_LOADING',
  setCreateReservationError: 'SET_CREATE_RESERVATION_ERROR',
  setCreateReservationLoading: 'SET_CREATE_RESERVATION_LOADING',
  setCurrentRestaurantLoading: 'SET_CURRENT_RESTAURANT_LOADING',
  setCurrentRestaurantError: 'SET_CURRENT_RESTAURANT_ERROR',
  setCurrentRestaurant: 'SET_CURRENT_RESTAURANT',
  setInventoryLoading: 'SET_INVENTORY_LOADING',
  setInventoryError: 'SET_INVENTORY_ERROR',
  setInventory: 'SET_INVENTORY',
  setReservationsLoading: 'SET_RESERVATIONS_LOADING',
  setReservationsError: 'SET_RESERVATIONS_ERROR',
  setReservations: 'SET_RESERVATIONS'
}

export const mutations = {
  [mutationTypes.setCreateInventoryError](
    state: StoreState,
    error: ApiTransactionState['error']
  ) {
    state.createInventory.error = error
  },
  [mutationTypes.setCreateInventoryLoading](
    state: StoreState,
    isLoading: ApiTransactionState['isLoading']
  ) {
    state.createInventory.isLoading = isLoading
  },
  [mutationTypes.setCreateReservationError](
    state: StoreState,
    error: ApiTransactionState['error']
  ) {
    state.createReservation.error = error
  },
  [mutationTypes.setCreateReservationLoading](
    state: StoreState,
    isLoading: ApiTransactionState['isLoading']
  ) {
    state.createReservation.isLoading = isLoading
  },
  [mutationTypes.setCurrentRestaurantLoading](
    state: StoreState,
    isLoading: ApiTransactionState['isLoading']
  ) {
    state.currentRestaurant.isLoading = isLoading
  },
  [mutationTypes.setCurrentRestaurantError](
    state: StoreState,
    error: ApiTransactionState['error']
  ) {
    state.currentRestaurant.error = error
  },
  [mutationTypes.setCurrentRestaurant](
    state: StoreState,
    data: ApiTransactionState<RestaurantEntity>['data']
  ) {
    state.currentRestaurant.data = data
  },
  [mutationTypes.setInventoryLoading](
    state: StoreState,
    isLoading: ApiTransactionState['isLoading']
  ) {
    state.inventory.isLoading = isLoading
  },
  [mutationTypes.setInventoryError](
    state: StoreState,
    error: ApiTransactionState['error']
  ) {
    state.inventory.error = error
  },
  [mutationTypes.setInventory](
    state: StoreState,
    data: ApiTransactionState<InventoryEntity[]>['data']
  ) {
    state.inventory.data = data
  },
  [mutationTypes.setReservationsLoading](
    state: StoreState,
    isLoading: ApiTransactionState['isLoading']
  ) {
    state.reservations.isLoading = isLoading
  },
  [mutationTypes.setReservationsError](
    state: StoreState,
    error: ApiTransactionState['error']
  ) {
    state.reservations.error = error
  },
  [mutationTypes.setReservations](
    state: StoreState,
    data: ApiTransactionState<ReservationEntity[]>['data']
  ) {
    state.reservations.data = data
  }
}
