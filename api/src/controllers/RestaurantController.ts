import { Controller, Get } from '@overnightjs/core'
import { Request, Response } from 'express'

import { getCurrentRestaurant } from '../repositories/restaurant-repository'
import {ControllerBase} from "./ControllerBase";

@Controller('restaurant')
export class RestaurantController extends ControllerBase {
  @Get('')
  private async getCurrentRestaurant(req: Request, res: Response) {
    const currentRestaurant = await getCurrentRestaurant()
    return res.send(this.generateSuccessResponse(currentRestaurant))
  }
}
