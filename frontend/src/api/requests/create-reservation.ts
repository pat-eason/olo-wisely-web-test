import { DateTime } from 'luxon'

import { httpClient } from '@/api/http-client'
import { ReservationEntity } from '@/api/types/ReservationEntity'
import { CreateReservationModel } from '@/types/CreateReservationModel'
import { CreateReservationRequest } from '@/api/types/CreateReservationRequest'

const apiRoute = 'reservations'

export const createReservation = async (
  payload: CreateReservationModel
): Promise<ReservationEntity> => {
  const body: CreateReservationRequest = {
    email: payload.email,
    name: payload.name,
    partySize: Number.parseInt(payload.partySize),
    reservationDateTime: DateTime.fromFormat(
      `${payload.reservationDate} ${payload.reservationTime}`,
      'yyyy-MM-dd h:mma'
    ).toISO(),
    restaurantId: payload.restaurantId
  }

  console.log(body)
  return (
    await httpClient.executeRequest<ReservationEntity>({
      body,
      method: 'post',
      url: apiRoute
    })
  ).data
}
