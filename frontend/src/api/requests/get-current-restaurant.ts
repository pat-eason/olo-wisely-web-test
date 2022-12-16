import { RestaurantEntity } from '@/api/types/RestaurantEntity'
import { httpClient } from '@/api/http-client'

const apiRoute = 'restaurant'

export const getCurrentRestaurant = async (): Promise<RestaurantEntity> => {
  return (
    await httpClient.executeRequest<RestaurantEntity>({
      method: 'get',
      url: apiRoute
    })
  ).data
}
