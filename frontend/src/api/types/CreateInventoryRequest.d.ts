export interface CreateInventoryRequest {
  availableSlots: number
  endTime: number
  label?: string
  partySize: number
  restaurantId: number
  startTime: number
}
