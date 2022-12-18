import { EntityBase } from '@/api/types/EntityBase'
import { RestaurantEntity } from '@/api/types/RestaurantEntity'

export interface InventoryEntity extends EntityBase {
  label: string

  startTime: number

  endTime: number

  availableSlots: number

  maxPartySize: number

  restaurantId: number

  restaurant?: RestaurantEntity
}
