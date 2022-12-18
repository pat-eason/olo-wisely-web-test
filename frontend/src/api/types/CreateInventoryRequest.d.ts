export interface CreateInventoryRequest {
  availableSlots: number
  endTime: number
  label?: string
  maxPartySize: number
  restaurantId: number
  startTime: number
}
