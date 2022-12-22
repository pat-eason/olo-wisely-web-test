import { Controller, Get, Post } from '@overnightjs/core'
import { Request, Response } from 'express'

import { ControllerBase } from './ControllerBase'
import {
  createInventory,
  getInventoryForRestaurant,
  getInventoryInTimeRangeForPartySize,
} from '../repositories/inventory-repository'
import { CreateInventoryRequest } from '../types/CreateInventoryRequest'
import { getCurrentRestaurant } from '../repositories/restaurant-repository'

@Controller('inventory')
export class InventoryController extends ControllerBase {
  @Get('')
  private async getAll(req: Request, res: Response) {
    const restaurantId = Number.parseInt(req.query.restaurantId[0])
    const records = await getInventoryForRestaurant(restaurantId)
    return res.send(this.generateSuccessResponse(records))
  }

  @Post('')
  private async create(req: Request<{}, {}, CreateInventoryRequest>, res: Response) {
    try {
      const model = req.body

      if (!model.startTime || !model.endTime || !model.partySize || !model.restaurantId) {
        return res.status(422).send(
          this.generateErrorResponse(
            {
              validation:
                "Missing one or more required fields to create inventory: 'startTime', 'endTime', 'partySize', 'restaurantId'",
            },
            'Missing one more more required fields'
          )
        )
      }

      // creating inventory for current restaurant?
      const currentRestaurant = await getCurrentRestaurant()
      if (model.restaurantId !== currentRestaurant.id) {
        return res
          .status(422)
          .send(
            this.generateErrorResponse(
              { error: 'Mismatch Restaurant id' },
              'Cannot create Inventory for differing Restaurant'
            )
          )
      }

      // does overlapping inventory already exist for this party size?
      const overlapRecord = await getInventoryInTimeRangeForPartySize(
        model.startTime,
        model.endTime,
        model.partySize,
        model.restaurantId
      )
      if (overlapRecord) {
        return res.status(422).send(
          this.generateErrorResponse(
            {
              error: `Inventory record exists for party size [${overlapRecord.partySize}] with time range [${overlapRecord.startTime}] - [${overlapRecord.endTime}]`,
            },
            'There is already an Inventory record for that time and party size'
          )
        )
      }

      const newRecord = await createInventory(req.body)
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
