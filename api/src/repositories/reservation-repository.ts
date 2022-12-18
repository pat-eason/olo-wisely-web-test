import { ReservationEntity } from '../models/entities'
import CreateReservationRequest from '../types/CreateReservationRequest'

export const getReservationsForRestaurant = async (
  restaurantId: number
): Promise<ReservationEntity[]> =>
  ReservationEntity.findAll({
    where: {
      restaurantId,
    },
    order: [['created_at', 'DESC']],
  })

export const createReservation = async (
  model: CreateReservationRequest
): Promise<ReservationEntity> => {
  return ReservationEntity.create({ ...model })
}

export const getReservationsForInventory = async (
  reservationDate: string,
  reservationTime: number,
  inventoryPartySize: number,
  restaurantId: number
): Promise<ReservationEntity[]> =>
  ReservationEntity.findAll({
    where: {
      restaurantId,
      partySize: inventoryPartySize,
      reservationDate,
      reservationTime,
    },
  })

export const getExactReservation = async (
  email: string,
  reservationDate: string,
  reservationTime: number,
  partySize: number,
  restaurantId: number
): Promise<ReservationEntity> => {
  return ReservationEntity.findOne({
    where: {
      email,
      reservationDate,
      reservationTime,
      partySize,
      restaurantId,
    },
  })
}
