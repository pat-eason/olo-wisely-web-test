import { httpClient } from '@/api/http-client'
import { InventoryEntity } from '@/api/types/InventoryEntity'
import { ResponseEnvelope } from '@/api/types/ResponseEnvelope'

const apiRoute = 'inventory'

export const getInventoryForRestaurant = async (
  restaurantId: number
): Promise<ResponseEnvelope<InventoryEntity[]>> => {
  return await httpClient.executeRequest<InventoryEntity[]>({
    method: 'get',
    params: {
      restaurantId
    },
    url: apiRoute
  })
}
