import { Op } from 'sequelize'

import { InventoryEntity } from '../models/entities'
import { CreateInventoryRequest } from '../types/CreateInventoryRequest'

export const getInventoryForRestaurant = async (restaurantId: number): Promise<InventoryEntity[]> =>
  InventoryEntity.findAll({
    where: { restaurantId },
    order: [['created_at', 'DESC']],
  })

export const createInventory = async (model: CreateInventoryRequest): Promise<InventoryEntity> =>
  InventoryEntity.create({ ...model })

export const getInventoryInTimeRange = async (
  startTime: number,
  endTime: number,
  restaurantId: number
): Promise<InventoryEntity> =>
  InventoryEntity.findOne({
    where: {
      restaurantId,
      startTime: {
        [Op.gte]: startTime,
      },
      endTime: {
        [Op.lte]: endTime,
      },
    },
  })

export const getInventoryInTimeRangeForPartySize = async (
  startTime: number,
  endTime: number,
  partySize: number,
  restaurantId: number
): Promise<InventoryEntity> => {
  console.log('getInventoryInTimeRangeForPartySize', startTime, endTime, partySize, restaurantId)
  return InventoryEntity.findOne({
    where: {
      restaurantId,
      partySize,
      startTime: {
        [Op.lte]: endTime,
      },
      endTime: {
        [Op.gte]: startTime,
      },
    },
  })
}
