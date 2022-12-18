import { httpClient } from '@/api/http-client'
import { ReservationEntity } from '@/api/types/ReservationEntity'
import { CreateReservationModel } from '@/types/CreateReservationModel'
import { CreateReservationRequest } from '@/api/types/CreateReservationRequest'
import { ResponseEnvelope } from '@/api/types/ResponseEnvelope'

const apiRoute = 'reservations'

export const createReservation = async (
  payload: CreateReservationModel
): Promise<ResponseEnvelope<ReservationEntity>> => {
  const body: CreateReservationRequest = {
    email: payload.email,
    name: payload.name,
    partySize: Number.parseInt(payload.partySize),
    reservationDate: payload.reservationDate,
    reservationTime: payload.reservationTime,
    restaurantId: payload.restaurantId
  }

  return await httpClient.executeRequest<ReservationEntity>({
    body,
    method: 'post',
    url: apiRoute
  })
}
