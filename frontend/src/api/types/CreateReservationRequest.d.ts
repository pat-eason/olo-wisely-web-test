export interface CreateReservationRequest {
  email: string
  name: string
  partySize: number
  reservationDate: string
  reservationTime: number
  restaurantId: number
}
