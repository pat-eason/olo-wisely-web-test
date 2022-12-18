import { getCurrentRestaurant } from '@/api/requests/get-current-restaurant'
import { getReservationsForRestaurant } from '@/api/requests/get-reservations'
import { createReservation } from '@/api/requests/create-reservation'
import { mutationTypes } from '@/store/mutations'
import { CreateReservationModel } from '@/types/CreateReservationModel'

export const actionTypes = {
  createReservation: 'CREATE_RESERVATION',
  getCurrentRestaurant: 'GET_CURRENT_RESTAURANT',
  getReservations: 'GET_RESERVATIONS'
}

export const actions = {
  async [actionTypes.createReservation](
    { commit },
    payload: CreateReservationModel
  ): Promise<void> {
    commit(mutationTypes.setCreateReservationLoading, true)
    commit(mutationTypes.setCreateReservationError, null)
    try {
      await createReservation(payload)
    } catch (err) {
      commit(mutationTypes.setCreateReservationError, err)
    }
    commit(mutationTypes.setCreateReservationLoading, false)
  },
  async [actionTypes.getCurrentRestaurant]({ commit }): Promise<void> {
    commit(mutationTypes.setCurrentRestaurantLoading, true)
    commit(mutationTypes.setCurrentRestaurantError, null)
    try {
      const response = await getCurrentRestaurant()
      commit(mutationTypes.setCurrentRestaurant, response)
    } catch (err) {
      commit(mutationTypes.setCurrentRestaurantError, err)
    }
    commit(mutationTypes.setCurrentRestaurantLoading, false)
  },
  async [actionTypes.getReservations]({ commit, state }): Promise<void> {
    commit(mutationTypes.setReservationsLoading, true)
    commit(mutationTypes.setReservationsError, null)
    try {
      const response = await getReservationsForRestaurant(
        state.currentRestaurant.data.id
      )
      commit(mutationTypes.setReservations, response)
    } catch (err) {
      commit(mutationTypes.setReservationsError, err)
    }
    commit(mutationTypes.setReservationsLoading, false)
  }
}
