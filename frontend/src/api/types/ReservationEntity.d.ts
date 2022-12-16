import { EntityBase } from '@/api/types/EntityBase'
import { RestaurantEntity } from '@/api/types/RestaurantEntity'

export interface ReservationEntity extends EntityBase {
  email: string
  name: string
  partySize: number
  reservationDate: string
  reservationTime: string
  restaurantId: number
  restaurant: RestaurantEntity
}
