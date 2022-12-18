import {BelongsTo, Column, ForeignKey, Table} from 'sequelize-typescript'

import EntityBase from './EntityBase'
import { RestaurantEntity } from './RestaurantEntity'

@Table({ tableName: 'reservations' })
export class ReservationEntity extends EntityBase<ReservationEntity> {
  @Column
  name: string

  @Column
  email: string

  @Column
  partySize: number

  @Column
  reservationDate: string

  @Column
  reservationTime: number

  @ForeignKey(() => RestaurantEntity)
  @Column
  restaurantId: number

  @BelongsTo(() => RestaurantEntity)
  restaurant: RestaurantEntity
}