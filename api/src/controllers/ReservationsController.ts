import {Controller, Get, Post} from '@overnightjs/core'
import { Request, Response } from 'express'

import {ControllerBase} from './ControllerBase'
import {createReservation, getAllForRestaurant} from '../repositories/reservation-repository'
import CreateReservationRequest from '../types/CreateReservationRequest'

@Controller('reservations')
export class ReservationsController extends ControllerBase {
  @Get('')
  private async getAll(req: Request, res: Response) {
    const restaurantId = Number.parseInt(req.query.restaurantId[0])
    const records = await getAllForRestaurant(restaurantId)
    return res.send(this.generateSuccessResponse(records))
  }

  @Post('')
  private async create(req: Request<{}, {}, CreateReservationRequest>, res: Response) {
    // @TODO validate the reservation request
    const newRecord = await createReservation(req.body)
    return res.send(this.generateSuccessResponse(newRecord))
  }
}
