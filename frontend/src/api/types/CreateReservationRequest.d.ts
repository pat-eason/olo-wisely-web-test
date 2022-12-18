export interface CreateReservationRequest {
  email: string
  name: string
  partySize: number
  reservationDateTime: Date
  restaurantId: number
}
