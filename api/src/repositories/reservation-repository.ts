import {ReservationEntity} from "../models/entities";
import CreateReservationRequest from "../types/CreateReservationRequest";

export const getAllForRestaurant = async (restaurantId: number): Promise<ReservationEntity[]> =>
  ReservationEntity.findAll({
    where: {
      restaurantId,
    },
    order: [[ 'created_at', 'DESC' ]],
  })

export const createReservation = async (model: CreateReservationRequest): Promise<ReservationEntity> => {
  const resDate = new Date(model.reservationDateTime)

  const newRecord = ReservationEntity.build({
    ...model,
    reservationDate: resDate.toISOString(),
    reservationTime: `${resDate.getHours()}:${resDate.getMinutes()}`,
  })
  await newRecord.save();
  return newRecord
}