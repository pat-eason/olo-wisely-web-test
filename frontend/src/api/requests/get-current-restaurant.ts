import { RestaurantEntity } from '@/api/types/RestaurantEntity'
import { httpClient } from '@/api/http-client'
import { ResponseEnvelope } from '@/api/types/ResponseEnvelope'

const apiRoute = 'restaurant'

export const getCurrentRestaurant = async (): Promise<
  ResponseEnvelope<RestaurantEntity>
> => {
  return await httpClient.executeRequest<RestaurantEntity>({
    method: 'get',
    url: apiRoute
  })
}
