import { InventoryEntity } from '../models/entities'
import { CreateInventoryRequest } from '../types/CreateInventoryRequest'

export const getInventoryForRestaurant = async (restaurantId: number): Promise<InventoryEntity[]> =>
  InventoryEntity.findAll({
    where: { restaurantId },
    order: [['created_at', 'DESC']],
  })

export const createInventory = async (model: CreateInventoryRequest): Promise<InventoryEntity> =>
  InventoryEntity.create({ ...model })
