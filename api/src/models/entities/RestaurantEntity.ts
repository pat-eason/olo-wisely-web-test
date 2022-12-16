import {Column, HasMany, Table} from 'sequelize-typescript'

import EntityBase from './EntityBase'
import {ReservationEntity} from "./ReservationEntity";

@Table({ tableName: 'restaurants' })
export class RestaurantEntity extends EntityBase<RestaurantEntity> {
  @Column
  name: string

  @Column
  address: string

  @HasMany(() => ReservationEntity)
  reservations: ReservationEntity[]
}
