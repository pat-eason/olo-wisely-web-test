import { httpClient } from '@/api/http-client'
import { ReservationEntity } from '@/api/types/ReservationEntity'

const apiRoute = 'reservations'

export const getReservationsForRestaurant = async (
  restaurantId: number
): Promise<ReservationEntity[]> => {
  return (
    await httpClient.executeRequest<ReservationEntity[]>({
      method: 'get',
      params: {
        restaurantId
      },
      url: apiRoute
    })
  ).data
}
