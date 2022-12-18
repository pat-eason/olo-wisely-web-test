import { httpClient } from '@/api/http-client'
import { ReservationEntity } from '@/api/types/ReservationEntity'
import { ResponseEnvelope } from '@/api/types/ResponseEnvelope'

const apiRoute = 'reservations'

export const getReservationsForRestaurant = async (
  restaurantId: number
): Promise<ResponseEnvelope<ReservationEntity[]>> => {
  return await httpClient.executeRequest<ReservationEntity[]>({
    method: 'get',
    params: {
      restaurantId
    },
    url: apiRoute
  })
}
