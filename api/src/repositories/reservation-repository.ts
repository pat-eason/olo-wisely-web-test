import { Op } from 'sequelize'

import { ReservationEntity } from '../models/entities'
import CreateReservationRequest from '../types/CreateReservationRequest'

const getTimeFromDate = (date: Date): number =>
  Number.parseInt(`${date.getHours()}${date.getMinutes()}`)

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
  const resDate = new Date(model.reservationDateTime)
  return ReservationEntity.create({
    ...model,
    reservationDate: resDate.toISOString(),
    reservationTime: getTimeFromDate(resDate),
  })
}

export const getReservationsForInventory = async (
  reservationDate: Date,
  inventoryPartySize: number,
  restaurantId: number
): Promise<ReservationEntity[]> =>
  ReservationEntity.findAll({
    where: {
      restaurantId,
      partySize: inventoryPartySize,
      reservationDate: {
        [Op.between]: [
          new Date(reservationDate).setUTCHours(0, 0, 0, 0),
          new Date(reservationDate).setUTCHours(23, 59, 59, 999),
        ],
      },
      reservationTime: getTimeFromDate(reservationDate),
    },
  })

export const getExactReservation = async (
  email: string,
  date: string,
  partySize: number,
  restaurantId: number
): Promise<ReservationEntity> => {
  const resDate = new Date(date)
  return ReservationEntity.findOne({
    where: {
      email,
      reservationDate: {
        [Op.between]: [
          new Date(resDate).setUTCHours(0, 0, 0, 0),
          new Date(resDate).setUTCHours(23, 59, 59, 999),
        ],
      },
      reservationTime: getTimeFromDate(resDate),
      partySize,
      restaurantId,
    },
  })
}
