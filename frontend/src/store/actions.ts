import { getCurrentRestaurant } from '@/api/requests/get-current-restaurant'
import { mutationTypes } from '@/store/mutations'
import { getReservationsForRestaurant } from '@/api/requests/get-reservations'

export const actionTypes = {
  getCurrentRestaurant: 'GET_CURRENT_RESTAURANT',
  getReservations: 'GET_RESERVATIONS'
}

export const actions = {
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
