import {Controller, Get, Post} from '@overnightjs/core'
import { Request, Response } from 'express'

import {ControllerBase} from './ControllerBase'
import {createInventory, getInventoryForRestaurant} from "../repositories/inventory-repository";
import {CreateInventoryRequest} from "../types/CreateInventoryRequest";

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
    // @TODO validate the reservation request
    const newRecord = await createInventory(req.body)
    return res.send(this.generateSuccessResponse(newRecord))
  }
}
