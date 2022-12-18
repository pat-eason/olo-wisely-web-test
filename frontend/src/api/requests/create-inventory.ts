import { httpClient } from '@/api/http-client'
import { CreateInventoryRequest } from '@/api/types/CreateInventoryRequest'
import { InventoryEntity } from '@/api/types/InventoryEntity'

const apiRoute = 'inventory'

export const createInventory = async (
  payload: CreateInventoryRequest
): Promise<InventoryEntity> => {
  const body: CreateInventoryRequest = {
    label: payload.label,
    startTime: payload.startTime,
    endTime: payload.endTime,
    maxPartySize: payload.maxPartySize,
    availableSlots: payload.availableSlots,
    restaurantId: payload.restaurantId
  }

  return (
    await httpClient.executeRequest<InventoryEntity>({
      body,
      method: 'post',
      url: apiRoute
    })
  ).data
}
