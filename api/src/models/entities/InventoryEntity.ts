import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript'

import EntityBase from './EntityBase'
import { RestaurantEntity } from './RestaurantEntity'

@Table({ tableName: 'inventory' })
export class InventoryEntity extends EntityBase<InventoryEntity> {
  @Column
  label: string

  @Column
  startTime: number

  @Column
  endTime: number

  @Column
  availableSlots: number

  @Column
  partySize: number

  @ForeignKey(() => RestaurantEntity)
  @Column
  restaurantId: number

  @BelongsTo(() => RestaurantEntity)
  restaurant: RestaurantEntity
}
