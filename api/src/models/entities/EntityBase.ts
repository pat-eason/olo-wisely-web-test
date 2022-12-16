import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  PrimaryKey,
  UpdatedAt
} from 'sequelize-typescript'

/**
 * Common base entity for other entities to inherit and maintain
 * a common column set
 */
export default abstract class EntityBase<T> extends Model<T> {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @DeletedAt
  deleted_at: string

  @CreatedAt
  created_at: string

  @UpdatedAt
  updated_at: string
}