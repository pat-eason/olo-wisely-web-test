import { Controller, Get, Post } from '@overnightjs/core'
import { Request, Response } from 'express'

import { ControllerBase } from './ControllerBase'
import {
  createReservation,
  getExactReservation,
  getReservationsForInventory,
  getReservationsForRestaurant,
} from '../repositories/reservation-repository'
import CreateReservationRequest from '../types/CreateReservationRequest'
import { getInventoryInTimeRangeForPartySize } from '../repositories/inventory-repository'

@Controller('reservations')
export class ReservationsController extends ControllerBase {
  @Get('')
  private async getAll(req: Request, res: Response) {
    const restaurantId = Number.parseInt(req.query.restaurantId[0])
    const records = await getReservationsForRestaurant(restaurantId)
    return res.send(this.generateSuccessResponse(records))
  }

  @Post('')
  private async create(req: Request<{}, {}, CreateReservationRequest>, res: Response) {
    try {
      const model = req.body

      if (
        !model.email ||
        !model.reservationDate ||
        !model.reservationTime ||
        !model.partySize ||
        !model.restaurantId
      ) {
        return res.status(422).send(
          this.generateErrorResponse(
            {
              validation:
                "Missing one or more required fields to create a reservation: 'email', 'reservationDate', 'reservationTime', 'partySize', 'restaurantId'",
            },
            'Missing one more more required fields'
          )
        )
      }

      // has this reservation already been created?
      const existingReservation = await getExactReservation(
        model.email,
        model.reservationDate,
        model.reservationTime,
        model.partySize,
        model.restaurantId
      )
      if (existingReservation) {
        return res.status(409).send(
          this.generateErrorResponse(
            {
              error: `A reservation already exists for email [${model.email}] at [${model.reservationTime}] with party size [${model.partySize}]`,
            },
            'This customer already has a slot for this day, time, and party size'
          )
        )
      }

      // is there inventory for this party size and time frame?
      const inventory = await getInventoryInTimeRangeForPartySize(
        model.reservationTime,
        model.reservationTime + 15,
        model.partySize,
        model.restaurantId
      )
      if (!inventory) {
        return res.status(404).send(
          this.generateErrorResponse(
            {
              error: `There is not an Inventory record for party size [${model.partySize}] at time [${model.reservationTime}]`,
            },
            'There is not an Inventory record for that party size and time'
          )
        )
      }

      // are there slots available for this party size and time frame?
      const reservationsForSlot = await getReservationsForInventory(
        model.reservationDate,
        model.reservationTime,
        inventory.partySize,
        inventory.restaurantId
      )
      if (reservationsForSlot.length >= inventory.availableSlots) {
        return res.status(404).send(
          this.generateErrorResponse(
            {
              error: `There are no available Inventory slots remaining for date [${model.reservationDate}] with party size [${model.partySize}]`,
            },
            'There are no more slots on that day and party size at that time'
          )
        )
      }

      const newRecord = await createReservation(model)
      return res.send(this.generateSuccessResponse(newRecord))
    } catch (err) {
      return res
        .status(500)
        .send(
          this.generateErrorResponse(
            { serverError: (err as Error).message },
            (err as Error).message
          )
        )
    }
  }
}
