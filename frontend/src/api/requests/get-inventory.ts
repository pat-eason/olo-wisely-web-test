import { httpClient } from '@/api/http-client'
import { InventoryEntity } from '@/api/types/InventoryEntity'

const apiRoute = 'inventory'

export const getInventoryForRestaurant = async (
  restaurantId: number
): Promise<InventoryEntity[]> => {
  return (
    await httpClient.executeRequest<InventoryEntity[]>({
      method: 'get',
      params: {
        restaurantId
      },
      url: apiRoute
    })
  ).data
}
