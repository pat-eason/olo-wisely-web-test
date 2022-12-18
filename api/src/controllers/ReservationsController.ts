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
    const reservationDate = new Date(req.body.reservationDateTime)
    const reservationTime = Number.parseInt(
      `${reservationDate.getHours()}${reservationDate.getMinutes()}`
    )

    // has this reservation already been created?
    const existingReservation = await getExactReservation(
      req.body.email,
      req.body.reservationDateTime,
      req.body.partySize,
      req.body.restaurantId
    )
    if (existingReservation) {
      return res
        .status(409)
        .send(
          this.generateErrorResponse(
            {
              error: `A reservation already exists for email [${req.body.email}] at [${reservationDate}] with party size [${req.body.partySize}]`,
            },
            'This customer already has a slot for this day, time, and party size'
          )
        )
    }

    // is there inventory for this party size and time frame?
    const inventory = await getInventoryInTimeRangeForPartySize(
      reservationTime,
      reservationTime + 15,
      req.body.partySize,
      req.body.restaurantId
    )
    if (!inventory) {
      return res
        .status(404)
        .send(
          this.generateErrorResponse(
            {
              error: `There is not an Inventory record for party size [${req.body.partySize}] at time [${reservationTime}]`,
            },
            'There is not an Inventory record for that party size and time'
          )
        )
    }

    // are there slots available for this party size and time frame?
    const reservationsForSlot = await getReservationsForInventory(
      reservationDate,
      inventory.partySize,
      inventory.restaurantId
    )
    if (reservationsForSlot.length >= inventory.availableSlots) {
      return res
        .status(404)
        .send(
          this.generateErrorResponse(
            {
              error: `There is no available Inventory slots remaining for date [${reservationDate}] with party size [${req.body.partySize}]`,
            },
            'There are no more slots on that day and party size at that time'
          )
        )
    }

    const newRecord = await createReservation(req.body)
    return res.send(this.generateSuccessResponse(newRecord))
  }
}
