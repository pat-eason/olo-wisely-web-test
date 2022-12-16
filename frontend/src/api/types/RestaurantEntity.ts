import { EntityBase } from '@/api/types/EntityBase'
import { ReservationEntity } from '@/api/types/ReservationEntity'

export interface RestaurantEntity extends EntityBase {
  address: string
  name: string
  reservations: ReservationEntity[]
}
