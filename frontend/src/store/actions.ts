import { getCurrentRestaurant } from '@/api/requests/get-current-restaurant'
import { getReservationsForRestaurant } from '@/api/requests/get-reservations'
import { createReservation } from '@/api/requests/create-reservation'
import { mutationTypes } from '@/store/mutations'
import { CreateReservationModel } from '@/types/CreateReservationModel'
import { getInventoryForRestaurant } from '@/api/requests/get-inventory'

export const actionTypes = {
  createReservation: 'CREATE_RESERVATION',
  getCurrentRestaurant: 'GET_CURRENT_RESTAURANT',
  getInventory: 'GET_INVENTORY',
  getReservations: 'GET_RESERVATIONS'
}

const executeApiTransaction = async (
  commit: any,
  loadingMutation: string,
  errorMutation: string,
  bodyMethod: () => Promise<void>
): Promise<void> => {
  commit(loadingMutation, true)
  commit(errorMutation, null)
  try {
    await bodyMethod()
  } catch (err) {
    commit(errorMutation, err)
  }
  commit(loadingMutation, false)
}

export const actions = {
  async [actionTypes.createReservation](
    { commit },
    payload: CreateReservationModel
  ): Promise<void> {
    await executeApiTransaction(
      commit,
      mutationTypes.setCreateReservationLoading,
      mutationTypes.setCreateReservationError,
      async () => {
        await createReservation(payload)
      }
    )
  },
  async [actionTypes.getCurrentRestaurant]({ commit }): Promise<void> {
    await executeApiTransaction(
      commit,
      mutationTypes.setCurrentRestaurantLoading,
      mutationTypes.setCurrentRestaurantError,
      async () => {
        const response = await getCurrentRestaurant()
        commit(mutationTypes.setCurrentRestaurant, response)
      }
    )
  },
  async [actionTypes.getInventory]({ commit, state }): Promise<void> {
    await executeApiTransaction(
      commit,
      mutationTypes.setInventoryLoading,
      mutationTypes.setInventoryError,
      async () => {
        const response = await getInventoryForRestaurant(
          state.currentRestaurant.data.id
        )
        commit(mutationTypes.setInventory, response)
      }
    )
  },
  async [actionTypes.getReservations]({ commit, state }): Promise<void> {
    await executeApiTransaction(
      commit,
      mutationTypes.setReservationsLoading,
      mutationTypes.setReservationsError,
      async () => {
        const response = await getReservationsForRestaurant(
          state.currentRestaurant.data.id
        )
        commit(mutationTypes.setReservations, response)
      }
    )
  }
}
