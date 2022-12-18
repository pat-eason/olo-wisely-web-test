import { RestaurantEntity } from '../models/entities';

export const getRestaurantById = async (id: number): Promise<RestaurantEntity> =>
  RestaurantEntity.findByPk(id);

export const createRestaurant = async (name: string, address: string): Promise<RestaurantEntity> => {
  const existingRecord = await RestaurantEntity.findOne({
    where: {
      name: name
    }
  })
  if (existingRecord) {
    return existingRecord;
  }

  return RestaurantEntity.create({ address, name });
}

/**
 * Retrieve the latest restaurant with the assumption that this scenario has:
 *  > one restaurant in the db
 *  > the restaurant hydration mechanism was successful
 */
export const getCurrentRestaurant = async (): Promise<RestaurantEntity> =>
  RestaurantEntity.findOne({
    limit: 1,
    order: [[ 'created_at', 'DESC' ]]
  })